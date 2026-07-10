import type { ApiProduct } from "./types";

const FALLBACK_IMAGE = "/images/whey-protein.png";

function extractGalleryUrls(
  gallery: string | string[] | null | undefined
): string[] {
  if (!gallery) return [];

  if (Array.isArray(gallery)) {
    return gallery.filter(Boolean);
  }

  if (typeof gallery === "string") {
    const urls = gallery.match(/https?:\/\/[^\s'"]+/g);
    if (urls?.length) return urls;

    try {
      const normalized = gallery.replace(/'/g, '"');
      const parsed = JSON.parse(normalized) as string[];
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch {
      // fall through
    }
  }

  return [];
}

function pickBestImageUrl(urls: string[]): string {
  if (urls.length === 0) return FALLBACK_IMAGE;

  // Prefer hosted product images over external placeholders (many API
  // Unsplash URLs are stale and return 404 from Next.js image optimizer).
  const s3Url = urls.find(
    (url) =>
      url.includes("kodecloud-bucket") ||
      url.includes("s3.ap-south-1.amazonaws.com") ||
      url.startsWith("/images/")
  );
  if (s3Url) return s3Url;

  const nonUnsplash = urls.find((url) => !url.includes("images.unsplash.com"));
  if (nonUnsplash) return nonUnsplash;

  return urls[0];
}

export function parseProductGallery(
  gallery: string | string[] | null | undefined
): string {
  return pickBestImageUrl(extractGalleryUrls(gallery));
}

/** Listing/card image: prefer first variant gallery when the product is multi-variant. */
export function resolveProductImage(product: ApiProduct): string {
  const realVariants = (product.variants ?? []).filter((variant) => variant.id > 0);
  if (realVariants.length > 0) {
    const firstVariantUrls = extractGalleryUrls(
      realVariants[0].variantImageGallery
    );
    if (firstVariantUrls.length > 0) {
      return pickBestImageUrl(firstVariantUrls);
    }
  }

  return parseProductGallery(product.productGallery);
}

export function parseProductPrice(product: ApiProduct): number {
  if (product.price !== undefined && product.price !== null) {
    return Number(product.price);
  }

  const firstVariant = product.variants?.[0];
  if (firstVariant?.price) {
    return Number(firstVariant.price);
  }

  return 0;
}

export function parseOriginalPrice(
  price: number,
  product: ApiProduct
): number | null {
  const discount = Number(product.discountedPercentage ?? 0);
  const hasDiscount =
    product.isDiscountApplicable === true ||
    product.isDiscountApplicable === "true";

  if (hasDiscount && discount > 0) {
    return Math.round(price / (1 - discount / 100));
  }

  return null;
}

export function getProductBadge(
  product: ApiProduct
): { text: string; type: "purple" | "red" } | null {
  if (
    product.isTopSellingProduct === true ||
    product.isTopSellingProduct === "true"
  ) {
    return { text: "BESTSELLER", type: "red" };
  }

  if (
    product.isFeaturedProduct === true ||
    product.isFeaturedProduct === "true"
  ) {
    return { text: "TOP RATED", type: "purple" };
  }

  const discount = Number(product.discountedPercentage ?? 0);
  if (discount > 0) {
    return { text: `SAVE ${discount}%`, type: "red" };
  }

  return null;
}

export type HomeProductView = {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  tag?: string;
  inStock: boolean;
  stockLabel: string;
};

export type CategoryProductView = {
  id: number;
  brand: string;
  title: string;
  price: number;
  originalPrice: number | null;
  image: string;
  badge?: string;
  badgeType?: "purple" | "red";
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  weight?: string;
};

export function mapToHomeProduct(product: ApiProduct): HomeProductView {
  const price = parseProductPrice(product);
  const original = parseOriginalPrice(price, product);
  const badge = getProductBadge(product);
  const inStock =
    product.inStock === true ||
    product.inStock === "true" ||
    (product.stockStatus !== "outofstock" && product.productStatus !== "Out of stock");

  return {
    id: product.id,
    title: product.productName,
    price,
    originalPrice: original ?? price,
    image: resolveProductImage(product),
    tag: badge?.text,
    inStock,
    stockLabel: inStock ? "In stock" : "Out of stock",
  };
}

export function mapToCategoryProduct(product: ApiProduct): CategoryProductView {
  const price = parseProductPrice(product);
  const original = parseOriginalPrice(price, product);
  const badge = getProductBadge(product);
  const ratings = Array.isArray(product.averageRatingsDetails)
    ? product.averageRatingsDetails[0]
    : product.averageRatingsDetails;

  return {
    id: product.id,
    brand:
      product.clientDetails?.companyName ??
      product.subCategoryDetails?.subCategoryName ??
      "DEEPFIT",
    title: product.productName,
    price,
    originalPrice: original,
    image: resolveProductImage(product),
    badge: badge?.text,
    badgeType: badge?.type,
    rating: Number(ratings?.averageRating ?? 0),
    reviewCount: Number(ratings?.totalRatings ?? 0),
    deliveryTime: product.expectedDeliveryTime ?? "12 MINS",
    weight:
      product.attributes?.[0]?.value ??
      product.productShortDescription ??
      undefined,
  };
}

export type ProductReviewView = {
  id: number;
  author: string;
  initials: string;
  rating: number;
  text: string;
  dateLabel: string;
  image?: string;
  isVerified: boolean;
  helpfulCount: number;
};

export type RatingBreakdown = {
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
};

export type ProductDetailView = {
  id: number;
  title: string;
  sku: string;
  subtitle: string;
  description: string;
  images: string[];
  price: number;
  originalPrice: number | null;
  mainCategoryId: number;
  categoryId: number;
  categoryName: string;
  deliveryTime: string;
  variantLabel: string;
  variants: Array<{
    id: number;
    attributeId?: number;
    label: string;
    price: number;
    image: string;
  }>;
  rating: number;
  ratingCount: number;
  ratingBreakdown: RatingBreakdown;
  reviews: ProductReviewView[];
  isTopSelling: boolean;
  specs?: string;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatReviewDate(value?: string): string {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week ago`;
  return date.toLocaleDateString();
}

function mapUserReview(
  item: NonNullable<ApiProduct["userRatingsDetails"]>[number],
  index: number
): ProductReviewView {
  const author = item.customerName ?? item.userName ?? "Customer";
  const galleryImage = Array.isArray(item.reviewGallery)
    ? item.reviewGallery[0]
    : item.reviewGallery;

  return {
    id: item.id ?? index,
    author,
    initials: getInitials(author),
    rating: Number(item.rating ?? 5),
    text: item.review ?? item.reviewText ?? item.comment ?? "",
    dateLabel: formatReviewDate(item.reviewDate ?? item.created_at),
    image: item.reviewImage ?? galleryImage,
    isVerified: item.isVerified === true || item.isVerified === "true",
    helpfulCount: Number(item.helpfulCount ?? 0),
  };
}

export function mapToProductDetail(product: ApiProduct): ProductDetailView {
  const variants = (product.variants ?? [])
    .filter((variant) => variant.id > 0)
    .map((variant) => ({
      id: variant.id,
      attributeId:
        variant.attributeDetails?.id && variant.attributeDetails.id > 0
          ? variant.attributeDetails.id
          : undefined,
      label: variant.variantkey ?? variant.attributeDetails?.value ?? "Standard",
      price: Number(variant.price ?? 0),
      image: (() => {
        const variantUrls = extractGalleryUrls(variant.variantImageGallery);
        if (variantUrls.length > 0) return pickBestImageUrl(variantUrls);
        return parseProductGallery(product.productGallery);
      })(),
    }));

  const firstVariant = variants[0];
  const price = firstVariant?.price ?? parseProductPrice(product);
  const original = parseOriginalPrice(price, product);
  const attributeName =
    product.attributes?.[0]?.name ??
    product.variants?.[0]?.attributeDetails?.name ??
    "Variant";

  const ratings = Array.isArray(product.averageRatingsDetails)
    ? product.averageRatingsDetails[0]
    : product.averageRatingsDetails;

  const galleryUrls = extractGalleryUrls(product.productGallery);
  const variantImages = variants.map((v) => v.image).filter(Boolean);
  // Multi-variant: keep images 1:1 with variants so detail UI can sync selection.
  const images =
    variants.length > 1 && variantImages.length > 0
      ? variantImages
      : galleryUrls.length > 0
        ? galleryUrls.map((url) => pickBestImageUrl([url]))
        : variantImages;

  return {
    id: product.id,
    title: product.productName,
    sku: product.sku ?? "",
    subtitle:
      product.productShortDescription ??
      product.subCategoryDetails?.subCategoryName ??
      "",
    description: product.productDescription ?? "",
    images: images.length > 0 ? images : [resolveProductImage(product)],
    price,
    originalPrice: original,
    mainCategoryId: product.mainCategoryDetails?.id ?? 0,
    categoryId: product.categoryDetails?.id ?? 0,
    categoryName:
      product.categoryDetails?.categoryName ??
      product.mainCategoryDetails?.mainCategoryName ??
      "Products",
    deliveryTime: product.expectedDeliveryTime ?? "12 MINS",
    variantLabel: attributeName,
    variants:
      variants.length > 0
        ? variants
        : [
            {
              id: 0,
              label: "Standard",
              price,
              image: parseProductGallery(product.productGallery),
            },
          ],
    rating: Number(ratings?.averageRating ?? 0),
    ratingCount: Number(ratings?.totalRatings ?? 0),
    ratingBreakdown: {
      five: Number(ratings?.fiveStarRating ?? 0),
      four: Number(ratings?.fourStarRating ?? 0),
      three: Number(ratings?.threeStarRating ?? 0),
      two: Number(ratings?.twoStarRating ?? 0),
      one: Number(ratings?.oneStarRating ?? 0),
    },
    reviews: (product.userRatingsDetails ?? []).map(mapUserReview),
    isTopSelling:
      product.isTopSellingProduct === true ||
      product.isTopSellingProduct === "true",
    specs: product.additionalInformation?.[0]?.value,
  };
}

export function expandToCount<T extends { id: number }>(
  items: T[],
  count: number
): (T & { rowKey: string })[] {
  if (items.length === 0) return [];

  return Array.from({ length: count }, (_, index) => {
    const source = items[index % items.length];
    return {
      ...source,
      rowKey: `${source.id}-${index}`,
    };
  });
}
