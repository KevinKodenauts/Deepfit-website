import { a as __toESM } from "../_runtime.mjs";
import { f as getAccessToken } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { ft as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { i as confirmZiinaPayment } from "./orders-bxEC_Ra-.mjs";
import { o as Route } from "./router-BAl0mxep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.success-pCP3yp-C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrderSuccessPage() {
	const { orderNumber, orderId, paymentIntentId } = Route.useSearch();
	const [status, setStatus] = (0, import_react.useState)("Confirming your order…");
	(0, import_react.useEffect)(() => {
		const intentId = paymentIntentId || (orderId ? sessionStorage.getItem(`ziina:${orderId}`) : null);
		if (!intentId || !orderId) {
			setStatus("Your order has been placed.");
			return;
		}
		const token = getAccessToken() ?? void 0;
		confirmZiinaPayment({
			orderId,
			paymentIntentId: intentId,
			accessToken: token
		}).then((result) => {
			setStatus(result.message || (result.isPaid ? "Payment verified. Thank you!" : "Order received. Payment is still syncing."));
		}).catch(() => {
			setStatus("Order received. Payment confirmation is still syncing.");
		});
	}, [orderId, paymentIntentId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto flex max-w-xl flex-col items-center px-6 pb-24 pt-40 text-center lg:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
						size: 48,
						className: "text-[oklch(0.7_0.15_155)]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-6 font-display text-4xl",
						children: "Thank you"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: status
					}),
					orderNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: ["Order ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: orderNumber
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "mt-10 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background",
						children: "Continue shopping"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { OrderSuccessPage as component };
