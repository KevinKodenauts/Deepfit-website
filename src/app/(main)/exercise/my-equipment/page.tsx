"use client";

import { Suspense } from "react";
import ResponsivePage, {
  createLazyDesktop,
} from "@/components/ResponsivePage";
import MyEquipmentMobile from "./MyEquipmentMobile";
import styles from "./my-equipment.module.css";

const MyEquipmentDesktop = createLazyDesktop(
  () => import("@/desktop-ui/exercise/my-equipment/MyEquipmentDesktop")
);

export default function MyEquipmentPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <p className={styles.statusText}>Loading equipment...</p>
        </div>
      }
    >
      <ResponsivePage
        mobile={<MyEquipmentMobile />}
        desktopLazy={MyEquipmentDesktop}
      />
    </Suspense>
  );
}
