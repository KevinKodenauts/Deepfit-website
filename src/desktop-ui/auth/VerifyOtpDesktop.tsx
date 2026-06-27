"use client";

import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import type { useVerifyOtpForm } from "@/hooks/useVerifyOtpForm";
import styles from "./authDesktop.module.css";

type VerifyOtpDesktopProps = ReturnType<typeof useVerifyOtpForm>;

export default function VerifyOtpDesktop({
  router,
  otp,
  countdown,
  error,
  loading,
  statusText,
  pendingSignup,
  inputRefs,
  isOtpComplete,
  handleChange,
  handleKeyDown,
  handleResend,
  handleVerify,
  otpLength,
}: VerifyOtpDesktopProps) {
  if (!pendingSignup) {
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

        <h2 className={styles.welcomeTitle}>Verify Email</h2>
        <p className={styles.instruction}>
          We sent a {otpLength}-digit verification code to
        </p>
        <p className={styles.email}>{pendingSignup.customerEmail}</p>

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
          {loading ? "Please wait..." : "Verify & Create Account"}
        </button>
      </div>
    </div>
  );
}
