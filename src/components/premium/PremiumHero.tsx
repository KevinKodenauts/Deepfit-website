"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import styles from "./premium.module.css";

const FLOATING = [
  { src: "/images/dumbbells.png", alt: "Dumbbells", className: styles.float1 },
  { src: "/images/eco-mat.png", alt: "Yoga mat", className: styles.float2 },
  {
    src: "/images/resistance-bands.png",
    alt: "Resistance bands",
    className: styles.float3,
  },
  { src: "/images/kettlebells.png", alt: "Kettlebell", className: styles.float4 },
  { src: "/images/medicine-ball.png", alt: "Medicine ball", className: styles.float5 },
];

const STATS = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "500+", label: "Premium Products" },
  { value: "4.9★", label: "Customer Rating" },
  { value: "24 Hours", label: "UAE Delivery" },
];

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 7) % 100}%`,
        top: `${(i * 23 + 11) % 100}%`,
        delay: `${(i % 8) * 0.6}s`,
        duration: `${8 + (i % 5)}s`,
        dx: `${((i % 3) - 1) * 40}px`,
        dy: `${-60 - (i % 4) * 20}px`,
      })),
    []
  );

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          className={styles.particle}
          style={
            {
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
              "--dx": p.dx,
              "--dy": p.dy,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

function AnimatedCounter({ value }: { value: string }) {
  const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9,]/g, "");
  const [count, setCount] = useState(0);
  const hasNumber = !Number.isNaN(numeric) && numeric > 0;

  useEffect(() => {
    if (!hasNumber) return;
    let frame = 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(numeric * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hasNumber, numeric]);

  if (!hasNumber) return <>{value}</>;
  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

export default function PremiumHero({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  return (
    <section className={`${styles.hero} ${compact ? styles.heroCompact : ""}`}>
      <div className={styles.heroBg} />
      <div className={styles.heroMesh} />
      <div className={styles.heroRays} />
      <Particles />

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <motion.div
            className={styles.tagline}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.taglineDot} />
            Wellness Inside Out
          </motion.div>

          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Train Better.
            <span className={styles.headlineAccent}>Live Stronger.</span>
          </motion.h1>

          <motion.p
            className={styles.subhead}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Premium Fitness Equipment Designed For Modern Living.
          </motion.p>

          <motion.div
            className={styles.heroActions}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
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
              <Play size={16} fill="currentColor" />
              Watch Video
            </button>
          </motion.div>

          <motion.div
            className={styles.statsRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <span className={styles.statValue}>
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {!compact && (
          <div className={styles.heroVisual} aria-hidden>
            <div className={`${styles.orb} ${styles.orb1}`} />
            <div className={`${styles.orb} ${styles.orb2}`} />
            {FLOATING.map((item) => (
              <div key={item.alt} className={`${styles.floatItem} ${item.className}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={140}
                  height={140}
                  priority
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
