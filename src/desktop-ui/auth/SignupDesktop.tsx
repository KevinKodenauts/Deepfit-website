"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, ChevronLeft } from "lucide-react";
import CountryPhoneField from "@/components/CountryPhoneField";
import type { useSignupForm } from "@/hooks/useSignupForm";
import styles from "./authDesktop.module.css";

type SignupDesktopProps = ReturnType<typeof useSignupForm>;

export default function SignupDesktop({
  router,
  name,
  setName,
  mobile,
  setMobile,
  mobileCountry,
  setMobileCountry,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  confirmPassword,
  setConfirmPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  error,
  fieldErrors,
  loading,
  isFormValid,
  handleSubmit,
  clearFieldError,
}: SignupDesktopProps) {
  return (
    <div className={styles.page}>
      <div className={styles.topLeft}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
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

        <h2 className={styles.welcomeTitle}>Sign up to get started</h2>
        <p className={styles.welcomeSubtitle}>
          Enter your details to create a new account
        </p>

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
            <label className={styles.fieldLabel} htmlFor="signup-name-desktop">
              Full Name
            </label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIconLeft} size={20} />
              <input
                id="signup-name-desktop"
                type="text"
                placeholder="Enter your full name"
                className={styles.inputField}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearFieldError("name");
                }}
                autoComplete="name"
                required
              />
            </div>
            {fieldErrors.name && (
              <p className={styles.fieldError}>{fieldErrors.name}</p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="signup-email-desktop">
              Email
            </label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIconLeft} size={20} />
              <input
                id="signup-email-desktop"
                type="email"
                placeholder="Enter your email"
                className={styles.inputField}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError("email");
                }}
                autoComplete="email"
                required
              />
            </div>
            {fieldErrors.email && (
              <p className={styles.fieldError}>{fieldErrors.email}</p>
            )}
          </div>

          <CountryPhoneField
            label="Mobile Number"
            value={mobile}
            country={mobileCountry}
            onValueChange={(value) => {
              setMobile(value);
              clearFieldError("mobile");
            }}
            onCountryChange={(country) => {
              setMobileCountry(country);
              clearFieldError("mobile");
            }}
            error={fieldErrors.mobile}
          />

          <div className={styles.fieldGroup}>
            <label
              className={styles.fieldLabel}
              htmlFor="signup-password-desktop"
            >
              Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIconLeft} size={20} />
              <input
                id="signup-password-desktop"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className={styles.inputField}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearFieldError("password");
                }}
                autoComplete="new-password"
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

          <div className={styles.fieldGroup}>
            <label
              className={styles.fieldLabel}
              htmlFor="signup-confirm-password-desktop"
            >
              Confirm Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIconLeft} size={20} />
              <input
                id="signup-confirm-password-desktop"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                className={styles.inputField}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearFieldError("confirmPassword");
                }}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className={styles.inputIconAction}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <p className={styles.fieldError}>{fieldErrors.confirmPassword}</p>
            )}
          </div>

          {error && <p className={styles.formError}>{error}</p>}

          <button
            type="submit"
            className={`${styles.primaryBtn} ${
              isFormValid && !loading
                ? styles.primaryBtnEnabled
                : styles.primaryBtnDisabled
            }`}
          >
            {loading ? "Sending code..." : "Sign Up"}
          </button>
        </form>

        <div className={styles.footerPrompt}>
          Already have an account?
          <Link href="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}
