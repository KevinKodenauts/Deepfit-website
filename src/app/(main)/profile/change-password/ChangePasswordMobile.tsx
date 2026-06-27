"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Eye, EyeOff, Lock, LockKeyhole } from "lucide-react";
import { updateCustomerPassword } from "@/lib/api/auth";
import sheetStyles from "@/components/ChangePasswordSheet.module.css";
import styles from "./changePasswordMobile.module.css";

export default function ChangePasswordMobile() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      router.back();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className={styles.pageTitle}>Change Password</h1>
        <div className={styles.headerSpacer} />
      </header>

      <div className={sheetStyles.content}>
        <div className={sheetStyles.field}>
          <div className={sheetStyles.inputWrap}>
            <Lock size={18} className={sheetStyles.inputIcon} />
            <input
              type={showCurrent ? "text" : "password"}
              className={sheetStyles.input}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className={sheetStyles.toggleBtn}
              onClick={() => setShowCurrent((value) => !value)}
              aria-label={showCurrent ? "Hide password" : "Show password"}
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className={sheetStyles.field}>
          <div className={sheetStyles.inputWrap}>
            <LockKeyhole size={18} className={sheetStyles.inputIcon} />
            <input
              type={showNew ? "text" : "password"}
              className={sheetStyles.input}
              placeholder="New Password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className={sheetStyles.toggleBtn}
              onClick={() => setShowNew((value) => !value)}
              aria-label={showNew ? "Hide password" : "Show password"}
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className={sheetStyles.field}>
          <div className={sheetStyles.inputWrap}>
            <LockKeyhole size={18} className={sheetStyles.inputIcon} />
            <input
              type={showConfirm ? "text" : "password"}
              className={sheetStyles.input}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className={sheetStyles.toggleBtn}
              onClick={() => setShowConfirm((value) => !value)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <p className={sheetStyles.error}>{error}</p>}

        <button
          type="button"
          className={sheetStyles.submitBtn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}
