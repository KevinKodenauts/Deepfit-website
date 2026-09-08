import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/exercise/equipment/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/exercise/library",
      search: {
        equipment_ids: params.id,
        focus: params.id,
      },
      replace: true,
    });
  },
});
