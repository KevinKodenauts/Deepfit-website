import { a as __toESM } from "../_runtime.mjs";
import { h as getCustomerReferralTree, m as getCustomerId } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Skeleton, h as ReferralTreeSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { $ as GitBranch, S as Share2, a as Users, ct as Copy, lt as CircleQuestionMark, mt as ChevronLeft, pt as ChevronRight } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { t as useRequireAuth } from "./useRequireAuth-flXyrm-M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.referral-BBFsc65D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var referral_module_default = {
	container: "_container_171o6_1",
	header: "_header_171o6_10",
	backBtn: "_backBtn_171o6_15",
	headerTitleRow: "_headerTitleRow_171o6_27",
	headerTitle: "_headerTitle_171o6_27",
	helpIcon: "_helpIcon_171o6_39",
	headerSubtitle: "_headerSubtitle_171o6_43",
	body: "_body_171o6_50",
	codeSection: "_codeSection_171o6_57",
	codeLabel: "_codeLabel_171o6_62",
	codeRow: "_codeRow_171o6_69",
	codeBox: "_codeBox_171o6_75",
	copyBtn: "_copyBtn_171o6_90",
	shareBtn: "_shareBtn_171o6_91",
	copyMessage: "_copyMessage_171o6_119",
	statsRow: "_statsRow_171o6_125",
	statCard: "_statCard_171o6_132",
	statLabel: "_statLabel_171o6_142",
	statValue: "_statValue_171o6_147",
	statBlue: "_statBlue_171o6_152",
	statGreen: "_statGreen_171o6_156",
	treeHeader: "_treeHeader_171o6_160",
	treeHeaderLeft: "_treeHeaderLeft_171o6_169",
	treeIconWrap: "_treeIconWrap_171o6_175",
	treeTitle: "_treeTitle_171o6_186",
	treeHint: "_treeHint_171o6_192",
	treeContent: "_treeContent_171o6_198",
	loadingText: "_loadingText_171o6_202",
	emptyState: "_emptyState_171o6_210",
	emptyIconWrap: "_emptyIconWrap_171o6_219",
	referralList: "_referralList_171o6_250",
	referralCard: "_referralCard_171o6_259",
	referralAvatar: "_referralAvatar_171o6_269",
	referralInfo: "_referralInfo_171o6_283",
	referralName: "_referralName_171o6_291",
	referralMeta: "_referralMeta_171o6_297",
	referralArrow: "_referralArrow_171o6_302"
};
function ReferralPage() {
	const { user, isAuthenticated, refreshProfile, isLoading: authLoading } = useRequireAuth();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [copyMessage, setCopyMessage] = (0, import_react.useState)("");
	const [totalReferrals, setTotalReferrals] = (0, import_react.useState)(0);
	const [directReferrals, setDirectReferrals] = (0, import_react.useState)(0);
	const [referralTree, setReferralTree] = (0, import_react.useState)([]);
	const referralCode = user?.referralCode || "";
	const loadReferralData = (0, import_react.useCallback)(async () => {
		const customerId = getCustomerId();
		if (!customerId) {
			setLoading(false);
			return;
		}
		setLoading(true);
		try {
			await refreshProfile();
			const tree = await getCustomerReferralTree(customerId);
			if (tree?.data) {
				setTotalReferrals(tree.data.totalReferrals ?? 0);
				setDirectReferrals(tree.data.rootCustomer?.totalDirectReferrals ?? 0);
				setReferralTree(tree.data.referralTree ?? []);
			}
		} catch {
			setTotalReferrals(0);
			setDirectReferrals(0);
			setReferralTree([]);
		} finally {
			setLoading(false);
		}
	}, [refreshProfile]);
	(0, import_react.useEffect)(() => {
		if (authLoading || !isAuthenticated) return;
		loadReferralData();
	}, [
		authLoading,
		isAuthenticated,
		loadReferralData
	]);
	const handleCopyReferral = async () => {
		if (!referralCode) return;
		try {
			await navigator.clipboard.writeText(referralCode);
			setCopyMessage("Referral code copied");
			setTimeout(() => setCopyMessage(""), 2e3);
		} catch {
			setCopyMessage("Could not copy code");
			setTimeout(() => setCopyMessage(""), 2e3);
		}
	};
	const handleShareReferral = async () => {
		if (!referralCode) return;
		const shareText = `Join Deepfit using my referral code: ${referralCode}\n\nSign up and start your fitness journey today!`;
		if (navigator.share) {
			try {
				await navigator.share({
					text: shareText,
					title: "Deepfit Referral"
				});
			} catch {}
			return;
		}
		await handleCopyReferral();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: referral_module_default.container,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: referral_module_default.header,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: referral_module_default.backBtn,
								onClick: () => window.history.back(),
								"aria-label": "Go back",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 22 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: referral_module_default.headerTitleRow,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: referral_module_default.headerTitle,
									children: "Invite & Earn"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, {
									size: 18,
									className: referral_module_default.helpIcon
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: referral_module_default.headerSubtitle,
								children: "Turn invites into cash! Earn immediately after your friend joins and finishes their first task"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: referral_module_default.body,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: referral_module_default.codeSection,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: referral_module_default.codeLabel,
										children: "Your Referral Code"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: referral_module_default.codeRow,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: referral_module_default.codeBox,
												children: loading && !referralCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-28" }) : referralCode || "Generating..."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: referral_module_default.copyBtn,
												onClick: () => void handleCopyReferral(),
												disabled: !referralCode,
												"aria-label": "Copy referral code",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 18 })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: referral_module_default.shareBtn,
												onClick: () => void handleShareReferral(),
												disabled: !referralCode,
												"aria-label": "Share referral code",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { size: 18 })
											})
										]
									}),
									copyMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: referral_module_default.copyMessage,
										children: copyMessage
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: referral_module_default.statsRow,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: referral_module_default.statCard,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: referral_module_default.statLabel,
										children: "Total Referrals"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `${referral_module_default.statValue} ${referral_module_default.statBlue}`,
										children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-7 w-10" }) : totalReferrals
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: referral_module_default.statCard,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: referral_module_default.statLabel,
										children: "Direct Referrals"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `${referral_module_default.statValue} ${referral_module_default.statGreen}`,
										children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-7 w-10" }) : directReferrals
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: referral_module_default.treeHeader,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: referral_module_default.treeHeaderLeft,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: referral_module_default.treeIconWrap,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { size: 16 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: referral_module_default.treeTitle,
										children: "Referral Tree"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: referral_module_default.treeHint,
									children: "Tap to view full network"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
								className: referral_module_default.treeContent,
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferralTreeSkeleton, { count: 4 }) : referralTree.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: referral_module_default.emptyState,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: referral_module_default.emptyIconWrap,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
												size: 48,
												strokeWidth: 1.5
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No Referrals Yet" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Start inviting friends to build your referral network!" })
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: referral_module_default.referralList,
									children: referralTree.map((referral) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: referral_module_default.referralCard,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: referral_module_default.referralAvatar,
												children: referral.customerName.charAt(0).toUpperCase()
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: referral_module_default.referralInfo,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: referral_module_default.referralName,
													children: referral.customerName
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: referral_module_default.referralMeta,
													children: [referral.referralCode, referral.joinedDate ? ` • Joined ${referral.joinedDate}` : ""]
												})]
											}),
											referral.referrals && referral.referrals.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
												size: 18,
												className: referral_module_default.referralArrow
											}) : null
										]
									}, referral.id))
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = ReferralPage;
//#endregion
export { SplitComponent as component };
