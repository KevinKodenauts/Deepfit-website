import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ChangePasswordDesktop } from "@/components/profile/ChangePasswordDesktop";
import { ChangePasswordMobile } from "@/components/profile/ChangePasswordMobile";
import { useChangePasswordForm } from "@/hooks/useChangePasswordForm";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export function ChangePasswordPage() {
  useRequireAuth();
  const form = useChangePasswordForm();

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div
        className="profile-sub-desktop-only"
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <ChangePasswordDesktop form={form} />
      </div>
      <div
        className="profile-sub-mobile-only"
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <ChangePasswordMobile form={form} />
      </div>
      <div className="profile-sub-desktop-only">
        <Footer />
      </div>
      <style>{`
        .profile-sub-desktop-only { display: none; }
        .profile-sub-mobile-only { display: block; }
        @media (min-width: 1024px) {
          .profile-sub-desktop-only { display: block; }
          .profile-sub-mobile-only { display: none; }
        }
      `}</style>
    </div>
  );
}
