import { apiRequest } from "@/lib/api/client";
import { portalUrl } from "@/lib/api/config";

export const POINTS_PER_AED_REDEEM = 10; // 10 points = 1 AED
export const POINTS_PER_AED_EARN = 1; // 1 AED cash = 1 point
export const MIN_POINTS_TO_REDEEM = 10;

export type RewardSettings = {
  id?: number;
  min_points_to_redeem?: number;
  points_expiry_days?: number;
  min_purchase_for_redemption?: number;
  points_to_currency_ratio?: number;
  points_per_aed_earn?: number;
  points_per_aed_earn_reduced?: number;
  redemptionBasedOn?: string;
  maxRedemptionAmount?: string;
};

export type RewardLedgerEntry = {
  id: number;
  type: string;
  points: number;
  remainingPoints?: number;
  expiresAt?: string | null;
  description?: string;
  orderId?: number | null;
  createdAt?: string | null;
};

export type RewardPendingCredit = {
  id: number;
  points: number;
  eligible_at?: string;
  reason?: string;
  order_id?: number;
};

export type RewardPointsResponse = {
  status: boolean;
  pointsBalance?: number;
  referralPoints?: number;
  pendingCredits?: RewardPendingCredit[];
  ledger?: RewardLedgerEntry[];
  rewardSettings?: RewardSettings;
};

export function formatRewardLedgerLabel(type: string): string {
  const t = (type || "").toUpperCase();
  if (t === "CREDIT") return "Earned";
  if (t === "DEBIT") return "Spent";
  if (t === "EXPIRE") return "Expired";
  if (t === "ADJUST") return "Adjusted";
  return type || "Update";
}

export function formatRewardDate(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function pointsToAed(points: number): number {
  const p = Math.max(0, Math.floor(points));
  return Math.floor(p / POINTS_PER_AED_REDEEM);
}

export function aedToPoints(aed: number): number {
  return Math.max(0, Math.floor(aed)) * POINTS_PER_AED_REDEEM;
}

export function clampRedeemablePoints(
  available: number,
  maxAedPayable: number,
): number {
  const maxByBalance = Math.floor(Math.max(0, available) / 10) * 10;
  const maxByOrder = aedToPoints(Math.max(0, maxAedPayable));
  return Math.min(maxByBalance, maxByOrder);
}

export async function getRewardSettings() {
  return apiRequest<{
    status: boolean;
    rewardSettings?: RewardSettings;
    rewardSettingList?: RewardSettings[];
  }>(portalUrl("/rewardsettings"), { method: "GET", auth: false });
}

export async function getCustomerRewardPoints() {
  return apiRequest<RewardPointsResponse>(portalUrl("/customerrewardpoints"), {
    method: "GET",
    auth: true,
  });
}
