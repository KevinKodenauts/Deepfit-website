"use client";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useResetPasswordForm } from "@/hooks/useResetPasswordForm";
import ResetPasswordDesktop from "@/desktop-ui/auth/ResetPasswordDesktop";
import ResetPasswordMobile from "../ResetPasswordMobile";
import styles from "../forgotPassword.module.css";

export default function ResetPasswordPage() {
  const form = useResetPasswordForm();
  const { isDesktop, isHydrated } = useBreakpoint();

  if (!isHydrated) {
    return <div className={styles.page} />;
  }

  return isDesktop ? (
    <ResetPasswordDesktop {...form} />
  ) : (
    <ResetPasswordMobile {...form} />
  );
}
