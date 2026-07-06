"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import type { useLoginForm } from "@/hooks/useLoginForm";
import TermsAcceptanceField from "@/components/TermsAcceptanceField";
import styles from "./loginDesktop.module.css";

type LoginDesktopProps = ReturnType<typeof useLoginForm>;

export default function LoginDesktop({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  error,
  fieldErrors,
  loading,
  isFormValid,
  acceptedTerms,
  setAcceptedTerms,
  handleSubmit,
  clearEmailError,
  clearPasswordError,
  clearTermsError,
}: LoginDesktopProps) {
  return (
    <div className={styles.page}>
      <div className={styles.skipRow}>
        <Link href="/home" className={styles.skipLink}>
          Skip login
        </Link>
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

        <p className={styles.sectionTitle}>Log In or Sign Up</p>

        <button type="button" className={styles.googleBtn} disabled>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>

        <div className={styles.divider}>
          <span className={styles.dividerText}>or continue with</span>
        </div>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="login-email-desktop">
              Email
            </label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIconLeft} size={20} />
              <input
                id="login-email-desktop"
                type="email"
                placeholder="Enter email address"
                className={styles.inputField}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearEmailError();
                }}
                autoComplete="email"
                required
              />
            </div>
            {fieldErrors.email && (
              <p className={styles.fieldError}>{fieldErrors.email}</p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="login-password-desktop">
              Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIconLeft} size={20} />
              <input
                id="login-password-desktop"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className={styles.inputField}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearPasswordError();
                }}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.inputIconAction}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className={styles.fieldError}>{fieldErrors.password}</p>
            )}
          </div>

          {error && <p className={styles.formError}>{error}</p>}

          <div className={styles.forgotRow}>
            <Link href="/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>

          <TermsAcceptanceField
            id="login-terms-desktop"
            checked={acceptedTerms}
            onChange={(checked) => {
              setAcceptedTerms(checked);
              clearTermsError();
            }}
            error={fieldErrors.acceptedTerms}
          />

          <button
            type="submit"
            className={`${styles.loginBtn} ${
              isFormValid && !loading
                ? styles.loginBtnEnabled
                : styles.loginBtnDisabled
            }`}
            disabled={!isFormValid || loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className={styles.signupPrompt}>
          Don&apos;t have an account?
          <Link href="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
