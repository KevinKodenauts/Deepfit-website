"use client";

import ResponsivePage, { createLazyDesktop } from "@/components/ResponsivePage";
import HomeMobile from "./HomeMobile";

const HomeDesktop = createLazyDesktop(
  () => import("@/desktop-ui/home/HomeDesktop"),
);

export default function HomePage() {
  return <ResponsivePage mobile={<HomeMobile />} desktopLazy={HomeDesktop} />;
}
