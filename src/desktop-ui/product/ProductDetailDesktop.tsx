"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import FallbackImage from "@/components/FallbackImage";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import ProductReviewsModal from "@/components/ProductReviewsModal";
import ProductMoveHubScanCard from "@/components/product/ProductMoveHubScanCard";
import { useProductEquipmentScan } from "@/hooks/useProductEquipmentScan";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import {
  useProductDetail,
  useSiblingProducts,
} from "@/hooks/useProductDetail";
import { getCustomerId } from "@/lib/auth/session";
import { buildProductsHref } from "@/lib/categoryNavigation";
import { buildProductHref, parseProductList } from "@/lib/productNavigation";
import styles from "./productDetailDesktop.module.css";

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

export default function ProductDetailDesktop() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const productId = Number(params.id);
  const listParam = searchParams.get("list");

  const productIds = useMemo(
    () => parseProductList(listParam, productId),
    [listParam, productId],
  );

  const { product, loading, reload } = useProductDetail(productId);
  const siblingProducts = useSiblingProducts(productId, productIds);
  const { openAddToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const {
    openProductEquipment,
    loading: equipmentLoading,
    error: equipmentError,
    clearError: clearEquipmentError,
  } = useProductEquipmentScan();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setSelectedVariantIndex(0);
    setDetailsExpanded(false);
  }, [productId]);

  if (!productId) {
    return (
      <div className={styles.shell}>
        <div className={styles.inner}>
          <p className={styles.emptyText}>Invalid product.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.shell}>
        <div className={styles.inner}>
          <div className={styles.loadingWrap}>
            <div className={styles.loadingSpinner} />
            <p className={styles.loadingText}>Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.shell}>
        <div className={styles.inner}>
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>Product not found.</p>
            <button type="button" className={styles.retryBtn} onClick={() => void reload()}>
              Try again
            </button>
          </div>
        </div>
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
    product.subtitle || product.description.slice(0, 220),
  );
  const longDescription = stripHtml(product.description);
  const specsText = product.specs ? stripHtml(product.specs) : "";
  const categoryHref = product.mainCategoryId
    ? buildProductsHref(product.mainCategoryId, product.categoryId || undefined)
    : "/categories";
  const hasMoreDetails = Boolean(longDescription || specsText);

  const handleAddToCart = () => {
    const customerId = getCustomerId();
    if (!customerId) {
      router.push("/login");
      return;
    }

    openAddToCart({
      productId: product.id,
      title: product.title,
      image: displayImages[activeImage] ?? displayImage ?? product.images[0],
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
    await toggleWishlist(product.id);
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

  const goToProduct = (id: number) => {
    router.push(buildProductHref(id, productIds));
  };

  const goToImage = (index: number) => {
    if (displayImages.length === 0) return;
    const clamped = Math.max(0, Math.min(displayImages.length - 1, index));
    setActiveImage(clamped);
  };

  const goToPrevImage = () => {
    goToImage(activeImage === 0 ? displayImages.length - 1 : activeImage - 1);
  };

  const goToNextImage = () => {
    goToImage(activeImage === displayImages.length - 1 ? 0 : activeImage + 1);
  };

  return (
    <div className={styles.shell}>
      <div className={styles.inner}>
        <div className={styles.topBar}>
          <button
            type="button"
            className={styles.backLink}
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <div className={styles.topActions}>
            <button
              type="button"
              className={`${styles.iconBtn} ${
                isWishlisted(product.id) ? styles.iconBtnActive : ""
              }`}
              onClick={() => void handleWishlist()}
              aria-label="Toggle wishlist"
            >
              <Heart
                size={18}
                fill={isWishlisted(product.id) ? "currentColor" : "none"}
              />
            </button>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => void handleShare()}
              aria-label="Share product"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.galleryCol}>
            {displayImages.length > 1 ? (
              <div className={styles.galleryCarousel}>
                <div
                  className={styles.galleryTrack}
                  style={{
                    transform: `translateX(-${activeImage * 100}%)`,
                  }}
                >
                  {displayImages.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className={styles.gallerySlide}
                    >
                      <FallbackImage
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        fill
                        priority={index === 0}
                        className={styles.mainImage}
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className={`${styles.galleryNavBtn} ${styles.galleryNavPrev}`}
                  onClick={goToPrevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className={`${styles.galleryNavBtn} ${styles.galleryNavNext}`}
                  onClick={goToNextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>

                <div className={styles.galleryDots}>
                  {displayImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`${styles.galleryDot} ${
                        activeImage === index ? styles.galleryDotActive : ""
                      }`}
                      onClick={() => goToImage(index)}
                      aria-label={`Image ${index + 1}`}
                    />
                  ))}
                </div>

                <span className={styles.galleryCounter}>
                  {activeImage + 1} / {displayImages.length}
                </span>
              </div>
            ) : (
              <div className={styles.mainImageWrap}>
                <FallbackImage
                  src={displayImage ?? displayImages[0]}
                  alt={product.title}
                  fill
                  priority
                  className={styles.mainImage}
                />
              </div>
            )}

            {displayImages.length > 1 && (
              <div className={styles.thumbRow}>
                {displayImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    className={`${styles.thumbBtn} ${
                      activeImage === index ? styles.thumbBtnActive : ""
                    }`}
                    onClick={() => goToImage(index)}
                    aria-label={`Image ${index + 1}`}
                  >
                    <FallbackImage
                      src={image}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      fill
                      className={styles.thumbImage}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.detailsCol}>
            <div className={styles.metaRow}>
              <span className={styles.categoryPill}>{product.categoryName}</span>
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

            <h1 className={styles.title}>{product.title}</h1>
            {product.subtitle && (
              <p className={styles.subtitle}>{stripHtml(product.subtitle)}</p>
            )}

            <div className={styles.priceRow}>
              <span className={styles.currentPrice}>
                <CurrencyAmount>{displayPrice.toLocaleString()}</CurrencyAmount>
              </span>
              {product.originalPrice && product.originalPrice > displayPrice && (
                <span className={styles.originalPrice}>
                  MRP{" "}
                  <CurrencyAmount>
                    {product.originalPrice.toLocaleString()}
                  </CurrencyAmount>
                </span>
              )}
            </div>
            <p className={styles.taxNote}>Inclusive of all taxes</p>

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
                      className={`${styles.variantChip} ${
                        selectedVariantIndex === index
                          ? styles.variantChipActive
                          : ""
                      }`}
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

            {hasMoreDetails && (
              <>
                <button
                  type="button"
                  className={styles.expandToggle}
                  onClick={() => setDetailsExpanded((value) => !value)}
                >
                  {detailsExpanded ? "Hide product details" : "View product details"}
                </button>
                {detailsExpanded && (
                  <div className={styles.expandedDetails}>
                    {longDescription && <p>{longDescription}</p>}
                    {specsText && <p>{specsText}</p>}
                  </div>
                )}
              </>
            )}

            <Link href={categoryHref} className={styles.infoCard}>
              <FallbackImage
                src={product.images[0]}
                alt={product.categoryName}
                width={48}
                height={48}
                className={styles.infoThumb}
              />
              <div className={styles.infoTextCol}>
                <span className={styles.infoText}>{product.categoryName}</span>
                <span className={styles.infoTextMuted}>Explore all products</span>
              </div>
              <ChevronRight size={18} className={styles.chevron} />
            </Link>

            <ProductMoveHubScanCard
              variant="desktop"
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

            <div className={styles.actionBar}>
              <div className={styles.actionPriceCol}>
                <span className={styles.actionPrice}>
                  <CurrencyAmount>{displayPrice.toLocaleString()}</CurrencyAmount>
                </span>
                {product.originalPrice &&
                  product.originalPrice > displayPrice && (
                    <span className={styles.actionOriginal}>
                      <CurrencyAmount>
                        {product.originalPrice.toLocaleString()}
                      </CurrencyAmount>
                    </span>
                  )}
              </div>
              <button
                type="button"
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>

        {siblingProducts.length > 0 && (
          <section className={styles.similarSection}>
            <h2 className={styles.similarHeading}>Similar products</h2>
            <div className={styles.similarGrid}>
              {siblingProducts.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.similarCard}
                  onClick={() => goToProduct(item.id)}
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
