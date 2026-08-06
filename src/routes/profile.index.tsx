import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/profile/ProfilePage";

export const Route = createFileRoute("/profile/")({
  head: () => ({
    meta: [
      { title: "Profile — DEEPFIT" },
      { name: "description", content: "Manage your Deepfit account." },
    ],
  }),
  component: ProfilePage,
});
