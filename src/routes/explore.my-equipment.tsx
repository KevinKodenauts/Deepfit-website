import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  ids: z.string().optional(),
});

export const Route = createFileRoute("/explore/my-equipment")({
  validateSearch: searchSchema,
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/exercise/my-equipment",
      search: { ids: search.ids },
      replace: true,
    });
  },
});
