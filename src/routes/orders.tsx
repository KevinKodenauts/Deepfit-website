import { createFileRoute } from "@tanstack/react-router";
import { OrdersPage } from "@/components/profile/OrdersPage";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [{ title: "My Orders — DEEPFIT" }],
  }),
  component: OrdersPage,
});
