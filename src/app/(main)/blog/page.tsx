"use client";

import ResponsivePage, {
  createLazyDesktop,
} from "@/components/ResponsivePage";
import BlogMobile from "./BlogMobile";

const BlogDesktop = createLazyDesktop(
  () => import("@/desktop-ui/blog/BlogDesktop")
);

export default function BlogPage() {
  return <ResponsivePage mobile={<BlogMobile />} desktopLazy={BlogDesktop} />;
}
