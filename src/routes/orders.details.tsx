import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { OrderDetailsPage } from "@/components/profile/OrderDetailsPage";

const searchSchema = z.object({
  orderId: z.coerce.number().optional(),
});

export const Route = createFileRoute("/orders/details")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Order Details — DEEPFIT" }],
  }),
  component: OrderDetailsPage,
});
