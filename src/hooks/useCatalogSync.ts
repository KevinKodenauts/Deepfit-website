"use client";

import { useEffect, useRef } from "react";
import type { CatalogSyncEvent } from "@/lib/realtime/catalogSyncEvent";
import { catalogSyncBus } from "@/lib/realtime/catalogSyncBus";

export function useCatalogSync(
  onSync: (event: CatalogSyncEvent) => void,
  shouldHandle?: (event: CatalogSyncEvent) => boolean
) {
  const onSyncRef = useRef(onSync);
  const shouldHandleRef = useRef(shouldHandle);

  onSyncRef.current = onSync;
  shouldHandleRef.current = shouldHandle;

  useEffect(() => {
    return catalogSyncBus.subscribe((event) => {
      if (shouldHandleRef.current && !shouldHandleRef.current(event)) {
        return;
      }

      onSyncRef.current(event);
    });
  }, []);
}
