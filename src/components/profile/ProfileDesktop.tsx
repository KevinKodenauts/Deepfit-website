import type { useProfilePage } from "@/hooks/useProfilePage";
import { Link } from "@tanstack/react-router";
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
import styles from "@/styles/profile/profileDesktop.module.css";
import { ProfileSkeleton } from "@/components/skeleton/PageSkeletons";
import { Skeleton } from "@/components/ui/skeleton";
import { openCrispChat } from "@/lib/analytics";
import {
  formatRewardDate,
  formatRewardLedgerLabel,
} from "@/lib/api/rewards";

type ProfileData = ReturnType<typeof useProfilePage>;

export function ProfileDesktop(profile: ProfileData) {
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
    rewardsAedValue,
    pointsPerAed,
    rewardLedger,
    pendingCredits,
    initials,
    requireAuth,
    handleCopyReferral,
    handleShareReferral,
    handleLogout,
  } = profile;

  if (isLoading) {
    return (
      <div className={styles.shell}>
        <ProfileSkeleton />
      </div>
    );
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
            <Link to="/login" className={styles.guestBtn}>
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
              {displayEmail ? (
                <p className={styles.profileEmail}>
                  <Mail size={14} />
                  {displayEmail}
                </p>
              ) : null}
              {displayPhone ? (
                <p className={styles.profilePhone}>
                  <Phone size={14} />
                  {displayPhone}
                </p>
              ) : null}
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
            {/* Quick actions (temporarily hidden)
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
                className={`${styles.quickCard} ${styles.quickCardFull}`}
                onClick={() => requireAuth("/orders")}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  <span className={styles.quickIconWrap}>
                    <ShoppingBag size={22} />
                  </span>
                  <span className={styles.quickLabel}>Your orders</span>
                </div>

                <span className={styles.quickHint}>
                  Track and manage purchases
                </span>
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
            */}

            {/* <section className={styles.referralCard}>
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
                  <span
                    className={`${styles.statValue} ${styles.statValueGreen}`}
                  >
                    {referralStats.totalReferrals}
                  </span>
                  <span className={styles.statLabel}>Referred</span>
                </div>
                <div className={styles.statCard}>
                  <span
                    className={`${styles.statValue} ${styles.statValueGreen}`}
                  >
                    {referralStats.directInvites}
                  </span>
                  <span className={styles.statLabel}>Direct invites</span>
                </div>
              </div>

              <div className={styles.codeRow}>
                <div>
                  <p className={styles.codeLabel}>Your referral code</p>
                  <p className={styles.codeValue}>
                    {profileLoading && !referralCode ? (
                      <Skeleton className="h-5 w-28" />
                    ) : (
                      referralCode || "Generating..."
                    )}
                  </p>
                </div>
                <div className={styles.codeActions}>
                  <button
                    type="button"
                    className={styles.codeBtn}
                    onClick={() => void handleCopyReferral()}
                    disabled={!referralCode}
                    aria-label="Copy referral code"
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    type="button"
                    className={styles.codeBtn}
                    onClick={() => void handleShareReferral()}
                    disabled={!referralCode}
                    aria-label="Share referral code"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {copyMessage ? (
                <p className={styles.copyMessage}>{copyMessage}</p>
              ) : null}
            </section> */}

            {isAuthenticated ? (
              <section className={styles.rewardsSection}>
                <h3 className={styles.rewardsTitle}>REWARD POINTS</h3>
                <div className={styles.rewardsGrid}>
                  <div className={styles.rewardsStatCard}>
                    <span className={styles.rewardsStatValue}>
                      {profileLoading ? (
                        <Skeleton className="h-7 w-16" />
                      ) : (
                        totalRewards
                      )}
                    </span>
                    <span className={styles.rewardsStatLabel}>
                      Available points
                    </span>
                  </div>
                  <div className={styles.rewardsStatCard}>
                    <span className={styles.rewardsStatValue}>
                      {profileLoading ? (
                        <Skeleton className="h-7 w-16" />
                      ) : (
                        <>AED {rewardsAedValue}</>
                      )}
                    </span>
                    <span className={styles.rewardsStatLabel}>
                      Redeemable value
                    </span>
                  </div>
                </div>
                <p className={styles.rewardsHint}>
                  Earn 1 point per 1 AED spent. Redeem {pointsPerAed} points =
                  1 AED at checkout. Points expire after 1 year.
                </p>

                {pendingCredits.length > 0 ? (
                  <div className={styles.rewardsHistory}>
                    <h4 className={styles.rewardsHistoryTitle}>
                      Pending credits
                    </h4>
                    <ul className={styles.rewardsHistoryList}>
                      {pendingCredits.map((row) => (
                        <li key={`pending-${row.id}`} className={styles.rewardsHistoryItem}>
                          <div className={styles.rewardsHistoryMain}>
                            <span className={styles.rewardsHistoryLabel}>
                              Pending earn
                            </span>
                            <span className={styles.rewardsHistoryMeta}>
                              {row.reason === "whey_immediate"
                                ? "After payment"
                                : "After return window"}
                              {row.eligible_at
                                ? ` · ${formatRewardDate(row.eligible_at)}`
                                : ""}
                              {row.order_id ? ` · Order #${row.order_id}` : ""}
                            </span>
                          </div>
                          <span
                            className={`${styles.rewardsHistoryPoints} ${styles.rewardsHistoryCredit}`}
                          >
                            +{row.points}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className={styles.rewardsHistory}>
                  <h4 className={styles.rewardsHistoryTitle}>Points history</h4>
                  {profileLoading ? (
                    <div className={styles.rewardsHistoryEmpty}>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="mt-2 h-4 w-4/5" />
                    </div>
                  ) : rewardLedger.length === 0 ? (
                    <p className={styles.rewardsHistoryEmpty}>
                      No earn or spend activity yet.
                    </p>
                  ) : (
                    <ul className={styles.rewardsHistoryList}>
                      {rewardLedger.map((entry) => {
                        const type = (entry.type || "").toUpperCase();
                        const isCredit = type === "CREDIT" || type === "ADJUST";
                        const isDebit = type === "DEBIT" || type === "EXPIRE";
                        const sign = isDebit ? "−" : isCredit ? "+" : "";
                        return (
                          <li
                            key={entry.id}
                            className={styles.rewardsHistoryItem}
                          >
                            <div className={styles.rewardsHistoryMain}>
                              <span className={styles.rewardsHistoryLabel}>
                                {formatRewardLedgerLabel(entry.type)}
                              </span>
                              <span className={styles.rewardsHistoryMeta}>
                                {entry.description || "Reward points"}
                                {entry.createdAt
                                  ? ` · ${formatRewardDate(entry.createdAt)}`
                                  : ""}
                                {entry.orderId
                                  ? ` · Order #${entry.orderId}`
                                  : ""}
                              </span>
                            </div>
                            <span
                              className={`${styles.rewardsHistoryPoints} ${
                                isDebit
                                  ? styles.rewardsHistoryDebit
                                  : styles.rewardsHistoryCredit
                              }`}
                            >
                              {sign}
                              {entry.points}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </section>
            ) : null}

            <section className={styles.policySection}>
              <h3 className={styles.policyTitle}>POLICIES</h3>
              <div className={styles.policyGrid}>
                <Link
                  to="/policies/$slug"
                  params={{ slug: "terms" }}
                  className={styles.policyCard}
                >
                  <FileText size={18} className={styles.policyIcon} />
                  Terms and conditions
                </Link>
                <Link
                  to="/policies/$slug"
                  params={{ slug: "return" }}
                  className={styles.policyCard}
                >
                  <PackageX size={18} className={styles.policyIcon} />
                  Returns policy
                </Link>
                <Link
                  to="/policies/$slug"
                  params={{ slug: "refund" }}
                  className={styles.policyCard}
                >
                  <CircleDollarSign size={18} className={styles.policyIcon} />
                  Refunds policy
                </Link>
                <Link
                  to="/policies/$slug"
                  params={{ slug: "privacy" }}
                  className={styles.policyCard}
                >
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
    </div>
  );
}
