"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Heart } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import styles from "./wishlist.module.css";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useWishlist } from "@/contexts/WishlistContext";
import type { WishlistItemView } from "@/lib/api/wishlist";
import { buildProductHref } from "@/lib/productNavigation";

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const {
    items,
    isLoading,
    refreshWishlist,
    removeWishlistItem,
  } = useWishlist();
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState<number | null>(null);

  const loadWishlist = useCallback(async () => {
    try {
      await refreshWishlist();
      setError("");
    } catch {
      setError("Could not load wishlist. Please try again.");
    }
  }, [refreshWishlist]);

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    void loadWishlist();
  }, [authLoading, isAuthenticated, loadWishlist]);

  const handleOpenProduct = (item: WishlistItemView) => {
    router.push(
      buildProductHref(
        item.id,
        items.map((wishlistItem) => wishlistItem.id)
      )
    );
  };

  const handleRemove = async (wishlistId: number) => {
    setRemovingId(wishlistId);

    try {
      const success = await removeWishlistItem(wishlistId);
      if (!success) {
        setError("Could not remove item. Please try again.");
      }
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.pageTitle}>Your Wishlist</h1>
      </header>

      <div className={styles.content}>
        {isLoading ? (
          <p className={styles.statusText}>Loading wishlist...</p>
        ) : error ? (
          <div className={styles.emptyState}>
            <p className={styles.statusText}>{error}</p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => void loadWishlist()}
            >
              Retry
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className={styles.emptyState}>
            <Heart size={56} className={styles.emptyIcon} />
            <p className={styles.statusText}>Your wishlist is empty</p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => router.push("/categories")}
            >
              Browse products
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((item) => (
              <ProductCard
                key={item.wishlistId}
                productId={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating || 5}
                onOpen={() => handleOpenProduct(item)}
                overlayAction={
                  <button
                    type="button"
                    className={styles.heartBtn}
                    onClick={() => void handleRemove(item.wishlistId)}
                    disabled={removingId === item.wishlistId}
                    aria-label="Remove from wishlist"
                  >
                    <Heart size={16} fill="currentColor" />
                  </button>
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
