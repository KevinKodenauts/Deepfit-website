import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { parseEquipmentIds } from "@/lib/exercise/selection";

const searchSchema = z.object({
  ids: z.union([z.string(), z.number()]).optional(),
});

export const Route = createFileRoute("/explore/my-equipment")({
  validateSearch: searchSchema,
  beforeLoad: ({ search }) => {
    const ids = parseEquipmentIds(search.ids);
    if (ids.length === 0) {
      throw redirect({
        to: "/explore",
        search: { hub: "move" },
        replace: true,
      });
    }

    throw redirect({
      to: "/exercise/library",
      search: {
        equipment_ids: ids.join(","),
        focus: String(ids[0]),
      },
      replace: true,
    });
  },
});
