"use client";

import { useCart } from "@/contexts/CartContext";
import AuthTopToast from "@/components/AuthTopToast";

export default function CartToast() {
  const { cartToast, dismissCartToast } = useCart();

  return (
    <AuthTopToast
      message={cartToast ?? ""}
      visible={Boolean(cartToast)}
      onClose={dismissCartToast}
      durationMs={2500}
    />
  );
}
