import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/equipment/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/exercise/equipment/$id",
      params: { id: params.id },
      replace: true,
    });
  },
});
