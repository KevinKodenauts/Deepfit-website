import { REST_API } from "./config";
import { apiRequest } from "./client";

export type WalletTransaction = {
  id: number;
  amount: number;
  transactionType: string;
  description: string;
  referenceId?: string;
  createdAt?: string;
  isCredit: boolean;
  displayTitle: string;
};

export type WalletData = {
  totalBalance: number;
  transactions: WalletTransaction[];
};

type WalletTransactionsResponse = {
  status: boolean;
  total_balance?: number | string;
  data?: Array<{
    id?: number;
    amount?: number | string;
    transaction_type?: string;
    description?: string;
    reference_id?: string;
    created_at?: string;
  }>;
};

function parseAmount(value: unknown): number {
  if (value == null) return 0;
  if (typeof value === "number") return value;
  return Number(value) || 0;
}

function mapTransaction(
  raw: NonNullable<WalletTransactionsResponse["data"]>[number]
): WalletTransaction {
  const transactionType = (raw.transaction_type ?? "").toUpperCase();
  const isCredit = transactionType === "CREDIT";
  const description = raw.description ?? "";
  const lower = description.toLowerCase();

  let displayTitle = description;
  if (!isCredit && (lower.includes("order") || lower.includes("purchase"))) {
    displayTitle = "Order placed";
  } else if (isCredit) {
    displayTitle = "Balance added";
  }

  return {
    id: raw.id ?? 0,
    amount: parseAmount(raw.amount),
    transactionType,
    description,
    referenceId: raw.reference_id,
    createdAt: raw.created_at,
    isCredit,
    displayTitle,
  };
}

export async function getWalletTransactions(): Promise<WalletData> {
  const data = await apiRequest<WalletTransactionsResponse>(
    `${REST_API}/wallet/transactions/`,
    { auth: true }
  );

  return {
    totalBalance: parseAmount(data.total_balance),
    transactions: (data.data ?? []).map(mapTransaction),
  };
}

export async function addMoneyToWallet(amount: number) {
  return apiRequest<{ status: boolean; message?: string }>(
    `${REST_API}/wallet/add-money/`,
    {
      method: "POST",
      body: { amount },
      auth: true,
    }
  );
}
