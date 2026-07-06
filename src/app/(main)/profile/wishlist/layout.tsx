import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata("profileWishlist");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
