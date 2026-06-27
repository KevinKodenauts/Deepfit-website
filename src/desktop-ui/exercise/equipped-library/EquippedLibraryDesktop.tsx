"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  X,
  Play,
  Eye,
  Maximize2,
  Zap,
} from "lucide-react";
import { imageSizes } from "@/constants/imageSizes";
import { useEquippedLibraryPage } from "@/hooks/useEquippedLibraryPage";
import styles from "./equippedLibraryDesktop.module.css";

export default function EquippedLibraryDesktop() {
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
    <div className={styles.shell}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.backLink}
          onClick={() => router.back()}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderMain}>
            <span className={styles.badge}>Equipped Library</span>
            <h1 className={styles.pageTitle}>{headline}</h1>
            {!loading && !loadError && (
              <p className={styles.pageSubtitle}>
                {exercises.length}{" "}
                {exercises.length === 1 ? "exercise" : "exercises"} available
              </p>
            )}
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
        </header>

        {loading ? (
          <div className={styles.loadingGrid}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={styles.skeletonCard} />
            ))}
          </div>
        ) : loadError ? (
          <div className={styles.statusCard}>
            <p className={styles.statusText}>
              Could not load exercises. Please try again.
            </p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => router.refresh()}
            >
              Retry
            </button>
          </div>
        ) : exercises.length === 0 ? (
          <div className={styles.statusCard}>
            <p className={styles.statusText}>
              No exercises found for the selected equipment.
            </p>
          </div>
        ) : (
          <div className={styles.grid}>
            {exercises.map((exercise) => (
              <article key={exercise.id} className={styles.card}>
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
                    <span className={styles.targetBadge}>
                      {exercise.target}
                    </span>
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
                      <span className={styles.statValue}>
                        {exercise.standard}
                      </span>
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
                      className={styles.primaryBtn}
                    >
                      <Play size={14} fill="currentColor" />
                      START EXERCISE
                    </Link>
                  ) : (
                    <button type="button" className={styles.secondaryBtn}>
                      <Eye size={14} />
                      VIEW FORM GUIDE
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
