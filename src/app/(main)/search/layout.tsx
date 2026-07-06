import { publicPageMetadata } from "@/lib/seo";

export const metadata = publicPageMetadata("search");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
