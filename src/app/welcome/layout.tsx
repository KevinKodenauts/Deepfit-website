import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata("welcome");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
