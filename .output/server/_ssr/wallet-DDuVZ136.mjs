import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Skeleton, v as WalletTransactionsSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Receipt, m as SquarePlus, mt as ChevronLeft, y as ShoppingBag } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { t as useRequireAuth } from "./useRequireAuth-flXyrm-M.mjs";
import { n as CurrencySymbol, t as CurrencyAmount } from "./CurrencySymbol-RZEUbyS_.mjs";
import { n as getWalletTransactions } from "./wallet-Dscr2CTD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-DDuVZ136.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var wallet_module_default = {
	container: "_container_1x7z1_1",
	header: "_header_1x7z1_16",
	backBtn: "_backBtn_1x7z1_20",
	content: "_content_1x7z1_34",
	balanceSection: "_balanceSection_1x7z1_41",
	walletIcon: "_walletIcon_1x7z1_49",
	balanceLabel: "_balanceLabel_1x7z1_63",
	balanceAmount: "_balanceAmount_1x7z1_71",
	lowBalanceText: "_lowBalanceText_1x7z1_79",
	addMoneyLink: "_addMoneyLink_1x7z1_87",
	transactionsSection: "_transactionsSection_1x7z1_98",
	sectionTitle: "_sectionTitle_1x7z1_102",
	transactionsCard: "_transactionsCard_1x7z1_109",
	loadingText: "_loadingText_1x7z1_116",
	emptyState: "_emptyState_1x7z1_124",
	transactionsList: "_transactionsList_1x7z1_141",
	transactionItem: "_transactionItem_1x7z1_147",
	txIconWrap: "_txIconWrap_1x7z1_159",
	txInfo: "_txInfo_1x7z1_171",
	txTitle: "_txTitle_1x7z1_179",
	txDate: "_txDate_1x7z1_185",
	txAmountPositive: "_txAmountPositive_1x7z1_190",
	txAmountNegative: "_txAmountNegative_1x7z1_200",
	footerText: "_footerText_1x7z1_210"
};
function formatAmount(amount) {
	return amount.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}
function formatTransactionDate(dateString) {
	if (!dateString) return "";
	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) return "";
	return `on ${date.toLocaleString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true
	})}`;
}
function TransactionIcon({ transaction }) {
	if (transaction.isCredit) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePlus, {
		size: 20,
		strokeWidth: 2
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
		size: 20,
		strokeWidth: 2
	});
}
function WalletPage() {
	const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
	const [wallet, setWallet] = (0, import_react.useState)({
		totalBalance: 0,
		transactions: []
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadWallet = (0, import_react.useCallback)(async () => {
		try {
			const data = await getWalletTransactions();
			setWallet(data);
		} catch {
			setWallet({
				totalBalance: 0,
				transactions: []
			});
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (authLoading || !isAuthenticated) return;
		loadWallet();
	}, [
		authLoading,
		isAuthenticated,
		loadWallet
	]);
	const isLowBalance = wallet.totalBalance <= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { paddingTop: "var(--desktop-nav-height)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: wallet_module_default.container,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: wallet_module_default.header,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: wallet_module_default.backBtn,
							onClick: () => window.history.back(),
							"aria-label": "Go back",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: wallet_module_default.content,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: wallet_module_default.balanceSection,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: wallet_module_default.walletIcon,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencySymbol, { size: 50 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: wallet_module_default.balanceLabel,
										children: "YOUR BALANCE"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: wallet_module_default.balanceAmount,
										children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mx-auto h-10 w-36" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyAmount, { children: formatAmount(wallet.totalBalance) })
									}),
									isLowBalance ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: wallet_module_default.lowBalanceText,
										children: "Your balance is low. Please add money to continue enjoying one click payments"
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/wallet/add",
										className: wallet_module_default.addMoneyLink,
										children: "Add Money"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: wallet_module_default.transactionsSection,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: wallet_module_default.sectionTitle,
									children: "Transactions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: wallet_module_default.transactionsCard,
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletTransactionsSkeleton, {}) : wallet.transactions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: wallet_module_default.emptyState,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
											size: 40,
											strokeWidth: 1.5
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No transaction found" })]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: wallet_module_default.transactionsList,
										children: wallet.transactions.map((transaction) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: wallet_module_default.transactionItem,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: wallet_module_default.txIconWrap,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionIcon, { transaction })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: wallet_module_default.txInfo,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: wallet_module_default.txTitle,
														children: transaction.displayTitle
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: wallet_module_default.txDate,
														children: formatTransactionDate(transaction.createdAt)
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: transaction.isCredit ? wallet_module_default.txAmountPositive : wallet_module_default.txAmountNegative,
													children: [transaction.isCredit ? "+" : "-", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyAmount, { children: formatAmount(transaction.amount) })]
												})
											]
										}, transaction.id))
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: wallet_module_default.footerText,
								children: "ENJOY SEAMLESS ONE TAP PAYMENTS"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = WalletPage;
//#endregion
export { SplitComponent as component };
