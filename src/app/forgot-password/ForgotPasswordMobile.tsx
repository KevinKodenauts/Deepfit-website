"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, ChevronLeft } from "lucide-react";
import type { useForgotPasswordForm } from "@/hooks/useForgotPasswordForm";
import styles from "./forgotPassword.module.css";

type ForgotPasswordMobileProps = ReturnType<typeof useForgotPasswordForm>;

export default function ForgotPasswordMobile({
  router,
  email,
  setEmail,
  error,
  loading,
  isFormValid,
  handleSubmit,
}: ForgotPasswordMobileProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
          disabled={loading}
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.headerTitle}>Forgot Password</h1>
        <div className={styles.headerSpacer} />
      </header>

      <div className={styles.container}>
        <div className={styles.branding}>
          <Image
            src="/images/logo/Deepfit-D-Logo.png"
            alt="Deepfit logo"
            width={80}
            height={80}
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
            <label className={styles.fieldLabel} htmlFor="forgot-email-mobile">
              Email
            </label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIconLeft} size={20} />
              <input
                id="forgot-email-mobile"
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
