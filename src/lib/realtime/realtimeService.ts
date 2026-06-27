import { getCatalogWebSocketUrl } from "@/lib/api/config";
import {
  isCatalogChanged,
  parseCatalogSyncEvent,
  type CatalogSyncEvent,
} from "@/lib/realtime/catalogSyncEvent";

type CatalogSyncListener = (event: CatalogSyncEvent) => void;

const RECONNECT_DELAY_MS = 3000;
const PING_INTERVAL_MS = 20_000;

class RealtimeService {
  private socket: WebSocket | null = null;
  private listeners = new Set<CatalogSyncListener>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private pingTimer: ReturnType<typeof setInterval> | null = null;
  private isConnecting = false;
  private shouldStayConnected = false;

  get isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  subscribe(listener: CatalogSyncListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  async connect(force = false): Promise<void> {
    if (typeof window === "undefined") return;

    this.shouldStayConnected = true;
    if (this.isConnecting) return;
    if (!force && this.isConnected) return;

    await this.closeSocket();

    this.isConnecting = true;
    const url = getCatalogWebSocketUrl();

    try {
      const socket = new WebSocket(url);
      this.socket = socket;

      socket.onopen = () => {
        this.startPingTimer();
      };

      socket.onmessage = (message) => {
        this.handleMessage(message.data);
      };

      socket.onerror = () => {
        this.handleDisconnect();
      };

      socket.onclose = () => {
        this.handleDisconnect();
      };
    } catch (error) {
      console.warn("[Realtime] Connection failed:", error);
      await this.closeSocket();
      this.scheduleReconnect();
    } finally {
      this.isConnecting = false;
    }
  }

  ensureConnected(): void {
    if (!this.shouldStayConnected) {
      this.shouldStayConnected = true;
    }
    if (!this.isConnected && !this.isConnecting) {
      void this.connect(true);
    }
  }

  disconnect(): void {
    this.shouldStayConnected = false;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    void this.closeSocket();
  }

  private emit(event: CatalogSyncEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  private startPingTimer(): void {
    this.stopPingTimer();
    this.pingTimer = setInterval(() => {
      const socket = this.socket;
      if (!socket || socket.readyState !== WebSocket.OPEN) return;

      try {
        socket.send(JSON.stringify({ event: "ping" }));
      } catch (error) {
        console.warn("[Realtime] Ping failed:", error);
        this.handleDisconnect();
      }
    }, PING_INTERVAL_MS);
  }

  private stopPingTimer(): void {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }

  private async closeSocket(): Promise<void> {
    this.stopPingTimer();

    const socket = this.socket;
    this.socket = null;

    if (!socket) return;

    socket.onopen = null;
    socket.onmessage = null;
    socket.onerror = null;
    socket.onclose = null;

    if (
      socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING
    ) {
      socket.close();
    }
  }

  private handleMessage(rawMessage: unknown): void {
    try {
      const decoded = JSON.parse(String(rawMessage)) as Record<string, unknown>;
      const eventName = decoded.event?.toString() ?? "";

      if (eventName === "connected" || eventName === "pong") {
        return;
      }

      const event = parseCatalogSyncEvent(decoded);
      if (isCatalogChanged(event)) {
        this.emit(event);
      }
    } catch (error) {
      console.warn("[Realtime] Failed to parse message:", error);
    }
  }

  private handleDisconnect(): void {
    void this.closeSocket();
    if (this.shouldStayConnected) {
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (this.shouldStayConnected) {
        void this.connect(true);
      }
    }, RECONNECT_DELAY_MS);
  }
}

export const realtimeService = new RealtimeService();
