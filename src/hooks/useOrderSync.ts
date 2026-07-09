"use client";

import { useRef } from "react";
import { useCatalogSync } from "@/hooks/useCatalogSync";
import {
  affectsOrder,
  isOrderEvent,
  type CatalogSyncEvent,
} from "@/lib/realtime/catalogSyncEvent";

type OrderSyncHandlers = {
  onCreated?: (event: CatalogSyncEvent) => void;
  onUpdated?: (event: CatalogSyncEvent) => void;
  onDeleted?: (event: CatalogSyncEvent) => void;
  onAny?: (event: CatalogSyncEvent) => void;
};

export function useOrderSync(handlers: OrderSyncHandlers, orderId?: number) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useCatalogSync(
    (event) => {
      const currentHandlers = handlersRef.current;

      if (event.action === "created") {
        currentHandlers.onCreated?.(event);
      } else if (event.action === "updated") {
        currentHandlers.onUpdated?.(event);
      } else if (event.action === "deleted") {
        currentHandlers.onDeleted?.(event);
      }

      currentHandlers.onAny?.(event);
    },
    (event) => {
      if (!isOrderEvent(event)) return false;
      if (orderId != null) return affectsOrder(event, orderId);
      return true;
    }
  );
}
