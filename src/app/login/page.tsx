"use client";

import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import AuthTopToast from "@/components/AuthTopToast";
import { useAuth } from "@/contexts/AuthContext";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useLoginForm } from "@/hooks/useLoginForm";
import LoginDesktop from "@/desktop-ui/auth/LoginDesktop";
import LoginMobile from "./LoginMobile";
import styles from "./login.module.css";

function GuestOnly({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className={styles.page} />;
  }

  if (isAuthenticated) {
    return null;
  }

  return children;
}

export default function LoginScreen() {
  return (
    <Suspense fallback={<div className={styles.page} />}>
      <GuestOnly>
        <LoginScreenContent />
      </GuestOnly>
    </Suspense>
  );
}

function LoginScreenContent() {
  const form = useLoginForm();
  const { isDesktop, isHydrated } = useBreakpoint();

  return (
    <>
      <AuthTopToast
        message="Password updated successfully."
        visible={form.showResetToast}
        onClose={form.closeResetToast}
      />
      <AuthTopToast
        message="Account verified. Please log in to continue."
        visible={form.showSignupToast}
        onClose={form.closeSignupToast}
      />

      {isHydrated && isDesktop ? (
        <LoginDesktop {...form} />
      ) : (
        <LoginMobile {...form} />
      )}
    </>
  );
}
