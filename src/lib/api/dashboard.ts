import type {
  DashboardBanner,
  DashboardCategory,
  DashboardData,
  MainCategory,
  OfferBanner,
} from "./types";

function mapSubCategory(sub: Record<string, unknown>) {
  return {
    id:
      (sub.subCategoryId as number) ??
      (sub.id as number) ??
      0,
    subCategoryName:
      (sub.subCategoryName as string) ?? (sub.name as string) ?? "",
    subCategoryImage:
      (sub.subCategoryImage as string) ??
      (sub.categoryImage as string) ??
      "",
  };
}

function mapCategoryFromList(item: Record<string, unknown>): DashboardCategory {
  return {
    id: (item.id as number) ?? 0,
    categoryName:
      (item.categoryName as string) ??
      (item.mainCategoryName as string) ??
      "",
    categoryImage:
      (item.categoryImage as string) ??
      (item.mainCategoryImage as string) ??
      "",
    subCategories: (
      (item.subCategories as Record<string, unknown>[]) ?? []
    ).map(mapSubCategory),
  };
}

function mapCategoryFromMainCategory(
  item: Record<string, unknown>
): DashboardCategory {
  const nestedCategories =
    (item.categories as Record<string, unknown>[]) ?? [];
  const subCategories: DashboardCategory["subCategories"] = [];

  for (const nested of nestedCategories) {
    const subs = (nested.subCategories as Record<string, unknown>[]) ?? [];
    for (const sub of subs) {
      subCategories.push({
        id:
          (sub.subCategoryId as number) ??
          (sub.id as number) ??
          0,
        subCategoryName:
          (sub.subCategoryName as string) ?? (sub.name as string) ?? "",
        subCategoryImage:
          (sub.subCategoryImage as string) ??
          (nested.categoryImage as string) ??
          (item.mainCategoryImage as string) ??
          "",
      });
    }
  }

  return {
    id: (item.id as number) ?? 0,
    categoryName:
      (item.mainCategoryName as string) ??
      (item.categoryName as string) ??
      "",
    categoryImage:
      (item.mainCategoryImage as string) ??
      (item.categoryImage as string) ??
      "",
    subCategories,
  };
}

export function normalizeDashboardData(raw: DashboardData): DashboardData {
  const payload =
    raw && typeof raw === "object" && "data" in raw
      ? ((raw as { data?: DashboardData }).data ?? raw)
      : raw;

  const categoryList =
    payload.categoryList ??
    (payload as { homepageCategoryList?: DashboardCategory[] })
      .homepageCategoryList;

  let categories: DashboardCategory[] = categoryList ?? [];

  if (categories.length === 0) {
    const mainCategories =
      (payload as { mainCategories?: Record<string, unknown>[] })
        .mainCategories ?? [];
    categories = mainCategories.map(mapCategoryFromMainCategory);
  } else {
    categories = (categories as Record<string, unknown>[]).map((item) =>
      item.subCategories
        ? mapCategoryFromList(item)
        : mapCategoryFromMainCategory(item)
    );
  }

  const mapBanner = (item: Record<string, unknown>): DashboardBanner => ({
    id: (item.id as number) ?? 0,
    bannerName:
      (item.bannerName as string) ??
      (item.bannerTitle as string) ??
      (item.productName as string) ??
      "",
    bannerImage:
      (item.advertiseImage as string) ??
      (item.bannerImage as string) ??
      (item.productImage as string) ??
      "",
    bannerTitle: item.bannerTitle as string | undefined,
    bannerDescription: item.bannerDescription as string | undefined,
    bannerLink: item.bannerLink as string | undefined,
    productName: item.productName as string | undefined,
    productImage: item.productImage as string | undefined,
    originalPrice: item.originalPrice
      ? Number(item.originalPrice)
      : undefined,
    offerPrice: item.offerPrice ? Number(item.offerPrice) : undefined,
  });

  const mapBrand = (item: Record<string, unknown>) => ({
    id: (item.id as number) ?? 0,
    brandName: (item.brandName as string) ?? "",
    brandIcon:
      (item.brandIcon as string) ?? (item.brandLogo as string) ?? "",
  });

  const rawBrands = (payload.brandsList ?? []) as Record<string, unknown>[];

  const mapOfferBanner = (item: Record<string, unknown>): OfferBanner => ({
    id: (item.id as number) ?? 0,
    productName: (item.productName as string) ?? "",
    productImage:
      (item.productImage as string) ?? (item.bannerImage as string) ?? "",
    originalPrice: item.originalPrice != null ? String(item.originalPrice) : "",
    offerPrice: item.offerPrice != null ? String(item.offerPrice) : "",
    path: (item.path as string) ?? (item.bannerLink as string) ?? "",
    startTime: (item.startTime as string | null) ?? null,
    endTime: (item.endTime as string | null) ?? null,
    updated_at: (item.updated_at as string | null) ?? null,
  });

  const rawOfferBanners = (
    (payload.offerBannerList ??
      payload.bannerList ??
      []) as Record<string, unknown>[]
  ).filter((item) => item.productImage || item.offerPrice || item.path);

  return {
    ...payload,
    categoryList: categories,
    brandsList: rawBrands.map(mapBrand),
    advertiseBannerList:
      payload.advertiseBannerList?.map((item) =>
        mapBanner(item as Record<string, unknown>)
      ) ?? [],
    bannerList:
      payload.bannerList?.map((item) =>
        mapBanner(item as Record<string, unknown>)
      ) ?? [],
    offerBannerList: rawOfferBanners.map(mapOfferBanner),
    popularCollectionList: payload.popularCollectionList ?? [],
    sliderList: payload.sliderList ?? [],
    featuredProductList: payload.featuredProductList ?? [],
    topRatedProductList: payload.topRatedProductList ?? [],
    topSellingProductList: payload.topSellingProductList ?? [],
  };
}

export function mapDashboardCategoriesToMain(
  categories: DashboardCategory[]
): MainCategory[] {
  return categories.map((category) => ({
    id: category.id,
    mainCategoryName: category.categoryName,
    mainCategoryImage: category.categoryImage,
    categories: [
      {
        categoryId: category.id,
        categoryName: category.categoryName,
        categoryImage: category.categoryImage,
        subCategories: category.subCategories.map((sub) => ({
          subCategoryId: sub.id,
          subCategoryName: sub.subCategoryName,
        })),
      },
    ],
  }));
}
