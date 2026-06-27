import type { MainCategory } from "@/lib/api/types";

export type CategoryDisplayItem = {
  key: string;
  name: string;
  image: string;
  mainCategoryId: number;
  categoryId?: number;
};

export function buildMainCategorySectionItems(
  mainCategory: MainCategory
): CategoryDisplayItem[] {
  const items: CategoryDisplayItem[] = [
    {
      key: `main-${mainCategory.id}`,
      name: mainCategory.mainCategoryName,
      image: mainCategory.mainCategoryImage,
      mainCategoryId: mainCategory.id,
    },
  ];

  const nested = mainCategory.categories ?? [];
  if (nested.length === 0) return items;

  for (const category of nested) {
    const subs = category.subCategories ?? [];
    if (subs.length > 0) {
      for (const sub of subs) {
        items.push({
          key: `sub-${category.categoryId}-${sub.subCategoryId}`,
          name: sub.subCategoryName,
          image: category.categoryImage || mainCategory.mainCategoryImage,
          mainCategoryId: mainCategory.id,
          categoryId: category.categoryId,
        });
      }
      continue;
    }

    items.push({
      key: `cat-${category.categoryId}`,
      name: category.categoryName,
      image: category.categoryImage || mainCategory.mainCategoryImage,
      mainCategoryId: mainCategory.id,
      categoryId: category.categoryId,
    });
  }

  return items;
}

export type SidebarCategory = {
  id: number;
  name: string;
  image: string;
};

export function buildSidebarCategories(
  mainCategory: MainCategory
): SidebarCategory[] {
  const nested = mainCategory.categories ?? [];
  if (nested.length > 0) {
    return nested.map((category) => ({
      id: category.categoryId,
      name: category.categoryName,
      image: mainCategory.mainCategoryImage,
    }));
  }

  return [
    {
      id: mainCategory.id,
      name: mainCategory.mainCategoryName,
      image: mainCategory.mainCategoryImage,
    },
  ];
}

export function buildProductsHref(
  mainCategoryId: number,
  categoryId?: number
): string {
  const params = new URLSearchParams({ main: String(mainCategoryId) });
  if (categoryId) params.set("category", String(categoryId));
  return `/categories/products?${params.toString()}`;
}
