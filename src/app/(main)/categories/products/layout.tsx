import { publicPageMetadata } from "@/lib/seo";

export const metadata = publicPageMetadata("categoryProducts");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
