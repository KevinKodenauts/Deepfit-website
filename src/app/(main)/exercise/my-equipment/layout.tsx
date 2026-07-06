import { publicPageMetadata } from "@/lib/seo";

export const metadata = publicPageMetadata("myEquipment");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
