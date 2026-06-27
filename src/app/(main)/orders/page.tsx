"use client";

import ResponsivePage, {
  createLazyDesktop,
} from "@/components/ResponsivePage";
import OrdersMobile from "./OrdersMobile";

const OrdersDesktop = createLazyDesktop(
  () => import("@/desktop-ui/orders/OrdersDesktop")
);

export default function OrdersPage() {
  return <ResponsivePage mobile={<OrdersMobile />} desktopLazy={OrdersDesktop} />;
}
