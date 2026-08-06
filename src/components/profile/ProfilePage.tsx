import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ProfileDesktop } from "@/components/profile/ProfileDesktop";
import { ProfileMobile } from "@/components/profile/ProfileMobile";
import { useProfilePage } from "@/hooks/useProfilePage";

export function ProfilePage() {
  const profile = useProfilePage();

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div
        className="profile-desktop-only"
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <ProfileDesktop {...profile} />
      </div>
      <div
        className="profile-mobile-only"
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <ProfileMobile {...profile} />
      </div>
      <div className="profile-desktop-only">
        <Footer />
      </div>
      <style>{`
        .profile-desktop-only { display: none; }
        .profile-mobile-only { display: block; }
        @media (min-width: 1024px) {
          .profile-desktop-only { display: block; }
          .profile-mobile-only { display: none; }
        }
      `}</style>
    </div>
  );
}
