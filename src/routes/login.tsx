import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import AuthTopToast from "@/components/auth/AuthTopToast";
import LoginDesktop from "@/components/auth/LoginDesktop";
import LoginMobile from "@/components/auth/LoginMobile";
import { useAuth } from "@/contexts/AuthContext";
import { useLoginForm } from "@/hooks/useLoginForm";
import { AuthPageSkeleton } from "@/components/skeleton/PageSkeletons";
import styles from "@/styles/login/login.module.css";

const searchSchema = z.object({
  next: z.string().optional(),
  reset: z.string().optional(),
  signup: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Login — DEEPFIT" },
      { name: "description", content: "Log in to your Deepfit account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const form = useLoginForm();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      void navigate({ to: "/" });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || isAuthenticated) {
    return <AuthPageSkeleton />;
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
      <div className="login-desktop-only">
        <LoginDesktop {...form} />
      </div>
      <div className="login-mobile-only">
        <LoginMobile {...form} />
      </div>
      <style>{`
        .login-desktop-only { display: none; }
        .login-mobile-only { display: block; }
        @media (min-width: 1024px) {
          .login-desktop-only { display: block; }
          .login-mobile-only { display: none; }
        }
      `}</style>
    </>
  );
}
