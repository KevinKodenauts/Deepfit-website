"use client";

import { getPasswordChecks, getPasswordStrength } from "@/lib/validation";
import styles from "@/styles/signup/passwordCheckBar.module.css";

type PasswordCheckBarProps = {
  password: string;
  /** Prefer live typing error; fall back to submit-time field error */
  fieldError?: string;
};

function levelClasses(score: number) {
  if (score <= 1) return { fill: styles.fillWeak, label: styles.labelWeak };
  if (score === 2) return { fill: styles.fillFair, label: styles.labelFair };
  if (score === 3) return { fill: styles.fillGood, label: styles.labelGood };
  return { fill: styles.fillStrong, label: styles.labelStrong };
}

export default function PasswordCheckBar({
  password,
  fieldError,
}: PasswordCheckBarProps) {
  if (!password) {
    if (!fieldError) return null;
    return <p className={styles.error}>{fieldError}</p>;
  }

  const strength = getPasswordStrength(password);
  const checks = getPasswordChecks(password);
  const level = levelClasses(strength.score);
  const liveError = strength.error ?? fieldError;

  return (
    <div className={styles.wrap} aria-live="polite">
      <div className={styles.barMeta}>
        <div
          className={styles.track}
          role="progressbar"
          aria-valuenow={strength.score}
          aria-valuemin={0}
          aria-valuemax={strength.total}
          aria-label="Password strength"
        >
          <div
            className={`${styles.fill} ${level.fill}`}
            style={{ width: `${strength.percent}%` }}
          />
        </div>
        <span className={`${styles.label} ${level.label}`}>{strength.label}</span>
      </div>

      <ul className={styles.checks}>
        {checks.map((check) => (
          <li
            key={check.label}
            className={check.met ? styles.checkMet : styles.checkUnmet}
          >
            {check.label}
          </li>
        ))}
      </ul>

      {liveError ? <p className={styles.error}>{liveError}</p> : null}
    </div>
  );
}
