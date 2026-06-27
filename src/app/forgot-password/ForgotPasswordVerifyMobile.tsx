"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { useForgotPasswordVerifyForm } from "@/hooks/useForgotPasswordVerifyForm";
import styles from "./forgotPassword.module.css";

type ForgotPasswordVerifyMobileProps = ReturnType<
  typeof useForgotPasswordVerifyForm
>;

export default function ForgotPasswordVerifyMobile({
  router,
  email,
  ready,
  otp,
  countdown,
  error,
  loading,
  statusText,
  inputRefs,
  isOtpComplete,
  handleChange,
  handleKeyDown,
  handleResend,
  handleVerify,
  otpLength,
}: ForgotPasswordVerifyMobileProps) {
  if (!ready) {
    return null;
  }

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
        <h1 className={styles.headerTitle}>Verify Email</h1>
        <div className={styles.headerSpacer} />
      </header>

      <div className={styles.container}>
        <p className={styles.instruction}>
          We sent a {otpLength}-digit verification code to
        </p>
        <p className={styles.email}>{email}</p>

        <div className={styles.otpRow}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={6}
              value={digit}
              disabled={loading}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`${styles.otpInput} ${
                digit ? styles.otpInputFilled : ""
              }`}
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        {error && <p className={styles.formError}>{error}</p>}

        <div className={styles.resend}>
          {countdown > 0 ? (
            <span>Resend OTP in {countdown} s</span>
          ) : (
            <button
              type="button"
              className={styles.resendActive}
              onClick={handleResend}
              disabled={loading}
            >
              Resend OTP
            </button>
          )}
        </div>

        {statusText && <p className={styles.statusText}>{statusText}</p>}

        <button
          type="button"
          className={`${styles.primaryBtn} ${
            isOtpComplete && !loading
              ? styles.primaryBtnEnabled
              : styles.primaryBtnDisabled
          }`}
          onClick={handleVerify}
          disabled={!isOtpComplete || loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className={styles.footerPrompt}>
          Wrong email?
          <Link href="/forgot-password">Change email</Link>
        </div>
      </div>
    </div>
  );
}
