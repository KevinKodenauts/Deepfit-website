import { a as __toESM } from "../_runtime.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { l as require_react_dom, u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useAuth } from "./AuthContext-B71YYWma.mjs";
import { r as AuthPageSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link, v as useNavigate, y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as LockOpen, St as AtSign, Tt as ArrowLeft, V as Lock, ft as CircleCheck, i as UtensilsCrossed, it as EyeOff, k as PersonStanding, l as TrendingUp, n as X, ot as Dumbbell, rt as Eye, z as Mail } from "../_libs/lucide-react.mjs";
import { a as useGoogleSignIn, n as TermsAcceptanceField, o as validateLoginForm } from "./validation-Y2NiwijS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DjNcE1Hf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var AuthTopToast_module_default = {
	toastWrap: "_toastWrap_1tguo_1",
	toast: "_toast_1tguo_1",
	icon: "_icon_1tguo_28",
	message: "_message_1tguo_33",
	closeBtn: "_closeBtn_1tguo_42",
	progressTrack: "_progressTrack_1tguo_61",
	progressBar: "_progressBar_1tguo_70"
};
function AuthTopToast({ message, visible, onClose, durationMs = 5e3 }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!visible) return;
		const timer = setTimeout(onClose, durationMs);
		return () => clearTimeout(timer);
	}, [
		visible,
		onClose,
		durationMs
	]);
	if (!mounted) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: visible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: AuthTopToast_module_default.toastWrap,
		initial: {
			opacity: 0,
			y: -16
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: -16
		},
		transition: { duration: .25 },
		role: "status",
		"aria-live": "polite",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: AuthTopToast_module_default.toast,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					className: AuthTopToast_module_default.icon,
					size: 22
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: AuthTopToast_module_default.message,
					children: message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: AuthTopToast_module_default.closeBtn,
					onClick: onClose,
					"aria-label": "Close notification",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: AuthTopToast_module_default.progressTrack,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: AuthTopToast_module_default.progressBar,
						initial: { scaleX: 1 },
						animate: { scaleX: 0 },
						transition: {
							duration: durationMs / 1e3,
							ease: "linear"
						}
					})
				})
			]
		})
	}) }), document.body);
}
var loginDesktop_module_default = {
	page: "_page_ppu8u_1",
	skipRow: "_skipRow_ppu8u_19",
	skipLink: "_skipLink_ppu8u_25",
	card: "_card_ppu8u_36",
	branding: "_branding_ppu8u_47",
	logoIcon: "_logoIcon_ppu8u_54",
	brandName: "_brandName_ppu8u_60",
	tagline: "_tagline_ppu8u_68",
	sectionTitle: "_sectionTitle_ppu8u_75",
	googleBtn: "_googleBtn_ppu8u_83",
	divider: "_divider_ppu8u_109",
	dividerText: "_dividerText_ppu8u_124",
	authForm: "_authForm_ppu8u_128",
	fieldGroup: "_fieldGroup_ppu8u_134",
	fieldLabel: "_fieldLabel_ppu8u_140",
	inputWrapper: "_inputWrapper_ppu8u_146",
	inputIconLeft: "_inputIconLeft_ppu8u_156",
	inputField: "_inputField_ppu8u_163",
	inputIconAction: "_inputIconAction_ppu8u_179",
	fieldError: "_fieldError_ppu8u_196",
	formError: "_formError_ppu8u_202",
	forgotRow: "_forgotRow_ppu8u_208",
	forgotLink: "_forgotLink_ppu8u_214",
	loginBtn: "_loginBtn_ppu8u_225",
	loginBtnEnabled: "_loginBtnEnabled_ppu8u_237",
	loginBtnDisabled: "_loginBtnDisabled_ppu8u_246",
	signupPrompt: "_signupPrompt_ppu8u_252"
};
function LoginDesktop({ email, setEmail, password, setPassword, showPassword, setShowPassword, error, fieldErrors, loading, isFormValid, acceptedTerms, setAcceptedTerms, handleSubmit, clearEmailError, clearPasswordError, clearTermsError }) {
	const { signIn: googleSignIn, loading: googleLoading, error: googleError, isAvailable: googleAvailable } = useGoogleSignIn();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: loginDesktop_module_default.page,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: loginDesktop_module_default.skipRow,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: loginDesktop_module_default.skipLink,
				children: "Skip login"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: loginDesktop_module_default.card,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: loginDesktop_module_default.branding,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/logo/Deepfit-D-Logo.png",
							alt: "Deepfit logo",
							width: 56,
							height: 56,
							className: loginDesktop_module_default.logoIcon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: loginDesktop_module_default.brandName,
							children: "DEEPFIT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: loginDesktop_module_default.tagline,
							children: "Wellness Inside Out"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: loginDesktop_module_default.sectionTitle,
					children: "Log In or Sign Up"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: loginDesktop_module_default.googleBtn,
					disabled: !googleAvailable || googleLoading,
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
					}), googleLoading ? "Signing in…" : "Google"]
				}),
				googleError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: loginDesktop_module_default.formError,
					children: googleError
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: loginDesktop_module_default.divider,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: loginDesktop_module_default.dividerText,
						children: "or continue with"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: loginDesktop_module_default.authForm,
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: loginDesktop_module_default.fieldGroup,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: loginDesktop_module_default.fieldLabel,
									htmlFor: "login-email-desktop",
									children: "Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: loginDesktop_module_default.inputWrapper,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
										className: loginDesktop_module_default.inputIconLeft,
										size: 20
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "login-email-desktop",
										type: "email",
										placeholder: "Enter email address",
										className: loginDesktop_module_default.inputField,
										value: email,
										onChange: (e) => {
											setEmail(e.target.value);
											clearEmailError();
										},
										autoComplete: "email",
										required: true
									})]
								}),
								fieldErrors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: loginDesktop_module_default.fieldError,
									children: fieldErrors.email
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: loginDesktop_module_default.fieldGroup,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: loginDesktop_module_default.fieldLabel,
									htmlFor: "login-password-desktop",
									children: "Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: loginDesktop_module_default.inputWrapper,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
											className: loginDesktop_module_default.inputIconLeft,
											size: 20
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "login-password-desktop",
											type: showPassword ? "text" : "password",
											placeholder: "Enter password",
											className: loginDesktop_module_default.inputField,
											value: password,
											onChange: (e) => {
												setPassword(e.target.value);
												clearPasswordError();
											},
											autoComplete: "current-password",
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: loginDesktop_module_default.inputIconAction,
											onClick: () => setShowPassword(!showPassword),
											tabIndex: -1,
											"aria-label": showPassword ? "Hide password" : "Show password",
											children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 20 })
										})
									]
								}),
								fieldErrors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: loginDesktop_module_default.fieldError,
									children: fieldErrors.password
								})
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: loginDesktop_module_default.formError,
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: loginDesktop_module_default.forgotRow,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/forgot-password",
								className: loginDesktop_module_default.forgotLink,
								children: "Forgot password?"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TermsAcceptanceField, {
							id: "login-terms-desktop",
							checked: acceptedTerms,
							onChange: (checked) => {
								setAcceptedTerms(checked);
								clearTermsError();
							},
							error: fieldErrors.acceptedTerms
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: `${loginDesktop_module_default.loginBtn} ${isFormValid && !loading ? loginDesktop_module_default.loginBtnEnabled : loginDesktop_module_default.loginBtnDisabled}`,
							disabled: !isFormValid || loading,
							children: loading ? "Logging in..." : "Log In"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: loginDesktop_module_default.signupPrompt,
					children: ["Don't have an account?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						children: "Sign Up"
					})]
				})
			]
		})]
	});
}
var login_module_default = {
	page: "_page_1drab_1",
	container: "_container_1drab_22",
	backBtn: "_backBtn_1drab_33",
	scrollArea: "_scrollArea_1drab_54",
	header: "_header_1drab_60",
	title: "_title_1drab_64",
	subtitle: "_subtitle_1drab_72",
	authForm: "_authForm_1drab_80",
	fieldGroup: "_fieldGroup_1drab_85",
	fieldLabel: "_fieldLabel_1drab_89",
	inputWrapper: "_inputWrapper_1drab_97",
	inputField: "_inputField_1drab_107",
	inputIconRight: "_inputIconRight_1drab_133",
	inputIconAction: "_inputIconAction_1drab_143",
	fieldError: "_fieldError_1drab_160",
	formError: "_formError_1drab_166",
	optionsRow: "_optionsRow_1drab_172",
	rememberLabel: "_rememberLabel_1drab_180",
	rememberCheckbox: "_rememberCheckbox_1drab_190",
	forgotLink: "_forgotLink_1drab_198",
	termsWrap: "_termsWrap_1drab_210",
	loginBtn: "_loginBtn_1drab_218",
	loginBtnEnabled: "_loginBtnEnabled_1drab_229",
	loginBtnDisabled: "_loginBtnDisabled_1drab_243",
	divider: "_divider_1drab_250",
	dividerText: "_dividerText_1drab_265",
	socialColumn: "_socialColumn_1drab_269",
	socialBtn: "_socialBtn_1drab_275",
	socialBtnApple: "_socialBtnApple_1drab_294",
	socialBtnGoogle: "_socialBtnGoogle_1drab_304",
	signupPrompt: "_signupPrompt_1drab_314",
	bottomNav: "_bottomNav_1drab_333",
	navItem: "_navItem_1drab_341",
	navItemActive: "_navItemActive_1drab_351",
	navLabel: "_navLabel_1drab_355"
};
var NAV_ITEMS = [
	{
		label: "Strength",
		Icon: Dumbbell,
		active: false
	},
	{
		label: "Mindful",
		Icon: PersonStanding,
		active: true
	},
	{
		label: "Fuel",
		Icon: UtensilsCrossed,
		active: false
	},
	{
		label: "Track",
		Icon: TrendingUp,
		active: false
	}
];
function LoginMobile({ email, setEmail, password, setPassword, showPassword, setShowPassword, error, fieldErrors, loading, isFormValid, acceptedTerms, setAcceptedTerms, handleSubmit, clearEmailError, clearPasswordError, clearTermsError }) {
	const [rememberMe, setRememberMe] = (0, import_react.useState)(false);
	const { signIn: googleSignIn, loading: googleLoading, error: googleError, isAvailable: googleAvailable } = useGoogleSignIn();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: login_module_default.page,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: login_module_default.container,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: login_module_default.backBtn,
					"aria-label": "Go back",
					tabIndex: loading ? -1 : 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						size: 22,
						strokeWidth: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: login_module_default.scrollArea,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: login_module_default.header,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: login_module_default.title,
								children: "Welcome Back 👋"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: login_module_default.subtitle,
								children: "Login to continue your fitness journey"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: login_module_default.authForm,
							onSubmit: handleSubmit,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: login_module_default.fieldGroup,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: login_module_default.fieldLabel,
											htmlFor: "login-email",
											children: "Phone Number / Email"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: login_module_default.inputWrapper,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "login-email",
												type: "text",
												inputMode: "email",
												placeholder: "Enter your email or phone",
												className: login_module_default.inputField,
												value: email,
												onChange: (e) => {
													setEmail(e.target.value);
													clearEmailError();
												},
												autoComplete: "username",
												required: true,
												disabled: loading
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: login_module_default.inputIconRight,
												"aria-hidden": true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtSign, { size: 20 })
											})]
										}),
										fieldErrors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: login_module_default.fieldError,
											children: fieldErrors.email
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: login_module_default.fieldGroup,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: login_module_default.fieldLabel,
											htmlFor: "login-password",
											children: "Password"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: login_module_default.inputWrapper,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "login-password",
												type: showPassword ? "text" : "password",
												placeholder: "Enter your password",
												className: login_module_default.inputField,
												value: password,
												onChange: (e) => {
													setPassword(e.target.value);
													clearPasswordError();
												},
												autoComplete: "current-password",
												required: true,
												disabled: loading
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: login_module_default.inputIconAction,
												onClick: () => setShowPassword(!showPassword),
												tabIndex: -1,
												"aria-label": showPassword ? "Hide password" : "Show password",
												disabled: loading,
												children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 20 })
											})]
										}),
										fieldErrors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: login_module_default.fieldError,
											children: fieldErrors.password
										})
									]
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: login_module_default.formError,
									children: error
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: login_module_default.optionsRow,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: login_module_default.rememberLabel,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: login_module_default.rememberCheckbox,
											checked: rememberMe,
											onChange: (e) => setRememberMe(e.target.checked),
											disabled: loading
										}), "Remember Me"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/forgot-password",
										className: login_module_default.forgotLink,
										children: "Forgot Password?"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: login_module_default.termsWrap,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TermsAcceptanceField, {
										id: "login-terms-mobile",
										checked: acceptedTerms,
										onChange: (checked) => {
											setAcceptedTerms(checked);
											clearTermsError();
										},
										error: fieldErrors.acceptedTerms
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: `${login_module_default.loginBtn} ${isFormValid && !loading ? login_module_default.loginBtnEnabled : login_module_default.loginBtnDisabled}`,
									disabled: !isFormValid || loading,
									children: loading ? "Logging in..." : "Login"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: login_module_default.divider,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: login_module_default.dividerText,
								children: "or continue with"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: login_module_default.socialColumn,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `${login_module_default.socialBtn} ${login_module_default.socialBtnApple}`,
								disabled: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "20",
									height: "20",
									viewBox: "0 0 24 24",
									fill: "currentColor",
									"aria-hidden": true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.55 4.33-3.74 4.25z" })
								}), "Sign In with Apple"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `${login_module_default.socialBtn} ${login_module_default.socialBtnGoogle}`,
								disabled: !googleAvailable || googleLoading,
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
								}), googleLoading ? "Signing in…" : "Sign In with Google"]
							})]
						}),
						googleError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: login_module_default.formError,
							children: googleError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: login_module_default.signupPrompt,
							children: ["Don't have an account?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/signup",
								children: "Sign Up"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: login_module_default.bottomNav,
					"aria-hidden": true,
					children: NAV_ITEMS.map(({ label, Icon, active }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${login_module_default.navItem} ${active ? login_module_default.navItemActive : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							size: 22,
							strokeWidth: active ? 2.2 : 1.8
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: login_module_default.navLabel,
							children: label
						})]
					}, label))
				})
			]
		})
	});
}
function useLoginForm() {
	const navigate = useNavigate();
	const search = useSearch({ strict: false });
	const { login } = useAuth();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [fieldErrors, setFieldErrors] = (0, import_react.useState)({});
	const [showResetToast, setShowResetToast] = (0, import_react.useState)(false);
	const [showSignupToast, setShowSignupToast] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [acceptedTerms, setAcceptedTerms] = (0, import_react.useState)(false);
	const isFormValid = (0, import_react.useMemo)(() => {
		return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim()) && password.length >= 6 && acceptedTerms;
	}, [
		email,
		password,
		acceptedTerms
	]);
	const closeResetToast = (0, import_react.useCallback)(() => {
		setShowResetToast(false);
		navigate({
			to: "/login",
			search: {}
		});
	}, [navigate]);
	const closeSignupToast = (0, import_react.useCallback)(() => {
		setShowSignupToast(false);
		navigate({
			to: "/login",
			search: {}
		});
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		const prefillEmail = sessionStorage.getItem("deepfit_login_email");
		if (prefillEmail) {
			setEmail(prefillEmail);
			sessionStorage.removeItem("deepfit_login_email");
		}
		if (search.reset === "success") setShowResetToast(true);
		else if (search.signup === "success") setShowSignupToast(true);
	}, [search.reset, search.signup]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setFieldErrors({});
		const errors = validateLoginForm(email, password, acceptedTerms);
		if (Object.keys(errors).length > 0) {
			setFieldErrors(errors);
			return;
		}
		setLoading(true);
		try {
			const err = await login(email.trim(), password);
			if (err) setError(err);
			else {
				const next = search.next;
				navigate({ to: next && next.startsWith("/") ? next : "/" });
			}
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	const clearEmailError = () => {
		if (fieldErrors.email) setFieldErrors({
			...fieldErrors,
			email: ""
		});
	};
	const clearPasswordError = () => {
		if (fieldErrors.password) setFieldErrors({
			...fieldErrors,
			password: ""
		});
	};
	const clearTermsError = () => {
		if (fieldErrors.acceptedTerms) setFieldErrors({
			...fieldErrors,
			acceptedTerms: ""
		});
	};
	return {
		email,
		setEmail,
		password,
		setPassword,
		showPassword,
		setShowPassword,
		acceptedTerms,
		setAcceptedTerms,
		error,
		fieldErrors,
		showResetToast,
		showSignupToast,
		loading,
		isFormValid,
		closeResetToast,
		closeSignupToast,
		handleSubmit,
		clearEmailError,
		clearPasswordError,
		clearTermsError
	};
}
function LoginPage() {
	const navigate = useNavigate();
	const { isAuthenticated, isLoading } = useAuth();
	const form = useLoginForm();
	(0, import_react.useEffect)(() => {
		if (!isLoading && isAuthenticated) navigate({ to: "/" });
	}, [
		isAuthenticated,
		isLoading,
		navigate
	]);
	if (isLoading || isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPageSkeleton, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthTopToast, {
			message: "Password updated successfully.",
			visible: form.showResetToast,
			onClose: form.closeResetToast
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthTopToast, {
			message: "Account verified. Please log in to continue.",
			visible: form.showSignupToast,
			onClose: form.closeSignupToast
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "login-desktop-only",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginDesktop, { ...form })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "login-mobile-only",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginMobile, { ...form })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .login-desktop-only { display: none; }
        .login-mobile-only { display: block; }
        @media (min-width: 1024px) {
          .login-desktop-only { display: block; }
          .login-mobile-only { display: none; }
        }
      ` })
	] });
}
//#endregion
export { LoginPage as component };
