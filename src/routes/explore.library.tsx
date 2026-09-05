import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  equipment_ids: z.union([z.string(), z.number()]).optional(),
  focus: z.union([z.string(), z.number()]).optional(),
});

export const Route = createFileRoute("/explore/library")({
  validateSearch: searchSchema,
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/exercise/library",
      search: {
        equipment_ids: search.equipment_ids,
        focus: search.focus,
      },
      replace: true,
    });
  },
});
