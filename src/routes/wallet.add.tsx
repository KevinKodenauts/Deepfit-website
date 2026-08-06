import { createFileRoute } from "@tanstack/react-router";
import { AddMoneyPage } from "@/components/wallet/AddMoneyPage";

export const Route = createFileRoute("/wallet/add")({
  head: () => ({
    meta: [
      { title: "Add Money — DEEPFIT" },
      { name: "description", content: "Top up your Deepfit wallet." },
    ],
  }),
  component: AddMoneyPage,
});
