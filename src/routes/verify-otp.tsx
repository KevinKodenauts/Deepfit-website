import { createFileRoute } from "@tanstack/react-router";
import VerifyOtpDesktop from "@/components/auth/VerifyOtpDesktop";
import VerifyOtpMobile from "@/components/auth/VerifyOtpMobile";
import { useVerifyOtpForm } from "@/hooks/useVerifyOtpForm";
import { AuthPageSkeleton } from "@/components/skeleton/PageSkeletons";

export const Route = createFileRoute("/verify-otp")({
  head: () => ({
    meta: [
      { title: "Verify Email — DEEPFIT" },
      {
        name: "description",
        content: "Enter the verification code sent to your email to finish signing up.",
      },
    ],
  }),
  component: VerifyOtpPage,
});

function VerifyOtpPage() {
  const form = useVerifyOtpForm();

  if (!form.pendingSignup) {
    return <AuthPageSkeleton />;
  }

  return (
    <>
      <div className="signup-desktop-only">
        <VerifyOtpDesktop {...form} />
      </div>
      <div className="signup-mobile-only">
        <VerifyOtpMobile {...form} />
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
