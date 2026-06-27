"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, ChevronLeft } from "lucide-react";
import type { useForgotPasswordForm } from "@/hooks/useForgotPasswordForm";
import styles from "./authDesktop.module.css";

type ForgotPasswordDesktopProps = ReturnType<typeof useForgotPasswordForm>;

export default function ForgotPasswordDesktop({
  router,
  email,
  setEmail,
  error,
  loading,
  isFormValid,
  handleSubmit,
}: ForgotPasswordDesktopProps) {
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

        <h2 className={styles.welcomeTitle}>Reset your password</h2>
        <p className={styles.welcomeSubtitle}>
          Enter the email linked to your account. We will send you a
          verification code.
        </p>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="forgot-email-desktop">
              Email
            </label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIconLeft} size={20} />
              <input
                id="forgot-email-desktop"
                type="email"
                placeholder="Email"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
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
            {loading ? "Sending..." : "Send OTP"}
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
