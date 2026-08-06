import type { useChangePasswordForm } from "@/hooks/useChangePasswordForm";
import { ChevronLeft, Eye, EyeOff, Lock, LockKeyhole } from "lucide-react";
import styles from "@/styles/profile/changePasswordDesktop.module.css";

type Form = ReturnType<typeof useChangePasswordForm>;

export function ChangePasswordDesktop({ form }: { form: Form }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => window.history.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className={styles.title}>Change Password</h1>
      </header>

      <div className={styles.content}>
        <div className={styles.field}>
          <div className={styles.inputWrap}>
            <Lock size={18} className={styles.inputIcon} />
            <input
              type={form.showCurrent ? "text" : "password"}
              className={styles.input}
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={(event) => form.setCurrentPassword(event.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => form.setShowCurrent((value) => !value)}
              aria-label={form.showCurrent ? "Hide password" : "Show password"}
            >
              {form.showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.inputWrap}>
            <LockKeyhole size={18} className={styles.inputIcon} />
            <input
              type={form.showNew ? "text" : "password"}
              className={styles.input}
              placeholder="New Password"
              value={form.newPassword}
              onChange={(event) => form.setNewPassword(event.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => form.setShowNew((value) => !value)}
              aria-label={form.showNew ? "Hide password" : "Show password"}
            >
              {form.showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.inputWrap}>
            <LockKeyhole size={18} className={styles.inputIcon} />
            <input
              type={form.showConfirm ? "text" : "password"}
              className={styles.input}
              placeholder="Confirm New Password"
              value={form.confirmPassword}
              onChange={(event) => form.setConfirmPassword(event.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => form.setShowConfirm((value) => !value)}
              aria-label={form.showConfirm ? "Hide password" : "Show password"}
            >
              {form.showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {form.error ? <p className={styles.error}>{form.error}</p> : null}

        <button
          type="button"
          className={styles.submitBtn}
          onClick={() => void form.handleSubmit()}
          disabled={form.loading}
        >
          {form.loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}
