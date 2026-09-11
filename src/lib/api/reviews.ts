import { portalUrl } from "./config";
import { apiRequest } from "./client";

export async function getReviewedProductIds(productIds: number[]) {
  const ids = [...new Set(productIds.filter((id) => Number.isFinite(id) && id > 0))];
  if (ids.length === 0) return [] as number[];

  const data = await apiRequest<{
    status: boolean;
    reviewedProductIds?: Array<number | string>;
  }>(portalUrl("/customerproductreviewstatus"), {
    method: "POST",
    body: { productIds: ids },
    auth: true,
  });

  if (!data.status || !Array.isArray(data.reviewedProductIds)) return [];
  return data.reviewedProductIds
    .map((id) => Number(id))
    .filter((id) => Number.isFinite(id) && id > 0);
}

export async function submitProductReview(payload: {
  productId: number;
  starRating: number;
  reviewComment: string;
}) {
  return apiRequest<{
    status: boolean;
    message?: string;
    averageRating?: string;
    totalRatings?: number;
  }>(portalUrl("/adduserratings"), {
    method: "POST",
    body: {
      productId: payload.productId,
      starRating: payload.starRating,
      reviewComment: payload.reviewComment,
    },
    auth: true,
  });
}
