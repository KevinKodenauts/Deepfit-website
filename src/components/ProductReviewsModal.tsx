"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ThumbsUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import type {
  ProductReviewView,
  RatingBreakdown,
} from "@/lib/api/mappers";
import styles from "./ProductReviewsModal.module.css";

type FilterKey = "all" | "photos" | "verified" | "critical";

interface ProductReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  productImages: string[];
  rating: number;
  ratingCount: number;
  ratingBreakdown: RatingBreakdown;
  reviews: ProductReviewView[];
}

const FALLBACK_BREAKDOWN: RatingBreakdown = {
  five: 88,
  four: 9,
  three: 2,
  two: 1,
  one: 0,
};

const FALLBACK_REVIEWS: ProductReviewView[] = [
  {
    id: 1,
    author: "Sarah Miller",
    initials: "SM",
    rating: 5,
    text: "Absolutely love this product! The mixability is incredible and it doesn't leave any chalky aftertaste. Perfect for my post-workout recovery routine.",
    dateLabel: "2 days ago",
    isVerified: true,
    helpfulCount: 24,
  },
  {
    id: 2,
    author: "James Wilson",
    initials: "JW",
    rating: 5,
    text: "Best purchase I've made this year. High quality ingredients and the packaging is eco-friendly. Highly recommend to anyone serious about fitness.",
    dateLabel: "1 week ago",
    image: "/images/whey-protein.png",
    isVerified: true,
    helpfulCount: 18,
  },
];

function getBreakdownPercents(breakdown: RatingBreakdown) {
  const total =
    breakdown.five +
    breakdown.four +
    breakdown.three +
    breakdown.two +
    breakdown.one;

  if (total === 0) {
    return [
      { stars: 5, percent: 88 },
      { stars: 4, percent: 9 },
      { stars: 3, percent: 2 },
      { stars: 2, percent: 1 },
      { stars: 1, percent: 0 },
    ];
  }

  return [5, 4, 3, 2, 1].map((stars) => {
    const count =
      stars === 5
        ? breakdown.five
        : stars === 4
          ? breakdown.four
          : stars === 3
            ? breakdown.three
            : stars === 2
              ? breakdown.two
              : breakdown.one;

    return {
      stars,
      percent: Math.round((count / total) * 100),
    };
  });
}

export default function ProductReviewsModal({
  isOpen,
  onClose,
  productTitle,
  productImages,
  rating,
  ratingCount,
  ratingBreakdown,
  reviews,
}: ProductReviewsModalProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  useBodyScrollLock(isOpen);

  const hasApiReviews = reviews.length > 0;
  const hasApiBreakdown =
    ratingBreakdown.five +
      ratingBreakdown.four +
      ratingBreakdown.three +
      ratingBreakdown.two +
      ratingBreakdown.one >
    0;

  const displayRating = rating > 0 ? rating : 4.9;
  const displayCount = ratingCount > 0 ? ratingCount : 1248;
  const displayReviews = hasApiReviews ? reviews : FALLBACK_REVIEWS;
  const breakdown = hasApiBreakdown ? ratingBreakdown : FALLBACK_BREAKDOWN;
  const histogram = getBreakdownPercents(breakdown);

  const customerPhotos = useMemo(() => {
    const reviewPhotos = displayReviews
      .map((review) => review.image)
      .filter(Boolean) as string[];

    const merged = [...reviewPhotos, ...productImages].slice(0, 4);
    return merged.length > 0
      ? merged
      : ["/images/whey-protein.png", "/images/dumbbells.png", "/images/eco-mat.png"];
  }, [displayReviews, productImages]);

  const filteredReviews = useMemo(() => {
    switch (activeFilter) {
      case "photos":
        return displayReviews.filter((review) => review.image);
      case "verified":
        return displayReviews.filter((review) => review.isVerified);
      case "critical":
        return displayReviews.filter((review) => review.rating <= 2);
      default:
        return displayReviews;
    }
  }, [activeFilter, displayReviews]);

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All Reviews" },
    { key: "photos", label: "With Photos" },
    { key: "verified", label: "Verified" },
    { key: "critical", label: "Critical" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.closeWrapper}>
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            <div className={styles.scrollArea} data-lenis-prevent>
              <div className={styles.summary}>
                <div>
                  <span className={styles.score}>
                    {displayRating.toFixed(1)}
                  </span>
                  <span className={styles.scoreSuffix}> /5</span>
                </div>
                <div className={styles.summaryStars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={
                        i < Math.round(displayRating) ? "currentColor" : "none"
                      }
                    />
                  ))}
                </div>
                <p className={styles.summaryMeta}>
                  Based on {displayCount.toLocaleString()} Verified Ratings
                </p>
              </div>

              <div className={styles.histogram}>
                {histogram.map((row) => (
                  <div key={row.stars} className={styles.histogramRow}>
                    <span className={styles.histogramLabel}>{row.stars}</span>
                    <div className={styles.histogramTrack}>
                      <div
                        className={styles.histogramFill}
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>
                    <span className={styles.histogramPct}>{row.percent}%</span>
                  </div>
                ))}
              </div>

              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Customer Photos</h3>
                <button className={styles.viewAll}>View All</button>
              </div>
              <div className={styles.photoRow}>
                {customerPhotos.slice(0, 3).map((src, index) => (
                  <Image
                    key={`${src}-${index}`}
                    src={src}
                    alt={`${productTitle} photo ${index + 1}`}
                    width={72}
                    height={72}
                    className={styles.photoThumb}
                  />
                ))}
                {customerPhotos.length > 3 && (
                  <div className={styles.photoMoreWrap}>
                    <Image
                      src={customerPhotos[3]}
                      alt="More photos"
                      width={72}
                      height={72}
                      className={styles.photoThumb}
                    />
                    <div className={styles.photoMore}>
                      +{customerPhotos.length - 3}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.filters}>
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    className={`${styles.filterChip} ${activeFilter === filter.key ? styles.filterChipActive : ""}`}
                    onClick={() => setActiveFilter(filter.key)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {filteredReviews.length === 0 ? (
                <p className={styles.emptyReviews}>
                  No reviews match this filter yet.
                </p>
              ) : (
                filteredReviews.map((review) => (
                  <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.avatar}>{review.initials}</div>
                      <div className={styles.reviewMeta}>
                        <div className={styles.authorName}>{review.author}</div>
                        <div className={styles.reviewDate}>
                          {review.dateLabel}
                        </div>
                      </div>
                    </div>
                    <div className={styles.reviewStars}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={
                            i < review.rating ? "currentColor" : "none"
                          }
                        />
                      ))}
                    </div>
                    <p className={styles.reviewText}>{review.text}</p>
                    {review.image && (
                      <Image
                        src={review.image}
                        alt={`Review by ${review.author}`}
                        width={200}
                        height={120}
                        className={styles.reviewImage}
                      />
                    )}
                    <div className={styles.reviewActions}>
                      <button className={styles.actionBtn}>
                        <ThumbsUp size={14} />
                        Helpful ({review.helpfulCount})
                      </button>
                      <button className={styles.actionBtn}>
                        <MessageCircle size={14} />
                        Comment
                      </button>
                    </div>
                  </div>
                ))
              )}

              <div className={styles.homeIndicator} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
