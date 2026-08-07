import { a as __toESM } from "../_runtime.mjs";
import { m as getCustomerId } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useAuth } from "./AuthContext-B71YYWma.mjs";
import { r as useCart } from "./WishlistContext-DDsVW1bM.mjs";
import { a as CheckoutSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { bt as Banknote, st as CreditCard } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { d as startZiinaPayment, l as placeOrder, s as getShippingCharge } from "./orders-bxEC_Ra-.mjs";
import { _ as useAddresses, d as Route } from "./router-BAl0mxep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-DY-Xh0zn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const navigate = useNavigate();
	const search = Route.useSearch();
	const { isAuthenticated, isLoading: authLoading } = useAuth();
	const { items, subtotal, refreshCart, isLoading } = useCart();
	const { addresses, selectedAddressId, selectedAddress, setSelectedAddressId, refreshAddresses } = useAddresses();
	const [deliveryFee, setDeliveryFee] = (0, import_react.useState)(0);
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("ziina");
	const [placing, setPlacing] = (0, import_react.useState)(false);
	const [notice, setNotice] = (0, import_react.useState)("");
	const grandTotal = (0, import_react.useMemo)(() => subtotal + deliveryFee, [subtotal, deliveryFee]);
	(0, import_react.useEffect)(() => {
		if (search.payment === "cancelled") setNotice("Payment was cancelled. You can try again.");
		else if (search.payment === "failed") setNotice("Payment failed. Please try again or choose COD.");
	}, [search.payment]);
	(0, import_react.useEffect)(() => {
		if (!authLoading && !isAuthenticated) navigate({
			to: "/login",
			search: { next: "/checkout" }
		});
	}, [
		authLoading,
		isAuthenticated,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (isAuthenticated) {
			refreshCart();
			refreshAddresses();
		}
	}, [
		isAuthenticated,
		refreshCart,
		refreshAddresses
	]);
	(0, import_react.useEffect)(() => {
		const customerId = getCustomerId();
		const pincode = selectedAddress?.pincode;
		if (!customerId || !pincode) {
			setDeliveryFee(0);
			return;
		}
		getShippingCharge(customerId, pincode).then(setDeliveryFee).catch(() => setDeliveryFee(0));
	}, [selectedAddress?.pincode]);
	const handlePlaceOrder = (0, import_react.useCallback)(async () => {
		const customerId = getCustomerId();
		if (!customerId || items.length === 0) return;
		if (!selectedAddressId) {
			alert("Please select a delivery address.");
			return;
		}
		const isOnline = paymentMethod === "ziina";
		if (isOnline && grandTotal < 2) {
			alert("Online payments require a minimum of 2 AED.");
			return;
		}
		setPlacing(true);
		try {
			const result = await placeOrder({
				customerId,
				addressId: selectedAddressId,
				paymentMethod: isOnline ? "ZIINA" : "COD",
				platform: "web",
				subtotal,
				shippingCost: deliveryFee,
				grandTotal,
				items: items.map((item) => ({
					productId: item.productId,
					quantity: item.qty,
					variantId: item.variantId
				}))
			});
			if (!result.status || !result.orderNumber || !result.orderId) {
				alert(result.message ?? "Could not place order.");
				return;
			}
			if (isOnline) {
				let paymentUrl = result.paymentUrl;
				let paymentIntentId = result.paymentIntentId;
				if (!paymentUrl) {
					const payment = await startZiinaPayment({
						orderId: result.orderId,
						orderNumber: result.orderNumber,
						amount: grandTotal
					});
					paymentUrl = payment.paymentUrl;
					paymentIntentId = payment.paymentIntentId;
				}
				if (!paymentUrl) {
					alert("Could not open the payment page.");
					return;
				}
				if (paymentIntentId) sessionStorage.setItem(`ziina:${result.orderId}`, paymentIntentId);
				window.location.href = paymentUrl;
				return;
			}
			await refreshCart();
			navigate({
				to: "/orders/success",
				search: {
					orderNumber: result.orderNumber,
					orderId: String(result.orderId)
				}
			});
		} catch (error) {
			alert(error instanceof Error ? error.message : "Something went wrong while placing your order.");
		} finally {
			setPlacing(false);
		}
	}, [
		items,
		selectedAddressId,
		paymentMethod,
		grandTotal,
		subtotal,
		deliveryFee,
		refreshCart,
		navigate
	]);
	if (authLoading || !isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-3xl px-6 pb-24 pt-32 lg:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutSkeleton, {})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-3xl px-6 pb-24 pt-32 lg:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
						children: "Checkout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-5xl leading-tight",
						children: "Confirm & pay."
					}),
					notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 rounded-2xl border border-border bg-card px-4 py-3 text-sm",
						children: notice
					}) : null,
					isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutSkeleton, {}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 rounded-[2rem] bg-card p-10 text-center shadow-soft ring-1 ring-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Your bag is empty."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background",
							children: "Shop the collection"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-[2rem] bg-card p-6 shadow-soft ring-1 ring-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-xl",
									children: "Items"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-3 text-sm",
									children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											item.title,
											" × ",
											item.qty
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["AED ", item.price * item.qty] })]
									}, item.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-[2rem] bg-card p-6 shadow-soft ring-1 ring-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-xl",
									children: "Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 space-y-2",
									children: addresses.map((address) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: `flex cursor-pointer gap-3 rounded-2xl border px-4 py-3 text-sm ${selectedAddressId === address.id ? "border-foreground bg-foreground/5" : "border-border"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "checkout-address",
											checked: selectedAddressId === address.id,
											onChange: () => setSelectedAddressId(address.id)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: [
											address.address,
											address.city,
											address.state
										].filter(Boolean).join(", ") })]
									}, address.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-[2rem] bg-card p-6 shadow-soft ring-1 ring-border/60",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-xl",
										children: "Payment"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setPaymentMethod("ziina"),
											className: `flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm ${paymentMethod === "ziina" ? "border-foreground bg-foreground/5" : "border-border"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { size: 16 }), " Pay online (Ziina)"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setPaymentMethod("cod"),
											className: `flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm ${paymentMethod === "cod" ? "border-foreground bg-foreground/5" : "border-border"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { size: 16 }), " Cash on delivery"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 flex items-center justify-between border-t border-border pt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Total"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-2xl",
											children: ["AED ", grandTotal]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: placing,
										onClick: () => void handlePlaceOrder(),
										className: "mt-6 w-full rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background disabled:opacity-50",
										children: placing ? "Processing…" : paymentMethod === "ziina" ? "Pay with Ziina" : "Place COD order"
									})
								]
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
export { CheckoutPage as component };
