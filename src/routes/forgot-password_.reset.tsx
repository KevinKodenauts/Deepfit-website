import { createFileRoute } from "@tanstack/react-router";
import ResetPasswordDesktop from "@/components/auth/ResetPasswordDesktop";
import ResetPasswordMobile from "@/components/auth/ResetPasswordMobile";
import { useResetPasswordForm } from "@/hooks/useResetPasswordForm";

export const Route = createFileRoute("/forgot-password_/reset")({
  head: () => ({
    meta: [
      { title: "Reset Password — DEEPFIT" },
      {
        name: "description",
        content: "Create a new password for your Deepfit account.",
      },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const form = useResetPasswordForm();

  return (
    <>
      <div className="forgot-desktop-only">
        <ResetPasswordDesktop {...form} />
      </div>
      <div className="forgot-mobile-only">
        <ResetPasswordMobile {...form} />
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
