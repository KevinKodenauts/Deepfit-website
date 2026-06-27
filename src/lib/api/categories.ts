import { portalRequest } from "./portalClient";
import { invalidateCache, withCache } from "./cache";
import type { MainCategory } from "./types";

type MainCategoriesResponse = {
  mainCategoryDetails: MainCategory[];
};

export async function getMainCategories(): Promise<MainCategory[]> {
  return withCache(
    "main-categories",
    async () => {
      const data = await portalRequest<MainCategoriesResponse>(
        "/maincategorieslist"
      );
      return data.mainCategoryDetails ?? [];
    },
    2 * 60_000
  );
}

export function invalidateCategoriesCache() {
  invalidateCache("main-categories");
}
