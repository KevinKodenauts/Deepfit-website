import { createFileRoute } from "@tanstack/react-router";
import ForgotPasswordVerifyDesktop from "@/components/auth/ForgotPasswordVerifyDesktop";
import ForgotPasswordVerifyMobile from "@/components/auth/ForgotPasswordVerifyMobile";
import { useForgotPasswordVerifyForm } from "@/hooks/useForgotPasswordVerifyForm";

export const Route = createFileRoute("/forgot-password_/verify")({
  head: () => ({
    meta: [
      { title: "Verify Email — DEEPFIT" },
      {
        name: "description",
        content: "Enter the verification code sent to your email.",
      },
    ],
  }),
  component: ForgotPasswordVerifyPage,
});

function ForgotPasswordVerifyPage() {
  const form = useForgotPasswordVerifyForm();

  return (
    <>
      <div className="forgot-desktop-only">
        <ForgotPasswordVerifyDesktop {...form} />
      </div>
      <div className="forgot-mobile-only">
        <ForgotPasswordVerifyMobile {...form} />
      </div>
      <style>{`
        .forgot-desktop-only { display: none; }
        .forgot-mobile-only { display: block; }
        @media (min-width: 1024px) {
          .forgot-desktop-only { display: block; }
          .forgot-mobile-only { display: none; }
        }
      `}</style>
    </>
  );
}
