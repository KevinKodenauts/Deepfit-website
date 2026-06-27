"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getEquipmentList } from "@/lib/api/exercise";
import {
  getSelectedEquipment,
  parseEquipmentIds,
  saveSelectedEquipment,
} from "@/lib/exercise/selection";
import type { EquipmentItem } from "@/lib/api/types";

export function useMyEquipmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const selectedIds = useMemo(() => {
    const fromUrl = parseEquipmentIds(searchParams.get("ids"));
    if (fromUrl.length > 0) return fromUrl;
    return getSelectedEquipment();
  }, [searchParams]);

  useEffect(() => {
    if (selectedIds.length === 0) {
      router.replace("/exercise");
      return;
    }

    saveSelectedEquipment(selectedIds);
    setLoading(true);
    setLoadError(false);

    getEquipmentList()
      .then((data) => {
        const selected = data.filter((item) => selectedIds.includes(item.id));
        setEquipmentList(selected);
      })
      .catch(() => {
        setEquipmentList([]);
        setLoadError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router, selectedIds]);

  const libraryHref = `/exercise/library?equipment_ids=${selectedIds.join(",")}`;

  return {
    router,
    equipmentList,
    loading,
    loadError,
    selectedIds,
    libraryHref,
  };
}
