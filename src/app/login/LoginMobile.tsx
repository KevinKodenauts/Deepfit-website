"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  AtSign,
  Lock,
  LockOpen,
  Dumbbell,
  PersonStanding,
  UtensilsCrossed,
  TrendingUp,
} from "lucide-react";
import type { useLoginForm } from "@/hooks/useLoginForm";
import TermsAcceptanceField from "@/components/TermsAcceptanceField";
import styles from "./login.module.css";

type LoginMobileProps = ReturnType<typeof useLoginForm>;

const NAV_ITEMS = [
  { label: "Strength", Icon: Dumbbell, active: false },
  { label: "Mindful", Icon: PersonStanding, active: true },
  { label: "Fuel", Icon: UtensilsCrossed, active: false },
  { label: "Track", Icon: TrendingUp, active: false },
] as const;

export default function LoginMobile({
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
}: LoginMobileProps) {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.backBtn}
          aria-label="Go back"
          tabIndex={loading ? -1 : 0}
        >
          <ArrowLeft size={22} strokeWidth={2} />
        </Link>

        <div className={styles.scrollArea}>
          <header className={styles.header}>
            <h1 className={styles.title}>Welcome Back 👋</h1>
            <p className={styles.subtitle}>
              Login to continue your fitness journey
            </p>
          </header>

          <form className={styles.authForm} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="login-email">
                Phone Number / Email
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="login-email"
                  type="text"
                  inputMode="email"
                  placeholder="Enter your email or phone"
                  className={styles.inputField}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearEmailError();
                  }}
                  autoComplete="username"
                  required
                  disabled={loading}
                />
                <span className={styles.inputIconRight} aria-hidden>
                  <AtSign size={20} />
                </span>
              </div>
              {fieldErrors.email && (
                <p className={styles.fieldError}>{fieldErrors.email}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="login-password">
                Password
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={styles.inputField}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearPasswordError();
                  }}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.inputIconAction}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? <LockOpen size={20} /> : <Lock size={20} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className={styles.fieldError}>{fieldErrors.password}</p>
              )}
            </div>

            {error && <p className={styles.formError}>{error}</p>}

            <div className={styles.optionsRow}>
              <label className={styles.rememberLabel}>
                <input
                  type="checkbox"
                  className={styles.rememberCheckbox}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                Remember Me
              </label>
              <Link href="/forgot-password" className={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>

            <div className={styles.termsWrap}>
              <TermsAcceptanceField
                id="login-terms-mobile"
                checked={acceptedTerms}
                onChange={(checked) => {
                  setAcceptedTerms(checked);
                  clearTermsError();
                }}
                error={fieldErrors.acceptedTerms}
              />
            </div>

            <button
              type="submit"
              className={`${styles.loginBtn} ${
                isFormValid && !loading
                  ? styles.loginBtnEnabled
                  : styles.loginBtnDisabled
              }`}
              disabled={!isFormValid || loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className={styles.divider}>
            <span className={styles.dividerText}>or continue with</span>
          </div>

          <div className={styles.socialColumn}>
            <button
              type="button"
              className={`${styles.socialBtn} ${styles.socialBtnApple}`}
              disabled
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.55 4.33-3.74 4.25z" />
              </svg>
              Sign In with Apple
            </button>
            <button
              type="button"
              className={`${styles.socialBtn} ${styles.socialBtnGoogle}`}
              disabled
            >
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
              Sign In with Google
            </button>
          </div>

          <div className={styles.signupPrompt}>
            Don&apos;t have an account?
            <Link href="/signup">Sign Up</Link>
          </div>
        </div>

        <nav className={styles.bottomNav} aria-hidden>
          {NAV_ITEMS.map(({ label, Icon, active }) => (
            <div
              key={label}
              className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
            >
              <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
              <span className={styles.navLabel}>{label}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
