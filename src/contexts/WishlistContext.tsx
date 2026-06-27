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
import {
  addToWishlist as addToWishlistApi,
  getWishlist,
  removeFromWishlist as removeFromWishlistApi,
  type WishlistItemView,
} from "@/lib/api/wishlist";
import { useAuth } from "@/contexts/AuthContext";
import { getCustomerId } from "@/lib/auth/session";

type WishlistContextValue = {
  items: WishlistItemView[];
  itemCount: number;
  isLoading: boolean;
  isWishlisted: (productId: number) => boolean;
  getWishlistId: (productId: number) => number | undefined;
  refreshWishlist: (options?: { silent?: boolean }) => Promise<void>;
  toggleWishlist: (productId: number, createdBy?: string) => Promise<boolean>;
  removeWishlistItem: (wishlistId: number) => Promise<boolean>;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const [items, setItems] = useState<WishlistItemView[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const refreshWishlist = useCallback(async (options?: { silent?: boolean }) => {
    const customerId = getCustomerId();
    if (!customerId) {
      setItems([]);
      return;
    }

    const silent = options?.silent ?? itemsRef.current.length > 0;
    if (!silent) {
      setIsLoading(true);
    }

    try {
      const wishlist = await getWishlist(customerId);
      setItems(wishlist);
    } catch {
      setItems([]);
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refreshWishlist();
    } else {
      setItems([]);
    }
  }, [isAuthenticated, refreshWishlist]);

  const productIdMap = useMemo(() => {
    const map = new Map<number, number>();
    for (const item of items) {
      map.set(item.id, item.wishlistId);
    }
    return map;
  }, [items]);

  const isWishlisted = useCallback(
    (productId: number) => productIdMap.has(productId),
    [productIdMap]
  );

  const getWishlistId = useCallback(
    (productId: number) => productIdMap.get(productId),
    [productIdMap]
  );

  const toggleWishlist = useCallback(
    async (productId: number, createdBy?: string) => {
      const customerId = getCustomerId();
      if (!customerId) return false;

      const existingId = productIdMap.get(productId);
      const creatorName =
        createdBy ?? user?.customerName ?? user?.name ?? "Customer";

      if (existingId) {
        try {
          const result = await removeFromWishlistApi(customerId, existingId);
          if (result.status) {
            setItems((prev) =>
              prev.filter((item) => item.wishlistId !== existingId)
            );
            return true;
          }
        } catch {
          return false;
        }
        return false;
      }

      try {
        const result = await addToWishlistApi(
          customerId,
          productId,
          creatorName
        );
        if (result.status) {
          await refreshWishlist({ silent: true });
          return true;
        }
      } catch {
        return false;
      }
      return false;
    },
    [productIdMap, refreshWishlist, user]
  );

  const removeWishlistItem = useCallback(
    async (wishlistId: number) => {
      const customerId = getCustomerId();
      if (!customerId) return false;

      try {
        const result = await removeFromWishlistApi(customerId, wishlistId);
        if (result.status) {
          setItems((prev) =>
            prev.filter((item) => item.wishlistId !== wishlistId)
          );
          return true;
        }
      } catch {
        return false;
      }
      return false;
    },
    []
  );

  const value = useMemo(
    () => ({
      items,
      itemCount: items.length,
      isLoading,
      isWishlisted,
      getWishlistId,
      refreshWishlist,
      toggleWishlist,
      removeWishlistItem,
    }),
    [
      items,
      isLoading,
      isWishlisted,
      getWishlistId,
      refreshWishlist,
      toggleWishlist,
      removeWishlistItem,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
