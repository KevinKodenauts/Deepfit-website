import { Link } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { SITE_COMPANY, SITE_SOCIAL, SITE_WHATSAPP } from "@/lib/site";

const socialIcons = {
  Instagram,
  Facebook,
} as const;

const shopLinks = [
  { label: "Strength", to: "/shop" },
  { label: "Cardio", to: "/shop" },
  { label: "Recovery", to: "/shop" },
  { label: "Yoga", to: "/shop" },
  { label: "Accessories", to: "/shop" },
] as const;

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Explore", to: "/explore" },
  { label: "Blog", to: "/explore", search: { hub: "blog" as const } },
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

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-[oklch(0.16_0.03_270)] text-[oklch(0.9_0.02_250)]">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl [background:var(--gradient-brand)]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl [background:var(--gradient-brand)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="white" height={56} className="max-h-16 sm:max-h-20" />
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug tracking-tight text-white">
              Wellness, from the inside out.
            </p>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Premium equipment, recovery gear and rituals for people who take their body seriously — and their aesthetic even more so.
            </p>
            <a
              href={SITE_WHATSAPP.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center text-sm text-white/80 transition hover:text-white"
            >
              WhatsApp {SITE_WHATSAPP.display}
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">
              {SITE_COMPANY.name}
              <br />
              {SITE_COMPANY.address}
            </p>
            <div className="mt-8 flex gap-3">
              {SITE_SOCIAL.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-full border border-white/15 p-3 transition hover:border-white/40 hover:bg-white/5"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">Shop</div>
            <ul className="mt-6 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-white/80 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">Company</div>
            <ul className="mt-6 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    search={"search" in link ? link.search : undefined}
                    className="text-sm text-white/80 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">Support</div>
            <ul className="mt-6 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  {"slug" in link ? (
                    <Link
                      to="/policies/$slug"
                      params={{ slug: link.slug }}
                      className="text-sm text-white/80 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link to={link.to} className="text-sm text-white/80 transition hover:text-white">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} DEEPFIT. Wellness Inside Out.</div>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to="/policies/$slug"
                params={{ slug: link.slug }}
                className="hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
