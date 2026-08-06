import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronDown, X, Play, Eye } from "lucide-react";
import { z } from "zod";
import { Nav } from "@/components/site/Nav";
import { EquipmentCardSkeleton } from "@/components/skeleton/PageSkeletons";
import { getEquipmentList, getExercises } from "@/lib/api/exercise";
import {
  getSelectedEquipment,
  parseEquipmentIds,
} from "@/lib/exercise/selection";
import type { EquipmentItem, ExerciseItem } from "@/lib/api/types";
import styles from "@/styles/explore-library.module.css";

const searchSchema = z.object({
  equipment_ids: z.string().optional(),
  focus: z.string().optional(),
});

export const Route = createFileRoute("/exercise/library")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Exercise Library — DEEPFIT" },
      {
        name: "description",
        content:
          "Browse exercises matched to your selected Deepfit equipment.",
      },
    ],
  }),
  component: EquippedLibraryPage,
});

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
    primaryAction:
      !item.buttonType || item.buttonType === "START_EXERCISE",
    equipmentNames: (item.equipment ?? []).map((e) => e.name),
  };
}

function EquippedLibraryPage() {
  const router = useRouter();
  const search = Route.useSearch();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [exercises, setExercises] = useState<ExerciseView[]>([]);
  const [equipmentOptions, setEquipmentOptions] = useState<EquipmentItem[]>(
    [],
  );
  const [activeFilterIds, setActiveFilterIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const availableEquipmentIds = useMemo(() => {
    const fromUrl = parseEquipmentIds(search.equipment_ids);
    if (fromUrl.length > 0) return fromUrl;
    const stored = getSelectedEquipment();
    if (stored.length > 0) return stored;
    const focus = Number(search.focus);
    return !Number.isNaN(focus) && focus > 0 ? [focus] : [];
  }, [search.equipment_ids, search.focus]);

  const focusEquipmentId = Number(search.focus);

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
        setEquipmentOptions(
          data.filter((item) => availableEquipmentIds.includes(item.id)),
        );
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
    activeFilterIds.includes(item.id),
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
      prev.includes(equipmentId) ? prev : [...prev, equipmentId],
    );
    setFiltersOpen(false);
  };

  const inactiveOptions = equipmentOptions.filter(
    (item) => !activeFilterIds.includes(item.id),
  );

  return (
    <div className="bg-background text-foreground">
      <Nav />
      <div
        className={styles.container}
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <header className={styles.header}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => router.history.back()}
            aria-label="Go back"
          >
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
                  className={`${styles.filterChevron} ${
                    filtersOpen ? styles.filterChevronOpen : ""
                  }`}
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
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <EquipmentCardSkeleton key={i} />
              ))}
            </div>
          ) : null}
          {!loading && loadError ? (
            <p style={{ padding: "24px", color: "#64748b" }}>
              Could not load exercises. Please try again.
            </p>
          ) : null}
          {!loading && !loadError && exercises.length === 0 ? (
            <p style={{ padding: "24px", color: "#64748b" }}>
              No exercises found for the selected equipment.{" "}
              <Link to="/exercise" className="underline">
                Choose equipment
              </Link>
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
                  <img
                    src={exercise.image}
                    alt={exercise.title}
                    className={styles.exerciseImage}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className={styles.imageOverlay} />
                  <div className={styles.imageContent}>
                    <span className={styles.targetBadge}>{exercise.target}</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h2 className={styles.exerciseTitle}>{exercise.title}</h2>
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
                  </div>

                  {exercise.instructions ? (
                    <p className={styles.instructions}>
                      {exercise.instructions}
                    </p>
                  ) : null}

                  {exercise.primaryAction ? (
                    <Link
                      to="/exercise/active/$id"
                      params={{ id: String(exercise.id) }}
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
    </div>
  );
}
