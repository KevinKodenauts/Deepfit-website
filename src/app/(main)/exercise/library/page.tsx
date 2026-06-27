"use client";

import { Suspense } from "react";
import ResponsivePage, { createLazyDesktop } from "@/components/ResponsivePage";
import EquippedLibraryMobile from "./EquippedLibraryMobile";
import styles from "./library.module.css";

const EquippedLibraryDesktop = createLazyDesktop(
  () => import("@/desktop-ui/exercise/equipped-library/EquippedLibraryDesktop"),
);

export default function EquippedLibraryPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <p style={{ padding: "24px", color: "#64748b" }}>
            Loading exercises...
          </p>
        </div>
      }
    >
      <ResponsivePage
        mobile={<EquippedLibraryMobile />}
        desktopLazy={EquippedLibraryDesktop}
      />
    </Suspense>
  );
}
