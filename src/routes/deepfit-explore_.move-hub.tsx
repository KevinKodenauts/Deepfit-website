import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/deepfit-explore_/move-hub")({
  beforeLoad: () => {
    throw redirect({
      to: "/explore",
      search: { hub: "move" },
      replace: true,
    });
  },
});
