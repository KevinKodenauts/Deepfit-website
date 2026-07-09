"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  filterOrdersByStatus,
  getCustomerOrders,
  groupOrdersByNumber,
  type OrderStatusFilter,
  type OrderSummary,
} from "@/lib/api/orders";
import { getCustomerId } from "@/lib/auth/session";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useOrderSync } from "@/hooks/useOrderSync";

export const ORDER_FILTERS: OrderStatusFilter[] = [
  "All Orders",
  "In Transit",
  "Shipping",
  "Return",
  "Cancel",
];

export function useOrdersPage() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] =
    useState<OrderStatusFilter>("All Orders");

  const loadOrders = useCallback((options?: { silent?: boolean }) => {
    if (authLoading || !isAuthenticated) return;

    const customerId = getCustomerId();
    if (!customerId) {
      setLoading(false);
      return;
    }

    if (!options?.silent) setLoading(true);
    getCustomerOrders(customerId)
      .then((data) => setOrders(groupOrdersByNumber(data)))
      .catch(() => setOrders([]))
      .finally(() => {
        if (!options?.silent) setLoading(false);
      });
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useOrderSync({
    onAny: () => {
      loadOrders({ silent: true });
    },
  });

  const filteredOrders = useMemo(
    () => filterOrdersByStatus(orders, selectedFilter),
    [orders, selectedFilter]
  );

  const getFilterCount = (filter: OrderStatusFilter) =>
    filter === "All Orders"
      ? orders.length
      : filterOrdersByStatus(orders, filter).length;

  return {
    authLoading,
    isAuthenticated,
    orders,
    loading,
    selectedFilter,
    setSelectedFilter,
    filteredOrders,
    getFilterCount,
  };
}
