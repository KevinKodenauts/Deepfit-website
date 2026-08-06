import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import SignupDesktop from "@/components/auth/SignupDesktop";
import SignupMobile from "@/components/auth/SignupMobile";
import { useAuth } from "@/contexts/AuthContext";
import { useSignupForm } from "@/hooks/useSignupForm";
import { AuthPageSkeleton } from "@/components/skeleton/PageSkeletons";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — DEEPFIT" },
      {
        name: "description",
        content: "Create your Deepfit account to shop premium fitness equipment.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const form = useSignupForm();

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
      <div className="signup-desktop-only">
        <SignupDesktop {...form} />
      </div>
      <div className="signup-mobile-only">
        <SignupMobile {...form} />
      </div>
      <style>{`
        .signup-desktop-only { display: none; }
        .signup-mobile-only { display: block; }
        @media (min-width: 1024px) {
          .signup-desktop-only { display: block; }
          .signup-mobile-only { display: none; }
        }
      `}</style>
    </>
  );
}
