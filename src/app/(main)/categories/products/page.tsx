"use client";

import FallbackImage from "@/components/FallbackImage";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { imageSizes } from "@/constants/imageSizes";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import {
  ChevronDown,
  ArrowLeft,
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
import { useCatalogSync } from "@/hooks/useCatalogSync";
import { buildProductHref } from "@/lib/productNavigation";

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

function RatingStars({ rating }: { rating: number }) {
  const hasRating = rating > 0;
  const fullStars = hasRating ? Math.floor(Math.min(rating, 5)) : 0;

  return (
    <div className={styles.stars} aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={11}
          fill="currentColor"
          strokeWidth={0}
          style={{
            color: hasRating && index < fullStars ? "#ffb800" : "#d0d0d0",
          }}
        />
      ))}
    </div>
  );
}

function CategoryGridCard({
  product,
  productIds,
}: {
  product: CategoryProductView;
  productIds: number[];
}) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { openAddToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const openProduct = () => {
    router.push(buildProductHref(product.id, productIds));
  };

  const handleAdd = async () => {
    if (isAdding) return;
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setIsAdding(true);
    try {
      await openAddToCart({
        productId: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={styles.productCard}>
      <button
        type="button"
        className={styles.cardHitArea}
        onClick={openProduct}
        aria-label={product.title}
      >
        <div className={styles.imageWrap}>
          <FallbackImage
            src={product.image}
            alt=""
            fill
            sizes="(max-width: 1023px) 45vw, 180px"
            className={styles.productImage}
          />
        </div>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <RatingStars rating={product.rating} />
        <div className={styles.footer}>
          <div>
            <span className={styles.price}>
              <CurrencyAmount>{Math.round(product.price)}</CurrencyAmount>
            </span>
          </div>
        </div>
      </button>
      <button
        type="button"
        className={styles.addBtn}
        onClick={handleAdd}
        disabled={isAdding}
        aria-label={`Add ${product.title}`}
      >
        {isAdding ? "…" : "ADD"}
      </button>
    </div>
  );
}

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
  const [activeModal, setActiveModal] = useState<
    "filters" | "sort" | "price" | null
  >(null);

  const offsetRef = useRef(0);
  const productsPaneRef = useRef<HTMLDivElement>(null);
  const limit = 21;
  const activeFilterCount = (sortBy ? 1 : 0) + (priceRange ? 1 : 0);
  const hasActiveFilters = activeFilterCount > 0;

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
    const pane = productsPaneRef.current;

    const isNearBottom = () => {
      if (pane && pane.scrollHeight > pane.clientHeight + 50) {
        return pane.scrollTop + pane.clientHeight >= pane.scrollHeight - 200;
      }

      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      if (pageHeight <= viewportHeight + 50) return false;
      return window.scrollY + viewportHeight >= pageHeight - 200;
    };

    const onScroll = () => {
      if (loading || loadingMore || !hasMore) return;
      if (isNearBottom()) void loadProducts(false);
    };

    pane?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      pane?.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMore, loadProducts, loading, loadingMore]);

  const handleSidebarSelect = (index: number) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
    setSortBy(null);
    setPriceRange(null);
    productsPaneRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearAllFilters = () => {
    setSortBy(null);
    setPriceRange(null);
    setActiveModal(null);
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
          <ArrowLeft size={22} strokeWidth={2} />
        </button>
        <h1 className={styles.pageTitle}>{screenTitle}</h1>
      </header>

      {sidebarCategories.length > 0 && (
        <div className={styles.filterBar}>
          <button
            type="button"
            className={`${styles.filterChip} ${
              hasActiveFilters ? styles.filterChipActive : ""
            }`}
            onClick={() => setActiveModal("filters")}
          >
            <SlidersHorizontal size={18} />
            Filters
            {hasActiveFilters ? (
              <span className={styles.filterCount}>{activeFilterCount}</span>
            ) : null}
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
                        sizes={imageSizes.categoryIcon}
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

        <div className={styles.productsPane} ref={productsPaneRef}>
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
                <CategoryGridCard
                  key={product.id}
                  product={product}
                  productIds={displayedProducts.map((item) => item.id)}
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

      {activeModal === "filters" && (
        <ModalOverlay onClose={() => setActiveModal(null)}>
          <h2 className={styles.modalTitle}>Filters</h2>
          <p className={styles.modalHint}>
            {hasActiveFilters
              ? `${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} applied. Clear to reset sort and price.`
              : "Use Sort and Price to narrow results, or clear filters anytime."}
          </p>
          <button
            type="button"
            className={styles.clearFiltersBtn}
            onClick={clearAllFilters}
            disabled={!hasActiveFilters}
          >
            Clear All Filters
          </button>
        </ModalOverlay>
      )}

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
