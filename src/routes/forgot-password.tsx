import { createFileRoute } from "@tanstack/react-router";
import ForgotPasswordDesktop from "@/components/auth/ForgotPasswordDesktop";
import ForgotPasswordMobile from "@/components/auth/ForgotPasswordMobile";
import { useForgotPasswordForm } from "@/hooks/useForgotPasswordForm";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — DEEPFIT" },
      {
        name: "description",
        content: "Reset your Deepfit account password.",
      },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const form = useForgotPasswordForm();

  return (
    <>
      <div className="forgot-desktop-only">
        <ForgotPasswordDesktop {...form} />
      </div>
      <div className="forgot-mobile-only">
        <ForgotPasswordMobile {...form} />
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
