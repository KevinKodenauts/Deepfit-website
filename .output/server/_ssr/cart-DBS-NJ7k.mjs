import { a as __toESM } from "../_runtime.mjs";
import { m as getCustomerId } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useAuth } from "./AuthContext-B71YYWma.mjs";
import { r as useCart } from "./WishlistContext-DDsVW1bM.mjs";
import { i as CartSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Pencil, E as Plus, N as Minus, bt as Banknote, et as Gift, st as CreditCard, u as Trash2 } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { n as formatFullAddress, r as getAddressType, t as AddAddressModal } from "./addressDisplay-CkJOG3Mm.mjs";
import { d as startZiinaPayment, f as validateCoupon, l as placeOrder, s as getShippingCharge } from "./orders-bxEC_Ra-.mjs";
import { _ as useAddresses } from "./router-BAl0mxep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-DBS-NJ7k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Cart() {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	const { items, isLoading, updateQuantity, removeItem, refreshCart, subtotal } = useCart();
	const { addresses, selectedAddressId, selectedAddress, setSelectedAddressId, refreshAddresses } = useAddresses();
	const [deliveryFee, setDeliveryFee] = (0, import_react.useState)(0);
	const [coupon, setCoupon] = (0, import_react.useState)("");
	const [appliedCoupon, setAppliedCoupon] = (0, import_react.useState)(null);
	const [couponMessage, setCouponMessage] = (0, import_react.useState)("");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("ziina");
	const [placing, setPlacing] = (0, import_react.useState)(false);
	const [isAddressFormOpen, setIsAddressFormOpen] = (0, import_react.useState)(false);
	const [editingAddress, setEditingAddress] = (0, import_react.useState)(null);
	const grandTotal = (0, import_react.useMemo)(() => subtotal + deliveryFee, [subtotal, deliveryFee]);
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
	const openAddAddress = () => {
		setEditingAddress(null);
		setIsAddressFormOpen(true);
	};
	const openEditAddress = (address) => {
		setEditingAddress(address);
		setIsAddressFormOpen(true);
	};
	const handleApplyCoupon = async () => {
		if (!isAuthenticated) {
			navigate({
				to: "/login",
				search: { next: "/cart" }
			});
			return;
		}
		const customerId = getCustomerId();
		if (!customerId || !coupon.trim()) return;
		try {
			const result = await validateCoupon(customerId, coupon.trim());
			if (!result.status) {
				setCouponMessage(result.message ?? "Invalid coupon");
				setAppliedCoupon(null);
				return;
			}
			setAppliedCoupon(coupon.trim());
			setCouponMessage("Coupon applied");
		} catch {
			setCouponMessage("Could not validate coupon");
		}
	};
	const handlePlaceOrder = (0, import_react.useCallback)(async () => {
		if (!isAuthenticated) {
			navigate({
				to: "/login",
				search: { next: "/cart" }
			});
			return;
		}
		const customerId = getCustomerId();
		if (!customerId || items.length === 0) return;
		if (!selectedAddressId) {
			alert("Please select a delivery address before placing your order.");
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
				})),
				couponCode: appliedCoupon ?? void 0
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
					alert("Could not open the payment page. Please try again.");
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
		isAuthenticated,
		navigate,
		items,
		selectedAddressId,
		paymentMethod,
		grandTotal,
		subtotal,
		deliveryFee,
		appliedCoupon,
		refreshCart
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
						children: "Your bag"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-5xl leading-tight sm:text-6xl",
						children: "Almost yours."
					}),
					!isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 rounded-lg bg-card p-10 text-center shadow-soft ring-1 ring-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Please log in to view your cart and checkout."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: { next: "/cart" },
							className: "mt-6 inline-flex rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background",
							children: "Log in to continue"
						})]
					}) : isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartSkeleton, {}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 rounded-lg bg-card p-10 text-center shadow-soft ring-1 ring-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Your bag is empty."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "mt-6 inline-flex rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background",
							children: "Shop the collection"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-5 rounded-lg bg-card p-4 shadow-soft ring-1 ring-border/60 sm:p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-border/40 sm:h-24 sm:w-24",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: it.image,
												alt: it.title,
												className: "h-full w-full object-contain p-1.5"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "line-clamp-2 font-medium leading-snug",
													children: it.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-1 text-sm text-muted-foreground",
													children: ["AED ", it.price]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-3 flex flex-wrap items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-3 rounded-lg border border-border px-3 py-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																"aria-label": "Decrease quantity",
																onClick: () => void updateQuantity(it.id, Math.max(1, it.qty - 1)),
																className: "text-muted-foreground transition hover:text-foreground",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 12 })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "w-4 text-center text-sm tabular-nums",
																children: it.qty
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																"aria-label": "Increase quantity",
																onClick: () => void updateQuantity(it.id, it.qty + 1),
																className: "text-muted-foreground transition hover:text-foreground",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 12 })
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "font-medium tabular-nums sm:hidden",
														children: ["AED ", it.price * it.qty]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "hidden w-24 text-right font-medium tabular-nums sm:block",
											children: ["AED ", it.price * it.qty]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": "Remove item",
											onClick: () => void removeItem(it.id),
											className: "rounded-lg p-2 text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 })
										})
									]
								}, it.id)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-card p-5 shadow-soft ring-1 ring-border/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs uppercase tracking-widest text-muted-foreground",
											children: "Delivery address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: openAddAddress,
											className: "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium uppercase tracking-wider text-foreground transition hover:bg-foreground/5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), "Add"]
										})]
									}), addresses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 rounded-lg border border-dashed border-border px-4 py-6 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "No saved addresses yet."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: openAddAddress,
											className: "mt-3 inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), "Add address"]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 space-y-2",
										children: addresses.map((address) => {
											const { label, icon: TypeIcon } = getAddressType(address);
											const selected = selectedAddressId === address.id;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `flex items-start gap-3 rounded-lg border px-3 py-3 transition ${selected ? "border-foreground bg-foreground/[0.03]" : "border-border hover:border-foreground/30"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "flex min-w-0 flex-1 cursor-pointer gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "radio",
														name: "address",
														className: "mt-1 accent-foreground",
														checked: selected,
														onChange: () => setSelectedAddressId(address.id)
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "min-w-0",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeIcon, { size: 12 }),
																	label,
																	address.isDefault ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "rounded bg-foreground/10 px-1.5 py-0.5 text-[10px] normal-case tracking-normal",
																		children: "Default"
																	}) : null
																]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "mt-1 block text-sm leading-relaxed",
																children: formatFullAddress(address)
															}),
															address.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "mt-0.5 block text-xs text-muted-foreground",
																children: address.phone
															}) : null
														]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-label": "Edit address",
													onClick: () => openEditAddress(address),
													className: "shrink-0 rounded-lg p-2 text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 14 })
												})]
											}, address.id);
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 rounded-lg bg-brand px-5 py-4 text-white",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
										size: 18,
										className: "shrink-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm",
										children: deliveryFee === 0 ? "Free delivery applied for this address." : `Delivery: AED ${deliveryFee}`
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "h-fit rounded-lg bg-card p-6 shadow-soft ring-1 ring-border/60 sm:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-2xl",
									children: "Order summary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-6 space-y-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Subtotal",
										v: `AED ${subtotal}`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Shipping",
										v: deliveryFee === 0 ? "Free" : `AED ${deliveryFee}`
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs uppercase tracking-widest text-muted-foreground",
											children: "Payment"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setPaymentMethod("ziina"),
											className: `flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${paymentMethod === "ziina" ? "border-foreground bg-foreground/[0.03]" : "border-border hover:border-foreground/30"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { size: 16 }), " Pay online (Ziina)"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setPaymentMethod("cod"),
											className: `flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${paymentMethod === "cod" ? "border-foreground bg-foreground/[0.03]" : "border-border hover:border-foreground/30"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { size: 16 }), " Cash on delivery"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 border-t border-border pt-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "Total"
										}),
										v: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-2xl tabular-nums",
											children: ["AED ", grandTotal]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: coupon,
										onChange: (e) => setCoupon(e.target.value),
										placeholder: "Discount code",
										className: "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground/40 focus:ring-2 focus:ring-ring/20"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void handleApplyCoupon(),
										className: "rounded-lg border border-border px-4 text-xs font-medium uppercase tracking-wider transition hover:bg-foreground/5",
										children: "Apply"
									})]
								}),
								couponMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: couponMessage
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: placing || items.length === 0,
									onClick: () => void handlePlaceOrder(),
									className: "mt-4 w-full rounded-lg bg-foreground px-6 py-4 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50",
									children: placing ? "Placing order…" : paymentMethod === "ziina" ? "Pay with Ziina" : "Place COD order"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/checkout",
									className: "mt-3 block text-center text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground",
									children: "Or continue to checkout"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									className: "mt-2 block text-center text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground",
									children: "Continue shopping"
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddAddressModal, {
				isOpen: isAddressFormOpen,
				editAddress: editingAddress,
				onClose: () => {
					setIsAddressFormOpen(false);
					setEditingAddress(null);
				},
				onSaved: refreshAddresses
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: v })]
	});
}
//#endregion
export { Cart as component };
