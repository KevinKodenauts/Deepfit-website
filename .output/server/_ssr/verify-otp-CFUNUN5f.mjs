import { a as __toESM } from "../_runtime.mjs";
import { T as signupCustomer, b as pickAuthTokens, y as loginCustomer } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useAuth } from "./AuthContext-B71YYWma.mjs";
import { r as AuthPageSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { mt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { a as signupDesktop_module_default, i as sendCustomerOtp, n as getPendingSignup, o as signup_module_default, s as verifyCustomerOtp, t as clearPendingSignup } from "./signupFlow-EFUyfMVD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-otp-CFUNUN5f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VerifyOtpDesktop({ goBack, otp, countdown, error, loading, statusText, pendingSignup, inputRefs, isOtpComplete, handleChange, handleKeyDown, handleResend, handleVerify, otpLength }) {
	if (!pendingSignup) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: signupDesktop_module_default.page,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: signupDesktop_module_default.topLeft,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: signupDesktop_module_default.backBtn,
				onClick: goBack,
				"aria-label": "Go back",
				disabled: loading,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: signupDesktop_module_default.card,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: signupDesktop_module_default.branding,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/logo/Deepfit-D-Logo.png",
							alt: "Deepfit logo",
							width: 56,
							height: 56,
							className: signupDesktop_module_default.logoIcon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: signupDesktop_module_default.brandName,
							children: "DEEPFIT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: signupDesktop_module_default.tagline,
							children: "Wellness Inside Out"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: signupDesktop_module_default.welcomeTitle,
					children: "Verify Email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: signupDesktop_module_default.instruction,
					children: [
						"We sent a ",
						otpLength,
						"-digit verification code to"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: signupDesktop_module_default.email,
					children: pendingSignup.customerEmail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: signupDesktop_module_default.otpRow,
					children: otp.map((digit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: (el) => {
							inputRefs.current[index] = el;
						},
						type: "text",
						inputMode: "numeric",
						autoComplete: index === 0 ? "one-time-code" : "off",
						maxLength: 6,
						value: digit,
						disabled: loading,
						onChange: (e) => handleChange(index, e.target.value),
						onKeyDown: (e) => handleKeyDown(index, e),
						className: `${signupDesktop_module_default.otpInput} ${digit ? signupDesktop_module_default.otpInputFilled : ""}`,
						"aria-label": `Digit ${index + 1}`
					}, index))
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: signupDesktop_module_default.formError,
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: signupDesktop_module_default.resend,
					children: countdown > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Resend OTP in ",
						countdown,
						" s"
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: signupDesktop_module_default.resendActive,
						onClick: handleResend,
						disabled: loading,
						children: "Resend OTP"
					})
				}),
				statusText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: signupDesktop_module_default.statusText,
					children: statusText
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `${signupDesktop_module_default.primaryBtn} ${isOtpComplete && !loading ? signupDesktop_module_default.primaryBtnEnabled : signupDesktop_module_default.primaryBtnDisabled}`,
					onClick: handleVerify,
					disabled: !isOtpComplete || loading,
					children: loading ? "Please wait..." : "Verify & Create Account"
				})
			]
		})]
	});
}
var verifyOtp_module_default = {
	page: "_page_daa1t_1",
	container: "_container_daa1t_9",
	instruction: "_instruction_daa1t_14",
	email: "_email_daa1t_21",
	otpRow: "_otpRow_daa1t_29",
	otpInput: "_otpInput_daa1t_36",
	otpInputFilled: "_otpInputFilled_daa1t_56",
	resend: "_resend_daa1t_60",
	resendActive: "_resendActive_daa1t_68",
	formError: "_formError_daa1t_82",
	statusText: "_statusText_daa1t_89",
	verifyBtn: "_verifyBtn_daa1t_96",
	verifyBtnEnabled: "_verifyBtnEnabled_daa1t_107",
	verifyBtnDisabled: "_verifyBtnDisabled_daa1t_116"
};
function VerifyOtpMobile({ goBack, otp, countdown, error, loading, statusText, pendingSignup, inputRefs, isOtpComplete, handleChange, handleKeyDown, handleResend, handleVerify, otpLength }) {
	if (!pendingSignup) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: verifyOtp_module_default.page,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: signup_module_default.header,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: signup_module_default.backBtn,
					onClick: goBack,
					"aria-label": "Go back",
					disabled: loading,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: signup_module_default.headerTitle,
					children: "Verify Email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: signup_module_default.headerSpacer })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: verifyOtp_module_default.container,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: verifyOtp_module_default.instruction,
					children: [
						"We sent a ",
						otpLength,
						"-digit verification code to"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: verifyOtp_module_default.email,
					children: pendingSignup.customerEmail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: verifyOtp_module_default.otpRow,
					children: otp.map((digit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: (el) => {
							inputRefs.current[index] = el;
						},
						type: "text",
						inputMode: "numeric",
						autoComplete: index === 0 ? "one-time-code" : "off",
						maxLength: 6,
						value: digit,
						disabled: loading,
						onChange: (e) => handleChange(index, e.target.value),
						onKeyDown: (e) => handleKeyDown(index, e),
						className: `${verifyOtp_module_default.otpInput} ${digit ? verifyOtp_module_default.otpInputFilled : ""}`,
						"aria-label": `Digit ${index + 1}`
					}, index))
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: verifyOtp_module_default.formError,
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: verifyOtp_module_default.resend,
					children: countdown > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Resend OTP in ",
						countdown,
						" s"
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: verifyOtp_module_default.resendActive,
						onClick: handleResend,
						disabled: loading,
						children: "Resend OTP"
					})
				}),
				statusText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: verifyOtp_module_default.statusText,
					children: statusText
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `${verifyOtp_module_default.verifyBtn} ${isOtpComplete && !loading ? verifyOtp_module_default.verifyBtnEnabled : verifyOtp_module_default.verifyBtnDisabled}`,
					onClick: handleVerify,
					disabled: !isOtpComplete || loading,
					children: loading ? "Please wait..." : "Verify & Create Account"
				})
			]
		})]
	});
}
var RESEND_SECONDS = 30;
function useVerifyOtpForm() {
	const navigate = useNavigate();
	const { loginWithResponse } = useAuth();
	const [otp, setOtp] = (0, import_react.useState)(() => Array.from({ length: 6 }, () => ""));
	const [countdown, setCountdown] = (0, import_react.useState)(RESEND_SECONDS);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [statusText, setStatusText] = (0, import_react.useState)("");
	const [pendingSignup, setPendingSignup] = (0, import_react.useState)(null);
	const inputRefs = (0, import_react.useRef)([]);
	const verifyingRef = (0, import_react.useRef)(false);
	const goBack = () => {
		navigate({ to: "/signup" });
	};
	(0, import_react.useEffect)(() => {
		const pending = getPendingSignup();
		if (!pending) {
			navigate({ to: "/signup" });
			return;
		}
		setPendingSignup(pending);
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		if (countdown <= 0) return;
		const timer = setTimeout(() => setCountdown((value) => value - 1), 1e3);
		return () => clearTimeout(timer);
	}, [countdown]);
	(0, import_react.useEffect)(() => {
		inputRefs.current[0]?.focus();
	}, [pendingSignup]);
	const otpString = (0, import_react.useMemo)(() => otp.join(""), [otp]);
	const isOtpComplete = otpString.length === 6;
	const fillOtp = (0, import_react.useCallback)((digits) => {
		const cleaned = digits.replace(/\D/g, "").slice(0, 6);
		const next = Array.from({ length: 6 }, (_, index) => cleaned[index] ?? "");
		setOtp(next);
		const focusIndex = Math.min(cleaned.length, 5);
		inputRefs.current[focusIndex]?.focus();
		return cleaned;
	}, []);
	const completeSignup = (0, import_react.useCallback)(async (code) => {
		if (!pendingSignup || verifyingRef.current) return;
		verifyingRef.current = true;
		setError("");
		setLoading(true);
		setStatusText("Verifying OTP...");
		try {
			const verifyResult = await verifyCustomerOtp({
				email: pendingSignup.customerEmail,
				otp: code
			});
			if (!verifyResult.status) {
				setError(verifyResult.message ?? "Invalid OTP. Please try again.");
				return;
			}
			setStatusText("Creating your account...");
			const signupResult = await signupCustomer(pendingSignup);
			const { access, refresh, user } = pickAuthTokens(signupResult);
			if (signupResult.status && access && user) {
				const loginErr = loginWithResponse({
					access,
					refresh,
					user
				});
				if (loginErr) {
					setError(loginErr);
					return;
				}
				clearPendingSignup();
				navigate({ to: "/" });
				return;
			}
			try {
				const loginResult = await loginCustomer(pendingSignup.customerEmail, pendingSignup.password);
				const loginTokens = pickAuthTokens(loginResult);
				if (loginResult.status && loginTokens.access && loginTokens.user) {
					const loginErr = loginWithResponse({
						access: loginTokens.access,
						refresh: loginTokens.refresh,
						user: loginTokens.user
					});
					if (loginErr) {
						setError(loginErr);
						return;
					}
					clearPendingSignup();
					navigate({ to: "/" });
					return;
				}
			} catch {}
			setError(signupResult.message ?? "Account could not be created. Please try again.");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
		} finally {
			verifyingRef.current = false;
			setLoading(false);
			setStatusText("");
		}
	}, [
		loginWithResponse,
		navigate,
		pendingSignup
	]);
	const handleChange = (index, value) => {
		if (loading) return;
		if (value.length > 1) {
			const cleaned = fillOtp(value);
			if (cleaned.length === 6) completeSignup(cleaned);
			return;
		}
		if (value && !/^\d$/.test(value)) return;
		const nextOtp = [...otp];
		nextOtp[index] = value;
		setOtp(nextOtp);
		setError("");
		const lastIndex = 5;
		if (value && index < lastIndex) inputRefs.current[index + 1]?.focus();
		else if (value && index === lastIndex) {
			const joined = nextOtp.join("");
			if (joined.length === 6) completeSignup(joined);
		}
	};
	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
	};
	const handleResend = (0, import_react.useCallback)(async () => {
		if (countdown > 0 || !pendingSignup || loading) return;
		setError("");
		setStatusText("");
		try {
			const res = await sendCustomerOtp({
				email: pendingSignup.customerEmail,
				phone: pendingSignup.customerMobile
			});
			if (res.status) {
				setOtp(Array.from({ length: 6 }, () => ""));
				setCountdown(RESEND_SECONDS);
				inputRefs.current[0]?.focus();
			} else setError(res.message ?? "Failed to resend OTP.");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to resend OTP. Please try again.");
		}
	}, [
		countdown,
		loading,
		pendingSignup
	]);
	const handleVerify = () => {
		if (!isOtpComplete || loading) return;
		completeSignup(otpString);
	};
	return {
		goBack,
		otp,
		countdown,
		error,
		loading,
		statusText,
		pendingSignup,
		inputRefs,
		isOtpComplete,
		handleChange,
		handleKeyDown,
		handleResend,
		handleVerify,
		otpLength: 6
	};
}
function VerifyOtpPage() {
	const form = useVerifyOtpForm();
	if (!form.pendingSignup) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPageSkeleton, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "signup-desktop-only",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyOtpDesktop, { ...form })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "signup-mobile-only",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyOtpMobile, { ...form })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .signup-desktop-only { display: none; }
        .signup-mobile-only { display: block; }
        @media (min-width: 1024px) {
          .signup-desktop-only { display: block; }
          .signup-mobile-only { display: none; }
        }
      ` })
	] });
}
//#endregion
export { VerifyOtpPage as component };
