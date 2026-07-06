import { getCachedProductDetail } from "@/lib/product/productDetailCache";
import { invalidateCache, withCache } from "./cache";
import { parseProductGallery, parseProductPrice } from "./mappers";
import { getProductDetails } from "./products";
import { portalCustomerFields, portalRequest } from "./portalClient";

export type ApiCartItem = {
  id: number;
  qty: string;
  productDetails: {
    id: number;
    productName: string;
    productGallery?: string | string[];
    price?: string | number;
  };
  variantDetails?: {
    id: number;
    variantkey?: string;
    price?: string;
    variantImageGallery?: string | string[];
  };
};

export type CartItemView = {
  id: number;
  productId: number;
  variantId?: number;
  title: string;
  variant: string;
  price: number;
  qty: number;
  image: string;
};

type CartResponse = {
  status: boolean;
  cartList: ApiCartItem[];
  message?: string;
};

export function resolveCartItemPrice(item: ApiCartItem): number {
  const variantPrice = Number(item.variantDetails?.price ?? 0);
  if (variantPrice > 0) return variantPrice;

  const productPrice = Number(item.productDetails?.price ?? 0);
  if (productPrice > 0) return productPrice;

  return 0;
}

export function mapCartItem(item: ApiCartItem): CartItemView {
  const image =
    parseProductGallery(item.variantDetails?.variantImageGallery) !==
    "/images/whey-protein.png"
      ? parseProductGallery(item.variantDetails?.variantImageGallery)
      : parseProductGallery(item.productDetails.productGallery);

  return {
    id: item.id,
    productId: item.productDetails.id,
    variantId:
      item.variantDetails?.id && item.variantDetails.id > 0
        ? item.variantDetails.id
        : undefined,
    title: item.productDetails.productName,
    variant: item.variantDetails?.variantkey ?? "Standard",
    price: resolveCartItemPrice(item),
    qty: Number(item.qty ?? 1),
    image,
  };
}

async function enrichCartItemPrices(
  items: CartItemView[],
): Promise<CartItemView[]> {
  const missingPrice = items.filter((item) => item.price <= 0);
  if (missingPrice.length === 0) return items;

  const priceByProductId = new Map<number, number>();

  await Promise.all(
    missingPrice.map(async (item) => {
      if (priceByProductId.has(item.productId)) return;

      const cached = getCachedProductDetail(item.productId);
      if (cached?.price && cached.price > 0) {
        priceByProductId.set(item.productId, cached.price);
        return;
      }

      const details = await getProductDetails(item.productId);
      if (details) {
        const price = parseProductPrice(details);
        if (price > 0) {
          priceByProductId.set(item.productId, price);
        }
      }
    }),
  );

  return items.map((item) => {
    if (item.price > 0) return item;
    const resolved = priceByProductId.get(item.productId);
    return resolved && resolved > 0 ? { ...item, price: resolved } : item;
  });
}

export async function getCart(customerId: number): Promise<CartItemView[]> {
  return withCache(
    `cart:${customerId}`,
    async () => {
      const data = await portalRequest<CartResponse>("/cartbycustomer", {
        method: "POST",
        auth: true,
        formFields: portalCustomerFields(customerId),
      });
      const mapped = (data.cartList ?? []).map(mapCartItem);
      return enrichCartItemPrices(mapped);
    },
    30_000
  );
}

export function invalidateCartCache(customerId?: number) {
  if (customerId) {
    invalidateCache(`cart:${customerId}`);
    return;
  }
  invalidateCache("cart");
}

export type AddToCartParams = {
  productId: number;
  qty: number;
  productAttributeId?: number;
  productVariantId?: number;
};

export async function addToCart(customerId: number, params: AddToCartParams) {
  invalidateCartCache(customerId);
  const formFields: Record<string, string | number> = {
    ...portalCustomerFields(customerId),
    productId: params.productId,
    qty: String(params.qty),
  };

  if (params.productAttributeId != null) {
    formFields.productAttributeId = params.productAttributeId;
  }
  if (params.productVariantId != null) {
    formFields.productVariantId = params.productVariantId;
  }

  return portalRequest<{ status: boolean; message?: string }>("/addcart", {
    method: "POST",
    auth: true,
    formFields,
  });
}

export async function updateCartItem(
  customerId: number,
  cartItemId: number,
  qty: number,
) {
  invalidateCartCache(customerId);
  return portalRequest<{ status: boolean; message?: string }>("/editcart", {
    method: "POST",
    auth: true,
    formFields: {
      ...portalCustomerFields(customerId),
      id: cartItemId,
      qty: String(qty),
    },
  });
}

export async function removeCartItem(customerId: number, cartItemId: number) {
  invalidateCartCache(customerId);
  return portalRequest<{ status: boolean; message?: string }>("/deletecart", {
    method: "POST",
    auth: true,
    formFields: {
      id: cartItemId,
      clientId: portalCustomerFields(customerId).clientId,
      isDelete: "Yes",
      created_by: "customer",
    },
  });
}
