"use client";

import FallbackImage from "@/components/FallbackImage";
import Logo from "@/components/Logo";
import ProductCard from "@/components/product/ProductCard";
import { imageSizes } from "@/constants/imageSizes";
import type { HomeProductView } from "@/lib/api/mappers";
import type { MainCategory } from "@/lib/api/types";
import {
  SITE_ADDRESS_LINES,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
} from "@/lib/siteContact";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import styles from "./homeDesktop.module.css";

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
  {
    name: "Sara M.",
    initials: "SM",
    color: "#ea580c",
    text: "DeepFit elevated my home gym. The quality feels world-class and delivery across Dubai was incredibly fast.",
  },
  {
    name: "Omar K.",
    initials: "OK",
    color: "#0891b2",
    text: "Beautiful products, premium packaging, and the recovery range is outstanding. Highly recommend.",
  },
];

function categoryDescription(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("yoga") || lower.includes("pilates")) {
    return "Mats, blocks, and essentials for mindful movement.";
  }
  if (lower.includes("cardio") || lower.includes("fitness")) {
    return "Gear built for endurance, strength, and daily training.";
  }
  if (lower.includes("accessor")) {
    return "Premium accessories to complete your wellness routine.";
  }
  if (lower.includes("recover") || lower.includes("massage")) {
    return "Recovery tools for balance, calm, and better rest.";
  }
  if (lower.includes("strength") || lower.includes("weight")) {
    return "Strength equipment designed for modern home training.";
  }
  if (lower.includes("band")) {
    return "Flexible resistance for full-body workouts anywhere.";
  }
  return `Premium ${name.toLowerCase()} for everyday wellness living.`;
}

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.revealVisible : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeader({
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

export function DesktopMarquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className={styles.marquee} aria-hidden>
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

export function DesktopCategoryChips({
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
          <Sparkles size={18} />
        </div>
        <span>All</span>
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
                  width={40}
                  height={40}
                />
              ) : (
                <Sparkles size={18} />
              )}
            </div>
            <span>{category.mainCategoryName}</span>
          </button>
        );
      })}
      {isLoading &&
        categories.length === 0 &&
        Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`${styles.chip} ${styles.chipSkeleton}`} />
        ))}
    </div>
  );
}

export function DesktopFeaturedCategories({
  categories,
}: {
  categories: MainCategory[];
}) {
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [categories, updateScrollState]);

  const scrollByCards = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(
      `.${styles.shopCategoryItem}`,
    );
    const step = card ? card.offsetWidth + 16 : 246;
    track.scrollBy({ left: direction * step * 2, behavior: "smooth" });
  };

  if (categories.length === 0) return null;

  return (
    <Reveal className={styles.shopCategorySection}>
      <div className={styles.shopCategoryHeader}>
        <div>
          <h2 className={styles.shopCategoryTitle}>Shop by Category</h2>
          <p className={styles.shopCategorySubtitle}>
            Find products that fit your everyday lifestyle and personal needs.
          </p>
        </div>
        <div className={styles.shopCategoryHeaderActions}>
          <div className={styles.shopCategoryNav}>
            <button
              type="button"
              className={styles.shopCategoryNavBtn}
              onClick={() => scrollByCards(-1)}
              disabled={!canScrollLeft}
              aria-label="Previous categories"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className={styles.shopCategoryNavBtn}
              onClick={() => scrollByCards(1)}
              disabled={!canScrollRight}
              aria-label="Next categories"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <button
            type="button"
            className={styles.shopCategoryAllBtn}
            onClick={() => router.push("/categories")}
          >
            <span className={styles.shopCategoryAllDot} />
            Check All Categories
          </button>
        </div>
      </div>

      <div className={styles.shopCategorySlider}>
        <div ref={trackRef} className={styles.shopCategoryTrack}>
          {categories.map((category) => (
            <div key={category.id} className={styles.shopCategoryItem}>
              <button
                type="button"
                className={styles.shopCategoryCard}
                onClick={() => router.push(`/categories?main=${category.id}`)}
              >
                <div className={styles.shopCategoryMedia}>
                  <div className={styles.shopCategoryImageWrap}>
                    <FallbackImage
                      src={category.mainCategoryImage}
                      alt={category.mainCategoryName}
                      fill
                      sizes={imageSizes.categoryTile}
                      className={styles.shopCategoryImage}
                    />
                  </div>
                  <div className={styles.shopCategoryFrost} aria-hidden />
                </div>

                <div className={styles.shopCategoryText}>
                  <span className={styles.shopCategoryName}>
                    {category.mainCategoryName}
                  </span>
                  <span className={styles.shopCategoryDesc}>
                    {categoryDescription(category.mainCategoryName)}
                  </span>
                </div>
              </button>

              <span className={styles.shopCategoryArrow} aria-hidden>
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function DesktopProductGrid({
  eyebrow,
  title,
  products,
  onOpen,
  alt,
  variant = "default",
  categories = [],
  subtitle,
}: {
  eyebrow: string;
  title: string;
  products: HomeProductView[];
  onOpen: (productId: number, products: HomeProductView[]) => void;
  alt?: boolean;
  variant?: "default" | "showcase";
  categories?: MainCategory[];
  subtitle?: string;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | number>("all");

  if (products.length === 0) return null;

  if (variant === "showcase") {
    return (
      <Reveal className={styles.showcaseSection}>
        <div className={styles.showcaseHeader}>
          <h2 className={styles.showcaseSectionTitle}>{title}</h2>
          <p className={styles.showcaseSectionSubtitle}>
            {subtitle ?? "Popular picks for quality, style, and everyday use."}
          </p>
        </div>

        <div className={styles.showcaseDivider} />

        {categories.length > 0 && (
          <div className={styles.showcaseTabs}>
            <button
              type="button"
              className={`${styles.showcaseTab} ${
                activeTab === "all" ? styles.showcaseTabActive : ""
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            {categories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                type="button"
                className={`${styles.showcaseTab} ${
                  activeTab === category.id ? styles.showcaseTabActive : ""
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.mainCategoryName}
              </button>
            ))}
          </div>
        )}

        <div className={styles.showcaseGrid}>
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
      </Reveal>
    );
  }

  return (
    <Reveal className={`${styles.section} ${alt ? styles.sectionAlt : ""}`}>
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
    </Reveal>
  );
}

export function DesktopReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCards = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(`.${styles.testimonialCard}`);
    const step = card ? card.offsetWidth + 20 : 320;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <Reveal className={styles.testimonialSection}>
      <div className={styles.testimonialHeader}>
        <h2 className={styles.testimonialTitle}>What Our Customers Say</h2>
        <p className={styles.testimonialSubtitle}>
          Real experiences from people who love our products and service.
        </p>
      </div>
      <div className={styles.testimonialDivider} />

      <div className={styles.testimonialSlider}>
        <div ref={trackRef} className={styles.testimonialTrack}>
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
      </div>

      <div className={styles.testimonialNav}>
        <button
          type="button"
          className={styles.testimonialNavBtn}
          onClick={() => scrollByCards(-1)}
          disabled={!canScrollLeft}
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className={styles.testimonialNavBtn}
          onClick={() => scrollByCards(1)}
          disabled={!canScrollRight}
          aria-label="Next testimonials"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </Reveal>
  );
}

export function DesktopNewsletter() {
  return null;
}

export function DesktopLoading() {
  return (
    <div className={styles.loadingWrap}>
      <div className={styles.loadingSpinner} />
    </div>
  );
}

export function DesktopFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.siteFooterMain}>
        <div className={styles.siteFooterInner}>
          <div className={styles.siteFooterTop}>
            <div className={styles.siteFooterBrand}>
              <Logo variant="white" height={34} />
              <p>
                DeepFit is the UAE&apos;s premium destination for fitness
                equipment and wellness essentials — designed for modern living,
                trusted by thousands of homes and studios.
              </p>
              <div className={styles.siteFooterContact}>
                <a href={`mailto:${SITE_EMAIL}`}>
                  <Mail size={15} />
                  {SITE_EMAIL}
                </a>
                <a href={SITE_PHONE_HREF}>
                  <Phone size={15} />
                  {SITE_PHONE_DISPLAY}
                </a>
                <address className={styles.siteFooterAddress}>
                  <MapPin size={15} />
                  <span className={styles.siteFooterAddressText}>
                    {SITE_ADDRESS_LINES.map((line, index) => (
                      <span key={line}>
                        {index > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </span>
                </address>
              </div>
            </div>

            <div className={styles.siteFooterCols}>
              <div>
                <h4>Shop</h4>
                <Link href="/categories">All Categories</Link>
                <Link href="/home">Trending Products</Link>
                <Link href="/home">Best Sellers</Link>
                <Link href="/home">New Arrivals</Link>
                <Link href="/profile/wishlist">Wishlist</Link>
              </div>
              <div>
                <h4>Customer Care</h4>
                <Link href="/orders">Track Order</Link>
                <Link href="/orders">My Orders</Link>
                <Link href="/profile">My Account</Link>
                <Link href="/cart">Shopping Cart</Link>
                <Link href="/blog">Help Center</Link>
              </div>
              <div>
                <h4>Company</h4>
                <Link href="/about">About DeepFit</Link>
                <Link href="/contact">Contact Us</Link>
              </div>
              <div>
                <h4>Policies</h4>
                <Link href="/policies/terms">Terms and Conditions</Link>
                <Link href="/policies/privacy">Privacy Policy</Link>
                <Link href="/policies/return">Return Policy</Link>
                <Link href="/policies/refund">Refund Policy</Link>
              </div>
            </div>
          </div>

          <div className={styles.siteFooterBottom}>
            <p>
              © {new Date().getFullYear()} DeepFit Trading LLC. All rights
              reserved.
            </p>
            <div className={styles.siteFooterPayments}>
              {["Visa", "Mastercard"].map((pay) => (
                <span key={pay}>{pay}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
