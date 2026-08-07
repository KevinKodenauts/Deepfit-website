import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-4WDLQ7fX.js
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
var DEFAULT_API_HOST = readEnv("VITE_API_URL") ?? readEnv("NEXT_PUBLIC_API_URL") ?? "https://apideepfit.gaamferi.com";
var API_BASE_URL = typeof window !== "undefined" ? "" : DEFAULT_API_HOST;
var REST_API = `${API_BASE_URL}/api`;
var CUSTOMER_API = `${API_BASE_URL}/api/customer`;
var CUSTOMER_PORTAL = `${API_BASE_URL}/api/customerportal`;
var EXERCISE_API = `${API_BASE_URL}/api/exercise`;
`${API_BASE_URL}`;
var PORTAL_IP_ADDRESS = "127.0.0.1";
function portalUrl(path, query) {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	const params = new URLSearchParams({
		clientId: String(1),
		ipAddress: PORTAL_IP_ADDRESS
	});
	if (query) for (const [key, value] of Object.entries(query)) params.set(key, String(value));
	return `${CUSTOMER_PORTAL}${normalizedPath}?${params.toString()}`;
}
var DEFAULT_MAX_AGE_DAYS = 30;
function setCookie(name, value, maxAgeDays = DEFAULT_MAX_AGE_DAYS) {
	if (typeof document === "undefined") return;
	const maxAge = maxAgeDays * 24 * 60 * 60;
	const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
	document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}
function getCookie(name) {
	if (typeof document === "undefined") return null;
	const match = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`));
	return match ? decodeURIComponent(match[1]) : null;
}
function deleteCookie(name) {
	if (typeof document === "undefined") return;
	document.cookie = `${name}=; path=/; max-age=0`;
}
var ACCESS_TOKEN_KEY = "deepfit_access_token";
var REFRESH_TOKEN_KEY = "deepfit_refresh_token";
var USER_KEY = "deepfit_user";
var ACCESS_TOKEN_DAYS = 7;
var REFRESH_TOKEN_DAYS = 30;
var migrated = false;
function migrateFromLocalStorage() {
	if (typeof window === "undefined" || migrated) return;
	migrated = true;
	const legacyAccess = localStorage.getItem(ACCESS_TOKEN_KEY);
	if (!legacyAccess || getCookie(ACCESS_TOKEN_KEY)) return;
	const legacyRefresh = localStorage.getItem(REFRESH_TOKEN_KEY) ?? "";
	const legacyUser = localStorage.getItem(USER_KEY);
	setCookie(ACCESS_TOKEN_KEY, legacyAccess, ACCESS_TOKEN_DAYS);
	if (legacyRefresh) setCookie(REFRESH_TOKEN_KEY, legacyRefresh, REFRESH_TOKEN_DAYS);
	if (legacyUser) setCookie(USER_KEY, legacyUser, REFRESH_TOKEN_DAYS);
	localStorage.removeItem(ACCESS_TOKEN_KEY);
	localStorage.removeItem(REFRESH_TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
}
function getAccessToken() {
	if (typeof window === "undefined") return null;
	migrateFromLocalStorage();
	return getCookie(ACCESS_TOKEN_KEY);
}
function getRefreshToken() {
	if (typeof window === "undefined") return null;
	migrateFromLocalStorage();
	return getCookie(REFRESH_TOKEN_KEY);
}
function getStoredUser() {
	if (typeof window === "undefined") return null;
	migrateFromLocalStorage();
	const raw = getCookie(USER_KEY);
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function saveSession(access, refresh, user) {
	setCookie(ACCESS_TOKEN_KEY, access, ACCESS_TOKEN_DAYS);
	setCookie(REFRESH_TOKEN_KEY, refresh, REFRESH_TOKEN_DAYS);
	setCookie(USER_KEY, JSON.stringify(user), REFRESH_TOKEN_DAYS);
}
function clearSession() {
	deleteCookie(ACCESS_TOKEN_KEY);
	deleteCookie(REFRESH_TOKEN_KEY);
	deleteCookie(USER_KEY);
	if (typeof window !== "undefined") {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		localStorage.removeItem(REFRESH_TOKEN_KEY);
		localStorage.removeItem(USER_KEY);
	}
}
function getCustomerId() {
	const user = getStoredUser();
	if (!user) return null;
	const id = user.id ?? user.customerId;
	return id && id > 0 ? id : null;
}
var UNAUTHORIZED_EVENT = "deepfit:unauthorized";
var SELECTED_ADDRESS_KEY = "deepfit:selectedAddressId";
var INVALID_TOKEN_MESSAGES = /* @__PURE__ */ new Set([
	"invalid token",
	"invalid token or user not found",
	"token has expired",
	"the token is expired",
	"invalid credentials."
]);
var loggingOut = false;
function normalizeMessage(value) {
	if (typeof value !== "string") return null;
	const trimmed = value.trim().toLowerCase();
	return trimmed.length > 0 ? trimmed : null;
}
function isInvalidTokenPayload(data) {
	if (!data || typeof data !== "object") return false;
	const record = data;
	return [
		record.message,
		record.detail,
		record.error
	].map(normalizeMessage).filter((value) => Boolean(value)).some((message) => INVALID_TOKEN_MESSAGES.has(message) || message.includes("invalid token") || message.includes("token has expired") || message.includes("token is expired"));
}
function shouldForceLogout(status, data, auth) {
	if (!auth) return false;
	if (status === 401 || status === 403) return true;
	return isInvalidTokenPayload(data);
}
/** Clears session storage and redirects to login when the auth token is invalid. */
function forceLogout(redirectTo = "/login") {
	if (typeof window === "undefined") return;
	if (loggingOut) return;
	loggingOut = true;
	clearSession();
	try {
		localStorage.removeItem(SELECTED_ADDRESS_KEY);
		localStorage.removeItem("deepfit_access_token");
		localStorage.removeItem("deepfit_refresh_token");
		localStorage.removeItem("deepfit_user");
	} catch {}
	window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
	const { pathname, search } = window.location;
	if (pathname === "/login" || pathname.startsWith("/login/")) {
		loggingOut = false;
		return;
	}
	const next = `${pathname}${search}`;
	const loginUrl = next && next !== "/" ? `${redirectTo}?next=${encodeURIComponent(next)}` : redirectTo;
	window.location.assign(loginUrl);
}
var ApiError = class extends Error {
	status;
	constructor(message, status = 0) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
};
function responseMessage(data, status) {
	return (data && typeof data === "object" && "message" in data ? String(data.message) : null) ?? `Request failed (${status})`;
}
async function apiRequest(url, { method = "GET", body, auth = false, token } = {}) {
	const headers = { "Content-Type": "application/json" };
	if (auth) {
		const authToken = token ?? getAccessToken();
		if (authToken) headers.Authorization = `Bearer ${authToken}`;
	}
	const response = await fetch(url, {
		method,
		headers,
		credentials: "include",
		body: body !== void 0 ? JSON.stringify(body) : void 0
	});
	const data = await response.json().catch(() => null);
	if (shouldForceLogout(response.status, data, auth)) {
		forceLogout();
		throw new ApiError(responseMessage(data, response.status), response.status);
	}
	if (!response.ok) throw new ApiError(responseMessage(data, response.status), response.status);
	return data;
}
var APP_SOURCE = "Mobile";
function normalizeEmail(email) {
	return email.trim().toLowerCase();
}
function normalizeMobile(mobile) {
	const trimmed = mobile.trim();
	if (trimmed.startsWith("+91")) return trimmed.replace(/^\+91/, "").trim();
	return trimmed;
}
async function loginCustomer(username, password) {
	return apiRequest(`${CUSTOMER_PORTAL}/customerlogin`, {
		method: "POST",
		body: {
			username: username.trim(),
			password,
			source: APP_SOURCE
		}
	});
}
async function signupCustomer(payload) {
	return apiRequest(`${CUSTOMER_PORTAL}/customersignup`, {
		method: "POST",
		body: {
			customerName: payload.customerName.trim(),
			customerEmail: normalizeEmail(payload.customerEmail),
			customerMobile: normalizeMobile(payload.customerMobile),
			password: payload.password,
			source: APP_SOURCE
		}
	});
}
async function verifyForgotPasswordOtp(email, otp) {
	if (!/^\d{6}$/.test(otp)) throw new Error("OTP must be a 6-digit code");
	return apiRequest(`${CUSTOMER_PORTAL}/verifyotp`, {
		method: "POST",
		body: {
			email: normalizeEmail(email),
			otp,
			purpose: "password_reset"
		}
	});
}
async function getCustomerDetails(customerId) {
	const data = await apiRequest(portalUrl("/customerdetailsbycustomerid"), {
		method: "POST",
		body: { customerId },
		auth: true
	});
	if (!data.status) return null;
	return data.customerDetails ?? data.customerList?.[0] ?? null;
}
async function getCustomerReferralTree(customerId) {
	const data = await apiRequest(portalUrl("/getcustomerreferraltree", { maxLevels: 9 }), {
		method: "POST",
		body: { customerId },
		auth: true
	});
	return data.status ? data : null;
}
async function forgotPassword(email) {
	return apiRequest(`${CUSTOMER_PORTAL}/customerforgotpassword`, {
		method: "POST",
		body: { email: normalizeEmail(email) }
	});
}
async function resetForgottenPassword(email, newPassword) {
	const trimmedEmail = normalizeEmail(email);
	try {
		const reset = await apiRequest(`${CUSTOMER_PORTAL}/customerresetpassword`, {
			method: "POST",
			body: {
				email: trimmedEmail,
				newPassword
			}
		});
		if (reset.status) return reset;
		let message = reset.message ?? "Password could not be updated. Please request a new code.";
		if (message.toLowerCase().includes("verify otp")) message = "OTP session expired. Please go back and request a new code.";
		return {
			status: false,
			message
		};
	} catch (err) {
		return {
			status: false,
			message: err instanceof Error ? err.message : "Failed to reset password. Please try again."
		};
	}
}
async function updateCustomerPassword(newPassword, oldPassword, token) {
	return apiRequest(portalUrl("/updatecustomerpassword"), {
		method: "POST",
		body: {
			newPassword,
			...oldPassword ? { oldPassword } : {}
		},
		auth: true,
		token
	});
}
async function updateCustomerProfile(payload) {
	const formData = new FormData();
	formData.append("id", String(payload.customerId));
	formData.append("customerName", payload.customerName);
	formData.append("customerMobile", payload.customerMobile);
	formData.append("updated_by", payload.updatedBy);
	formData.append("customerAlterMobile", payload.customerAlterMobile ?? "");
	const token = getAccessToken();
	const headers = { Accept: "application/json" };
	if (token) headers.Authorization = `Bearer ${token}`;
	const response = await fetch(portalUrl("/editcustomerprofile"), {
		method: "POST",
		headers,
		body: formData,
		credentials: "include"
	});
	const data = await response.json().catch(() => null);
	if (shouldForceLogout(response.status, data, Boolean(token))) {
		forceLogout();
		return {
			status: false,
			message: data?.message ?? `Request failed (${response.status})`
		};
	}
	if (!response.ok || !data) return {
		status: false,
		message: data?.message ?? `Request failed (${response.status})`
	};
	return data;
}
async function socialLoginCustomer(provider, idToken, extra) {
	return apiRequest(`${CUSTOMER_PORTAL}/customersociallogin`, {
		method: "POST",
		body: {
			provider,
			idToken,
			source: APP_SOURCE,
			...extra?.name ? { name: extra.name } : {},
			...extra?.email ? { email: extra.email } : {}
		}
	});
}
function pickAuthTokens(response) {
	const raw = response;
	const access = raw.access ?? raw.access_token ?? raw.token ?? raw.data?.access ?? raw.data?.access_token ?? raw.data?.token;
	const refresh = raw.refresh ?? raw.data?.refresh;
	const user = raw.user ?? raw.customerDetails ?? raw.data?.user ?? raw.data?.customerDetails;
	if (user) {
		const normalizedUser = user;
		return {
			access,
			refresh,
			user: {
				...user,
				id: normalizedUser.id ?? normalizedUser.customerId ?? 0
			}
		};
	}
	return {
		access,
		refresh,
		user
	};
}
//#endregion
export { saveSession as C, updateCustomerPassword as D, socialLoginCustomer as E, updateCustomerProfile as O, resetForgottenPassword as S, signupCustomer as T, getStoredUser as _, EXERCISE_API as a, pickAuthTokens as b, apiRequest as c, forgotPassword as d, getAccessToken as f, getRefreshToken as g, getCustomerReferralTree as h, DEFAULT_API_HOST as i, verifyForgotPasswordOtp as k, clearSession as l, getCustomerId as m, CUSTOMER_API as n, REST_API as o, getCustomerDetails as p, CUSTOMER_PORTAL as r, UNAUTHORIZED_EVENT as s, ApiError as t, forceLogout as u, isInvalidTokenPayload as v, shouldForceLogout as w, portalUrl as x, loginCustomer as y };
