"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft, Heart, Plus } from "lucide-react";
import FallbackImage from "@/components/FallbackImage";
import styles from "./wishlist.module.css";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { imageSizes } from "@/constants/imageSizes";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import type { WishlistItemView } from "@/lib/api/wishlist";
import { buildProductHref } from "@/lib/productNavigation";

function formatPrice(value: number) {
  return value % 1 === 0 ? value.toFixed(0) : value.toFixed(2);
}

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { openAddToCart } = useCart();
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

  const handleAddToCart = (item: WishlistItemView) => {
    openAddToCart({
      productId: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
    });
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
            {items.map((item, index) => (
              <motion.article
                key={item.wishlistId}
                className={styles.productCard}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                onClick={() => handleOpenProduct(item)}
                role="link"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleOpenProduct(item);
                }}
              >
                <div className={styles.imageSection}>
                  {item.badge && (
                    <span
                      className={`${styles.badge} ${
                        item.badgeType === "red" ? styles.badgeRed : styles.badgePurple
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  <button
                    type="button"
                    className={styles.heartBtn}
                    onClick={(event) => {
                      event.stopPropagation();
                      void handleRemove(item.wishlistId);
                    }}
                    disabled={removingId === item.wishlistId}
                    aria-label="Remove from wishlist"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>

                  <div className={styles.imageWrap}>
                    <FallbackImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes={imageSizes.categoryProduct}
                      className={styles.productImage}
                    />
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <span className={styles.brandLabel}>{item.brand}</span>
                  <h3 className={styles.productTitle}>{item.title}</h3>

                  <div className={styles.cardFooter}>
                    <div className={styles.priceBlock}>
                      <span className={styles.currentPrice}>
                        <CurrencyAmount>{formatPrice(item.price)}</CurrencyAmount>
                      </span>
                      {item.originalPrice != null &&
                        item.originalPrice > item.price && (
                          <span className={styles.originalPrice}>
                            <CurrencyAmount>
                              {formatPrice(item.originalPrice)}
                            </CurrencyAmount>
                          </span>
                        )}
                    </div>

                    <button
                      type="button"
                      className={styles.addBtn}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleAddToCart(item);
                      }}
                      aria-label={`Add ${item.title} to cart`}
                    >
                      <Plus size={16} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
