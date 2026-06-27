"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/lib/api/auth";
import {
  FORGOT_EMAIL_KEY,
  FORGOT_VERIFIED_KEY,
  isValidForgotPasswordEmail,
} from "@/lib/auth/forgotPasswordFlow";

export function useForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = useMemo(
    () => isValidForgotPasswordEmail(email),
    [email]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError("Please enter your email.");
      return;
    }

    if (!isValidForgotPasswordEmail(trimmedEmail)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword(trimmedEmail);
      if (res.status) {
        sessionStorage.removeItem(FORGOT_VERIFIED_KEY);
        sessionStorage.setItem(FORGOT_EMAIL_KEY, trimmedEmail);
        router.push("/forgot-password/verify");
      } else {
        setError(res.message ?? "Failed to send OTP. Please try again.");
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
    setEmail,
    error,
    loading,
    isFormValid,
    handleSubmit,
  };
}
