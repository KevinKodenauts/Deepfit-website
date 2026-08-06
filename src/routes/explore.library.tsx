import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  equipment_ids: z.string().optional(),
  focus: z.string().optional(),
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
