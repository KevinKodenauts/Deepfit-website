"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lock, Mail, User, X } from "lucide-react";
import CountryPhoneField from "@/components/CountryPhoneField";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useUpdateProfileForm } from "@/hooks/useUpdateProfileForm";
import styles from "./UpdateProfileModal.module.css";

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}

export default function UpdateProfileModal({
  isOpen,
  onClose,
  onUpdated,
}: UpdateProfileModalProps) {
  useBodyScrollLock(isOpen);

  const form = useUpdateProfileForm({
    onSuccess: () => {
      onUpdated?.();
      onClose();
    },
  });

  if (!form.user) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={styles.backdrop}
          data-lenis-prevent
          onClick={onClose}
        >
          <motion.div
            className={styles.sheet}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.handle} />

            <div className={styles.header}>
              <h2 className={styles.title}>Update Profile</h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.divider} />

            <div className={styles.content} data-lenis-prevent>
              <div className={styles.avatar}>{form.initials}</div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="profile-name">
                  Full Name
                </label>
                <div className={styles.inputWrap}>
                  <User size={18} className={styles.inputIcon} />
                  <input
                    id="profile-name"
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
                <label className={styles.label} htmlFor="profile-email">
                  Email Address
                </label>
                <div className={`${styles.inputWrap} ${styles.inputDisabled}`}>
                  <Mail size={18} className={styles.inputIcon} />
                  <input
                    id="profile-email"
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
