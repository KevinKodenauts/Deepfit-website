import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useAuth, d as mapToProductDetail, l as mapToCategoryProduct, o as getProductDetails, s as getProductsByCategory } from "./AuthContext-B71YYWma.mjs";
import { r as useCart } from "./WishlistContext-DDsVW1bM.mjs";
import { d as ProductDetailSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Plus, N as Minus, Z as Heart, gt as Check, ht as ChevronDown, p as Star } from "../_libs/lucide-react.mjs";
import { a as productIdFromSlug, n as Nav, r as categoryProductToCard } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { n as useWishlistToggle, t as ProductCard } from "./ProductCard-ZruFtHJy.mjs";
import { i as Route } from "./router-BAl0mxep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-1KWybuQk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function stripHtml(value) {
	if (typeof document !== "undefined") {
		const el = document.createElement("div");
		el.innerHTML = value;
		return (el.textContent || el.innerText || "").replace(/\s+/g, " ").trim();
	}
	return value.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&#\d+;/g, "").replace(/\s+/g, " ").trim();
}
var richTextClassName = "text-sm leading-relaxed text-muted-foreground [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_a]:underline";
function RichText({ html, className = "" }) {
	if (!html?.trim()) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${richTextClassName} ${className}`.trim(),
		dangerouslySetInnerHTML: { __html: html }
	});
}
function ZoomableImage({ src, alt }) {
	const containerRef = (0, import_react.useRef)(null);
	const [zoomed, setZoomed] = (0, import_react.useState)(false);
	const [origin, setOrigin] = (0, import_react.useState)("center center");
	const handleMouseMove = (0, import_react.useCallback)((e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width * 100;
		const y = (e.clientY - rect.top) / rect.height * 100;
		setOrigin(`${x}% ${y}%`);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		className: "relative overflow-hidden rounded-[2.5rem] bg-white shadow-glass cursor-zoom-in",
		onMouseEnter: () => setZoomed(true),
		onMouseLeave: () => setZoomed(false),
		onMouseMove: handleMouseMove,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			className: "aspect-square w-full object-contain transition-transform duration-300 ease-out",
			style: {
				transform: zoomed ? "scale(2)" : "scale(1)",
				transformOrigin: origin
			}
		})
	});
}
function ProductDescription({ productView }) {
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const shortHtml = productView.subtitle?.trim() || "";
	const fullHtml = productView.description?.trim() || "";
	const additionalInfo = productView.additionalInformation ?? [];
	const shortPlain = stripHtml(shortHtml);
	const fullPlain = stripHtml(fullHtml);
	const hasMore = Boolean(fullHtml) && (!shortPlain || fullPlain !== shortPlain) || additionalInfo.length > 0;
	if (!hasMore && !fullHtml) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8",
		children: [
			expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				fullHtml ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, { html: fullHtml }) : null,
				!fullHtml && shortHtml ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, { html: shortHtml }) : null,
				additionalInfo.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 overflow-hidden rounded-xl border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
						className: "w-full text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: additionalInfo.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: index % 2 === 0 ? "bg-muted/40" : "bg-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "row",
								className: "w-[40%] px-4 py-3 text-left font-medium text-foreground align-top",
								children: row.title || "—"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted-foreground align-top",
								children: row.value || "—"
							})]
						}, `${row.title}-${index}`)) })
					})
				})
			] }) : !shortHtml && fullHtml ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, { html: fullHtml }) : null,
			hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setExpanded((v) => !v),
				className: "mt-3 flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground/70 hover:text-foreground transition-colors",
				children: [expanded ? "Show less" : "View product details", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					size: 14,
					className: `transition-transform ${expanded ? "rotate-180" : ""}`
				})]
			}),
			productView.variants.length > 0 && !expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2 text-sm",
				children: productView.variants.filter((v) => v.id > 0).slice(0, 4).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							size: 16,
							className: "mt-0.5 shrink-0"
						}),
						" ",
						v.label
					]
				}, v.id))
			})
		]
	});
}
function ProductPage() {
	const { slug } = Route.useParams();
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	const { openAddToCart } = useCart();
	const [productView, setProductView] = (0, import_react.useState)(null);
	const [relatedProducts, setRelatedProducts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [qty, setQty] = (0, import_react.useState)(1);
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [selectedVariantIndex, setSelectedVariantIndex] = (0, import_react.useState)(0);
	const [activeImageIndex, setActiveImageIndex] = (0, import_react.useState)(0);
	const { wishlisted, pending: wishlistPending, toggle: toggleWishlist } = useWishlistToggle(productView?.id);
	(0, import_react.useEffect)(() => {
		if (!productView?.title) return;
		document.title = `${productView.title} — DEEPFIT`;
	}, [productView?.title]);
	(0, import_react.useEffect)(() => {
		const id = productIdFromSlug(slug);
		if (!id) {
			setLoading(false);
			setProductView(null);
			setRelatedProducts([]);
			return;
		}
		let cancelled = false;
		setLoading(true);
		setSelectedVariantIndex(0);
		setActiveImageIndex(0);
		setRelatedProducts([]);
		getProductDetails(id).then(async (details) => {
			if (cancelled || !details) {
				if (!cancelled) setProductView(null);
				return;
			}
			const mapped = mapToProductDetail(details);
			setProductView(mapped);
			let related = mapped.related.map(categoryProductToCard).filter((item) => Boolean(item.image));
			if (related.length === 0 && mapped.mainCategoryId > 0) try {
				related = (await getProductsByCategory(mapped.mainCategoryId, mapped.categoryId > 0 ? mapped.categoryId : void 0, {
					limit: 8,
					offset: 0
				})).products.map(mapToCategoryProduct).filter((item) => item.id !== mapped.id).slice(0, 4).map(categoryProductToCard);
			} catch {
				related = [];
			}
			else related = related.slice(0, 4);
			if (!cancelled) setRelatedProducts(related);
		}).catch(() => {
			if (!cancelled) {
				setProductView(null);
				setRelatedProducts([]);
			}
		}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [slug]);
	const realVariants = (productView?.variants ?? []).filter((v) => v.id > 0);
	const isMultiVariant = realVariants.length > 1;
	const selectedVariant = realVariants[selectedVariantIndex] ?? realVariants[0] ?? productView?.variants[0];
	const displayImages = isMultiVariant ? selectedVariant?.images.length ? selectedVariant.images : [selectedVariant?.image].filter(Boolean) : productView?.images.length ? productView.images : [];
	const displayPrice = selectedVariant?.price && selectedVariant.price > 0 ? selectedVariant.price : productView?.price ?? 0;
	const displayOriginalPrice = productView?.originalPrice != null && productView.price > 0 && productView.originalPrice > productView.price ? Math.round(displayPrice / productView.price * productView.originalPrice) : productView?.originalPrice ?? null;
	const displayImage = displayImages[activeImageIndex] ?? displayImages[0] ?? selectedVariant?.image ?? productView?.images[0];
	const selectVariant = (index) => {
		setSelectedVariantIndex(index);
		setActiveImageIndex(0);
	};
	const handleAdd = async (buyNow = false) => {
		if (!productView) return;
		if (!isAuthenticated) {
			navigate({
				to: "/login",
				search: { next: `/product/${slug}` }
			});
			return;
		}
		setAdding(true);
		const err = await openAddToCart({
			productId: productView.id,
			title: productView.title,
			image: displayImage || productView.images[0],
			price: displayPrice,
			variantId: selectedVariant?.id && selectedVariant.id > 0 ? selectedVariant.id : void 0,
			productAttributeId: selectedVariant?.attributeId && selectedVariant.attributeId > 0 ? selectedVariant.attributeId : void 0
		}, qty);
		setAdding(false);
		if (!err && buyNow) navigate({ to: "/cart" });
	};
	const product = productView ? {
		slug: String(productView.id),
		name: productView.title,
		tagline: stripHtml(productView.subtitle || productView.categoryName || productView.deliveryTime),
		price: displayPrice,
		compareAt: displayOriginalPrice && displayOriginalPrice > displayPrice ? displayOriginalPrice : void 0,
		image: displayImage || "/images/dumbbells.png",
		category: "Strength",
		badge: productView.isTopSelling ? "Best Seller" : void 0,
		rating: productView.rating || 0,
		reviews: productView.ratingCount || 0,
		colors: [],
		description: stripHtml(productView.description || productView.title),
		features: productView.variants.map((v) => v.label).filter(Boolean),
		specs: Object.fromEntries(productView.additionalInformation.filter((row) => row.title).map((row) => [row.title, row.value]))
	} : null;
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDetailSkeleton, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-6 pt-40 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Product not found."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-4 inline-block underline",
				children: "Back to shop"
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-6 pb-16 pt-32 lg:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs uppercase tracking-[0.22em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								children: "Home"
							}),
							" / ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								children: "Shop"
							}),
							" /",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: product.category
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid gap-12 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: " top-32",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomableImage, {
								src: product.image,
								alt: selectedVariant ? `${product.name} — ${selectedVariant.label}` : product.name
							}, displayImage ?? "main"), displayImages.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex gap-2 overflow-x-auto",
								children: displayImages.map((img, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setActiveImageIndex(idx),
									className: `shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 bg-white transition-colors ${activeImageIndex === idx ? "border-foreground" : "border-border hover:border-foreground/40"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: img,
										alt: `${product.name} ${idx + 1}`,
										className: "w-full h-full object-contain"
									})
								}, `${img}-${idx}`))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							product.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
								children: product.badge
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
								children: product.name
							}),
							productView?.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, {
								html: productView.subtitle,
								className: "mt-4"
							}) : product.tagline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-muted-foreground",
								children: product.tagline
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-display text-3xl",
										children: ["AED ", product.price]
									}),
									product.compareAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground line-through",
										children: ["AED ", product.compareAt]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-auto flex items-center gap-1 text-sm text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
												size: 14,
												className: "fill-foreground text-foreground"
											}),
											Number(product.rating || 0).toFixed(1),
											" (",
											product.reviews,
											")"
										]
									})
								]
							}),
							isMultiVariant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
									children: productView?.variantLabel
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex flex-wrap gap-2",
									children: realVariants.map((variant, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => selectVariant(index),
										className: `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${selectedVariantIndex === index ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40"}`,
										children: variant.label
									}, variant.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex items-center gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4 rounded-full border border-border px-4 py-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setQty((q) => Math.max(1, q - 1)),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 14 })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-6 text-center text-sm",
												children: qty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setQty((q) => q + 1),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: adding,
										onClick: () => void handleAdd(false),
										className: "flex-1 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background disabled:opacity-50",
										children: adding ? "Adding…" : "Add to bag"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": wishlisted ? "Remove from wishlist" : "Add to wishlist",
										"aria-pressed": wishlisted,
										disabled: wishlistPending || !productView,
										onClick: () => void toggleWishlist(),
										className: `rounded-full border p-3 transition-colors disabled:opacity-60 ${wishlisted ? "border-red-200 bg-red-50 text-red-500" : "border-border text-foreground hover:border-foreground/40"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
											size: 16,
											fill: wishlisted ? "currentColor" : "none"
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: adding,
								onClick: () => void handleAdd(true),
								className: "mt-3 w-full rounded-full border border-border px-6 py-3 text-sm font-medium",
								children: "Buy now"
							}),
							productView && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDescription, { productView })
						] })]
					}),
					relatedProducts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
								children: "Related"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-3xl leading-tight sm:text-4xl",
								children: "Similar products"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
								children: relatedProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { ProductPage as component };
