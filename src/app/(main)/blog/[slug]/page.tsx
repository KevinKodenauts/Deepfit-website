"use client";

import ResponsivePage, {
  createLazyDesktop,
} from "@/components/ResponsivePage";
import BlogDetailMobile from "./BlogDetailMobile";

const BlogDetailDesktop = createLazyDesktop(
  () => import("@/desktop-ui/blog/BlogDetailDesktop")
);

export default function BlogDetailPage() {
  return (
    <ResponsivePage
      mobile={<BlogDetailMobile />}
      desktopLazy={BlogDetailDesktop}
    />
  );
}
