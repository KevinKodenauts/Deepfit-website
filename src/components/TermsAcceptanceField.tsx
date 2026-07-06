"use client";

import { useState } from "react";
import PolicyModal from "@/components/PolicyModal";
import {
  getPrivacyPolicy,
  getTermsAndConditions,
} from "@/lib/api/policy";
import styles from "./TermsAcceptanceField.module.css";

type PolicyType = "terms" | "privacy" | null;

type TermsAcceptanceFieldProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  id?: string;
};

export default function TermsAcceptanceField({
  checked,
  onChange,
  error,
  id = "terms-acceptance",
}: TermsAcceptanceFieldProps) {
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const openPolicy = (policy: PolicyType) => (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setActivePolicy(policy);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            className={styles.checkbox}
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
          />
          <span className={styles.text}>
            I agree to the{" "}
            <button
              type="button"
              className={styles.link}
              onClick={openPolicy("terms")}
            >
              Terms &amp; Conditions
            </button>{" "}
            and{" "}
            <button
              type="button"
              className={styles.link}
              onClick={openPolicy("privacy")}
            >
              Privacy Policy
            </button>
          </span>
        </label>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <PolicyModal
        title="Terms and Conditions"
        visible={activePolicy === "terms"}
        onClose={() => setActivePolicy(null)}
        fetchPolicy={getTermsAndConditions}
      />
      <PolicyModal
        title="Privacy Policy"
        visible={activePolicy === "privacy"}
        onClose={() => setActivePolicy(null)}
        fetchPolicy={getPrivacyPolicy}
      />
    </>
  );
}
