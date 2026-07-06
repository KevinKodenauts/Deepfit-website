import type { Metadata } from "next";
import { exerciseMetadata } from "@/lib/seo";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { id } = await params;
  return exerciseMetadata(id);
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
