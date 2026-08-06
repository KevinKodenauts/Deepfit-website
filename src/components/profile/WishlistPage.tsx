import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Heart } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useWishlist } from "@/contexts/WishlistContext";
import { categoryProductToCard } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductGridSkeleton } from "@/components/skeleton/PageSkeletons";
import styles from "@/styles/profile/wishlist.module.css";

export function WishlistPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { items, isLoading, refreshWishlist } = useWishlist();
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div
        className={styles.container}
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <header className={styles.header}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className={styles.pageTitle}>Your Wishlist</h1>
        </header>

        <div className={styles.content}>
          {isLoading ? (
            <ProductGridSkeleton count={6} />
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
                onClick={() => void navigate({ to: "/shop" })}
              >
                Browse products
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {items.map((item) => (
                <ProductCard
                  key={item.wishlistId}
                  product={categoryProductToCard(item)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
