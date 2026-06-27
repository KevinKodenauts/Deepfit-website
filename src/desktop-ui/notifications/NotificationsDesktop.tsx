"use client";

import Link from "next/link";
import {
  Bell,
  HeartPulse,
  Package,
  Percent,
  RefreshCw,
} from "lucide-react";
import {
  groupNotificationsByDate,
  NOTIFICATION_TABS,
  notificationTypeLabel,
  useNotificationsPage,
} from "@/hooks/useNotificationsPage";
import { formatNotificationDate } from "@/lib/api/notifications";
import styles from "./notificationsDesktop.module.css";

function iconForType(type: string) {
  switch (type.toLowerCase()) {
    case "order":
      return Package;
    case "promo":
    case "offer":
      return Percent;
    default:
      return HeartPulse;
  }
}

function iconClassForType(type: string) {
  switch (type.toLowerCase()) {
    case "order":
      return styles.iconOrder;
    case "promo":
    case "offer":
      return styles.iconOffer;
    default:
      return styles.iconHealth;
  }
}

function typeBadgeClass(type: string) {
  switch (type.toLowerCase()) {
    case "order":
      return styles.badgeOrder;
    case "promo":
    case "offer":
      return styles.badgeOffer;
    default:
      return styles.badgeHealth;
  }
}

export default function NotificationsDesktop() {
  const {
    activeTab,
    setActiveTab,
    notifications,
    filteredNotifications,
    unreadCount,
    loading,
    error,
    loadNotifications,
    getTabCount,
  } = useNotificationsPage();

  const groupedNotifications = groupNotificationsByDate(filteredNotifications);

  const subtitle = loading
    ? "Loading your notifications..."
    : notifications.length === 0
      ? "Stay updated on orders, offers, and health tips"
      : unreadCount > 0
        ? `${unreadCount} unread ${unreadCount === 1 ? "notification" : "notifications"}`
        : `${notifications.length} ${notifications.length === 1 ? "notification" : "notifications"} in your inbox`;

  return (
    <div className={styles.shell}>
      <div className={styles.inner}>
        <header className={styles.pageHeader}>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.pageTitle}>Notifications</h1>
              <p className={styles.pageSubtitle}>{subtitle}</p>
            </div>
            <button
              type="button"
              className={styles.refreshBtn}
              onClick={() => void loadNotifications({ silent: false })}
              disabled={loading}
              aria-label="Refresh notifications"
            >
              <RefreshCw
                size={18}
                className={loading ? styles.refreshSpinning : undefined}
              />
              Refresh
            </button>
          </div>
        </header>

        <div className={styles.layout}>
          <aside className={styles.filtersCard} aria-label="Notification filters">
            <p className={styles.filtersTitle}>FILTER BY TYPE</p>
            {NOTIFICATION_TABS.map((tab) => {
              const isActive = activeTab === tab;
              const count = getTabCount(tab);

              return (
                <button
                  key={tab}
                  type="button"
                  className={`${styles.filterBtn} ${
                    isActive ? styles.filterBtnActive : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span>{tab}</span>
                  <span className={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </aside>

          <div className={styles.main}>
            {loading && notifications.length === 0 ? (
              <div className={styles.loadingWrap}>
                <div className={styles.loadingSpinner} />
              </div>
            ) : error ? (
              <div className={styles.emptyState}>
                <Bell size={72} strokeWidth={1.2} className={styles.emptyIcon} />
                <h2 className={styles.emptyTitle}>Unable to load notifications</h2>
                <p className={styles.emptyText}>{error}</p>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={() => void loadNotifications()}
                >
                  Try again
                </button>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className={styles.emptyState}>
                <Bell size={72} strokeWidth={1.2} className={styles.emptyIcon} />
                <h2 className={styles.emptyTitle}>
                  {activeTab === "All"
                    ? "No notifications yet"
                    : `No ${activeTab.toLowerCase()} notifications`}
                </h2>
                <p className={styles.emptyText}>
                  {activeTab === "All"
                    ? "Order updates, exclusive offers, and wellness tips will appear here."
                    : `You do not have any ${activeTab.toLowerCase()} notifications right now. Try another filter.`}
                </p>
                {activeTab !== "All" ? (
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={() => setActiveTab("All")}
                  >
                    View all notifications
                  </button>
                ) : (
                  <Link href="/categories" className={styles.actionBtn}>
                    Browse products
                  </Link>
                )}
              </div>
            ) : (
              <div className={styles.feed}>
                {groupedNotifications.map((group) => (
                  <section key={group.label} className={styles.dateGroup}>
                    <h2 className={styles.dateLabel}>{group.label}</h2>
                    <div className={styles.notificationList}>
                      {group.items.map((item) => {
                        const Icon = iconForType(item.type);

                        return (
                          <article
                            key={item.id}
                            className={`${styles.notificationCard} ${
                              item.isRead ? styles.notificationRead : ""
                            }`}
                          >
                            <div
                              className={`${styles.iconWrap} ${iconClassForType(item.type)}`}
                            >
                              <Icon size={22} strokeWidth={2} />
                            </div>

                            <div className={styles.cardBody}>
                              <div className={styles.cardTop}>
                                <div className={styles.cardMeta}>
                                  <span
                                    className={`${styles.typeBadge} ${typeBadgeClass(item.type)}`}
                                  >
                                    {notificationTypeLabel(item.type)}
                                  </span>
                                  {item.createdAt ? (
                                    <time
                                      className={styles.timestamp}
                                      dateTime={item.createdAt.toISOString()}
                                    >
                                      {formatNotificationDate(item.createdAt)}
                                    </time>
                                  ) : null}
                                </div>
                                {!item.isRead ? (
                                  <span
                                    className={styles.unreadBadge}
                                    aria-label="Unread"
                                  />
                                ) : null}
                              </div>

                              <h3 className={styles.cardTitle}>
                                {item.title || "Notification"}
                              </h3>
                              {item.message ? (
                                <p className={styles.cardMessage}>{item.message}</p>
                              ) : null}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
