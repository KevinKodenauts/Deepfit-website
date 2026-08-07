import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as Instagram, nt as Facebook, s as Twitter, t as Youtube } from "../_libs/lucide-react.mjs";
import { t as Logo } from "./Nav-BaCy2SUO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Footer-C1eaAiAb.js
var import_jsx_runtime = require_jsx_runtime();
var shopLinks = [
	{
		label: "Strength",
		to: "/shop"
	},
	{
		label: "Cardio",
		to: "/shop"
	},
	{
		label: "Recovery",
		to: "/shop"
	},
	{
		label: "Yoga",
		to: "/shop"
	},
	{
		label: "Accessories",
		to: "/shop"
	}
];
var companyLinks = [
	{
		label: "About",
		to: "/about"
	},
	{
		label: "Explore",
		to: "/explore"
	},
	{
		label: "Contact",
		to: "/contact"
	}
];
var supportLinks = [
	{
		label: "Returns",
		to: "/policies/$slug",
		slug: "return"
	},
	{
		label: "Refunds",
		to: "/policies/$slug",
		slug: "refund"
	},
	{
		label: "Order Tracking",
		to: "/orders"
	}
];
var legalLinks = [
	{
		label: "Privacy",
		slug: "privacy"
	},
	{
		label: "Terms",
		slug: "terms"
	},
	{
		label: "Returns",
		slug: "return"
	},
	{
		label: "Refunds",
		slug: "refund"
	}
];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative mt-32 overflow-hidden bg-[oklch(0.16_0.03_270)] text-[oklch(0.9_0.02_250)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl [background:var(--gradient-brand)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl [background:var(--gradient-brand)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-6 py-24 lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
								variant: "white",
								height: 56,
								className: "max-h-16 sm:max-h-20"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-sm font-display text-2xl leading-snug tracking-tight text-white",
								children: "Wellness, from the inside out."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-sm text-sm text-white/60",
								children: "Premium equipment, recovery gear and rituals for people who take their body seriously — and their aesthetic even more so."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 flex gap-3",
								children: [
									Instagram,
									Twitter,
									Youtube,
									Facebook
								].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "rounded-full border border-white/15 p-3 transition hover:border-white/40 hover:bg-white/5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 })
								}, i))
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.2em] text-white/40",
							children: "Shop"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-3",
							children: shopLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: link.to,
								className: "text-sm text-white/80 transition hover:text-white",
								children: link.label
							}) }, link.label))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.2em] text-white/40",
							children: "Company"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-3",
							children: companyLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: link.to,
								className: "text-sm text-white/80 transition hover:text-white",
								children: link.label
							}) }, link.label))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.2em] text-white/40",
							children: "Support"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-3",
							children: supportLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "slug" in link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/policies/$slug",
								params: { slug: link.slug },
								className: "text-sm text-white/80 transition hover:text-white",
								children: link.label
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: link.to,
								className: "text-sm text-white/80 transition hover:text-white",
								children: link.label
							}) }, link.label))
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" DEEPFIT. Wellness Inside Out."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-6",
						children: legalLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/policies/$slug",
							params: { slug: link.slug },
							className: "hover:text-white",
							children: link.label
						}, link.label))
					})]
				})]
			})
		]
	});
}
//#endregion
export { Footer as t };
