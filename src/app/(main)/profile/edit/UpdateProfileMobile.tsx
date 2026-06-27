"use client";

import { ChevronLeft, Lock, Mail, User } from "lucide-react";
import CountryPhoneField from "@/components/CountryPhoneField";
import { useUpdateProfileForm } from "@/hooks/useUpdateProfileForm";
import styles from "./updateProfileMobile.module.css";

export default function UpdateProfileMobile() {
  const form = useUpdateProfileForm();

  if (!form.user) {
    return <div className={styles.page} />;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => form.router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.title}>Update Profile</h1>
        <div className={styles.headerSpacer} />
      </header>

      <div className={styles.content}>
        <div className={styles.avatar}>{form.initials}</div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="profile-name-mobile">
            Full Name
          </label>
          <div className={styles.inputWrap}>
            <User size={18} className={styles.inputIcon} />
            <input
              id="profile-name-mobile"
              type="text"
              className={styles.input}
              value={form.name}
              onChange={(event) => form.setName(event.target.value)}
              placeholder="Enter your name"
            />
          </div>
        </div>

        <CountryPhoneField
          label="Phone Number"
          value={form.phone}
          country={form.phoneCountry}
          onValueChange={form.setPhone}
          onCountryChange={form.setPhoneCountry}
          error={form.phoneError}
        />

        <div className={styles.field}>
          <label className={styles.label} htmlFor="profile-email-mobile">
            Email Address
          </label>
          <div className={`${styles.inputWrap} ${styles.inputDisabled}`}>
            <Mail size={18} className={styles.inputIcon} />
            <input
              id="profile-email-mobile"
              type="email"
              className={styles.input}
              value={form.email}
              disabled
              readOnly
            />
            <Lock size={16} className={styles.lockIcon} />
          </div>
        </div>

        <CountryPhoneField
          label="Alternative Phone Number"
          value={form.altPhone}
          country={form.altPhoneCountry}
          onValueChange={form.setAltPhone}
          onCountryChange={form.setAltPhoneCountry}
          optional
          error={form.altPhoneError}
        />

        {form.error && <p className={styles.formError}>{form.error}</p>}

        <button
          type="button"
          className={styles.submitBtn}
          onClick={form.handleSubmit}
          disabled={form.loading}
        >
          {form.loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
}
