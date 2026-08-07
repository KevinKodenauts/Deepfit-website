import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useWishlist } from "./WishlistContext-DDsVW1bM.mjs";
import { f as ProductGridSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Z as Heart, mt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as Nav, r as categoryProductToCard } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { t as useRequireAuth } from "./useRequireAuth-flXyrm-M.mjs";
import { t as ProductCard } from "./ProductCard-ZruFtHJy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.wishlist-B6Qy9aP5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var wishlist_module_default = {
	container: "_container_1gr05_1",
	header: "_header_1gr05_9",
	backBtn: "_backBtn_1gr05_19",
	pageTitle: "_pageTitle_1gr05_31",
	content: "_content_1gr05_40",
	grid: "_grid_1gr05_45",
	productCard: "_productCard_1gr05_52",
	imageSection: "_imageSection_1gr05_63",
	imageWrap: "_imageWrap_1gr05_70",
	productImage: "_productImage_1gr05_76",
	badge: "_badge_1gr05_80",
	badgePurple: "_badgePurple_1gr05_94",
	badgeRed: "_badgeRed_1gr05_98",
	heartBtn: "_heartBtn_1gr05_102",
	cardBody: "_cardBody_1gr05_121",
	brandLabel: "_brandLabel_1gr05_128",
	productTitle: "_productTitle_1gr05_137",
	cardFooter: "_cardFooter_1gr05_150",
	priceBlock: "_priceBlock_1gr05_158",
	currentPrice: "_currentPrice_1gr05_164",
	originalPrice: "_originalPrice_1gr05_170",
	addBtn: "_addBtn_1gr05_176",
	statusText: "_statusText_1gr05_190",
	emptyState: "_emptyState_1gr05_197",
	emptyIcon: "_emptyIcon_1gr05_206",
	retryBtn: "_retryBtn_1gr05_210"
};
function WishlistPage() {
	const navigate = useNavigate();
	const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
	const { items, isLoading, refreshWishlist } = useWishlist();
	const [error, setError] = (0, import_react.useState)("");
	const loadWishlist = (0, import_react.useCallback)(async () => {
		try {
			await refreshWishlist();
			setError("");
		} catch {
			setError("Could not load wishlist. Please try again.");
		}
	}, [refreshWishlist]);
	(0, import_react.useEffect)(() => {
		if (authLoading || !isAuthenticated) return;
		loadWishlist();
	}, [
		authLoading,
		isAuthenticated,
		loadWishlist
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: wishlist_module_default.container,
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: wishlist_module_default.header,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: wishlist_module_default.backBtn,
						onClick: () => window.history.back(),
						"aria-label": "Go back",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: wishlist_module_default.pageTitle,
						children: "Your Wishlist"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: wishlist_module_default.content,
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, { count: 6 }) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: wishlist_module_default.emptyState,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: wishlist_module_default.statusText,
							children: error
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: wishlist_module_default.retryBtn,
							onClick: () => void loadWishlist(),
							children: "Retry"
						})]
					}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: wishlist_module_default.emptyState,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
								size: 56,
								className: wishlist_module_default.emptyIcon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: wishlist_module_default.statusText,
								children: "Your wishlist is empty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: wishlist_module_default.retryBtn,
								onClick: () => void navigate({ to: "/shop" }),
								children: "Browse products"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: wishlist_module_default.grid,
						children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: categoryProductToCard(item) }, item.wishlistId))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = WishlistPage;
//#endregion
export { SplitComponent as component };
