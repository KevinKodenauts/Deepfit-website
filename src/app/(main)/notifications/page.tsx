"use client";

import ResponsivePage, {
  createLazyDesktop,
} from "@/components/ResponsivePage";
import NotificationsMobile from "./NotificationsMobile";

const NotificationsDesktop = createLazyDesktop(
  () => import("@/desktop-ui/notifications/NotificationsDesktop")
);

export default function NotificationsPage() {
  return (
    <ResponsivePage
      mobile={<NotificationsMobile />}
      desktopLazy={NotificationsDesktop}
    />
  );
}
