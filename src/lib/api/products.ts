import { CUSTOMER_API, CUSTOMER_PORTAL } from "./config";
import { apiRequest } from "./client";
import { invalidateCache, withCache } from "./cache";
import { normalizeDashboardData } from "./dashboard";
import { portalRequest } from "./portalClient";
import type { ApiProduct, DashboardData } from "./types";

type ProductListResponse = {
  status: boolean;
  productList: ApiProduct[];
};

type ProductsByCategoryResponse = {
  status: boolean;
  productList: ApiProduct[];
  count: number;
  limit?: number;
  offset?: number;
};

type ProductDetailsResponse = {
  status: boolean;
  productDetails: ApiProduct[];
};

async function fetchLegacyDashboardData(): Promise<DashboardData | null> {
  try {
    const data = await apiRequest<DashboardData & { status?: boolean }>(
      `${CUSTOMER_API}/get_dashboard_data/`
    );
    if (data.status === false) return null;
    return normalizeDashboardData(data);
  } catch {
    return null;
  }
}

export async function getDashboardData(options?: {
  force?: boolean;
}): Promise<DashboardData> {
  if (options?.force) {
    invalidateDashboardCache();
  }

  return withCache(
    "dashboard",
    async () => {
      try {
        const data = await portalRequest<DashboardData & { status?: boolean }>(
          "/dashboardfeaturedproducts"
        );
        if (data.status !== false) {
          return normalizeDashboardData(data);
        }
      } catch {
        // Fall through to legacy endpoint like the mobile app.
      }

      const legacy = await fetchLegacyDashboardData();
      if (legacy) return legacy;

      throw new Error("Failed to load home data.");
    },
    2 * 60_000
  );
}

export function invalidateDashboardCache() {
  invalidateCache("dashboard");
}

export async function getAllProducts(): Promise<ApiProduct[]> {
  const data = await apiRequest<ProductListResponse>(
    `${CUSTOMER_PORTAL}/allproductlist`
  );
  return data.productList ?? [];
}

export async function getFeaturedProducts(): Promise<ApiProduct[]> {
  const data = await apiRequest<{ featuredProductList: ApiProduct[] }>(
    `${CUSTOMER_PORTAL}/featuredproducts`
  );
  return data.featuredProductList ?? [];
}

export async function getTrendingProducts(): Promise<ApiProduct[]> {
  const data = await apiRequest<{ trendingProductList: ApiProduct[] }>(
    `${CUSTOMER_PORTAL}/trendingProducts`
  );
  return data.trendingProductList ?? [];
}

export async function getProductsByCategory(
  mainCategoryId: number,
  categoryId?: number,
  options?: { limit?: number; offset?: number }
): Promise<{ products: ApiProduct[]; count: number; hasMore: boolean }> {
  const body: Record<string, number> = { mainCategoryId };
  if (categoryId) body.categoryId = categoryId;

  const limit = options?.limit ?? 21;
  const offset = options?.offset ?? 0;
  const url = `${CUSTOMER_PORTAL}/productsbycategories?limit=${limit}&offset=${offset}`;

  const data = await apiRequest<ProductsByCategoryResponse>(url, {
    method: "POST",
    body,
  });
  const products = data.productList ?? [];
  const total = data.count ?? products.length;
  const nextOffset = offset + products.length;
  return {
    products,
    count: total,
    hasMore: nextOffset < total,
  };
}

export async function searchProducts(
  query: string,
  options?: { limit?: number; offset?: number; sortingType?: string }
): Promise<{ products: ApiProduct[]; count: number; hasMore: boolean }> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { products: [], count: 0, hasMore: false };
  }

  const limit = options?.limit ?? 21;
  const offset = options?.offset ?? 0;
  const url = `${CUSTOMER_PORTAL}/productsbycategories?limit=${limit}&offset=${offset}`;

  const data = await apiRequest<ProductsByCategoryResponse>(url, {
    method: "POST",
    body: {
      productName: trimmed,
      sortingType: options?.sortingType ?? "date",
    },
    auth: true,
  });

  const products = data.productList ?? [];
  const total = data.count ?? products.length;
  const nextOffset = offset + products.length;

  return {
    products,
    count: total,
    hasMore: nextOffset < total,
  };
}

export async function getProductDetails(
  productId: number
): Promise<ApiProduct | null> {
  const data = await apiRequest<ProductDetailsResponse>(
    `${CUSTOMER_PORTAL}/productdetailsbyproduct`,
    {
      method: "POST",
      body: { productId },
    }
  );
  return data.productDetails?.[0] ?? null;
}
