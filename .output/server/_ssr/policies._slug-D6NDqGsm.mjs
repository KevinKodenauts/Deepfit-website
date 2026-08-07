import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Link, b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { mt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { n as POLICY_SLUGS, r as getPolicyContent, t as POLICY_PAGES } from "./policy-B5VS4u9g.mjs";
import { a as Route } from "./router-BAl0mxep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/policies._slug-D6NDqGsm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var policy_module_default = {
	page: "_page_1d8aj_1",
	header: "_header_1d8aj_7",
	backBtn: "_backBtn_1d8aj_19",
	headerTitle: "_headerTitle_1d8aj_32",
	shell: "_shell_1d8aj_40",
	hero: "_hero_1d8aj_47",
	eyebrow: "_eyebrow_1d8aj_51",
	title: "_title_1d8aj_64",
	description: "_description_1d8aj_74",
	nav: "_nav_1d8aj_82",
	navLink: "_navLink_1d8aj_89",
	navLinkActive: "_navLinkActive_1d8aj_109",
	card: "_card_1d8aj_115",
	content: "_content_1d8aj_123",
	state: "_state_1d8aj_183",
	spinner: "_spinner_1d8aj_194",
	spin: "_spin_1d8aj_194",
	retryBtn: "_retryBtn_1d8aj_209"
};
function PolicyPageContent({ slug }) {
	const router = useRouter();
	const meta = POLICY_PAGES[slug];
	const [content, setContent] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const loadPolicy = (0, import_react.useCallback)(async () => {
		setIsLoading(true);
		setError("");
		try {
			const html = await getPolicyContent(slug);
			setContent(html);
			if (!html) setError("This policy is not available right now.");
		} catch {
			setContent(null);
			setError("Could not load this policy. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}, [slug]);
	(0, import_react.useEffect)(() => {
		loadPolicy();
	}, [loadPolicy]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: policy_module_default.page,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: policy_module_default.header,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: policy_module_default.backBtn,
				onClick: () => router.history.back(),
				"aria-label": "Go back",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 22 })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: policy_module_default.headerTitle,
				children: meta.title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: policy_module_default.shell,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: policy_module_default.hero,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: policy_module_default.eyebrow,
							children: "Legal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: policy_module_default.title,
							children: meta.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: policy_module_default.description,
							children: meta.description
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: policy_module_default.nav,
					"aria-label": "Policy pages",
					children: POLICY_SLUGS.map((item) => {
						const page = POLICY_PAGES[item];
						const active = item === slug;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/policies/$slug",
							params: { slug: item },
							className: `${policy_module_default.navLink} ${active ? policy_module_default.navLinkActive : ""}`,
							children: page.title
						}, item);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: policy_module_default.card,
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: policy_module_default.state,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: policy_module_default.spinner }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading policy…" })]
					}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: policy_module_default.state,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: policy_module_default.retryBtn,
							onClick: () => void loadPolicy(),
							children: "Try again"
						})]
					}) : content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: policy_module_default.content,
						dangerouslySetInnerHTML: { __html: content }
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: policy_module_default.state,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No content available for this policy." })
					})
				})
			]
		})]
	});
}
function PolicyPage() {
	const { slug } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { paddingTop: "var(--desktop-nav-height)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicyPageContent, { slug }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})]
		})]
	});
}
//#endregion
export { PolicyPage as component };
