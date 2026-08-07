import { a as __toESM } from "../_runtime.mjs";
import { D as updateCustomerPassword } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { U as LockKeyhole, V as Lock, it as EyeOff, mt as ChevronLeft, rt as Eye } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { t as useRequireAuth } from "./useRequireAuth-flXyrm-M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.change-password-BOxZSp-O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var changePasswordDesktop_module_default = {
	page: "_page_jzewi_1",
	header: "_header_jzewi_6",
	backBtn: "_backBtn_jzewi_15",
	title: "_title_jzewi_28",
	content: "_content_jzewi_34",
	field: "_field_jzewi_40",
	inputWrap: "_inputWrap_jzewi_44",
	inputIcon: "_inputIcon_jzewi_50",
	input: "_input_jzewi_44",
	toggleBtn: "_toggleBtn_jzewi_71",
	error: "_error_jzewi_84",
	submitBtn: "_submitBtn_jzewi_90"
};
function ChangePasswordDesktop({ form }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: changePasswordDesktop_module_default.page,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: changePasswordDesktop_module_default.header,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: changePasswordDesktop_module_default.backBtn,
				onClick: () => window.history.back(),
				"aria-label": "Go back",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 22 })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: changePasswordDesktop_module_default.title,
				children: "Change Password"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: changePasswordDesktop_module_default.content,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: changePasswordDesktop_module_default.field,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: changePasswordDesktop_module_default.inputWrap,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
								size: 18,
								className: changePasswordDesktop_module_default.inputIcon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: form.showCurrent ? "text" : "password",
								className: changePasswordDesktop_module_default.input,
								placeholder: "Current Password",
								value: form.currentPassword,
								onChange: (event) => form.setCurrentPassword(event.target.value),
								autoComplete: "current-password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: changePasswordDesktop_module_default.toggleBtn,
								onClick: () => form.setShowCurrent((value) => !value),
								"aria-label": form.showCurrent ? "Hide password" : "Show password",
								children: form.showCurrent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 18 })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: changePasswordDesktop_module_default.field,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: changePasswordDesktop_module_default.inputWrap,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {
								size: 18,
								className: changePasswordDesktop_module_default.inputIcon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: form.showNew ? "text" : "password",
								className: changePasswordDesktop_module_default.input,
								placeholder: "New Password",
								value: form.newPassword,
								onChange: (event) => form.setNewPassword(event.target.value),
								autoComplete: "new-password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: changePasswordDesktop_module_default.toggleBtn,
								onClick: () => form.setShowNew((value) => !value),
								"aria-label": form.showNew ? "Hide password" : "Show password",
								children: form.showNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 18 })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: changePasswordDesktop_module_default.field,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: changePasswordDesktop_module_default.inputWrap,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {
								size: 18,
								className: changePasswordDesktop_module_default.inputIcon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: form.showConfirm ? "text" : "password",
								className: changePasswordDesktop_module_default.input,
								placeholder: "Confirm New Password",
								value: form.confirmPassword,
								onChange: (event) => form.setConfirmPassword(event.target.value),
								autoComplete: "new-password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: changePasswordDesktop_module_default.toggleBtn,
								onClick: () => form.setShowConfirm((value) => !value),
								"aria-label": form.showConfirm ? "Hide password" : "Show password",
								children: form.showConfirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 18 })
							})
						]
					})
				}),
				form.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: changePasswordDesktop_module_default.error,
					children: form.error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: changePasswordDesktop_module_default.submitBtn,
					onClick: () => void form.handleSubmit(),
					disabled: form.loading,
					children: form.loading ? "Updating..." : "Update Password"
				})
			]
		})]
	});
}
var changePasswordSheet_module_default = {
	backdrop: "_backdrop_232zo_1",
	sheet: "_sheet_232zo_11",
	handle: "_handle_232zo_21",
	header: "_header_232zo_30",
	title: "_title_232zo_38",
	closeBtn: "_closeBtn_232zo_45",
	divider: "_divider_232zo_58",
	content: "_content_232zo_63",
	field: "_field_232zo_67",
	inputWrap: "_inputWrap_232zo_71",
	inputIcon: "_inputIcon_232zo_85",
	input: "_input_232zo_71",
	toggleBtn: "_toggleBtn_232zo_106",
	error: "_error_232zo_118",
	submitBtn: "_submitBtn_232zo_124"
};
var changePassword_module_default = {
	page: "_page_12kd2_1",
	header: "_header_12kd2_9",
	backBtn: "_backBtn_12kd2_21",
	pageTitle: "_pageTitle_12kd2_32",
	headerSpacer: "_headerSpacer_12kd2_40"
};
function ChangePasswordMobile({ form }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: changePassword_module_default.page,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: changePassword_module_default.header,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: changePassword_module_default.backBtn,
					onClick: () => window.history.back(),
					"aria-label": "Go back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 22 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: changePassword_module_default.pageTitle,
					children: "Change Password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: changePassword_module_default.headerSpacer })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: changePasswordSheet_module_default.content,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: changePasswordSheet_module_default.field,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: changePasswordSheet_module_default.inputWrap,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
								size: 18,
								className: changePasswordSheet_module_default.inputIcon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: form.showCurrent ? "text" : "password",
								className: changePasswordSheet_module_default.input,
								placeholder: "Current Password",
								value: form.currentPassword,
								onChange: (event) => form.setCurrentPassword(event.target.value),
								autoComplete: "current-password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: changePasswordSheet_module_default.toggleBtn,
								onClick: () => form.setShowCurrent((value) => !value),
								"aria-label": form.showCurrent ? "Hide password" : "Show password",
								children: form.showCurrent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 18 })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: changePasswordSheet_module_default.field,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: changePasswordSheet_module_default.inputWrap,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {
								size: 18,
								className: changePasswordSheet_module_default.inputIcon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: form.showNew ? "text" : "password",
								className: changePasswordSheet_module_default.input,
								placeholder: "New Password",
								value: form.newPassword,
								onChange: (event) => form.setNewPassword(event.target.value),
								autoComplete: "new-password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: changePasswordSheet_module_default.toggleBtn,
								onClick: () => form.setShowNew((value) => !value),
								"aria-label": form.showNew ? "Hide password" : "Show password",
								children: form.showNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 18 })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: changePasswordSheet_module_default.field,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: changePasswordSheet_module_default.inputWrap,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {
								size: 18,
								className: changePasswordSheet_module_default.inputIcon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: form.showConfirm ? "text" : "password",
								className: changePasswordSheet_module_default.input,
								placeholder: "Confirm New Password",
								value: form.confirmPassword,
								onChange: (event) => form.setConfirmPassword(event.target.value),
								autoComplete: "new-password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: changePasswordSheet_module_default.toggleBtn,
								onClick: () => form.setShowConfirm((value) => !value),
								"aria-label": form.showConfirm ? "Hide password" : "Show password",
								children: form.showConfirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 18 })
							})
						]
					})
				}),
				form.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: changePasswordSheet_module_default.error,
					children: form.error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: changePasswordSheet_module_default.submitBtn,
					onClick: () => void form.handleSubmit(),
					disabled: form.loading,
					children: form.loading ? "Updating..." : "Update Password"
				})
			]
		})]
	});
}
function useChangePasswordForm(options) {
	const [currentPassword, setCurrentPassword] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [showCurrent, setShowCurrent] = (0, import_react.useState)(false);
	const [showNew, setShowNew] = (0, import_react.useState)(false);
	const [showConfirm, setShowConfirm] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const handleSubmit = async () => {
		setError("");
		if (!currentPassword.trim()) {
			setError("Please enter your current password");
			return;
		}
		if (newPassword.length < 6) {
			setError("New password must be at least 6 characters");
			return;
		}
		if (newPassword !== confirmPassword) {
			setError("New passwords do not match");
			return;
		}
		if (currentPassword === newPassword) {
			setError("New password must be different from current password");
			return;
		}
		setLoading(true);
		try {
			const result = await updateCustomerPassword(newPassword, currentPassword);
			if (!result.status) {
				setError(result.message ?? "Failed to update password. Please try again.");
				return;
			}
			if (options?.onSuccess) options.onSuccess();
			else window.history.back();
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return {
		currentPassword,
		setCurrentPassword,
		newPassword,
		setNewPassword,
		confirmPassword,
		setConfirmPassword,
		showCurrent,
		setShowCurrent,
		showNew,
		setShowNew,
		showConfirm,
		setShowConfirm,
		loading,
		error,
		handleSubmit
	};
}
function ChangePasswordPage() {
	useRequireAuth();
	const form = useChangePasswordForm();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-sub-desktop-only",
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangePasswordDesktop, { form })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-sub-mobile-only",
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangePasswordMobile, { form })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-sub-desktop-only",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .profile-sub-desktop-only { display: none; }
        .profile-sub-mobile-only { display: block; }
        @media (min-width: 1024px) {
          .profile-sub-desktop-only { display: block; }
          .profile-sub-mobile-only { display: none; }
        }
      ` })
		]
	});
}
var SplitComponent = ChangePasswordPage;
//#endregion
export { SplitComponent as component };
