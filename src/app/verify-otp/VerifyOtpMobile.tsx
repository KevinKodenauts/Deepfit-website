"use client";

import { ChevronLeft } from "lucide-react";
import type { useVerifyOtpForm } from "@/hooks/useVerifyOtpForm";
import signupStyles from "../signup/signup.module.css";
import styles from "./verify-otp.module.css";

type VerifyOtpMobileProps = ReturnType<typeof useVerifyOtpForm>;

export default function VerifyOtpMobile({
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
}: VerifyOtpMobileProps) {
  if (!pendingSignup) {
    return null;
  }

  return (
    <div className={styles.page}>
      <header className={signupStyles.header}>
        <button
          type="button"
          className={signupStyles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
          disabled={loading}
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className={signupStyles.headerTitle}>Verify Email</h1>
        <div className={signupStyles.headerSpacer} />
      </header>

      <div className={styles.container}>
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
          className={`${styles.verifyBtn} ${
            isOtpComplete && !loading
              ? styles.verifyBtnEnabled
              : styles.verifyBtnDisabled
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
