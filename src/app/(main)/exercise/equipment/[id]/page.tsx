"use client";

import ResponsivePage, { createLazyDesktop } from "@/components/ResponsivePage";
import EquipmentDetailMobile from "./EquipmentDetailMobile";

const EquipmentDetailDesktop = createLazyDesktop(
  () => import("@/desktop-ui/exercise/equipment-detail/EquipmentDetailDesktop"),
);

export default function EquipmentDetailsPage() {
  return (
    <ResponsivePage
      mobile={<EquipmentDetailMobile />}
      desktopLazy={EquipmentDetailDesktop}
    />
  );
}
