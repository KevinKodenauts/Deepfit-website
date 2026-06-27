"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronDown,
  X,
  Play,
  Eye,
  Maximize2,
  Zap,
} from "lucide-react";
import styles from "./library.module.css";
import { imageSizes } from "@/constants/imageSizes";
import { useEquippedLibraryPage } from "@/hooks/useEquippedLibraryPage";

export default function EquippedLibraryMobile() {
  const {
    router,
    filtersOpen,
    setFiltersOpen,
    exercises,
    loading,
    loadError,
    filterRef,
    activeFilterIds,
    activeFilters,
    headline,
    removeFilter,
    addFilter,
    inactiveOptions,
  } = useEquippedLibraryPage();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ChevronLeft size={24} />
        </button>
        <div className={styles.headerMain}>
          <div>
            <h1 className={styles.pageTitle}>{headline}</h1>
            <p className={styles.pageSubtitle}>Equipped Library</p>
          </div>
          <div className={styles.filterDropdown} ref={filterRef}>
            <button
              type="button"
              className={styles.filterTrigger}
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              aria-haspopup="true"
            >
              {activeFilterIds.length} Filters Active
              <ChevronDown
                size={16}
                className={`${styles.filterChevron} ${filtersOpen ? styles.filterChevronOpen : ""}`}
              />
            </button>
            {filtersOpen ? (
              <div className={styles.filterMenu}>
                {activeFilters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    className={styles.chip}
                    onClick={() => removeFilter(filter.id)}
                  >
                    {filter.name}
                    <X size={14} className={styles.chipClose} />
                  </button>
                ))}
                {inactiveOptions.length > 0 ? (
                  <div className={styles.moreFilters}>
                    {inactiveOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={styles.moreChip}
                        onClick={() => addFilter(option.id)}
                      >
                        + {option.name}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div
        className={`${styles.listArea} ${
          !loading && exercises.length < 2 ? styles.listAreaCompact : ""
        }`}
      >
        {loading ? (
          <p style={{ padding: "24px", color: "#64748b" }}>
            Loading exercises...
          </p>
        ) : null}
        {!loading && loadError ? (
          <p style={{ padding: "24px", color: "#64748b" }}>
            Could not load exercises. Please try again.
          </p>
        ) : null}
        {!loading && !loadError && exercises.length === 0 ? (
          <p style={{ padding: "24px", color: "#64748b" }}>
            No exercises found for the selected equipment.
          </p>
        ) : null}
        {!loading &&
          exercises.map((exercise, i) => (
            <motion.div
              key={exercise.id}
              className={styles.exerciseCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={exercise.image}
                  alt={exercise.title}
                  fill
                  sizes={imageSizes.exerciseCard}
                  className={styles.exerciseImage}
                />
                <div className={styles.imageOverlay} />
                <div className={styles.imageContent}>
                  <span className={styles.targetBadge}>{exercise.target}</span>
                  <h2 className={styles.exerciseTitle}>{exercise.title}</h2>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.statsRow}>
                  <div className={styles.statBlock}>
                    <span className={styles.statLabel}>Difficulty</span>
                    <span className={styles.statValue}>
                      {exercise.difficulty}
                    </span>
                  </div>
                  <div className={styles.statBlock}>
                    <span className={styles.statLabel}>Standard</span>
                    <span className={styles.statValue}>{exercise.standard}</span>
                  </div>
                  <button type="button" className={styles.iconButton}>
                    {exercise.iconType === "zap" ? (
                      <Zap size={16} />
                    ) : (
                      <Maximize2 size={16} />
                    )}
                  </button>
                </div>

                <p className={styles.instructions}>{exercise.instructions}</p>

                {exercise.primaryAction ? (
                  <Link
                    href={`/exercise/active/${exercise.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <button type="button" className={styles.primaryBtn}>
                      <Play size={14} fill="currentColor" />
                      START EXERCISE
                    </button>
                  </Link>
                ) : (
                  <button type="button" className={styles.secondaryBtn}>
                    <Eye size={14} />
                    VIEW FORM GUIDE
                  </button>
                )}
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
