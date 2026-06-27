"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CUSTOMER_OTP_LENGTH,
  sendCustomerOtp,
  verifyCustomerOtp,
} from "@/lib/api/customerAuth";
import { loginCustomer, pickAuthTokens, signupCustomer } from "@/lib/api/auth";
import {
  clearPendingSignup,
  getPendingSignup,
  type PendingSignup,
} from "@/lib/auth/signupFlow";
import { useAuth } from "@/contexts/AuthContext";

const RESEND_SECONDS = 30;

export function useVerifyOtpForm() {
  const router = useRouter();
  const { loginWithResponse } = useAuth();
  const [otp, setOtp] = useState(() =>
    Array.from({ length: CUSTOMER_OTP_LENGTH }, () => "")
  );
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [pendingSignup, setPendingSignup] = useState<PendingSignup | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const verifyingRef = useRef(false);

  useEffect(() => {
    const pending = getPendingSignup();
    if (!pending) {
      router.replace("/signup");
      return;
    }
    setPendingSignup(pending);
  }, [router]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [pendingSignup]);

  const otpString = useMemo(() => otp.join(""), [otp]);
  const isOtpComplete = otpString.length === CUSTOMER_OTP_LENGTH;

  const fillOtp = useCallback((digits: string) => {
    const cleaned = digits.replace(/\D/g, "").slice(0, CUSTOMER_OTP_LENGTH);
    const next = Array.from({ length: CUSTOMER_OTP_LENGTH }, (_, index) =>
      cleaned[index] ?? ""
    );
    setOtp(next);

    const focusIndex = Math.min(cleaned.length, CUSTOMER_OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();

    return cleaned;
  }, []);

  const completeSignup = useCallback(
    async (code: string) => {
      if (!pendingSignup || verifyingRef.current) return;

      verifyingRef.current = true;
      setError("");
      setLoading(true);
      setStatusText("Verifying OTP...");

      try {
        const verifyResult = await verifyCustomerOtp({
          email: pendingSignup.customerEmail,
          otp: code,
        });

        if (!verifyResult.status) {
          setError(verifyResult.message ?? "Invalid OTP. Please try again.");
          return;
        }

        setStatusText("Creating your account...");

        const signupResult = await signupCustomer(pendingSignup);
        const { access, refresh, user } = pickAuthTokens(signupResult);

        if (signupResult.status && access && user) {
          const loginErr = loginWithResponse({ access, refresh, user });
          if (loginErr) {
            setError(loginErr);
            return;
          }

          clearPendingSignup();
          router.replace("/home");
          return;
        }

        try {
          const loginResult = await loginCustomer(
            pendingSignup.customerEmail,
            pendingSignup.password
          );
          const loginTokens = pickAuthTokens(loginResult);

          if (loginResult.status && loginTokens.access && loginTokens.user) {
            const loginErr = loginWithResponse({
              access: loginTokens.access,
              refresh: loginTokens.refresh,
              user: loginTokens.user,
            });
            if (loginErr) {
              setError(loginErr);
              return;
            }

            clearPendingSignup();
            router.replace("/home");
            return;
          }
        } catch {
          // Fall through to signup error message.
        }

        setError(
          signupResult.message ??
            "Account could not be created. Please try again."
        );
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
    [loginWithResponse, pendingSignup, router]
  );

  const handleChange = (index: number, value: string) => {
    if (loading) return;

    if (value.length > 1) {
      const cleaned = fillOtp(value);
      if (cleaned.length === CUSTOMER_OTP_LENGTH) {
        void completeSignup(cleaned);
      }
      return;
    }

    if (value && !/^\d$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);
    setError("");

    const lastIndex = CUSTOMER_OTP_LENGTH - 1;

    if (value && index < lastIndex) {
      inputRefs.current[index + 1]?.focus();
    } else if (value && index === lastIndex) {
      const joined = nextOtp.join("");
      if (joined.length === CUSTOMER_OTP_LENGTH) {
        void completeSignup(joined);
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
    if (countdown > 0 || !pendingSignup || loading) return;

    setError("");
    setStatusText("");
    try {
      const res = await sendCustomerOtp({
        email: pendingSignup.customerEmail,
        phone: pendingSignup.customerMobile,
      });
      if (res.status) {
        setOtp(Array.from({ length: CUSTOMER_OTP_LENGTH }, () => ""));
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
  }, [countdown, loading, pendingSignup]);

  const handleVerify = () => {
    if (!isOtpComplete || loading) return;
    void completeSignup(otpString);
  };

  return {
    router,
    otp,
    countdown,
    error,
    loading,
    statusText,
    pendingSignup,
    inputRefs,
    isOtpComplete,
    handleChange,
    handleKeyDown,
    handleResend,
    handleVerify,
    otpLength: CUSTOMER_OTP_LENGTH,
  };
}
