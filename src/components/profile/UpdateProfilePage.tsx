import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { UpdateProfileDesktop } from "@/components/profile/UpdateProfileDesktop";
import { UpdateProfileMobile } from "@/components/profile/UpdateProfileMobile";
import { useUpdateProfileForm } from "@/hooks/useUpdateProfileForm";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export function UpdateProfilePage() {
  useRequireAuth();
  const form = useUpdateProfileForm();

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div
        className="profile-sub-desktop-only"
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <UpdateProfileDesktop form={form} />
      </div>
      <div
        className="profile-sub-mobile-only"
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <UpdateProfileMobile form={form} />
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
