import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Skeleton, m as ProfileSkeleton, p as ProfileMobileSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as GitBranch, A as Pencil, B as LogOut, F as MessageCircle, L as MapPin, M as PackageX, O as Phone, S as Share2, T as Receipt, V as Lock, Z as Heart, b as Shield, ct as Copy, dt as CircleDollarSign, lt as CircleQuestionMark, mt as ChevronLeft, o as User, r as Wallet, tt as FileText, u as Trash2, y as ShoppingBag, z as Mail } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { n as useProfilePage } from "./useProfilePage-D1DzBpE9.mjs";
import { r as openCrispChat } from "./router-BAl0mxep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.index-Da8WmoUE.js
var import_jsx_runtime = require_jsx_runtime();
var profileDesktop_module_default = {
	shell: "_shell_d339h_1",
	inner: "_inner_d339h_13",
	pageHeader: "_pageHeader_d339h_20",
	pageTitle: "_pageTitle_d339h_24",
	pageSubtitle: "_pageSubtitle_d339h_31",
	guestCard: "_guestCard_d339h_37",
	guestAvatar: "_guestAvatar_d339h_48",
	guestTitle: "_guestTitle_d339h_62",
	guestText: "_guestText_d339h_69",
	guestBtn: "_guestBtn_d339h_76",
	layout: "_layout_d339h_98",
	sidebar: "_sidebar_d339h_105",
	profileCard: "_profileCard_d339h_113",
	avatar: "_avatar_d339h_122",
	profileName: "_profileName_d339h_137",
	profileEmail: "_profileEmail_d339h_145",
	profilePhone: "_profilePhone_d339h_156",
	editBtn: "_editBtn_d339h_165",
	navCard: "_navCard_d339h_183",
	navSectionLabel: "_navSectionLabel_d339h_191",
	navItem: "_navItem_d339h_199",
	navItemDanger: "_navItemDanger_d339h_221",
	navIcon: "_navIcon_d339h_230",
	main: "_main_d339h_235",
	quickGrid: "_quickGrid_d339h_241",
	quickCard: "_quickCard_d339h_247",
	quickIconWrap: "_quickIconWrap_d339h_268",
	quickLabel: "_quickLabel_d339h_279",
	quickHint: "_quickHint_d339h_284",
	referralCard: "_referralCard_d339h_289",
	referralHeader: "_referralHeader_d339h_297",
	referralTitle: "_referralTitle_d339h_305",
	referralDescription: "_referralDescription_d339h_312",
	statsRow: "_statsRow_d339h_320",
	statCard: "_statCard_d339h_327",
	statValue: "_statValue_d339h_335",
	statValueGreen: "_statValueGreen_d339h_342",
	statLabel: "_statLabel_d339h_346",
	codeRow: "_codeRow_d339h_353",
	codeLabel: "_codeLabel_d339h_364",
	codeValue: "_codeValue_d339h_370",
	codeActions: "_codeActions_d339h_378",
	codeBtn: "_codeBtn_d339h_384",
	copyMessage: "_copyMessage_d339h_407",
	policySection: "_policySection_d339h_413",
	policyTitle: "_policyTitle_d339h_421",
	policyGrid: "_policyGrid_d339h_429",
	policyCard: "_policyCard_d339h_435",
	policyIcon: "_policyIcon_d339h_457",
	footer: "_footer_d339h_462",
	footerBrand: "_footerBrand_d339h_468",
	footerVersion: "_footerVersion_d339h_475"
};
function ProfileDesktop(profile) {
	const { isAuthenticated, isLoading, profileLoading, copyMessage, referralStats, displayName, displayEmail, displayPhone, referralCode, totalRewards, initials, requireAuth, handleCopyReferral, handleShareReferral, handleLogout } = profile;
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: profileDesktop_module_default.shell,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSkeleton, {})
	});
	if (!isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: profileDesktop_module_default.shell,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: profileDesktop_module_default.inner,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: profileDesktop_module_default.pageHeader,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: profileDesktop_module_default.pageTitle,
					children: "My Account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: profileDesktop_module_default.pageSubtitle,
					children: "Sign in to manage orders, wallet, and referrals"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: profileDesktop_module_default.guestCard,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: profileDesktop_module_default.guestAvatar,
						children: "DF"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: profileDesktop_module_default.guestTitle,
						children: "Welcome to Deepfit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: profileDesktop_module_default.guestText,
						children: "Log in or create an account to view your profile, track orders, and earn referral rewards."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: profileDesktop_module_default.guestBtn,
						children: "Continue to login"
					})
				]
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: profileDesktop_module_default.shell,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: profileDesktop_module_default.inner,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: profileDesktop_module_default.pageHeader,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: profileDesktop_module_default.pageTitle,
					children: "My Account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: profileDesktop_module_default.pageSubtitle,
					children: "Manage your profile, orders, and rewards"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: profileDesktop_module_default.layout,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: profileDesktop_module_default.sidebar,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: profileDesktop_module_default.profileCard,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: profileDesktop_module_default.avatar,
								children: initials
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: profileDesktop_module_default.profileName,
								children: displayName || "Deepfit Member"
							}),
							displayEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: profileDesktop_module_default.profileEmail,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 14 }), displayEmail]
							}) : null,
							displayPhone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: profileDesktop_module_default.profilePhone,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 14 }), displayPhone]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: profileDesktop_module_default.editBtn,
								onClick: () => requireAuth("/profile/edit"),
								children: "Edit profile"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: profileDesktop_module_default.navCard,
						"aria-label": "Account navigation",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: profileDesktop_module_default.navSectionLabel,
								children: "YOUR INFORMATION"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: profileDesktop_module_default.navItem,
								onClick: () => requireAuth("/profile/edit"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
									size: 18,
									className: profileDesktop_module_default.navIcon
								}), "Update profile"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: profileDesktop_module_default.navItem,
								onClick: () => requireAuth("/profile/change-password"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
									size: 18,
									className: profileDesktop_module_default.navIcon
								}), "Change password"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: profileDesktop_module_default.navItem,
								onClick: () => requireAuth("/orders"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
									size: 18,
									className: profileDesktop_module_default.navIcon
								}), "Your orders"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: profileDesktop_module_default.navItem,
								onClick: () => requireAuth("/profile/wishlist"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									size: 18,
									className: profileDesktop_module_default.navIcon
								}), "Your wishlist"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: profileDesktop_module_default.navItem,
								onClick: () => requireAuth("/profile/addresses"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									size: 18,
									className: profileDesktop_module_default.navIcon
								}), "Address book"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: profileDesktop_module_default.navItem,
								onClick: () => openCrispChat(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
									size: 18,
									className: profileDesktop_module_default.navIcon
								}), "Live chat support"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: profileDesktop_module_default.navSectionLabel,
								children: "ACCOUNT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: profileDesktop_module_default.navItem,
								onClick: handleLogout,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
									size: 18,
									className: profileDesktop_module_default.navIcon
								}), "Log out"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `${profileDesktop_module_default.navItem} ${profileDesktop_module_default.navItemDanger}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									size: 18,
									className: profileDesktop_module_default.navIcon
								}), "Delete account"]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: profileDesktop_module_default.main,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: profileDesktop_module_default.quickGrid,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: profileDesktop_module_default.quickCard,
									onClick: () => requireAuth("/wallet"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: profileDesktop_module_default.quickIconWrap,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { size: 22 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: profileDesktop_module_default.quickLabel,
											children: "Wallet"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: profileDesktop_module_default.quickHint,
											children: "View balance & top up"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: profileDesktop_module_default.quickCard,
									onClick: () => requireAuth("/orders"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: profileDesktop_module_default.quickIconWrap,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 22 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: profileDesktop_module_default.quickLabel,
											children: "Your orders"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: profileDesktop_module_default.quickHint,
											children: "Track and manage purchases"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: profileDesktop_module_default.quickCard,
									onClick: () => requireAuth("/profile/referral"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: profileDesktop_module_default.quickIconWrap,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { size: 22 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: profileDesktop_module_default.quickLabel,
											children: "Referral tree"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: profileDesktop_module_default.quickHint,
											children: "See your invite network"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: profileDesktop_module_default.referralCard,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: profileDesktop_module_default.referralHeader,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: profileDesktop_module_default.referralTitle,
										children: "Invite & Earn"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: profileDesktop_module_default.referralDescription,
									children: "Turn invites into cash! Earn immediately after your friend joins and finishes their first task."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: profileDesktop_module_default.statsRow,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: profileDesktop_module_default.statCard,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: profileDesktop_module_default.statValue,
												children: totalRewards
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: profileDesktop_module_default.statLabel,
												children: "Total rewards"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: profileDesktop_module_default.statCard,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `${profileDesktop_module_default.statValue} ${profileDesktop_module_default.statValueGreen}`,
												children: referralStats.totalReferrals
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: profileDesktop_module_default.statLabel,
												children: "Referred"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: profileDesktop_module_default.statCard,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `${profileDesktop_module_default.statValue} ${profileDesktop_module_default.statValueGreen}`,
												children: referralStats.directInvites
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: profileDesktop_module_default.statLabel,
												children: "Direct invites"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: profileDesktop_module_default.codeRow,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: profileDesktop_module_default.codeLabel,
										children: "Your referral code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: profileDesktop_module_default.codeValue,
										children: profileLoading && !referralCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-28" }) : referralCode || "Generating..."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: profileDesktop_module_default.codeActions,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: profileDesktop_module_default.codeBtn,
											onClick: () => void handleCopyReferral(),
											disabled: !referralCode,
											"aria-label": "Copy referral code",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 18 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: profileDesktop_module_default.codeBtn,
											onClick: () => void handleShareReferral(),
											disabled: !referralCode,
											"aria-label": "Share referral code",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { size: 18 })
										})]
									})]
								}),
								copyMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: profileDesktop_module_default.copyMessage,
									children: copyMessage
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: profileDesktop_module_default.policySection,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: profileDesktop_module_default.policyTitle,
								children: "POLICIES"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: profileDesktop_module_default.policyGrid,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/policies/$slug",
										params: { slug: "terms" },
										className: profileDesktop_module_default.policyCard,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
											size: 18,
											className: profileDesktop_module_default.policyIcon
										}), "Terms and conditions"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/policies/$slug",
										params: { slug: "return" },
										className: profileDesktop_module_default.policyCard,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageX, {
											size: 18,
											className: profileDesktop_module_default.policyIcon
										}), "Returns policy"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/policies/$slug",
										params: { slug: "refund" },
										className: profileDesktop_module_default.policyCard,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDollarSign, {
											size: 18,
											className: profileDesktop_module_default.policyIcon
										}), "Refunds policy"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/policies/$slug",
										params: { slug: "privacy" },
										className: profileDesktop_module_default.policyCard,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
											size: 18,
											className: profileDesktop_module_default.policyIcon
										}), "Privacy policy"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: profileDesktop_module_default.footer,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: profileDesktop_module_default.footerBrand,
								children: "Deepfit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: profileDesktop_module_default.footerVersion,
								children: "v1.0.16 (1)"
							})]
						})
					]
				})]
			})]
		})
	});
}
var profile_module_default = {
	container: "_container_88yio_1",
	header: "_header_88yio_16",
	backBtn: "_backBtn_88yio_27",
	editBtn: "_editBtn_88yio_28",
	pageTitle: "_pageTitle_88yio_39",
	headerSpacer: "_headerSpacer_88yio_47",
	accountSection: "_accountSection_88yio_51",
	accountTitle: "_accountTitle_88yio_57",
	accountSubtitle: "_accountSubtitle_88yio_64",
	accountPhone: "_accountPhone_88yio_71",
	continueBtn: "_continueBtn_88yio_80",
	inviteCard: "_inviteCard_88yio_101",
	inviteHeader: "_inviteHeader_88yio_109",
	inviteTitle: "_inviteTitle_88yio_116",
	inviteHelp: "_inviteHelp_88yio_123",
	inviteDescription: "_inviteDescription_88yio_128",
	rewardsCard: "_rewardsCard_88yio_135",
	rewardsLabel: "_rewardsLabel_88yio_141",
	rewardsStats: "_rewardsStats_88yio_148",
	statItem: "_statItem_88yio_155",
	statValue: "_statValue_88yio_163",
	statGreen: "_statGreen_88yio_169",
	statLabel: "_statLabel_88yio_173",
	statDivider: "_statDivider_88yio_178",
	referralCodeBox: "_referralCodeBox_88yio_184",
	referralCodeLabel: "_referralCodeLabel_88yio_196",
	referralCode: "_referralCode_88yio_184",
	referralActions: "_referralActions_88yio_211",
	referralActionBtn: "_referralActionBtn_88yio_217",
	copyMessage: "_copyMessage_88yio_235",
	quickActions: "_quickActions_88yio_242",
	quickActionCard: "_quickActionCard_88yio_249",
	listSection: "_listSection_88yio_266",
	sectionTitle: "_sectionTitle_88yio_270",
	listItems: "_listItems_88yio_278",
	listItem: "_listItem_88yio_278",
	listIcon: "_listIcon_88yio_300",
	deleteAccountBtn: "_deleteAccountBtn_88yio_305",
	footer: "_footer_88yio_320",
	brandName: "_brandName_88yio_326",
	version: "_version_88yio_334"
};
function ProfileMobile(profile) {
	const { isAuthenticated, isLoading, profileLoading, copyMessage, referralStats, displayPhone, referralCode, totalRewards, user, requireAuth, handleCopyReferral, handleShareReferral, handleLogout } = profile;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: profile_module_default.container,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: profile_module_default.header,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: profile_module_default.backBtn,
						onClick: () => window.history.back(),
						"aria-label": "Go back",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: profile_module_default.pageTitle,
						children: "Profile"
					}),
					isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: profile_module_default.headerSpacer }) : isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: profile_module_default.editBtn,
						onClick: () => requireAuth("/profile/edit"),
						"aria-label": "Edit profile",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 20 })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: profile_module_default.headerSpacer })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: profile_module_default.accountSection,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: profile_module_default.accountTitle,
					children: "Your account"
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileMobileSkeleton, {}) : isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					displayPhone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: profile_module_default.accountPhone,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: displayPhone })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: profile_module_default.accountSubtitle,
						children: user?.name || user?.customerName || "Welcome back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: profile_module_default.inviteCard,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: profile_module_default.inviteHeader,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: profile_module_default.inviteTitle,
									children: "Invite & Earn 🎁"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, {
									size: 16,
									className: profile_module_default.inviteHelp
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: profile_module_default.inviteDescription,
								children: "Turn invites into cash! Earn immediately after your friend joins and finishes their first task"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: profile_module_default.rewardsCard,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: profile_module_default.rewardsLabel,
									children: "💰 Rewards Earned"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: profile_module_default.rewardsStats,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: profile_module_default.statItem,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: profile_module_default.statValue,
												children: totalRewards
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: profile_module_default.statLabel,
												children: "Total Rewards"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: profile_module_default.statDivider }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: profile_module_default.statItem,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `${profile_module_default.statValue} ${profile_module_default.statGreen}`,
												children: referralStats.totalReferrals
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: profile_module_default.statLabel,
												children: "Referred"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: profile_module_default.statDivider }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: profile_module_default.statItem,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `${profile_module_default.statValue} ${profile_module_default.statGreen}`,
												children: referralStats.directInvites
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: profile_module_default.statLabel,
												children: "Direct Invites"
											})]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: profile_module_default.referralCodeBox,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: profile_module_default.referralCodeLabel,
									children: "Your Referral Code"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: profile_module_default.referralCode,
									children: profileLoading && !referralCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-28" }) : referralCode || "Generating..."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: profile_module_default.referralActions,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: profile_module_default.referralActionBtn,
										onClick: () => void handleCopyReferral(),
										disabled: !referralCode,
										"aria-label": "Copy referral code",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 18 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: profile_module_default.referralActionBtn,
										onClick: () => void handleShareReferral(),
										disabled: !referralCode,
										"aria-label": "Share referral code",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { size: 18 })
									})]
								})]
							}),
							copyMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: profile_module_default.copyMessage,
								children: copyMessage
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: profile_module_default.quickActions,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: profile_module_default.quickActionCard,
								onClick: () => requireAuth("/wallet"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { size: 22 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wallet" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: profile_module_default.quickActionCard,
								onClick: () => requireAuth("/orders"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 22 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your Order" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: profile_module_default.quickActionCard,
								onClick: () => requireAuth("/profile/referral"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { size: 22 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Referral Tree" })]
							})
						]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: profile_module_default.accountSubtitle,
					children: "Log in or sign up to view your complete profile"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: profile_module_default.continueBtn,
					children: "Continue"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: profile_module_default.listSection,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: profile_module_default.sectionTitle,
					children: "YOUR INFORMATION"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: profile_module_default.listItems,
					children: [
						!isLoading && isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: profile_module_default.listItem,
							onClick: () => requireAuth("/profile/edit"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
								size: 20,
								className: profile_module_default.listIcon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Update Profile" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: profile_module_default.listItem,
							onClick: () => requireAuth("/profile/change-password"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
								size: 20,
								className: profile_module_default.listIcon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Change Password" })]
						})] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: profile_module_default.listItem,
							onClick: () => requireAuth("/orders"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
								size: 20,
								className: profile_module_default.listIcon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your orders" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: profile_module_default.listItem,
							onClick: () => requireAuth("/profile/wishlist"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
								size: 20,
								className: profile_module_default.listIcon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your wishlist" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: profile_module_default.listItem,
							onClick: () => requireAuth("/profile/addresses"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								size: 20,
								className: profile_module_default.listIcon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Address Book" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: profile_module_default.listItem,
							onClick: () => openCrispChat(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
								size: 20,
								className: profile_module_default.listIcon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Live Chat Support" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: profile_module_default.listSection,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: profile_module_default.sectionTitle,
					children: "POLICY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: profile_module_default.listItems,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/policies/$slug",
							params: { slug: "terms" },
							className: profile_module_default.listItem,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								size: 20,
								className: profile_module_default.listIcon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Terms and conditions" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/policies/$slug",
							params: { slug: "return" },
							className: profile_module_default.listItem,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageX, {
								size: 20,
								className: profile_module_default.listIcon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Returns policy" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/policies/$slug",
							params: { slug: "refund" },
							className: profile_module_default.listItem,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDollarSign, {
								size: 20,
								className: profile_module_default.listIcon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Refunds policy" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/policies/$slug",
							params: { slug: "privacy" },
							className: profile_module_default.listItem,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
								size: 20,
								className: profile_module_default.listIcon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Privacy policy" })]
						})
					]
				})]
			}),
			!isLoading && isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: profile_module_default.listSection,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: profile_module_default.sectionTitle,
					children: "OTHER INFORMATION"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: profile_module_default.listItems,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: profile_module_default.listItem,
						onClick: handleLogout,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
							size: 20,
							className: profile_module_default.listIcon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Log out" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: profile_module_default.deleteAccountBtn,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delete Account" })]
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: profile_module_default.footer,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: profile_module_default.brandName,
					children: "Deepfit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: profile_module_default.version,
					children: "v1.0.16 (1)"
				})]
			})
		]
	});
}
function ProfilePage() {
	const profile = useProfilePage();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-desktop-only",
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileDesktop, { ...profile })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-mobile-only",
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileMobile, { ...profile })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-desktop-only",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .profile-desktop-only { display: none; }
        .profile-mobile-only { display: block; }
        @media (min-width: 1024px) {
          .profile-desktop-only { display: block; }
          .profile-mobile-only { display: none; }
        }
      ` })
		]
	});
}
var SplitComponent = ProfilePage;
//#endregion
export { SplitComponent as component };
