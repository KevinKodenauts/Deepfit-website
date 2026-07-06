import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata("profile");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
