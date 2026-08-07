import { a as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { m as getCustomerId } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as OrderDetailsSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { gt as Check, mt as ChevronLeft, st as CreditCard, xt as BadgeCheck } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { n as canReturnOrder, o as getCustomerOrders, r as cancelOrder, t as canCancelOrder, u as returnOrder } from "./orders-bxEC_Ra-.mjs";
import { t as useRequireAuth } from "./useRequireAuth-flXyrm-M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.details-BOLlt_T0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var details_module_default = {
	detailsContainer: "_detailsContainer_j2ff3_1",
	header: "_header_j2ff3_10",
	backBtn: "_backBtn_j2ff3_20",
	pageTitle: "_pageTitle_j2ff3_32",
	scrollContent: "_scrollContent_j2ff3_39",
	statusCard: "_statusCard_j2ff3_46",
	checkCircle: "_checkCircle_j2ff3_57",
	statusText: "_statusText_j2ff3_68",
	statusTitle: "_statusTitle_j2ff3_73",
	statusDate: "_statusDate_j2ff3_80",
	sectionHeader: "_sectionHeader_j2ff3_86",
	sectionTitle: "_sectionTitle_j2ff3_93",
	sectionLink: "_sectionLink_j2ff3_101",
	blockCard: "_blockCard_j2ff3_109",
	iconWrap: "_iconWrap_j2ff3_121",
	addressDetails: "_addressDetails_j2ff3_133",
	addressTitle: "_addressTitle_j2ff3_138",
	addressLines: "_addressLines_j2ff3_145",
	itemsBlock: "_itemsBlock_j2ff3_152",
	orderItem: "_orderItem_j2ff3_161",
	itemImageWrap: "_itemImageWrap_j2ff3_172",
	itemImage: "_itemImage_j2ff3_172",
	itemInfo: "_itemInfo_j2ff3_186",
	itemTitle: "_itemTitle_j2ff3_191",
	itemWeight: "_itemWeight_j2ff3_199",
	itemPrice: "_itemPrice_j2ff3_205",
	paymentBlock: "_paymentBlock_j2ff3_212",
	paymentInfo: "_paymentInfo_j2ff3_216",
	paymentTitle: "_paymentTitle_j2ff3_222",
	paymentSubtitle: "_paymentSubtitle_j2ff3_229",
	verifiedIcon: "_verifiedIcon_j2ff3_234",
	summaryBlock: "_summaryBlock_j2ff3_239",
	summaryRow: "_summaryRow_j2ff3_246",
	greenText: "_greenText_j2ff3_254",
	summaryDivider: "_summaryDivider_j2ff3_259",
	grandTotalRow: "_grandTotalRow_j2ff3_265",
	grandTotalLabel: "_grandTotalLabel_j2ff3_271",
	grandTotalValue: "_grandTotalValue_j2ff3_277",
	bottomActions: "_bottomActions_j2ff3_284",
	cancelBtn: "_cancelBtn_j2ff3_290",
	returnBtn: "_returnBtn_j2ff3_308",
	invoiceBtn: "_invoiceBtn_j2ff3_326",
	reviewBtn: "_reviewBtn_j2ff3_342"
};
function OrderDetailsPage() {
	const search = useSearch({ from: "/orders/details" });
	const orderId = Number(search.orderId);
	const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
	const [order, setOrder] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [isCancelling, setIsCancelling] = (0, import_react.useState)(false);
	const [isReturning, setIsReturning] = (0, import_react.useState)(false);
	const loadOrder = (0, import_react.useCallback)((options) => {
		if (authLoading || !isAuthenticated) return;
		const customerId = getCustomerId();
		if (!customerId || !orderId) {
			setLoading(false);
			return;
		}
		if (!options?.silent) setLoading(true);
		getCustomerOrders(customerId).then((orders) => orders.find((o) => o.id === orderId) ?? null).then(setOrder).catch(() => setOrder(null)).finally(() => {
			if (!options?.silent) setLoading(false);
		});
	}, [
		authLoading,
		isAuthenticated,
		orderId
	]);
	(0, import_react.useEffect)(() => {
		loadOrder();
	}, [loadOrder]);
	const handleCancelOrder = async () => {
		if (!order || isCancelling) return;
		if (!window.confirm("Are you sure you want to cancel this order? If you paid online, a refund will be processed automatically.")) return;
		setIsCancelling(true);
		try {
			const res = await cancelOrder(order.id);
			if (res.status) {
				setOrder({
					...order,
					orderStatus: "Cancelled",
					canReturn: false
				});
				loadOrder({ silent: true });
			} else window.alert(res.message || "Failed to cancel order. Please try again.");
		} catch {
			window.alert("Failed to cancel order. Please try again.");
		} finally {
			setIsCancelling(false);
		}
	};
	const handleReturnOrder = async () => {
		if (!order || isReturning) return;
		const reason = window.prompt("Please share a reason for returning this order (optional):", "") ?? null;
		if (reason === null) return;
		if (!window.confirm("Submit a return request? An admin will review it after the product is received.")) return;
		setIsReturning(true);
		try {
			const res = await returnOrder(order.id, reason.trim() || void 0);
			if (res.status) {
				setOrder({
					...order,
					orderStatus: "Return Requested",
					canReturn: false
				});
				loadOrder({ silent: true });
				window.alert(res.message || "Return request submitted. Admin will review after receiving the product.");
			} else window.alert(res.message || "Failed to submit return. Please try again.");
		} catch {
			window.alert("Failed to submit return. Please try again.");
		} finally {
			setIsReturning(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderDetailsSkeleton, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${details_module_default.detailsContainer} pt-24`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: details_module_default.header,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: details_module_default.backBtn,
						onClick: () => window.history.back(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: details_module_default.pageTitle,
						children: "Orders Details"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						padding: "24px",
						color: "#64748b"
					},
					children: "Order not found."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	const itemTotal = order.orderedProducts.reduce((sum, p) => sum + p.totalPrice, 0);
	const showCancel = canCancelOrder(order.orderStatus);
	const showReturn = canReturnOrder(order);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${details_module_default.detailsContainer} pt-24`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: details_module_default.header,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: details_module_default.backBtn,
						onClick: () => window.history.back(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: details_module_default.pageTitle,
						children: "Orders Details"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: details_module_default.scrollContent,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: details_module_default.statusCard,
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .3 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: details_module_default.checkCircle,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									size: 24,
									strokeWidth: 3
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: details_module_default.statusText,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: details_module_default.statusTitle,
									children: order.orderStatus
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: details_module_default.statusDate,
									children: [
										"Order #",
										order.orderNumber,
										" • ",
										order.orderDate
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: details_module_default.sectionHeader,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: details_module_default.sectionTitle,
								children: [
									"ORDER ITEMS (",
									order.orderedProducts.length,
									")"
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: details_module_default.itemsBlock,
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .3,
								delay: .2
							},
							children: order.orderedProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: details_module_default.orderItem,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: details_module_default.itemImageWrap,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: product.image || "/images/whey-protein.png",
										alt: product.productName,
										className: details_module_default.itemImage
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: details_module_default.itemInfo,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: details_module_default.itemTitle,
											children: product.productName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: details_module_default.itemWeight,
											children: ["Qty: ", product.quantity]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: details_module_default.itemPrice,
											children: ["AED ", product.totalPrice.toLocaleString()]
										})
									]
								})]
							}, product.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: details_module_default.sectionHeader,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: details_module_default.sectionTitle,
								children: "PAYMENT METHOD"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: `${details_module_default.blockCard} ${details_module_default.paymentBlock}`,
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .3,
								delay: .3
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: details_module_default.iconWrap,
									style: {
										background: "#f3e8ff",
										color: "#9333ea"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { size: 20 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: details_module_default.paymentInfo,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: details_module_default.paymentTitle,
										children: order.isPaid ? "Paid" : "Cash on Delivery"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: details_module_default.paymentSubtitle,
										children: order.isPaid ? "Payment received" : "Pay when you receive"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
									size: 20,
									className: details_module_default.verifiedIcon
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: details_module_default.sectionHeader,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: details_module_default.sectionTitle,
								children: "SUMMARY"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: details_module_default.summaryBlock,
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .3,
								delay: .4
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: details_module_default.summaryRow,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Item Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["AED ", itemTotal.toLocaleString()] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: details_module_default.summaryRow,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: details_module_default.greenText,
										children: "FREE"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: details_module_default.summaryDivider }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: details_module_default.grandTotalRow,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: details_module_default.grandTotalLabel,
										children: "Grand Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: details_module_default.grandTotalValue,
										children: ["AED ", order.grandTotal.toLocaleString()]
									})]
								})
							]
						}),
						showCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: details_module_default.cancelBtn,
							onClick: () => void handleCancelOrder(),
							disabled: isCancelling,
							children: isCancelling ? "Cancelling..." : "Cancel Order"
						}),
						showReturn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: details_module_default.returnBtn,
							onClick: () => void handleReturnOrder(),
							disabled: isReturning,
							children: isReturning ? "Submitting..." : "Return Order"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = OrderDetailsPage;
//#endregion
export { SplitComponent as component };
