import { publicPageMetadata } from "@/lib/seo";

export const metadata = publicPageMetadata("explore");

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
