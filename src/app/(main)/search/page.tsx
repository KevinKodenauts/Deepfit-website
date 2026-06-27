"use client";

import ResponsivePage, {
  createLazyDesktop,
} from "@/components/ResponsivePage";
import SearchMobile from "./SearchMobile";

const SearchDesktop = createLazyDesktop(
  () => import("@/desktop-ui/search/SearchDesktop")
);

export default function SearchPage() {
  return (
    <ResponsivePage mobile={<SearchMobile />} desktopLazy={SearchDesktop} />
  );
}
