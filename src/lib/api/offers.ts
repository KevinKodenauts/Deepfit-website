import { CUSTOMER_API, CUSTOMER_PORTAL } from "./config";
import { apiRequest } from "./client";
import { portalRequest } from "./portalClient";
import type { OfferBanner } from "./types";

type OfferBannerResponse = {
  status?: boolean;
  offerBannerList?: OfferBanner[];
  bannerList?: Array<Record<string, unknown>>;
};

function isBlank(value?: string | null) {
  const trimmed = value?.trim();
  return !trimmed || trimmed.toLowerCase() === "no";
}

function mapOfferBanner(item: Record<string, unknown>): OfferBanner | null {
  const image =
    String(item.productImage ?? item.bannerImage ?? "").trim();
  if (!image) return null;

  return {
    id: Number(item.id) || 0,
    productName: isBlank(item.productName as string)
      ? ""
      : String(item.productName),
    productImage: image,
    originalPrice: isBlank(item.originalPrice as string)
      ? ""
      : String(item.originalPrice),
    offerPrice: isBlank(item.offerPrice as string)
      ? ""
      : String(item.offerPrice),
    path: isBlank(item.path as string)
      ? String(item.bannerLink ?? "")
      : String(item.path),
    startTime: (item.startTime as string | null) ?? null,
    endTime: (item.endTime as string | null) ?? null,
    updated_at: (item.updated_at as string | null) ?? null,
  };
}

function isWithinSchedule(banner: OfferBanner) {
  const now = Date.now();
  if (banner.startTime) {
    const start = new Date(banner.startTime).getTime();
    if (!Number.isNaN(start) && now < start) return false;
  }
  if (banner.endTime) {
    const end = new Date(banner.endTime).getTime();
    if (!Number.isNaN(end) && now > end) return false;
  }
  return true;
}

function fromPayload(data: OfferBannerResponse | null): OfferBanner[] {
  const raw = data?.offerBannerList ?? data?.bannerList ?? [];
  return raw
    .map((item) => mapOfferBanner(item as Record<string, unknown>))
    .filter((item): item is OfferBanner => Boolean(item))
    .filter(isWithinSchedule);
}

export function offerBannerHref(banner: OfferBanner) {
  const path = banner.path?.trim();
  if (!path || path.toLowerCase() === "no") return "/shop";
  if (/^https?:\/\//i.test(path)) return path;
  return path.startsWith("/") ? path : `/${path}`;
}

export function formatOfferPrice(value?: string) {
  const trimmed = value?.trim();
  if (!trimmed) return "";
  if (/aed/i.test(trimmed)) return trimmed;
  if (/^\d+(\.\d+)?$/.test(trimmed)) return `AED ${trimmed}`;
  return trimmed;
}

export async function getActiveOfferBanners(): Promise<OfferBanner[]> {
  try {
    const data = await portalRequest<OfferBannerResponse>("/offerbanners");
    const banners = fromPayload(data);
    if (banners.length) return banners;
  } catch {
    // Fall through to customer API.
  }

  try {
    const data = await apiRequest<OfferBannerResponse>(
      `${CUSTOMER_API}/get_offer_banners/`
    );
    const banners = fromPayload(data);
    if (banners.length) return banners;
  } catch {
    // Fall through to dashboard payload that already includes offer banners.
  }

  try {
    const data = await apiRequest<OfferBannerResponse>(
      `${CUSTOMER_API}/get_dashboard_data/`
    );
    return fromPayload(data);
  } catch {
    return [];
  }
}
