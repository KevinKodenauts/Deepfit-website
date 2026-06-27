"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fetchNotifications } from "@/lib/api/notifications";
import { useAuth } from "@/contexts/AuthContext";

type NotificationContextValue = {
  unreadCount: number;
  refreshUnreadCount: (options?: { force?: boolean }) => Promise<void>;
};

const NotificationContext = createContext<NotificationContextValue | null>(
  null
);

const UNREAD_CACHE_MS = 45_000;

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const lastFetchAtRef = useRef(0);
  const inFlightRef = useRef<Promise<void> | null>(null);

  const refreshUnreadCount = useCallback(async (options?: { force?: boolean }) => {
    if (!isAuthenticated) {
      setUnreadCount(0);
      return;
    }

    const now = Date.now();
    if (!options?.force && now - lastFetchAtRef.current < UNREAD_CACHE_MS) {
      return;
    }

    if (inFlightRef.current) {
      await inFlightRef.current;
      return;
    }

    const request = (async () => {
      try {
        const result = await fetchNotifications();
        lastFetchAtRef.current = Date.now();
        setUnreadCount(result?.unreadCount ?? 0);
      } catch {
        // Keep the last known count on transient failures.
      } finally {
        inFlightRef.current = null;
      }
    })();

    inFlightRef.current = request;
    await request;
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      setUnreadCount(0);
      return;
    }

    const timer = window.setTimeout(() => {
      void refreshUnreadCount();
    }, 300);

    return () => window.clearTimeout(timer);
  }, [isAuthenticated, refreshUnreadCount]);

  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible" || !isAuthenticated) return;

      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        void refreshUnreadCount();
      }, 1500);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAuthenticated, refreshUnreadCount]);

  const value = useMemo(
    () => ({
      unreadCount,
      refreshUnreadCount,
    }),
    [unreadCount, refreshUnreadCount]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );
  }
  return context;
}
