"use client";

import FallbackImage from "@/components/FallbackImage";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Headphones,
} from "lucide-react";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { imageSizes } from "@/constants/imageSizes";
import type { HomeProductView } from "@/lib/api/mappers";
import type {
  DashboardBanner,
  DashboardData,
  MainCategory,
  PopularCollection,
} from "@/lib/api/types";
import AnimatedSection from "./AnimatedSection";
import ProductCard from "@/components/product/ProductCard";
import styles from "./premium.module.css";

const MARQUEE = [
  "Yoga",
  "Strength Training",
  "Recovery",
  "Home Gym",
  "Resistance Bands",
  "Cardio Equipment",
  "Massage & Recovery",
  "Premium Bundles",
];

const WHY = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    desc: "Curated equipment built for performance, longevity, and modern living.",
  },
  {
    icon: Truck,
    title: "UAE Fast Delivery",
    desc: "Express delivery across the Emirates with real-time tracking.",
  },
  {
    icon: Sparkles,
    title: "Wellness Inside Out",
    desc: "From strength to recovery — everything for a balanced lifestyle.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    desc: "Dedicated care for setup, warranties, and training guidance.",
  },
];

const REVIEWS = [
  {
    name: "Daniel R.",
    initials: "DR",
    color: "#7c3aed",
    text: "The product quality is excellent and delivery was faster than expected. Packaging was premium and everything arrived in perfect condition.",
  },
  {
    name: "Sophia M.",
    initials: "SM",
    color: "#0d9488",
    text: "I love the modern design and how comfortable it feels. It fits perfectly in my space and I use it every day.",
  },
  {
    name: "James T.",
    initials: "JT",
    color: "#2563eb",
    text: "Customer support was quick and helpful. They answered all my questions and made the process smooth.",
  },
  {
    name: "Michael B.",
    initials: "MB",
    color: "#db2777",
    text: "Very smooth shopping experience. Checkout was easy and the pricing was clear with no surprises.",
  },
];

export function MarqueeStrip() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className={styles.marqueeWrap} aria-hidden>
      <div className={styles.marqueeTrack}>
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className={styles.marqueeItem}>
            {item}
            <span className={styles.marqueeDot} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  onSeeAll,
}: {
  eyebrow: string;
  title: string;
  onSeeAll?: () => void;
}) {
  return (
    <div className={styles.sectionHeader}>
      <div>
        <span className={styles.sectionEyebrow}>{eyebrow}</span>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      {onSeeAll && (
        <button type="button" className={styles.seeAll} onClick={onSeeAll}>
          See all
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

export function CategoryChips({
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
  return (
    <div className={styles.chipRow}>
      <button
        type="button"
        className={`${styles.chip} ${selectedIndex === 0 ? styles.chipActive : ""}`}
        onClick={() => onSelect(0)}
      >
        <div className={styles.chipIcon}>
          <Sparkles size={20} color="#0f172a" />
        </div>
        <span className={styles.chipLabel}>All</span>
      </button>
      {categories.map((category, index) => {
        const itemIndex = index + 1;
        return (
          <button
            key={category.id}
            type="button"
            className={`${styles.chip} ${
              selectedIndex === itemIndex ? styles.chipActive : ""
            }`}
            onClick={() => onSelect(itemIndex, category)}
          >
            <div className={styles.chipIcon}>
              {category.mainCategoryImage ? (
                <FallbackImage
                  src={category.mainCategoryImage}
                  alt={category.mainCategoryName}
                  width={48}
                  height={48}
                />
              ) : (
                <Sparkles size={20} color="#0f172a" />
              )}
            </div>
            <span className={styles.chipLabel}>{category.mainCategoryName}</span>
          </button>
        );
      })}
      {isLoading && categories.length === 0 &&
        Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.chip}>
            <div className={styles.chipIcon} />
            <span className={styles.chipLabel}>…</span>
          </div>
        ))}
    </div>
  );
}

export function FeaturedCategories({
  categories,
}: {
  categories: MainCategory[];
}) {
  const router = useRouter();
  if (categories.length === 0) return null;

  return (
    <AnimatedSection className={`${styles.section} ${styles.sectionAlt}`}>
      <SectionHeader
        eyebrow="Collections"
        title="Featured Categories"
        onSeeAll={() => router.push("/categories")}
      />
      <div className={styles.categoryGrid}>
        {categories.slice(0, 8).map((category) => (
          <button
            key={category.id}
            type="button"
            className={styles.categoryCard}
            onClick={() => router.push(`/categories?main=${category.id}`)}
          >
            <div className={styles.categoryImageWrap}>
              {category.mainCategoryImage ? (
                <FallbackImage
                  src={category.mainCategoryImage}
                  alt={category.mainCategoryName}
                  fill
                  sizes={imageSizes.categoryTile}
                  className={styles.categoryImage}
                />
              ) : null}
            </div>
            <span className={styles.categoryLabel}>
              {category.mainCategoryName}
            </span>
          </button>
        ))}
      </div>
    </AnimatedSection>
  );
}

export function ProductGridSection({
  eyebrow,
  title,
  products,
  onOpen,
  alt,
}: {
  eyebrow: string;
  title: string;
  products: HomeProductView[];
  onOpen: (productId: number, products: HomeProductView[]) => void;
  alt?: boolean;
}) {
  const router = useRouter();
  if (products.length === 0) return null;

  return (
    <AnimatedSection
      className={`${styles.section} ${alt ? styles.sectionAlt : ""}`}
    >
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        onSeeAll={() => router.push("/categories")}
      />
      <div className={styles.productGrid}>
        {products.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={5}
            onOpen={() => onOpen(product.id, products)}
          />
        ))}
      </div>
    </AnimatedSection>
  );
}

export function SpecialOfferSection({
  banner,
  onOpen,
}: {
  banner?: DashboardBanner;
  onOpen: (id: number) => void;
}) {
  if (!banner) return null;

  return (
    <AnimatedSection className={styles.section}>
      <SectionHeader eyebrow="Flash Sale" title="Limited Time Deal" />
      <button
        type="button"
        className={styles.promoBanner}
        onClick={() => onOpen(banner.id)}
      >
        <div className={styles.promoImageWrap}>
          <FallbackImage
            src={banner.productImage || banner.bannerImage}
            alt={banner.productName || banner.bannerName}
            fill
            sizes={imageSizes.productCard}
            className={styles.promoImage}
          />
        </div>
        <div className={styles.promoBody}>
          <span className={styles.promoLabel}>Limited time deal</span>
          <p className={styles.promoName}>
            {banner.productName || banner.bannerName}
          </p>
          <div className={styles.promoPrices}>
            {banner.offerPrice != null && (
              <span className={styles.promoPrice}>
                <CurrencyAmount>{Math.round(banner.offerPrice)}</CurrencyAmount>
              </span>
            )}
            {banner.originalPrice != null &&
              banner.originalPrice > (banner.offerPrice ?? 0) && (
                <span className={styles.promoMrp}>
                  <CurrencyAmount>
                    {Math.round(banner.originalPrice)}
                  </CurrencyAmount>
                </span>
              )}
          </div>
          <span className={styles.promoCta}>Shop now</span>
        </div>
      </button>
    </AnimatedSection>
  );
}

export function PopularCollectionsSection({
  collections,
}: {
  collections: PopularCollection[];
}) {
  const router = useRouter();
  if (collections.length === 0) return null;

  return (
    <AnimatedSection className={`${styles.section} ${styles.sectionAlt}`}>
      <SectionHeader
        eyebrow="Premium"
        title="Premium Collections"
        onSeeAll={() => router.push("/categories")}
      />
      <div className={styles.collectionsGrid}>
        {collections.map((collection) => (
          <button
            key={collection.id}
            type="button"
            className={styles.collectionCard}
            onClick={() => router.push("/categories")}
          >
            <FallbackImage
              src={collection.mainCategoryImage}
              alt={collection.mainCategoryName}
              fill
              sizes={imageSizes.categoryTile}
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
    </AnimatedSection>
  );
}

export function BrandsSection({
  brands,
}: {
  brands: NonNullable<DashboardData["brandsList"]>;
}) {
  if (brands.length === 0) return null;

  return (
    <AnimatedSection className={styles.section}>
      <SectionHeader eyebrow="Partners" title="Top Brands" />
      <div className={styles.brandTrack}>
        {brands.map((brand) => (
          <div key={brand.id} className={styles.brandCard}>
            <FallbackImage
              src={brand.brandIcon}
              alt={brand.brandName}
              fill
              sizes={imageSizes.brandLogo}
              className={styles.brandImage}
            />
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}

export function AdvertiseSection({ banners }: { banners: DashboardBanner[] }) {
  if (banners.length === 0) return null;

  return (
    <AnimatedSection className={styles.section}>
      <SectionHeader eyebrow="Offers" title="Special Offers" />
      <div className={styles.brandTrack}>
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={styles.brandCard}
            style={{ flex: "0 0 min(320px, 80vw)", height: 160 }}
          >
            <FallbackImage
              src={banner.bannerImage}
              alt={banner.bannerName}
              fill
              sizes={imageSizes.promoBanner}
              className={styles.promoImage}
            />
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}

export function WhyChooseSection() {
  return (
    <AnimatedSection className={`${styles.section} ${styles.sectionAlt}`}>
      <SectionHeader eyebrow="Why DeepFit" title="Why Choose DeepFit" />
      <div className={styles.whyGrid}>
        {WHY.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className={styles.whyCard}>
              <div className={styles.whyIcon}>
                <Icon size={22} />
              </div>
              <h3 className={styles.whyTitle}>{item.title}</h3>
              <p className={styles.whyDesc}>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}

export function ReviewsSection() {
  return (
    <AnimatedSection className={styles.testimonialSection}>
      <div className={styles.testimonialHeader}>
        <h2 className={styles.testimonialTitle}>What Our Customers Say</h2>
        <p className={styles.testimonialSubtitle}>
          Real experiences from people who love our products and service.
        </p>
      </div>
      <div className={styles.testimonialDivider} />

      <div className={styles.testimonialTrack}>
        {REVIEWS.map((review) => (
          <article key={review.name} className={styles.testimonialCard}>
            <div className={styles.testimonialStars} aria-hidden>
              ★★★★★
            </div>
            <p className={styles.testimonialText}>{review.text}</p>
            <div className={styles.testimonialAuthor}>
              <span
                className={styles.testimonialAvatar}
                style={{ background: review.color }}
                aria-hidden
              >
                {review.initials}
              </span>
              <span className={styles.testimonialName}>{review.name}</span>
            </div>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}

export function NewsletterSection() {
  return (
    <AnimatedSection className={`${styles.section} ${styles.newsletterSection}`}>
      <div className={styles.newsletter}>
        <div className={styles.newsletterGlow} />
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>Stay in the wellness loop</h2>
          <p className={styles.newsletterDesc}>
            Exclusive drops, training tips, and member-only offers — delivered
            to your inbox.
          </p>
        </div>
        <form
          className={styles.newsletterForm}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            className={styles.newsletterInput}
            placeholder="Enter your email"
            aria-label="Email address"
          />
          <button type="submit" className={styles.newsletterBtn}>
            Subscribe
          </button>
        </form>
      </div>
    </AnimatedSection>
  );
}

export function LoadingState() {
  return (
    <div className={styles.loadingWrap}>
      <div className={styles.loadingSpinner} />
    </div>
  );
}
