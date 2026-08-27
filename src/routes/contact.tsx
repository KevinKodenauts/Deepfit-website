import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE_COMPANY, SITE_EMAIL, SITE_WHATSAPP } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — DEEPFIT" },
      { name: "description", content: "Reach the Deepfit studio team for orders, shipping, returns and press." },
      { property: "og:title", content: "Contact Deepfit" },
      { property: "og:description", content: "Get in touch with the Deepfit studio team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="relative overflow-hidden bg-soft pt-32">
        <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl [background:radial-gradient(circle,var(--mint),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Contact</div>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl">
            We reply to every note, <span className="text-gradient italic">personally</span>.
          </h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1.2fr_1fr] lg:px-10">
        <form className="rounded-[2rem] bg-card p-10 shadow-soft ring-1 ring-border/60" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="First name" />
            <Field label="Last name" />
            <Field label="Email" type="email" />
            <Field label="Subject" />
          </div>
          <div className="mt-6">
            <label className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Message</label>
            <textarea rows={6} className="mt-2 w-full rounded-2xl border border-border bg-background p-4 text-sm outline-none focus:ring-4 focus:ring-ring/30" />
          </div>
          <button className="mt-8 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition hover:opacity-90">
            Send message
          </button>
        </form>
        <div className="space-y-6">
          {[
            {
              icon: Mail,
              t: "Email",
              v: SITE_EMAIL,
              href: `mailto:${SITE_EMAIL}`,
            },
            {
              icon: Phone,
              t: "WhatsApp",
              v: SITE_WHATSAPP.display,
              href: SITE_WHATSAPP.href,
            },
            {
              icon: MapPin,
              t: "Office",
              v: SITE_COMPANY.name,
              sub: SITE_COMPANY.address,
            },
          ].map((c) => {
            const body = (
              <>
                <div className="inline-flex rounded-2xl bg-brand p-3 text-white">
                  <c.icon size={18} />
                </div>
                <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{c.t}</div>
                <div className="mt-1 font-display text-2xl leading-snug">{c.v}</div>
                {"sub" in c && c.sub ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.sub}</p>
                ) : null}
              </>
            );

            const className =
              "block rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border/60 transition hover:shadow-glass";

            return c.href ? (
              <a
                key={c.t}
                href={c.href}
                className={className}
                {...(c.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {body}
              </a>
            ) : (
              <div key={c.t} className={className}>
                {body}
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</label>
      <input type={type} className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:ring-4 focus:ring-ring/30" />
    </div>
  );
}