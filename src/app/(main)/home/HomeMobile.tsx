"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Mic, User, Bell, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import FallbackImage from "@/components/FallbackImage";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { useNotifications } from "@/contexts/NotificationContext";
import { mapToHomeProduct, type HomeProductView } from "@/lib/api/mappers";
import { buildProductHref } from "@/lib/productNavigation";
import { useHomeDashboard } from "@/desktop-ui/home/useHomeDashboard";
import styles from "./home.module.css";

const SEARCH_HINTS = [
  "whey protein",
  "yoga mat",
  "dumbbells",
  "pre-workout",
  "resistance bands",
];

function RatingStars() {
  return (
    <div className={styles.stars} aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={10} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

function ElevatedProductCard({
  product,
  badge,
  onOpen,
}: {
  product: HomeProductView;
  badge?: string;
  onOpen: () => void;
}) {
  return (
    <div className={styles.elevatedCard}>
      <button
        type="button"
        className={styles.cardHitArea}
        onClick={onOpen}
        aria-label={product.title}
      >
        <div className={styles.elevatedImageWrap}>
          <FallbackImage
            src={product.image}
            alt=""
            fill
            sizes="148px"
            className={styles.elevatedImage}
          />
          {badge ? <span className={styles.badge}>{badge}</span> : null}
        </div>
        <div className={styles.elevatedBody}>
          <h3 className={styles.elevatedTitle}>{product.title}</h3>
          <RatingStars />
          <div className={styles.elevatedFooter}>
            <span className={styles.elevatedPrice}>
              <CurrencyAmount>{Math.round(product.price)}</CurrencyAmount>
            </span>
          </div>
        </div>
      </button>
      <button
        type="button"
        className={styles.addBtnSolid}
        onClick={onOpen}
        aria-label={`Add ${product.title}`}
      >
        ADD
      </button>
    </div>
  );
}

function FlatProductCard({
  product,
  onOpen,
}: {
  product: HomeProductView;
  onOpen: () => void;
}) {
  return (
    <div className={styles.flatCard}>
      <button
        type="button"
        className={styles.cardHitArea}
        onClick={onOpen}
        aria-label={product.title}
      >
        <div className={styles.flatImageWrap}>
          <FallbackImage
            src={product.image}
            alt=""
            fill
            sizes="160px"
            className={styles.flatImage}
          />
        </div>
        <h3 className={styles.flatTitle}>{product.title}</h3>
        <p className={styles.flatPrice}>
          <CurrencyAmount>{Math.round(product.price)}</CurrencyAmount>
        </p>
      </button>
      <button
        type="button"
        className={styles.addBtnOutline}
        onClick={onOpen}
        aria-label={`Add ${product.title}`}
      >
        ADD
      </button>
    </div>
  );
}

function ProductSection({
  title,
  products,
  variant,
  badge,
  showViewAll,
  onOpen,
}: {
  title: string;
  products: HomeProductView[];
  variant: "elevated" | "flat";
  badge?: string;
  showViewAll?: boolean;
  onOpen: (productId: number, products: HomeProductView[]) => void;
}) {
  if (products.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {showViewAll ? (
          <button
            type="button"
            className={styles.viewAll}
            onClick={() => onOpen(products[0].id, products)}
          >
            View All
          </button>
        ) : null}
      </div>
      <div className={styles.productScroll}>
        {products.map((product, index) =>
          variant === "elevated" ? (
            <ElevatedProductCard
              key={product.id}
              product={product}
              badge={index === 0 ? badge : undefined}
              onOpen={() => onOpen(product.id, products)}
            />
          ) : (
            <FlatProductCard
              key={product.id}
              product={product}
              onOpen={() => onOpen(product.id, products)}
            />
          )
        )}
      </div>
    </section>
  );
}

export default function HomeMobile() {
  const router = useRouter();
  const { unreadCount: notificationCount } = useNotifications();
  const { isLoading, dashboard } = useHomeDashboard();
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHintIndex((current) => (current + 1) % SEARCH_HINTS.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, []);

  const openProduct = useCallback(
    (productId: number, products: HomeProductView[]) => {
      const ids = [...new Set(products.map((item) => item.id))];
      router.push(buildProductHref(productId, ids));
    },
    [router]
  );

  const openSearch = useCallback(() => {
    router.push("/search");
  }, [router]);

  const openVoiceSearch = useCallback(() => {
    router.push("/search?voice=1");
  }, [router]);

  const bestSellers = (dashboard?.topSellingProductList ?? []).map(
    mapToHomeProduct
  );
  const recommended = (dashboard?.featuredProductList ?? []).map(
    mapToHomeProduct
  );

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <Image
            src="/images/logo/Logo-white.png"
            alt="Deepfit - Wellness Inside Out"
            width={145}
            height={52}
            className={styles.logo}
            priority
          />
          <div className={styles.headerActions}>
            <Link href="/notifications" className={styles.iconBtn}>
              <Bell size={22} strokeWidth={1.8} />
              {notificationCount > 0 && (
                <span className={styles.notificationBadge}>
                  {notificationCount > 99 ? "99+" : notificationCount}
                </span>
              )}
            </Link>
            <Link href="/profile" className={styles.iconBtn}>
              <User size={22} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </header>

      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <button
            type="button"
            className={styles.searchMain}
            onClick={openSearch}
            aria-label="Search products"
          >
            <Search className={styles.searchIcon} size={22} />
            <span className={styles.searchText}>
              Search{" "}
              <span className={styles.searchHint}>
                &ldquo;{SEARCH_HINTS[hintIndex]}&rdquo;
              </span>
            </span>
          </button>
          <button
            type="button"
            className={styles.micBtn}
            onClick={openVoiceSearch}
            aria-label="Voice search"
          >
            <Mic size={22} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {isLoading && !dashboard ? (
          <div className={styles.loadingWrap}>
            <div className={styles.loadingSpinner} />
          </div>
        ) : (
          <>
            <ProductSection
              title="Best Sellers"
              products={bestSellers}
              variant="elevated"
              badge="TOP RATED"
              showViewAll
              onOpen={openProduct}
            />
            <ProductSection
              title="Recommended For You"
              products={recommended}
              variant="flat"
              onOpen={openProduct}
            />
          </>
        )}
      </div>
    </div>
  );
}
