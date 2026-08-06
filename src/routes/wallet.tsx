import { createFileRoute } from "@tanstack/react-router";
import { WalletPage } from "@/components/wallet/WalletPage";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet — DEEPFIT" },
      { name: "description", content: "View your Deepfit wallet balance and transactions." },
    ],
  }),
  component: WalletPage,
});
