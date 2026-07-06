"use client";

import { useEffect, useRef } from "react";
import { invalidateCartCache } from "@/lib/api/cart";
import { invalidateCategoriesCache } from "@/lib/api/categories";
import { invalidateDashboardCache } from "@/lib/api/products";
import { clearProductDetailCacheForEvent } from "@/lib/product/productDetailCache";
import { catalogSyncBus } from "@/lib/realtime/catalogSyncBus";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useRealtimeService } from "@/contexts/RealtimeContext";

const DEBOUNCE_MS = 800;

export default function CatalogSyncManager() {
  const realtimeService = useRealtimeService();
  const { refreshCart } = useCart();
  const { refreshWishlist } = useWishlist();
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingEventRef = useRef<Parameters<typeof catalogSyncBus.emit>[0] | null>(
    null
  );

  useEffect(() => {
    const flush = () => {
      const event = pendingEventRef.current;
      pendingEventRef.current = null;

      if (!event || document.visibilityState === "hidden") {
        return;
      }

      invalidateDashboardCache();
      invalidateCategoriesCache();
      invalidateCartCache();
      clearProductDetailCacheForEvent(event);

      void refreshCart({ silent: true });

      if (
        event.entity === "product" ||
        event.entity === "dashboard" ||
        event.entity === "category" ||
        event.entity === "sub_category"
      ) {
        void refreshWishlist({ silent: true });
      }

      catalogSyncBus.emit(event);
    };

    const unsubscribe = realtimeService.subscribe((event) => {
      pendingEventRef.current = event;

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        debounceTimerRef.current = null;
        flush();
      }, DEBOUNCE_MS);
    });

    return () => {
      unsubscribe();
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      pendingEventRef.current = null;
    };
  }, [realtimeService, refreshCart, refreshWishlist]);

  return null;
}
