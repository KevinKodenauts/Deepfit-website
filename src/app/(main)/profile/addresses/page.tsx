"use client";

import ResponsivePage, {
  createLazyDesktop,
} from "@/components/ResponsivePage";
import AddressesMobile from "./AddressesMobile";

const AddressesDesktop = createLazyDesktop(
  () => import("@/desktop-ui/profile/addresses/AddressesDesktop")
);

export default function AddressesPage() {
  return (
    <ResponsivePage
      mobile={<AddressesMobile />}
      desktopLazy={AddressesDesktop}
    />
  );
}
