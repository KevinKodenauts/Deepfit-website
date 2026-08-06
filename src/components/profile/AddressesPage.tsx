import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { AddressesDesktop } from "@/components/profile/AddressesDesktop";
import { AddressesMobile } from "@/components/profile/AddressesMobile";

export function AddressesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div
        className="profile-sub-desktop-only"
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <AddressesDesktop />
      </div>
      <div
        className="profile-sub-mobile-only"
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <AddressesMobile />
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
