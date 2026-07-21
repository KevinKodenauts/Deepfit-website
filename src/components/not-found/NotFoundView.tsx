"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Home,
  LayoutGrid,
  Mail,
  MapPinOff,
  Search,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import CartToast from "@/components/CartToast";
import DesktopNav from "@/components/DesktopNav";
import AnimatedSection from "@/components/premium/AnimatedSection";
import SiteFooter from "@/components/premium/SiteFooter";
import { DesktopFooter } from "@/desktop-ui/home/DesktopHomeSections";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import mainLayoutStyles from "@/app/(main)/mainLayout.module.css";
import styles from "./notFound.module.css";

const QUICK_LINKS = [
  {
    href: "/home",
    label: "Home",
    description: "Back to the storefront",
    icon: Home,
  },
  {
    href: "/categories",
    label: "Categories",
    description: "Browse wellness products",
    icon: LayoutGrid,
  },
  {
    href: "/search",
    label: "Search",
    description: "Find supplements and gear",
    icon: Search,
  },
  {
    href: "/explore",
    label: "Explore",
    description: "Workouts and wellness hubs",
    icon: Compass,
  },
  {
    href: "/blog",
    label: "Blog",
    description: "Tips, guides, and insights",
    icon: BookOpen,
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Talk to our support team",
    icon: Mail,
  },
] as const;

type NotFoundViewProps = {
  includeShell?: boolean;
};

function NotFoundBody() {
  const { isDesktop, isHydrated } = useBreakpoint();

  return (
    <>
      <div
        className={`${styles.page} ${
          isHydrated && isDesktop ? "" : styles.withBottomNav
        }`}
      >
        <div className={styles.content}>
          <AnimatedSection>
            <section className={styles.hero} aria-labelledby="not-found-title">
              <div className={styles.heroGlow} aria-hidden />
              <div className={styles.codeWrap}>
                <p className={styles.code} aria-hidden>
                  404
                </p>
                <span className={styles.iconBadge} aria-hidden>
                  <MapPinOff size={24} />
                </span>
              </div>
              <span className={styles.eyebrow}>Page not found</span>
              <h1 id="not-found-title" className={styles.title}>
                This page took a wrong turn
              </h1>
              <p className={styles.description}>
                The link may be broken, the page may have moved, or the URL might
                be mistyped. Let&apos;s get you back to your wellness journey.
              </p>

              <div className={styles.actions}>
                <Link href="/home" className={styles.primaryBtn}>
                  <Home size={18} />
                  Back to Home
                </Link>
                <Link href="/categories" className={styles.secondaryBtn}>
                  Browse Categories
                  <ArrowRight size={16} />
                </Link>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection className={styles.linksSection} delay={80}>
            <h2 className={styles.linksTitle}>Popular destinations</h2>
            <div className={styles.linkGrid}>
              {QUICK_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.linkCard}
                  >
                    <span className={styles.linkIcon}>
                      <Icon size={18} />
                    </span>
                    <span className={styles.linkText}>
                      <strong>{link.label}</strong>
                      <span>{link.description}</span>
                    </span>
                  </Link>
                );
              })}
            </div>

            <p className={styles.supportNote}>
              Still can&apos;t find what you need?{" "}
              <Link href="/contact">Contact our support team</Link> and we&apos;ll
              help you out.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {isHydrated && isDesktop ? <DesktopFooter /> : <SiteFooter />}
    </>
  );
}

export default function NotFoundView({ includeShell = false }: NotFoundViewProps) {
  const { isDesktop, isHydrated } = useBreakpoint();

  if (!includeShell) {
    return <NotFoundBody />;
  }

  return (
    <div
      className={`app-shell ${mainLayoutStyles.shell} ${
        isHydrated && isDesktop ? mainLayoutStyles.desktopShell : ""
      }`}
    >
      <DesktopNav />
      <main className={`app-main ${mainLayoutStyles.main}`}>
        <NotFoundBody />
      </main>
      <BottomNav />
      <CartToast />
    </div>
  );
}
