"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Copy,
  Share2,
  GitBranch,
  Users,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import styles from "./referral.module.css";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { getCustomerReferralTree } from "@/lib/api/auth";
import type { ReferralCustomer } from "@/lib/api/types";
import { getCustomerId } from "@/lib/auth/session";

export default function ReferralPage() {
  const router = useRouter();
  const { user, isAuthenticated, refreshProfile, isLoading: authLoading } =
    useRequireAuth();
  const [loading, setLoading] = useState(true);
  const [copyMessage, setCopyMessage] = useState("");
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [directReferrals, setDirectReferrals] = useState(0);
  const [referralTree, setReferralTree] = useState<ReferralCustomer[]>([]);

  const referralCode = user?.referralCode || "";

  const loadReferralData = useCallback(async () => {
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

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;

    void loadReferralData();
  }, [authLoading, isAuthenticated, loadReferralData]);

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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={22} />
        </button>
        <div className={styles.headerTitleRow}>
          <h1 className={{...styles.headerTitle, color: "white"}}>Invite &amp; Earn</h1>
          <HelpCircle size={18} className={styles.helpIcon} />
        </div>
        <p className={styles.headerSubtitle}>
          Turn invites into cash! Earn immediately after your friend joins and
          finishes their first task
        </p>
      </header>

      <div className={styles.body}>
        <section className={styles.codeSection}>
          <p className={styles.codeLabel}>Your Referral Code</p>
          <div className={styles.codeRow}>
            <div className={styles.codeBox}>
              {loading && !referralCode
                ? "Loading..."
                : referralCode || "Generating..."}
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopyReferral}
              disabled={!referralCode}
              aria-label="Copy referral code"
            >
              <Copy size={18} />
            </button>
            <button
              type="button"
              className={styles.shareBtn}
              onClick={handleShareReferral}
              disabled={!referralCode}
              aria-label="Share referral code"
            >
              <Share2 size={18} />
            </button>
          </div>
          {copyMessage && <p className={styles.copyMessage}>{copyMessage}</p>}
        </section>

        <section className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Referrals</span>
            <span className={`${styles.statValue} ${styles.statBlue}`}>
              {loading ? "—" : totalReferrals}
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Direct Referrals</span>
            <span className={`${styles.statValue} ${styles.statGreen}`}>
              {loading ? "—" : directReferrals}
            </span>
          </div>
        </section>

        <section className={styles.treeHeader}>
          <div className={styles.treeHeaderLeft}>
            <div className={styles.treeIconWrap}>
              <GitBranch size={16} />
            </div>
            <span className={styles.treeTitle}>Referral Tree</span>
          </div>
          <span className={styles.treeHint}>Tap to view full network</span>
        </section>

        <section className={styles.treeContent}>
          {loading ? (
            <p className={styles.loadingText}>Loading referrals...</p>
          ) : referralTree.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconWrap}>
                <Users size={48} strokeWidth={1.5} />
              </div>
              <h2>No Referrals Yet</h2>
              <p>Start inviting friends to build your referral network!</p>
            </div>
          ) : (
            <ul className={styles.referralList}>
              {referralTree.map((referral) => (
                <li key={referral.id} className={styles.referralCard}>
                  <div className={styles.referralAvatar}>
                    {referral.customerName.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.referralInfo}>
                    <span className={styles.referralName}>
                      {referral.customerName}
                    </span>
                    <span className={styles.referralMeta}>
                      {referral.referralCode}
                      {referral.joinedDate
                        ? ` • Joined ${referral.joinedDate}`
                        : ""}
                    </span>
                  </div>
                  {referral.referrals && referral.referrals.length > 0 && (
                    <ChevronRight size={18} className={styles.referralArrow} />
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
