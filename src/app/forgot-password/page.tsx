"use client";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useForgotPasswordForm } from "@/hooks/useForgotPasswordForm";
import ForgotPasswordDesktop from "@/desktop-ui/auth/ForgotPasswordDesktop";
import ForgotPasswordMobile from "./ForgotPasswordMobile";
import styles from "./forgotPassword.module.css";

export default function ForgotPasswordPage() {
  const form = useForgotPasswordForm();
  const { isDesktop, isHydrated } = useBreakpoint();

  if (!isHydrated) {
    return <div className={styles.page} />;
  }

  return isDesktop ? (
    <ForgotPasswordDesktop {...form} />
  ) : (
    <ForgotPasswordMobile {...form} />
  );
}
