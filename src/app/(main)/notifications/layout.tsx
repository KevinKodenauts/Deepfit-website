import { publicPageMetadata } from "@/lib/seo";

export const metadata = publicPageMetadata("notifications");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
