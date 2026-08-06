import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AddressesPage } from "@/components/profile/AddressesPage";

const searchSchema = z.object({
  select: z.string().optional(),
});

export const Route = createFileRoute("/profile/addresses")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "My Addresses — DEEPFIT" }],
  }),
  component: AddressesPage,
});
