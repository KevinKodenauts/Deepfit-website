"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAddresses } from "@/contexts/AddressContext";
import { useCatalogSync } from "@/hooks/useCatalogSync";
import {
  getShippingCharge,
  placeOrder,
  startZiinaPayment,
  validateCoupon,
} from "@/lib/api/orders";
import { getCustomerId } from "@/lib/auth/session";
import type { CartPaymentMethod } from "@/components/cart/CartPaymentMethodSection";

export function useCartPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const { items, isLoading, updateQuantity, removeItem, refreshCart } =
    useCart();
  const {
    addresses,
    selectedAddressId,
    selectedAddress,
    setSelectedAddressId,
    refreshAddresses,
  } = useAddresses();

  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [useRewardCoins, setUseRewardCoins] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<CartPaymentMethod>("ziina");
  const [placing, setPlacing] = useState(false);

  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);
  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const rewardCoins = user?.referralPoints ?? 0;
  const grandTotal = itemsTotal + deliveryFee;

  const deliveryAddressText = selectedAddress
    ? [selectedAddress.address, selectedAddress.city, selectedAddress.state]
        .filter(Boolean)
        .join(", ")
    : "";

  const updateDeliveryFee = useCallback(async (pincode?: string) => {
    const customerId = getCustomerId();
    if (!pincode || !customerId) {
      setDeliveryFee(0);
      return;
    }

    try {
      const charge = await getShippingCharge(customerId, pincode);
      setDeliveryFee(charge);
    } catch {
      setDeliveryFee(0);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setDeliveryFee(0);
      return;
    }

    void refreshCart();
  }, [isAuthenticated, refreshCart]);

  useEffect(() => {
    void updateDeliveryFee(selectedAddress?.pincode);
  }, [selectedAddress?.pincode, updateDeliveryFee]);

  useEffect(() => {
    const couponFromUrl = searchParams.get("coupon");
    if (couponFromUrl) {
      setAppliedCoupon(couponFromUrl);
    }
  }, [searchParams]);

  useCatalogSync((event) => {
    if (
      event.entity === "product" ||
      event.entity === "dashboard" ||
      event.entity === "category" ||
      event.entity === "sub_category"
    ) {
      void refreshCart();
    }
  });

  const handleQtyChange = (cartItemId: number, qty: number) => {
    if (qty < 1) return;
    void updateQuantity(cartItemId, qty);
  };

  const handleApplyCoupon = async (code: string) => {
    if (!isAuthenticated) return "Please login to apply coupon.";

    const customerId = getCustomerId();
    if (!customerId) return "Please login to apply coupon.";

    try {
      const result = await validateCoupon(customerId, code);
      if (!result.status) {
        return result.message ?? "Invalid coupon code";
      }
      setAppliedCoupon(code);
      return null;
    } catch {
      return "Could not validate coupon";
    }
  };

  const handleAddressSelect = async (addressId: number) => {
    setSelectedAddressId(addressId);
    const address = addresses.find((item) => item.id === addressId);
    await updateDeliveryFee(address?.pincode);
  };

  /** Place order from the cart (Ziina or cash on delivery). */
  const handlePlaceOrder = async (options?: {
    onMissingAddress?: () => void;
  }) => {
    if (!isAuthenticated) {
      router.push("/login?next=/cart");
      return;
    }

    const customerId = getCustomerId();
    if (!customerId || items.length === 0) return;

    if (!selectedAddressId) {
      if (options?.onMissingAddress) {
        options.onMissingAddress();
        return;
      }
      router.push("/profile/addresses?select=1&next=/cart");
      return;
    }

    const isOnlinePayment = paymentMethod === "ziina";
    if (isOnlinePayment && grandTotal < 2) {
      alert("Online payments require a minimum of 2 AED.");
      return;
    }

    setPlacing(true);
    try {
      const result = await placeOrder({
        customerId,
        addressId: selectedAddressId,
        paymentMethod: isOnlinePayment ? "ZIINA" : "COD",
        platform: "web",
        subtotal: itemsTotal,
        shippingCost: deliveryFee,
        grandTotal,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.qty,
          variantId: item.variantId,
        })),
        couponCode: appliedCoupon ?? undefined,
      });

      if (!result.status || !result.orderNumber || !result.orderId) {
        alert(result.message ?? "Could not place order.");
        return;
      }

      if (isOnlinePayment) {
        let paymentUrl = result.paymentUrl;
        let paymentIntentId = result.paymentIntentId;

        if (!paymentUrl) {
          const payment = await startZiinaPayment({
            orderId: result.orderId,
            orderNumber: result.orderNumber,
            amount: grandTotal,
          });
          paymentUrl = payment.paymentUrl;
          paymentIntentId = payment.paymentIntentId;
        }

        if (!paymentUrl) {
          alert("Could not open the payment page. Please try again.");
          return;
        }

        if (paymentIntentId) {
          sessionStorage.setItem(`ziina:${result.orderId}`, paymentIntentId);
        }

        window.location.href = paymentUrl;
        return;
      }

      await refreshCart();
      router.push(
        `/orders/success?orderNumber=${encodeURIComponent(result.orderNumber)}&orderId=${result.orderId ?? ""}`,
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while placing your order.",
      );
    } finally {
      setPlacing(false);
    }
  };

  const openCoupon = () => {
    if (!isAuthenticated) {
      router.push("/login?next=/cart/coupon");
      return;
    }
    router.push("/cart/coupon");
  };

  const openAddresses = () => {
    if (!isAuthenticated) {
      router.push("/login?next=/profile/addresses");
      return;
    }
    router.push("/profile/addresses?select=1");
  };

  return {
    router,
    isAuthenticated,
    items,
    isLoading,
    itemCount,
    itemsTotal,
    rewardCoins,
    grandTotal,
    deliveryFee,
    selectedAddress,
    deliveryAddressText,
    appliedCoupon,
    useRewardCoins,
    setUseRewardCoins,
    paymentMethod,
    setPaymentMethod,
    placing,
    isCouponOpen,
    setIsCouponOpen,
    isAddressOpen,
    setIsAddressOpen,
    addresses,
    selectedAddressId,
    loadAddresses: refreshAddresses,
    handleQtyChange,
    handleApplyCoupon,
    handleAddressSelect,
    handlePlaceOrder,
    removeItem,
    openCoupon,
    openAddresses,
  };
}
