import { Link } from "@tanstack/react-router";
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import { HeaderSearch } from "@/components/site/HeaderSearch";
import { useEffect, useState } from "react";
import { Logo } from "@/components/site/Logo";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/explore", label: "Explore" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, cartToast, dismissCartToast } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { itemCount: wishlistCount } = useWishlist();

  useBodyScrollLock(mobileOpen);

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

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

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
      <div className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10 lg:py-3.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="rounded-full p-2 text-foreground/80 transition hover:bg-foreground/5 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/" className="flex shrink-0 items-center py-1" onClick={closeMobile}>
            <Logo height={52} />
          </Link>
        </div>

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
            onClick={closeMobile}
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Cart · {itemCount}</span>
            <span className="sm:hidden">{itemCount}</span>
          </Link>
        </div>
      </div>

      {mobileOpen ? (
        <div className="absolute inset-x-0 top-full md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px]"
            onClick={closeMobile}
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="relative z-50 border-b border-border/80 bg-[rgba(252,252,253,0.98)] shadow-soft backdrop-blur-xl"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={closeMobile}
                  className="rounded-xl px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                  activeProps={{ className: "bg-foreground/5 text-foreground" }}
                >
                  {l.label}
                </Link>
              ))}

              <div className="my-2 h-px bg-border/70" />

              <Link
                to="/profile/wishlist"
                onClick={closeMobile}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <span className="inline-flex items-center gap-3">
                  <Heart
                    size={18}
                    fill={wishlistCount > 0 ? "currentColor" : "none"}
                    className={wishlistCount > 0 ? "text-red-500" : undefined}
                  />
                  Wishlist
                </span>
                {wishlistCount > 0 ? (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[11px] font-medium text-background">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                ) : null}
              </Link>

              {isAuthenticated ? (
                <Link
                  to="/profile"
                  onClick={closeMobile}
                  className="inline-flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  <User size={18} />
                  {user?.name ? `Account · ${user.name}` : "Account"}
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="inline-flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  <User size={18} />
                  Sign in
                </Link>
              )}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
