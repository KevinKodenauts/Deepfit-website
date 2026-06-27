"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getEquipmentById } from "@/lib/api/exercise";
import { getSelectedEquipment } from "@/lib/exercise/selection";
import type { EquipmentItem } from "@/lib/api/types";

export function useEquipmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const equipmentId = Number(params.id);
  const [equipment, setEquipment] = useState<EquipmentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!equipmentId || Number.isNaN(equipmentId)) {
      setLoadError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError(false);

    getEquipmentById(equipmentId)
      .then((data) => {
        if (!data) {
          setLoadError(true);
          return;
        }
        setEquipment(data);
      })
      .catch(() => {
        setLoadError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [equipmentId]);

  const handleShowExercise = () => {
    const selectedIds = getSelectedEquipment();
    const filterIds =
      selectedIds.length > 0 ? selectedIds : equipment ? [equipment.id] : [];
    router.push(
      `/exercise/library?equipment_ids=${filterIds.join(",")}&focus=${equipmentId}`,
    );
  };

  const tags = equipment?.tags?.length
    ? equipment.tags
    : [equipment?.category ?? "Equipment"];
  const steps = equipment?.instructions ?? [];

  return {
    router,
    equipmentId,
    equipment,
    loading,
    loadError,
    handleShowExercise,
    tags,
    steps,
  };
}
