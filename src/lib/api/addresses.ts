import { UAE_COUNTRY } from "@/constants/uaeAddress";
import { getStoredUser } from "@/lib/auth/session";
import { ApiError } from "./client";
import { PORTAL_CLIENT_ID } from "./config";
import { portalRequest } from "./portalClient";

export type AddressView = {
  id: number;
  type: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
  phone?: string;
  fullName?: string;
  addressLabel?: string;
};

type AddressListResponse = {
  status: boolean;
  message?: string;
  addressList?: Array<{
    id: number;
    addressType?: string;
    addressLabel?: string;
    fullName?: string;
    mobileNo?: string;
    addressLine1?: string;
    addressLine2?: string;
    address?: string;
    customerAddress?: string;
    city?: string;
    customerCity?: string;
    state?: string;
    customerState?: string;
    pincode?: string;
    customerPincode?: string;
    country?: string;
    customerCountry?: string;
    isDefault?: string | boolean;
    customerDetails?: { customerName?: string; customerMobile?: string };
  }>;
};

function capitalizeAddressType(type?: string): string {
  if (!type) return "Home";
  const lower = type.toLowerCase();
  if (lower.includes("work") || lower.includes("office")) return "Work";
  if (lower.includes("home") || lower.includes("house")) return "Home";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function inferAddressType(
  item: NonNullable<AddressListResponse["addressList"]>[number]
): string {
  const label = item.addressLabel ?? item.addressType;
  if (label) return capitalizeAddressType(label);

  const street = (item.address ?? item.customerAddress ?? "").toLowerCase();
  if (street.includes("work") || street.includes("office")) return "Work";
  if (street.includes("home") || street.includes("house")) return "Home";
  return "Home";
}

function mapAddress(
  item: NonNullable<AddressListResponse["addressList"]>[number]
): AddressView {
  const street =
    item.address ?? item.customerAddress ?? item.addressLine1 ?? "";
  const line2 = item.addressLine2?.trim();

  return {
    id: item.id,
    type: inferAddressType(item),
    address: [street, line2].filter(Boolean).join(", "),
    city: item.customerCity ?? item.city ?? "",
    state: item.customerState ?? item.state ?? "",
    pincode: item.customerPincode ?? item.pincode ?? "",
    country: item.customerCountry ?? item.country ?? UAE_COUNTRY,
    isDefault:
      item.isDefault === true ||
      item.isDefault === "true" ||
      item.isDefault === "Yes" ||
      item.isDefault === "YES",
    phone: item.mobileNo ?? item.customerDetails?.customerMobile,
    fullName: item.fullName ?? item.customerDetails?.customerName,
    addressLabel: item.addressLabel ?? item.addressType,
  };
}

function actorName(override?: string): string {
  const user = getStoredUser();
  return override ?? user?.customerName ?? user?.name ?? "Customer";
}

export async function getAddresses(customerId: number): Promise<AddressView[]> {
  const data = await portalRequest<AddressListResponse>(
    "/addressesbycustomer",
    {
      method: "POST",
      auth: true,
      formFields: { customerId: String(customerId) },
    }
  );

  if (!data.status) {
    throw new ApiError(data.message ?? "Failed to load addresses");
  }

  return (data.addressList ?? []).map(mapAddress);
}

export async function addAddress(payload: {
  customerId: number;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  addressType: string;
  country?: string;
  createdBy?: string;
}) {
  return portalRequest<{ status: boolean; message?: string; id?: number }>(
    "/addcustomeraddress",
    {
      method: "POST",
      auth: true,
      formFields: {
        customerId: String(payload.customerId),
        clientId: String(PORTAL_CLIENT_ID),
        address: payload.addressLine1.trim(),
        city: payload.city.trim(),
        state: payload.state,
        pincode: payload.pincode,
        country: payload.country ?? UAE_COUNTRY,
        addressType: payload.addressType.toLowerCase(),
        created_by: actorName(payload.createdBy),
      },
    }
  );
}

export async function updateAddress(payload: {
  customerId: number;
  addressId: number;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  addressType: string;
  country?: string;
  isDefault?: boolean;
  updatedBy?: string;
}) {
  return portalRequest<{ status: boolean; message?: string }>(
    "/editcustomeraddress",
    {
      method: "POST",
      auth: true,
      formFields: {
        id: String(payload.addressId),
        customerId: String(payload.customerId),
        clientId: String(PORTAL_CLIENT_ID),
        address: payload.addressLine1.trim(),
        city: payload.city.trim(),
        state: payload.state,
        pincode: payload.pincode,
        country: payload.country ?? UAE_COUNTRY,
        addressType: payload.addressType.toLowerCase(),
        updated_by: actorName(payload.updatedBy),
        ...(payload.isDefault != null
          ? { isDefault: String(payload.isDefault) }
          : {}),
      },
    }
  );
}

export async function deleteAddress(_customerId: number, addressId: number) {
  return portalRequest<{ status: boolean; message?: string }>(
    "/deletecustomeraddress",
    {
      method: "POST",
      auth: true,
      formFields: {
        id: String(addressId),
        clientId: String(PORTAL_CLIENT_ID),
        isDelete: "YES",
      },
    }
  );
}
