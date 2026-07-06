import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata("profileReferral");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
