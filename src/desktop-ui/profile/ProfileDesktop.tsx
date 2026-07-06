"use client";

import Link from "next/link";
import {
  CircleDollarSign,
  Copy,
  FileText,
  GitBranch,
  Heart,
  Lock,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  PackageX,
  Phone,
  Receipt,
  Share2,
  Shield,
  ShoppingBag,
  Trash2,
  User,
  Wallet,
} from "lucide-react";
import { useProfilePage } from "@/hooks/useProfilePage";
import { openCrispChat } from "@/lib/analytics";
import ProfileModals from "@/app/(main)/profile/ProfileModals";
import styles from "./profileDesktop.module.css";

export default function ProfileDesktop() {
  const profile = useProfilePage();

  const {
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
    initials,
    requireAuth,
    handleCopyReferral,
    handleShareReferral,
    handleLogout,
  } = profile;

  if (isLoading) {
    return <div className={styles.shell} />;
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.shell}>
        <div className={styles.inner}>
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>My Account</h1>
            <p className={styles.pageSubtitle}>
              Sign in to manage orders, wallet, and referrals
            </p>
          </header>

          <div className={styles.guestCard}>
            <div className={styles.guestAvatar}>DF</div>
            <h2 className={styles.guestTitle}>Welcome to Deepfit</h2>
            <p className={styles.guestText}>
              Log in or create an account to view your profile, track orders,
              and earn referral rewards.
            </p>
            <Link href="/login" className={styles.guestBtn}>
              Continue to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <div className={styles.inner}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>My Account</h1>
          <p className={styles.pageSubtitle}>
            Manage your profile, orders, and rewards
          </p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.profileCard}>
              <div className={styles.avatar}>{initials}</div>
              <h2 className={styles.profileName}>
                {displayName || "Deepfit Member"}
              </h2>
              {displayEmail && (
                <p className={styles.profileEmail}>
                  <Mail size={14} />
                  {displayEmail}
                </p>
              )}
              {displayPhone && (
                <p className={styles.profilePhone}>
                  <Phone size={14} />
                  {displayPhone}
                </p>
              )}
              <button
                type="button"
                className={styles.editBtn}
                onClick={() => requireAuth("/profile/edit")}
              >
                Edit profile
              </button>
            </div>

            <nav className={styles.navCard} aria-label="Account navigation">
              <p className={styles.navSectionLabel}>YOUR INFORMATION</p>
              <button
                type="button"
                className={styles.navItem}
                onClick={() => requireAuth("/profile/edit")}
              >
                <User size={18} className={styles.navIcon} />
                Update profile
              </button>
              <button
                type="button"
                className={styles.navItem}
                onClick={() => requireAuth("/profile/change-password")}
              >
                <Lock size={18} className={styles.navIcon} />
                Change password
              </button>
              <button
                type="button"
                className={styles.navItem}
                onClick={() => requireAuth("/orders")}
              >
                <Receipt size={18} className={styles.navIcon} />
                Your orders
              </button>
              <button
                type="button"
                className={styles.navItem}
                onClick={() => requireAuth("/profile/wishlist")}
              >
                <Heart size={18} className={styles.navIcon} />
                Your wishlist
              </button>
              <button
                type="button"
                className={styles.navItem}
                onClick={() => requireAuth("/profile/addresses")}
              >
                <MapPin size={18} className={styles.navIcon} />
                Address book
              </button>
              <button
                type="button"
                className={styles.navItem}
                onClick={() => openCrispChat()}
              >
                <MessageCircle size={18} className={styles.navIcon} />
                Live chat support
              </button>

              <p className={styles.navSectionLabel}>ACCOUNT</p>
              <button
                type="button"
                className={styles.navItem}
                onClick={handleLogout}
              >
                <LogOut size={18} className={styles.navIcon} />
                Log out
              </button>
              <button
                type="button"
                className={`${styles.navItem} ${styles.navItemDanger}`}
              >
                <Trash2 size={18} className={styles.navIcon} />
                Delete account
              </button>
            </nav>
          </aside>

          <div className={styles.main}>
            <div className={styles.quickGrid}>
              <button
                type="button"
                className={styles.quickCard}
                onClick={() => requireAuth("/wallet")}
              >
                <span className={styles.quickIconWrap}>
                  <Wallet size={22} />
                </span>
                <span className={styles.quickLabel}>Wallet</span>
                <span className={styles.quickHint}>View balance &amp; top up</span>
              </button>
              <button
                type="button"
                className={styles.quickCard}
                onClick={() => requireAuth("/orders")}
              >
                <span className={styles.quickIconWrap}>
                  <ShoppingBag size={22} />
                </span>
                <span className={styles.quickLabel}>Your orders</span>
                <span className={styles.quickHint}>Track and manage purchases</span>
              </button>
              <button
                type="button"
                className={styles.quickCard}
                onClick={() => requireAuth("/profile/referral")}
              >
                <span className={styles.quickIconWrap}>
                  <GitBranch size={22} />
                </span>
                <span className={styles.quickLabel}>Referral tree</span>
                <span className={styles.quickHint}>See your invite network</span>
              </button>
            </div>

            <section className={styles.referralCard}>
              <div className={styles.referralHeader}>
                <h2 className={styles.referralTitle}>Invite &amp; Earn</h2>
              </div>
              <p className={styles.referralDescription}>
                Turn invites into cash! Earn immediately after your friend joins
                and finishes their first task.
              </p>

              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <span className={styles.statValue}>{totalRewards}</span>
                  <span className={styles.statLabel}>Total rewards</span>
                </div>
                <div className={styles.statCard}>
                  <span className={`${styles.statValue} ${styles.statValueGreen}`}>
                    {referralStats.totalReferrals}
                  </span>
                  <span className={styles.statLabel}>Referred</span>
                </div>
                <div className={styles.statCard}>
                  <span className={`${styles.statValue} ${styles.statValueGreen}`}>
                    {referralStats.directInvites}
                  </span>
                  <span className={styles.statLabel}>Direct invites</span>
                </div>
              </div>

              <div className={styles.codeRow}>
                <div>
                  <p className={styles.codeLabel}>Your referral code</p>
                  <p className={styles.codeValue}>
                    {profileLoading && !referralCode
                      ? "Loading..."
                      : referralCode || "Generating..."}
                  </p>
                </div>
                <div className={styles.codeActions}>
                  <button
                    type="button"
                    className={styles.codeBtn}
                    onClick={handleCopyReferral}
                    disabled={!referralCode}
                    aria-label="Copy referral code"
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    type="button"
                    className={styles.codeBtn}
                    onClick={handleShareReferral}
                    disabled={!referralCode}
                    aria-label="Share referral code"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {copyMessage && (
                <p className={styles.copyMessage}>{copyMessage}</p>
              )}
            </section>

            <section className={styles.policySection}>
              <h3 className={styles.policyTitle}>POLICIES</h3>
              <div className={styles.policyGrid}>
                <Link href="/policies/terms" className={styles.policyCard}>
                  <FileText size={18} className={styles.policyIcon} />
                  Terms and conditions
                </Link>
                <Link href="/policies/return" className={styles.policyCard}>
                  <PackageX size={18} className={styles.policyIcon} />
                  Returns policy
                </Link>
                <Link href="/policies/refund" className={styles.policyCard}>
                  <CircleDollarSign size={18} className={styles.policyIcon} />
                  Refunds policy
                </Link>
                <Link href="/policies/privacy" className={styles.policyCard}>
                  <Shield size={18} className={styles.policyIcon} />
                  Privacy policy
                </Link>
              </div>
            </section>

            <footer className={styles.footer}>
              <p className={styles.footerBrand}>Deepfit</p>
              <p className={styles.footerVersion}>v1.0.16 (1)</p>
            </footer>
          </div>
        </div>
      </div>

      <ProfileModals
        showUpdateProfile={profile.showUpdateProfile}
        setShowUpdateProfile={profile.setShowUpdateProfile}
        showChangePassword={profile.showChangePassword}
        setShowChangePassword={profile.setShowChangePassword}
        loadProfile={profile.loadProfile}
      />
    </div>
  );
}
