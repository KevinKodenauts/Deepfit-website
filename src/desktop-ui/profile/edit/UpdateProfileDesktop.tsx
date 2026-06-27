"use client";

import { ChevronLeft, Lock, Mail, User } from "lucide-react";
import CountryPhoneField from "@/components/CountryPhoneField";
import { useUpdateProfileForm } from "@/hooks/useUpdateProfileForm";
import styles from "./updateProfileDesktop.module.css";

export default function UpdateProfileDesktop() {
  const form = useUpdateProfileForm();

  if (!form.user) {
    return <div className={styles.shell} />;
  }

  return (
    <div className={styles.shell}>
      <div className={styles.inner}>
        <header className={styles.pageHeader}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => form.router.back()}
            aria-label="Go back"
          >
            <ChevronLeft size={20} />
            <span>Back to profile</span>
          </button>
          <h1 className={styles.pageTitle}>Update Profile</h1>
          <p className={styles.pageSubtitle}>
            Keep your personal details and contact information up to date.
          </p>
        </header>

        <div className={styles.card}>
          <div className={styles.summary}>
            <div className={styles.avatar}>{form.initials}</div>
            <div className={styles.summaryText}>
              <h2 className={styles.summaryName}>
                {form.name || "Your profile"}
              </h2>
              {form.email && (
                <p className={styles.summaryEmail}>
                  <Mail size={15} />
                  {form.email}
                </p>
              )}
              <p className={styles.summaryHint}>
                Your email is linked to your account and cannot be changed here.
              </p>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="profile-name-desktop">
                Full Name
              </label>
              <div className={styles.inputWrap}>
                <User size={18} className={styles.inputIcon} />
                <input
                  id="profile-name-desktop"
                  type="text"
                  className={styles.input}
                  value={form.name}
                  onChange={(event) => form.setName(event.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className={styles.phoneGrid}>
              <CountryPhoneField
                label="Phone Number"
                value={form.phone}
                country={form.phoneCountry}
                onValueChange={form.setPhone}
                onCountryChange={form.setPhoneCountry}
                error={form.phoneError}
              />

              <CountryPhoneField
                label="Alternative Phone Number"
                value={form.altPhone}
                country={form.altPhoneCountry}
                onValueChange={form.setAltPhone}
                onCountryChange={form.setAltPhoneCountry}
                optional
                error={form.altPhoneError}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="profile-email-desktop">
                Email Address
              </label>
              <div className={`${styles.inputWrap} ${styles.inputDisabled}`}>
                <Mail size={18} className={styles.inputIcon} />
                <input
                  id="profile-email-desktop"
                  type="email"
                  className={styles.input}
                  value={form.email}
                  disabled
                  readOnly
                />
                <Lock size={16} className={styles.lockIcon} />
              </div>
              <p className={styles.fieldHint}>
                Contact support if you need to change your email address.
              </p>
            </div>

            {form.error && <p className={styles.formError}>{form.error}</p>}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => form.router.back()}
                disabled={form.loading}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.submitBtn}
                onClick={form.handleSubmit}
                disabled={form.loading}
              >
                {form.loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
