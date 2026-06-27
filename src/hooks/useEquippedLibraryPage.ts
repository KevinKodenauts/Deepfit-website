"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getEquipmentList, getExercises } from "@/lib/api/exercise";
import {
  getSelectedEquipment,
  parseEquipmentIds,
} from "@/lib/exercise/selection";
import type { EquipmentItem, ExerciseItem } from "@/lib/api/types";

export type ExerciseView = {
  id: number;
  title: string;
  target: string;
  image: string;
  difficulty: string;
  standard: string;
  instructions: string;
  primaryAction: boolean;
  iconType: "zap" | "maximize";
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
    iconType: item.difficulty === "Intermediate" ? "zap" : "maximize",
    equipmentNames: (item.equipment ?? []).map((e) => e.name),
  };
}

export function useEquippedLibraryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
          availableEquipmentIds.includes(item.id),
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

  return {
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
  };
}
