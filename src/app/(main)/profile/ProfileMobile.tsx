"use client";

import Link from "next/link";
import {
  ChevronLeft,
  Pencil,
  Phone,
  Wallet,
  ShoppingBag,
  GitBranch,
  User,
  Lock,
  Receipt,
  Heart,
  MapPin,
  FileText,
  PackageX,
  CircleDollarSign,
  Shield,
  LogOut,
  Copy,
  Share2,
  Trash2,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { useSheetOrNavigate } from "@/hooks/useSheetOrNavigate";
import { useProfilePage } from "@/hooks/useProfilePage";
import { openCrispChat } from "@/lib/analytics";
import ProfileModals from "./ProfileModals";
import styles from "./profile.module.css";

export default function ProfileMobile() {
  const profile = useProfilePage();
  const { openOrNavigate } = useSheetOrNavigate();

  const {
    router,
    isAuthenticated,
    isLoading,
    profileLoading,
    copyMessage,
    referralStats,
    displayPhone,
    referralCode,
    totalRewards,
    user,
    setShowUpdateProfile,
    setShowChangePassword,
    requireAuth,
    handleCopyReferral,
    handleShareReferral,
    handleLogout,
  } = profile;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.pageTitle}>Profile</h1>
        {isLoading ? (
          <div className={styles.headerSpacer} />
        ) : isAuthenticated ? (
          <button
            type="button"
            className={styles.editBtn}
            onClick={() =>
              openOrNavigate("/profile/edit", () => setShowUpdateProfile(true))
            }
            aria-label="Edit profile"
          >
            <Pencil size={20} />
          </button>
        ) : (
          <div className={styles.headerSpacer} />
        )}
      </header>

      <section className={styles.accountSection}>
        <h2 className={styles.accountTitle}>Your account</h2>
        {isLoading ? null : isAuthenticated ? (
          <>
            {displayPhone ? (
              <p className={styles.accountPhone}>
                <Phone size={16} />
                <span>{displayPhone}</span>
              </p>
            ) : (
              <p className={styles.accountSubtitle}>
                {user?.name || user?.customerName || "Welcome back"}
              </p>
            )}

            <div className={styles.inviteCard}>
              <div className={styles.inviteHeader}>
                <h3 className={styles.inviteTitle}>Invite &amp; Earn 🎁</h3>
                <HelpCircle size={16} className={styles.inviteHelp} />
              </div>
              <p className={styles.inviteDescription}>
                Turn invites into cash! Earn immediately after your friend joins
                and finishes their first task
              </p>

              <div className={styles.rewardsCard}>
                <p className={styles.rewardsLabel}>💰 Rewards Earned</p>
                <div className={styles.rewardsStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{totalRewards}</span>
                    <span className={styles.statLabel}>Total Rewards</span>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.statItem}>
                    <span className={`${styles.statValue} ${styles.statGreen}`}>
                      {referralStats.totalReferrals}
                    </span>
                    <span className={styles.statLabel}>Referred</span>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.statItem}>
                    <span className={`${styles.statValue} ${styles.statGreen}`}>
                      {referralStats.directInvites}
                    </span>
                    <span className={styles.statLabel}>Direct Invites</span>
                  </div>
                </div>
              </div>

              <div className={styles.referralCodeBox}>
                <div>
                  <p className={styles.referralCodeLabel}>Your Referral Code</p>
                  <p className={styles.referralCode}>
                    {profileLoading && !referralCode
                      ? "Loading..."
                      : referralCode || "Generating..."}
                  </p>
                </div>
                <div className={styles.referralActions}>
                  <button
                    type="button"
                    className={styles.referralActionBtn}
                    onClick={handleCopyReferral}
                    disabled={!referralCode}
                    aria-label="Copy referral code"
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    type="button"
                    className={styles.referralActionBtn}
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
            </div>

            <div className={styles.quickActions}>
              <button
                type="button"
                className={styles.quickActionCard}
                onClick={() => requireAuth("/wallet")}
              >
                <Wallet size={22} />
                <span>Wallet</span>
              </button>
              <button
                type="button"
                className={styles.quickActionCard}
                onClick={() => requireAuth("/orders")}
              >
                <ShoppingBag size={22} />
                <span>Your Order</span>
              </button>
              <button
                type="button"
                className={styles.quickActionCard}
                onClick={() => requireAuth("/profile/referral")}
              >
                <GitBranch size={22} />
                <span>Referral Tree</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <p className={styles.accountSubtitle}>
              Log in or sign up to view your complete profile
            </p>
            <Link href="/login" className={styles.continueBtn}>
              Continue
            </Link>
          </>
        )}
      </section>

      <section className={styles.listSection}>
        <h3 className={styles.sectionTitle}>YOUR INFORMATION</h3>
        <div className={styles.listItems}>
          {!isLoading && isAuthenticated && (
            <>
              <button
                type="button"
                className={styles.listItem}
                onClick={() =>
                  openOrNavigate("/profile/edit", () => setShowUpdateProfile(true))
                }
              >
                <User size={20} className={styles.listIcon} />
                <span>Update Profile</span>
              </button>
              <button
                type="button"
                className={styles.listItem}
                onClick={() =>
                  openOrNavigate("/profile/change-password", () =>
                    setShowChangePassword(true)
                  )
                }
              >
                <Lock size={20} className={styles.listIcon} />
                <span>Change Password</span>
              </button>
            </>
          )}
          <button
            type="button"
            className={styles.listItem}
            onClick={() => requireAuth("/orders")}
          >
            <Receipt size={20} className={styles.listIcon} />
            <span>Your orders</span>
          </button>
          <button
            type="button"
            className={styles.listItem}
            onClick={() => requireAuth("/profile/wishlist")}
          >
            <Heart size={20} className={styles.listIcon} />
            <span>Your wishlist</span>
          </button>
          <button
            type="button"
            className={styles.listItem}
            onClick={() => requireAuth("/profile/addresses")}
          >
            <MapPin size={20} className={styles.listIcon} />
            <span>Address Book</span>
          </button>
          <button
            type="button"
            className={styles.listItem}
            onClick={() => openCrispChat()}
          >
            <MessageCircle size={20} className={styles.listIcon} />
            <span>Live Chat Support</span>
          </button>
        </div>
      </section>

      <section className={styles.listSection}>
        <h3 className={styles.sectionTitle}>POLICY</h3>
        <div className={styles.listItems}>
          <Link href="/policies/terms" className={styles.listItem}>
            <FileText size={20} className={styles.listIcon} />
            <span>Terms and conditions</span>
          </Link>
          <Link href="/policies/return" className={styles.listItem}>
            <PackageX size={20} className={styles.listIcon} />
            <span>Returns policy</span>
          </Link>
          <Link href="/policies/refund" className={styles.listItem}>
            <CircleDollarSign size={20} className={styles.listIcon} />
            <span>Refunds policy</span>
          </Link>
          <Link href="/policies/privacy" className={styles.listItem}>
            <Shield size={20} className={styles.listIcon} />
            <span>Privacy policy</span>
          </Link>
        </div>
      </section>

      {!isLoading && isAuthenticated && (
        <section className={styles.listSection}>
          <h3 className={styles.sectionTitle}>OTHER INFORMATION</h3>
          <div className={styles.listItems}>
            <button
              type="button"
              className={styles.listItem}
              onClick={handleLogout}
            >
              <LogOut size={20} className={styles.listIcon} />
              <span>Log out</span>
            </button>
            <button type="button" className={styles.deleteAccountBtn}>
              <Trash2 size={20} />
              <span>Delete Account</span>
            </button>
          </div>
        </section>
      )}

      <footer className={styles.footer}>
        <p className={styles.brandName}>Deepfit</p>
        <p className={styles.version}>v1.0.16 (1)</p>
      </footer>

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
