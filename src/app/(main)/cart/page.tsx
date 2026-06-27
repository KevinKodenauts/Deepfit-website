"use client";

import { Suspense } from "react";
import ResponsivePage, {
  createLazyDesktop,
} from "@/components/ResponsivePage";
import CartMobile from "./CartMobile";

const CartDesktop = createLazyDesktop(
  () => import("@/desktop-ui/cart/CartDesktop")
);

function CartPageContent() {
  return (
    <ResponsivePage mobile={<CartMobile />} desktopLazy={CartDesktop} />
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={null}>
      <CartPageContent />
    </Suspense>
  );
}
