import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { OrdersDesktop } from "@/components/profile/OrdersDesktop";
import { OrdersMobile } from "@/components/profile/OrdersMobile";
import { useOrdersPage } from "@/hooks/useOrdersPage";

export function OrdersPage() {
  const orders = useOrdersPage();

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div
        className="orders-desktop-only"
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <OrdersDesktop {...orders} />
      </div>
      <div
        className="orders-mobile-only"
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <OrdersMobile {...orders} />
      </div>
      <div className="orders-desktop-only">
        <Footer />
      </div>
      <style>{`
        .orders-desktop-only { display: none; }
        .orders-mobile-only { display: block; }
        @media (min-width: 1024px) {
          .orders-desktop-only { display: block; }
          .orders-mobile-only { display: none; }
        }
      `}</style>
    </div>
  );
}
