"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Bell,
  User,
  Home,
  Info,
  ShoppingCart,
  Compass,
  ChevronDown,
  MapPin,
  Heart,
  BookOpen,
} from "lucide-react";
import Logo from "@/components/Logo";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { useAddresses } from "@/contexts/AddressContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import styles from "./desktopNav.module.css";

const navItems = [
  { name: "Home", href: "/home", icon: Home },
  { name: "About Us", href: "/about", icon: Info },
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Cart", href: "/cart", icon: ShoppingCart },
];

export default function DesktopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { unreadCount } = useNotifications();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { locationLine } = useAddresses();

  const handleLocationClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    router.push("/profile/addresses?select=1");
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.leftGroup}>
          <Link href="/home" className={styles.logo}>
            <Logo variant="color" height={36} />
          </Link>

          <button
            type="button"
            className={styles.location}
            onClick={handleLocationClick}
            aria-label="Change delivery address"
          >
            <MapPin size={16} className={styles.locationIcon} />
            <div className={styles.locationText}>
              <span className={styles.deliveryLabel}>DEEPFIT IN</span>
              {/* <span className={styles.deliveryTime}>13 minutes</span> */}
              <span className={styles.locationLine}>
                <span className={styles.locationLineText}>{locationLine}</span>
                <ChevronDown size={14} strokeWidth={2.5} />
              </span>
            </div>
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/cart"
                ? pathname === "/cart" ||
                  pathname.startsWith("/cart/") ||
                  pathname === "/checkout"
                : item.href === "/explore"
                  ? pathname === "/explore" ||
                    pathname.startsWith("/explore/") ||
                    pathname.startsWith("/exercise")
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                title={item.name}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              >
                <span className={styles.navIconWrap}>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  {item.href === "/cart" && itemCount > 0 && (
                    <span className={styles.cartBadge}>
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </span>
                <span className={styles.navLabel}>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.rightGroup}>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => router.push("/search")}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link href="/wallet" className={styles.walletTag}>
              <CurrencyAmount>0</CurrencyAmount>
            </Link>
            <Link
              href="/profile/wishlist"
              className={styles.iconBtn}
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {/* {wishlistCount > 0 && (
                <span className={styles.wishlistBadge}>
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )} */}
            </Link>
            <Link
              href="/notifications"
              className={styles.iconBtn}
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className={styles.notificationBadge}>
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
            <Link
              href="/profile"
              className={styles.iconBtn}
              aria-label="Profile"
            >
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
