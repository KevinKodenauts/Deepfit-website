"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import type { useLoginForm } from "@/hooks/useLoginForm";
import styles from "./login.module.css";

const PRODUCT_IMAGES = [
  "/images/products/1.png",
  "/images/products/2.png",
  "/images/products/3.png",
  "/images/products/4.png",
  "/images/products/5.png",
  "/images/products/6.png",
  "/images/products/7.png",
  "/images/products/8.png",
];

function ProductMarquee() {
  const row1 = PRODUCT_IMAGES.slice(0, 4);
  const row2 = PRODUCT_IMAGES.slice(4, 8);

  const renderTiles = (images: string[], rowKey: string) =>
    [...images, ...images].map((src, index) => (
      <div key={`${rowKey}-${index}`} className={styles.productTile}>
        <Image
          src={src}
          alt={`Fitness product ${(index % images.length) + 1}`}
          width={80}
          height={80}
          className={styles.productImage}
        />
      </div>
    ));

  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.marqueeRow}>
        <div className={styles.marqueeTrack}>
          {renderTiles(row1, "row1")}
        </div>
      </div>
      <div className={styles.marqueeRow}>
        <div className={`${styles.marqueeTrack} ${styles.marqueeTrackReverse}`}>
          {renderTiles(row2, "row2")}
        </div>
      </div>
    </div>
  );
}

type LoginMobileProps = ReturnType<typeof useLoginForm>;

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
  handleSubmit,
  clearEmailError,
  clearPasswordError,
}: LoginMobileProps) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.skipRow}>
          <Link href="/home" className={styles.skipLink}>
            Skip login
          </Link>
        </div>

        <ProductMarquee />

        <div className={styles.branding}>
          <Image
            src="/images/logo/Deepfit-D-Logo.png"
            alt="Deepfit logo"
            width={64}
            height={64}
            className={styles.logoIcon}
            priority
          />
          <span className={styles.brandName}>DEEPFIT</span>
          <span className={styles.tagline}>Wellness Inside Out</span>
        </div>

        <p className={styles.sectionTitle}>Log In or Sign Up</p>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIconLeft} size={20} />
              <input
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

          <div>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIconLeft} size={20} />
              <input
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

        <div className={styles.divider}>
          <span className={styles.dividerText}>or continue with</span>
        </div>

        <div className={styles.socialRow}>
          <button type="button" className={styles.socialBtn} disabled>
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
          <button type="button" className={styles.socialBtn} disabled>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.55 4.33-3.74 4.25z" />
            </svg>
            Apple
          </button>
        </div>

        <div className={styles.signupPrompt}>
          Don&apos;t have an account?
          <Link href="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
