"use client";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useSignupForm } from "@/hooks/useSignupForm";
import SignupDesktop from "@/desktop-ui/auth/SignupDesktop";
import SignupMobile from "./SignupMobile";
import styles from "./signup.module.css";

export default function SignupScreen() {
  const form = useSignupForm();
  const { isDesktop, isHydrated } = useBreakpoint();

  if (!isHydrated) {
    return <div className={styles.page} />;
  }

  return isDesktop ? (
    <SignupDesktop {...form} />
  ) : (
    <SignupMobile {...form} />
  );
}
