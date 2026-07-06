"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dumbbell, Home, LayoutGrid, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import styles from "./bottomNav.module.css";

const TABS = [
  { label: "Home", href: "/home", match: (path: string) => path === "/home" },
  {
    label: "Categories",
    href: "/categories",
    match: (path: string) => path.startsWith("/categories"),
  },
  { label: "Cart", href: "/cart", isCart: true },
  {
    label: "Explore",
    href: "/explore",
    match: (path: string) =>
      path.startsWith("/explore") || path.startsWith("/exercise"),
  },
] as const;

function getActiveIndex(pathname: string): number {
  if (pathname.startsWith("/explore") || pathname.startsWith("/exercise"))
    return 3;
  if (pathname.startsWith("/cart") || pathname.startsWith("/checkout")) return 2;
  if (pathname.startsWith("/categories")) return 1;
  if (pathname === "/home") return 0;
  return -1;
}

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();

  if (
    pathname.startsWith("/product/") ||
    pathname.startsWith("/categories/products") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/explore")
  ) {
    return null;
  }

  const activeIndex = getActiveIndex(pathname);

  const handleTabClick = (
    index: number,
    href: string,
    isCart?: boolean
  ) => {
    if (isCart) {
      router.push("/cart");
      return;
    }
    if (activeIndex === index) return;
    router.push(href);
  };

  return (
    <div className={styles.bottomNavOuter}>
      <nav className={styles.bottomNav} aria-label="Main navigation">
        {activeIndex >= 0 && (
          <div
            className={styles.pill}
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />
        )}
        {TABS.map((tab, index) => {
            const isActive = activeIndex === index;
            const isCart = "isCart" in tab && tab.isCart;
            const Icon =
              index === 0
                ? Home
                : index === 1
                  ? LayoutGrid
                  : index === 2
                    ? ShoppingCart
                    : Dumbbell;

            const content = (
              <>
                <div className={styles.iconWrap}>
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.4 : 2}
                    color={isActive ? "#ffffff" : "#64748B"}
                  />
                  {isCart && itemCount > 0 && (
                    <span
                      className={`${styles.badge} ${
                        isActive ? styles.badgeSelected : ""
                      }`}
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </div>
                <span className={styles.label}>{tab.label}</span>
              </>
            );

            if (isCart) {
              return (
                <button
                  key={tab.label}
                  type="button"
                  className={`${styles.navItem} ${
                    isActive ? styles.navItemActive : ""
                  }`}
                  onClick={() => handleTabClick(index, tab.href, true)}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`${styles.navItem} ${
                  isActive ? styles.navItemActive : ""
                }`}
                onClick={(e) => {
                  if (isActive) e.preventDefault();
                }}
              >
                {content}
              </Link>
            );
          })}
      </nav>
    </div>
  );
}
