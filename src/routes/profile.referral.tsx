import { createFileRoute } from "@tanstack/react-router";
import { ReferralPage } from "@/components/profile/ReferralPage";

export const Route = createFileRoute("/profile/referral")({
  head: () => ({
    meta: [
      { title: "Referral Tree — DEEPFIT" },
      { name: "description", content: "Invite friends and track your referral network." },
    ],
  }),
  component: ReferralPage,
});
