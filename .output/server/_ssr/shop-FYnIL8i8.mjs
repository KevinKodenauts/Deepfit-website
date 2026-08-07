import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as getMainCategories, l as mapToCategoryProduct, s as getProductsByCategory } from "./AuthContext-B71YYWma.mjs";
import { _ as Skeleton, f as ProductGridSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link, y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { W as List, g as SlidersHorizontal, q as LayoutGrid } from "../_libs/lucide-react.mjs";
import { n as Nav, r as categoryProductToCard } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { t as ProductCard } from "./ProductCard-ZruFtHJy.mjs";
import { t as categories } from "./products-BNhS_ouO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-FYnIL8i8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function buildDisciplineItems(main) {
	if (!main) return [];
	const nested = main.categories ?? [];
	if (nested.length === 0) return [];
	const items = [];
	for (const category of nested) {
		const subs = category.subCategories ?? [];
		if (subs.length > 0) {
			for (const sub of subs) items.push({
				key: `sub-${category.categoryId}-${sub.subCategoryId}`,
				name: sub.subCategoryName,
				categoryId: category.categoryId,
				subCategoryId: sub.subCategoryId
			});
			continue;
		}
		items.push({
			key: `cat-${category.categoryId}`,
			name: category.categoryName,
			categoryId: category.categoryId
		});
	}
	return items;
}
function Shop() {
	const { main: mainFromUrl } = useSearch({ from: "/shop" });
	const [rawProducts, setRawProducts] = (0, import_react.useState)([]);
	const [mainCategories, setMainCategories] = (0, import_react.useState)([]);
	const [selectedCategoryId, setSelectedCategoryId] = (0, import_react.useState)(null);
	const [selectedDisciplineKeys, setSelectedDisciplineKeys] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getMainCategories().then((list) => {
			if (cancelled) return;
			setMainCategories(list);
			if (list.length) {
				const preferredId = mainFromUrl && list.some((c) => c.id === mainFromUrl) ? mainFromUrl : list[0].id;
				setSelectedCategoryId(preferredId);
			}
		}).catch(() => {});
		return () => {
			cancelled = true;
		};
	}, [mainFromUrl]);
	const selectedMain = (0, import_react.useMemo)(() => mainCategories.find((c) => c.id === selectedCategoryId), [mainCategories, selectedCategoryId]);
	const disciplineItems = (0, import_react.useMemo)(() => buildDisciplineItems(selectedMain), [selectedMain]);
	const selectedName = (0, import_react.useMemo)(() => {
		if (selectedMain) return selectedMain.mainCategoryName;
		return categories[0]?.name ?? "Shop";
	}, [selectedMain]);
	(0, import_react.useEffect)(() => {
		setSelectedDisciplineKeys(/* @__PURE__ */ new Set());
	}, [selectedCategoryId]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoading(true);
		if (selectedCategoryId == null) {
			setLoading(false);
			return;
		}
		const selectedDisciplines = disciplineItems.filter((item) => selectedDisciplineKeys.has(item.key));
		const categoryIdForApi = selectedDisciplines.length === 1 ? selectedDisciplines[0].categoryId : void 0;
		getProductsByCategory(selectedCategoryId, categoryIdForApi, {
			limit: 48,
			offset: 0
		}).then((result) => {
			if (cancelled) return;
			setRawProducts(result.products);
		}).catch(() => {
			if (!cancelled) setRawProducts([]);
		}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [
		selectedCategoryId,
		selectedDisciplineKeys,
		disciplineItems
	]);
	const items = (0, import_react.useMemo)(() => {
		const selectedDisciplines = disciplineItems.filter((item) => selectedDisciplineKeys.has(item.key));
		let filtered = rawProducts;
		if (selectedDisciplines.length > 0) {
			const subIds = new Set(selectedDisciplines.map((d) => d.subCategoryId).filter((id) => id != null));
			const categoryIds = new Set(selectedDisciplines.map((d) => d.categoryId));
			filtered = rawProducts.filter((product) => {
				const subId = product.subCategoryDetails?.id;
				const catId = product.categoryDetails?.id;
				if (subIds.size > 0 && subId != null && subIds.has(subId)) return true;
				if (subIds.size === 0 && catId != null && categoryIds.has(catId)) return true;
				if (subIds.size > 0 && selectedDisciplines.some((d) => d.subCategoryId == null && d.categoryId === catId)) return true;
				return false;
			});
		}
		return filtered.map(mapToCategoryProduct).map(categoryProductToCard);
	}, [
		rawProducts,
		selectedDisciplineKeys,
		disciplineItems
	]);
	const toggleDiscipline = (key) => {
		setSelectedDisciplineKeys((prev) => {
			const next = new Set(prev);
			if (next.has(key)) next.delete(key);
			else next.add(key);
			return next;
		});
	};
	const categoryList = mainCategories.length > 0 ? mainCategories.map((c) => ({
		id: c.id,
		name: c.mainCategoryName
	})) : categories.map((c, i) => ({
		id: -(i + 1),
		name: c.name
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden bg-soft pt-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl [background:radial-gradient(circle,var(--lavender),transparent_60%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6 pb-16 lg:px-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
							children: "The catalog"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-3 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl",
							children: [
								"Every piece, ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient italic",
									children: "designed"
								}),
								" ",
								"to last a lifetime."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-muted-foreground",
							children: "Filter by category, discipline or price. Everything ships with a 60-day home trial and lifetime frame warranty."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-6 py-12 lg:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-10 lg:grid-cols-[260px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sticky top-28 space-y-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground",
									children: "Category"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2 text-sm",
									children: categoryList.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											if (c.id > 0) setSelectedCategoryId(c.id);
										},
										className: `flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-left transition hover:bg-foreground/5 ${selectedCategoryId === c.id ? "bg-foreground/5 font-medium" : ""}`,
										children: c.name
									}) }, c.id))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground",
									children: "Discipline"
								}), disciplineItems.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2 text-sm",
									children: disciplineItems.map((item) => {
										const checked = selectedDisciplineKeys.has(item.key);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-foreground/5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "checkbox",
													className: "accent-foreground",
													checked,
													onChange: () => toggleDiscipline(item.key)
												}), item.name]
											})
										}) }, item.key);
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "px-2 text-sm text-muted-foreground",
									children: "No subcategories for this category."
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
									title: "Price",
									items: [
										"Under $100",
										"$100 – $500",
										"$500 – $1000",
										"$1000+"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
									title: "Availability",
									items: [
										"In stock",
										"Pre-order",
										"New arrival"
									]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex items-center justify-between rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest lg:hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { size: 14 }), " Filters"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-36" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Showing",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: items.length
									}),
									" ",
									"in ",
									selectedName
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-full bg-foreground p-2 text-background",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { size: 14 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-full p-2 text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { size: 14 })
								})]
							})
						]
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, { count: 6 }) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-card p-10 text-center text-muted-foreground shadow-soft ring-1 ring-border/60",
						children: [
							"No products found.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "underline",
								children: "Back home"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 sm:grid-cols-2 xl:grid-cols-3",
						children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function FilterGroup({ title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2 text-sm",
		children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-foreground/5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					className: "accent-foreground"
				}), i]
			})
		}) }, i))
	})] });
}
//#endregion
export { Shop as component };
