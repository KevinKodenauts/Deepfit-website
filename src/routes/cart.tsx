import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ProductsEmptyState } from "@/components/site/ProductsEmptyState";
import AddAddressModal from "@/components/profile/AddAddressModal";
import {
  Minus,
  Plus,
  Trash2,
  Gift,
  CreditCard,
  Banknote,
  Pencil,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAddresses } from "@/contexts/AddressContext";
import {
  getShippingCharge,
  placeOrder,
  startZiinaPayment,
  validateCoupon,
} from "@/lib/api/orders";
import { getCustomerId } from "@/lib/auth/session";
import type { AddressView } from "@/lib/api/addresses";
import { formatFullAddress, getAddressType } from "@/lib/addressDisplay";
import { CartSkeleton } from "@/components/skeleton/PageSkeletons";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — DEEPFIT" },
      { name: "description", content: "Review your Deepfit bag." },
      { property: "og:title", content: "Your Deepfit bag" },
      {
        property: "og:description",
        content: "Review your Deepfit bag before checkout.",
      },
    ],
  }),
  component: Cart,
});

type PaymentMethod = "ziina" | "cod";

function Cart() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, isLoading, updateQuantity, removeItem, refreshCart, subtotal } =
    useCart();
  const {
    addresses,
    selectedAddressId,
    selectedAddress,
    setSelectedAddressId,
    refreshAddresses,
  } = useAddresses();

  const [deliveryFee, setDeliveryFee] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("ziina");
  const [placing, setPlacing] = useState(false);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressView | null>(
    null,
  );

  const discount = useMemo(
    () => Math.min(Math.max(couponDiscount, 0), subtotal),
    [couponDiscount, subtotal],
  );

  const grandTotal = useMemo(
    () => Math.max(subtotal - discount + deliveryFee, 0),
    [subtotal, discount, deliveryFee],
  );

  const prevSubtotalRef = useRef(subtotal);
  useEffect(() => {
    if (prevSubtotalRef.current === subtotal) return;
    prevSubtotalRef.current = subtotal;
    if (!appliedCoupon) return;
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponMessage("");
  }, [subtotal, appliedCoupon]);

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

  const openAddAddress = () => {
    setEditingAddress(null);
    setIsAddressFormOpen(true);
  };

  const openEditAddress = (address: AddressView) => {
    setEditingAddress(address);
    setIsAddressFormOpen(true);
  };

  const handleApplyCoupon = async () => {
    if (!isAuthenticated) {
      void navigate({ to: "/login", search: { next: "/cart" } });
      return;
    }
    const customerId = getCustomerId();
    if (!customerId || !coupon.trim()) return;
    try {
      const result = await validateCoupon(customerId, coupon.trim(), subtotal);
      if (!result.status) {
        setCouponMessage(result.message ?? "Invalid coupon");
        setAppliedCoupon(null);
        setCouponDiscount(0);
        return;
      }
      const amount = Number(result.discountAmount ?? 0);
      setAppliedCoupon(result.couponCode ?? coupon.trim());
      setCouponDiscount(Number.isFinite(amount) ? amount : 0);
      setCouponMessage("");
    } catch {
      setCouponDiscount(0);
      setCouponMessage("Could not validate coupon");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCoupon("");
    setCouponMessage("");
  };

  const handlePlaceOrder = useCallback(async () => {
    if (!isAuthenticated) {
      void navigate({ to: "/login", search: { next: "/cart" } });
      return;
    }
    const customerId = getCustomerId();
    if (!customerId || items.length === 0) return;

    if (!selectedAddressId) {
      alert("Please select a delivery address before placing your order.");
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
        discountAmount: discount,
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
    isAuthenticated,
    navigate,
    items,
    selectedAddressId,
    paymentMethod,
    grandTotal,
    subtotal,
    deliveryFee,
    discount,
    appliedCoupon,
    refreshCart,
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-10">
        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Your bag
        </div>
        <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">
          Almost yours.
        </h1>

        {!isAuthenticated ? (
          <div className="mt-12 rounded-lg bg-card p-10 text-center shadow-soft ring-1 ring-border/60">
            <p className="text-muted-foreground">
              Please log in to view your cart and checkout.
            </p>
            <Link
              to="/login"
              search={{ next: "/cart" }}
              className="mt-6 inline-flex rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background"
            >
              Log in to continue
            </Link>
          </div>
        ) : isLoading ? (
          <CartSkeleton />
        ) : items.length === 0 ? (
          <div className="mt-12">
            <ProductsEmptyState
              title="Your bag is empty."
              description="Add something you love, then come back to check out."
              actionLabel="Shop the collection"
              actionTo="/shop"
            />
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-5 rounded-lg bg-card p-4 shadow-soft ring-1 ring-border/60 sm:p-5"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-border/40 sm:h-24 sm:w-24">
                    <img
                      src={it.image}
                      alt={it.title}
                      className="h-full w-full object-contain p-1.5"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-2 font-medium leading-snug">
                      {it.title}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      AED {it.price}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-1.5">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            void updateQuantity(it.id, Math.max(1, it.qty - 1))
                          }
                          className="text-muted-foreground transition hover:text-foreground"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-4 text-center text-sm tabular-nums">
                          {it.qty}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => void updateQuantity(it.id, it.qty + 1)}
                          className="text-muted-foreground transition hover:text-foreground"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="font-medium tabular-nums sm:hidden">
                        AED {it.price * it.qty}
                      </div>
                    </div>
                  </div>
                  <div className="hidden w-24 text-right font-medium tabular-nums sm:block">
                    AED {it.price * it.qty}
                  </div>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => void removeItem(it.id)}
                    className="rounded-lg p-2 text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <div className="rounded-lg bg-card p-5 shadow-soft ring-1 ring-border/60">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Delivery address
                  </div>
                  <button
                    type="button"
                    onClick={openAddAddress}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium uppercase tracking-wider text-foreground transition hover:bg-foreground/5"
                  >
                    <Plus size={14} />
                    Add
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="mt-4 rounded-lg border border-dashed border-border px-4 py-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      No saved addresses yet.
                    </p>
                    <button
                      type="button"
                      onClick={openAddAddress}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background"
                    >
                      <Plus size={14} />
                      Add address
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 space-y-2">
                    {addresses.map((address) => {
                      const { label, icon: TypeIcon } = getAddressType(address);
                      const selected = selectedAddressId === address.id;
                      return (
                        <div
                          key={address.id}
                          className={`flex items-start gap-3 rounded-lg border px-3 py-3 transition ${
                            selected
                              ? "border-foreground bg-foreground/[0.03]"
                              : "border-border hover:border-foreground/30"
                          }`}
                        >
                          <label className="flex min-w-0 flex-1 cursor-pointer gap-3">
                            <input
                              type="radio"
                              name="address"
                              className="mt-1 accent-foreground"
                              checked={selected}
                              onChange={() => setSelectedAddressId(address.id)}
                            />
                            <span className="min-w-0">
                              <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                <TypeIcon size={12} />
                                {label}
                                {address.isDefault ? (
                                  <span className="rounded bg-foreground/10 px-1.5 py-0.5 text-[10px] normal-case tracking-normal">
                                    Default
                                  </span>
                                ) : null}
                              </span>
                              <span className="mt-1 block text-sm leading-relaxed">
                                {formatFullAddress(address)}
                              </span>
                              {address.phone ? (
                                <span className="mt-0.5 block text-xs text-muted-foreground">
                                  {address.phone}
                                </span>
                              ) : null}
                            </span>
                          </label>
                          <button
                            type="button"
                            aria-label="Edit address"
                            onClick={() => openEditAddress(address)}
                            className="shrink-0 rounded-lg p-2 text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground"
                          >
                            <Pencil size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-brand px-5 py-4 text-white">
                <Gift size={18} className="shrink-0" />
                <div className="text-sm">
                  {deliveryFee === 0
                    ? "Free delivery applied for this address."
                    : `Delivery: AED ${deliveryFee}`}
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-lg bg-card p-6 shadow-soft ring-1 ring-border/60 sm:p-8">
              <div className="font-display text-2xl">Order summary</div>
              <dl className="mt-6 space-y-3 text-sm">
                <Row k="Subtotal" v={`AED ${subtotal}`} />
                <Row
                  k="Shipping"
                  v={deliveryFee === 0 ? "Free" : `AED ${deliveryFee}`}
                />
              </dl>

              <div className="mt-6 space-y-2">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Payment
                </div>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("ziina")}
                  className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
                    paymentMethod === "ziina"
                      ? "border-foreground bg-foreground/[0.03]"
                      : "border-border hover:border-foreground/30"
                  }`}
                >
                  <CreditCard size={16} /> Pay online (Ziina)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
                    paymentMethod === "cod"
                      ? "border-foreground bg-foreground/[0.03]"
                      : "border-border hover:border-foreground/30"
                  }`}
                >
                  <Banknote size={16} /> Cash on delivery
                </button>
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                {appliedCoupon ? (
                  <Row
                    k={`Discount (${appliedCoupon})`}
                    v={
                      <span className="font-medium text-emerald-700">
                        −AED {discount}
                      </span>
                    }
                  />
                ) : null}
                <Row
                  k={<span className="font-medium">Total</span>}
                  v={
                    <span className="font-display text-2xl tabular-nums">
                      AED {grandTotal}
                    </span>
                  }
                />
              </div>

              <div className="mt-6">
                {appliedCoupon ? (
                  <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <Gift size={16} className="shrink-0 text-emerald-700" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-emerald-900">
                        {appliedCoupon}
                      </div>
                      <div className="text-xs text-emerald-700">
                        {discount > 0
                          ? `Saving AED ${discount}`
                          : "Coupon applied"}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="shrink-0 text-xs font-medium uppercase tracking-wider text-emerald-800 underline-offset-2 transition hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        value={coupon}
                        onChange={(e) => {
                          setCoupon(e.target.value);
                          if (couponMessage) setCouponMessage("");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            void handleApplyCoupon();
                          }
                        }}
                        placeholder="Discount code"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground/40 focus:ring-2 focus:ring-ring/20"
                      />
                      <button
                        type="button"
                        onClick={() => void handleApplyCoupon()}
                        className="rounded-lg border border-border px-4 text-xs font-medium uppercase tracking-wider transition hover:bg-foreground/5"
                      >
                        Apply
                      </button>
                    </div>
                    {couponMessage ? (
                      <p className="mt-2 text-xs text-red-600">{couponMessage}</p>
                    ) : null}
                  </>
                )}
              </div>
              <button
                type="button"
                disabled={placing || items.length === 0}
                onClick={() => void handlePlaceOrder()}
                className="mt-4 w-full rounded-lg bg-foreground px-6 py-4 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
              >
                {placing
                  ? "Placing order…"
                  : paymentMethod === "ziina"
                    ? "Pay with Ziina"
                    : "Place COD order"}
              </button>
              <Link
                to="/checkout"
                className="mt-3 block text-center text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground"
              >
                Or continue to checkout
              </Link>
              <Link
                to="/shop"
                className="mt-2 block text-center text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </section>

      <AddAddressModal
        isOpen={isAddressFormOpen}
        editAddress={editingAddress}
        onClose={() => {
          setIsAddressFormOpen(false);
          setEditingAddress(null);
        }}
        onSaved={refreshAddresses}
      />

      <Footer />
    </div>
  );
}

function Row({ k, v }: { k: React.ReactNode; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
