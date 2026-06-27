"use client";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useVerifyOtpForm } from "@/hooks/useVerifyOtpForm";
import VerifyOtpDesktop from "@/desktop-ui/auth/VerifyOtpDesktop";
import VerifyOtpMobile from "./VerifyOtpMobile";
import styles from "./verify-otp.module.css";

export default function OTPVerificationScreen() {
  const form = useVerifyOtpForm();
  const { isDesktop, isHydrated } = useBreakpoint();

  if (!isHydrated) {
    return <div className={styles.page} />;
  }

  return isDesktop ? (
    <VerifyOtpDesktop {...form} />
  ) : (
    <VerifyOtpMobile {...form} />
  );
}
