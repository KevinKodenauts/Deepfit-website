import { createFileRoute, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import PolicyPageContent from "@/components/site/PolicyPageContent";
import {
  isPolicySlug,
  POLICY_PAGES,
  type PolicySlug,
} from "@/lib/api/policy";

export const Route = createFileRoute("/policies/$slug")({
  beforeLoad: ({ params }) => {
    if (!isPolicySlug(params.slug)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const slug = params.slug;
    if (!isPolicySlug(slug)) {
      return {
        meta: [
          { title: "Policy — DEEPFIT" },
          { name: "description", content: "DeepFit legal policies." },
        ],
      };
    }

    const meta = POLICY_PAGES[slug];
    return {
      meta: [
        { title: `${meta.title} — DEEPFIT` },
        { name: "description", content: meta.description },
        { property: "og:title", content: `${meta.title} — DEEPFIT` },
        { property: "og:description", content: meta.description },
      ],
    };
  },
  component: PolicyPage,
});

function PolicyPage() {
  const { slug } = Route.useParams();

  return (
    <div className="bg-background text-foreground">
      <Nav />
      <div style={{ paddingTop: "var(--desktop-nav-height)" }}>
        <PolicyPageContent slug={slug as PolicySlug} />
        <Footer />
      </div>
    </div>
  );
}
