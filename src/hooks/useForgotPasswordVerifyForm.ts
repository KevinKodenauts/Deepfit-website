"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPassword, verifyForgotPasswordOtp } from "@/lib/api/auth";
import {
  FORGOT_EMAIL_KEY,
  FORGOT_VERIFIED_KEY,
} from "@/lib/auth/forgotPasswordFlow";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export function useForgotPasswordVerifyForm() {
  const router = useRouter();
  const [otp, setOtp] = useState(() => Array.from({ length: OTP_LENGTH }, () => ""));
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const verifyingRef = useRef(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem(FORGOT_EMAIL_KEY) ?? "";
    if (!storedEmail) {
      router.replace("/forgot-password");
      return;
    }

    setEmail(storedEmail);
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!ready || countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, ready]);

  useEffect(() => {
    if (ready) {
      inputRefs.current[0]?.focus();
    }
  }, [ready]);

  const otpString = useMemo(() => otp.join(""), [otp]);
  const isOtpComplete = otpString.length === OTP_LENGTH;

  const fillOtp = useCallback((digits: string) => {
    const cleaned = digits.replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = Array.from({ length: OTP_LENGTH }, (_, index) => cleaned[index] ?? "");
    setOtp(next);

    const focusIndex = Math.min(cleaned.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();

    return cleaned;
  }, []);

  const completeVerification = useCallback(
    async (code: string) => {
      if (!email || verifyingRef.current) return;

      verifyingRef.current = true;
      setError("");
      setLoading(true);
      setStatusText("Verifying OTP...");

      try {
        const verifyResult = await verifyForgotPasswordOtp(email, code);

        if (!verifyResult.status) {
          setError(verifyResult.message ?? "Invalid OTP. Please try again.");
          return;
        }

        sessionStorage.setItem(FORGOT_VERIFIED_KEY, "true");
        router.push("/forgot-password/reset");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
      } finally {
        verifyingRef.current = false;
        setLoading(false);
        setStatusText("");
      }
    },
    [email, router]
  );

  const handleChange = (index: number, value: string) => {
    if (loading) return;

    if (value.length > 1) {
      const cleaned = fillOtp(value);
      if (cleaned.length === OTP_LENGTH) {
        void completeVerification(cleaned);
      }
      return;
    }

    if (value && !/^\d$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);
    setError("");

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (value && index === OTP_LENGTH - 1) {
      const joined = nextOtp.join("");
      if (joined.length === OTP_LENGTH) {
        void completeVerification(joined);
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = useCallback(async () => {
    if (countdown > 0 || !email || loading) return;

    setError("");
    setStatusText("");
    try {
      const res = await forgotPassword(email);
      if (res.status) {
        setOtp(Array.from({ length: OTP_LENGTH }, () => ""));
        setCountdown(RESEND_SECONDS);
        inputRefs.current[0]?.focus();
      } else {
        setError(res.message ?? "Failed to resend OTP.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to resend OTP. Please try again."
      );
    }
  }, [countdown, email, loading]);

  const handleVerify = () => {
    if (!isOtpComplete || loading) return;
    void completeVerification(otpString);
  };

  return {
    router,
    email,
    ready,
    otp,
    countdown,
    error,
    loading,
    statusText,
    inputRefs,
    isOtpComplete,
    handleChange,
    handleKeyDown,
    handleResend,
    handleVerify,
    otpLength: OTP_LENGTH,
  };
}
