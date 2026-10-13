import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getCustomerReferralTree } from "@/lib/api/auth";
import {
  POINTS_PER_AED_REDEEM,
  getCustomerRewardPoints,
  type RewardLedgerEntry,
  type RewardPendingCredit,
} from "@/lib/api/rewards";

export function formatProfilePhone(phone: string) {
  if (!phone) return "";
  if (phone.startsWith("+")) return phone;
  return `+${phone}`;
}

export function getProfileInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function useProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout, refreshProfile } = useAuth();
  const [profileLoading, setProfileLoading] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [pointsBalance, setPointsBalance] = useState(0);
  const [rewardLedger, setRewardLedger] = useState<RewardLedgerEntry[]>([]);
  const [pendingCredits, setPendingCredits] = useState<RewardPendingCredit[]>(
    [],
  );
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    directInvites: 0,
  });

  const displayName = user?.name || user?.customerName || "";
  const displayEmail = user?.customerEmail || user?.email || "";
  const displayPhone = formatProfilePhone(user?.phone || user?.customerMobile || "");
  const referralCode = user?.referralCode || "";
  const totalRewards = pointsBalance || user?.referralPoints || 0;
  const rewardsAedValue = Math.floor(totalRewards / POINTS_PER_AED_REDEEM);
  const initials = getProfileInitials(displayName || displayEmail || "User");

  const loadProfile = useCallback(async () => {
    if (!isAuthenticated || !user?.id) return;

    setProfileLoading(true);
    try {
      await refreshProfile();

      try {
        const rewards = await getCustomerRewardPoints();
        if (rewards?.status) {
          const bal = Number(
            rewards.pointsBalance ?? rewards.referralPoints ?? 0,
          );
          if (Number.isFinite(bal)) setPointsBalance(bal);
          setRewardLedger(
            Array.isArray(rewards.ledger) ? rewards.ledger : [],
          );
          setPendingCredits(
            Array.isArray(rewards.pendingCredits)
              ? rewards.pendingCredits
              : [],
          );
        }
      } catch {
        const fallback = Number(user?.referralPoints ?? 0);
        if (Number.isFinite(fallback)) setPointsBalance(fallback);
      }

      const tree = await getCustomerReferralTree(user.id);
      if (tree?.data) {
        setReferralStats({
          totalReferrals: tree.data.totalReferrals ?? 0,
          directInvites: tree.data.rootCustomer?.totalDirectReferrals ?? 0,
        });
      }
    } catch {
      // Keep cached user data on failure.
    } finally {
      setProfileLoading(false);
    }
  }, [isAuthenticated, refreshProfile, user?.id, user?.referralPoints]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const requireAuth = useCallback(
    (to: string) => {
      if (!isAuthenticated) {
        void navigate({ to: "/login" });
        return;
      }
      void navigate({ to: to as "/profile" });
    },
    [isAuthenticated, navigate]
  );

  const handleCopyReferral = async () => {
    if (!referralCode) return;

    try {
      await navigator.clipboard.writeText(referralCode);
      setCopyMessage("Referral code copied");
      setTimeout(() => setCopyMessage(""), 2000);
    } catch {
      setCopyMessage("Could not copy code");
      setTimeout(() => setCopyMessage(""), 2000);
    }
  };

  const handleShareReferral = async () => {
    if (!referralCode) return;

    const shareText = `Join Deepfit using my referral code: ${referralCode}\n\nSign up and start your fitness journey today!`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, title: "Deepfit Referral" });
      } catch {
        // User cancelled share sheet.
      }
      return;
    }

    await handleCopyReferral();
  };

  const handleLogout = () => {
    logout();
    void navigate({ to: "/login" });
  };

  return {
    navigate,
    user,
    isAuthenticated,
    isLoading,
    profileLoading,
    copyMessage,
    referralStats,
    displayName,
    displayEmail,
    displayPhone,
    referralCode,
    totalRewards,
    rewardsAedValue,
    pointsPerAed: POINTS_PER_AED_REDEEM,
    rewardLedger,
    pendingCredits,
    initials,
    requireAuth,
    handleCopyReferral,
    handleShareReferral,
    handleLogout,
  };
}
