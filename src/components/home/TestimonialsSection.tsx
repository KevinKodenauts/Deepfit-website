"use client";

import {
  getTestimonialAvatarColor,
  getTestimonialInitials,
  getTestimonials,
  type Testimonial,
} from "@/lib/api/testimonials";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./testimonials.module.css";

function Stars({ rating }: { rating: number }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} style={{ opacity: index < rating ? 1 : 0.25 }}>
          ★
        </span>
      ))}
    </div>
  );
}

function Author({ testimonial }: { testimonial: Testimonial }) {
  const [showImage, setShowImage] = useState(Boolean(testimonial.image));
  const role = [testimonial.designation, testimonial.companyName]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={styles.author}>
      {showImage ? (
        <div className={styles.avatarImageWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className={styles.avatarImage}
            onError={() => setShowImage(false)}
          />
        </div>
      ) : (
        <span
          className={styles.avatar}
          style={{ background: getTestimonialAvatarColor(testimonial.id) }}
          aria-hidden
        >
          {getTestimonialInitials(testimonial.name)}
        </span>
      )}
      <div className={styles.authorMeta}>
        <span className={styles.name}>{testimonial.name}</span>
        {role ? <span className={styles.role}>{role}</span> : null}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    let active = true;

    async function load() {
      setIsLoading(true);
      try {
        const data = await getTestimonials();
        if (active) setTestimonials(data);
      } catch {
        if (active) setTestimonials([]);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || testimonials.length === 0) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [testimonials, updateScrollState]);

  const scrollByCards = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(`.${styles.card}`);
    const step = card ? card.offsetWidth + 16 : 320;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  if (!isLoading && testimonials.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>What Our Customers Say</h2>
        <p className={styles.subtitle}>
          Real experiences from people who love our products and service.
        </p>
      </div>
      <div className={styles.divider} />

      {isLoading ? (
        <div className={styles.state}>
          <div className={styles.spinner} />
        </div>
      ) : (
        <>
          <div className={styles.slider}>
            <div ref={trackRef} className={styles.track}>
              {testimonials.map((testimonial) => (
                <article key={testimonial.id} className={styles.card}>
                  <Stars rating={testimonial.rating} />
                  <p className={styles.text}>{testimonial.message}</p>
                  <Author testimonial={testimonial} />
                </article>
              ))}
            </div>
          </div>

          {testimonials.length > 1 ? (
            <div className={styles.nav}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => scrollByCards(-1)}
                disabled={!canScrollLeft}
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => scrollByCards(1)}
                disabled={!canScrollRight}
                aria-label="Next testimonials"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
