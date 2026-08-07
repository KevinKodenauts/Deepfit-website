import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useAuth } from "./AuthContext-B71YYWma.mjs";
import { i as useWishlist, r as useCart } from "./WishlistContext-DDsVW1bM.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Plus, Z as Heart, p as Star } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-ZruFtHJy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useWishlistToggle(productId) {
	const navigate = useNavigate();
	const { isAuthenticated, user } = useAuth();
	const { isWishlisted, toggleWishlist } = useWishlist();
	const [pending, setPending] = (0, import_react.useState)(false);
	const id = typeof productId === "number" && Number.isFinite(productId) && productId > 0 ? productId : null;
	return {
		wishlisted: id != null ? isWishlisted(id) : false,
		pending,
		toggle: (0, import_react.useCallback)(async (event) => {
			event?.preventDefault?.();
			event?.stopPropagation?.();
			if (id == null) return false;
			if (!isAuthenticated) {
				navigate({
					to: "/login",
					search: { next: typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "/profile/wishlist" }
				});
				return false;
			}
			setPending(true);
			try {
				return await toggleWishlist(id, user?.customerName || user?.name || "Customer");
			} finally {
				setPending(false);
			}
		}, [
			id,
			isAuthenticated,
			navigate,
			toggleWishlist,
			user?.customerName,
			user?.name
		]),
		productId: id
	};
}
function ProductCard({ product }) {
	const { openAddToCart, cartToast, dismissCartToast } = useCart();
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const productId = Number(product.slug);
	const { wishlisted, pending, toggle } = useWishlistToggle(productId);
	const handleAdd = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!Number.isFinite(productId) || productId <= 0) return;
		if (!isAuthenticated) {
			navigate({
				to: "/login",
				search: { next: "/cart" }
			});
			return;
		}
		await openAddToCart({
			productId,
			title: product.name,
			image: product.image,
			price: product.price
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/product/$slug",
		params: { slug: product.slug },
		className: "group relative flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-glass",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-square overflow-hidden bg-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.image,
					alt: product.name,
					loading: "lazy",
					className: "relative z-10 h-full w-full object-contain p-3 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
				}),
				product.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-4 top-4 z-20 rounded-full glass px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-foreground",
					children: product.badge
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": wishlisted ? "Remove from wishlist" : "Add to wishlist",
					"aria-pressed": wishlisted,
					disabled: pending || !Number.isFinite(productId) || productId <= 0,
					onClick: (e) => void toggle(e),
					className: `absolute right-4 top-4 z-20 rounded-full glass p-2 transition-all duration-300 disabled:opacity-60 ${wishlisted ? "text-red-500 opacity-100" : "text-foreground opacity-100 sm:opacity-0 sm:group-hover:opacity-100"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
						size: 16,
						fill: wishlisted ? "currentColor" : "none"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: product.category
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							size: 12,
							className: "fill-foreground text-foreground"
						}), Number(product.rating || 0).toFixed(1)]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl leading-tight",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-2 text-sm text-muted-foreground",
					children: product.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-end justify-between pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-lg font-semibold",
							children: ["AED ", product.price]
						}), product.compareAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground line-through",
							children: ["AED ", product.compareAt]
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1",
							children: product.colors.slice(0, 3).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-3 w-3 rounded-full ring-1 ring-border",
								style: { background: c }
							}, c))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleAdd,
							"aria-label": "Add to bag",
							className: "rounded-full bg-foreground p-2 text-background transition hover:opacity-90",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 })
						})]
					})]
				}),
				cartToast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: (e) => {
						e.preventDefault();
						dismissCartToast();
					},
					className: "sr-only",
					children: cartToast
				}) : null
			]
		})]
	});
}
//#endregion
export { useWishlistToggle as n, ProductCard as t };
