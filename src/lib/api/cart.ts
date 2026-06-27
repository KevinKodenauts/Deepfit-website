import { invalidateCache, withCache } from "./cache";
import { parseProductGallery } from "./mappers";
import { portalCustomerFields, portalRequest } from "./portalClient";

export type ApiCartItem = {
  id: number;
  qty: string;
  productDetails: {
    id: number;
    productName: string;
    productGallery?: string | string[];
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

export function mapCartItem(item: ApiCartItem): CartItemView {
  const image =
    parseProductGallery(item.variantDetails?.variantImageGallery) !==
    "/images/whey-protein.png"
      ? parseProductGallery(item.variantDetails?.variantImageGallery)
      : parseProductGallery(item.productDetails.productGallery);

  return {
    id: item.id,
    productId: item.productDetails.id,
    variantId: item.variantDetails?.id,
    title: item.productDetails.productName,
    variant: item.variantDetails?.variantkey ?? "Standard",
    price: Number(item.variantDetails?.price ?? 0),
    qty: Number(item.qty ?? 1),
    image,
  };
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
      return (data.cartList ?? []).map(mapCartItem);
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
  productAttributeId: number;
  productVariantId: number;
};

export async function addToCart(customerId: number, params: AddToCartParams) {
  invalidateCartCache(customerId);
  return portalRequest<{ status: boolean; message?: string }>("/addcart", {
    method: "POST",
    auth: true,
    formFields: {
      ...portalCustomerFields(customerId),
      productId: params.productId,
      productAttributeId: params.productAttributeId,
      productVariantId: params.productVariantId,
      qty: String(params.qty),
    },
  });
}

export async function updateCartItem(
  customerId: number,
  cartItemId: number,
  qty: number
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
