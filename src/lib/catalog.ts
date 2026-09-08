import type { HomeProductView, CategoryProductView } from "@/lib/api/mappers";
import type { Product } from "@/lib/products";

export function productNameSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Fuel Hub Whey Protein is listed at AED 0 until pricing is set. */
export function isComingSoonProduct(input: {
  name?: string;
  sku?: string;
  category?: string;
  price?: number;
}): boolean {
  if ((input.price ?? 0) > 0) return false;

  const sku = (input.sku ?? "").trim().toLowerCase();
  const nameSlug = productNameSlug(input.name ?? "");
  const isWhey = sku === "df-whey-protein" || nameSlug === "whey-protein";
  if (!isWhey) return false;

  const category = (input.category ?? "").trim().toLowerCase();
  if (category && !category.includes("fuel")) return false;
  return true;
}

function withComingSoon(
  product: Product,
  extras?: { sku?: string; category?: string }
): Product {
  const category = extras?.category ?? product.category;
  const sku = extras?.sku ?? product.sku;
  return {
    ...product,
    sku,
    category,
    comingSoon: isComingSoonProduct({
      name: product.name,
      sku,
      category,
      price: product.price,
    }),
  };
}

/** Adapt API product views to the New site ProductCard shape (keeps New design). */
export function homeProductToCard(product: HomeProductView): Product {
  const category =
    product.mainCategoryName || product.categoryName || "All";
  return withComingSoon({
    slug: String(product.id),
    name: product.title,
    tagline: product.stockLabel || "Premium Deepfit product",
    price: product.price,
    compareAt:
      product.originalPrice > product.price ? product.originalPrice : undefined,
    image: product.image,
    category,
    badge: product.tag,
    rating: product.rating || 0,
    reviews: product.reviewCount || 0,
    colors: [],
    description: product.title,
    features: [],
    specs: {},
    sku: product.sku,
  });
}

export function categoryProductToCard(product: CategoryProductView): Product {
  const category = product.categoryName || product.mainCategoryName || "Products";
  return withComingSoon({
    slug: String(product.id),
    name: product.title,
    tagline: product.brand || product.deliveryTime || "Premium Deepfit product",
    price: product.price,
    compareAt:
      product.originalPrice && product.originalPrice > product.price
        ? product.originalPrice
        : undefined,
    image: product.image,
    category,
    badge: product.badge,
    rating: product.rating || 0,
    reviews: product.reviewCount || 0,
    colors: [],
    description: product.title,
    features: [],
    specs: product.weight ? { Weight: product.weight } : {},
    sku: product.sku,
  });
}

export function productIdFromSlug(slug: string): number | null {
  const id = Number(slug);
  return Number.isFinite(id) && id > 0 ? id : null;
}
