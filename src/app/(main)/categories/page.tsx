"use client";

import FallbackImage from "@/components/FallbackImage";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Mic, User, Bell, ChevronDown } from "lucide-react";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./categories.module.css";
import { getMainCategories } from "@/lib/api/categories";
import { getAddresses, type AddressView } from "@/lib/api/addresses";
import type { MainCategory } from "@/lib/api/types";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useCatalogSync } from "@/hooks/useCatalogSync";
import { useRequestGuard } from "@/hooks/useRequestGuard";
import { getCustomerId } from "@/lib/auth/session";
import {
  buildMainCategorySectionItems,
  buildProductsHref,
  type CategoryDisplayItem,
} from "@/lib/categoryNavigation";

function formatAddressLabel(address: AddressView | null): string {
  if (!address) return "SELECT ADDRESS";
  const label = (address.addressLabel ?? address.type ?? "").toUpperCase();
  if (label.includes("HOME")) return "HOME";
  if (label.includes("WORK")) return "WORK";
  return label || "OTHER";
}

function formatUserName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "User";
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={null}>
      <CategoriesPageContent />
    </Suspense>
  );
}

function CategoriesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollToMainId = searchParams.get("main");
  const { user, isAuthenticated } = useAuth();
  const { refreshCart } = useCart();
  const { unreadCount: notificationCount } = useNotifications();
  const headerRef = useRef<HTMLElement>(null);
  const hasLoadedRef = useRef(false);
  const { begin, isActive } = useRequestGuard();
  const [isSticky, setIsSticky] = useState(false);
  const [categories, setCategories] = useState<MainCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addresses, setAddresses] = useState<AddressView[]>([]);

  const displayName = user?.name ?? user?.customerName ?? "User";
  const locationLine = useMemo(() => {
    if (addresses.length === 0) return "SELECT ADDRESS";
    return `${formatAddressLabel(addresses[0])} - ${formatUserName(displayName)}`;
  }, [addresses, displayName]);

  const loadCategories = useCallback(
    (options?: { silent?: boolean }) => {
      const silent = options?.silent ?? hasLoadedRef.current;
      const request = begin();

      if (!silent) {
        setLoading(true);
      }
      setError("");

      getMainCategories()
        .then((data) => {
          if (!isActive(request)) return;
          setCategories(data);
          hasLoadedRef.current = true;
        })
        .catch((err) => {
          if (!isActive(request)) return;
          setCategories([]);
          setError(
            err instanceof Error ? err.message : "Failed to load categories.",
          );
        })
        .finally(() => {
          if (isActive(request)) {
            setLoading(false);
          }
        });
    },
    [begin, isActive],
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useCatalogSync(() => {
    loadCategories({ silent: true });
    void refreshCart({ silent: true });
  });

  useEffect(() => {
    if (!scrollToMainId || loading || categories.length === 0) return;
    const el = document.getElementById(`category-section-${scrollToMainId}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [scrollToMainId, loading, categories]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" },
    );
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const customerId = getCustomerId();
    if (!isAuthenticated || !customerId) {
      setAddresses([]);
      return;
    }
    getAddresses(customerId)
      .then((list) => {
        if (!cancelled) setAddresses(list);
      })
      .catch(() => {
        if (!cancelled) setAddresses([]);
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const openProducts = (item: CategoryDisplayItem) => {
    router.push(buildProductsHref(item.mainCategoryId, item.categoryId));
  };

  return (
    <div className={styles.page}>
      {/* <header ref={headerRef} className={styles.header}>
        <div className={styles.headerRow}>
          <div className={styles.deliveryBlock}>
            <span className={styles.deliveryLabel}>DEEPFIT IN</span>
            <h1 className={styles.deliveryTime}>13 minutes</h1>
            <button
              type="button"
              className={styles.locationLine}
              onClick={() =>
                router.push(
                  isAuthenticated ? "/profile/addresses" : "/login"
                )
              }
            >
              <span className={styles.locationText}>{locationLine}</span>
              <ChevronDown size={18} />
            </button>
          </div>
          <div className={styles.headerActions}>
            <Link href="/notifications" className={styles.iconBtn}>
              <Bell size={22} />
              {notificationCount > 0 && (
                <span className={styles.notificationBadge}>
                  {notificationCount > 99 ? "99+" : notificationCount}
                </span>
              )}
            </Link>
            <Link href="/profile" className={styles.iconBtn}>
              <User size={22} />
            </Link>
          </div>
        </div>
        <button
          type="button"
          className={styles.searchBar}
          onClick={() => router.push("/search")}
        >
          <Search size={22} color="#ffffff" />
          <span className={styles.searchPlaceholder}>
            Search &quot;pet food&quot;
          </span>
          <Mic size={22} color="#ffffff" />
        </button>
      </header> */}

      <div className={styles.content}>
        {loading && categories.length === 0 ? (
          <div className={styles.loadingWrap}>
            <div className={styles.loadingSpinner} />
          </div>
        ) : error ? (
          <div className={styles.errorWrap}>
            <p className={styles.errorText}>{error}</p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => loadCategories()}
            >
              Retry
            </button>
          </div>
        ) : categories.length === 0 ? (
          <p className={styles.emptyText}>No categories available</p>
        ) : (
          <>
            <h2 className={styles.sectionTitle}>Categories</h2>
            <div className={styles.grid4}>
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.mainCategoryName}
                  image={category.mainCategoryImage}
                  onClick={() => router.push(buildProductsHref(category.id))}
                />
              ))}
            </div>

            {categories.map((mainCategory) => {
              const items = buildMainCategorySectionItems(mainCategory);
              if (items.length <= 1) return null;

              return (
                <section
                  key={mainCategory.id}
                  id={`category-section-${mainCategory.id}`}
                  className={styles.categorySection}
                >
                  <h2 className={styles.sectionTitle}>
                    {mainCategory.mainCategoryName}
                  </h2>
                  <div className={styles.grid4}>
                    {items.map((item) => (
                      <CategoryCard
                        key={item.key}
                        name={item.name}
                        image={item.image}
                        onClick={() => openProducts(item)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

function CategoryCard({
  name,
  image,
  onClick,
}: {
  name: string;
  image: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className={styles.categoryCard} onClick={onClick}>
      <div className={styles.cardImageWrap}>
        <FallbackImage
          src={image}
          alt={name}
          fill
          className={styles.cardImage}
        />
      </div>
      <span className={styles.cardLabel}>{name}</span>
    </button>
  );
}
