import { createFileRoute } from "@tanstack/react-router";
import { ChangePasswordPage } from "@/components/profile/ChangePasswordPage";

export const Route = createFileRoute("/profile/change-password")({
  head: () => ({
    meta: [{ title: "Change Password — DEEPFIT" }],
  }),
  component: ChangePasswordPage,
});
