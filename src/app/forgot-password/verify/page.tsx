"use client";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useForgotPasswordVerifyForm } from "@/hooks/useForgotPasswordVerifyForm";
import ForgotPasswordVerifyDesktop from "@/desktop-ui/auth/ForgotPasswordVerifyDesktop";
import ForgotPasswordVerifyMobile from "../ForgotPasswordVerifyMobile";
import styles from "../forgotPassword.module.css";

export default function ForgotPasswordVerifyPage() {
  const form = useForgotPasswordVerifyForm();
  const { isDesktop, isHydrated } = useBreakpoint();

  if (!isHydrated) {
    return <div className={styles.page} />;
  }

  return isDesktop ? (
    <ForgotPasswordVerifyDesktop {...form} />
  ) : (
    <ForgotPasswordVerifyMobile {...form} />
  );
}
