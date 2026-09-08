import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Plus, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlistToggle } from "@/hooks/useWishlistToggle";

export function ProductCard({
  product,
  variant = "grid",
}: {
  product: Product;
  variant?: "grid" | "list";
}) {
  const { openAddToCart, cartToast, dismissCartToast } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const productId = Number(product.slug);
  const { wishlisted, pending, toggle } = useWishlistToggle(productId);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!Number.isFinite(productId) || productId <= 0) return;

    if (!isAuthenticated) {
      void navigate({
        to: "/login",
        search: { next: "/cart" },
      });
      return;
    }

    await openAddToCart({
      productId,
      title: product.name,
      image: product.image,
      price: product.price,
    });
  };

  const wishlistButton = (alwaysVisible = false) => (
    <button
      type="button"
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={wishlisted}
      disabled={pending || !Number.isFinite(productId) || productId <= 0}
      onClick={(e) => void toggle(e)}
      className={`z-20 rounded-full glass p-2 transition-all duration-300 disabled:opacity-60 ${
        wishlisted
          ? "text-red-500 opacity-100"
          : alwaysVisible
            ? "text-foreground opacity-100"
            : "text-foreground opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      }`}
    >
      <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
    </button>
  );

  const priceBlock = (
    <div className="flex items-baseline gap-2">
      <span className="text-lg font-semibold">AED {product.price}</span>
      {product.compareAt ? (
        <span className="text-xs text-muted-foreground line-through">
          AED {product.compareAt}
        </span>
      ) : null}
    </div>
  );

  const addButton = (
    <button
      type="button"
      onClick={handleAdd}
      aria-label="Add to bag"
      className="rounded-full bg-foreground p-2 text-background transition hover:opacity-90"
    >
      <Plus size={16} />
    </button>
  );

  const toastControl = cartToast ? (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        dismissCartToast();
      }}
      className="sr-only"
    >
      {cartToast}
    </button>
  ) : null;

  if (variant === "list") {
    return (
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="group relative flex overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass"
      >
        <div className="relative aspect-square w-28 shrink-0 overflow-hidden bg-white sm:w-40 md:w-48">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-105 sm:p-3"
          />
          {product.badge ? (
            <span className="absolute left-2 top-2 z-20 rounded-full glass px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-foreground">
              {product.badge}
            </span>
          ) : null}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-4 sm:gap-3 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {product.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star size={12} className="fill-foreground text-foreground" />
                  {Number(product.rating || 0).toFixed(1)}
                </span>
              </div>
              <h3 className="mt-1 font-display text-lg leading-tight sm:text-xl">
                {product.name}
              </h3>
            </div>
            <div className="shrink-0">{wishlistButton(true)}</div>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.tagline}
          </p>
          <div className="mt-auto flex items-end justify-between gap-3 pt-1">
            {priceBlock}
            <div className="flex items-center gap-2">
              <div className="hidden gap-1 sm:flex">
                {product.colors.slice(0, 3).map((c) => (
                  <span
                    key={c}
                    className="h-3 w-3 rounded-full ring-1 ring-border"
                    style={{ background: c }}
                  />
                ))}
              </div>
              {addButton}
            </div>
          </div>
          {toastControl}
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-glass"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="relative z-10 h-full w-full object-contain p-3 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        {product.badge ? (
          <span className="absolute left-4 top-4 z-20 rounded-full glass px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-foreground">
            {product.badge}
          </span>
        ) : null}
        <div className="absolute right-4 top-4">{wishlistButton()}</div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star size={12} className="fill-foreground text-foreground" />
            {Number(product.rating || 0).toFixed(1)}
          </span>
        </div>
        <h3 className="font-display text-xl leading-tight">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.tagline}
        </p>
        <div className="mt-auto flex items-end justify-between pt-4">
          {priceBlock}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((c) => (
                <span
                  key={c}
                  className="h-3 w-3 rounded-full ring-1 ring-border"
                  style={{ background: c }}
                />
              ))}
            </div>
            {addButton}
          </div>
        </div>
        {toastControl}
      </div>
    </Link>
  );
}
