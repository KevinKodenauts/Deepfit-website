import { a as __toESM } from "../_runtime.mjs";
import { S as resetForgottenPassword } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useAuth } from "./AuthContext-B71YYWma.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as Lock, it as EyeOff, mt as ChevronLeft, rt as Eye } from "../_libs/lucide-react.mjs";
import { a as forgotPassword_module_default, i as forgotPasswordDesktop_module_default, n as FORGOT_VERIFIED_KEY, r as clearForgotPasswordSession } from "./forgotPasswordFlow-bk35rqER.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password_.reset-BTp--pHa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordDesktop({ goBack, email, ready, newPassword, setNewPassword, confirmPassword, setConfirmPassword, showNew, setShowNew, showConfirm, setShowConfirm, error, loading, isFormValid, handleSubmit }) {
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
					children: "Create a new password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: forgotPasswordDesktop_module_default.welcomeSubtitle,
					children: ["Set a new password for ", email]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: forgotPasswordDesktop_module_default.authForm,
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: forgotPasswordDesktop_module_default.fieldGroup,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: forgotPasswordDesktop_module_default.fieldLabel,
								htmlFor: "reset-password-desktop",
								children: "New Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: forgotPasswordDesktop_module_default.inputWrapper,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
										className: forgotPasswordDesktop_module_default.inputIconLeft,
										size: 20
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "reset-password-desktop",
										type: showNew ? "text" : "password",
										placeholder: "Enter new password",
										className: forgotPasswordDesktop_module_default.inputField,
										value: newPassword,
										onChange: (e) => setNewPassword(e.target.value),
										autoComplete: "new-password",
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: forgotPasswordDesktop_module_default.inputIconAction,
										onClick: () => setShowNew(!showNew),
										tabIndex: -1,
										"aria-label": showNew ? "Hide password" : "Show password",
										children: showNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 20 })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: forgotPasswordDesktop_module_default.fieldGroup,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: forgotPasswordDesktop_module_default.fieldLabel,
								htmlFor: "reset-confirm-password-desktop",
								children: "Confirm Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: forgotPasswordDesktop_module_default.inputWrapper,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
										className: forgotPasswordDesktop_module_default.inputIconLeft,
										size: 20
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "reset-confirm-password-desktop",
										type: showConfirm ? "text" : "password",
										placeholder: "Re-enter new password",
										className: forgotPasswordDesktop_module_default.inputField,
										value: confirmPassword,
										onChange: (e) => setConfirmPassword(e.target.value),
										autoComplete: "new-password",
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: forgotPasswordDesktop_module_default.inputIconAction,
										onClick: () => setShowConfirm(!showConfirm),
										tabIndex: -1,
										"aria-label": showConfirm ? "Hide password" : "Show password",
										children: showConfirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 20 })
									})
								]
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
							children: loading ? "Updating..." : "Update Password"
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
function ResetPasswordMobile({ goBack, email, ready, newPassword, setNewPassword, confirmPassword, setConfirmPassword, showNew, setShowNew, showConfirm, setShowConfirm, error, loading, isFormValid, handleSubmit }) {
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
					children: "New Password"
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
					children: "Create a new password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: forgotPassword_module_default.welcomeSubtitle,
					children: ["Set a new password for ", email]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: forgotPassword_module_default.authForm,
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: forgotPassword_module_default.fieldGroup,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: forgotPassword_module_default.fieldLabel,
								htmlFor: "reset-password-mobile",
								children: "New Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: forgotPassword_module_default.inputWrapper,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
										className: forgotPassword_module_default.inputIconLeft,
										size: 20
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "reset-password-mobile",
										type: showNew ? "text" : "password",
										placeholder: "Enter new password",
										className: forgotPassword_module_default.inputField,
										value: newPassword,
										onChange: (e) => setNewPassword(e.target.value),
										autoComplete: "new-password",
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: forgotPassword_module_default.inputIconAction,
										onClick: () => setShowNew(!showNew),
										tabIndex: -1,
										"aria-label": showNew ? "Hide password" : "Show password",
										children: showNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 20 })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: forgotPassword_module_default.fieldGroup,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: forgotPassword_module_default.fieldLabel,
								htmlFor: "reset-confirm-password-mobile",
								children: "Confirm Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: forgotPassword_module_default.inputWrapper,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
										className: forgotPassword_module_default.inputIconLeft,
										size: 20
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "reset-confirm-password-mobile",
										type: showConfirm ? "text" : "password",
										placeholder: "Re-enter new password",
										className: forgotPassword_module_default.inputField,
										value: confirmPassword,
										onChange: (e) => setConfirmPassword(e.target.value),
										autoComplete: "new-password",
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: forgotPassword_module_default.inputIconAction,
										onClick: () => setShowConfirm(!showConfirm),
										tabIndex: -1,
										"aria-label": showConfirm ? "Hide password" : "Show password",
										children: showConfirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 20 })
									})
								]
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
							children: loading ? "Updating..." : "Update Password"
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
function useResetPasswordForm() {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const [email, setEmail] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [showNew, setShowNew] = (0, import_react.useState)(false);
	const [showConfirm, setShowConfirm] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const goBack = () => {
		window.history.back();
	};
	(0, import_react.useEffect)(() => {
		const verified = sessionStorage.getItem(FORGOT_VERIFIED_KEY);
		const storedEmail = sessionStorage.getItem("deepfit_forgot_email") ?? "";
		if (!verified || !storedEmail) {
			navigate({
				to: "/forgot-password",
				replace: true
			});
			return;
		}
		setEmail(storedEmail);
		setReady(true);
	}, [navigate]);
	const isFormValid = (0, import_react.useMemo)(() => {
		return newPassword.length >= 6 && confirmPassword.length >= 6 && newPassword === confirmPassword;
	}, [confirmPassword, newPassword]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (newPassword.length < 6) {
			setError("Password must be at least 6 characters.");
			return;
		}
		if (newPassword !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		setLoading(true);
		try {
			const res = await resetForgottenPassword(email, newPassword);
			if (res.status) {
				logout();
				clearForgotPasswordSession();
				sessionStorage.setItem("deepfit_login_email", email);
				navigate({
					to: "/login",
					search: { reset: "success" }
				});
			} else setError(res.message ?? "Failed to update password.");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return {
		goBack,
		email,
		ready,
		newPassword,
		setNewPassword,
		confirmPassword,
		setConfirmPassword,
		showNew,
		setShowNew,
		showConfirm,
		setShowConfirm,
		error,
		loading,
		isFormValid,
		handleSubmit
	};
}
function ResetPasswordPage() {
	const form = useResetPasswordForm();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "forgot-desktop-only",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetPasswordDesktop, { ...form })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "forgot-mobile-only",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetPasswordMobile, { ...form })
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
export { ResetPasswordPage as component };
