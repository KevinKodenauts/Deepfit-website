"use client";

import FallbackImage from "@/components/FallbackImage";
import { imageSizes } from "@/constants/imageSizes";
import type { DashboardSlider } from "@/lib/api/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./homeDesktop.module.css";

const FALLBACK_SLIDES: DashboardSlider[] = [
  {
    id: -1,
    title: "Train Better. Live Stronger.",
    description: "Premium Fitness Equipment Designed For Modern Living.",
    sliderImage: "/images/hero-products.png",
  },
  {
    id: -2,
    title: "Wellness Inside Out",
    description: "Curated gear for strength, recovery, and everyday movement.",
    sliderImage: "/images/promo-banner.png",
  },
  {
    id: -3,
    title: "Home Gym, Elevated",
    description: "Studio-quality equipment delivered across the UAE.",
    sliderImage: "/images/dumbbells.png",
  },
];

const STATS = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "500+", label: "Premium Products" },
  { value: "4.9★", label: "Customer Rating" },
  { value: "24 Hours", label: "UAE Delivery" },
];

const SLIDER_INTERVAL_MS = 5500;

export default function DesktopHero({
  sliders = [],
}: {
  sliders?: DashboardSlider[];
}) {
  const router = useRouter();
  const slides = sliders.length > 0 ? sliders : FALLBACK_SLIDES;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length]
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const timer = window.setInterval(goNext, SLIDER_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [slides.length, paused, goNext]);

  const active = slides[index];
  const headline =
    active.title?.trim() || "Train Better. Live Stronger.";
  const subhead =
    active.description?.trim() ||
    "Premium Fitness Equipment Designed For Modern Living.";

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.heroSlider}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className={styles.heroSlide}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <FallbackImage
              src={active.sliderImage}
              alt={headline}
              fill
              priority
              sizes={imageSizes.promoBanner}
              className={styles.heroSlideImage}
              fallbackSrc="/images/hero-products.png"
            />
          </motion.div>
        </AnimatePresence>

        <div className={styles.heroOverlay} />
        <div className={styles.heroGlow} />
      </div>

      <div className={styles.heroContent}>
        <motion.span
          className={styles.heroTag}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <span className={styles.heroTagDot} />
          Wellness Inside Out
        </motion.span>

        <AnimatePresence mode="wait">
          <motion.div
            key={`copy-${active.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className={styles.heroTitle}>{headline}</h1>
            <p className={styles.heroDesc}>{subhead}</p>
          </motion.div>
        </AnimatePresence>

        <div className={styles.heroActions}>
          <button
            type="button"
            className={styles.ctaPrimary}
            onClick={() => router.push("/categories")}
          >
            Shop Collection
            <ArrowRight size={16} />
          </button>
          <button
            type="button"
            className={styles.ctaSecondary}
            onClick={() => router.push("/categories")}
          >
            <Sparkles size={16} />
            Explore Categories
          </button>
          <button
            type="button"
            className={styles.ctaGhost}
            onClick={() => router.push("/blog")}
          >
            <Play size={15} fill="currentColor" />
            Watch Video
          </button>
        </div>

        <div className={styles.heroStats}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.heroStat}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.heroNav} ${styles.heroNavPrev}`}
            onClick={goPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            className={`${styles.heroNav} ${styles.heroNavNext}`}
            onClick={goNext}
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>

          <div className={styles.heroDots}>
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                className={`${styles.heroDot} ${
                  i === index ? styles.heroDotActive : ""
                }`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className={styles.heroProgress}>
            <div
              key={index}
              className={styles.heroProgressBar}
              style={{
                animationDuration: `${SLIDER_INTERVAL_MS}ms`,
                animationPlayState: paused ? "paused" : "running",
              }}
            />
          </div>
        </>
      )}
    </section>
  );
}
