import { a as __toESM } from "../_runtime.mjs";
import { E as socialLoginCustomer, b as pickAuthTokens } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useAuth } from "./AuthContext-B71YYWma.mjs";
import { u as PolicyContentSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { v as useNavigate, y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as X } from "../_libs/lucide-react.mjs";
import { a as getTermsAndConditions, i as getPrivacyPolicy } from "./policy-B5VS4u9g.mjs";
import { o as validatePhoneNumber } from "./utils-B_8IvW9T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/validation-Y2NiwijS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GOOGLE_CLIENT_ID = "";
function useGoogleSignIn() {
	const navigate = useNavigate();
	const search = useSearch({ strict: false });
	const { loginWithResponse } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useRef)(false);
	const handleCredential = (0, import_react.useCallback)(async (idToken) => {
		setLoading(true);
		setError("");
		try {
			const response = await socialLoginCustomer("google", idToken);
			const tokens = pickAuthTokens(response);
			if (response.status && tokens.access && tokens.user) {
				const err = loginWithResponse({
					access: tokens.access,
					refresh: tokens.refresh,
					user: tokens.user
				});
				if (!err) {
					const next = search.next;
					navigate({ to: next && next.startsWith("/") ? next : "/" });
				} else setError(err);
			} else setError(response.message ?? "Google sign-in failed. Please try again.");
		} catch {
			setError("Google sign-in failed. Please try again.");
		} finally {
			setLoading(false);
		}
	}, [
		loginWithResponse,
		navigate,
		search.next
	]);
	(0, import_react.useEffect)(() => {}, [handleCredential]);
	return {
		signIn: (0, import_react.useCallback)(() => {
			setError("");
			setError("Google sign-in is not configured.");
		}, []),
		loading,
		error,
		isAvailable: Boolean(GOOGLE_CLIENT_ID)
	};
}
var PolicyModal_module_default = {
	overlay: "_overlay_au9tn_1",
	modal: "_modal_au9tn_12",
	header: "_header_au9tn_23",
	title: "_title_au9tn_31",
	closeBtn: "_closeBtn_au9tn_37",
	body: "_body_au9tn_48",
	status: "_status_au9tn_53",
	htmlContent: "_htmlContent_au9tn_60"
};
function PolicyModal({ title, visible, onClose, fetchPolicy }) {
	const [content, setContent] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!visible) return;
		let cancelled = false;
		setLoading(true);
		setError(false);
		setContent(null);
		fetchPolicy().then((html) => {
			if (cancelled) return;
			if (!html) {
				setError(true);
				return;
			}
			setContent(html);
		}).catch(() => {
			if (!cancelled) setError(true);
		}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [visible, fetchPolicy]);
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: PolicyModal_module_default.overlay,
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: PolicyModal_module_default.modal,
			onClick: (event) => event.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "policy-modal-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: PolicyModal_module_default.header,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "policy-modal-title",
					className: PolicyModal_module_default.title,
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: PolicyModal_module_default.closeBtn,
					onClick: onClose,
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: PolicyModal_module_default.body,
				children: [
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicyContentSkeleton, {}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: PolicyModal_module_default.status,
						children: "Unable to load this policy. Please try again later."
					}),
					content && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: PolicyModal_module_default.htmlContent,
						dangerouslySetInnerHTML: { __html: content }
					})
				]
			})]
		})
	});
}
var TermsAcceptanceField_module_default = {
	wrapper: "_wrapper_3rrvl_1",
	label: "_label_3rrvl_5",
	checkbox: "_checkbox_3rrvl_12",
	text: "_text_3rrvl_21",
	link: "_link_3rrvl_27",
	error: "_error_3rrvl_43"
};
function TermsAcceptanceField({ checked, onChange, error, id = "terms-acceptance" }) {
	const [activePolicy, setActivePolicy] = (0, import_react.useState)(null);
	const openPolicy = (policy) => (event) => {
		event.preventDefault();
		event.stopPropagation();
		setActivePolicy(policy);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: TermsAcceptanceField_module_default.wrapper,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: TermsAcceptanceField_module_default.label,
				htmlFor: id,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id,
					type: "checkbox",
					className: TermsAcceptanceField_module_default.checkbox,
					checked,
					onChange: (event) => onChange(event.target.checked)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: TermsAcceptanceField_module_default.text,
					children: [
						"I agree to the",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: TermsAcceptanceField_module_default.link,
							onClick: openPolicy("terms"),
							children: "Terms & Conditions"
						}),
						" ",
						"and",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: TermsAcceptanceField_module_default.link,
							onClick: openPolicy("privacy"),
							children: "Privacy Policy"
						})
					]
				})]
			}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: TermsAcceptanceField_module_default.error,
				children: error
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicyModal, {
			title: "Terms and Conditions",
			visible: activePolicy === "terms",
			onClose: () => setActivePolicy(null),
			fetchPolicy: getTermsAndConditions
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicyModal, {
			title: "Privacy Policy",
			visible: activePolicy === "privacy",
			onClose: () => setActivePolicy(null),
			fetchPolicy: getPrivacyPolicy
		})
	] });
}
var TERMS_ACCEPTANCE_ERROR = "You must accept the Terms & Conditions and Privacy Policy to continue.";
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var MOBILE_RE = /^[6-9]\d{9}$/;
function validateEmail(email) {
	const trimmed = email.trim();
	if (!trimmed) return "Email is required.";
	if (!EMAIL_RE.test(trimmed)) return "Please enter a valid email address.";
	return null;
}
function validateMobile(mobile) {
	const trimmed = mobile.trim();
	if (!trimmed) return "Mobile number is required.";
	if (!/^\d+$/.test(trimmed)) return "Mobile number must contain only digits.";
	if (trimmed.length !== 10) return "Mobile number must be 10 digits.";
	if (!MOBILE_RE.test(trimmed)) return "Please enter a valid Indian mobile number.";
	return null;
}
var PASSWORD_REQUIREMENTS = [
	"At least 8 characters",
	"One uppercase letter",
	"One lowercase letter",
	"One number"
];
function getPasswordChecks(password) {
	return [
		{
			label: "At least 8 characters",
			met: password.length >= 8
		},
		{
			label: "One uppercase letter",
			met: /[A-Z]/.test(password)
		},
		{
			label: "One lowercase letter",
			met: /[a-z]/.test(password)
		},
		{
			label: "One number",
			met: /\d/.test(password)
		}
	];
}
function getPasswordStrength(password) {
	if (!password) return {
		score: 0,
		total: 4,
		percent: 0,
		label: "",
		error: null
	};
	const checks = getPasswordChecks(password);
	const score = checks.filter((check) => check.met).length;
	const total = checks.length;
	const percent = score / total * 100;
	let label = "Weak";
	if (score >= 4) label = "Strong";
	else if (score === 3) label = "Good";
	else if (score === 2) label = "Fair";
	return {
		score,
		total,
		percent,
		label,
		error: validatePassword(password)
	};
}
function validatePassword(password) {
	if (!password) return "Password is required.";
	if (password.length < 8) return "Password must be at least 8 characters.";
	if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
	if (!/[a-z]/.test(password)) return "Password must include a lowercase letter.";
	if (!/\d/.test(password)) return "Password must include a number.";
	return null;
}
function validateName(name) {
	const trimmed = name.trim();
	if (!trimmed) return "Full name is required.";
	if (trimmed.length < 2) return "Name must be at least 2 characters.";
	if (trimmed.length > 50) return "Name must be under 50 characters.";
	return null;
}
function validateTermsAcceptance(accepted) {
	if (!accepted) return TERMS_ACCEPTANCE_ERROR;
	return null;
}
function validateLoginForm(email, password, acceptedTerms) {
	const errors = {};
	const emailErr = validateEmail(email);
	if (emailErr) errors.email = emailErr;
	if (!password) errors.password = "Password is required.";
	const termsErr = validateTermsAcceptance(acceptedTerms);
	if (termsErr) errors.acceptedTerms = termsErr;
	return errors;
}
function validateSignupForm(fields) {
	const errors = {};
	const nameErr = validateName(fields.name);
	if (nameErr) errors.name = nameErr;
	const mobileErr = fields.mobileCountry ? validatePhoneNumber(fields.mobile, fields.mobileCountry) : validateMobile(fields.mobile);
	if (mobileErr) errors.mobile = mobileErr;
	const emailErr = validateEmail(fields.email);
	if (emailErr) errors.email = emailErr;
	const pwErr = validatePassword(fields.password);
	if (pwErr) errors.password = pwErr;
	if (!fields.confirmPassword) errors.confirmPassword = "Please confirm your password.";
	else if (fields.password !== fields.confirmPassword) errors.confirmPassword = "Passwords do not match.";
	const termsErr = validateTermsAcceptance(fields.acceptedTerms);
	if (termsErr) errors.acceptedTerms = termsErr;
	return errors;
}
//#endregion
export { useGoogleSignIn as a, getPasswordStrength as i, TermsAcceptanceField as n, validateLoginForm as o, getPasswordChecks as r, validateSignupForm as s, PASSWORD_REQUIREMENTS as t };
