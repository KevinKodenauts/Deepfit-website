"use client";

import FallbackImage from "@/components/FallbackImage";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  Mic,
  User,
  Bell,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
import { useCallback, useState } from "react";
import styles from "./home.module.css";
import SelectAddressSheet from "@/components/SelectAddressSheet";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import {
  mapToHomeProduct,
  type HomeProductView,
} from "@/lib/api/mappers";
import type {
  DashboardBanner,
  DashboardCategory,
  DashboardData,
  MainCategory,
  PopularCollection,
} from "@/lib/api/types";
import { useNotifications } from "@/contexts/NotificationContext";
import { useSheetOrNavigate } from "@/hooks/useSheetOrNavigate";
import { buildProductHref } from "@/lib/productNavigation";
import { useHomeDashboard } from "@/desktop-ui/home/useHomeDashboard";

export default function HomeMobile() {
  const router = useRouter();
  const { openOrNavigate } = useSheetOrNavigate();
  const { unreadCount: notificationCount } = useNotifications();
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);
  const {
    isLoading,
    dashboard,
    mainCategories,
    selectedCategoryIndex,
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    locationLine,
    isAuthenticated,
    loadAddresses,
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

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <div className={styles.deliveryBlock}>
            <span className={styles.deliveryLabel}>DEEPFIT IN</span>
            <h1 className={styles.deliveryTime}>13 minutes</h1>
            <button
              type="button"
              className={styles.locationLine}
              onClick={() => {
                if (!isAuthenticated) {
                  router.push("/login");
                  return;
                }
                openOrNavigate("/profile/addresses", () =>
                  setIsAddressSheetOpen(true)
                );
              }}
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
      </header>

      <div className={styles.stickyStrip}>
        <CategoryStrip
          categories={mainCategories}
          isLoading={isLoading}
          selectedIndex={selectedCategoryIndex}
          onSelect={handleCategorySelect}
        />
      </div>

      <div className={styles.content}>
        {isLoading && !dashboard ? (
          <div className={styles.loadingWrap}>
            <div className={styles.loadingSpinner} />
          </div>
        ) : (
          <>
            <SliderSection sliders={dashboard?.sliderList ?? []} />

            {visibleCategories.map((category, index) => (
              <div key={category.id}>
                <CategorySection
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

      <SelectAddressSheet
        isOpen={isAddressSheetOpen}
        onClose={() => setIsAddressSheetOpen(false)}
        addresses={addresses}
        selectedId={selectedAddressId}
        onSelect={setSelectedAddressId}
        onAddressesUpdated={loadAddresses}
      />
    </div>
  );
}

function CategoryStrip({
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
  const skeletonCount = isLoading && categories.length === 0 ? 5 : 0;

  return (
    <div className={styles.categoryStrip}>
      <button
        type="button"
        className={styles.categoryItem}
        onClick={() => onSelect(0)}
      >
        <div className={styles.categoryIcon}>
          <ShoppingBag size={20} color="#212121" />
        </div>
        <span
          className={`${styles.categoryLabel} ${
            selectedIndex === 0 ? styles.categoryLabelActive : ""
          }`}
        >
          All
        </span>
        {selectedIndex === 0 && <div className={styles.categoryUnderline} />}
      </button>

      {categories.map((category, index) => {
        const itemIndex = index + 1;
        const isSelected = selectedIndex === itemIndex;
        return (
          <button
            key={category.id}
            type="button"
            className={styles.categoryItem}
            onClick={() => onSelect(itemIndex, category)}
          >
            <div className={styles.categoryIcon}>
              {category.mainCategoryImage ? (
                <Image
                  src={category.mainCategoryImage}
                  alt={category.mainCategoryName}
                  width={40}
                  height={40}
                  className={styles.categoryImage}
                />
              ) : (
                <ShoppingBag size={20} color="#212121" />
              )}
            </div>
            <span
              className={`${styles.categoryLabel} ${
                isSelected ? styles.categoryLabelActive : ""
              }`}
            >
              {category.mainCategoryName}
            </span>
            {isSelected && <div className={styles.categoryUnderline} />}
          </button>
        );
      })}

      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div key={`skel-${index}`} className={styles.categoryItem}>
          <div className={styles.skeletonCircle} />
          <div className={styles.skeletonLabel} />
        </div>
      ))}
    </div>
  );
}

function SliderSection({
  sliders,
}: {
  sliders: NonNullable<DashboardData["sliderList"]>;
}) {
  if (sliders.length === 0) return null;

  return (
    <div className={styles.sliderTrack}>
      {sliders.map((slider) => (
        <div key={slider.id} className={styles.sliderCard}>
          <FallbackImage
            src={slider.sliderImage}
            alt={slider.title || "Promotion"}
            fill
            className={styles.sliderImage}
          />
          {(slider.title || slider.description) && (
            <div className={styles.sliderOverlay}>
              {slider.title && (
                <h2 className={styles.sliderTitle}>{slider.title}</h2>
              )}
              {slider.description && (
                <p className={styles.sliderDesc}>{slider.description}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CategorySection({
  category,
  onSubCategoryClick,
}: {
  category: DashboardCategory;
  onSubCategoryClick: () => void;
}) {
  if (category.subCategories.length === 0) return null;

  return (
    <section>
      <h2 className={styles.sectionTitle}>{category.categoryName}</h2>
      <div className={styles.grid3}>
        {category.subCategories.map((sub) => (
          <button
            key={sub.id}
            type="button"
            className={styles.gridCard}
            onClick={onSubCategoryClick}
          >
            <div className={styles.gridCardImageWrap}>
              <FallbackImage
                src={sub.subCategoryImage}
                alt={sub.subCategoryName}
                fill
                className={styles.gridCardImage}
              />
            </div>
            <span className={styles.gridCardLabel}>{sub.subCategoryName}</span>
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
    <section className={styles.brandSection}>
      <h2 className={styles.sectionTitle}>Our Brands</h2>
      <div className={styles.brandTrack}>
        {brands.map((brand) => (
          <div key={brand.id} className={styles.brandCard}>
            {brand.brandIcon ? (
              <Image
                src={brand.brandIcon}
                alt={brand.brandName}
                width={100}
                height={100}
                className={styles.brandImage}
              />
            ) : (
              <div className={styles.brandImage} />
            )}
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
    <section>
      <h2 className={styles.sectionTitle}>Special Offer</h2>
      <button
        type="button"
        className={styles.specialOfferCard}
        onClick={() => onOpen(banner.id)}
      >
        <FallbackImage
          src={banner.productImage || banner.bannerImage}
          alt={banner.productName || banner.bannerName}
          width={120}
          height={120}
          className={styles.specialOfferImage}
        />
        <div className={styles.specialOfferBody}>
          <p className={styles.specialOfferName}>
            {banner.productName || banner.bannerName}
          </p>
          <div>
            {banner.offerPrice != null && (
              <span className={styles.specialOfferPrice}>
                <CurrencyAmount>{Math.round(banner.offerPrice)}</CurrencyAmount>
              </span>
            )}
            {banner.originalPrice != null &&
              banner.originalPrice > (banner.offerPrice ?? 0) && (
                <span className={styles.specialOfferMrp}>
                  <CurrencyAmount>{Math.round(banner.originalPrice)}</CurrencyAmount>
                </span>
              )}
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
    <section>
      <h2 className={styles.sectionTitle}>Popular Collections</h2>
      <div className={styles.collectionScroll}>
        {collections.map((collection) => (
          <button
            key={collection.id}
            type="button"
            className={`${styles.gridCard} ${styles.collectionCard}`}
            onClick={onSelect}
          >
            <div className={styles.gridCardImageWrap}>
              <FallbackImage
                src={collection.mainCategoryImage}
                alt={collection.mainCategoryName}
                fill
                className={styles.gridCardImage}
              />
            </div>
            <span className={styles.gridCardLabel}>
              {collection.mainCategoryName}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function AdvertiseSection({
  banners,
}: {
  banners: DashboardBanner[];
}) {
  if (banners.length === 0) return null;

  return (
    <section>
      <h2 className={styles.sectionTitle}>Special Offers</h2>
      <div className={styles.adTrack}>
        {banners.map((banner) => (
          <div key={banner.id} className={styles.adCard}>
            <FallbackImage
              src={banner.bannerImage}
              alt={banner.bannerName}
              fill
              className={styles.sliderImage}
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
    <section>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.grid3}>
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            className={styles.gridCard}
            onClick={() => onOpen(product.id, products)}
          >
            <div className={styles.gridCardImageWrap}>
              <FallbackImage
                src={product.image}
                alt={product.title}
                fill
                className={styles.gridCardImage}
              />
            </div>
            <span className={styles.gridCardLabel}>{product.title}</span>
            <span className={styles.gridCardPrice}>
              <CurrencyAmount>{product.price}</CurrencyAmount>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
