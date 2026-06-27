"use client";

import FallbackImage from "@/components/FallbackImage";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  Search,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { mapToHomeProduct, type HomeProductView } from "@/lib/api/mappers";
import type {
  DashboardBanner,
  DashboardData,
  PopularCollection,
} from "@/lib/api/types";
import { buildProductHref } from "@/lib/productNavigation";
import { useHomeDashboard } from "./useHomeDashboard";
import styles from "./homeDesktop.module.css";

const SLIDER_INTERVAL_MS = 5000;

export default function HomeDesktop() {
  const router = useRouter();
  const { isLoading, dashboard } = useHomeDashboard();

  const openProduct = useCallback(
    (productId: number, products: HomeProductView[]) => {
      const ids = [...new Set(products.map((item) => item.id))];
      router.push(buildProductHref(productId, ids));
    },
    [router],
  );

  const sliders = dashboard?.sliderList ?? [];

  return (
    <div className={styles.shell}>
      {sliders.length > 0 && <HeroCarousel sliders={sliders} />}

      <div className={styles.body}>
        {isLoading && !dashboard ? (
          <div className={styles.loadingWrap}>
            <div className={styles.loadingSpinner} />
          </div>
        ) : (
          <>
            <QuickLinksSection
              onBrowseCategories={() => router.push("/categories")}
              onSearch={() => router.push("/search")}
            />

            <SpecialOfferSection
              banner={dashboard?.bannerList?.[0]}
              onOpen={(id) => openProduct(id, [])}
            />

            <ProductGridSection
              title="Top Selling Products"
              subtitle="What our customers buy most"
              products={(dashboard?.topSellingProductList ?? []).map(
                mapToHomeProduct,
              )}
              onOpen={openProduct}
            />

            <PopularCollectionsSection
              collections={dashboard?.popularCollectionList ?? []}
              onSelect={() => router.push("/categories")}
            />

            {(dashboard?.brandsList?.length ?? 0) > 0 && (
              <BrandsSection brands={dashboard?.brandsList ?? []} />
            )}

            <div className={styles.splitSections}>
              <ProductGridSection
                title="Top Rated"
                subtitle="Highest rated by shoppers"
                products={(dashboard?.topRatedProductList ?? []).map(
                  mapToHomeProduct,
                )}
                onOpen={openProduct}
                compact
              />
              <ProductGridSection
                title="Featured Products"
                subtitle="Hand-picked for you"
                products={(dashboard?.featuredProductList ?? []).map(
                  mapToHomeProduct,
                )}
                onOpen={openProduct}
                compact
              />
            </div>

            <AdvertiseSection banners={dashboard?.advertiseBannerList ?? []} />
          </>
        )}
      </div>
    </div>
  );
}

function HeroCarousel({
  sliders,
}: {
  sliders: NonNullable<DashboardData["sliderList"]>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex((index + sliders.length) % sliders.length);
    },
    [sliders.length],
  );

  const goNext = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  useEffect(() => {
    if (sliders.length <= 1 || isPaused) return;

    const timer = window.setInterval(goNext, SLIDER_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [sliders.length, isPaused, goNext]);

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.heroInner}>
        <div className={styles.heroCarousel}>
          <div
            className={styles.heroTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {sliders.map((slider) => (
              <div key={slider.id} className={styles.heroSlide}>
                <FallbackImage
                  src={slider.sliderImage}
                  alt={slider.title || "Promotion"}
                  fill
                  className={styles.heroSlideImage}
                  priority={slider.id === sliders[0].id}
                />
                {(slider.title || slider.description) && (
                  <div className={styles.heroOverlay}>
                    {slider.title && (
                      <h2 className={styles.heroTitle}>{slider.title}</h2>
                    )}
                    {slider.description && (
                      <p className={styles.heroDesc}>{slider.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {sliders.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.heroNavBtn} ${styles.heroNavPrev}`}
                onClick={goPrev}
                aria-label="Previous slide"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                className={`${styles.heroNavBtn} ${styles.heroNavNext}`}
                onClick={goNext}
                aria-label="Next slide"
              >
                <ChevronRight size={22} />
              </button>

              <div className={styles.heroDots}>
                {sliders.map((slider, index) => (
                  <button
                    key={slider.id}
                    type="button"
                    className={`${styles.heroDot} ${
                      index === currentIndex ? styles.heroDotActive : ""
                    }`}
                    onClick={() => goTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function QuickLinksSection({
  onBrowseCategories,
  onSearch,
}: {
  onBrowseCategories: () => void;
  onSearch: () => void;
}) {
  return (
    <section className={styles.quickLinks}>
      <button
        type="button"
        className={styles.quickLinkCard}
        onClick={onBrowseCategories}
      >
        <span className={styles.quickLinkIcon}>
          <Grid3x3 size={22} />
        </span>
        <span className={styles.quickLinkText}>
          <span className={styles.quickLinkTitle}>Browse categories</span>
          <span className={styles.quickLinkDesc}>
            Explore supplements, gear &amp; more
          </span>
        </span>
        <ArrowRight size={18} className={styles.quickLinkArrow} />
      </button>

      <button
        type="button"
        className={styles.quickLinkCard}
        onClick={onSearch}
      >
        <span className={styles.quickLinkIcon}>
          <Search size={22} />
        </span>
        <span className={styles.quickLinkText}>
          <span className={styles.quickLinkTitle}>Search products</span>
          <span className={styles.quickLinkDesc}>
            Find exactly what you need
          </span>
        </span>
        <ArrowRight size={18} className={styles.quickLinkArrow} />
      </button>
    </section>
  );
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.sectionHeaderText}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
      </div>
      {action && (
        <button
          type="button"
          className={styles.sectionAction}
          onClick={action.onClick}
        >
          {action.label}
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}

function BrandsSection({
  brands,
}: {
  brands: NonNullable<DashboardData["brandsList"]>;
}) {
  return (
    <section className={styles.section}>
      <SectionHeader
        title="Top Brands"
        subtitle="Trusted names in fitness & wellness"
      />
      <div className={styles.brandTrack}>
        {brands.map((brand) => (
          <div key={brand.id} className={styles.brandCard}>
            <FallbackImage
              src={brand.brandIcon}
              alt={brand.brandName}
              fill
              className={styles.brandImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function SpecialOfferSection({
  banner,
  onOpen,
}: {
  banner?: DashboardBanner;
  onOpen: (id: number) => void;
}) {
  if (!banner) return null;

  return (
    <section className={styles.promoSection}>
      <button
        type="button"
        className={styles.specialOfferCard}
        onClick={() => onOpen(banner.id)}
      >
        <div className={styles.specialOfferBadge}>
          <Sparkles size={14} />
          Limited time deal
        </div>
        <div className={styles.specialOfferContent}>
          <div className={styles.specialOfferImageWrap}>
            <FallbackImage
              src={banner.productImage || banner.bannerImage}
              alt={banner.productName || banner.bannerName}
              fill
              className={styles.specialOfferImage}
            />
          </div>
          <div className={styles.specialOfferBody}>
            <p className={styles.specialOfferName}>
              {banner.productName || banner.bannerName}
            </p>
            <div className={styles.specialOfferPrices}>
              {banner.offerPrice != null && (
                <span className={styles.specialOfferPrice}>
                  <CurrencyAmount>
                    {Math.round(banner.offerPrice)}
                  </CurrencyAmount>
                </span>
              )}
              {banner.originalPrice != null &&
                banner.originalPrice > (banner.offerPrice ?? 0) && (
                  <span className={styles.specialOfferMrp}>
                    <CurrencyAmount>
                      {Math.round(banner.originalPrice)}
                    </CurrencyAmount>
                  </span>
                )}
            </div>
            <span className={styles.specialOfferCta}>
              Shop now
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </button>
    </section>
  );
}

function PopularCollectionsSection({
  collections,
  onSelect,
}: {
  collections: PopularCollection[];
  onSelect: () => void;
}) {
  if (collections.length === 0) return null;

  return (
    <section className={styles.section}>
      <SectionHeader
        title="Popular Collections"
        subtitle="Shop curated picks by category"
        action={{ label: "View all", onClick: onSelect }}
      />
      <div className={styles.collectionsGrid}>
        {collections.map((collection) => (
          <button
            key={collection.id}
            type="button"
            className={styles.collectionCard}
            onClick={onSelect}
          >
            <FallbackImage
              src={collection.mainCategoryImage}
              alt={collection.mainCategoryName}
              fill
              className={styles.collectionImage}
            />
            <div className={styles.collectionOverlay}>
              <span className={styles.collectionTitle}>
                {collection.mainCategoryName}
              </span>
              <span className={styles.collectionCta}>
                Explore
                <ArrowRight size={14} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function AdvertiseSection({ banners }: { banners: DashboardBanner[] }) {
  if (banners.length === 0) return null;

  return (
    <section className={styles.section}>
      <SectionHeader title="Special Offers" subtitle="Exclusive deals for you" />
      <div className={styles.adTrack}>
        {banners.map((banner) => (
          <div key={banner.id} className={styles.adCard}>
            <FallbackImage
              src={banner.bannerImage}
              alt={banner.bannerName}
              fill
              className={styles.adImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductGridSection({
  title,
  subtitle,
  products,
  onOpen,
  compact = false,
}: {
  title: string;
  subtitle?: string;
  products: HomeProductView[];
  onOpen: (productId: number, products: HomeProductView[]) => void;
  compact?: boolean;
}) {
  if (products.length === 0) return null;

  return (
    <section
      className={`${styles.section} ${compact ? styles.sectionCompact : ""}`}
    >
      <SectionHeader title={title} subtitle={subtitle} />
      <div
        className={`${styles.productGrid} ${compact ? styles.productGridCompact : ""}`}
      >
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            className={styles.productCard}
            onClick={() => onOpen(product.id, products)}
          >
            <div className={styles.productImageWrap}>
              {product.tag && (
                <span className={styles.productBadge}>{product.tag}</span>
              )}
              <FallbackImage
                src={product.image}
                alt={product.title}
                fill
                className={styles.productImage}
              />
            </div>
            <div className={styles.productBody}>
              <span className={styles.productTitle}>{product.title}</span>
              <div className={styles.productPriceRow}>
                <span className={styles.productPrice}>
                  <CurrencyAmount>{product.price}</CurrencyAmount>
                </span>
                {product.originalPrice > product.price && (
                  <span className={styles.productMrp}>
                    <CurrencyAmount>{product.originalPrice}</CurrencyAmount>
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
