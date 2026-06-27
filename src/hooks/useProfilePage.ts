"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getCustomerReferralTree } from "@/lib/api/auth";
import {
  getPrivacyPolicy,
  getRefundPolicy,
  getReturnPolicy,
  getTermsAndConditions,
} from "@/lib/api/policy";

export type PolicyKey = "terms" | "returns" | "refunds" | "privacy";

export const POLICY_CONFIG: Record<
  PolicyKey,
  { title: string; fetch: () => Promise<string | null> }
> = {
  terms: { title: "Terms and Conditions", fetch: getTermsAndConditions },
  returns: { title: "Returns Policy", fetch: getReturnPolicy },
  refunds: { title: "Refunds Policy", fetch: getRefundPolicy },
  privacy: { title: "Privacy Policy", fetch: getPrivacyPolicy },
};

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
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, refreshProfile } = useAuth();
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    directInvites: 0,
  });

  const displayName = user?.name || user?.customerName || "";
  const displayEmail = user?.customerEmail || user?.email || "";
  const displayPhone = formatProfilePhone(user?.phone || user?.customerMobile || "");
  const referralCode = user?.referralCode || "";
  const totalRewards = user?.referralPoints ?? 0;
  const initials = getProfileInitials(displayName || displayEmail || "User");

  const loadProfile = useCallback(async () => {
    if (!isAuthenticated || !user?.id) return;

    setProfileLoading(true);
    try {
      await refreshProfile();

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
  }, [isAuthenticated, refreshProfile, user?.id]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const requireAuth = useCallback(
    (href: string) => {
      if (!isAuthenticated) {
        router.replace("/login");
        return;
      }
      router.push(href);
    },
    [isAuthenticated, router]
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
    router.replace("/login");
  };

  return {
    router,
    user,
    isAuthenticated,
    isLoading,
    activePolicy,
    setActivePolicy,
    showUpdateProfile,
    setShowUpdateProfile,
    showChangePassword,
    setShowChangePassword,
    profileLoading,
    copyMessage,
    referralStats,
    displayName,
    displayEmail,
    displayPhone,
    referralCode,
    totalRewards,
    initials,
    loadProfile,
    requireAuth,
    handleCopyReferral,
    handleShareReferral,
    handleLogout,
  };
}
