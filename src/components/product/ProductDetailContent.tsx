"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Search,
  Heart,
  Share2,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FallbackImage from "@/components/FallbackImage";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import styles from "@/app/(main)/product/[id]/product.module.css";
import { imageSizes } from "@/constants/imageSizes";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCatalogSync } from "@/hooks/useCatalogSync";
import { mapToProductDetail, type ProductDetailView } from "@/lib/api/mappers";
import { getProductDetails } from "@/lib/api/products";
import {
  clearCachedProductDetail,
  getCachedProductDetail,
  setCachedProductDetail,
} from "@/lib/product/productDetailCache";
import { affectsProduct } from "@/lib/realtime/catalogSyncEvent";
import { getCustomerId } from "@/lib/auth/session";
import { buildProductsHref } from "@/lib/categoryNavigation";
import { buildProductHref } from "@/lib/productNavigation";
import ProductReviewsModal from "@/components/ProductReviewsModal";
import ProductMoveHubScanCard from "@/components/product/ProductMoveHubScanCard";
import { useProductEquipmentScan } from "@/hooks/useProductEquipmentScan";

type ProductDetailContentProps = {
  productId: number;
  isExpanded: boolean;
  isPeekMode?: boolean;
  isDesktopLayout?: boolean;
  siblingProductIds?: number[];
  onScrollExpand: () => void;
  onScrollCollapse?: () => void;
};

const SCROLL_EXPAND_THRESHOLD = 100;
const SCROLL_TOP_THRESHOLD = 10;
const SCROLL_DELTA_MIN = 8;
const PULL_DOWN_COLLAPSE_PX = 48;

function formatReviewCount(count: number): string {
  if (count <= 0) return "0";
  if (count >= 10000) return `${Math.round(count / 1000)}k`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toLocaleString();
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function ProductStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className={styles.stars}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star
          key={`full-${index}`}
          size={15}
          fill="#f59e0b"
          color="#f59e0b"
        />
      ))}
      {hasHalf && (
        <Star
          size={15}
          fill="#f59e0b"
          color="#f59e0b"
          style={{ opacity: 0.55 }}
        />
      )}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={`empty-${index}`} size={15} color="#f59e0b" />
      ))}
    </div>
  );
}

export default function ProductDetailContent({
  productId,
  isExpanded,
  isPeekMode = false,
  isDesktopLayout = false,
  siblingProductIds = [],
  onScrollExpand,
  onScrollCollapse,
}: ProductDetailContentProps) {
  const router = useRouter();
  const { openAddToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const {
    openProductEquipment,
    loading: equipmentLoading,
    error: equipmentError,
    clearError: clearEquipmentError,
  } = useProductEquipmentScan();
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevScrollRef = useRef(0);
  const hasScrolledInExpandedRef = useRef(false);
  const pullStartYRef = useRef(0);
  const isPullingRef = useRef(false);

  const [product, setProduct] = useState<ProductDetailView | null>(() =>
    getCachedProductDetail(productId),
  );
  const [loading, setLoading] = useState(
    () => !getCachedProductDetail(productId),
  );
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [siblingProducts, setSiblingProducts] = useState<ProductDetailView[]>(
    [],
  );

  const reloadProduct = useCallback(
    (force = false) => {
      if (!force) {
        const cached = getCachedProductDetail(productId);
        if (cached) {
          setProduct(cached);
          setLoading(false);
          return;
        }
      } else {
        clearCachedProductDetail(productId);
      }

      setLoading(true);
      setActiveImage(0);
      setSelectedVariantIndex(0);
      getProductDetails(productId)
        .then((data) => {
          if (!data) {
            setProduct(null);
            return;
          }
          const mapped = mapToProductDetail(data);
          setCachedProductDetail(productId, mapped);
          setProduct(mapped);
        })
        .catch(() => setProduct(null))
        .finally(() => setLoading(false));
    },
    [productId]
  );

  useEffect(() => {
    reloadProduct();
  }, [reloadProduct]);

  useCatalogSync(
    () => {
      reloadProduct(true);
    },
    (event) => {
      if (event.entity === "product") {
        return affectsProduct(event, productId);
      }
      return (
        event.entity === "category" ||
        event.entity === "sub_category" ||
        event.entity === "dashboard"
      );
    }
  );

  useEffect(() => {
    if (!isExpanded && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      prevScrollRef.current = 0;
      hasScrolledInExpandedRef.current = false;
      isPullingRef.current = false;
    }
  }, [isExpanded, productId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isExpanded || !isPeekMode || !onScrollCollapse) return;

    const onTouchStart = (event: TouchEvent) => {
      if (el.scrollTop > SCROLL_TOP_THRESHOLD) return;
      pullStartYRef.current = event.touches[0]?.clientY ?? 0;
      isPullingRef.current = true;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!isPullingRef.current || el.scrollTop > SCROLL_TOP_THRESHOLD) return;
      const currentY = event.touches[0]?.clientY ?? pullStartYRef.current;
      const pullDistance = currentY - pullStartYRef.current;
      if (pullDistance > PULL_DOWN_COLLAPSE_PX) {
        isPullingRef.current = false;
        hasScrolledInExpandedRef.current = false;
        onScrollCollapse();
      }
    };

    const onTouchEnd = () => {
      isPullingRef.current = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [isExpanded, isPeekMode, onScrollCollapse, productId]);

  useEffect(() => {
    const similarIds = siblingProductIds.filter((id) => id !== productId);
    if (similarIds.length === 0) {
      setSiblingProducts([]);
      return;
    }

    const loaded = similarIds
      .map((id) => getCachedProductDetail(id))
      .filter((item): item is ProductDetailView => item != null);

    setSiblingProducts(loaded);

    similarIds.forEach((id) => {
      if (getCachedProductDetail(id)) return;
      getProductDetails(id)
        .then((data) => {
          if (!data) return;
          const mapped = mapToProductDetail(data);
          setCachedProductDetail(id, mapped);
          setSiblingProducts((current) => {
            if (current.some((item) => item.id === mapped.id)) return current;
            return [...current, mapped];
          });
        })
        .catch(() => undefined);
    });
  }, [productId, siblingProductIds]);

  if (loading) {
    return (
      <div className={styles.loadingShell}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loading}>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => router.back()}
          >
            <ChevronLeft size={22} />
          </button>
        </header>
        <p className={styles.loading}>Product not found.</p>
      </div>
    );
  }

  const selectedVariant =
    product.variants[selectedVariantIndex] ?? product.variants[0];
  const displayPrice = selectedVariant?.price ?? product.price;
  const displayImages =
    product.images.length > 0
      ? product.images
      : [selectedVariant?.image].filter(Boolean);
  const displayImage =
    selectedVariant?.image ?? displayImages[activeImage] ?? displayImages[0];
  const shortDescription = stripHtml(
    product.subtitle || product.description.slice(0, 180),
  );
  const longDescription = stripHtml(product.description);
  const specsText = product.specs ? stripHtml(product.specs) : "";
  const categoryHref = product.mainCategoryId
    ? buildProductsHref(product.mainCategoryId, product.categoryId || undefined)
    : "/categories";

  const handleAddToCart = () => {
    const customerId = getCustomerId();
    if (!customerId) {
      router.push("/login");
      return;
    }

    openAddToCart({
      productId: product.id,
      title: product.title,
      image: displayImage ?? product.images[0],
      price: displayPrice,
      variantId: selectedVariant?.id || undefined,
      productAttributeId: selectedVariant?.attributeId,
    });
  };

  const handleWishlist = async () => {
    const customerId = getCustomerId();
    if (!customerId) {
      router.push("/login");
      return;
    }

    if (product) {
      await toggleWishlist(product.id);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.title,
        text: product.subtitle,
        url: window.location.href,
      });
    }
  };

  const handleContentScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const current = event.currentTarget.scrollTop;
    const delta = current - prevScrollRef.current;

    if (
      !isExpanded &&
      delta > SCROLL_DELTA_MIN &&
      current > SCROLL_EXPAND_THRESHOLD
    ) {
      onScrollExpand();
    }

    if (isExpanded && isPeekMode && current > SCROLL_EXPAND_THRESHOLD) {
      hasScrolledInExpandedRef.current = true;
    }

    if (
      isExpanded &&
      isPeekMode &&
      onScrollCollapse &&
      hasScrolledInExpandedRef.current &&
      delta < -SCROLL_DELTA_MIN &&
      current <= SCROLL_TOP_THRESHOLD
    ) {
      hasScrolledInExpandedRef.current = false;
      onScrollCollapse();
    }

    prevScrollRef.current = current;
  };

  const handleHeaderDismiss = () => {
    if (isPeekMode && isExpanded && onScrollCollapse) {
      hasScrolledInExpandedRef.current = false;
      onScrollCollapse();
      return;
    }
    router.back();
  };

  const handleImageScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    if (index !== activeImage) {
      setActiveImage(index);
    }
  };

  return (
    <div
      className={`${styles.container} ${isPeekMode ? styles.containerPeek : ""} ${isDesktopLayout ? styles.containerDesktop : ""} ${isExpanded && isPeekMode ? styles.containerExpanded : ""}`}
    >
      <header
        className={`${styles.header} ${isPeekMode ? styles.headerPeek : ""}`}
      >
        <button
          type="button"
          className={styles.backBtn}
          onClick={handleHeaderDismiss}
          aria-label={isPeekMode && isExpanded ? "Back to carousel" : "Close product"}
        >
          {isPeekMode ? <ChevronDown size={24} /> : <ChevronLeft size={22} />}
        </button>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => router.push("/search")}
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            className={`${styles.iconBtn} ${
              product && isWishlisted(product.id) ? styles.iconBtnActive : ""
            }`}
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
          >
            <Heart
              size={18}
              fill={
                product && isWishlisted(product.id) ? "currentColor" : "none"
              }
            />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={handleShare}
            aria-label="Share product"
          >
            <Share2 size={18} />
          </button>
        </div>
      </header>

      <div
        ref={scrollRef}
        className={`${styles.scrollContent} ${isPeekMode ? styles.scrollPeek : ""} ${isDesktopLayout ? styles.scrollDesktop : ""}`}
        onScroll={handleContentScroll}
      >
        <div className={styles.imageSection}>
          {displayImages.length > 1 ? (
            <div
              className={styles.imageCarousel}
              onScroll={handleImageScroll}
            >
              {displayImages.map((image, index) => (
                <div key={`${image}-${index}`} className={styles.imageSlide}>
                  <FallbackImage
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    sizes={imageSizes.productHero}
                    className={styles.productImage}
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.imageWrap}>
              <FallbackImage
                src={displayImage ?? displayImages[0]}
                alt={product.title}
                fill
                sizes={imageSizes.productHero}
                className={styles.productImage}
                priority
              />
            </div>
          )}

          {isPeekMode && !isExpanded && (
            <div className={styles.peekSwipeHint} aria-hidden>
              <ChevronRight size={16} />
            </div>
          )}

          {displayImages.length > 1 && (
            <div className={styles.dots}>
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.dot} ${activeImage === index ? styles.dotActive : ""}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.detailsColumn}>
          <div className={styles.metaRow}>
            {selectedVariant && (
              <span
                className={styles.colorDot}
                style={{ background: "var(--primary-teal)" }}
                aria-hidden
              />
            )}
            <button
              type="button"
              className={styles.ratingRow}
              onClick={() => setIsReviewsOpen(true)}
              aria-label="View product reviews"
            >
              <ProductStars rating={product.rating} />
              <span className={styles.ratingCount}>
                ({formatReviewCount(product.ratingCount)})
              </span>
            </button>
          </div>

          <div className={styles.titleBlock}>
            <h1 className={styles.title}>{product.title}</h1>
            {product.subtitle && (
              <p className={styles.subtitle}>{stripHtml(product.subtitle)}</p>
            )}
            <div className={styles.priceRow}>
              <span className={styles.currentPrice}>
                <CurrencyAmount>{displayPrice.toLocaleString()}</CurrencyAmount>
              </span>
              {product.originalPrice &&
                product.originalPrice > displayPrice && (
                  <span className={styles.originalPrice}>
                    MRP{" "}
                    <CurrencyAmount>
                      {product.originalPrice.toLocaleString()}
                    </CurrencyAmount>
                  </span>
                )}
            </div>
          </div>

          {product.variants.length > 1 && (
            <div className={styles.variantSection}>
              <span className={styles.variantHeading}>
                {product.variantLabel}
              </span>
              <div className={styles.variantOptions}>
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    type="button"
                    className={`${styles.variantChip} ${selectedVariantIndex === index ? styles.variantChipActive : ""}`}
                    onClick={() => {
                      setSelectedVariantIndex(index);
                      setActiveImage(0);
                    }}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {shortDescription && (
            <div className={styles.descriptionCard}>{shortDescription}</div>
          )}

          {(longDescription || specsText) && (
            <div className={styles.expandableSection}>
              <button
                type="button"
                className={styles.expandToggle}
                onClick={() => setDetailsExpanded((value) => !value)}
              >
                <span>View product details</span>
                <ChevronDown
                  size={18}
                  className={`${styles.expandIcon} ${detailsExpanded ? styles.expandIconOpen : ""}`}
                />
              </button>
              {detailsExpanded && (
                <div className={styles.expandedDetails}>
                  {longDescription && <p>{longDescription}</p>}
                  {specsText && <p>{specsText}</p>}
                </div>
              )}
            </div>
          )}

          <Link href={categoryHref} className={styles.infoCard}>
            <FallbackImage
              src={product.images[0]}
              alt={product.categoryName}
              width={44}
              height={44}
              className={styles.infoThumb}
            />
            <div className={styles.infoTextCol}>
              <span className={styles.infoText}>{product.categoryName}</span>
              <span className={styles.infoTextMuted}>Explore all products</span>
            </div>
            <ChevronRight size={18} className={styles.chevron} />
          </Link>

          <ProductMoveHubScanCard
            loading={equipmentLoading}
            error={equipmentError}
            onScan={() => {
              clearEquipmentError();
              void openProductEquipment({
                productId: product.id,
                productName: product.title,
                productSku: product.sku,
              });
            }}
          />

          {siblingProducts.length > 0 && (
            <section className={styles.similarSection}>
              <h2 className={styles.similarHeading}>Similar products</h2>
              <div className={styles.similarTrack}>
                {siblingProducts.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.similarCard}
                    onClick={() =>
                      router.push(
                        buildProductHref(item.id, siblingProductIds),
                      )
                    }
                  >
                    <div className={styles.similarImageWrap}>
                      <FallbackImage
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className={styles.similarImage}
                      />
                    </div>
                    <div className={styles.similarBody}>
                      <span className={styles.similarTitle}>{item.title}</span>
                      <span className={styles.similarPrice}>
                        <CurrencyAmount>
                          {item.price.toLocaleString()}
                        </CurrencyAmount>
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          <div className={styles.scrollFooterSpacer} />
        </div>
      </div>

      <div
        className={`${styles.stickyBar} ${isPeekMode && !isExpanded ? styles.stickyBarPeek : ""}`}
      >
        <div className={styles.footerInfo}>
          <div className={styles.footerPrices}>
            <span className={styles.footerPrice}>
              <CurrencyAmount>{displayPrice.toLocaleString()}</CurrencyAmount>
            </span>
            {product.originalPrice &&
              product.originalPrice > displayPrice && (
                <span className={styles.footerOriginal}>
                  <CurrencyAmount>
                    {product.originalPrice.toLocaleString()}
                  </CurrencyAmount>
                </span>
              )}
          </div>
          <div className={styles.footerTax}>Inclusive of all taxes</div>
        </div>
        <button
          type="button"
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>

      <ProductReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
        productTitle={product.title}
        productImages={product.images}
        rating={product.rating}
        ratingCount={product.ratingCount}
        ratingBreakdown={product.ratingBreakdown}
        reviews={product.reviews}
      />
    </div>
  );
}
