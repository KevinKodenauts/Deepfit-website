import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import type { Product } from "@/lib/products";
import { Check, ChevronDown, Heart, Minus, Plus, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getProductDetails, getProductsByCategory } from "@/lib/api/products";
import { getEquipmentForProduct } from "@/lib/api/exercise";
import {
  mapToCategoryProduct,
  mapToProductDetail,
  type ProductDetailView,
} from "@/lib/api/mappers";
import { categoryProductToCard, productIdFromSlug } from "@/lib/catalog";
import { ProductDetailSkeleton } from "@/components/skeleton/PageSkeletons";
import {
  ProductEquipmentGuide,
  ProductEquipmentGuideSkeleton,
} from "@/components/product/ProductEquipmentGuide";
import { pickPrimaryEquipmentForProduct } from "@/lib/exercise/productEquipmentMatcher";
import type { EquipmentItem } from "@/lib/api/types";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlistToggle } from "@/hooks/useWishlistToggle";

function stripHtml(value: string): string {
  if (typeof document !== "undefined") {
    const el = document.createElement("div");
    el.innerHTML = value;
    return (el.textContent || el.innerText || "").replace(/\s+/g, " ").trim();
  }
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#\d+;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const richTextClassName =
  "text-sm leading-relaxed text-muted-foreground [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_a]:underline";

function RichText({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  if (!html?.trim()) return null;
  return (
    <div
      className={`${richTextClassName} ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("center center");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-glass cursor-zoom-in"
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="aspect-square w-full object-contain transition-transform duration-300 ease-out"
        style={{
          transform: zoomed ? "scale(2)" : "scale(1)",
          transformOrigin: origin,
        }}
      />
    </div>
  );
}

function ProductDescription({
  productView,
}: {
  productView: ProductDetailView;
}) {
  const [expanded, setExpanded] = useState(false);
  const shortHtml = productView.subtitle?.trim() || "";
  const fullHtml = productView.description?.trim() || "";
  const additionalInfo = productView.additionalInformation ?? [];
  const shortPlain = stripHtml(shortHtml);
  const fullPlain = stripHtml(fullHtml);
  const hasLongerDescription =
    Boolean(fullHtml) && (!shortPlain || fullPlain !== shortPlain);
  const hasMore = hasLongerDescription || additionalInfo.length > 0;

  // Short description already renders under the title; this block covers
  // the expandable long description + additional information table.
  if (!hasMore && !fullHtml) return null;

  return (
    <div className="mt-8">
      {expanded ? (
        <>
          {fullHtml ? <RichText html={fullHtml} /> : null}
          {!fullHtml && shortHtml ? <RichText html={shortHtml} /> : null}
          {additionalInfo.length > 0 && (
            <div className="mt-5 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {additionalInfo.map((row, index) => (
                    <tr
                      key={`${row.title}-${index}`}
                      className={index % 2 === 0 ? "bg-muted/40" : "bg-white"}
                    >
                      <th
                        scope="row"
                        className="w-[40%] px-4 py-3 text-left font-medium text-foreground align-top"
                      >
                        {row.title || "—"}
                      </th>
                      <td className="px-4 py-3 text-muted-foreground align-top">
                        {row.value || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : !shortHtml && fullHtml ? (
        <RichText html={fullHtml} />
      ) : null}

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground/70 hover:text-foreground transition-colors"
        >
          {expanded ? "Show less" : "View product details"}
          <ChevronDown
            size={14}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {productView.variants.length > 0 && !expanded && (
        <ul className="mt-4 space-y-2 text-sm">
          {productView.variants
            .filter((v) => v.id > 0)
            .slice(0, 4)
            .map((v) => (
              <li key={v.id} className="flex items-start gap-2">
                <Check size={16} className="mt-0.5 shrink-0" /> {v.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export const Route = createFileRoute("/product/$slug")({
  head: () => ({
    meta: [{ title: "Product — DEEPFIT" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { openAddToCart } = useCart();
  const [productView, setProductView] = useState<ProductDetailView | null>(
    null,
  );
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [equipment, setEquipment] = useState<EquipmentItem | null>(null);
  const [equipmentLoading, setEquipmentLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const {
    wishlisted,
    pending: wishlistPending,
    toggle: toggleWishlist,
  } = useWishlistToggle(productView?.id);

  useEffect(() => {
    if (!productView?.title) return;
    document.title = `${productView.title} — DEEPFIT`;
  }, [productView?.title]);

  useEffect(() => {
    const id = productIdFromSlug(slug);
    if (!id) {
      setLoading(false);
      setProductView(null);
      setRelatedProducts([]);
      setEquipment(null);
      setEquipmentLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setSelectedVariantIndex(0);
    setActiveImageIndex(0);
    setRelatedProducts([]);
    setEquipment(null);
    setEquipmentLoading(true);

    getProductDetails(id)
      .then(async (details) => {
        if (cancelled || !details) {
          if (!cancelled) {
            setProductView(null);
            setEquipment(null);
            setEquipmentLoading(false);
          }
          return;
        }
        const mapped = mapToProductDetail(details);
        setProductView(mapped);

        void getEquipmentForProduct({
          productId: mapped.id,
          productName: mapped.title,
          productSku: mapped.sku,
        })
          .then((items) => {
            if (cancelled) return;
            setEquipment(
              pickPrimaryEquipmentForProduct(items, {
                id: mapped.id,
                name: mapped.title,
              }),
            );
          })
          .catch(() => {
            if (!cancelled) setEquipment(null);
          })
          .finally(() => {
            if (!cancelled) setEquipmentLoading(false);
          });

        let related = mapped.related
          .map(categoryProductToCard)
          .filter((item) => Boolean(item.image));

        if (related.length === 0 && mapped.mainCategoryId > 0) {
          try {
            const result = await getProductsByCategory(
              mapped.mainCategoryId,
              mapped.categoryId > 0 ? mapped.categoryId : undefined,
              { limit: 8, offset: 0 },
            );
            related = result.products
              .map(mapToCategoryProduct)
              .filter((item) => item.id !== mapped.id)
              .slice(0, 4)
              .map(categoryProductToCard);
          } catch {
            related = [];
          }
        } else {
          related = related.slice(0, 4);
        }

        if (!cancelled) setRelatedProducts(related);
      })
      .catch(() => {
        if (!cancelled) {
          setProductView(null);
          setRelatedProducts([]);
          setEquipment(null);
          setEquipmentLoading(false);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const realVariants = (productView?.variants ?? []).filter((v) => v.id > 0);
  const isMultiVariant = realVariants.length > 1;
  const selectedVariant =
    realVariants[selectedVariantIndex] ??
    realVariants[0] ??
    productView?.variants[0];
  const displayImages = isMultiVariant
    ? selectedVariant?.images.length
      ? selectedVariant.images
      : ([selectedVariant?.image].filter(Boolean) as string[])
    : productView?.images.length
      ? productView.images
      : [];
  const displayPrice =
    selectedVariant?.price && selectedVariant.price > 0
      ? selectedVariant.price
      : (productView?.price ?? 0);
  const displayOriginalPrice =
    productView?.originalPrice != null &&
    productView.price > 0 &&
    productView.originalPrice > productView.price
      ? Math.round(
          (displayPrice / productView.price) * productView.originalPrice,
        )
      : (productView?.originalPrice ?? null);
  const displayImage =
    displayImages[activeImageIndex] ??
    displayImages[0] ??
    selectedVariant?.image ??
    productView?.images[0];

  const selectVariant = (index: number) => {
    setSelectedVariantIndex(index);
    setActiveImageIndex(0);
  };

  const handleAdd = async (buyNow = false) => {
    if (!productView) return;
    if (!isAuthenticated) {
      void navigate({ to: "/login", search: { next: `/product/${slug}` } });
      return;
    }
    setAdding(true);
    const err = await openAddToCart(
      {
        productId: productView.id,
        title: productView.title,
        image: displayImage || productView.images[0],
        price: displayPrice,
        variantId:
          selectedVariant?.id && selectedVariant.id > 0
            ? selectedVariant.id
            : undefined,
        productAttributeId:
          selectedVariant?.attributeId && selectedVariant.attributeId > 0
            ? selectedVariant.attributeId
            : undefined,
      },
      qty,
    );
    setAdding(false);
    if (!err && buyNow) {
      void navigate({ to: "/cart" });
    }
  };

  const product: Product | null = productView
    ? {
        slug: String(productView.id),
        name: productView.title,
        tagline: stripHtml(
          productView.subtitle ||
            productView.categoryName ||
            productView.deliveryTime,
        ),
        price: displayPrice,
        compareAt:
          displayOriginalPrice && displayOriginalPrice > displayPrice
            ? displayOriginalPrice
            : undefined,
        image: displayImage || "/images/dumbbells.png",
        category: "Strength",
        badge: productView.isTopSelling ? "Best Seller" : undefined,
        rating: productView.rating || 0,
        reviews: productView.ratingCount || 0,
        colors: [],
        description: stripHtml(productView.description || productView.title),
        features: productView.variants.map((v) => v.label).filter(Boolean),
        specs: Object.fromEntries(
          productView.additionalInformation
            .filter((row) => row.title)
            .map((row) => [row.title, row.value]),
        ),
      }
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <ProductDetailSkeleton />
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <div className="px-6 pt-40 text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/shop" className="mt-4 inline-block underline">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-32 lg:px-10">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
          <span className="text-foreground">{product.category}</span>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div className=" top-32">
            <ZoomableImage
              key={displayImage ?? "main"}
              src={product.image}
              alt={
                selectedVariant
                  ? `${product.name} — ${selectedVariant.label}`
                  : product.name
              }
            />
            {displayImages.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {displayImages.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 bg-white transition-colors ${
                      activeImageIndex === idx
                        ? "border-foreground"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            {product.badge ? (
              <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                {product.badge}
              </div>
            ) : null}
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              {product.name}
            </h1>
            {productView?.subtitle ? (
              <RichText html={productView.subtitle} className="mt-4" />
            ) : product.tagline ? (
              <p className="mt-4 text-muted-foreground">{product.tagline}</p>
            ) : null}
            <div className="mt-6 flex items-center gap-3">
              <span className="font-display text-3xl">AED {product.price}</span>
              {product.compareAt ? (
                <span className="text-muted-foreground line-through">
                  AED {product.compareAt}
                </span>
              ) : null}
              <span className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
                <Star size={14} className="fill-foreground text-foreground" />
                {Number(product.rating || 0).toFixed(1)} ({product.reviews})
              </span>
            </div>
            {isMultiVariant && (
              <div className="mt-6">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {productView?.variantLabel}
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {realVariants.map((variant, index) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => selectVariant(index)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        selectedVariantIndex === index
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground/40"
                      }`}
                    >
                      {variant.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-4 rounded-full border border-border px-4 py-2">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm">{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)}>
                  <Plus size={14} />
                </button>
              </div>
              <button
                type="button"
                disabled={adding}
                onClick={() => void handleAdd(false)}
                className="flex-1 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background disabled:opacity-50"
              >
                {adding ? "Adding…" : "Add to bag"}
              </button>
              <button
                type="button"
                aria-label={
                  wishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                aria-pressed={wishlisted}
                disabled={wishlistPending || !productView}
                onClick={() => void toggleWishlist()}
                className={`rounded-full border p-3 transition-colors disabled:opacity-60 ${
                  wishlisted
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-border text-foreground hover:border-foreground/40"
                }`}
              >
                <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>
            <button
              type="button"
              disabled={adding}
              onClick={() => void handleAdd(true)}
              className="mt-3 w-full rounded-full border border-border px-6 py-3 text-sm font-medium"
            >
              Buy now
            </button>
            {productView && <ProductDescription productView={productView} />}{" "}
            {equipmentLoading ? <ProductEquipmentGuideSkeleton /> : null}
            {!equipmentLoading && equipment ? (
              <ProductEquipmentGuide equipment={equipment} />
            ) : null}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Related
            </div>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              Similar products
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </section>
      <Footer />
    </div>
  );
}
