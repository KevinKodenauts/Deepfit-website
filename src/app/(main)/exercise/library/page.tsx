"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronDown, X, Play, Eye } from "lucide-react";
import styles from "./library.module.css";
import { imageSizes } from "@/constants/imageSizes";
import { getEquipmentList, getExercises } from "@/lib/api/exercise";
import {
  getSelectedEquipment,
  parseEquipmentIds,
} from "@/lib/exercise/selection";
import type { EquipmentItem, ExerciseItem } from "@/lib/api/types";

type ExerciseView = {
  id: number;
  title: string;
  target: string;
  image: string;
  difficulty: string;
  standard: string;
  instructions: string;
  primaryAction: boolean;
  equipmentNames: string[];
};

function mapExercise(item: ExerciseItem): ExerciseView {
  return {
    id: item.id,
    title: item.exerciseName,
    target: (item.targetMuscle ?? "FULL BODY").toUpperCase(),
    image: item.exerciseImage || "/images/bicep-curl.png",
    difficulty: item.difficulty ?? "Beginner",
    standard:
      item.standardRecommendation ??
      `${item.sets ?? 3} sets, ${item.reps ?? 12} reps`,
    instructions: item.description ?? "",
    primaryAction: item.buttonType === "START_EXERCISE",
    equipmentNames: (item.equipment ?? []).map((e) => e.name),
  };
}

export default function EquippedLibraryPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <p style={{ padding: "24px", color: "#64748b" }}>
            Loading exercises...
          </p>
        </div>
      }
    >
      <EquippedLibraryContent />
    </Suspense>
  );
}

function EquippedLibraryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [exercises, setExercises] = useState<ExerciseView[]>([]);
  const [equipmentOptions, setEquipmentOptions] = useState<EquipmentItem[]>(
    []
  );
  const [activeFilterIds, setActiveFilterIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const availableEquipmentIds = useMemo(() => {
    const fromUrl = parseEquipmentIds(searchParams.get("equipment_ids"));
    if (fromUrl.length > 0) return fromUrl;
    const stored = getSelectedEquipment();
    if (stored.length > 0) return stored;
    const focus = Number(searchParams.get("focus"));
    return !Number.isNaN(focus) && focus > 0 ? [focus] : [];
  }, [searchParams]);

  const focusEquipmentId = Number(searchParams.get("focus"));

  useEffect(() => {
    const initialFilters =
      !Number.isNaN(focusEquipmentId) && focusEquipmentId > 0
        ? [focusEquipmentId]
        : availableEquipmentIds;
    setActiveFilterIds(initialFilters);
  }, [availableEquipmentIds, focusEquipmentId]);

  useEffect(() => {
    getEquipmentList()
      .then((data) => {
        const options = data.filter((item) =>
          availableEquipmentIds.includes(item.id)
        );
        setEquipmentOptions(options);
      })
      .catch(() => {
        setEquipmentOptions([]);
      });
  }, [availableEquipmentIds]);

  useEffect(() => {
    if (activeFilterIds.length === 0) {
      setExercises([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError(false);

    getExercises(activeFilterIds)
      .then((data) => {
        setExercises(data.map(mapExercise));
      })
      .catch(() => {
        setExercises([]);
        setLoadError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeFilterIds]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFiltersOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeFilters = equipmentOptions.filter((item) =>
    activeFilterIds.includes(item.id)
  );

  const headline =
    equipmentOptions.find((item) => item.id === focusEquipmentId)?.headline ??
    equipmentOptions[0]?.headline ??
    "Equipped Library";

  const removeFilter = (equipmentId: number) => {
    setActiveFilterIds((prev) => {
      const next = prev.filter((id) => id !== equipmentId);
      return next.length > 0 ? next : prev;
    });
  };

  const addFilter = (equipmentId: number) => {
    setActiveFilterIds((prev) =>
      prev.includes(equipmentId) ? prev : [...prev, equipmentId]
    );
    setFiltersOpen(false);
  };

  const inactiveOptions = equipmentOptions.filter(
    (item) => !activeFilterIds.includes(item.id)
  );

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
                </div>

                {exercise.instructions ? (
                  <p className={styles.instructions}>{exercise.instructions}</p>
                ) : null}

                {exercise.primaryAction ? (
                  <Link
                    href={`/exercise/active/${exercise.id}`}
                    className={styles.primaryBtn}
                  >
                    <Play size={13} fill="currentColor" />
                    START EXERCISE
                  </Link>
                ) : (
                  <button type="button" className={styles.secondaryBtn}>
                    <Eye size={13} />
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
