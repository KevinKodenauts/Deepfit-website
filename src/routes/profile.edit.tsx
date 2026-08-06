import { createFileRoute } from "@tanstack/react-router";
import { UpdateProfilePage } from "@/components/profile/UpdateProfilePage";

export const Route = createFileRoute("/profile/edit")({
  head: () => ({
    meta: [{ title: "Update Profile — DEEPFIT" }],
  }),
  component: UpdateProfilePage,
});
