import { a as __toESM } from "../_runtime.mjs";
import { O as updateCustomerProfile } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useAuth } from "./AuthContext-B71YYWma.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as Lock, mt as ChevronLeft, o as User, z as Mail } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { a as parseStoredPhone, n as formatPhoneForApi, o as validatePhoneNumber } from "./utils-B_8IvW9T.mjs";
import { t as useRequireAuth } from "./useRequireAuth-flXyrm-M.mjs";
import { t as CountryPhoneField } from "./CountryPhoneField-B46LXByD.mjs";
import { t as getProfileInitials } from "./useProfilePage-D1DzBpE9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.edit-CkkjZUUI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var updateProfileDesktop_module_default = {
	shell: "_shell_ocngf_1",
	inner: "_inner_ocngf_13",
	pageHeader: "_pageHeader_ocngf_20",
	backBtn: "_backBtn_ocngf_24",
	pageTitle: "_pageTitle_ocngf_43",
	pageSubtitle: "_pageSubtitle_ocngf_50",
	card: "_card_ocngf_58",
	summary: "_summary_ocngf_66",
	avatar: "_avatar_ocngf_74",
	summaryText: "_summaryText_ocngf_90",
	summaryName: "_summaryName_ocngf_94",
	summaryEmail: "_summaryEmail_ocngf_102",
	summaryHint: "_summaryHint_ocngf_112",
	divider: "_divider_ocngf_119",
	form: "_form_ocngf_124",
	field: "_field_ocngf_128",
	phoneGrid: "_phoneGrid_ocngf_132",
	label: "_label_ocngf_139",
	inputWrap: "_inputWrap_ocngf_147",
	inputIcon: "_inputIcon_ocngf_163",
	input: "_input_ocngf_147",
	inputDisabled: "_inputDisabled_ocngf_184",
	lockIcon: "_lockIcon_ocngf_197",
	fieldHint: "_fieldHint_ocngf_203",
	formError: "_formError_ocngf_210",
	actions: "_actions_ocngf_219",
	cancelBtn: "_cancelBtn_ocngf_229",
	submitBtn: "_submitBtn_ocngf_253"
};
function UpdateProfileDesktop({ form }) {
	if (!form.user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: updateProfileDesktop_module_default.shell });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: updateProfileDesktop_module_default.shell,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: updateProfileDesktop_module_default.inner,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: updateProfileDesktop_module_default.pageHeader,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: updateProfileDesktop_module_default.backBtn,
						onClick: () => window.history.back(),
						"aria-label": "Go back",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to profile" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: updateProfileDesktop_module_default.pageTitle,
						children: "Update Profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: updateProfileDesktop_module_default.pageSubtitle,
						children: "Keep your personal details and contact information up to date."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: updateProfileDesktop_module_default.card,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: updateProfileDesktop_module_default.summary,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: updateProfileDesktop_module_default.avatar,
							children: form.initials
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: updateProfileDesktop_module_default.summaryText,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: updateProfileDesktop_module_default.summaryName,
									children: form.name || "Your profile"
								}),
								form.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: updateProfileDesktop_module_default.summaryEmail,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 15 }), form.email]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: updateProfileDesktop_module_default.summaryHint,
									children: "Your email is linked to your account and cannot be changed here."
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: updateProfileDesktop_module_default.divider }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: updateProfileDesktop_module_default.form,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: updateProfileDesktop_module_default.field,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: updateProfileDesktop_module_default.label,
									htmlFor: "profile-name-desktop",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: updateProfileDesktop_module_default.inputWrap,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
										size: 18,
										className: updateProfileDesktop_module_default.inputIcon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "profile-name-desktop",
										type: "text",
										className: updateProfileDesktop_module_default.input,
										value: form.name,
										onChange: (event) => form.setName(event.target.value),
										placeholder: "Enter your full name"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: updateProfileDesktop_module_default.phoneGrid,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryPhoneField, {
									label: "Phone Number",
									value: form.phone,
									country: form.phoneCountry,
									onValueChange: form.setPhone,
									onCountryChange: form.setPhoneCountry,
									error: form.phoneError
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryPhoneField, {
									label: "Alternative Phone Number",
									value: form.altPhone,
									country: form.altPhoneCountry,
									onValueChange: form.setAltPhone,
									onCountryChange: form.setAltPhoneCountry,
									optional: true,
									error: form.altPhoneError
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: updateProfileDesktop_module_default.field,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: updateProfileDesktop_module_default.label,
										htmlFor: "profile-email-desktop",
										children: "Email Address"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `${updateProfileDesktop_module_default.inputWrap} ${updateProfileDesktop_module_default.inputDisabled}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
												size: 18,
												className: updateProfileDesktop_module_default.inputIcon
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "profile-email-desktop",
												type: "email",
												className: updateProfileDesktop_module_default.input,
												value: form.email,
												disabled: true,
												readOnly: true
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
												size: 16,
												className: updateProfileDesktop_module_default.lockIcon
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: updateProfileDesktop_module_default.fieldHint,
										children: "Contact support if you need to change your email address."
									})
								]
							}),
							form.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: updateProfileDesktop_module_default.formError,
								children: form.error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: updateProfileDesktop_module_default.actions,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: updateProfileDesktop_module_default.cancelBtn,
									onClick: () => window.history.back(),
									disabled: form.loading,
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: updateProfileDesktop_module_default.submitBtn,
									onClick: () => void form.handleSubmit(),
									disabled: form.loading,
									children: form.loading ? "Saving..." : "Save Changes"
								})]
							})
						]
					})
				]
			})]
		})
	});
}
var updateProfile_module_default = {
	page: "_page_dzjvb_1",
	header: "_header_dzjvb_10",
	backBtn: "_backBtn_dzjvb_21",
	title: "_title_dzjvb_32",
	headerSpacer: "_headerSpacer_dzjvb_40",
	content: "_content_dzjvb_44",
	avatar: "_avatar_dzjvb_49",
	field: "_field_dzjvb_63",
	label: "_label_dzjvb_67",
	inputWrap: "_inputWrap_dzjvb_75",
	inputDisabled: "_inputDisabled_dzjvb_84",
	inputIcon: "_inputIcon_dzjvb_88",
	lockIcon: "_lockIcon_dzjvb_95",
	input: "_input_dzjvb_75",
	formError: "_formError_dzjvb_115",
	submitBtn: "_submitBtn_dzjvb_121"
};
function UpdateProfileMobile({ form }) {
	if (!form.user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: updateProfile_module_default.page });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: updateProfile_module_default.page,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: updateProfile_module_default.header,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: updateProfile_module_default.backBtn,
					onClick: () => window.history.back(),
					"aria-label": "Go back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: updateProfile_module_default.title,
					children: "Update Profile"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: updateProfile_module_default.headerSpacer })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: updateProfile_module_default.content,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: updateProfile_module_default.avatar,
					children: form.initials
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: updateProfile_module_default.field,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: updateProfile_module_default.label,
						htmlFor: "profile-name-mobile",
						children: "Full Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: updateProfile_module_default.inputWrap,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
							size: 18,
							className: updateProfile_module_default.inputIcon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "profile-name-mobile",
							type: "text",
							className: updateProfile_module_default.input,
							value: form.name,
							onChange: (event) => form.setName(event.target.value),
							placeholder: "Enter your name"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryPhoneField, {
					label: "Phone Number",
					value: form.phone,
					country: form.phoneCountry,
					onValueChange: form.setPhone,
					onCountryChange: form.setPhoneCountry,
					error: form.phoneError
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: updateProfile_module_default.field,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: updateProfile_module_default.label,
						htmlFor: "profile-email-mobile",
						children: "Email Address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${updateProfile_module_default.inputWrap} ${updateProfile_module_default.inputDisabled}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
								size: 18,
								className: updateProfile_module_default.inputIcon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "profile-email-mobile",
								type: "email",
								className: updateProfile_module_default.input,
								value: form.email,
								disabled: true,
								readOnly: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
								size: 16,
								className: updateProfile_module_default.lockIcon
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryPhoneField, {
					label: "Alternative Phone Number",
					value: form.altPhone,
					country: form.altPhoneCountry,
					onValueChange: form.setAltPhone,
					onCountryChange: form.setAltPhoneCountry,
					optional: true,
					error: form.altPhoneError
				}),
				form.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: updateProfile_module_default.formError,
					children: form.error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: updateProfile_module_default.submitBtn,
					onClick: () => void form.handleSubmit(),
					disabled: form.loading,
					children: form.loading ? "Updating..." : "Update Profile"
				})
			]
		})]
	});
}
function useUpdateProfileForm(options) {
	const navigate = useNavigate();
	const { user, refreshProfile } = useAuth();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [altPhone, setAltPhone] = (0, import_react.useState)("");
	const [phoneCountry, setPhoneCountry] = (0, import_react.useState)(() => parseStoredPhone("").country);
	const [altPhoneCountry, setAltPhoneCountry] = (0, import_react.useState)(() => parseStoredPhone("").country);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [phoneError, setPhoneError] = (0, import_react.useState)("");
	const [altPhoneError, setAltPhoneError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!user) return;
		const displayName = user.customerName || user.name || "";
		const displayEmail = user.customerEmail || user.email || "";
		const primaryPhone = user.customerMobile || user.phone || "";
		const alternatePhone = user.customerAlterMobile || "";
		const primaryParsed = parseStoredPhone(primaryPhone);
		const altParsed = parseStoredPhone(alternatePhone);
		setName(displayName);
		setEmail(displayEmail);
		setPhone(primaryParsed.localNumber);
		setAltPhone(altParsed.localNumber);
		setPhoneCountry(primaryParsed.country);
		setAltPhoneCountry(altParsed.country);
		setError("");
		setPhoneError("");
		setAltPhoneError("");
	}, [user]);
	const initials = getProfileInitials(name || email || "User");
	const handleSubmit = async () => {
		if (!user?.id) return;
		setError("");
		setPhoneError("");
		setAltPhoneError("");
		const trimmedName = name.trim();
		if (!trimmedName) {
			setError("Please enter your name");
			return;
		}
		const primaryValidation = validatePhoneNumber(phone, phoneCountry);
		if (primaryValidation) {
			setPhoneError(primaryValidation);
			return;
		}
		const altValidation = validatePhoneNumber(altPhone, altPhoneCountry, { required: false });
		if (altValidation) {
			setAltPhoneError(altValidation);
			return;
		}
		setLoading(true);
		try {
			const result = await updateCustomerProfile({
				customerId: user.id,
				customerName: trimmedName,
				customerMobile: formatPhoneForApi(phone, phoneCountry),
				customerAlterMobile: formatPhoneForApi(altPhone, altPhoneCountry),
				updatedBy: trimmedName
			});
			if (!result.status) {
				setError(result.message ?? "Failed to update profile. Please try again.");
				return;
			}
			await refreshProfile();
			if (options?.onSuccess) options.onSuccess();
			else window.history.back();
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return {
		navigate,
		user,
		name,
		setName,
		email,
		phone,
		setPhone,
		altPhone,
		setAltPhone,
		phoneCountry,
		setPhoneCountry,
		altPhoneCountry,
		setAltPhoneCountry,
		loading,
		error,
		phoneError,
		altPhoneError,
		initials,
		handleSubmit
	};
}
function UpdateProfilePage() {
	useRequireAuth();
	const form = useUpdateProfileForm();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-sub-desktop-only",
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpdateProfileDesktop, { form })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-sub-mobile-only",
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpdateProfileMobile, { form })
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
var SplitComponent = UpdateProfilePage;
//#endregion
export { SplitComponent as component };
