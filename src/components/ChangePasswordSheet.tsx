"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Lock, LockKeyhole, X } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { updateCustomerPassword } from "@/lib/api/auth";
import styles from "./ChangePasswordSheet.module.css";

interface ChangePasswordSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordSheet({
  isOpen,
  onClose,
}: ChangePasswordSheetProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    setError("");
  }, [isOpen]);

  const handleSubmit = async () => {
    setError("");

    if (!currentPassword.trim()) {
      setError("Please enter your current password");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password");
      return;
    }

    setLoading(true);

    try {
      const result = await updateCustomerPassword(newPassword, currentPassword);

      if (!result.status) {
        setError(result.message ?? "Failed to update password. Please try again.");
        return;
      }

      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              <h2 className={styles.title}>Change Password</h2>
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
              <div className={styles.field}>
                <div className={styles.inputWrap}>
                  <Lock size={18} className={styles.inputIcon} />
                  <input
                    type={showCurrent ? "text" : "password"}
                    className={styles.input}
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className={styles.toggleBtn}
                    onClick={() => setShowCurrent((value) => !value)}
                    aria-label={showCurrent ? "Hide password" : "Show password"}
                  >
                    {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className={styles.field}>
                <div className={styles.inputWrap}>
                  <LockKeyhole size={18} className={styles.inputIcon} />
                  <input
                    type={showNew ? "text" : "password"}
                    className={styles.input}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.toggleBtn}
                    onClick={() => setShowNew((value) => !value)}
                    aria-label={showNew ? "Hide password" : "Show password"}
                  >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className={styles.field}>
                <div className={styles.inputWrap}>
                  <LockKeyhole size={18} className={styles.inputIcon} />
                  <input
                    type={showConfirm ? "text" : "password"}
                    className={styles.input}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.toggleBtn}
                    onClick={() => setShowConfirm((value) => !value)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button
                type="button"
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
