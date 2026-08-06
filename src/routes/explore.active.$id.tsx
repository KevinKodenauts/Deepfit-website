import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/active/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/exercise/active/$id",
      params: { id: params.id },
      replace: true,
    });
  },
});
