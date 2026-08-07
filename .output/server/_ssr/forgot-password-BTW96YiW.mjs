import { a as __toESM } from "../_runtime.mjs";
import { d as forgotPassword } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { mt as ChevronLeft, z as Mail } from "../_libs/lucide-react.mjs";
import { a as forgotPassword_module_default, i as forgotPasswordDesktop_module_default, n as FORGOT_VERIFIED_KEY, o as isValidForgotPasswordEmail, t as FORGOT_EMAIL_KEY } from "./forgotPasswordFlow-bk35rqER.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-BTW96YiW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPasswordDesktop({ goBack, email, setEmail, error, loading, isFormValid, handleSubmit }) {
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
					children: "Reset your password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: forgotPasswordDesktop_module_default.welcomeSubtitle,
					children: "Enter the email linked to your account. We will send you a verification code."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: forgotPasswordDesktop_module_default.authForm,
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: forgotPasswordDesktop_module_default.fieldGroup,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: forgotPasswordDesktop_module_default.fieldLabel,
								htmlFor: "forgot-email-desktop",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: forgotPasswordDesktop_module_default.inputWrapper,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									className: forgotPasswordDesktop_module_default.inputIconLeft,
									size: 20
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "forgot-email-desktop",
									type: "email",
									placeholder: "Email",
									className: forgotPasswordDesktop_module_default.inputField,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									autoComplete: "email",
									required: true
								})]
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: forgotPasswordDesktop_module_default.formError,
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: `${forgotPasswordDesktop_module_default.primaryBtn} ${isFormValid && !loading ? forgotPasswordDesktop_module_default.primaryBtnEnabled : forgotPasswordDesktop_module_default.primaryBtnDisabled}`,
							disabled: !isFormValid || loading,
							children: loading ? "Sending..." : "Send OTP"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: forgotPasswordDesktop_module_default.footerPrompt,
					children: ["Remember your password?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Log In"
					})]
				})
			]
		})]
	});
}
function ForgotPasswordMobile({ goBack, email, setEmail, error, loading, isFormValid, handleSubmit }) {
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
					children: "Forgot Password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: forgotPassword_module_default.headerSpacer })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: forgotPassword_module_default.container,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: forgotPassword_module_default.branding,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/logo/Deepfit-D-Logo.png",
							alt: "Deepfit logo",
							width: 80,
							height: 80,
							className: forgotPassword_module_default.logoIcon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: forgotPassword_module_default.brandName,
							children: "DEEPFIT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: forgotPassword_module_default.tagline,
							children: "Wellness Inside Out"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: forgotPassword_module_default.welcomeTitle,
					children: "Reset your password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: forgotPassword_module_default.welcomeSubtitle,
					children: "Enter the email linked to your account. We will send you a verification code."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: forgotPassword_module_default.authForm,
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: forgotPassword_module_default.fieldGroup,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: forgotPassword_module_default.fieldLabel,
								htmlFor: "forgot-email-mobile",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: forgotPassword_module_default.inputWrapper,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									className: forgotPassword_module_default.inputIconLeft,
									size: 20
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "forgot-email-mobile",
									type: "email",
									placeholder: "Email",
									className: forgotPassword_module_default.inputField,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									autoComplete: "email",
									required: true
								})]
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: forgotPassword_module_default.formError,
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: `${forgotPassword_module_default.primaryBtn} ${isFormValid && !loading ? forgotPassword_module_default.primaryBtnEnabled : forgotPassword_module_default.primaryBtnDisabled}`,
							disabled: !isFormValid || loading,
							children: loading ? "Sending..." : "Send OTP"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: forgotPassword_module_default.footerPrompt,
					children: ["Remember your password?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Log In"
					})]
				})
			]
		})]
	});
}
function useForgotPasswordForm() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const isFormValid = (0, import_react.useMemo)(() => isValidForgotPasswordEmail(email), [email]);
	const goBack = () => {
		window.history.back();
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		const trimmedEmail = email.trim().toLowerCase();
		if (!trimmedEmail) {
			setError("Please enter your email.");
			return;
		}
		if (!isValidForgotPasswordEmail(trimmedEmail)) {
			setError("Please enter a valid email.");
			return;
		}
		setLoading(true);
		try {
			const res = await forgotPassword(trimmedEmail);
			if (res.status) {
				sessionStorage.removeItem(FORGOT_VERIFIED_KEY);
				sessionStorage.setItem(FORGOT_EMAIL_KEY, trimmedEmail);
				navigate({ to: "/forgot-password/verify" });
			} else setError(res.message ?? "Failed to send OTP. Please try again.");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return {
		goBack,
		email,
		setEmail,
		error,
		loading,
		isFormValid,
		handleSubmit
	};
}
function ForgotPasswordPage() {
	const form = useForgotPasswordForm();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "forgot-desktop-only",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotPasswordDesktop, { ...form })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "forgot-mobile-only",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotPasswordMobile, { ...form })
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
export { ForgotPasswordPage as component };
