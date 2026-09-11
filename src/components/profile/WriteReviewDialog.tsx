import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { submitProductReview } from "@/lib/api/reviews";
import type { OrderProduct } from "@/lib/api/orders";
import styles from "@/styles/orders/details.module.css";

const REVIEW_TAGS = [
  "Good quality",
  "Fast Delivery",
  "Great Taste",
  "Clean Ingredients",
  "Easy to Mix",
  "Eco-Friendly Packaging",
];

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

type WriteReviewDialogProps = {
  open: boolean;
  product: OrderProduct | null;
  onOpenChange: (open: boolean) => void;
  onSubmitted: (productId: number) => void;
};

export function WriteReviewDialog({
  open,
  product,
  onOpenChange,
  onSubmitted,
}: WriteReviewDialogProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setRating(5);
    setComment("");
    setSelectedTags([]);
    setError(null);
  }, [open, product?.productId]);

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  };

  const handleSubmit = async () => {
    if (!product?.productId || isSubmitting) return;

    const text = comment.trim();
    const reviewComment = selectedTags.length
      ? text
        ? `${text}\n\nHighlights: ${selectedTags.join(", ")}`
        : `Highlights: ${selectedTags.join(", ")}`
      : text;

    if (!reviewComment) {
      setError("Please write a short review or pick a highlight.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const res = await submitProductReview({
        productId: product.productId,
        starRating: rating,
        reviewComment,
      });
      if (!res.status) {
        setError(res.message || "Failed to submit review. Please try again.");
        return;
      }
      onSubmitted(product.productId);
      onOpenChange(false);
    } catch {
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.reviewDialog}>
        <DialogHeader>
          <DialogTitle className={styles.modalTitle}>Write a review</DialogTitle>
          <DialogDescription className={styles.modalDescription}>
            {product?.productName || "Share your experience with this product."}
          </DialogDescription>
        </DialogHeader>

        {product?.image ? (
          <div className={styles.reviewProductRow}>
            <img
              src={product.image}
              alt=""
              className={styles.reviewProductThumb}
            />
            <span className={styles.reviewProductName}>{product.productName}</span>
          </div>
        ) : null}

        <div className={styles.starRow} role="radiogroup" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map((value) => {
            const active = value <= rating;
            return (
              <button
                key={value}
                type="button"
                className={styles.starBtn}
                onClick={() => setRating(value)}
                aria-label={`${value} star${value === 1 ? "" : "s"}`}
                aria-pressed={active}
              >
                <Star
                  size={28}
                  fill={active ? "#f5a524" : "none"}
                  color={active ? "#f5a524" : "#d0d5dd"}
                />
              </button>
            );
          })}
          <span className={styles.ratingLabel}>{RATING_LABELS[rating]}</span>
        </div>

        <div className={styles.tagRow}>
          {REVIEW_TAGS.map((tag) => {
            const selected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                className={`${styles.tagChip} ${selected ? styles.tagChipActive : ""}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <Textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="What did you like or dislike?"
          rows={4}
          className={styles.reviewTextarea}
        />

        {error ? (
          <p className={styles.modalError} role="alert">
            {error}
          </p>
        ) : null}

        <DialogFooter className={styles.modalFooter}>
          <button
            type="button"
            className={styles.modalNoBtn}
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.reviewSubmitBtn}
            onClick={() => void handleSubmit()}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit review"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
