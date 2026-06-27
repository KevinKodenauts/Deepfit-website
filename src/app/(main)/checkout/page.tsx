"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  Check,
  CreditCard,
  Banknote,
  ShieldCheck,
  Building2,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./checkout.module.css";
import ChangeAddressModal from "@/components/ChangeAddressModal";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { useCart } from "@/contexts/CartContext";
import { useCatalogSync } from "@/hooks/useCatalogSync";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { getAddresses, type AddressView } from "@/lib/api/addresses";
import {
  getShippingCharge,
  placeOrder,
  validateCoupon,
} from "@/lib/api/orders";
import { getCustomerId } from "@/lib/auth/session";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, refreshCart } = useCart();
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<AddressView[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
      return;
    }

    if (authLoading || !isAuthenticated) return;
    const customerId = getCustomerId();
    if (!customerId) return;

    getAddresses(customerId)
      .then((data) => {
        setAddresses(data);
        if (data.length > 0) {
          setSelectedAddressId(String(data[0].id));
          if (data[0].pincode) {
            getShippingCharge(customerId, data[0].pincode).then(setDeliveryFee);
          }
        }
      })
      .catch(() => setAddresses([]));
  }, [authLoading, isAuthenticated, items.length, router]);

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

  const discount = 0;
  const grandTotal = subtotal + deliveryFee - discount;

  const handleApplyPromo = async () => {
    const customerId = getCustomerId();
    if (!customerId || !promoCode.trim()) return;

    setPromoError("");
    try {
      const result = await validateCoupon(customerId, promoCode.trim());
      if (result.status) {
        setIsPromoApplied(true);
      } else {
        setPromoError(result.message ?? "Invalid coupon code");
        setIsPromoApplied(false);
      }
    } catch {
      setPromoError("Could not validate coupon");
    }
  };

  const handleRemovePromo = () => {
    setIsPromoApplied(false);
    setPromoCode("");
    setPromoError("");
  };

  const handlePlaceOrder = async () => {
    const customerId = getCustomerId();
    if (!customerId || items.length === 0) return;

    const addressId = Number(selectedAddressId);
    if (!addressId) {
      alert("Please add a delivery address first.");
      router.push("/profile/addresses");
      return;
    }

    setPlacing(true);
    try {
      const result = await placeOrder({
        customerId,
        addressId,
        paymentMethod: selectedPayment === "cod" ? "COD" : "ONLINE",
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.qty,
          variantId: item.variantId,
        })),
        couponCode: isPromoApplied ? promoCode.trim() : undefined,
      });

      if (!result.status || !result.orderNumber) {
        alert(result.message ?? "Could not place order.");
        return;
      }

      await refreshCart();
      router.push(
        `/orders/success?orderNumber=${encodeURIComponent(result.orderNumber)}&orderId=${result.orderId ?? ""}`
      );
    } catch {
      alert("Something went wrong while placing your order.");
    } finally {
      setPlacing(false);
    }
  };

  const selectedAddress = addresses.find(
    (a) => String(a.id) === selectedAddressId
  );

  const modalAddresses = addresses.map((addr) => ({
    id: String(addr.id),
    type: (addr.type === "Office" ? "Work" : addr.type) as "Work" | "Home",
    address: [addr.fullName, addr.address, addr.city, addr.state, addr.pincode]
      .filter(Boolean)
      .join(", "),
    phone: addr.phone ?? "",
    distance: addr.isDefault ? "Default" : "",
    isHere: addr.isDefault,
  }));

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <h1 className={styles.title}>Checkout</h1>
      </header>

      <div className={`${styles.content} ${styles.contentWithStickyFooter}`}>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.id} className={styles.itemCard}>
              <Image
                src={item.image}
                alt={item.title}
                width={56}
                height={56}
                className={styles.itemImage}
              />
              <div className={styles.itemInfo}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemSubtitle}>
                  {item.variant} • Qty: {item.qty}
                </p>
              </div>
              <div className={styles.itemPrice}>
                <CurrencyAmount>
                  {(item.price * item.qty).toLocaleString()}
                </CurrencyAmount>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.billSummary}>
          <div className={styles.billRow}>
            <span className={styles.billLabel}>Item Total</span>
            <span className={styles.billValue}>
              <CurrencyAmount>{subtotal.toLocaleString()}</CurrencyAmount>
            </span>
          </div>
          {isPromoApplied && (
            <div className={`${styles.billRow} ${styles.discountLabel}`}>
              <span>Promo Applied</span>
              <span>
                <CurrencyAmount>-{discount.toLocaleString()}</CurrencyAmount>
              </span>
            </div>
          )}
          <div className={styles.billRow}>
            <span className={styles.billLabel}>Delivery Fee</span>
            <span className={`${styles.billValue} ${styles.free}`}>
              {deliveryFee === 0 ? (
                "FREE"
              ) : (
                <CurrencyAmount>{deliveryFee}</CurrencyAmount>
              )}
            </span>
          </div>
          <div className={`${styles.billRow} ${styles.grandTotal}`}>
            <span className={styles.billLabel}>Grand Total</span>
            <span className={styles.billValue}>
              <CurrencyAmount>{grandTotal.toLocaleString()}</CurrencyAmount>
            </span>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Promo Code</h2>
        {!isPromoApplied ? (
          <div className={styles.promoBox}>
            <input
              type="text"
              placeholder="Enter Promo Code"
              className={styles.promoInput}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className={styles.applyBtn} onClick={handleApplyPromo}>
              Apply
            </button>
          </div>
        ) : (
          <div className={styles.promoSuccessBox}>
            <div className={styles.promoSuccessLeft}>
              <div className={styles.successIconWrap}>
                <Check size={14} strokeWidth={4} />
              </div>
              <div>
                <div className={styles.promoAppliedTitle}>
                  {promoCode.toUpperCase()}{" "}
                  <span className={styles.appliedBadge}>APPLIED</span>
                </div>
                <div className={styles.promoAppliedDesc}>
                  Promo code applied successfully!
                </div>
              </div>
            </div>
            <button className={styles.removeBtn} onClick={handleRemovePromo}>
              REMOVE
            </button>
          </div>
        )}
        {promoError && (
          <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "8px" }}>
            {promoError}
          </p>
        )}

        <h2 className={styles.sectionTitle}>Payment Method</h2>
        <div className={styles.paymentList}>
          <div
            className={`${styles.paymentCard} ${selectedPayment === "credit" ? styles.paymentCardSelected : ""}`}
            onClick={() => setSelectedPayment("credit")}
          >
            <div className={styles.paymentIconWrap}>
              <CreditCard size={24} />
            </div>
            <div className={styles.paymentInfo}>
              <h3 className={styles.paymentTitle}>Credit / Debit Cards</h3>
              <p className={styles.paymentDesc}>Visa, Mastercard, Amex</p>
            </div>
            <div
              className={`${styles.radioCircle} ${selectedPayment === "credit" ? styles.radioSelected : ""}`}
            />
          </div>

          <div
            className={`${styles.paymentCard} ${selectedPayment === "cod" ? styles.paymentCardSelected : ""}`}
            onClick={() => setSelectedPayment("cod")}
          >
            <div className={styles.paymentIconWrap}>
              <Banknote size={24} />
            </div>
            <div className={styles.paymentInfo}>
              <h3 className={styles.paymentTitle}>Cash on Delivery</h3>
              <p className={styles.paymentDesc}>Pay when you receive</p>
            </div>
            <div
              className={`${styles.radioCircle} ${selectedPayment === "cod" ? styles.radioSelected : ""}`}
            />
          </div>
        </div>

        <div className={styles.secureFooter}>
          <ShieldCheck size={14} />
          <span>100% SAFE & SECURE PAYMENTS</span>
        </div>

        <div className={styles.stickyFooter}>
          <div className={styles.addressSummary}>
            <div className={styles.addressLeft}>
              <Building2 className={styles.addressIcon} size={24} />
              <div>
                <h4 className={styles.addressTitle}>
                  {selectedAddress
                    ? `Delivering to ${selectedAddress.type}`
                    : "No address saved"}
                </h4>
                <p className={styles.addressText}>
                  {selectedAddress
                    ? [selectedAddress.address, selectedAddress.city]
                        .filter(Boolean)
                        .join(", ")
                    : "Add an address to continue"}
                </p>
              </div>
            </div>
            <button
              className={styles.changeBtn}
              onClick={() => setIsAddressModalOpen(true)}
            >
              Change
            </button>
          </div>

          <div className={styles.footerActionRow}>
            <div className={styles.payInfo}>
              <span className={styles.payLabel}>
                Pay via {selectedPayment === "credit" ? "Card" : "Cash"}
              </span>
              <span className={styles.payAmount}>
                <CurrencyAmount>{grandTotal.toLocaleString()}</CurrencyAmount>
              </span>
            </div>
            <button
              className={styles.placeOrderBtn}
              onClick={handlePlaceOrder}
              disabled={placing || !selectedAddress}
            >
              {placing ? "Placing..." : "Place Order"}{" "}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <ChangeAddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        addresses={modalAddresses}
        selectedId={selectedAddressId}
        onSelect={(id) => {
          setSelectedAddressId(id);
          setIsAddressModalOpen(false);
          const addr = addresses.find((a) => String(a.id) === id);
          const customerId = getCustomerId();
          if (addr?.pincode && customerId) {
            getShippingCharge(customerId, addr.pincode).then(setDeliveryFee);
          }
        }}
      />
    </div>
  );
}
