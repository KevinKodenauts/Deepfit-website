"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock, Eye, EyeOff, ChevronLeft } from "lucide-react";
import type { useResetPasswordForm } from "@/hooks/useResetPasswordForm";
import styles from "./authDesktop.module.css";

type ResetPasswordDesktopProps = ReturnType<typeof useResetPasswordForm>;

export default function ResetPasswordDesktop({
  router,
  email,
  ready,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showNew,
  setShowNew,
  showConfirm,
  setShowConfirm,
  error,
  loading,
  isFormValid,
  handleSubmit,
}: ResetPasswordDesktopProps) {
  if (!ready) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.topLeft}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
          disabled={loading}
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.branding}>
          <Image
            src="/images/logo/Deepfit-D-Logo.png"
            alt="Deepfit logo"
            width={56}
            height={56}
            className={styles.logoIcon}
            priority
          />
          <span className={styles.brandName}>DEEPFIT</span>
          <span className={styles.tagline}>Wellness Inside Out</span>
        </div>

        <h2 className={styles.welcomeTitle}>Create a new password</h2>
        <p className={styles.welcomeSubtitle}>Set a new password for {email}</p>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="reset-password-desktop">
              New Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIconLeft} size={20} />
              <input
                id="reset-password-desktop"
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                className={styles.inputField}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className={styles.inputIconAction}
                onClick={() => setShowNew(!showNew)}
                tabIndex={-1}
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label
              className={styles.fieldLabel}
              htmlFor="reset-confirm-password-desktop"
            >
              Confirm Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIconLeft} size={20} />
              <input
                id="reset-confirm-password-desktop"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                className={styles.inputField}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className={styles.inputIconAction}
                onClick={() => setShowConfirm(!showConfirm)}
                tabIndex={-1}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className={styles.formError}>{error}</p>}

          <button
            type="submit"
            className={`${styles.primaryBtn} ${
              isFormValid && !loading
                ? styles.primaryBtnEnabled
                : styles.primaryBtnDisabled
            }`}
            disabled={!isFormValid || loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <div className={styles.footerPrompt}>
          Remember your password?
          <Link href="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}
