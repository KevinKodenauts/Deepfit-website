"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNotifications } from "@/contexts/NotificationContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useRequestGuard } from "@/hooks/useRequestGuard";
import {
  fetchNotifications,
  filterNotificationsByTab,
  markNotificationsAsRead,
  type AppNotification,
} from "@/lib/api/notifications";

export const NOTIFICATION_TABS = ["All", "Orders", "Offers", "Health"] as const;
export type NotificationTab = (typeof NOTIFICATION_TABS)[number];

export function useNotificationsPage() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { refreshUnreadCount } = useNotifications();
  const { begin, isActive } = useRequestGuard();
  const hasLoadedRef = useRef(false);
  const [activeTab, setActiveTab] = useState<NotificationTab>("All");
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = useCallback(
    async (options?: { silent?: boolean }) => {
      const silent = options?.silent ?? hasLoadedRef.current;
      const request = begin();

      if (!silent) {
        setLoading(true);
      }
      setError("");

      const result = await fetchNotifications();
      if (!isActive(request)) return;

      if (!result) {
        setNotifications([]);
        setError("Unable to load notifications");
        setLoading(false);
        return;
      }

      setNotifications(result.notifications);
      hasLoadedRef.current = true;
      setLoading(false);

      if (result.unreadCount > 0) {
        const marked = await markNotificationsAsRead();
        if (!isActive(request)) return;

        if (marked) {
          setNotifications((current) =>
            current.map((item) => ({ ...item, isRead: true }))
          );
          await refreshUnreadCount({ force: true });
        }
      }
    },
    [begin, isActive, refreshUnreadCount]
  );

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    void loadNotifications();
  }, [authLoading, isAuthenticated, loadNotifications]);

  const filteredNotifications = useMemo(
    () => filterNotificationsByTab(notifications, activeTab),
    [notifications, activeTab]
  );

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.isRead).length,
    [notifications]
  );

  const getTabCount = (tab: NotificationTab) =>
    filterNotificationsByTab(notifications, tab).length;

  return {
    authLoading,
    isAuthenticated,
    activeTab,
    setActiveTab,
    notifications,
    filteredNotifications,
    unreadCount,
    loading,
    error,
    loadNotifications,
    getTabCount,
  };
}

export type NotificationDateGroup = {
  label: string;
  items: AppNotification[];
};

export function groupNotificationsByDate(
  notifications: AppNotification[]
): NotificationDateGroup[] {
  const today: AppNotification[] = [];
  const yesterday: AppNotification[] = [];
  const thisWeek: AppNotification[] = [];
  const earlier: AppNotification[] = [];
  const now = new Date();

  for (const item of notifications) {
    if (!item.createdAt) {
      earlier.push(item);
      continue;
    }

    const diffDays = Math.floor(
      (now.getTime() - item.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) today.push(item);
    else if (diffDays === 1) yesterday.push(item);
    else if (diffDays < 7) thisWeek.push(item);
    else earlier.push(item);
  }

  const groups: NotificationDateGroup[] = [];
  if (today.length) groups.push({ label: "Today", items: today });
  if (yesterday.length) groups.push({ label: "Yesterday", items: yesterday });
  if (thisWeek.length) groups.push({ label: "This Week", items: thisWeek });
  if (earlier.length) groups.push({ label: "Earlier", items: earlier });

  return groups;
}

export function notificationTypeLabel(type: string): string {
  switch (type.toLowerCase()) {
    case "order":
      return "Order";
    case "promo":
    case "offer":
      return "Offer";
    default:
      return "Health";
  }
}
