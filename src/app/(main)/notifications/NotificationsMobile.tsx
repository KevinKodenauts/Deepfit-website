"use client";

import { useRouter } from "next/navigation";
import { Bell, ChevronLeft, Package, Percent } from "lucide-react";
import {
  NOTIFICATION_TABS,
  useNotificationsPage,
} from "@/hooks/useNotificationsPage";
import { formatNotificationDate } from "@/lib/api/notifications";
import styles from "./notifications.module.css";

function iconForType(type: string) {
  switch (type.toLowerCase()) {
    case "order":
      return Package;
    case "promo":
    case "offer":
      return Percent;
    default:
      return Bell;
  }
}

function iconClassForType(type: string) {
  switch (type.toLowerCase()) {
    case "order":
      return styles.iconSlate;
    case "promo":
    case "offer":
      return styles.iconPurple;
    default:
      return styles.iconTeal;
  }
}

export default function NotificationsMobile() {
  const router = useRouter();
  const {
    activeTab,
    setActiveTab,
    notifications,
    filteredNotifications,
    loading,
    error,
    loadNotifications,
  } = useNotificationsPage();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.pageTitle}>Notifications</h1>
      </header>

      <div className={styles.tabsScroll}>
        {NOTIFICATION_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {loading && notifications.length === 0 ? (
          <div className={styles.centerState}>
            <div className={styles.loadingSpinner} />
          </div>
        ) : error ? (
          <div className={styles.centerState}>
            <p className={styles.stateText}>{error}</p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => void loadNotifications()}
            >
              Try again
            </button>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className={styles.centerState}>
            <Bell size={72} className={styles.emptyIcon} />
            <p className={styles.stateTitle}>No notifications yet</p>
            <p className={styles.stateText}>
              Order updates and offers will appear here
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => {
            const Icon = iconForType(item.type);

            return (
              <article
                key={item.id}
                className={`${styles.card} ${item.isRead ? styles.cardRead : ""}`}
              >
                <div
                  className={`${styles.iconWrap} ${iconClassForType(item.type)}`}
                >
                  <Icon size={24} />
                </div>
                <div className={styles.info}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.title}>
                      {item.title || "Notification"}
                    </h3>
                    {item.createdAt && (
                      <span className={styles.time}>
                        {formatNotificationDate(item.createdAt)}
                      </span>
                    )}
                  </div>
                  {item.message ? (
                    <p className={styles.desc}>{item.message}</p>
                  ) : null}
                </div>
                {!item.isRead ? <div className={styles.unreadDot} /> : null}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
