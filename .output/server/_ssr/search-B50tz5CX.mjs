import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as ProductGridSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Search, P as Mic, mt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as Nav, r as categoryProductToCard, s as useSearchPage } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { t as ProductCard } from "./ProductCard-ZruFtHJy.mjs";
import { n as Route } from "./router-BAl0mxep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-B50tz5CX.js
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const search = Route.useSearch();
	const navigate = useNavigate();
	const { inputRef, query, setQuery, trendingCategories, results, totalCount, loading, loadingMore, error, hasSearched, hasMore, handleLoadMore, isListening, isSupported, voiceError, toggleListening } = useSearchPage(search);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden bg-soft pt-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl [background:radial-gradient(circle,var(--lavender),transparent_60%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-6 pb-16 lg:px-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => navigate({ to: ".." }),
							className: "mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 18 }), "Back"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
							children: "Search"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
							children: ["Find your next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient italic",
								children: "fit"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground",
							children: "Find supplements, gym gear, wellness essentials and more"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-soft ring-1 ring-border/40 focus-within:ring-foreground/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									size: 20,
									className: "shrink-0 text-muted-foreground"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: inputRef,
									type: "search",
									value: query,
									onChange: (event) => setQuery(event.target.value),
									placeholder: "Search \"protein, dumbbells, vitamins...\"",
									className: "min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground",
									autoComplete: "off"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: toggleListening,
									disabled: !isSupported,
									"aria-label": isListening ? "Stop voice search" : "Voice search",
									"aria-pressed": isListening,
									className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${isListening ? "bg-red-500/10 text-red-500" : "bg-foreground/5 text-muted-foreground hover:text-foreground"} disabled:opacity-40`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { size: 18 })
								})
							]
						}),
						isListening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							role: "status",
							children: "Listening… speak now"
						}) : null,
						voiceError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-red-500",
							role: "alert",
							children: voiceError
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-6 py-12 lg:px-10",
				children: !hasSearched ? trendingCategories.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-6 text-xs uppercase tracking-[0.22em] text-muted-foreground",
					children: "Trending categories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 md:grid-cols-4",
					children: trendingCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/shop",
						search: { main: category.id },
						className: "group flex flex-col items-center gap-3 rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border/50 transition hover:-translate-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: category.mainCategoryImage,
								alt: "",
								className: "h-full w-full object-contain p-1"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-center text-sm font-medium",
							children: category.mainCategoryName
						})]
					}, category.id))
				})] }) : null : loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, { count: 6 }) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-20 text-center text-muted-foreground",
					children: error
				}) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-4 py-20 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							size: 48,
							className: "text-muted-foreground/40"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: "No products found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Try a different keyword or browse categories"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "mt-2 text-sm underline",
							children: "Browse shop"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex flex-wrap items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-2xl",
							children: [
								"Results for “",
								query.trim(),
								"”"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted-foreground",
							children: [
								totalCount,
								" ",
								totalCount === 1 ? "product" : "products"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 sm:grid-cols-2 xl:grid-cols-3",
						children: results.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: categoryProductToCard(product) }, product.id))
					}),
					hasMore ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleLoadMore,
							disabled: loadingMore,
							className: "rounded-full border border-border px-6 py-2.5 text-sm font-medium transition hover:bg-foreground/5 disabled:opacity-60",
							children: loadingMore ? "Loading…" : "Load more products"
						})
					}) : null
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { SearchPage as component };
