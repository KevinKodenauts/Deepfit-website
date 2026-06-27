"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { ParsedCountry } from "react-international-phone";
import { sendCustomerOtp } from "@/lib/api/customerAuth";
import { savePendingSignup } from "@/lib/auth/signupFlow";
import {
  formatPhoneForApi,
  getCountryByIso,
  DEFAULT_COUNTRY_ISO,
} from "@/lib/phone/utils";
import { validateSignupForm, type FieldErrors } from "@/lib/validation";

export function useSignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileCountry, setMobileCountry] = useState<ParsedCountry>(() =>
    getCountryByIso(DEFAULT_COUNTRY_ISO)
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      Object.keys(
        validateSignupForm({
          name,
          mobile,
          email,
          password,
          confirmPassword,
          mobileCountry,
        })
      ).length === 0
    );
  }, [name, mobile, email, password, confirmPassword, mobileCountry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const errors = validateSignupForm({
      name,
      mobile,
      email,
      password,
      confirmPassword,
      mobileCountry,
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const trimmedEmail = email.trim();
      const formattedMobile = formatPhoneForApi(mobile, mobileCountry);
      const pendingSignup = {
        customerName: name.trim(),
        customerEmail: trimmedEmail,
        customerMobile: formattedMobile,
        password,
      };

      const otpResult = await sendCustomerOtp({
        email: trimmedEmail,
        phone: formattedMobile,
      });

      if (!otpResult.status) {
        setError(otpResult.message ?? "Failed to send verification code.");
        return;
      }

      savePendingSignup(pendingSignup);
      router.push("/verify-otp");
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

  const clearFieldError = (field: keyof FieldErrors) => {
    if (fieldErrors[field]) {
      setFieldErrors({ ...fieldErrors, [field]: "" });
    }
  };

  return {
    router,
    name,
    setName,
    mobile,
    setMobile,
    mobileCountry,
    setMobileCountry,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    confirmPassword,
    setConfirmPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    fieldErrors,
    loading,
    isFormValid,
    handleSubmit,
    clearFieldError,
  };
}
