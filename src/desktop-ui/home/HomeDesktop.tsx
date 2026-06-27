"use client";

import FallbackImage from "@/components/FallbackImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { mapToHomeProduct, type HomeProductView } from "@/lib/api/mappers";
import type {
  DashboardBanner,
  DashboardCategory,
  DashboardData,
  MainCategory,
  PopularCollection,
} from "@/lib/api/types";
import { buildProductHref } from "@/lib/productNavigation";
import { useHomeDashboard } from "./useHomeDashboard";
import styles from "./homeDesktop.module.css";

const SLIDER_INTERVAL_MS = 5000;

export default function HomeDesktop() {
  const router = useRouter();
  const {
    isLoading,
    dashboard,
    mainCategories,
    selectedCategoryIndex,
    handleCategorySelect,
    visibleCategories,
  } = useHomeDashboard();

  const openProduct = useCallback(
    (productId: number, products: HomeProductView[]) => {
      const ids = [...new Set(products.map((item) => item.id))];
      router.push(buildProductHref(productId, ids));
    },
    [router]
  );

  const sliders = dashboard?.sliderList ?? [];

  return (
    <div className={styles.shell}>
      {sliders.length > 0 && <HeroCarousel sliders={sliders} />}

      <div className={styles.body}>
        <CategoryRow
          categories={mainCategories}
          isLoading={isLoading}
          selectedIndex={selectedCategoryIndex}
          onSelect={handleCategorySelect}
        />

        {isLoading && !dashboard ? (
          <div className={styles.loadingWrap}>
            <div className={styles.loadingSpinner} />
          </div>
        ) : (
          <>
            {visibleCategories.map((category, index) => (
              <div key={category.id}>
                <CategoryBlock
                  category={category}
                  onSubCategoryClick={() =>
                    router.push(`/categories?main=${category.id}`)
                  }
                />
                {index === 1 && (dashboard?.brandsList?.length ?? 0) > 0 && (
                  <BrandsSection brands={dashboard?.brandsList ?? []} />
                )}
              </div>
            ))}

            <SpecialOfferSection
              banner={dashboard?.bannerList?.[0]}
              onOpen={(id) => openProduct(id, [])}
            />

            <PopularCollectionsSection
              collections={dashboard?.popularCollectionList ?? []}
              onSelect={() => router.push("/categories")}
            />

            <AdvertiseSection banners={dashboard?.advertiseBannerList ?? []} />

            <ProductGridSection
              title="Top Selling Products"
              products={(dashboard?.topSellingProductList ?? []).map(
                mapToHomeProduct
              )}
              onOpen={openProduct}
            />
            <ProductGridSection
              title="Top Rated Products"
              products={(dashboard?.topRatedProductList ?? []).map(
                mapToHomeProduct
              )}
              onOpen={openProduct}
            />
            <ProductGridSection
              title="Featured Products"
              products={(dashboard?.featuredProductList ?? []).map(
                mapToHomeProduct
              )}
              onOpen={openProduct}
            />
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
    [sliders.length]
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

function CategoryRow({
  categories,
  isLoading,
  selectedIndex,
  onSelect,
}: {
  categories: MainCategory[];
  isLoading: boolean;
  selectedIndex: number;
  onSelect: (index: number, category?: MainCategory) => void;
}) {
  if (isLoading && categories.length === 0) {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.loadingSpinner} />
      </div>
    );
  }

  return (
    <div className={styles.categoryRow}>
      <button
        type="button"
        className={`${styles.categoryChip} ${
          selectedIndex === 0 ? styles.categoryChipActive : ""
        }`}
        onClick={() => onSelect(0)}
      >
        <div className={styles.categoryIcon}>
          <ShoppingBag size={24} color="#624da4" />
        </div>
        <span className={styles.categoryLabel}>All</span>
      </button>

      {categories.map((category, index) => {
        const itemIndex = index + 1;
        const isSelected = selectedIndex === itemIndex;
        return (
          <button
            key={category.id}
            type="button"
            className={`${styles.categoryChip} ${
              isSelected ? styles.categoryChipActive : ""
            }`}
            onClick={() => onSelect(itemIndex, category)}
          >
            <div className={styles.categoryIcon}>
              {category.mainCategoryImage ? (
                <Image
                  src={category.mainCategoryImage}
                  alt={category.mainCategoryName}
                  width={64}
                  height={64}
                  className={styles.categoryImage}
                />
              ) : (
                <ShoppingBag size={24} color="#624da4" />
              )}
            </div>
            <span className={styles.categoryLabel}>
              {category.mainCategoryName}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function CategoryBlock({
  category,
  onSubCategoryClick,
}: {
  category: DashboardCategory;
  onSubCategoryClick: () => void;
}) {
  const subCategories = category.subCategories ?? [];
  if (subCategories.length === 0) return null;

  return (
    <section className={styles.categoryBlock}>
      <div className={styles.categoryHeader}>
        <h2 className={styles.categoryBlockTitle}>{category.categoryName}</h2>
        <button
          type="button"
          className={styles.seeAllBtn}
          onClick={onSubCategoryClick}
        >
          See all
        </button>
      </div>
      <div className={styles.subCategoryRow}>
        {subCategories.map((sub) => (
          <button
            key={sub.id}
            type="button"
            className={styles.subCategoryCard}
            onClick={onSubCategoryClick}
          >
            <div className={styles.subCategoryImageWrap}>
              <FallbackImage
                src={sub.subCategoryImage}
                alt={sub.subCategoryName}
                fill
                className={styles.productImage}
              />
            </div>
            <span className={styles.subCategoryLabel}>
              {sub.subCategoryName}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function BrandsSection({
  brands,
}: {
  brands: NonNullable<DashboardData["brandsList"]>;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Top Brands</h2>
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
        <div className={styles.specialOfferImageWrap}>
          <FallbackImage
            src={banner.productImage || banner.bannerImage}
            alt={banner.productName || banner.bannerName}
            fill
            className={styles.specialOfferImage}
          />
        </div>
        <div className={styles.specialOfferBody}>
          <span className={styles.specialOfferLabel}>Limited time deal</span>
          <p className={styles.specialOfferName}>
            {banner.productName || banner.bannerName}
          </p>
          <div className={styles.specialOfferPrices}>
            {banner.offerPrice != null && (
              <span className={styles.specialOfferPrice}>
                <CurrencyAmount>{Math.round(banner.offerPrice)}</CurrencyAmount>
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
          <span className={styles.specialOfferCta}>Shop now</span>
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
      <h2 className={styles.sectionTitle}>Popular Collections</h2>
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
      <h2 className={styles.sectionTitle}>Special Offers</h2>
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
  products,
  onOpen,
}: {
  title: string;
  products: HomeProductView[];
  onOpen: (productId: number, products: HomeProductView[]) => void;
}) {
  if (products.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.productGrid}>
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
