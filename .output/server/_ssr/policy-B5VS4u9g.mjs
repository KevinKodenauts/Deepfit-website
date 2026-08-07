import { x as portalUrl } from "./auth-4WDLQ7fX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/policy-B5VS4u9g.js
var POLICY_PAGES = {
	terms: {
		slug: "terms",
		title: "Terms and Conditions",
		description: "Read the terms and conditions for using DeepFit services.",
		endpoint: "gettermsandconditions",
		listKey: "contentList",
		fieldName: "content"
	},
	privacy: {
		slug: "privacy",
		title: "Privacy Policy",
		description: "Learn how DeepFit collects, uses, and protects your data.",
		endpoint: "getprivacypolicy",
		listKey: "privacyPolicyContentList",
		fieldName: "privacyPolicyContent"
	},
	return: {
		slug: "return",
		title: "Return Policy",
		description: "Understand DeepFit return eligibility and process.",
		endpoint: "getreturnpolicy",
		listKey: "returnPolicyContentList",
		fieldName: "policyContent"
	},
	refund: {
		slug: "refund",
		title: "Refund Policy",
		description: "Details on refunds for DeepFit orders and payments.",
		endpoint: "getrefundpolicy",
		listKey: "refundPolicyContentList",
		fieldName: "refundPolicyContent"
	}
};
var POLICY_SLUGS = Object.keys(POLICY_PAGES);
function extractHtmlContent(value, fieldName, listKey) {
	const list = value?.[listKey];
	if (!Array.isArray(list) || list.length === 0) return null;
	const content = list[0]?.[fieldName];
	if (typeof content === "string") {
		const trimmed = content.trim();
		if (!trimmed) return null;
		try {
			const parsed = JSON.parse(trimmed);
			if (Array.isArray(parsed) && parsed.length > 0) return String(parsed[0]);
			if (typeof parsed === "string" && parsed.trim()) return parsed;
		} catch {
			return content;
		}
		return content;
	}
	if (Array.isArray(content) && content.length > 0) return String(content[0]);
	return null;
}
async function fetchPolicy(endpoint) {
	const response = await fetch(portalUrl(endpoint), {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		cache: "no-store"
	});
	if (!response.ok) return null;
	const data = await response.json().catch(() => null);
	if (!data || data.status === false) return null;
	return data;
}
async function getPolicyContent(slug) {
	const meta = POLICY_PAGES[slug];
	const data = await fetchPolicy(meta.endpoint);
	if (!data) return null;
	return extractHtmlContent(data, meta.fieldName, meta.listKey);
}
async function getTermsAndConditions() {
	return getPolicyContent("terms");
}
async function getPrivacyPolicy() {
	return getPolicyContent("privacy");
}
function isPolicySlug(value) {
	return value in POLICY_PAGES;
}
//#endregion
export { getTermsAndConditions as a, getPrivacyPolicy as i, POLICY_SLUGS as n, isPolicySlug as o, getPolicyContent as r, POLICY_PAGES as t };
