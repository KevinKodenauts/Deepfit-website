import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { L as MapPin, O as Phone, z as Mail } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-iRwNKeWy.js
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden bg-soft pt-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl [background:radial-gradient(circle,var(--mint),transparent_60%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-6 pb-16 lg:px-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
						children: "Contact"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-4 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl",
						children: [
							"We reply to every note, ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient italic",
								children: "personally"
							}),
							"."
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1.2fr_1fr] lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "rounded-[2rem] bg-card p-10 shadow-soft ring-1 ring-border/60",
					onSubmit: (e) => e.preventDefault(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "First name" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Last name" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									type: "email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Subject" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs uppercase tracking-[0.22em] text-muted-foreground",
								children: "Message"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 6,
								className: "mt-2 w-full rounded-2xl border border-border bg-background p-4 text-sm outline-none focus:ring-4 focus:ring-ring/30"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "mt-8 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition hover:opacity-90",
							children: "Send message"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-6",
					children: [
						{
							icon: Mail,
							t: "Email",
							v: "support@deepfit.life"
						},
						{
							icon: Phone,
							t: "Phone",
							v: "+1 (800) 000-0000"
						},
						{
							icon: MapPin,
							t: "Studio",
							v: "88 Grand Street, New York, NY"
						}
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "inline-flex rounded-2xl bg-brand p-3 text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { size: 18 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 text-xs uppercase tracking-widest text-muted-foreground",
								children: c.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-display text-2xl",
								children: c.v
							})
						]
					}, c.t))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Field({ label, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "text-xs uppercase tracking-[0.22em] text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: "mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:ring-4 focus:ring-ring/30"
	})] });
}
//#endregion
export { Contact as component };
