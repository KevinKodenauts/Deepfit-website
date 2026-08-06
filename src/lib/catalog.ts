import type { HomeProductView, CategoryProductView } from "@/lib/api/mappers";
import type { Product } from "@/lib/products";

/** Adapt API product views to the New site ProductCard shape (keeps New design). */
export function homeProductToCard(product: HomeProductView): Product {
  return {
    slug: String(product.id),
    name: product.title,
    tagline: product.stockLabel || "Premium Deepfit product",
    price: product.price,
    compareAt:
      product.originalPrice > product.price ? product.originalPrice : undefined,
    image: product.image,
    category:
      product.mainCategoryName || product.categoryName || "All",
    badge: product.tag,
    rating: product.rating || 0,
    reviews: product.reviewCount || 0,
    colors: [],
    description: product.title,
    features: [],
    specs: {},
  };
}

export function categoryProductToCard(product: CategoryProductView): Product {
  return {
    slug: String(product.id),
    name: product.title,
    tagline: product.brand || product.deliveryTime || "Premium Deepfit product",
    price: product.price,
    compareAt:
      product.originalPrice && product.originalPrice > product.price
        ? product.originalPrice
        : undefined,
    image: product.image,
    category: "Strength",
    badge: product.badge,
    rating: product.rating || 0,
    reviews: product.reviewCount || 0,
    colors: [],
    description: product.title,
    features: [],
    specs: product.weight ? { Weight: product.weight } : {},
  };
}

export function productIdFromSlug(slug: string): number | null {
  const id = Number(slug);
  return Number.isFinite(id) && id > 0 ? id : null;
}
