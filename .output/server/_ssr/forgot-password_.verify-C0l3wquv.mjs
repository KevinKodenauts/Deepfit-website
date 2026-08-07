import { a as __toESM } from "../_runtime.mjs";
import { d as forgotPassword, k as verifyForgotPasswordOtp } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { mt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { a as forgotPassword_module_default, i as forgotPasswordDesktop_module_default, n as FORGOT_VERIFIED_KEY } from "./forgotPasswordFlow-bk35rqER.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password_.verify-C0l3wquv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPasswordVerifyDesktop({ goBack, email, ready, otp, countdown, error, loading, statusText, inputRefs, isOtpComplete, handleChange, handleKeyDown, handleResend, handleVerify, otpLength }) {
	if (!ready) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: forgotPasswordDesktop_module_default.page,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: forgotPasswordDesktop_module_default.topLeft,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: forgotPasswordDesktop_module_default.backBtn,
				onClick: goBack,
				"aria-label": "Go back",
				disabled: loading,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: forgotPasswordDesktop_module_default.card,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: forgotPasswordDesktop_module_default.branding,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/logo/Deepfit-D-Logo.png",
							alt: "Deepfit logo",
							width: 56,
							height: 56,
							className: forgotPasswordDesktop_module_default.logoIcon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: forgotPasswordDesktop_module_default.brandName,
							children: "DEEPFIT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: forgotPasswordDesktop_module_default.tagline,
							children: "Wellness Inside Out"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: forgotPasswordDesktop_module_default.welcomeTitle,
					children: "Verify Email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: forgotPasswordDesktop_module_default.instruction,
					children: [
						"We sent a ",
						otpLength,
						"-digit verification code to"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: forgotPasswordDesktop_module_default.email,
					children: email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: forgotPasswordDesktop_module_default.otpRow,
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
						className: `${forgotPasswordDesktop_module_default.otpInput} ${digit ? forgotPasswordDesktop_module_default.otpInputFilled : ""}`,
						"aria-label": `Digit ${index + 1}`
					}, index))
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: forgotPasswordDesktop_module_default.formError,
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: forgotPasswordDesktop_module_default.resend,
					children: countdown > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Resend OTP in ",
						countdown,
						" s"
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: forgotPasswordDesktop_module_default.resendActive,
						onClick: handleResend,
						disabled: loading,
						children: "Resend OTP"
					})
				}),
				statusText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: forgotPasswordDesktop_module_default.statusText,
					children: statusText
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `${forgotPasswordDesktop_module_default.primaryBtn} ${isOtpComplete && !loading ? forgotPasswordDesktop_module_default.primaryBtnEnabled : forgotPasswordDesktop_module_default.primaryBtnDisabled}`,
					onClick: handleVerify,
					disabled: !isOtpComplete || loading,
					children: loading ? "Verifying..." : "Verify OTP"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: forgotPasswordDesktop_module_default.footerPrompt,
					children: ["Wrong email?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/forgot-password",
						children: "Change email"
					})]
				})
			]
		})]
	});
}
function ForgotPasswordVerifyMobile({ goBack, email, ready, otp, countdown, error, loading, statusText, inputRefs, isOtpComplete, handleChange, handleKeyDown, handleResend, handleVerify, otpLength }) {
	if (!ready) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: forgotPassword_module_default.page,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: forgotPassword_module_default.header,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: forgotPassword_module_default.backBtn,
					onClick: goBack,
					"aria-label": "Go back",
					disabled: loading,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: forgotPassword_module_default.headerTitle,
					children: "Verify Email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: forgotPassword_module_default.headerSpacer })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: forgotPassword_module_default.container,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: forgotPassword_module_default.instruction,
					children: [
						"We sent a ",
						otpLength,
						"-digit verification code to"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: forgotPassword_module_default.email,
					children: email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: forgotPassword_module_default.otpRow,
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
						className: `${forgotPassword_module_default.otpInput} ${digit ? forgotPassword_module_default.otpInputFilled : ""}`,
						"aria-label": `Digit ${index + 1}`
					}, index))
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: forgotPassword_module_default.formError,
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: forgotPassword_module_default.resend,
					children: countdown > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Resend OTP in ",
						countdown,
						" s"
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: forgotPassword_module_default.resendActive,
						onClick: handleResend,
						disabled: loading,
						children: "Resend OTP"
					})
				}),
				statusText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: forgotPassword_module_default.statusText,
					children: statusText
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `${forgotPassword_module_default.primaryBtn} ${isOtpComplete && !loading ? forgotPassword_module_default.primaryBtnEnabled : forgotPassword_module_default.primaryBtnDisabled}`,
					onClick: handleVerify,
					disabled: !isOtpComplete || loading,
					children: loading ? "Verifying..." : "Verify OTP"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: forgotPassword_module_default.footerPrompt,
					children: ["Wrong email?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/forgot-password",
						children: "Change email"
					})]
				})
			]
		})]
	});
}
var OTP_LENGTH = 6;
var RESEND_SECONDS = 30;
function useForgotPasswordVerifyForm() {
	const navigate = useNavigate();
	const [otp, setOtp] = (0, import_react.useState)(() => Array.from({ length: OTP_LENGTH }, () => ""));
	const [countdown, setCountdown] = (0, import_react.useState)(RESEND_SECONDS);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [statusText, setStatusText] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [ready, setReady] = (0, import_react.useState)(false);
	const inputRefs = (0, import_react.useRef)([]);
	const verifyingRef = (0, import_react.useRef)(false);
	const goBack = () => {
		window.history.back();
	};
	(0, import_react.useEffect)(() => {
		const storedEmail = sessionStorage.getItem("deepfit_forgot_email") ?? "";
		if (!storedEmail) {
			navigate({
				to: "/forgot-password",
				replace: true
			});
			return;
		}
		setEmail(storedEmail);
		setReady(true);
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		if (!ready || countdown <= 0) return;
		const timer = setTimeout(() => setCountdown((value) => value - 1), 1e3);
		return () => clearTimeout(timer);
	}, [countdown, ready]);
	(0, import_react.useEffect)(() => {
		if (ready) inputRefs.current[0]?.focus();
	}, [ready]);
	const otpString = (0, import_react.useMemo)(() => otp.join(""), [otp]);
	const isOtpComplete = otpString.length === OTP_LENGTH;
	const fillOtp = (0, import_react.useCallback)((digits) => {
		const cleaned = digits.replace(/\D/g, "").slice(0, OTP_LENGTH);
		const next = Array.from({ length: OTP_LENGTH }, (_, index) => cleaned[index] ?? "");
		setOtp(next);
		const focusIndex = Math.min(cleaned.length, 5);
		inputRefs.current[focusIndex]?.focus();
		return cleaned;
	}, []);
	const completeVerification = (0, import_react.useCallback)(async (code) => {
		if (!email || verifyingRef.current) return;
		verifyingRef.current = true;
		setError("");
		setLoading(true);
		setStatusText("Verifying OTP...");
		try {
			const verifyResult = await verifyForgotPasswordOtp(email, code);
			if (!verifyResult.status) {
				setError(verifyResult.message ?? "Invalid OTP. Please try again.");
				return;
			}
			sessionStorage.setItem(FORGOT_VERIFIED_KEY, "true");
			navigate({ to: "/forgot-password/reset" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
		} finally {
			verifyingRef.current = false;
			setLoading(false);
			setStatusText("");
		}
	}, [email, navigate]);
	const handleChange = (index, value) => {
		if (loading) return;
		if (value.length > 1) {
			const cleaned = fillOtp(value);
			if (cleaned.length === OTP_LENGTH) completeVerification(cleaned);
			return;
		}
		if (value && !/^\d$/.test(value)) return;
		const nextOtp = [...otp];
		nextOtp[index] = value;
		setOtp(nextOtp);
		setError("");
		if (value && index < 5) inputRefs.current[index + 1]?.focus();
		else if (value && index === 5) {
			const joined = nextOtp.join("");
			if (joined.length === OTP_LENGTH) completeVerification(joined);
		}
	};
	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
	};
	const handleResend = (0, import_react.useCallback)(async () => {
		if (countdown > 0 || !email || loading) return;
		setError("");
		setStatusText("");
		try {
			const res = await forgotPassword(email);
			if (res.status) {
				setOtp(Array.from({ length: OTP_LENGTH }, () => ""));
				setCountdown(RESEND_SECONDS);
				inputRefs.current[0]?.focus();
			} else setError(res.message ?? "Failed to resend OTP.");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to resend OTP. Please try again.");
		}
	}, [
		countdown,
		email,
		loading
	]);
	const handleVerify = () => {
		if (!isOtpComplete || loading) return;
		completeVerification(otpString);
	};
	return {
		goBack,
		email,
		ready,
		otp,
		countdown,
		error,
		loading,
		statusText,
		inputRefs,
		isOtpComplete,
		handleChange,
		handleKeyDown,
		handleResend,
		handleVerify,
		otpLength: OTP_LENGTH
	};
}
function ForgotPasswordVerifyPage() {
	const form = useForgotPasswordVerifyForm();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "forgot-desktop-only",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotPasswordVerifyDesktop, { ...form })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "forgot-mobile-only",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotPasswordVerifyMobile, { ...form })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .forgot-desktop-only { display: none; }
        .forgot-mobile-only { display: block; }
        @media (min-width: 1024px) {
          .forgot-desktop-only { display: block; }
          .forgot-mobile-only { display: none; }
        }
      ` })
	] });
}
//#endregion
export { ForgotPasswordVerifyPage as component };
