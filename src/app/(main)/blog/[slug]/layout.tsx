import type { Metadata } from "next";
import { blogPostMetadata } from "@/lib/seo";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { slug } = await params;
  return blogPostMetadata(slug);
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
