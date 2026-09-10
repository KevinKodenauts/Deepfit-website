import { useEffect, useRef } from "react";
import type { CatalogSyncEvent } from "@/lib/realtime/catalogSyncEvent";
import { catalogSyncBus } from "@/lib/realtime/catalogSyncBus";
import { useRealtimeService } from "@/contexts/RealtimeContext";
import { clearProductDetailCacheForEvent } from "@/lib/product/productDetailCache";

const DEBOUNCE_MS = 400;

function eventKey(event: CatalogSyncEvent): string {
  return `${event.entity}:${event.action}:${event.entityId ?? "*"}`;
}

export default function CatalogSyncManager() {
  const realtimeService = useRealtimeService();
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingEventsRef = useRef<Map<string, CatalogSyncEvent>>(new Map());

  useEffect(() => {
    const flush = () => {
      const pending = pendingEventsRef.current;
      if (pending.size === 0) return;

      if (document.visibilityState === "hidden") {
        return;
      }

      const events = Array.from(pending.values());
      pending.clear();

      for (const event of events) {
        clearProductDetailCacheForEvent(event);
        catalogSyncBus.emit(event);
      }
    };

    const scheduleFlush = () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        debounceTimerRef.current = null;
        flush();
      }, DEBOUNCE_MS);
    };

    const unsubscribe = realtimeService.subscribe((event) => {
      pendingEventsRef.current.set(eventKey(event), event);
      scheduleFlush();
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        flush();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      pendingEventsRef.current.clear();
    };
  }, [realtimeService]);

  return null;
}
