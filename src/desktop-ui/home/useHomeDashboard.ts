"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboardData } from "@/lib/api/products";
import { mapDashboardCategoriesToMain } from "@/lib/api/dashboard";
import type { DashboardData, MainCategory } from "@/lib/api/types";
import { useAuth } from "@/contexts/AuthContext";
import { useAddresses } from "@/contexts/AddressContext";
import { useCart } from "@/contexts/CartContext";
import { useCatalogSync } from "@/hooks/useCatalogSync";
import { useRequestGuard } from "@/hooks/useRequestGuard";

export {
  formatAddressLabel,
  formatUserName,
} from "@/contexts/AddressContext";

export function useHomeDashboard() {
  const router = useRouter();
  const { isAuthenticated, sessionVersion } = useAuth();
  const { refreshCart } = useCart();
  const {
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    locationLine,
    refreshAddresses,
  } = useAddresses();
  const { begin, isActive } = useRequestGuard();
  const hasLoadedRef = useRef(false);
  const lastSessionVersionRef = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const loadDashboard = useCallback(
    async (options?: { silent?: boolean; force?: boolean }) => {
      const silent = options?.silent ?? hasLoadedRef.current;
      const request = begin();

      if (!silent) {
        setIsLoading(true);
      }

      try {
        const data = await getDashboardData({ force: options?.force });
        if (!isActive(request)) return;

        setDashboard(data);
        const categories =
          data.categoryList && data.categoryList.length > 0
            ? mapDashboardCategoriesToMain(data.categoryList)
            : [];
        setMainCategories(categories);
        hasLoadedRef.current = true;
      } catch {
        if (!isActive(request)) return;
        setDashboard(null);
        setMainCategories([]);
      } finally {
        if (isActive(request)) {
          setIsLoading(false);
        }
      }
    },
    [begin, isActive]
  );

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    if (sessionVersion === lastSessionVersionRef.current) return;

    lastSessionVersionRef.current = sessionVersion;
    if (sessionVersion === 0) return;

    hasLoadedRef.current = false;
    void loadDashboard({ force: true });
    void refreshCart({ silent: false });
  }, [sessionVersion, loadDashboard, refreshCart]);

  useCatalogSync(() => {
    void loadDashboard({ silent: true });
    void refreshCart({ silent: true });
  });

  const handleCategorySelect = useCallback(
    (index: number, category?: MainCategory) => {
      setSelectedCategoryIndex(index);
      if (index > 0 && category) {
        router.push(`/categories?main=${category.id}`);
      }
    },
    [router]
  );

  const categorySections = dashboard?.categoryList ?? [];
  const visibleCategories =
    selectedCategoryIndex === 0
      ? categorySections
      : categorySections.filter(
          (_, index) => index + 1 === selectedCategoryIndex
        );

  return {
    isLoading,
    dashboard,
    mainCategories,
    selectedCategoryIndex,
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    locationLine,
    isAuthenticated,
    loadAddresses: refreshAddresses,
    handleCategorySelect,
    visibleCategories,
  };
}
