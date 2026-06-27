import { PORTAL_CLIENT_ID } from "./config";
import {
  mapToCategoryProduct,
  type CategoryProductView,
} from "./mappers";
import { portalCustomerFields, portalRequest } from "./portalClient";
import type { ApiProduct } from "./types";

type WishlistResponse = {
  status: boolean;
  wishlistList: Array<{
    id: number;
    productDetails: ApiProduct;
  }>;
};

export type WishlistItemView = CategoryProductView & {
  wishlistId: number;
};

export async function getWishlist(
  customerId: number
): Promise<WishlistItemView[]> {
  const data = await portalRequest<WishlistResponse>("/wishlistbycustomer", {
    method: "POST",
    auth: true,
    formFields: portalCustomerFields(customerId),
  });

  return (data.wishlistList ?? []).map((item) => ({
    ...mapToCategoryProduct(item.productDetails),
    wishlistId: item.id,
  }));
}

export async function addToWishlist(
  customerId: number,
  productId: number,
  createdBy?: string
) {
  return portalRequest<{ status: boolean; message?: string }>("/addwishlist", {
    method: "POST",
    auth: true,
    formFields: {
      ...portalCustomerFields(customerId),
      productId: String(productId),
      ...(createdBy ? { created_by: createdBy } : {}),
    },
  });
}

export async function removeFromWishlist(
  customerId: number,
  wishlistId: number
) {
  return portalRequest<{ status: boolean; message?: string }>(
    "/deletewishlist",
    {
      method: "POST",
      auth: true,
      formFields: {
        id: String(wishlistId),
        clientId: String(PORTAL_CLIENT_ID),
        isDelete: "Yes",
      },
    }
  );
}
