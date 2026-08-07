import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useAuth } from "./AuthContext-B71YYWma.mjs";
import { r as AuthPageSkeleton, y as cn } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Tt as ArrowLeft, V as Lock, Y as Info, it as EyeOff, mt as ChevronLeft, o as User, rt as Eye, z as Mail } from "../_libs/lucide-react.mjs";
import { n as formatPhoneForApi, r as getCountryByIso } from "./utils-B_8IvW9T.mjs";
import { a as useGoogleSignIn, i as getPasswordStrength, n as TermsAcceptanceField, r as getPasswordChecks, s as validateSignupForm, t as PASSWORD_REQUIREMENTS } from "./validation-Y2NiwijS.mjs";
import { t as CountryPhoneField } from "./CountryPhoneField-B46LXByD.mjs";
import { a as signupDesktop_module_default, i as sendCustomerOtp, o as signup_module_default, r as savePendingSignup } from "./signupFlow-EFUyfMVD.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-D9Vs038v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var passwordCheckBar_module_default = {
	wrap: "_wrap_6e6h6_1",
	barMeta: "_barMeta_6e6h6_8",
	track: "_track_6e6h6_14",
	fill: "_fill_6e6h6_22",
	fillWeak: "_fillWeak_6e6h6_28",
	fillFair: "_fillFair_6e6h6_32",
	fillGood: "_fillGood_6e6h6_36",
	fillStrong: "_fillStrong_6e6h6_40",
	label: "_label_6e6h6_44",
	labelWeak: "_labelWeak_6e6h6_52",
	labelFair: "_labelFair_6e6h6_56",
	labelGood: "_labelGood_6e6h6_60",
	labelStrong: "_labelStrong_6e6h6_64",
	checks: "_checks_6e6h6_68",
	checkMet: "_checkMet_6e6h6_77",
	checkUnmet: "_checkUnmet_6e6h6_78",
	error: "_error_6e6h6_110"
};
function levelClasses(score) {
	if (score <= 1) return {
		fill: passwordCheckBar_module_default.fillWeak,
		label: passwordCheckBar_module_default.labelWeak
	};
	if (score === 2) return {
		fill: passwordCheckBar_module_default.fillFair,
		label: passwordCheckBar_module_default.labelFair
	};
	if (score === 3) return {
		fill: passwordCheckBar_module_default.fillGood,
		label: passwordCheckBar_module_default.labelGood
	};
	return {
		fill: passwordCheckBar_module_default.fillStrong,
		label: passwordCheckBar_module_default.labelStrong
	};
}
function PasswordCheckBar({ password, fieldError }) {
	if (!password) {
		if (!fieldError) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: passwordCheckBar_module_default.error,
			children: fieldError
		});
	}
	const strength = getPasswordStrength(password);
	const checks = getPasswordChecks(password);
	const level = levelClasses(strength.score);
	const liveError = strength.error ?? fieldError;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: passwordCheckBar_module_default.wrap,
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: passwordCheckBar_module_default.barMeta,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: passwordCheckBar_module_default.track,
					role: "progressbar",
					"aria-valuenow": strength.score,
					"aria-valuemin": 0,
					"aria-valuemax": strength.total,
					"aria-label": "Password strength",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `${passwordCheckBar_module_default.fill} ${level.fill}`,
						style: { width: `${strength.percent}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `${passwordCheckBar_module_default.label} ${level.label}`,
					children: strength.label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: passwordCheckBar_module_default.checks,
				children: checks.map((check) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: check.met ? passwordCheckBar_module_default.checkMet : passwordCheckBar_module_default.checkUnmet,
					children: check.label
				}, check.label))
			}),
			liveError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: passwordCheckBar_module_default.error,
				children: liveError
			}) : null
		]
	});
}
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
var passwordGuidance_module_default = {
	labelRow: "_labelRow_eyfbr_1",
	label: "_label_eyfbr_1",
	infoBtn: "_infoBtn_eyfbr_13",
	popover: "_popover_eyfbr_39",
	popoverTitle: "_popoverTitle_eyfbr_48",
	list: "_list_eyfbr_55"
};
function PasswordGuidance({ htmlFor, label = "Password" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: passwordGuidance_module_default.labelRow,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: passwordGuidance_module_default.label,
			htmlFor,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: passwordGuidance_module_default.infoBtn,
				"aria-label": "Password requirements",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					size: 16,
					strokeWidth: 2.25
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
			align: "start",
			side: "bottom",
			className: passwordGuidance_module_default.popover,
			sideOffset: 8,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: passwordGuidance_module_default.popoverTitle,
				children: "Password must include"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: passwordGuidance_module_default.list,
				children: PASSWORD_REQUIREMENTS.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: rule }, rule))
			})]
		})] })]
	});
}
function SignupDesktop({ goBack, name, setName, mobile, setMobile, mobileCountry, setMobileCountry, email, setEmail, password, setPassword, showPassword, setShowPassword, confirmPassword, setConfirmPassword, showConfirmPassword, setShowConfirmPassword, acceptedTerms, setAcceptedTerms, error, fieldErrors, loading, isFormValid, handleSubmit, clearFieldError }) {
	const { signIn: googleSignIn, loading: googleLoading, error: googleError, isAvailable: googleAvailable } = useGoogleSignIn();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: signupDesktop_module_default.page,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: signupDesktop_module_default.topLeft,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: signupDesktop_module_default.backBtn,
				onClick: goBack,
				"aria-label": "Go back",
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
					children: "Sign up to get started"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: signupDesktop_module_default.welcomeSubtitle,
					children: "Enter your details to create a new account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: signupDesktop_module_default.googleBtn,
					disabled: !googleAvailable || googleLoading || loading,
					onClick: googleSignIn,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "20",
						height: "20",
						viewBox: "0 0 24 24",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						"aria-hidden": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
								fill: "#4285F4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
								fill: "#34A853"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
								fill: "#FBBC05"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
								fill: "#EA4335"
							})
						]
					}), googleLoading ? "Signing up…" : "Continue with Google"]
				}),
				googleError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: signupDesktop_module_default.formError,
					children: googleError
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: signupDesktop_module_default.divider,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: signupDesktop_module_default.dividerText,
						children: "or continue with"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: signupDesktop_module_default.authForm,
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: signupDesktop_module_default.fieldGroup,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: signupDesktop_module_default.fieldLabel,
									htmlFor: "signup-name-desktop",
									children: "Full Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: signupDesktop_module_default.inputWrapper,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
										className: signupDesktop_module_default.inputIconLeft,
										size: 20
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "signup-name-desktop",
										type: "text",
										placeholder: "Enter your full name",
										className: signupDesktop_module_default.inputField,
										value: name,
										onChange: (e) => {
											setName(e.target.value);
											clearFieldError("name");
										},
										autoComplete: "name",
										required: true
									})]
								}),
								fieldErrors.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: signupDesktop_module_default.fieldError,
									children: fieldErrors.name
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: signupDesktop_module_default.fieldGroup,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: signupDesktop_module_default.fieldLabel,
									htmlFor: "signup-email-desktop",
									children: "Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: signupDesktop_module_default.inputWrapper,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
										className: signupDesktop_module_default.inputIconLeft,
										size: 20
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "signup-email-desktop",
										type: "email",
										placeholder: "Enter your email",
										className: signupDesktop_module_default.inputField,
										value: email,
										onChange: (e) => {
											setEmail(e.target.value);
											clearFieldError("email");
										},
										autoComplete: "email",
										required: true
									})]
								}),
								fieldErrors.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: signupDesktop_module_default.fieldError,
									children: fieldErrors.email
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryPhoneField, {
							label: "Mobile Number",
							value: mobile,
							country: mobileCountry,
							onValueChange: (value) => {
								setMobile(value);
								clearFieldError("mobile");
							},
							onCountryChange: (country) => {
								setMobileCountry(country);
								clearFieldError("mobile");
							},
							error: fieldErrors.mobile
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: signupDesktop_module_default.fieldGroup,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordGuidance, { htmlFor: "signup-password-desktop" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: signupDesktop_module_default.inputWrapper,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
											className: signupDesktop_module_default.inputIconLeft,
											size: 20
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "signup-password-desktop",
											type: showPassword ? "text" : "password",
											placeholder: "Create a password",
											className: signupDesktop_module_default.inputField,
											value: password,
											onChange: (e) => {
												setPassword(e.target.value);
												clearFieldError("password");
											},
											autoComplete: "new-password",
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: signupDesktop_module_default.inputIconAction,
											onClick: () => setShowPassword(!showPassword),
											tabIndex: -1,
											"aria-label": showPassword ? "Hide password" : "Show password",
											children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 20 })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordCheckBar, {
									password,
									fieldError: fieldErrors.password
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: signupDesktop_module_default.fieldGroup,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: signupDesktop_module_default.fieldLabel,
									htmlFor: "signup-confirm-password-desktop",
									children: "Confirm Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: signupDesktop_module_default.inputWrapper,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
											className: signupDesktop_module_default.inputIconLeft,
											size: 20
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "signup-confirm-password-desktop",
											type: showConfirmPassword ? "text" : "password",
											placeholder: "Re-enter your password",
											className: signupDesktop_module_default.inputField,
											value: confirmPassword,
											onChange: (e) => {
												setConfirmPassword(e.target.value);
												clearFieldError("confirmPassword");
											},
											autoComplete: "new-password",
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: signupDesktop_module_default.inputIconAction,
											onClick: () => setShowConfirmPassword(!showConfirmPassword),
											tabIndex: -1,
											"aria-label": showConfirmPassword ? "Hide password" : "Show password",
											children: showConfirmPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 20 })
										})
									]
								}),
								fieldErrors.confirmPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: signupDesktop_module_default.fieldError,
									children: fieldErrors.confirmPassword
								}) : null
							]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: signupDesktop_module_default.formError,
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TermsAcceptanceField, {
							id: "signup-terms-desktop",
							checked: acceptedTerms,
							onChange: (checked) => {
								setAcceptedTerms(checked);
								clearFieldError("acceptedTerms");
							},
							error: fieldErrors.acceptedTerms
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: `${signupDesktop_module_default.primaryBtn} ${isFormValid && !loading ? signupDesktop_module_default.primaryBtnEnabled : signupDesktop_module_default.primaryBtnDisabled}`,
							disabled: !isFormValid || loading,
							children: loading ? "Sending code..." : "Sign Up"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: signupDesktop_module_default.footerPrompt,
					children: ["Already have an account?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Log In"
					})]
				})
			]
		})]
	});
}
var PHONE_PLACEHOLDERS = { ae: "501234567" };
function SignupMobile({ goBack, name, setName, mobile, setMobile, mobileCountry, setMobileCountry, email, setEmail, password, setPassword, showPassword, setShowPassword, confirmPassword, setConfirmPassword, showConfirmPassword, setShowConfirmPassword, acceptedTerms, setAcceptedTerms, error, fieldErrors, loading, isFormValid, handleSubmit, clearFieldError }) {
	const { signIn: googleSignIn, loading: googleLoading, error: googleError, isAvailable: googleAvailable } = useGoogleSignIn();
	const phonePlaceholder = PHONE_PLACEHOLDERS[mobileCountry.iso2] ?? "501234567";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: signup_module_default.page,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: signup_module_default.header,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: signup_module_default.backBtn,
					onClick: goBack,
					"aria-label": "Go back",
					disabled: loading || googleLoading,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						size: 22,
						strokeWidth: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: signup_module_default.headerTitle,
					children: "Create Account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: signup_module_default.headerSpacer })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: signup_module_default.container,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: signup_module_default.branding,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/logo/Deepfit-D-Logo.png",
							alt: "Deepfit logo",
							width: 64,
							height: 64,
							className: signup_module_default.logoIcon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: signup_module_default.brandName,
							children: "DEEPFIT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: signup_module_default.tagline,
							children: "Wellness Inside Out"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: signup_module_default.welcomeTitle,
					children: "Sign up to get started"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: signup_module_default.welcomeSubtitle,
					children: "Enter your details to create a new account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: signup_module_default.socialRow,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: signup_module_default.socialBtn,
						disabled: !googleAvailable || googleLoading || loading,
						onClick: googleSignIn,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "20",
							height: "20",
							viewBox: "0 0 24 24",
							fill: "none",
							xmlns: "http://www.w3.org/2000/svg",
							"aria-hidden": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
									fill: "#4285F4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
									fill: "#34A853"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
									fill: "#FBBC05"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
									fill: "#EA4335"
								})
							]
						}), googleLoading ? "Signing up…" : "Continue with Google"]
					})
				}),
				googleError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: signup_module_default.formError,
					children: googleError
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: signup_module_default.divider,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: signup_module_default.dividerText,
						children: "or continue with"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: signup_module_default.authForm,
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: signup_module_default.fieldGroup,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: signup_module_default.fieldLabel,
									htmlFor: "signup-name",
									children: "Full Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: signup_module_default.inputWrapper,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
										className: signup_module_default.inputIconLeft,
										size: 20
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "signup-name",
										type: "text",
										placeholder: "Enter your full name",
										className: signup_module_default.inputField,
										value: name,
										onChange: (e) => {
											setName(e.target.value);
											clearFieldError("name");
										},
										autoComplete: "name",
										required: true,
										disabled: loading
									})]
								}),
								fieldErrors.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: signup_module_default.fieldError,
									children: fieldErrors.name
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: signup_module_default.fieldGroup,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: signup_module_default.fieldLabel,
									htmlFor: "signup-email",
									children: "Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: signup_module_default.inputWrapper,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
										className: signup_module_default.inputIconLeft,
										size: 20
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "signup-email",
										type: "email",
										placeholder: "Enter your email",
										className: signup_module_default.inputField,
										value: email,
										onChange: (e) => {
											setEmail(e.target.value);
											clearFieldError("email");
										},
										autoComplete: "email",
										required: true,
										disabled: loading
									})]
								}),
								fieldErrors.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: signup_module_default.fieldError,
									children: fieldErrors.email
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryPhoneField, {
							label: "Phone Number",
							value: mobile,
							country: mobileCountry,
							placeholder: phonePlaceholder,
							showChevron: false,
							compact: true,
							onValueChange: (value) => {
								setMobile(value);
								clearFieldError("mobile");
							},
							onCountryChange: (country) => {
								setMobileCountry(country);
								clearFieldError("mobile");
							},
							error: fieldErrors.mobile
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: signup_module_default.fieldGroup,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordGuidance, { htmlFor: "signup-password" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: signup_module_default.inputWrapper,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
											className: signup_module_default.inputIconLeft,
											size: 20
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "signup-password",
											type: showPassword ? "text" : "password",
											placeholder: "Create a password",
											className: signup_module_default.inputField,
											value: password,
											onChange: (e) => {
												setPassword(e.target.value);
												clearFieldError("password");
											},
											autoComplete: "new-password",
											required: true,
											disabled: loading
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: signup_module_default.inputIconAction,
											onClick: () => setShowPassword(!showPassword),
											tabIndex: -1,
											"aria-label": showPassword ? "Hide password" : "Show password",
											disabled: loading,
											children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 20 })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordCheckBar, {
									password,
									fieldError: fieldErrors.password
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: signup_module_default.fieldGroup,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: signup_module_default.fieldLabel,
									htmlFor: "signup-confirm-password",
									children: "Confirm Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: signup_module_default.inputWrapper,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
											className: signup_module_default.inputIconLeft,
											size: 20
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "signup-confirm-password",
											type: showConfirmPassword ? "text" : "password",
											placeholder: "Re-enter your password",
											className: signup_module_default.inputField,
											value: confirmPassword,
											onChange: (e) => {
												setConfirmPassword(e.target.value);
												clearFieldError("confirmPassword");
											},
											autoComplete: "new-password",
											required: true,
											disabled: loading
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: signup_module_default.inputIconAction,
											onClick: () => setShowConfirmPassword(!showConfirmPassword),
											tabIndex: -1,
											"aria-label": showConfirmPassword ? "Hide password" : "Show password",
											disabled: loading,
											children: showConfirmPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 20 })
										})
									]
								}),
								fieldErrors.confirmPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: signup_module_default.fieldError,
									children: fieldErrors.confirmPassword
								}) : null
							]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: signup_module_default.formError,
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: signup_module_default.termsWrap,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TermsAcceptanceField, {
								id: "signup-terms-mobile",
								checked: acceptedTerms,
								onChange: (checked) => {
									setAcceptedTerms(checked);
									clearFieldError("acceptedTerms");
								},
								error: fieldErrors.acceptedTerms
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: `${signup_module_default.signupBtn} ${isFormValid && !loading ? signup_module_default.signupBtnEnabled : signup_module_default.signupBtnDisabled}`,
							disabled: !isFormValid || loading,
							children: loading ? "Sending code..." : "Sign Up"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: signup_module_default.loginPrompt,
					children: ["Already have an account?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Log In"
					})]
				})
			]
		})]
	});
}
function useSignupForm() {
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [mobile, setMobile] = (0, import_react.useState)("");
	const [mobileCountry, setMobileCountry] = (0, import_react.useState)(() => getCountryByIso("ae"));
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [showConfirmPassword, setShowConfirmPassword] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [fieldErrors, setFieldErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [acceptedTerms, setAcceptedTerms] = (0, import_react.useState)(false);
	const isFormValid = (0, import_react.useMemo)(() => {
		return Object.keys(validateSignupForm({
			name,
			mobile,
			email,
			password,
			confirmPassword,
			acceptedTerms,
			mobileCountry
		})).length === 0;
	}, [
		name,
		mobile,
		email,
		password,
		confirmPassword,
		acceptedTerms,
		mobileCountry
	]);
	const goBack = () => {
		if (typeof window !== "undefined" && window.history.length > 1) {
			window.history.back();
			return;
		}
		navigate({ to: "/login" });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setFieldErrors({});
		const errors = validateSignupForm({
			name,
			mobile,
			email,
			password,
			confirmPassword,
			acceptedTerms,
			mobileCountry
		});
		if (Object.keys(errors).length > 0) {
			setFieldErrors(errors);
			return;
		}
		setLoading(true);
		try {
			const trimmedEmail = email.trim();
			const formattedMobile = formatPhoneForApi(mobile, mobileCountry);
			const pendingSignup = {
				customerName: name.trim(),
				customerEmail: trimmedEmail,
				customerMobile: formattedMobile,
				password
			};
			const otpResult = await sendCustomerOtp({
				email: trimmedEmail,
				phone: formattedMobile
			});
			if (!otpResult.status) {
				setError(otpResult.message ?? "Failed to send verification code.");
				return;
			}
			savePendingSignup(pendingSignup);
			navigate({ to: "/verify-otp" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	const clearFieldError = (field) => {
		if (fieldErrors[field]) setFieldErrors({
			...fieldErrors,
			[field]: ""
		});
	};
	return {
		goBack,
		name,
		setName,
		mobile,
		setMobile,
		mobileCountry,
		setMobileCountry,
		email,
		setEmail,
		password,
		setPassword,
		showPassword,
		setShowPassword,
		confirmPassword,
		setConfirmPassword,
		showConfirmPassword,
		setShowConfirmPassword,
		acceptedTerms,
		setAcceptedTerms,
		error,
		fieldErrors,
		loading,
		isFormValid,
		handleSubmit,
		clearFieldError
	};
}
function SignupPage() {
	const navigate = useNavigate();
	const { isAuthenticated, isLoading } = useAuth();
	const form = useSignupForm();
	(0, import_react.useEffect)(() => {
		if (!isLoading && isAuthenticated) navigate({ to: "/" });
	}, [
		isAuthenticated,
		isLoading,
		navigate
	]);
	if (isLoading || isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPageSkeleton, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "signup-desktop-only",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignupDesktop, { ...form })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "signup-mobile-only",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignupMobile, { ...form })
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
export { SignupPage as component };
