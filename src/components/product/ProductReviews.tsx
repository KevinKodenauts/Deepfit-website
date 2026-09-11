import { useState } from "react";
import { BadgeCheck, Star } from "lucide-react";
import type { ProductReviewView, RatingBreakdown } from "@/lib/api/mappers";

const INITIAL_VISIBLE = 5;

function StarRow({
  value,
  size = 14,
}: {
  value: number;
  size?: number;
}) {
  const rounded = Math.round(value);
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= rounded;
        return (
          <Star
            key={star}
            size={size}
            className={
              filled ? "fill-[#f5a524] text-[#f5a524]" : "text-[#d0d5dd]"
            }
          />
        );
      })}
    </span>
  );
}

function breakdownCount(breakdown: RatingBreakdown, stars: number) {
  switch (stars) {
    case 5:
      return breakdown.five;
    case 4:
      return breakdown.four;
    case 3:
      return breakdown.three;
    case 2:
      return breakdown.two;
    default:
      return breakdown.one;
  }
}

type ProductReviewsProps = {
  rating: number;
  ratingCount: number;
  ratingBreakdown: RatingBreakdown;
  reviews: ProductReviewView[];
};

export function ProductReviews({
  rating,
  ratingCount,
  ratingBreakdown,
  reviews,
}: ProductReviewsProps) {
  const [expanded, setExpanded] = useState(false);
  const total = ratingCount || reviews.length;
  const visibleReviews = expanded
    ? reviews
    : reviews.slice(0, INITIAL_VISIBLE);

  return (
    <section
      id="customer-reviews"
      className="mt-24 scroll-mt-28"
      aria-labelledby="customer-reviews-heading"
    >
      <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
        Reviews
      </div>
      <h2
        id="customer-reviews-heading"
        className="mt-3 font-display text-3xl leading-tight sm:text-4xl"
      >
        Customer reviews
      </h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-end gap-1">
            <span className="font-display text-5xl leading-none text-[#1A637B]">
              {(rating || 0).toFixed(1)}
            </span>
            <span className="mb-1 text-sm font-medium text-muted-foreground">
              /5
            </span>
          </div>
          <div className="mt-3">
            <StarRow value={rating} size={16} />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Based on {total} {total === 1 ? "review" : "reviews"}
          </p>

          <div className="mt-5 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = breakdownCount(ratingBreakdown, stars);
              const percent = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={stars} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-right font-medium text-muted-foreground">
                    {stars}
                  </span>
                  <Star size={10} className="fill-[#f5a524] text-[#f5a524]" />
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-[#1A637B]"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          {reviews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
              <p className="font-medium text-foreground">No reviews yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Customers can write a review after this product is delivered.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {visibleReviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f4f8] text-sm font-semibold text-[#1A637B]"
                      aria-hidden
                    >
                      {review.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="text-sm font-semibold text-foreground">
                          {review.author}
                        </h3>
                        {review.isVerified ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2e7d32]">
                            <BadgeCheck size={12} />
                            Verified
                          </span>
                        ) : null}
                        <span className="text-xs text-muted-foreground">
                          {review.dateLabel}
                        </span>
                      </div>
                      <div className="mt-1">
                        <StarRow value={review.rating} size={12} />
                      </div>
                      {review.text ? (
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                          {review.text}
                        </p>
                      ) : null}
                      {review.image ? (
                        <img
                          src={review.image}
                          alt=""
                          className="mt-3 h-20 w-20 rounded-xl object-cover"
                        />
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}

              {reviews.length > INITIAL_VISIBLE ? (
                <button
                  type="button"
                  onClick={() => setExpanded((value) => !value)}
                  className="text-sm font-medium text-[#1A637B] hover:underline"
                >
                  {expanded
                    ? "Show fewer reviews"
                    : `See all ${reviews.length} reviews`}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
