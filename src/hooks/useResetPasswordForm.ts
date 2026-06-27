"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { resetForgottenPassword } from "@/lib/api/auth";
import {
  clearForgotPasswordSession,
  FORGOT_EMAIL_KEY,
  FORGOT_VERIFIED_KEY,
} from "@/lib/auth/forgotPasswordFlow";

export function useResetPasswordForm() {
  const router = useRouter();
  const { logout } = useAuth();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem(FORGOT_VERIFIED_KEY);
    const storedEmail = sessionStorage.getItem(FORGOT_EMAIL_KEY) ?? "";

    if (!verified || !storedEmail) {
      router.replace("/forgot-password");
      return;
    }

    setEmail(storedEmail);
    setReady(true);
  }, [router]);

  const isFormValid = useMemo(() => {
    return (
      newPassword.length >= 6 &&
      confirmPassword.length >= 6 &&
      newPassword === confirmPassword
    );
  }, [confirmPassword, newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await resetForgottenPassword(email, newPassword);
      if (res.status) {
        logout();
        clearForgotPasswordSession();
        sessionStorage.setItem("deepfit_login_email", email);
        router.push("/login?reset=success");
      } else {
        setError(res.message ?? "Failed to update password.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    router,
    email,
    ready,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showNew,
    setShowNew,
    showConfirm,
    setShowConfirm,
    error,
    loading,
    isFormValid,
    handleSubmit,
  };
}
