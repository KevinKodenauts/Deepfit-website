import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ProductsEmptyState } from "@/components/site/ProductsEmptyState";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { categoryProductToCard } from "@/lib/catalog";
import type { WishlistItemView } from "@/lib/api/wishlist";
import { WishlistSkeleton } from "@/components/skeleton/PageSkeletons";

export function WishlistPage() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const { items, isLoading, refreshWishlist } = useWishlist();
  const [error, setError] = useState("");

  const loadWishlist = useCallback(async () => {
    try {
      await refreshWishlist();
      setError("");
    } catch {
      setError("Could not load wishlist. Please try again.");
    }
  }, [refreshWishlist]);

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    void loadWishlist();
  }, [authLoading, isAuthenticated, loadWishlist]);

  const countLabel =
    items.length === 1 ? "1 item saved" : `${items.length} items saved`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-10">
        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Saved for later
        </div>
        <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">
          Your wishlist.
        </h1>
        {!isLoading && !error && items.length > 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">{countLabel}</p>
        ) : null}

        {isLoading ? (
          <WishlistSkeleton />
        ) : error ? (
          <div className="mt-12 rounded-lg bg-card p-10 text-center shadow-soft ring-1 ring-border/60">
            <p className="text-muted-foreground">{error}</p>
            <button
              type="button"
              onClick={() => void loadWishlist()}
              className="mt-6 inline-flex rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background"
            >
              Retry
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-12">
            <ProductsEmptyState
              title="Nothing saved yet."
              description="Tap the heart on products you love, then come back here to add them to your bag."
              actionLabel="Browse the collection"
              actionTo="/shop"
            />
          </div>
        ) : (
          <div className="mt-12 space-y-4">
            {items.map((item) => (
              <WishlistItemCard key={item.wishlistId} item={item} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

function WishlistItemCard({ item }: { item: WishlistItemView }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { openAddToCart } = useCart();
  const { removeWishlistItem } = useWishlist();
  const product = categoryProductToCard(item);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleAdd = async () => {
    if (product.comingSoon) return;
    if (!isAuthenticated) {
      void navigate({ to: "/login", search: { next: "/cart" } });
      return;
    }

    setAdding(true);
    try {
      await openAddToCart({
        productId: item.id,
        title: product.name,
        image: product.image,
        price: product.price,
      });
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await removeWishlistItem(item.wishlistId);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <article className="flex items-center gap-4 rounded-lg bg-card p-4 shadow-soft ring-1 ring-border/60 sm:gap-5 sm:p-5">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-border/40 sm:h-28 sm:w-28"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-1.5"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 font-medium leading-snug transition hover:text-[#1a637b]"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {product.category}
        </p>

        {product.comingSoon ? (
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#1A637B]">
            Coming soon
          </p>
        ) : (
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-semibold tabular-nums text-emerald-700">
              AED {product.price}
            </span>
            {product.compareAt ? (
              <span className="text-sm tabular-nums text-muted-foreground line-through">
                AED {product.compareAt}
              </span>
            ) : null}
          </div>
        )}

        {product.comingSoon ? null : (
          <button
            type="button"
            onClick={() => void handleAdd()}
            disabled={adding}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
          >
            <ShoppingBag size={14} />
            {adding ? "Adding…" : "Add to bag"}
          </button>
        )}
      </div>

      <button
        type="button"
        aria-label="Remove from wishlist"
        onClick={() => void handleRemove()}
        disabled={removing}
        className="shrink-0 self-start rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
      >
        <Heart size={18} fill="currentColor" />
      </button>
    </article>
  );
}
