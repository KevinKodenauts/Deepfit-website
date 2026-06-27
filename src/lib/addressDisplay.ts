import { Building2, Home, MapPin, type LucideIcon } from "lucide-react";
import type { AddressView } from "@/lib/api/addresses";

export function formatFullAddress(address: AddressView): string {
  return [address.address, address.city, address.state, address.pincode, address.country]
    .filter(Boolean)
    .join(", ");
}

export function getAddressType(address: AddressView): {
  label: string;
  icon: LucideIcon;
} {
  const label = (address.type || address.addressLabel || "Home").toLowerCase();
  if (label.includes("work") || label.includes("office")) {
    return { label: "Work", icon: Building2 };
  }
  if (label.includes("home") || label.includes("house")) {
    return { label: "Home", icon: Home };
  }
  return { label: address.type || "Other", icon: MapPin };
}
