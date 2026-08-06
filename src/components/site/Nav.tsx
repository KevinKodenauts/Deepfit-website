import { Link } from "@tanstack/react-router";
import { Heart, User, ShoppingBag } from "lucide-react";
import { HeaderSearch } from "@/components/site/HeaderSearch";
import { useEffect, useState } from "react";
import { Logo } from "@/components/site/Logo";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/explore", label: "Explore" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, cartToast, dismissCartToast } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { itemCount: wishlistCount } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!cartToast) return;
    const t = window.setTimeout(() => dismissCartToast(), 2800);
    return () => window.clearTimeout(t);
  }, [cartToast, dismissCartToast]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border/80 bg-[rgba(252,252,253,0.96)] shadow-soft backdrop-blur-xl"
          : "border-transparent bg-[rgba(252,252,253,0.88)] backdrop-blur-md"
      }`}
    >
      {cartToast ? (
        <div className="absolute inset-x-0 top-full flex justify-center px-4 pt-2">
          <div className="rounded-full bg-foreground px-4 py-2 text-xs text-background shadow-soft">
            {cartToast}
          </div>
        </div>
      ) : null}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10 lg:py-3.5">
        <Link to="/" className="flex shrink-0 items-center py-1">
          <Logo height={52} />
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="story-link text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1 text-foreground/80">
          <HeaderSearch />
          <Link
            to="/profile/wishlist"
            aria-label="Wishlist"
            className="relative hidden rounded-full p-2 transition hover:bg-foreground/5 sm:inline-flex"
          >
            <Heart
              size={18}
              fill={wishlistCount > 0 ? "currentColor" : "none"}
              className={wishlistCount > 0 ? "text-red-500" : undefined}
            />
            {wishlistCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            ) : null}
          </Link>
          {isAuthenticated ? (
            <Link
              to="/profile"
              aria-label={`Account ${user?.name ?? ""}`}
              className="hidden rounded-full p-2 transition hover:bg-foreground/5 sm:inline-flex"
              title={user?.name ?? "Account"}
            >
              <User size={18} />
            </Link>
          ) : (
            <Link
              to="/login"
              aria-label="Account"
              className="hidden rounded-full p-2 transition hover:bg-foreground/5 sm:inline-flex"
            >
              <User size={18} />
            </Link>
          )}
          <Link
            to="/cart"
            aria-label="Cart"
            className="ml-1 flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:opacity-90"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Cart · {itemCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
