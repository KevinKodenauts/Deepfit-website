import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { mt as ChevronLeft, pt as ChevronRight } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { t as useRequireAuth } from "./useRequireAuth-flXyrm-M.mjs";
import { n as CurrencySymbol, t as CurrencyAmount } from "./CurrencySymbol-RZEUbyS_.mjs";
import { t as addMoneyToWallet } from "./wallet-Dscr2CTD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet.add-Kwt8182q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var addMoney_module_default = {
	container: "_container_7haao_1",
	header: "_header_7haao_10",
	backBtn: "_backBtn_7haao_20",
	pageTitle: "_pageTitle_7haao_32",
	content: "_content_7haao_38",
	inputLabel: "_inputLabel_7haao_47",
	amountDisplay: "_amountDisplay_7haao_53",
	currencySymbol: "_currencySymbol_7haao_60",
	amountValue: "_amountValue_7haao_64",
	chipsContainer: "_chipsContainer_7haao_70",
	chip: "_chip_7haao_70",
	chipActive: "_chipActive_7haao_90",
	noteSection: "_noteSection_7haao_96",
	noteTitle: "_noteTitle_7haao_101",
	noteList: "_noteList_7haao_110",
	noteItem: "_noteItem_7haao_119",
	linkText: "_linkText_7haao_138",
	watermarkContainer: "_watermarkContainer_7haao_145",
	watermarkCard: "_watermarkCard_7haao_154",
	watermarkIcon: "_watermarkIcon_7haao_166",
	watermarkText: "_watermarkText_7haao_170",
	bottomBar: "_bottomBar_7haao_179",
	payUsing: "_payUsing_7haao_188",
	payUsingLabelRow: "_payUsingLabelRow_7haao_194",
	dot: "_dot_7haao_200",
	payUsingLabel: "_payUsingLabel_7haao_194",
	paymentMethod: "_paymentMethod_7haao_215",
	payNowBtn: "_payNowBtn_7haao_221",
	payAmount: "_payAmount_7haao_233",
	payAmountValue: "_payAmountValue_7haao_240",
	payAmountLabel: "_payAmountLabel_7haao_245",
	payAction: "_payAction_7haao_251",
	errorText: "_errorText_7haao_259"
};
var AMOUNTS = [
	2e3,
	5e3,
	1e4
];
function AddMoneyPage() {
	const navigate = useNavigate();
	const { isAuthenticated } = useRequireAuth();
	const [amount, setAmount] = (0, import_react.useState)(2e3);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const handlePayNow = async () => {
		if (!isAuthenticated) {
			navigate({ to: "/login" });
			return;
		}
		setLoading(true);
		setError("");
		try {
			const result = await addMoneyToWallet(amount);
			if (result.status) {
				navigate({ to: "/wallet" });
				return;
			}
			setError(result.message ?? "Could not add money. Please try again.");
		} catch {
			setError("Could not add money. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: addMoney_module_default.container,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: addMoney_module_default.header,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: addMoney_module_default.backBtn,
							onClick: () => window.history.back(),
							"aria-label": "Go back",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: addMoney_module_default.pageTitle,
							children: "Add money"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: addMoney_module_default.content,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: addMoney_module_default.inputLabel,
								children: "Enter amount to add"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: addMoney_module_default.amountDisplay,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencySymbol, {
									className: addMoney_module_default.currencySymbol,
									size: 48
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: addMoney_module_default.amountValue,
									children: amount.toLocaleString()
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: addMoney_module_default.chipsContainer,
								children: AMOUNTS.map((val) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: `${addMoney_module_default.chip} ${amount === val ? addMoney_module_default.chipActive : ""}`,
									onClick: () => setAmount(val),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyAmount, { children: val.toLocaleString() })
								}, val))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: addMoney_module_default.noteSection,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: addMoney_module_default.noteTitle,
									children: "NOTE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: addMoney_module_default.noteList,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: addMoney_module_default.noteItem,
										children: "Deepfit Money balance is valid for 1 year from the date of money added"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: addMoney_module_default.noteItem,
										children: ["Deepfit Money cannot be transferred to a bank account as per RBI guidelines. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: addMoney_module_default.linkText,
											children: "Read T&Cs"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: addMoney_module_default.watermarkContainer,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: addMoney_module_default.watermarkCard,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencySymbol, {
										className: addMoney_module_default.watermarkIcon,
										size: 30
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: addMoney_module_default.watermarkText,
									children: [
										"Enjoy seamless",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"single tap payments"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: addMoney_module_default.bottomBar,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: addMoney_module_default.payUsing,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: addMoney_module_default.payUsingLabelRow,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: addMoney_module_default.dot }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: addMoney_module_default.payUsingLabel,
												children: "PAY USING"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: addMoney_module_default.paymentMethod,
											children: "Credit Card"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: addMoney_module_default.payNowBtn,
										onClick: () => void handlePayNow(),
										disabled: loading,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: addMoney_module_default.payAmount,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: addMoney_module_default.payAmountValue,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CurrencyAmount, { children: [amount.toLocaleString(), ".00"] })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: addMoney_module_default.payAmountLabel,
												children: "TOTAL"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: addMoney_module_default.payAction,
											children: [
												loading ? "Processing..." : "Pay Now",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
													size: 18,
													strokeWidth: 2.5
												})
											]
										})]
									}),
									error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: addMoney_module_default.errorText,
										children: error
									}) : null
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = AddMoneyPage;
//#endregion
export { SplitComponent as component };
