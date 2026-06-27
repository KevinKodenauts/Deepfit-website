"use client";

import FallbackImage from "@/components/FallbackImage";
import {
  ChevronDown,
  ChevronLeft,
  Clock,
  SlidersHorizontal,
  ArrowUpDown,
  Wallet,
  Star,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./products.module.css";
import { getMainCategories } from "@/lib/api/categories";
import { getProductsByCategory } from "@/lib/api/products";
import {
  mapToCategoryProduct,
  type CategoryProductView,
} from "@/lib/api/mappers";
import type { MainCategory } from "@/lib/api/types";
import {
  buildSidebarCategories,
  type SidebarCategory,
} from "@/lib/categoryNavigation";
import { useCart } from "@/contexts/CartContext";
import { useCatalogSync } from "@/hooks/useCatalogSync";
import { getCustomerId } from "@/lib/auth/session";
import { buildProductHref } from "@/lib/productNavigation";
import { CurrencyAmount } from "@/components/CurrencySymbol";

type SortOption = "popularity" | "price_asc" | "price_desc" | "rating" | null;
type PriceRange = {
  id: string;
  min: number;
  max: number | null;
};

const PRICE_RANGES: PriceRange[] = [
  { id: "under-100", min: 0, max: 100 },
  { id: "100-500", min: 100, max: 500 },
  { id: "500-1000", min: 500, max: 1000 },
  { id: "above-1000", min: 1000, max: null },
];

function PriceRangeLabel({ range }: { range: PriceRange }) {
  if (range.max === null) {
    return (
      <>
        Above <CurrencyAmount>{range.min}</CurrencyAmount>
      </>
    );
  }

  if (range.min === 0) {
    return (
      <>
        Under <CurrencyAmount>{range.max}</CurrencyAmount>
      </>
    );
  }

  return (
    <>
      <CurrencyAmount>{range.min}</CurrencyAmount>
      {" - "}
      <CurrencyAmount>{range.max}</CurrencyAmount>
    </>
  );
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating" },
];

function applyClientFilters(
  products: CategoryProductView[],
  sortBy: SortOption,
  priceRange: PriceRange | null
): CategoryProductView[] {
  let filtered = [...products];

  if (priceRange) {
    filtered = filtered.filter((product) => {
      if (priceRange.max != null) {
        return product.price >= priceRange.min && product.price <= priceRange.max;
      }
      return product.price >= priceRange.min;
    });
  }

  if (sortBy === "price_asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "popularity") {
    filtered.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  return filtered;
}

function formatReviewCount(count: number): string {
  if (count >= 10000) return `${Math.round(count / 1000)}k`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

export default function CategoryProductsPage() {
  return (
    <Suspense fallback={null}>
      <CategoryProductsContent />
    </Suspense>
  );
}

function CategoryProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mainId = Number(searchParams.get("main"));
  const initialCategoryId = searchParams.get("category")
    ? Number(searchParams.get("category"))
    : undefined;
  const { openAddToCart } = useCart();

  const [mainCategory, setMainCategory] = useState<MainCategory | null>(null);
  const [sidebarCategories, setSidebarCategories] = useState<SidebarCategory[]>(
    []
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allProducts, setAllProducts] = useState<CategoryProductView[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>(null);
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [activeModal, setActiveModal] = useState<"sort" | "price" | null>(null);

  const offsetRef = useRef(0);
  const limit = 21;

  const screenTitle = useMemo(() => {
    if (!mainCategory) return "Products";
    if (initialCategoryId) {
      const nested = mainCategory.categories?.find(
        (cat) => cat.categoryId === initialCategoryId
      );
      return nested?.categoryName ?? mainCategory.mainCategoryName;
    }
    return mainCategory.mainCategoryName;
  }, [mainCategory, initialCategoryId]);

  const displayedProducts = useMemo(
    () => applyClientFilters(allProducts, sortBy, priceRange),
    [allProducts, sortBy, priceRange]
  );

  const activeCategoryId = sidebarCategories[selectedIndex]?.id;

  const loadMainCategory = useCallback(async () => {
    if (!mainId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const categories = await getMainCategories();
      const main = categories.find((cat) => cat.id === mainId) ?? null;
      if (!main) {
        setError("Category not found.");
        setMainCategory(null);
        setSidebarCategories([]);
        return;
      }

      const sidebar = buildSidebarCategories(main);
      let index = 0;
      if (initialCategoryId) {
        const found = sidebar.findIndex((item) => item.id === initialCategoryId);
        if (found >= 0) index = found;
      }

      setMainCategory(main);
      setSidebarCategories(sidebar);
      setSelectedIndex(index);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load category details."
      );
    } finally {
      setLoading(false);
    }
  }, [mainId, initialCategoryId]);

  const loadProducts = useCallback(
    async (reset: boolean) => {
      if (!mainId || !activeCategoryId) return;

      const requestOffset = reset ? 0 : offsetRef.current;

      if (reset) {
        setLoading(true);
        setError("");
        setAllProducts([]);
        offsetRef.current = 0;
      } else {
        setLoadingMore(true);
      }

      try {
        const result = await getProductsByCategory(mainId, activeCategoryId, {
          limit,
          offset: requestOffset,
        });

        const mapped = result.products.map(mapToCategoryProduct);
        offsetRef.current = requestOffset + mapped.length;
        setAllProducts((prev) => (reset ? mapped : [...prev, ...mapped]));
        setHasMore(result.hasMore);
      } catch (err) {
        if (reset) {
          setAllProducts([]);
          setError(
            err instanceof Error ? err.message : "Failed to load products."
          );
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [mainId, activeCategoryId, limit]
  );

  useEffect(() => {
    loadMainCategory();
  }, [loadMainCategory]);

  useEffect(() => {
    if (!activeCategoryId || sidebarCategories.length === 0) return;
    void loadProducts(true);
  }, [activeCategoryId, sidebarCategories.length, loadProducts]);

  useCatalogSync(() => {
    void loadProducts(true);
  });

  useEffect(() => {
    const onScroll = () => {
      if (loading || loadingMore || !hasMore) return;

      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      // Don't paginate when everything already fits on screen.
      if (pageHeight <= viewportHeight + 50) return;

      const nearBottom =
        window.scrollY + viewportHeight >= pageHeight - 200;
      if (nearBottom) void loadProducts(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore, loadProducts, loading, loadingMore]);

  const handleSidebarSelect = (index: number) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
    setSortBy(null);
    setPriceRange(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.pageTitle}>{screenTitle}</h1>
      </header>

      {sidebarCategories.length > 0 && (
        <div className={styles.filterBar}>
          <button
            type="button"
            className={`${styles.filterChip} ${
              sortBy || priceRange ? styles.filterChipActive : ""
            }`}
            onClick={() => {
              if (sortBy || priceRange) {
                setSortBy(null);
                setPriceRange(null);
              }
            }}
          >
            <SlidersHorizontal size={18} />
            Filters
            <ChevronDown size={18} />
          </button>
          <button
            type="button"
            className={`${styles.filterChip} ${
              sortBy ? styles.filterChipActive : ""
            }`}
            onClick={() => setActiveModal("sort")}
          >
            <ArrowUpDown size={18} />
            Sort
            <ChevronDown size={18} />
          </button>
          <button
            type="button"
            className={`${styles.filterChip} ${
              priceRange ? styles.filterChipActive : ""
            }`}
            onClick={() => setActiveModal("price")}
          >
            <Wallet size={18} />
            Price
            <ChevronDown size={18} />
          </button>
        </div>
      )}

      <div className={styles.body}>
        {sidebarCategories.length > 0 && (
          <aside className={styles.sidebar}>
            {sidebarCategories.map((category, index) => {
              const isActive = selectedIndex === index;
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`${styles.sidebarItem} ${
                    isActive ? styles.sidebarItemActive : ""
                  }`}
                  onClick={() => handleSidebarSelect(index)}
                >
                  {isActive && <span className={styles.sidebarIndicator} />}
                  <div className={styles.sidebarInner}>
                    <div className={styles.sidebarIcon}>
                      <FallbackImage
                        src={category.image}
                        alt={category.name}
                        fill
                        className={styles.sidebarImage}
                      />
                    </div>
                    <span
                      className={`${styles.sidebarLabel} ${
                        isActive ? styles.sidebarLabelActive : ""
                      }`}
                    >
                      {category.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </aside>
        )}

        <div className={styles.productsPane}>
          {loading && allProducts.length === 0 ? (
            <div className={styles.loadingWrap}>
              <div className={styles.loadingSpinner} />
            </div>
          ) : error && allProducts.length === 0 ? (
            <div className={styles.errorWrap}>
              <p>{error}</p>
              <button
                type="button"
                className={styles.retryBtn}
                onClick={() => loadProducts(true)}
              >
                Retry
              </button>
            </div>
          ) : displayedProducts.length === 0 ? (
            <p className={styles.emptyWrap}>No products available</p>
          ) : (
            <div className={styles.productsGrid}>
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={() =>
                    router.push(
                      buildProductHref(
                        product.id,
                        displayedProducts.map((item) => item.id)
                      )
                    )
                  }
                  onAdd={() => {
                    const customerId = getCustomerId();
                    if (!customerId) {
                      router.push("/login");
                      return;
                    }

                    openAddToCart({
                      productId: product.id,
                      title: product.title,
                      image: product.image,
                      price: product.price,
                    });
                  }}
                />
              ))}
              {loadingMore && (
                <div className={styles.loadMore}>
                  <div className={styles.loadingSpinner} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {activeModal === "sort" && (
        <ModalOverlay onClose={() => setActiveModal(null)}>
          <h2 className={styles.modalTitle}>Sort By</h2>
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.label}
              type="button"
              className={`${styles.modalOption} ${
                sortBy === option.value ? styles.modalOptionActive : ""
              }`}
              onClick={() => {
                setSortBy(
                  sortBy === option.value ? null : option.value
                );
                setActiveModal(null);
              }}
            >
              {option.label}
            </button>
          ))}
        </ModalOverlay>
      )}

      {activeModal === "price" && (
        <ModalOverlay onClose={() => setActiveModal(null)}>
          <h2 className={styles.modalTitle}>Price Range</h2>
          {PRICE_RANGES.map((range) => {
            const isActive =
              priceRange?.min === range.min && priceRange?.max === range.max;
            return (
              <button
                key={range.id}
                type="button"
                className={`${styles.modalOption} ${
                  isActive ? styles.modalOptionActive : ""
                }`}
                onClick={() => {
                  setPriceRange(isActive ? null : range);
                  setActiveModal(null);
                }}
              >
                <PriceRangeLabel range={range} />
              </button>
            );
          })}
        </ModalOverlay>
      )}
    </div>
  );
}

function ProductCard({
  product,
  onOpen,
  onAdd,
}: {
  product: CategoryProductView;
  onOpen: () => void;
  onAdd: () => void;
}) {
  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <article className={styles.productCard} onClick={onOpen}>
      <div className={styles.imageSection}>
        <div className={styles.imageWrap}>
          <FallbackImage
            src={product.image}
            alt={product.title}
            fill
            className={styles.productImage}
          />
        </div>
        <button
          type="button"
          className={styles.addBtn}
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
        >
          ADD
        </button>
      </div>
      <div className={styles.cardBody}>
        {product.weight && (
          <span className={styles.weightText}>{product.weight}</span>
        )}
        <h3 className={styles.productTitle}>{product.title}</h3>
        <div className={styles.ratingRow}>
          {Array.from({ length: fullStars }).map((_, i) => (
            <Star key={`full-${i}`} size={13} fill="#ffc107" color="#ffc107" />
          ))}
          {hasHalf && (
            <Star
              size={13}
              fill="#ffc107"
              color="#ffc107"
              style={{ opacity: 0.5 }}
            />
          )}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <Star key={`empty-${i}`} size={13} color="#ffc107" />
          ))}
          <span className={styles.reviewCount}>
            ({formatReviewCount(product.reviewCount)})
          </span>
        </div>
        <div className={styles.deliveryRow}>
          <span className={styles.deliveryIcon}>
            <Clock size={8} />
          </span>
          <span className={styles.deliveryText}>{product.deliveryTime}</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.currentPrice}>
            <CurrencyAmount>{product.price}</CurrencyAmount>
          </span>
          {product.originalPrice != null &&
            product.originalPrice > product.price && (
              <span className={styles.originalPrice}>
                MRP <CurrencyAmount>{product.originalPrice}</CurrencyAmount>
              </span>
            )}
        </div>
      </div>
    </article>
  );
}

function ModalOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <div
        className={styles.modalSheet}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}
