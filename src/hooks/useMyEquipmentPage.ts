import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getEquipmentList } from "@/lib/api/exercise";
import {
  getSelectedEquipment,
  parseEquipmentIds,
  saveSelectedEquipment,
} from "@/lib/exercise/selection";
import type { EquipmentItem } from "@/lib/api/types";

function resolveSelectedIds(idsParam?: string): number[] {
  const fromUrl = parseEquipmentIds(idsParam);
  if (fromUrl.length > 0) return fromUrl;

  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromLocation = parseEquipmentIds(params.get("ids"));
      if (fromLocation.length > 0) return fromLocation;
    } catch {
      // ignore
    }
  }

  return getSelectedEquipment().filter((id) => Number(id) > 0);
}

export function useMyEquipmentPage(idsParam?: string) {
  const navigate = useNavigate();
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const selectedIds = useMemo(
    () => resolveSelectedIds(idsParam),
    [idsParam],
  );
  const selectedKey = selectedIds.join(",");

  useEffect(() => {
    const ids = resolveSelectedIds(idsParam);

    if (ids.length === 0) {
      // Defer redirect so client navigation + sessionStorage can settle
      const timer = window.setTimeout(() => {
        const retry = resolveSelectedIds(idsParam);
        if (retry.length === 0) {
          void navigate({ to: "/exercise", replace: true });
        }
      }, 50);
      return () => window.clearTimeout(timer);
    }

    // Keep URL in sync when we recovered ids from sessionStorage
    if (!parseEquipmentIds(idsParam).length) {
      void navigate({
        to: "/exercise/my-equipment",
        search: { ids: ids.join(",") },
        replace: true,
      });
    }

    saveSelectedEquipment(ids);
    let cancelled = false;
    setLoading(true);
    setLoadError(false);

    getEquipmentList()
      .then((data) => {
        if (cancelled) return;
        const selected = new Set(ids.map(Number));
        setEquipmentList(
          data.filter((item) => selected.has(Number(item.id))),
        );
      })
      .catch(() => {
        if (cancelled) return;
        setEquipmentList([]);
        setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [navigate, selectedKey, idsParam]);

  const librarySearch = {
    equipment_ids: selectedKey,
  } as const;

  return {
    navigate,
    equipmentList,
    loading,
    loadError,
    selectedIds,
    librarySearch,
    reload: () => {
      const ids = resolveSelectedIds(idsParam);
      if (ids.length === 0) return;
      setLoading(true);
      setLoadError(false);
      getEquipmentList()
        .then((data) => {
          const selected = new Set(ids.map(Number));
          setEquipmentList(
            data.filter((item) => selected.has(Number(item.id))),
          );
        })
        .catch(() => {
          setEquipmentList([]);
          setLoadError(true);
        })
        .finally(() => setLoading(false));
    },
  };
}
