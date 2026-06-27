"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Star, Camera } from "lucide-react";
import Image from "next/image";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import styles from "./WriteReviewModal.module.css";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tagsList = [
  "Good quality",
  "Fast Delivery",
  "Great Taste",
  "Clean Ingredients",
  "Easy to Mix",
  "Eco-Friendly Packaging"
];

export default function WriteReviewModal({ isOpen, onClose }: WriteReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 1: return "Poor";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Very Good";
      case 5: return "Excellent";
      default: return "";
    }
  };

  const currentDisplayRating = hoveredRating || rating;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClose = () => {
    // Reset states on close
    setTimeout(() => {
      setRating(5);
      setReviewText("");
      setSelectedTags([]);
    }, 300);
    onClose();
  };

  useBodyScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.backdrop} data-lenis-prevent>
          <motion.div
            className={styles.modal}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className={styles.closeWrapper}>
              <button className={styles.closeBtn} onClick={handleClose}>
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            <div className={styles.scrollArea} data-lenis-prevent>
              {/* Product Info */}
              <div className={styles.productCard}>
                <Image
                  src="/images/whey-protein.png"
                  alt="DEEPFIT Pro Whey Protein"
                  width={72}
                  height={72}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <div className={styles.verifiedBadge}>
                    <CheckCircle2 size={14} strokeWidth={3} />
                    Verified Purchase
                  </div>
                  <h3 className={styles.productTitle}>DEEPFIT Pro Whey Protein</h3>
                  <p className={styles.productVariant}>Chocolate Fudge | 2.5kg</p>
                </div>
              </div>

              {/* Rating */}
              <div className={styles.ratingSection}>
                <h4 className={styles.sectionTitleCenter}>How would you rate it?</h4>
                <div className={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`${styles.starBtn} ${star <= currentDisplayRating ? styles.starActive : ""}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      <Star size={36} fill={star <= currentDisplayRating ? "currentColor" : "none"} strokeWidth={1.5} />
                    </button>
                  ))}
                </div>
                {currentDisplayRating > 0 && (
                  <span className={styles.ratingLabel}>{getRatingLabel(currentDisplayRating)}</span>
                )}
              </div>

              {/* Text Input */}
              <div className={styles.inputSection}>
                <div className={styles.sectionHeaderRow}>
                  <span className={styles.sectionTitle}>Share your experience</span>
                  <span className={styles.charCount}>{reviewText.length}/500</span>
                </div>
                <textarea
                  className={styles.textarea}
                  placeholder="What did you like or dislike? How was the taste and mixability?"
                  value={reviewText}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) setReviewText(e.target.value);
                  }}
                />
              </div>

              {/* Add Photos */}
              <div className={styles.inputSection}>
                <div className={styles.sectionHeaderRow}>
                  <span className={styles.sectionTitle}>Add Photos or Video</span>
                </div>
                <div className={styles.uploadContainer}>
                  <button className={styles.uploadBtn}>
                    <Camera size={24} strokeWidth={1.5} />
                    <span className={styles.uploadLabel}>UPLOAD</span>
                  </button>
                  <div className={styles.placeholderBox} />
                  <div className={styles.placeholderBox} />
                </div>
              </div>

              {/* Tags */}
              <div className={styles.inputSection}>
                <div className={styles.sectionHeaderRow}>
                  <span className={styles.sectionTitle}>What stands out most?</span>
                </div>
                <div className={styles.tagsContainer}>
                  {tagsList.map(tag => (
                    <button
                      key={tag}
                      className={`${styles.tagBtn} ${selectedTags.includes(tag) ? styles.tagActive : ""}`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <button className={styles.submitBtn} onClick={handleClose}>
                Submit Review
              </button>
              <div className={styles.homeIndicator} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
