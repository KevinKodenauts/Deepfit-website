import { c as apiRequest, x as portalUrl } from "./auth-4WDLQ7fX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-bxEC_Ra-.js
function parseGallery(gallery) {
	if (!gallery) return void 0;
	if (Array.isArray(gallery)) return gallery[0] || void 0;
	const trimmed = gallery.trim();
	if (!trimmed) return void 0;
	try {
		const parsed = JSON.parse(trimmed);
		if (Array.isArray(parsed)) return String(parsed[0] ?? "");
	} catch {}
	return trimmed.split(",")[0]?.trim() || void 0;
}
function mapOrderProduct(product) {
	const productName = product.productDetail?.productName ?? product.productDetail?.productname ?? "Product";
	const image = parseGallery(product.variantDetail?.variantImageGallery) ?? parseGallery(product.productDetail?.productGallery);
	return {
		id: product.id,
		productName,
		quantity: Number(product.qty ?? 1),
		unitPrice: Number(product.unitPrice ?? 0),
		totalPrice: Number(product.finalAmount ?? product.unitPrice ?? 0),
		image,
		lastTrackedStatus: product.lastTrackedStatus
	};
}
function mapOrder(order) {
	const orderedProducts = order.products?.length ? order.products.map(mapOrderProduct) : (order.orderedProducts ?? []).map((product) => ({
		id: product.id,
		productName: product.productName,
		quantity: product.quantity,
		unitPrice: Number(product.unitPrice ?? 0),
		totalPrice: Number(product.totalPrice ?? 0)
	}));
	const paymentStatus = order.paymentStatus?.toLowerCase();
	const isPaid = order.isPaid ?? (paymentStatus === "paid" || paymentStatus === "success" || paymentStatus === "completed");
	return {
		id: order.id,
		orderNumber: order.orderNo ?? order.orderNumber ?? String(order.id),
		orderStatus: order.orderStatus,
		orderDate: order.orderDate,
		deliveredAt: order.deliveredAt || void 0,
		canReturn: order.canReturn,
		returnWindowDays: order.returnWindowDays ?? 7,
		grandTotal: Number(order.netAmount ?? order.grandTotal ?? 0),
		isPaid,
		paymentStatus: order.paymentStatus,
		orderedProducts
	};
}
async function getCustomerOrders(customerId) {
	const data = await apiRequest(portalUrl("/orderbycustomer"), {
		method: "POST",
		body: { customerId },
		auth: true
	});
	return (data.customerOrderList ?? data.orderList ?? []).map(mapOrder);
}
function groupOrdersByNumber(orders) {
	const grouped = /* @__PURE__ */ new Map();
	for (const order of orders) {
		const existing = grouped.get(order.orderNumber);
		if (!existing) {
			grouped.set(order.orderNumber, { ...order });
			continue;
		}
		grouped.set(order.orderNumber, {
			...existing,
			deliveredAt: existing.deliveredAt || order.deliveredAt,
			canReturn: existing.canReturn ?? order.canReturn,
			returnWindowDays: existing.returnWindowDays ?? order.returnWindowDays,
			orderedProducts: [...existing.orderedProducts, ...order.orderedProducts],
			grandTotal: existing.grandTotal + order.grandTotal
		});
	}
	return Array.from(grouped.values());
}
/** Customer can cancel until the order is shipped (or later). */
function canCancelOrder(status) {
	const normalized = (status || "").toLowerCase().trim();
	if (!normalized) return true;
	if (normalized.includes("ship") || normalized.includes("transit") || normalized.includes("out for delivery") || normalized.includes("deliver") || normalized.includes("cancel") || normalized.includes("refund") || normalized.includes("return") || normalized === "success" || normalized === "completed") return false;
	return true;
}
var RETURN_WINDOW_DAYS = 7;
function isDeliveredStatus(status) {
	const normalized = (status || "").toLowerCase().trim();
	return normalized.includes("deliver") && !normalized.includes("out for") || normalized === "success" || normalized === "completed";
}
function parseDateOnly(value) {
	if (!value) return null;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return date;
}
/** Return is allowed only for delivered orders within 7 days of delivery. */
function canReturnOrder(order) {
	if (typeof order.canReturn === "boolean") return order.canReturn;
	const status = (order.orderStatus || "").toLowerCase().trim();
	if (status.includes("return") || status.includes("refund") || status.includes("cancel")) return false;
	if (!isDeliveredStatus(order.orderStatus)) return false;
	const deliveredAt = parseDateOnly(order.deliveredAt);
	if (!deliveredAt) return false;
	const windowDays = order.returnWindowDays ?? RETURN_WINDOW_DAYS;
	const deadline = new Date(deliveredAt);
	deadline.setDate(deadline.getDate() + windowDays);
	return Date.now() <= deadline.getTime();
}
async function cancelOrder(orderId) {
	return apiRequest(portalUrl("/cancelorder"), {
		method: "POST",
		body: { orderId },
		auth: true
	});
}
async function returnOrder(orderId, reason) {
	return apiRequest(portalUrl("/returnorder"), {
		method: "POST",
		body: {
			orderId,
			...reason ? { reason } : {}
		},
		auth: true
	});
}
function filterOrdersByStatus(orders, filter) {
	if (filter === "All Orders") return orders;
	return orders.filter((order) => {
		const status = order.orderStatus.toLowerCase();
		switch (filter) {
			case "In Transit": return status.includes("in transit") || status.includes("in progress");
			case "Shipping": return status.includes("shipping") || status.includes("dispatch");
			case "Return": return status.includes("return");
			case "Cancel": return status.includes("cancel");
			default: return true;
		}
	});
}
async function placeOrder(payload) {
	return apiRequest(portalUrl("/addcustomerorder"), {
		method: "POST",
		body: {
			customerId: payload.customerId,
			addressId: payload.addressId,
			shippingAddressId: payload.addressId,
			billingAddressId: payload.addressId,
			paymentMethod: payload.paymentMethod,
			platform: payload.platform ?? "web",
			subtotal: payload.subtotal,
			shippingCost: payload.shippingCost,
			discountAmount: payload.discountAmount,
			grandTotal: payload.grandTotal,
			items: payload.items.map((item) => ({
				productId: item.productId,
				quantity: item.quantity,
				variantId: item.variantId
			})),
			...payload.couponCode ? { couponCode: payload.couponCode } : {}
		},
		auth: true
	});
}
/** Start Ziina checkout via the Next.js server (works even if Django is not updated yet). */
async function startZiinaPayment(payload) {
	const response = await fetch("/api/payments/ziina/create", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	});
	const data = await response.json().catch(() => null);
	if (!response.ok || !data?.status || !data.paymentUrl) throw new Error(data?.message ?? "Could not start payment");
	return data;
}
/** Verify Ziina payment via the Next.js server, then best-effort sync to Django. */
async function confirmZiinaPayment(payload) {
	const data = await (await fetch("/api/payments/ziina/verify", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			orderId: payload.orderId,
			paymentIntentId: payload.paymentIntentId,
			amount: payload.amount,
			accessToken: payload.accessToken ?? void 0
		})
	})).json().catch(() => null);
	return {
		status: Boolean(data?.status),
		message: data?.message,
		isPaid: data?.isPaid,
		paymentStatus: data?.paymentStatus,
		orderId: data?.orderId,
		paymentIntentId: data?.paymentIntentId
	};
}
async function getShippingCharge(customerId, pincode) {
	return (await apiRequest(portalUrl("/getshippingcharge"), {
		method: "POST",
		body: {
			customerId,
			pincode
		},
		auth: true
	})).shippingCharge ?? 0;
}
async function validateCoupon(customerId, couponCode) {
	return apiRequest(portalUrl("/checkoffercouponvalidity"), {
		method: "POST",
		body: {
			customerId,
			couponCode
		},
		auth: true
	});
}
//#endregion
export { filterOrdersByStatus as a, groupOrdersByNumber as c, startZiinaPayment as d, validateCoupon as f, confirmZiinaPayment as i, placeOrder as l, canReturnOrder as n, getCustomerOrders as o, cancelOrder as r, getShippingCharge as s, canCancelOrder as t, returnOrder as u };
