import { n as CUSTOMER_API } from "./auth-4WDLQ7fX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signupFlow-EFUyfMVD.js
function normalizeEmail(email) {
	return email.trim().toLowerCase();
}
function normalizePhone(phone) {
	const trimmed = phone.trim();
	if (trimmed.startsWith("+91")) return trimmed.replace(/^\+91/, "").trim();
	return trimmed;
}
async function customerApiPost(path, body) {
	const response = await fetch(`${CUSTOMER_API}${path}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(body)
	});
	const data = await response.json().catch(() => null);
	if (!data || typeof data !== "object" || typeof data.status !== "boolean") throw new Error("Invalid response from server.");
	if (!response.ok) throw new Error(data.message ?? `Request failed (${response.status})`);
	return data;
}
/**
* POST /api/customer/send-otp/ (Django requires trailing slash; proxy adds it)
* Backend: customer.views.send_otp
*/
async function sendCustomerOtp(payload) {
	const email = normalizeEmail(payload.email);
	if (!email) return {
		status: false,
		message: "Email is required"
	};
	const body = { email };
	const phone = payload.phone?.trim();
	if (phone) body.phone = normalizePhone(phone);
	return customerApiPost("/send-otp", body);
}
/**
* POST /api/customer/verify-otp/ (Django requires trailing slash; proxy adds it)
* Backend: customer.views.verify_otp
*/
async function verifyCustomerOtp(payload) {
	const email = normalizeEmail(payload.email);
	const otp = payload.otp.trim();
	if (!email) return {
		status: false,
		message: "Email is required"
	};
	if (!otp) return {
		status: false,
		message: "OTP is required"
	};
	if (!/^\d+$/.test(otp) || otp.length !== 6) return {
		status: false,
		message: `OTP must be a 6-digit code`
	};
	return customerApiPost("/verify-otp", {
		email,
		otp
	});
}
var signupDesktop_module_default = {
	page: "_page_1kkut_1",
	topLeft: "_topLeft_1kkut_19",
	topRight: "_topRight_1kkut_25",
	backBtn: "_backBtn_1kkut_31",
	skipLink: "_skipLink_1kkut_49",
	card: "_card_1kkut_60",
	branding: "_branding_1kkut_70",
	logoIcon: "_logoIcon_1kkut_77",
	brandName: "_brandName_1kkut_83",
	tagline: "_tagline_1kkut_91",
	welcomeTitle: "_welcomeTitle_1kkut_98",
	welcomeSubtitle: "_welcomeSubtitle_1kkut_106",
	sectionTitle: "_sectionTitle_1kkut_107",
	googleBtn: "_googleBtn_1kkut_115",
	divider: "_divider_1kkut_141",
	dividerText: "_dividerText_1kkut_156",
	authForm: "_authForm_1kkut_160",
	fieldGroup: "_fieldGroup_1kkut_166",
	fieldLabel: "_fieldLabel_1kkut_172",
	inputWrapper: "_inputWrapper_1kkut_178",
	inputIconLeft: "_inputIconLeft_1kkut_188",
	inputField: "_inputField_1kkut_195",
	inputFieldPhone: "_inputFieldPhone_1kkut_206",
	phonePrefix: "_phonePrefix_1kkut_223",
	inputIconAction: "_inputIconAction_1kkut_233",
	fieldError: "_fieldError_1kkut_250",
	formError: "_formError_1kkut_256",
	primaryBtn: "_primaryBtn_1kkut_262",
	primaryBtnEnabled: "_primaryBtnEnabled_1kkut_274",
	primaryBtnDisabled: "_primaryBtnDisabled_1kkut_283",
	footerPrompt: "_footerPrompt_1kkut_289",
	instruction: "_instruction_1kkut_308",
	email: "_email_1kkut_316",
	otpRow: "_otpRow_1kkut_325",
	otpInput: "_otpInput_1kkut_332",
	otpInputFilled: "_otpInputFilled_1kkut_352",
	resend: "_resend_1kkut_356",
	resendActive: "_resendActive_1kkut_364",
	statusText: "_statusText_1kkut_378",
	forgotRow: "_forgotRow_1kkut_385",
	forgotLink: "_forgotLink_1kkut_391"
};
var signup_module_default = {
	page: "_page_1i24m_1",
	header: "_header_1i24m_16",
	backBtn: "_backBtn_1i24m_27",
	headerTitle: "_headerTitle_1i24m_50",
	headerSpacer: "_headerSpacer_1i24m_58",
	container: "_container_1i24m_62",
	branding: "_branding_1i24m_70",
	logoIcon: "_logoIcon_1i24m_77",
	brandName: "_brandName_1i24m_83",
	tagline: "_tagline_1i24m_91",
	welcomeTitle: "_welcomeTitle_1i24m_98",
	welcomeSubtitle: "_welcomeSubtitle_1i24m_105",
	authForm: "_authForm_1i24m_112",
	fieldGroup: "_fieldGroup_1i24m_118",
	fieldLabel: "_fieldLabel_1i24m_124",
	inputWrapper: "_inputWrapper_1i24m_130",
	inputIconLeft: "_inputIconLeft_1i24m_140",
	inputField: "_inputField_1i24m_147",
	inputIconAction: "_inputIconAction_1i24m_172",
	fieldError: "_fieldError_1i24m_189",
	formError: "_formError_1i24m_195",
	termsWrap: "_termsWrap_1i24m_201",
	signupBtn: "_signupBtn_1i24m_205",
	signupBtnEnabled: "_signupBtnEnabled_1i24m_217",
	signupBtnDisabled: "_signupBtnDisabled_1i24m_226",
	divider: "_divider_1i24m_232",
	dividerText: "_dividerText_1i24m_247",
	socialRow: "_socialRow_1i24m_251",
	socialBtn: "_socialBtn_1i24m_257",
	loginPrompt: "_loginPrompt_1i24m_283"
};
var PENDING_SIGNUP_KEY = "deepfit_signup_pending";
function savePendingSignup(data) {
	sessionStorage.setItem(PENDING_SIGNUP_KEY, JSON.stringify(data));
	sessionStorage.setItem("deepfit_signup_email", data.customerEmail);
	sessionStorage.setItem("deepfit_signup_mobile", data.customerMobile);
}
function getPendingSignup() {
	const raw = sessionStorage.getItem(PENDING_SIGNUP_KEY);
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function clearPendingSignup() {
	sessionStorage.removeItem(PENDING_SIGNUP_KEY);
	sessionStorage.removeItem("deepfit_signup_email");
	sessionStorage.removeItem("deepfit_signup_mobile");
}
//#endregion
export { signupDesktop_module_default as a, sendCustomerOtp as i, getPendingSignup as n, signup_module_default as o, savePendingSignup as r, verifyCustomerOtp as s, clearPendingSignup as t };
