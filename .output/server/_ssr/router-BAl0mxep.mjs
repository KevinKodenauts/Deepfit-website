import { a as __toESM, r as __exportAll } from "../_runtime.mjs";
import { _ as getStoredUser, i as DEFAULT_API_HOST, m as getCustomerId, t as ApiError } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useAuth, p as portalRequest, t as AuthProvider } from "./AuthContext-B71YYWma.mjs";
import { n as WishlistProvider, t as CartProvider } from "./WishlistContext-DDsVW1bM.mjs";
import { B as notFound, L as redirect, _ as Link, b as useRouter, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as objectType, r as stringType, t as coerce } from "../_libs/zod.mjs";
import { o as isPolicySlug, t as POLICY_PAGES } from "./policy-B5VS4u9g.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/AddressContext-CqC_NUm-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var UAE_COUNTRY = "United Arab Emirates";
var UAE_EMIRATES = [
	"Abu Dhabi",
	"Dubai",
	"Sharjah",
	"Ajman",
	"Umm Al Quwain",
	"Ras Al Khaimah",
	"Fujairah"
];
function capitalizeAddressType(type) {
	if (!type) return "Home";
	const lower = type.toLowerCase();
	if (lower.includes("work") || lower.includes("office")) return "Work";
	if (lower.includes("home") || lower.includes("house")) return "Home";
	return type.charAt(0).toUpperCase() + type.slice(1);
}
function inferAddressType(item) {
	const label = item.addressLabel ?? item.addressType;
	if (label) return capitalizeAddressType(label);
	const street = (item.address ?? item.customerAddress ?? "").toLowerCase();
	if (street.includes("work") || street.includes("office")) return "Work";
	if (street.includes("home") || street.includes("house")) return "Home";
	return "Home";
}
function mapAddress(item) {
	const street = item.address ?? item.customerAddress ?? item.addressLine1 ?? "";
	const line2 = item.addressLine2?.trim();
	return {
		id: item.id,
		type: inferAddressType(item),
		address: [street, line2].filter(Boolean).join(", "),
		city: item.customerCity ?? item.city ?? "",
		state: item.customerState ?? item.state ?? "",
		pincode: item.customerPincode ?? item.pincode ?? "",
		country: item.customerCountry ?? item.country ?? "United Arab Emirates",
		isDefault: item.isDefault === true || item.isDefault === "true" || item.isDefault === "Yes" || item.isDefault === "YES",
		phone: item.mobileNo ?? item.customerDetails?.customerMobile,
		fullName: item.fullName ?? item.customerDetails?.customerName,
		addressLabel: item.addressLabel ?? item.addressType
	};
}
function actorName(override) {
	const user = getStoredUser();
	return override ?? user?.customerName ?? user?.name ?? "Customer";
}
async function getAddresses(customerId) {
	const data = await portalRequest("/addressesbycustomer", {
		method: "POST",
		auth: true,
		formFields: { customerId: String(customerId) }
	});
	if (!data.status) throw new ApiError(data.message ?? "Failed to load addresses");
	return (data.addressList ?? []).map(mapAddress);
}
async function addAddress(payload) {
	return portalRequest("/addcustomeraddress", {
		method: "POST",
		auth: true,
		formFields: {
			customerId: String(payload.customerId),
			clientId: String(1),
			address: payload.addressLine1.trim(),
			city: payload.city.trim(),
			state: payload.state,
			pincode: payload.pincode,
			country: payload.country ?? "United Arab Emirates",
			addressType: payload.addressType.toLowerCase(),
			created_by: actorName(payload.createdBy)
		}
	});
}
async function updateAddress(payload) {
	return portalRequest("/editcustomeraddress", {
		method: "POST",
		auth: true,
		formFields: {
			id: String(payload.addressId),
			customerId: String(payload.customerId),
			clientId: String(1),
			address: payload.addressLine1.trim(),
			city: payload.city.trim(),
			state: payload.state,
			pincode: payload.pincode,
			country: payload.country ?? "United Arab Emirates",
			addressType: payload.addressType.toLowerCase(),
			updated_by: actorName(payload.updatedBy),
			...payload.isDefault != null ? { isDefault: String(payload.isDefault) } : {}
		}
	});
}
async function deleteAddress(_customerId, addressId) {
	return portalRequest("/deletecustomeraddress", {
		method: "POST",
		auth: true,
		formFields: {
			id: String(addressId),
			clientId: String(1),
			isDelete: "YES"
		}
	});
}
/** Returns a ref that is `true` while the component is mounted. */
function useMountedRef() {
	const mountedRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	return mountedRef;
}
/**
* Ignores stale async responses after navigation/unmount.
* Concurrent in-flight requests are allowed; cancel() invalidates all of them.
*/
function useRequestGuard() {
	const mountedRef = useMountedRef();
	const requestCounterRef = (0, import_react.useRef)(0);
	const invalidateGenerationRef = (0, import_react.useRef)(0);
	const begin = (0, import_react.useCallback)(() => {
		requestCounterRef.current += 1;
		return {
			id: requestCounterRef.current,
			generation: invalidateGenerationRef.current
		};
	}, []);
	const isActive = (0, import_react.useCallback)((request) => mountedRef.current && request.generation === invalidateGenerationRef.current, [mountedRef]);
	const cancel = (0, import_react.useCallback)(() => {
		invalidateGenerationRef.current += 1;
	}, []);
	(0, import_react.useEffect)(() => cancel, [cancel]);
	return {
		begin,
		isActive,
		cancel,
		mountedRef
	};
}
var SELECTED_ADDRESS_KEY = "deepfit:selectedAddressId";
function formatAddressLabel(address) {
	if (!address) return "SELECT ADDRESS";
	const label = (address.addressLabel ?? address.type ?? "").toUpperCase();
	if (label.includes("HOME")) return "HOME";
	if (label.includes("WORK")) return "WORK";
	return label || "OTHER";
}
function formatUserName(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "User";
	if (parts.length === 1) return parts[0];
	return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}
var AddressContext = (0, import_react.createContext)(null);
function readStoredAddressId() {
	if (typeof window === "undefined") return null;
	const stored = window.localStorage.getItem(SELECTED_ADDRESS_KEY);
	if (!stored) return null;
	const parsed = Number(stored);
	return Number.isFinite(parsed) ? parsed : null;
}
function AddressProvider({ children }) {
	const { user, isAuthenticated, sessionVersion } = useAuth();
	const { begin, isActive } = useRequestGuard();
	const lastSessionVersionRef = (0, import_react.useRef)(0);
	const [addresses, setAddresses] = (0, import_react.useState)([]);
	const [selectedAddressId, setSelectedAddressIdState] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const displayName = user?.name ?? user?.customerName ?? "User";
	const selectedAddress = (0, import_react.useMemo)(() => addresses.find((address) => address.id === selectedAddressId) ?? addresses.find((address) => address.isDefault) ?? addresses[0] ?? null, [addresses, selectedAddressId]);
	const locationLine = (0, import_react.useMemo)(() => {
		if (!isAuthenticated || addresses.length === 0) return "SELECT ADDRESS";
		return `${formatAddressLabel(selectedAddress ?? addresses[0])} - ${formatUserName(displayName)}`;
	}, [
		addresses,
		selectedAddress,
		displayName,
		isAuthenticated
	]);
	const setSelectedAddressId = (0, import_react.useCallback)((id) => {
		setSelectedAddressIdState(id);
		if (typeof window !== "undefined") window.localStorage.setItem(SELECTED_ADDRESS_KEY, String(id));
	}, []);
	const refreshAddresses = (0, import_react.useCallback)(async () => {
		const customerId = getCustomerId();
		if (!customerId) {
			setAddresses([]);
			setSelectedAddressIdState(null);
			return;
		}
		const request = begin();
		setIsLoading(true);
		setError(null);
		try {
			const list = await getAddresses(customerId);
			if (!isActive(request)) return;
			setAddresses(list);
			if (list.length === 0) {
				setSelectedAddressIdState(null);
				if (typeof window !== "undefined") window.localStorage.removeItem(SELECTED_ADDRESS_KEY);
				return;
			}
			setSelectedAddressIdState((prev) => {
				const candidateIds = [prev, readStoredAddressId()].filter((id) => id != null);
				for (const id of candidateIds) if (list.some((item) => item.id === id)) return id;
				const defaultAddress = list.find((item) => item.isDefault) ?? list[0];
				if (typeof window !== "undefined") window.localStorage.setItem(SELECTED_ADDRESS_KEY, String(defaultAddress.id));
				return defaultAddress.id;
			});
		} catch (err) {
			if (!isActive(request)) return;
			setAddresses([]);
			setSelectedAddressIdState(null);
			setError(err instanceof Error ? err.message : "Could not load addresses.");
		} finally {
			if (isActive(request)) setIsLoading(false);
		}
	}, [begin, isActive]);
	(0, import_react.useEffect)(() => {
		if (!isAuthenticated) {
			setAddresses([]);
			setSelectedAddressIdState(null);
			return;
		}
		refreshAddresses();
	}, [isAuthenticated, refreshAddresses]);
	(0, import_react.useEffect)(() => {
		if (sessionVersion === lastSessionVersionRef.current) return;
		lastSessionVersionRef.current = sessionVersion;
		if (sessionVersion === 0 || !isAuthenticated) return;
		refreshAddresses();
	}, [
		sessionVersion,
		isAuthenticated,
		refreshAddresses
	]);
	const value = (0, import_react.useMemo)(() => ({
		addresses,
		selectedAddressId,
		selectedAddress,
		locationLine,
		isLoading,
		error,
		setSelectedAddressId,
		refreshAddresses
	}), [
		addresses,
		selectedAddressId,
		selectedAddress,
		locationLine,
		isLoading,
		error,
		setSelectedAddressId,
		refreshAddresses
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressContext.Provider, {
		value,
		children
	});
}
function useAddresses() {
	const context = (0, import_react.useContext)(AddressContext);
	if (!context) throw new Error("useAddresses must be used within AddressProvider");
	return context;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-593qe52D.js
var $$splitComponentImporter$33 = () => import("./checkout-DY-Xh0zn.mjs");
var searchSchema$10 = objectType({
	payment: stringType().optional(),
	orderId: stringType().optional()
});
var Route$40 = createFileRoute("/checkout")({
	validateSearch: searchSchema$10,
	head: () => ({ meta: [{ title: "Checkout — DEEPFIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/exercise.active._id-srXGXJWO.js
var $$splitComponentImporter$32 = () => import("./exercise.active._id-CtI6Ek6Z.mjs");
var Route$39 = createFileRoute("/exercise/active/$id")({
	head: () => ({ meta: [{ title: "Active Workout — DEEPFIT" }, {
		name: "description",
		content: "Follow along with your Deepfit guided workout timer."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/exercise.equipment._id-B7O3wzZy.js
var $$splitComponentImporter$31 = () => import("./exercise.equipment._id-CCiwMk77.mjs");
var Route$38 = createFileRoute("/exercise/equipment/$id")({
	head: () => ({ meta: [{ title: "Equipment Guide — DEEPFIT" }, {
		name: "description",
		content: "Learn how to use your Deepfit equipment with guided steps."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/exercise.library-DRlsypx8.js
var $$splitComponentImporter$30 = () => import("./exercise.library-C7L5WpRI.mjs");
var searchSchema$9 = objectType({
	equipment_ids: stringType().optional(),
	focus: stringType().optional()
});
var Route$37 = createFileRoute("/exercise/library")({
	validateSearch: searchSchema$9,
	head: () => ({ meta: [{ title: "Exercise Library — DEEPFIT" }, {
		name: "description",
		content: "Browse exercises matched to your selected Deepfit equipment."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/exercise.my-equipment--iJC22q7.js
var $$splitComponentImporter$29 = () => import("./exercise.my-equipment-00bSteZ_.mjs");
var searchSchema$8 = objectType({ ids: stringType().optional() });
var Route$36 = createFileRoute("/exercise/my-equipment")({
	validateSearch: searchSchema$8,
	head: () => ({ meta: [{ title: "My Equipment — DEEPFIT" }, {
		name: "description",
		content: "Manage your gym equipment and get personalized exercise recommendations."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/orders.success-DdwS_R4q.js
var $$splitComponentImporter$28 = () => import("./orders.success-pCP3yp-C.mjs");
var searchSchema$7 = objectType({
	orderNumber: stringType().optional(),
	orderId: stringType().optional(),
	paymentIntentId: stringType().optional()
});
var Route$35 = createFileRoute("/orders/success")({
	validateSearch: searchSchema$7,
	head: () => ({ meta: [{ title: "Order confirmed — DEEPFIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/policies._slug-Dz3nhntx.js
var $$splitComponentImporter$27 = () => import("./policies._slug-D6NDqGsm.mjs");
var Route$34 = createFileRoute("/policies/$slug")({
	beforeLoad: ({ params }) => {
		if (!isPolicySlug(params.slug)) throw notFound();
	},
	head: ({ params }) => {
		const slug = params.slug;
		if (!isPolicySlug(slug)) return { meta: [{ title: "Policy — DEEPFIT" }, {
			name: "description",
			content: "DeepFit legal policies."
		}] };
		const meta = POLICY_PAGES[slug];
		return { meta: [
			{ title: `${meta.title} — DEEPFIT` },
			{
				name: "description",
				content: meta.description
			},
			{
				property: "og:title",
				content: `${meta.title} — DEEPFIT`
			},
			{
				property: "og:description",
				content: meta.description
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-CTr8y8-H.js
var $$splitComponentImporter$26 = () => import("./product._slug-1KWybuQk.mjs");
var Route$33 = createFileRoute("/product/$slug")({
	head: () => ({ meta: [{ title: "Product — DEEPFIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-CKOw3pBO.js
var DEFAULT_CRISP_WEBSITE_ID = "2cff09c6-98f2-4f8b-aa34-a3a43e77dd09";
function readEnv(name) {
	if (typeof import.meta !== "undefined" && {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}[name]) return String({
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}[name]);
	if (typeof processModule !== "undefined" && processModule.env?.[name]) return processModule.env[name];
}
var CRISP_WEBSITE_ID = readEnv("VITE_CRISP_WEBSITE_ID") ?? readEnv("NEXT_PUBLIC_CRISP_WEBSITE_ID") ?? DEFAULT_CRISP_WEBSITE_ID;
function crispPush(...args) {
	if (typeof window === "undefined") return;
	window.$crisp = window.$crisp || [];
	window.$crisp.push(args);
}
function identifyCrispUser(user) {
	if (typeof window === "undefined" || !CRISP_WEBSITE_ID) return;
	if (!user?.id) {
		crispPush("do", "session:reset");
		return;
	}
	const email = user.email || user.customerEmail;
	const name = user.name || user.customerName;
	const phone = user.phone || user.customerMobile;
	if (email) crispPush("set", "user:email", [email]);
	if (name) crispPush("set", "user:nickname", [name]);
	if (phone) crispPush("set", "user:phone", [phone]);
	crispPush("set", "session:data", [[["user_id", String(user.id)], ["platform", "website"]]]);
}
function openCrispChat() {
	if (typeof window === "undefined" || !CRISP_WEBSITE_ID) return;
	crispPush("do", "chat:open");
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/search-B0SKZCh6.js
var $$splitComponentImporter$25 = () => import("./search-B50tz5CX.mjs");
var searchSchema$6 = objectType({
	q: stringType().optional(),
	voice: stringType().optional()
});
var Route$32 = createFileRoute("/search")({
	validateSearch: searchSchema$6,
	head: () => ({ meta: [{ title: "Search — DEEPFIT" }, {
		name: "description",
		content: "Search supplements, gym gear, wellness essentials and more."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BAl0mxep.js
var router_BAl0mxep_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var styles_default = "/assets/styles-CkCDz5We.css";
function AnalyticsProvider({ children }) {
	const { user, isAuthenticated } = useAuth();
	const lastUserId = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const nextUserId = isAuthenticated && user?.id ? user.id : null;
		if (lastUserId.current === nextUserId) return;
		lastUserId.current = nextUserId;
		identifyCrispUser(isAuthenticated ? user : null);
	}, [isAuthenticated, user]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function CrispChat() {
	(0, import_react.useEffect)(() => {
		if (!CRISP_WEBSITE_ID) return;
		if (document.getElementById("crisp-chat-script")) return;
		window.$crisp = window.$crisp || [];
		window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;
		const script = document.createElement("script");
		script.id = "crisp-chat-script";
		script.src = "https://client.crisp.chat/l.js";
		script.async = true;
		document.getElementsByTagName("head")[0].appendChild(script);
	}, []);
	return null;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$31 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "DEEPFIT — Wellness Inside Out" },
			{
				name: "description",
				content: "Premium fitness equipment, recovery gear and wellness essentials, designed for every lifestyle."
			},
			{
				name: "author",
				content: "DEEPFIT"
			},
			{
				property: "og:title",
				content: "DEEPFIT — Wellness Inside Out"
			},
			{
				property: "og:description",
				content: "Premium fitness equipment and wellness essentials for the modern athlete."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$31.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrispChat, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WishlistProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }) }) }) })]
	});
}
var $$splitComponentImporter$24 = () => import("./routes-B5a4aN1g.mjs");
var Route$30 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "DEEPFIT — Wellness Inside Out" },
		{
			name: "description",
			content: "Premium home fitness equipment, recovery gear and wellness essentials designed for every lifestyle."
		},
		{
			property: "og:title",
			content: "DEEPFIT — Wellness Inside Out"
		},
		{
			property: "og:description",
			content: "Transform your home into a premium fitness studio with Deepfit."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./about-BPDQkqji.mjs");
var Route$29 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Us — DEEPFIT" },
		{
			name: "description",
			content: "DEEPFIT is a holistic wellness brand built on Mind, Move and Fuel — helping people feel their best for life."
		},
		{
			property: "og:title",
			content: "About Us — DEEPFIT"
		},
		{
			property: "og:description",
			content: "Wellness Inside Out. Learn the story, founder, method and values behind DEEPFIT."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./cart-DBS-NJ7k.mjs");
var Route$28 = createFileRoute("/cart")({
	head: () => ({ meta: [
		{ title: "Cart — DEEPFIT" },
		{
			name: "description",
			content: "Review your Deepfit bag."
		},
		{
			property: "og:title",
			content: "Your Deepfit bag"
		},
		{
			property: "og:description",
			content: "Review your Deepfit bag before checkout."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./contact-iRwNKeWy.mjs");
var Route$27 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — DEEPFIT" },
		{
			name: "description",
			content: "Reach the Deepfit studio team for orders, shipping, returns and press."
		},
		{
			property: "og:title",
			content: "Contact Deepfit"
		},
		{
			property: "og:description",
			content: "Get in touch with the Deepfit studio team."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./exercise-lfDpOdxh.mjs");
var Route$26 = createFileRoute("/exercise")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./explore-DjEYKl4-.mjs");
var Route$25 = createFileRoute("/explore")({
	head: () => ({ meta: [
		{ title: "Explore — DEEPFIT" },
		{
			name: "description",
			content: "Explore DeepFit hubs — Move, Fuel and Mind. Choose your equipment and discover exercises that fit your life."
		},
		{
			property: "og:title",
			content: "Explore — DEEPFIT"
		},
		{
			property: "og:description",
			content: "Move Hub, Fuel Hub and Mind Hub — explore wellness the DeepFit way."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./forgot-password-BTW96YiW.mjs");
var Route$24 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [{ title: "Forgot Password — DEEPFIT" }, {
		name: "description",
		content: "Reset your Deepfit account password."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./login-DjNcE1Hf.mjs");
var searchSchema$5 = objectType({
	next: stringType().optional(),
	reset: stringType().optional(),
	signup: stringType().optional()
});
var Route$23 = createFileRoute("/login")({
	validateSearch: searchSchema$5,
	head: () => ({ meta: [{ title: "Login — DEEPFIT" }, {
		name: "description",
		content: "Log in to your Deepfit account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./orders-BYrarmWs.mjs");
var Route$22 = createFileRoute("/orders")({
	head: () => ({ meta: [{ title: "My Orders — DEEPFIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./profile-C3nQVX98.mjs");
var Route$21 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./shop-FYnIL8i8.mjs");
var searchSchema$4 = objectType({ main: coerce.number().optional() });
var Route$20 = createFileRoute("/shop")({
	validateSearch: searchSchema$4,
	head: () => ({ meta: [
		{ title: "Shop — DEEPFIT" },
		{
			name: "description",
			content: "Explore Deepfit's full catalog of premium strength, cardio, recovery, and yoga equipment."
		},
		{
			property: "og:title",
			content: "Shop premium fitness equipment — DEEPFIT"
		},
		{
			property: "og:description",
			content: "The full Deepfit catalog: strength, cardio, recovery and wellness essentials."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./signup-D9Vs038v.mjs");
var Route$19 = createFileRoute("/signup")({
	head: () => ({ meta: [{ title: "Sign Up — DEEPFIT" }, {
		name: "description",
		content: "Create your Deepfit account to shop premium fitness equipment."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./verify-otp-CFUNUN5f.mjs");
var Route$18 = createFileRoute("/verify-otp")({
	head: () => ({ meta: [{ title: "Verify Email — DEEPFIT" }, {
		name: "description",
		content: "Enter the verification code sent to your email to finish signing up."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./wallet-DDuVZ136.mjs");
var Route$17 = createFileRoute("/wallet")({
	head: () => ({ meta: [{ title: "Wallet — DEEPFIT" }, {
		name: "description",
		content: "View your Deepfit wallet balance and transactions."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./exercise.index-VP4pSq2q.mjs");
var Route$16 = createFileRoute("/exercise/")({
	head: () => ({ meta: [{ title: "Choose Your Equipment — DEEPFIT" }, {
		name: "description",
		content: "Select your fitness equipment to unlock matching Deepfit exercises and workouts."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var searchSchema$3 = objectType({
	equipment_ids: stringType().optional(),
	focus: stringType().optional()
});
var Route$15 = createFileRoute("/explore/library")({
	validateSearch: searchSchema$3,
	beforeLoad: ({ search }) => {
		throw redirect({
			to: "/exercise/library",
			search: {
				equipment_ids: search.equipment_ids,
				focus: search.focus
			},
			replace: true
		});
	}
});
var searchSchema$2 = objectType({ ids: stringType().optional() });
var Route$14 = createFileRoute("/explore/my-equipment")({
	validateSearch: searchSchema$2,
	beforeLoad: ({ search }) => {
		throw redirect({
			to: "/exercise/my-equipment",
			search: { ids: search.ids },
			replace: true
		});
	}
});
var $$splitComponentImporter$9 = () => import("./forgot-password_.reset-BTp--pHa.mjs");
var Route$13 = createFileRoute("/forgot-password_/reset")({
	head: () => ({ meta: [{ title: "Reset Password — DEEPFIT" }, {
		name: "description",
		content: "Create a new password for your Deepfit account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./forgot-password_.verify-C0l3wquv.mjs");
var Route$12 = createFileRoute("/forgot-password_/verify")({
	head: () => ({ meta: [{ title: "Verify Email — DEEPFIT" }, {
		name: "description",
		content: "Enter the verification code sent to your email."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./orders.details-BOLlt_T0.mjs");
var searchSchema$1 = objectType({ orderId: coerce.number().optional() });
var Route$11 = createFileRoute("/orders/details")({
	validateSearch: searchSchema$1,
	head: () => ({ meta: [{ title: "Order Details — DEEPFIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./profile.index-Da8WmoUE.mjs");
var Route$10 = createFileRoute("/profile/")({
	head: () => ({ meta: [{ title: "Profile — DEEPFIT" }, {
		name: "description",
		content: "Manage your Deepfit account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./profile.addresses-CZJ8oJNq.mjs");
var searchSchema = objectType({ select: stringType().optional() });
var Route$9 = createFileRoute("/profile/addresses")({
	validateSearch: searchSchema,
	head: () => ({ meta: [{ title: "My Addresses — DEEPFIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./profile.change-password-BOxZSp-O.mjs");
var Route$8 = createFileRoute("/profile/change-password")({
	head: () => ({ meta: [{ title: "Change Password — DEEPFIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./profile.edit-CkkjZUUI.mjs");
var Route$7 = createFileRoute("/profile/edit")({
	head: () => ({ meta: [{ title: "Update Profile — DEEPFIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./profile.referral-BBFsc65D.mjs");
var Route$6 = createFileRoute("/profile/referral")({
	head: () => ({ meta: [{ title: "Referral Tree — DEEPFIT" }, {
		name: "description",
		content: "Invite friends and track your referral network."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./profile.wishlist-B6Qy9aP5.mjs");
var Route$5 = createFileRoute("/profile/wishlist")({
	head: () => ({ meta: [{ title: "Wishlist — DEEPFIT" }, {
		name: "description",
		content: "Your saved Deepfit products."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./wallet.add-Kwt8182q.mjs");
var Route$4 = createFileRoute("/wallet/add")({
	head: () => ({ meta: [{ title: "Add Money — DEEPFIT" }, {
		name: "description",
		content: "Top up your Deepfit wallet."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route$3 = createFileRoute("/explore/active/$id")({ beforeLoad: ({ params }) => {
	throw redirect({
		to: "/exercise/active/$id",
		params: { id: params.id },
		replace: true
	});
} });
var Route$2 = createFileRoute("/explore/equipment/$id")({ beforeLoad: ({ params }) => {
	throw redirect({
		to: "/exercise/equipment/$id",
		params: { id: params.id },
		replace: true
	});
} });
var ZIINA_API_BASE = (typeof processModule !== "undefined" ? processModule.env.ZIINA_API_BASE?.replace(/\/$/, "") : void 0) ?? "https://api-v2.ziina.com/api";
function getAccessToken() {
	return (typeof processModule !== "undefined" ? processModule.env.ZIINA_ACCESS_TOKEN : void 0) ?? "jOFFkJir9N24ghPELu8s66rcRwjaI/5Nig1PmS5axbn4IBkCrAcSgsc6cEu2dUsw";
}
function isZiinaConfigured() {
	return Boolean(getAccessToken());
}
function toMinorUnits(amount) {
	const value = Math.round(Number(amount) * 100);
	if (!Number.isFinite(value) || value < 0) throw new Error("Invalid payment amount");
	return value;
}
async function createZiinaPaymentIntent(input) {
	const token = getAccessToken();
	if (!token) throw new Error("Ziina is not configured on the website server");
	const minor = toMinorUnits(input.amount);
	if (minor < 200) throw new Error("Online payments require a minimum of 2 AED");
	const response = await fetch(`${ZIINA_API_BASE}/payment_intent`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			amount: minor,
			currency_code: (typeof processModule !== "undefined" ? processModule.env.ZIINA_CURRENCY : void 0) ?? "AED",
			message: input.message,
			success_url: input.successUrl,
			cancel_url: input.cancelUrl,
			failure_url: input.failureUrl,
			test: input.test ?? [
				"1",
				"true",
				"yes"
			].includes(((typeof processModule !== "undefined" ? processModule.env.ZIINA_TEST_MODE : void 0) ?? "false").toLowerCase())
		})
	});
	const data = await response.json().catch(() => null);
	if (!response.ok || !data || !("id" in data)) {
		const message = data && "message" in data && data.message ? data.message : `Ziina create failed (${response.status})`;
		throw new Error(message);
	}
	return data;
}
async function getZiinaPaymentIntent(paymentIntentId) {
	const token = getAccessToken();
	if (!token) throw new Error("Ziina is not configured on the website server");
	const response = await fetch(`${ZIINA_API_BASE}/payment_intent/${paymentIntentId}`, { headers: {
		Authorization: `Bearer ${token}`,
		Accept: "application/json"
	} });
	const data = await response.json().catch(() => null);
	if (!response.ok || !data || !("id" in data)) {
		const message = data && "message" in data && data.message ? data.message : `Ziina fetch failed (${response.status})`;
		throw new Error(message);
	}
	return data;
}
function siteUrl(request) {
	const origin = request.headers.get("origin");
	if (origin) return origin.replace(/\/$/, "");
	const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
	if (host) {
		const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1") || host.startsWith("192.168.");
		return `${request.headers.get("x-forwarded-proto") ?? (isLocal ? "http" : "https")}://${host}`;
	}
	return (typeof processModule !== "undefined" ? processModule.env.VITE_SITE_URL?.replace(/\/$/, "") : void 0) ?? (typeof processModule !== "undefined" ? processModule.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") : void 0) ?? "https://main.d3pf7alzckc46l.amplifyapp.com";
}
var Route$1 = createFileRoute("/api/payments/ziina/create")({ server: { handlers: { POST: async ({ request }) => {
	try {
		if (!isZiinaConfigured()) return Response.json({
			status: false,
			message: "Ziina is not configured. Set ZIINA_ACCESS_TOKEN in the website environment."
		}, { status: 500 });
		const body = await request.json();
		const orderId = body.orderId;
		const orderNumber = body.orderNumber ?? String(orderId ?? "");
		const amount = Number(body.amount);
		if (!orderId || !Number.isFinite(amount) || amount <= 0) return Response.json({
			status: false,
			message: "orderId and amount are required"
		}, { status: 400 });
		const base = siteUrl(request);
		const query = new URLSearchParams({
			orderId: String(orderId),
			orderNumber: String(orderNumber)
		});
		const intent = await createZiinaPaymentIntent({
			amount,
			message: `Deepfit order ${orderNumber}`,
			successUrl: `${base}/orders/success?${query.toString()}`,
			cancelUrl: `${base}/checkout?payment=cancelled&orderId=${orderId}`,
			failureUrl: `${base}/checkout?payment=failed&orderId=${orderId}`
		});
		const paymentUrl = intent.redirect_url || intent.embedded_url;
		if (!paymentUrl) return Response.json({
			status: false,
			message: "Ziina did not return a payment URL"
		}, { status: 502 });
		query.set("paymentIntentId", intent.id);
		return Response.json({
			status: true,
			paymentIntentId: intent.id,
			paymentUrl,
			paymentRequired: true,
			successUrl: `${base}/orders/success?${query.toString()}`
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Could not start payment";
		return Response.json({
			status: false,
			message
		}, { status: 500 });
	}
} } } });
var Route = createFileRoute("/api/payments/ziina/verify")({ server: { handlers: { POST: async ({ request }) => {
	try {
		if (!isZiinaConfigured()) return Response.json({
			status: false,
			message: "Ziina is not configured"
		}, { status: 500 });
		const body = await request.json();
		const paymentIntentId = body.paymentIntentId?.trim();
		if (!paymentIntentId) return Response.json({
			status: false,
			message: "paymentIntentId is required"
		}, { status: 400 });
		const intent = await getZiinaPaymentIntent(paymentIntentId);
		if ((intent.status || "").toLowerCase() !== "completed") return Response.json({
			status: false,
			message: `Payment not completed (status: ${intent.status})`,
			paymentStatus: intent.status,
			orderId: body.orderId,
			paymentIntentId,
			isPaid: false
		});
		if (body.amount != null && body.amount !== "") {
			const expected = toMinorUnits(body.amount);
			const actual = Number(intent.amount || 0);
			if (actual && Math.abs(actual - expected) > 1) return Response.json({
				status: false,
				message: "Payment amount does not match order total"
			}, { status: 400 });
		}
		let djangoSynced = false;
		if (body.orderId && body.accessToken) try {
			const djangoResponse = await fetch(`${DEFAULT_API_HOST}/api/customerportal/verifyziinapayment?clientId=1&ipAddress=127.0.0.1`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${body.accessToken}`
				},
				body: JSON.stringify({
					orderId: body.orderId,
					paymentIntentId
				})
			});
			const djangoData = await djangoResponse.json().catch(() => null);
			djangoSynced = djangoResponse.ok && djangoData?.status === true;
		} catch {
			djangoSynced = false;
		}
		return Response.json({
			status: true,
			message: djangoSynced ? "Payment verified successfully" : "Payment received. Order confirmation is still syncing — refresh shortly.",
			orderId: body.orderId,
			paymentIntentId,
			paymentStatus: "completed",
			isPaid: true,
			djangoSynced
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Could not verify payment";
		return Response.json({
			status: false,
			message
		}, { status: 500 });
	}
} } } });
var IndexRoute = Route$30.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$31
});
var AboutRoute = Route$29.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$31
});
var CartRoute = Route$28.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$31
});
var CheckoutRoute = Route$40.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$31
});
var ContactRoute = Route$27.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$31
});
var ExerciseRoute = Route$26.update({
	id: "/exercise",
	path: "/exercise",
	getParentRoute: () => Route$31
});
var ExploreRoute = Route$25.update({
	id: "/explore",
	path: "/explore",
	getParentRoute: () => Route$31
});
var ForgotPasswordRoute = Route$24.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$31
});
var LoginRoute = Route$23.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$31
});
var OrdersRoute = Route$22.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => Route$31
});
var ProfileRoute = Route$21.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$31
});
var SearchRoute = Route$32.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$31
});
var ShopRoute = Route$20.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$31
});
var SignupRoute = Route$19.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$31
});
var VerifyOtpRoute = Route$18.update({
	id: "/verify-otp",
	path: "/verify-otp",
	getParentRoute: () => Route$31
});
var WalletRoute = Route$17.update({
	id: "/wallet",
	path: "/wallet",
	getParentRoute: () => Route$31
});
var ExerciseIndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => ExerciseRoute
});
var ExerciseLibraryRoute = Route$37.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => ExerciseRoute
});
var ExerciseMyEquipmentRoute = Route$36.update({
	id: "/my-equipment",
	path: "/my-equipment",
	getParentRoute: () => ExerciseRoute
});
var ExploreLibraryRoute = Route$15.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => ExploreRoute
});
var ExploreMyEquipmentRoute = Route$14.update({
	id: "/my-equipment",
	path: "/my-equipment",
	getParentRoute: () => ExploreRoute
});
var ForgotPasswordResetRoute = Route$13.update({
	id: "/forgot-password_/reset",
	path: "/forgot-password/reset",
	getParentRoute: () => Route$31
});
var ForgotPasswordVerifyRoute = Route$12.update({
	id: "/forgot-password_/verify",
	path: "/forgot-password/verify",
	getParentRoute: () => Route$31
});
var OrdersDetailsRoute = Route$11.update({
	id: "/details",
	path: "/details",
	getParentRoute: () => OrdersRoute
});
var OrdersSuccessRoute = Route$35.update({
	id: "/success",
	path: "/success",
	getParentRoute: () => OrdersRoute
});
var PoliciesSlugRoute = Route$34.update({
	id: "/policies/$slug",
	path: "/policies/$slug",
	getParentRoute: () => Route$31
});
var ProductSlugRoute = Route$33.update({
	id: "/product/$slug",
	path: "/product/$slug",
	getParentRoute: () => Route$31
});
var ProfileIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => ProfileRoute
});
var ProfileAddressesRoute = Route$9.update({
	id: "/addresses",
	path: "/addresses",
	getParentRoute: () => ProfileRoute
});
var ProfileChangePasswordRoute = Route$8.update({
	id: "/change-password",
	path: "/change-password",
	getParentRoute: () => ProfileRoute
});
var ProfileEditRoute = Route$7.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => ProfileRoute
});
var ProfileReferralRoute = Route$6.update({
	id: "/referral",
	path: "/referral",
	getParentRoute: () => ProfileRoute
});
var ProfileWishlistRoute = Route$5.update({
	id: "/wishlist",
	path: "/wishlist",
	getParentRoute: () => ProfileRoute
});
var WalletAddRoute = Route$4.update({
	id: "/add",
	path: "/add",
	getParentRoute: () => WalletRoute
});
var ExerciseActiveIdRoute = Route$39.update({
	id: "/active/$id",
	path: "/active/$id",
	getParentRoute: () => ExerciseRoute
});
var ExerciseEquipmentIdRoute = Route$38.update({
	id: "/equipment/$id",
	path: "/equipment/$id",
	getParentRoute: () => ExerciseRoute
});
var ExploreActiveIdRoute = Route$3.update({
	id: "/active/$id",
	path: "/active/$id",
	getParentRoute: () => ExploreRoute
});
var ExploreEquipmentIdRoute = Route$2.update({
	id: "/equipment/$id",
	path: "/equipment/$id",
	getParentRoute: () => ExploreRoute
});
var ApiPaymentsZiinaCreateRoute = Route$1.update({
	id: "/api/payments/ziina/create",
	path: "/api/payments/ziina/create",
	getParentRoute: () => Route$31
});
var ApiPaymentsZiinaVerifyRoute = Route.update({
	id: "/api/payments/ziina/verify",
	path: "/api/payments/ziina/verify",
	getParentRoute: () => Route$31
});
var ExerciseRouteChildren = {
	ExerciseLibraryRoute,
	ExerciseMyEquipmentRoute,
	ExerciseIndexRoute,
	ExerciseActiveIdRoute,
	ExerciseEquipmentIdRoute
};
var ExerciseRouteWithChildren = ExerciseRoute._addFileChildren(ExerciseRouteChildren);
var ExploreRouteChildren = {
	ExploreLibraryRoute,
	ExploreMyEquipmentRoute,
	ExploreActiveIdRoute,
	ExploreEquipmentIdRoute
};
var ExploreRouteWithChildren = ExploreRoute._addFileChildren(ExploreRouteChildren);
var OrdersRouteChildren = {
	OrdersDetailsRoute,
	OrdersSuccessRoute
};
var OrdersRouteWithChildren = OrdersRoute._addFileChildren(OrdersRouteChildren);
var ProfileRouteChildren = {
	ProfileAddressesRoute,
	ProfileChangePasswordRoute,
	ProfileEditRoute,
	ProfileReferralRoute,
	ProfileWishlistRoute,
	ProfileIndexRoute
};
var ProfileRouteWithChildren = ProfileRoute._addFileChildren(ProfileRouteChildren);
var WalletRouteChildren = { WalletAddRoute };
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	CartRoute,
	CheckoutRoute,
	ContactRoute,
	ExerciseRoute: ExerciseRouteWithChildren,
	ExploreRoute: ExploreRouteWithChildren,
	ForgotPasswordRoute,
	LoginRoute,
	OrdersRoute: OrdersRouteWithChildren,
	ProfileRoute: ProfileRouteWithChildren,
	SearchRoute,
	ShopRoute,
	SignupRoute,
	VerifyOtpRoute,
	WalletRoute: WalletRoute._addFileChildren(WalletRouteChildren),
	ForgotPasswordResetRoute,
	ForgotPasswordVerifyRoute,
	PoliciesSlugRoute,
	ProductSlugRoute,
	ApiPaymentsZiinaCreateRoute,
	ApiPaymentsZiinaVerifyRoute
};
var routeTree = Route$31._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { useAddresses as _, Route$34 as a, Route$37 as c, Route$40 as d, UAE_COUNTRY as f, updateAddress as g, getRouter, deleteAddress as h, Route$33 as i, Route$38 as l, addAddress as m, Route$32 as n, Route$35 as o, UAE_EMIRATES as p, openCrispChat as r, Route$36 as s, router_BAl0mxep_exports as t, Route$39 as u };
