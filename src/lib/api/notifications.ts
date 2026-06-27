import { portalUrl } from "./config";
import { apiRequest } from "./client";

export type AppNotification = {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date | null;
};

type NotificationsResponse = {
  status: boolean;
  notifications?: unknown[];
  unreadCount?: number;
};

function mapNotification(item: Record<string, unknown>): AppNotification {
  const rawDate = item.createdAt;
  let createdAt: Date | null = null;

  if (typeof rawDate === "string" && rawDate) {
    const parsed = new Date(rawDate);
    createdAt = Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  return {
    id: typeof item.id === "number" ? item.id : Number(item.id) || 0,
    title: String(item.title ?? ""),
    message: String(item.message ?? ""),
    type: String(item.type ?? ""),
    isRead: Boolean(item.isRead),
    createdAt,
  };
}

export async function fetchNotifications(): Promise<{
  notifications: AppNotification[];
  unreadCount: number;
} | null> {
  try {
    const data = await apiRequest<NotificationsResponse>(
      portalUrl("/getcustomernotifications"),
      { auth: true }
    );

    if (!data.status) {
      return null;
    }

    const notifications = (data.notifications ?? []).map((item) =>
      mapNotification(item as Record<string, unknown>)
    );
    const unreadCount =
      data.unreadCount ?? notifications.filter((item) => !item.isRead).length;

    return { notifications, unreadCount };
  } catch {
    return null;
  }
}

export async function getUnreadNotificationCount(): Promise<number> {
  const result = await fetchNotifications();
  return result?.unreadCount ?? 0;
}

export async function markNotificationsAsRead(
  ids?: number[]
): Promise<boolean> {
  try {
    const data = await apiRequest<{ status: boolean }>(
      portalUrl("/viewcustomernotification"),
      {
        method: "POST",
        auth: true,
        body: ids && ids.length > 0 ? { ids } : {},
      }
    );

    return data.status === true;
  } catch {
    return false;
  }
}

export function formatNotificationDate(date: Date | null): string {
  if (!date) return "";

  const now = new Date();
  const local = new Date(date);
  const diffDays = Math.floor(
    (now.getTime() - local.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) {
    return local.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  if (diffDays < 7) {
    return local.toLocaleString(undefined, {
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return local.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function filterNotificationsByTab(
  notifications: AppNotification[],
  tab: string
): AppNotification[] {
  switch (tab) {
    case "Orders":
      return notifications.filter(
        (item) => item.type.toLowerCase() === "order"
      );
    case "Offers":
      return notifications.filter((item) =>
        ["promo", "offer"].includes(item.type.toLowerCase())
      );
    case "Health":
      return notifications.filter((item) => {
        const type = item.type.toLowerCase();
        return type !== "order" && type !== "promo" && type !== "offer";
      });
    default:
      return notifications;
  }
}
