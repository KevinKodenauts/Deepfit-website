"use client";

import ResponsivePage from "@/components/ResponsivePage";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import UpdateProfileDesktop from "@/desktop-ui/profile/edit/UpdateProfileDesktop";
import UpdateProfileMobile from "./UpdateProfileMobile";

export default function UpdateProfilePage() {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return null;
  }

  return (
    <ResponsivePage
      mobile={<UpdateProfileMobile />}
      desktop={<UpdateProfileDesktop />}
    />
  );
}
