import type { ProductDetailView } from "@/lib/api/mappers";

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
