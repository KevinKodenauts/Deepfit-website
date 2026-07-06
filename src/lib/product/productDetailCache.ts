import type { ProductDetailView } from "@/lib/api/mappers";
import type { CatalogSyncEvent } from "@/lib/realtime/catalogSyncEvent";
import { affectsProduct } from "@/lib/realtime/catalogSyncEvent";

const cache = new Map<number, ProductDetailView>();

export function getCachedProductDetail(productId: number) {
  return cache.get(productId) ?? null;
}

export function setCachedProductDetail(
  productId: number,
  product: ProductDetailView
) {
  cache.set(productId, product);
}

export function clearCachedProductDetail(productId: number) {
  cache.delete(productId);
}

export function clearAllProductDetailCache() {
  cache.clear();
}

export function clearProductDetailCacheForEvent(event: CatalogSyncEvent) {
  if (event.entity === "product" && event.entityId != null) {
    clearCachedProductDetail(event.entityId);
    return;
  }

  if (
    event.entity === "product" ||
    event.entity === "category" ||
    event.entity === "sub_category" ||
    event.entity === "dashboard"
  ) {
    clearAllProductDetailCache();
  }
}

export { affectsProduct };
