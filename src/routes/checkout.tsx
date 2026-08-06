import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CreditCard, Banknote } from "lucide-react";
import { z } from "zod";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useAddresses } from "@/contexts/AddressContext";
import {
  getShippingCharge,
  placeOrder,
  startZiinaPayment,
} from "@/lib/api/orders";
import { getCustomerId } from "@/lib/auth/session";
import { CheckoutSkeleton } from "@/components/skeleton/PageSkeletons";

const searchSchema = z.object({
  payment: z.string().optional(),
  orderId: z.string().optional(),
});

export const Route = createFileRoute("/checkout")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Checkout — DEEPFIT" }],
  }),
  component: CheckoutPage,
});

type PaymentMethod = "ziina" | "cod";

function CheckoutPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { items, subtotal, refreshCart, isLoading } = useCart();
  const {
    addresses,
    selectedAddressId,
    selectedAddress,
    setSelectedAddressId,
    refreshAddresses,
  } = useAddresses();

  const [deliveryFee, setDeliveryFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("ziina");
  const [placing, setPlacing] = useState(false);
  const [notice, setNotice] = useState("");

  const grandTotal = useMemo(
    () => subtotal + deliveryFee,
    [subtotal, deliveryFee],
  );

  useEffect(() => {
    if (search.payment === "cancelled") {
      setNotice("Payment was cancelled. You can try again.");
    } else if (search.payment === "failed") {
      setNotice("Payment failed. Please try again or choose COD.");
    }
  }, [search.payment]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      void navigate({ to: "/login", search: { next: "/checkout" } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      void refreshCart();
      void refreshAddresses();
    }
  }, [isAuthenticated, refreshCart, refreshAddresses]);

  useEffect(() => {
    const customerId = getCustomerId();
    const pincode = selectedAddress?.pincode;
    if (!customerId || !pincode) {
      setDeliveryFee(0);
      return;
    }
    getShippingCharge(customerId, pincode)
      .then(setDeliveryFee)
      .catch(() => setDeliveryFee(0));
  }, [selectedAddress?.pincode]);

  const handlePlaceOrder = useCallback(async () => {
    const customerId = getCustomerId();
    if (!customerId || items.length === 0) return;
    if (!selectedAddressId) {
      alert("Please select a delivery address.");
      return;
    }

    const isOnline = paymentMethod === "ziina";
    if (isOnline && grandTotal < 2) {
      alert("Online payments require a minimum of 2 AED.");
      return;
    }

    setPlacing(true);
    try {
      const result = await placeOrder({
        customerId,
        addressId: selectedAddressId,
        paymentMethod: isOnline ? "ZIINA" : "COD",
        platform: "web",
        subtotal,
        shippingCost: deliveryFee,
        grandTotal,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.qty,
          variantId: item.variantId,
        })),
      });

      if (!result.status || !result.orderNumber || !result.orderId) {
        alert(result.message ?? "Could not place order.");
        return;
      }

      if (isOnline) {
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
          alert("Could not open the payment page.");
          return;
        }
        if (paymentIntentId) {
          sessionStorage.setItem(`ziina:${result.orderId}`, paymentIntentId);
        }
        window.location.href = paymentUrl;
        return;
      }

      await refreshCart();
      void navigate({
        to: "/orders/success",
        search: {
          orderNumber: result.orderNumber,
          orderId: String(result.orderId),
        },
      });
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while placing your order.",
      );
    } finally {
      setPlacing(false);
    }
  }, [
    items,
    selectedAddressId,
    paymentMethod,
    grandTotal,
    subtotal,
    deliveryFee,
    refreshCart,
    navigate,
  ]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:px-10">
          <CheckoutSkeleton />
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:px-10">
        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Checkout
        </div>
        <h1 className="mt-3 font-display text-5xl leading-tight">
          Confirm & pay.
        </h1>

        {notice ? (
          <div className="mt-6 rounded-2xl border border-border bg-card px-4 py-3 text-sm">
            {notice}
          </div>
        ) : null}

        {isLoading ? (
          <CheckoutSkeleton />
        ) : items.length === 0 ? (
          <div className="mt-10 rounded-[2rem] bg-card p-10 text-center shadow-soft ring-1 ring-border/60">
            <p className="text-muted-foreground">Your bag is empty.</p>
            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
            >
              Shop the collection
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            <div className="rounded-[2rem] bg-card p-6 shadow-soft ring-1 ring-border/60">
              <div className="font-display text-xl">Items</div>
              <ul className="mt-4 space-y-3 text-sm">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-4">
                    <span>
                      {item.title} × {item.qty}
                    </span>
                    <span>AED {item.price * item.qty}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] bg-card p-6 shadow-soft ring-1 ring-border/60">
              <div className="font-display text-xl">Address</div>
              <div className="mt-4 space-y-2">
                {addresses.map((address) => (
                  <label
                    key={address.id}
                    className={`flex cursor-pointer gap-3 rounded-2xl border px-4 py-3 text-sm ${
                      selectedAddressId === address.id
                        ? "border-foreground bg-foreground/5"
                        : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="checkout-address"
                      checked={selectedAddressId === address.id}
                      onChange={() => setSelectedAddressId(address.id)}
                    />
                    <span>
                      {[address.address, address.city, address.state]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-card p-6 shadow-soft ring-1 ring-border/60">
              <div className="font-display text-xl">Payment</div>
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("ziina")}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm ${
                    paymentMethod === "ziina"
                      ? "border-foreground bg-foreground/5"
                      : "border-border"
                  }`}
                >
                  <CreditCard size={16} /> Pay online (Ziina)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm ${
                    paymentMethod === "cod"
                      ? "border-foreground bg-foreground/5"
                      : "border-border"
                  }`}
                >
                  <Banknote size={16} /> Cash on delivery
                </button>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="text-muted-foreground">Total</span>
                <span className="font-display text-2xl">AED {grandTotal}</span>
              </div>
              <button
                type="button"
                disabled={placing}
                onClick={() => void handlePlaceOrder()}
                className="mt-6 w-full rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background disabled:opacity-50"
              >
                {placing
                  ? "Processing…"
                  : paymentMethod === "ziina"
                    ? "Pay with Ziina"
                    : "Place COD order"}
              </button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
