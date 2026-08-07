import { a as __toESM } from "../_runtime.mjs";
import { m as getCustomerId } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as OrdersListSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { mt as ChevronLeft, pt as ChevronRight, y as ShoppingBag } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { a as filterOrdersByStatus, c as groupOrdersByNumber, o as getCustomerOrders } from "./orders-bxEC_Ra-.mjs";
import { t as useRequireAuth } from "./useRequireAuth-flXyrm-M.mjs";
import { t as CurrencyAmount } from "./CurrencySymbol-RZEUbyS_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-BYrarmWs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ORDER_FILTERS = [
	"All Orders",
	"In Transit",
	"Shipping",
	"Return",
	"Cancel"
];
function useOrdersPage() {
	const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedFilter, setSelectedFilter] = (0, import_react.useState)("All Orders");
	const loadOrders = (0, import_react.useCallback)((options) => {
		if (authLoading || !isAuthenticated) return;
		const customerId = getCustomerId();
		if (!customerId) {
			setLoading(false);
			return;
		}
		if (!options?.silent) setLoading(true);
		getCustomerOrders(customerId).then((data) => setOrders(groupOrdersByNumber(data))).catch(() => setOrders([])).finally(() => {
			if (!options?.silent) setLoading(false);
		});
	}, [authLoading, isAuthenticated]);
	(0, import_react.useEffect)(() => {
		loadOrders();
	}, [loadOrders]);
	const filteredOrders = (0, import_react.useMemo)(() => filterOrdersByStatus(orders, selectedFilter), [orders, selectedFilter]);
	const getFilterCount = (filter) => filter === "All Orders" ? orders.length : filterOrdersByStatus(orders, filter).length;
	return {
		authLoading,
		isAuthenticated,
		orders,
		loading,
		selectedFilter,
		setSelectedFilter,
		filteredOrders,
		getFilterCount,
		reloadOrders: loadOrders
	};
}
var ordersDesktop_module_default = {
	shell: "_shell_1tt9y_1",
	inner: "_inner_1tt9y_8",
	pageHeader: "_pageHeader_1tt9y_15",
	pageTitle: "_pageTitle_1tt9y_19",
	pageSubtitle: "_pageSubtitle_1tt9y_26",
	layout: "_layout_1tt9y_32",
	filtersCard: "_filtersCard_1tt9y_39",
	filtersTitle: "_filtersTitle_1tt9y_49",
	filterBtn: "_filterBtn_1tt9y_58",
	filterBtnActive: "_filterBtnActive_1tt9y_82",
	filterCount: "_filterCount_1tt9y_89",
	main: "_main_1tt9y_108",
	loadingWrap: "_loadingWrap_1tt9y_112",
	loadingSpinner: "_loadingSpinner_1tt9y_118",
	spin: "_spin_1tt9y_1",
	emptyState: "_emptyState_1tt9y_133",
	emptyIcon: "_emptyIcon_1tt9y_146",
	emptyTitle: "_emptyTitle_1tt9y_151",
	emptyText: "_emptyText_1tt9y_158",
	browseBtn: "_browseBtn_1tt9y_164",
	ordersList: "_ordersList_1tt9y_183",
	orderCard: "_orderCard_1tt9y_189",
	orderTop: "_orderTop_1tt9y_209",
	orderMeta: "_orderMeta_1tt9y_219",
	orderId: "_orderId_1tt9y_225",
	orderDate: "_orderDate_1tt9y_232",
	statusBadge: "_statusBadge_1tt9y_237",
	statusSuccess: "_statusSuccess_1tt9y_247",
	statusWarning: "_statusWarning_1tt9y_252",
	statusMuted: "_statusMuted_1tt9y_257",
	orderBody: "_orderBody_1tt9y_262",
	itemImageWrap: "_itemImageWrap_1tt9y_269",
	itemImage: "_itemImage_1tt9y_269",
	itemDetails: "_itemDetails_1tt9y_285",
	itemTitle: "_itemTitle_1tt9y_292",
	itemMeta: "_itemMeta_1tt9y_302",
	itemTotal: "_itemTotal_1tt9y_307",
	viewLink: "_viewLink_1tt9y_313"
};
function statusClass(status) {
	const normalized = status.toLowerCase();
	if (normalized.includes("deliver") || normalized.includes("complete") || normalized.includes("paid")) return ordersDesktop_module_default.statusSuccess;
	if (normalized.includes("cancel") || normalized.includes("return") || normalized.includes("fail")) return ordersDesktop_module_default.statusWarning;
	if (normalized.includes("pending")) return ordersDesktop_module_default.statusMuted;
	return "";
}
function OrdersDesktop({ loading, selectedFilter, setSelectedFilter, filteredOrders, orders, getFilterCount }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ordersDesktop_module_default.shell,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: ordersDesktop_module_default.inner,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: ordersDesktop_module_default.pageHeader,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: ordersDesktop_module_default.pageTitle,
					children: "My Orders"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: ordersDesktop_module_default.pageSubtitle,
					children: loading ? " " : orders.length === 0 ? "You have not placed any orders yet" : `${orders.length} ${orders.length === 1 ? "order" : "orders"} in your account`
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: ordersDesktop_module_default.layout,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: ordersDesktop_module_default.filtersCard,
					"aria-label": "Order filters",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: ordersDesktop_module_default.filtersTitle,
						children: "FILTER BY STATUS"
					}), ORDER_FILTERS.map((filter) => {
						const isActive = selectedFilter === filter;
						const count = getFilterCount(filter);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: `${ordersDesktop_module_default.filterBtn} ${isActive ? ordersDesktop_module_default.filterBtnActive : ""}`,
							onClick: () => setSelectedFilter(filter),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: filter }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: ordersDesktop_module_default.filterCount,
								children: count
							})]
						}, filter);
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: ordersDesktop_module_default.main,
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersListSkeleton, { count: 5 }) : filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: ordersDesktop_module_default.emptyState,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
								size: 72,
								strokeWidth: 1.2,
								className: ordersDesktop_module_default.emptyIcon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: ordersDesktop_module_default.emptyTitle,
								children: "No orders found"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: ordersDesktop_module_default.emptyText,
								children: selectedFilter === "All Orders" ? "When you place an order, it will show up here." : `No orders match "${selectedFilter}". Try another filter.`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: ordersDesktop_module_default.browseBtn,
								children: "Browse products"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: ordersDesktop_module_default.ordersList,
						children: filteredOrders.map((order) => {
							const firstProduct = order.orderedProducts[0];
							const itemLabel = order.orderedProducts.map((product) => product.productName).slice(0, 2).join(", ");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/orders/details",
								search: { orderId: order.id },
								className: ordersDesktop_module_default.orderCard,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: ordersDesktop_module_default.orderTop,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: ordersDesktop_module_default.orderMeta,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: ordersDesktop_module_default.orderId,
											children: ["Order #", order.orderNumber]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: ordersDesktop_module_default.orderDate,
											children: order.orderDate
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `${ordersDesktop_module_default.statusBadge} ${statusClass(order.orderStatus)}`,
										children: order.orderStatus
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: ordersDesktop_module_default.orderBody,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: ordersDesktop_module_default.itemImageWrap,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: firstProduct?.image || "/images/whey-protein.png",
												alt: firstProduct?.productName ?? "Order item",
												className: ordersDesktop_module_default.itemImage
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: ordersDesktop_module_default.itemDetails,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: ordersDesktop_module_default.itemTitle,
													children: itemLabel || "Order items"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: ordersDesktop_module_default.itemMeta,
													children: [
														order.orderedProducts.length,
														" ",
														order.orderedProducts.length === 1 ? "item" : "items"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: ordersDesktop_module_default.itemTotal,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyAmount, { children: order.grandTotal.toLocaleString() })
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: ordersDesktop_module_default.viewLink,
											children: ["View details", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })]
										})
									]
								})]
							}, `${order.id}-${order.orderNumber}`);
						})
					})
				})]
			})]
		})
	});
}
var orders_module_default = {
	container: "_container_dj188_1",
	header: "_header_dj188_10",
	backBtn: "_backBtn_dj188_18",
	pageTitle: "_pageTitle_dj188_29",
	filters: "_filters_dj188_36",
	filterChip: "_filterChip_dj188_48",
	filterChipActive: "_filterChipActive_dj188_61",
	contentArea: "_contentArea_dj188_67",
	loadingText: "_loadingText_dj188_72",
	emptyState: "_emptyState_dj188_80",
	emptyIcon: "_emptyIcon_dj188_91",
	browseBtn: "_browseBtn_dj188_109",
	ordersList: "_ordersList_dj188_123",
	orderCard: "_orderCard_dj188_129",
	orderHeader: "_orderHeader_dj188_139",
	orderId: "_orderId_dj188_147",
	statusBadge: "_statusBadge_dj188_154",
	itemSummary: "_itemSummary_dj188_163",
	itemImageWrap: "_itemImageWrap_dj188_169",
	itemImage: "_itemImage_dj188_169",
	itemDetails: "_itemDetails_dj188_185",
	itemTitle: "_itemTitle_dj188_193",
	itemMeta: "_itemMeta_dj188_199",
	orderDate: "_orderDate_dj188_204",
	chevron: "_chevron_dj188_209"
};
function OrdersMobile({ loading, selectedFilter, setSelectedFilter, filteredOrders, getFilterCount }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: orders_module_default.container,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: orders_module_default.header,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: orders_module_default.backBtn,
					onClick: () => window.history.back(),
					"aria-label": "Go back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: orders_module_default.pageTitle,
					children: "My Orders"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: orders_module_default.filters,
				children: ORDER_FILTERS.map((filter) => {
					const isActive = selectedFilter === filter;
					const count = getFilterCount(filter);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `${orders_module_default.filterChip} ${isActive ? orders_module_default.filterChipActive : ""}`,
						onClick: () => setSelectedFilter(filter),
						children: [filter, filter === "All Orders" ? ` (${count})` : ""]
					}, filter);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: orders_module_default.contentArea,
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersListSkeleton, { count: 4 }) : filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: orders_module_default.emptyState,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
							size: 64,
							strokeWidth: 1.5,
							className: orders_module_default.emptyIcon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No orders found" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selectedFilter === "All Orders" ? "When you place an order, it will show up here." : `No orders match "${selectedFilter}". Try another filter.` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: orders_module_default.browseBtn,
							children: "Browse products"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: orders_module_default.ordersList,
					children: filteredOrders.map((order) => {
						const firstProduct = order.orderedProducts[0];
						const itemLabel = order.orderedProducts.map((product) => product.productName).slice(0, 2).join(", ");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/orders/details",
							search: { orderId: order.id },
							className: orders_module_default.orderCard,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: orders_module_default.orderHeader,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: orders_module_default.orderId,
									children: ["ORDER #", order.orderNumber]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: orders_module_default.statusBadge,
									children: order.orderStatus
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: orders_module_default.itemSummary,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: orders_module_default.itemImageWrap,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: firstProduct?.image || "/images/whey-protein.png",
											alt: firstProduct?.productName ?? "Order item",
											className: orders_module_default.itemImage
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: orders_module_default.itemDetails,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: orders_module_default.itemTitle,
												children: itemLabel || "Order items"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: orders_module_default.itemMeta,
												children: [
													order.orderedProducts.length,
													" items •",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyAmount, { children: order.grandTotal.toLocaleString() })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: orders_module_default.orderDate,
												children: order.orderDate
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
										size: 18,
										className: orders_module_default.chevron
									})
								]
							})]
						}, `${order.id}-${order.orderNumber}`);
					})
				})
			})
		]
	});
}
function OrdersPage() {
	const orders = useOrdersPage();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orders-desktop-only",
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersDesktop, { ...orders })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orders-mobile-only",
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersMobile, { ...orders })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orders-desktop-only",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .orders-desktop-only { display: none; }
        .orders-mobile-only { display: block; }
        @media (min-width: 1024px) {
          .orders-desktop-only { display: block; }
          .orders-mobile-only { display: none; }
        }
      ` })
		]
	});
}
var SplitComponent = OrdersPage;
//#endregion
export { SplitComponent as component };
