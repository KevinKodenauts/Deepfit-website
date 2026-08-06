import { createFileRoute } from "@tanstack/react-router";
import { WishlistPage } from "@/components/profile/WishlistPage";

export const Route = createFileRoute("/profile/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — DEEPFIT" },
      { name: "description", content: "Your saved Deepfit products." },
    ],
  }),
  component: WishlistPage,
});
