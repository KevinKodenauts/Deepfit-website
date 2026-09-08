import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { getMainCategories } from "@/lib/api/categories";
import { SITE_COMPANY, SITE_SOCIAL, SITE_WHATSAPP } from "@/lib/site";

const socialIcons = {
  Instagram,
  Facebook,
} as const;

const MAX_SHOP_LINKS = 5;
const linkClass =
  "inline-flex min-h-9 items-center rounded-sm text-sm text-white/75 transition hover:text-white focus-visible:outline-none focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4";

const FALLBACK_SHOP_LINKS = [
  { id: null, label: "Move Hub" },
  { id: null, label: "Fuel Hub" },
  { id: null, label: "Mind Hub" },
] as const;

type ShopLink = { id: number | null; label: string };

const exploreLinks = [
  { label: "Move", hub: "move" as const },
  { label: "Fuel", hub: "fuel" as const },
  { label: "Mind", hub: "mind" as const },
  { label: "Learn", hub: "blog" as const },
] as const;

const learnLinks = [
  { label: "Journal", to: "/explore" as const, search: { hub: "blog" as const } },
  { label: "All articles", to: "/blog" as const },
];

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

const supportLinks = [
  { label: "Returns", to: "/policies/$slug", slug: "return" },
  { label: "Refunds", to: "/policies/$slug", slug: "refund" },
  { label: "Order Tracking", to: "/orders" },
] as const;

const legalLinks = [
  { label: "Privacy", slug: "privacy" },
  { label: "Terms", slug: "terms" },
  { label: "Returns", slug: "return" },
  { label: "Refunds", slug: "refund" },
] as const;

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
        {title}
      </div>
      <ul className="mt-5 flex flex-col gap-1">{children}</ul>
    </div>
  );
}

export function Footer() {
  const [shopLinks, setShopLinks] = useState<ShopLink[]>([
    { id: null, label: "All" },
    ...FALLBACK_SHOP_LINKS,
  ]);

  useEffect(() => {
    let cancelled = false;
    getMainCategories()
      .then((list) => {
        if (cancelled || list.length === 0) return;
        setShopLinks([
          { id: null, label: "All" },
          ...list.slice(0, MAX_SHOP_LINKS).map((category) => ({
            id: category.id,
            label: category.mainCategoryName,
          })),
        ]);
      })
      .catch(() => {
        /* keep fallback hubs */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer className="relative mt-24 overflow-hidden bg-[oklch(0.16_0.03_270)] text-[oklch(0.9_0.02_250)] sm:mt-32">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl [background:var(--gradient-brand)]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl [background:var(--gradient-brand)]" />
      <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-16 sm:pb-16 sm:pt-20 lg:px-10 lg:pt-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Logo
              variant="white"
              height={56}
              className="max-h-16 sm:max-h-20"
            />
            <p className="mt-5 max-w-sm font-display text-2xl leading-snug tracking-tight text-white">
              Wellness, from the inside out.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
              Premium equipment, recovery gear and rituals for people who take
              their body seriously — and their aesthetic even more so.
            </p>
            <a
              href={SITE_WHATSAPP.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} mt-5`}
            >
              WhatsApp {SITE_WHATSAPP.display}
            </a>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/45">
              {SITE_COMPANY.name}
              <br />
              {SITE_COMPANY.address}
            </p>
            <div className="mt-5 flex gap-2.5">
              {SITE_SOCIAL.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-full border border-white/15 p-2.5 text-white/80 transition hover:border-white/40 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterColumn title="Shop">
            {shopLinks.map((link) => (
              <li key={`${link.id ?? "all"}-${link.label}`}>
                <Link
                  to="/shop"
                  search={link.id != null ? { main: link.id } : undefined}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Explore">
            <li>
              <Link to="/explore" className={linkClass}>
                All hubs
              </Link>
            </li>
            {exploreLinks.map((link) => (
              <li key={link.hub}>
                <Link
                  to="/explore"
                  search={{ hub: link.hub }}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          {/* <FooterColumn title="Learn">
            {learnLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} search={link.search} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn> */}

          {/* <div className="grid grid-cols-2 gap-8 lg:grid-cols-1 lg:gap-10"> */}
            <FooterColumn title="Company">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Support">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  {"slug" in link ? (
                    <Link
                      to="/policies/$slug"
                      params={{ slug: link.slug }}
                      className={linkClass}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </FooterColumn>
          {/* </div> */}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span>© {new Date().getFullYear()} DEEPFIT. Wellness Inside Out.</span>
            <span className="hidden text-white/20 sm:inline" aria-hidden="true">
              ·
            </span>
            <a
              href="https://kodenauts.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white focus-visible:outline-none focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4"
            >
              Developed by Kodenauts
            </a>
          </div>
          <nav
            aria-label="Legal"
            className="flex flex-wrap gap-x-5 gap-y-2 pr-20 sm:pr-0"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to="/policies/$slug"
                params={{ slug: link.slug }}
                className="transition hover:text-white focus-visible:outline-none focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
