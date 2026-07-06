import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata("cartCoupon");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
