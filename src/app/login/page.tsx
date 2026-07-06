"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import AuthTopToast from "@/components/AuthTopToast";
import { useAuth } from "@/contexts/AuthContext";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useLoginForm } from "@/hooks/useLoginForm";
import LoginDesktop from "@/desktop-ui/auth/LoginDesktop";
import WelcomeMobile from "@/app/welcome/WelcomeMobile";
import LoginMobile from "./LoginMobile";
import styles from "./login.module.css";
import welcomeStyles from "@/app/welcome/welcome.module.css";

function GuestOnly({
  children,
  loadingClassName,
}: {
  children: React.ReactNode;
  loadingClassName: string;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className={loadingClassName} />;
  }

  if (isAuthenticated) {
    return null;
  }

  return children;
}

export default function LoginScreen() {
  const pathname = usePathname();
  const isWelcomeEntry = pathname === "/";
  const loadingClassName = isWelcomeEntry ? welcomeStyles.page : styles.page;

  return (
    <Suspense fallback={<div className={loadingClassName} />}>
      <GuestOnly loadingClassName={loadingClassName}>
        <LoginScreenContent isWelcomeEntry={isWelcomeEntry} />
      </GuestOnly>
    </Suspense>
  );
}

function LoginScreenContent({ isWelcomeEntry }: { isWelcomeEntry: boolean }) {
  const form = useLoginForm();
  const { isDesktop, isHydrated } = useBreakpoint();

  if (isHydrated && isDesktop) {
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
        <LoginDesktop {...form} />
      </>
    );
  }

  if (isWelcomeEntry) {
    return <WelcomeMobile />;
  }

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
      <LoginMobile {...form} />
    </>
  );
}
