"use client";

import ResponsivePage from "@/components/ResponsivePage";
import ChangePasswordDesktop from "@/desktop-ui/profile/change-password/ChangePasswordDesktop";
import ChangePasswordMobile from "./ChangePasswordMobile";

export default function ChangePasswordPage() {
  return (
    <ResponsivePage
      mobile={<ChangePasswordMobile />}
      desktop={<ChangePasswordDesktop />}
    />
  );
}
