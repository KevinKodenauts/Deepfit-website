"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { getEquipmentForProduct } from "@/lib/api/exercise";
import { saveSelectedEquipment } from "@/lib/exercise/selection";

type OpenProductEquipmentParams = {
  productId: number;
  productName: string;
  productSku?: string;
};

export function useProductEquipmentScan() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const openProductEquipment = useCallback(
    async ({ productId, productName, productSku }: OpenProductEquipmentParams) => {
      if (loading) return;

      setLoading(true);
      setError("");

      try {
        const equipment = await getEquipmentForProduct({
          productId,
          productName,
          productSku,
        });

        if (equipment.length === 0) {
          setError("No exercise equipment found for this product");
          return;
        }

        const ids = equipment.map((item) => item.id);
        saveSelectedEquipment(ids);
        router.push(`/exercise/my-equipment?ids=${ids.join(",")}`);
      } catch {
        setError("Unable to load exercise equipment");
      } finally {
        setLoading(false);
      }
    },
    [loading, router],
  );

  return {
    openProductEquipment,
    loading,
    error,
    clearError,
  };
}
