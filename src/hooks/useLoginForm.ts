"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { validateLoginForm, type FieldErrors } from "@/lib/validation";

export function useLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [showResetToast, setShowResetToast] = useState(false);
  const [showSignupToast, setShowSignupToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim()) &&
      password.length >= 6 &&
      acceptedTerms
    );
  }, [email, password, acceptedTerms]);

  const closeResetToast = useCallback(() => {
    setShowResetToast(false);
    router.replace("/");
  }, [router]);

  const closeSignupToast = useCallback(() => {
    setShowSignupToast(false);
    router.replace("/");
  }, [router]);

  useEffect(() => {
    const prefillEmail = sessionStorage.getItem("deepfit_login_email");
    if (prefillEmail) {
      setEmail(prefillEmail);
      sessionStorage.removeItem("deepfit_login_email");
    }

    if (searchParams.get("reset") === "success") {
      setShowResetToast(true);
    } else if (searchParams.get("signup") === "success") {
      setShowSignupToast(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const errors = validateLoginForm(email, password, acceptedTerms);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const err = await login(email.trim(), password);
      if (err) {
        setError(err);
      } else {
        const next = searchParams.get("next");
        router.replace(next && next.startsWith("/") ? next : "/home");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearEmailError = () => {
    if (fieldErrors.email) {
      setFieldErrors({ ...fieldErrors, email: "" });
    }
  };

  const clearPasswordError = () => {
    if (fieldErrors.password) {
      setFieldErrors({ ...fieldErrors, password: "" });
    }
  };

  const clearTermsError = () => {
    if (fieldErrors.acceptedTerms) {
      setFieldErrors({ ...fieldErrors, acceptedTerms: "" });
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    acceptedTerms,
    setAcceptedTerms,
    error,
    fieldErrors,
    showResetToast,
    showSignupToast,
    loading,
    isFormValid,
    closeResetToast,
    closeSignupToast,
    handleSubmit,
    clearEmailError,
    clearPasswordError,
    clearTermsError,
  };
}
