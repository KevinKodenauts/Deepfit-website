"use client";

import { useEffect, useRef } from "react";
import type { CatalogSyncEvent } from "@/lib/realtime/catalogSyncEvent";
import { invalidateCartCache } from "@/lib/api/cart";
import { invalidateCategoriesCache } from "@/lib/api/categories";
import { invalidateDashboardCache } from "@/lib/api/products";
import { useRealtimeService } from "@/contexts/RealtimeContext";

const DEBOUNCE_MS = 800;

export function useCatalogSync(
  onSync: (event: CatalogSyncEvent) => void,
  shouldHandle?: (event: CatalogSyncEvent) => boolean
) {
  const realtimeService = useRealtimeService();
  const onSyncRef = useRef(onSync);
  const shouldHandleRef = useRef(shouldHandle);

  onSyncRef.current = onSync;
  shouldHandleRef.current = shouldHandle;

  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const unsubscribe = realtimeService.subscribe((event) => {
      if (shouldHandleRef.current && !shouldHandleRef.current(event)) {
        return;
      }

      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      debounceTimer = setTimeout(() => {
        if (document.visibilityState === "hidden") {
          return;
        }

        if (
          event.entity === "product" ||
          event.entity === "dashboard" ||
          event.entity === "category" ||
          event.entity === "sub_category"
        ) {
          invalidateDashboardCache();
          invalidateCategoriesCache();
          invalidateCartCache();
        }

        onSyncRef.current(event);
      }, DEBOUNCE_MS);
    });

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      unsubscribe();
    };
  }, [realtimeService]);
}
