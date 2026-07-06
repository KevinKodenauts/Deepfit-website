import type { Metadata } from "next";
import { POLICY_PAGES, POLICY_SLUGS, isPolicySlug } from "@/lib/api/policy";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return POLICY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isPolicySlug(slug)) {
    return { title: "Policy | DeepFit" };
  }

  const meta = POLICY_PAGES[slug];
  return {
    title: `${meta.title} | DeepFit`,
    description: meta.description,
  };
}

export default function PolicyLayout({ children }: Props) {
  return children;
}
