import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CurrencySymbol-RZEUbyS_.js
var import_jsx_runtime = require_jsx_runtime();
var CurrencySymbol_module_default = {
	symbol: "_symbol_1gtqa_1",
	amount: "_amount_1gtqa_10"
};
/** Dirham glyph renders larger than surrounding text at the same font size. */
var CURRENCY_SYMBOL_SIZE_SCALE = .68;
function CurrencySymbol({ className, size, style }) {
	const sizeStyle = size !== void 0 ? { fontSize: typeof size === "number" ? `${size * CURRENCY_SYMBOL_SIZE_SCALE}px` : `calc(${size} * ${CURRENCY_SYMBOL_SIZE_SCALE})` } : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `${CurrencySymbol_module_default.symbol} ${className ?? ""}`,
		style: {
			...sizeStyle,
			...style
		},
		"aria-label": "UAE Dirham",
		children: "⃃"
	});
}
function CurrencyAmount({ children, className, symbolClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `${CurrencySymbol_module_default.amount} ${className ?? ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencySymbol, { className: symbolClassName }), children]
	});
}
//#endregion
export { CurrencySymbol as n, CurrencyAmount as t };
