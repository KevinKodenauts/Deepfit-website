"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import CartModal from "@/components/CartModal";
import DesktopNav from "@/components/DesktopNav";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import styles from "./mainLayout.module.css";

const NO_BOTTOM_NAV_PATHS = [
  "/product/",
  "/categories/products",
  "/cart",
  "/checkout",
];

function shouldHideBottomNav(pathname: string) {
  return NO_BOTTOM_NAV_PATHS.some((path) => pathname.startsWith(path));
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isDesktop, isHydrated } = useBreakpoint();
  const hideBottomNav =
    shouldHideBottomNav(pathname) || (isHydrated && isDesktop);

  return (
    <div
      className={`app-shell ${styles.shell} ${
        hideBottomNav ? styles.noBottomNavPadding : ""
      } ${isHydrated && isDesktop ? styles.desktopShell : ""}`}
    >
      <DesktopNav />
      <main className={`app-main ${styles.main}`}>{children}</main>
      <BottomNav />
      <CartModal />
    </div>
  );
}
