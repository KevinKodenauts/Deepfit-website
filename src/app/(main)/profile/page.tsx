"use client";

import ResponsivePage, {
  createLazyDesktop,
} from "@/components/ResponsivePage";
import ProfileMobile from "./ProfileMobile";

const ProfileDesktop = createLazyDesktop(
  () => import("@/desktop-ui/profile/ProfileDesktop")
);

export default function ProfilePage() {
  return (
    <ResponsivePage mobile={<ProfileMobile />} desktopLazy={ProfileDesktop} />
  );
}
