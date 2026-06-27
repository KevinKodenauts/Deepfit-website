"use client";

import { Suspense } from "react";
import ResponsivePage from "@/components/ResponsivePage";
import ApplyCouponDesktop from "@/desktop-ui/cart/apply-coupon/ApplyCouponDesktop";
import ApplyCouponMobile from "./ApplyCouponMobile";

function ApplyCouponPageContent() {
  return (
    <ResponsivePage
      mobile={<ApplyCouponMobile />}
      desktop={<ApplyCouponDesktop />}
    />
  );
}

export default function ApplyCouponPage() {
  return (
    <Suspense fallback={null}>
      <ApplyCouponPageContent />
    </Suspense>
  );
}
