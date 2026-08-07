import { c as apiRequest, o as REST_API } from "./auth-4WDLQ7fX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-Dscr2CTD.js
function parseAmount(value) {
	if (value == null) return 0;
	if (typeof value === "number") return value;
	return Number(value) || 0;
}
function mapTransaction(raw) {
	const transactionType = (raw.transaction_type ?? "").toUpperCase();
	const isCredit = transactionType === "CREDIT";
	const description = raw.description ?? "";
	const lower = description.toLowerCase();
	let displayTitle = description;
	if (!isCredit && (lower.includes("order") || lower.includes("purchase"))) displayTitle = "Order placed";
	else if (isCredit) displayTitle = "Balance added";
	return {
		id: raw.id ?? 0,
		amount: parseAmount(raw.amount),
		transactionType,
		description,
		referenceId: raw.reference_id,
		createdAt: raw.created_at,
		isCredit,
		displayTitle
	};
}
async function getWalletTransactions() {
	const data = await apiRequest(`${REST_API}/wallet/transactions/`, { auth: true });
	return {
		totalBalance: parseAmount(data.total_balance),
		transactions: (data.data ?? []).map(mapTransaction)
	};
}
async function addMoneyToWallet(amount) {
	return apiRequest(`${REST_API}/wallet/add-money/`, {
		method: "POST",
		body: { amount },
		auth: true
	});
}
//#endregion
export { getWalletTransactions as n, addMoneyToWallet as t };
