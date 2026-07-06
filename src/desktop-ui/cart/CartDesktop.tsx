"use client";

import FallbackImage from "@/components/FallbackImage";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Home,
  Minus,
  Plus,
  Receipt,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import CartPaymentMethodSection from "@/components/cart/CartPaymentMethodSection";
import { imageSizes } from "@/constants/imageSizes";
import { useCartPage } from "@/hooks/useCartPage";
import styles from "./cartDesktop.module.css";

export default function CartDesktop() {
  const cart = useCartPage();

  return (
    <div className={styles.shell}>
      <div className={styles.inner}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Your Cart</h1>
          <p className={styles.pageSubtitle}>
            {cart.items.length === 0
              ? "Review items before checkout"
              : `${cart.itemCount} ${cart.itemCount === 1 ? "item" : "items"} in your cart`}
          </p>
        </header>

        {cart.isLoading && cart.items.length === 0 ? (
          <p className={styles.loadingText}>Loading cart...</p>
        ) : cart.items.length === 0 ? (
          <div className={styles.emptyState}>
            <ShoppingCart className={styles.emptyIcon} size={96} strokeWidth={1.2} />
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptySubtitle}>
              Browse categories and add supplements, gym gear, and wellness products
              to get started.
            </p>
            <Link href="/categories" className={styles.browseBtn}>
              Browse products
              <ArrowRight size={18} />
            </Link>
            {!cart.isAuthenticated && (
              <p className={styles.loginHint}>
                Already have items saved?{" "}
                <Link href="/login?next=/cart">Log in</Link>
              </p>
            )}
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.itemsPanel}>
              {cart.items.map((item) => (
                <article key={item.id} className={styles.itemCard}>
                  <div className={styles.itemImageWrap}>
                    <FallbackImage
                      src={item.image}
                      alt={item.title}
                      fill
                      className={styles.itemImage}
                      sizes={imageSizes.orderThumb}
                    />
                  </div>

                  <div className={styles.itemBody}>
                    <h2 className={styles.itemTitle}>{item.title}</h2>
                    {item.variant && (
                      <p className={styles.itemVariant}>{item.variant}</p>
                    )}
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => cart.removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className={styles.itemActions}>
                    <div className={styles.qtyPill}>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={() =>
                          cart.handleQtyChange(item.id, item.qty - 1)
                        }
                        disabled={item.qty <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className={styles.qtyValue}>{item.qty}</span>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={() =>
                          cart.handleQtyChange(item.id, item.qty + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className={styles.itemPrice}>
                      <CurrencyAmount>
                        {(item.price * item.qty).toLocaleString()}
                      </CurrencyAmount>
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.card}>
                <button
                  type="button"
                  className={styles.optionRow}
                  onClick={cart.openCoupon}
                >
                  Apply coupon
                  {cart.appliedCoupon && (
                    <span className={styles.couponBadge}>
                      {cart.appliedCoupon}
                    </span>
                  )}
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className={styles.card}>
                <div className={styles.rewardRow}>
                  <div>
                    <p className={styles.rewardLabel}>Reward coins</p>
                    <p className={styles.rewardSub}>
                      Available: {cart.rewardCoins}
                    </p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={cart.useRewardCoins}
                      onChange={(event) =>
                        cart.setUseRewardCoins(event.target.checked)
                      }
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
              </div>

              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Bill details</h3>
                <div className={styles.billRow}>
                  <span className={styles.billLabel}>
                    <Receipt size={16} />
                    Items total
                  </span>
                  <span className={styles.billValue}>
                    <CurrencyAmount>
                      {cart.itemsTotal.toLocaleString()}
                    </CurrencyAmount>
                  </span>
                </div>
                <div className={styles.billRow}>
                  <span className={styles.billLabel}>
                    <Truck size={16} />
                    Delivery
                  </span>
                  <span className={styles.billValue}>
                    {cart.deliveryFee === 0 ? (
                      <>
                        <span className={styles.strikethrough}>
                          <CurrencyAmount>30</CurrencyAmount>
                        </span>
                        <span className={styles.freeTag}>FREE</span>
                      </>
                    ) : (
                      <CurrencyAmount>
                        {cart.deliveryFee.toLocaleString()}
                      </CurrencyAmount>
                    )}
                  </span>
                </div>
                <div className={styles.divider} />
                <div className={styles.grandTotal}>
                  <span>Grand total</span>
                  <span>
                    <CurrencyAmount>
                      {cart.grandTotal.toLocaleString()}
                    </CurrencyAmount>
                  </span>
                </div>
              </div>

              <div className={styles.card}>
                <CartPaymentMethodSection
                  value={cart.paymentMethod}
                  onChange={cart.setPaymentMethod}
                />
              </div>

              <div className={styles.card}>
                <div className={styles.addressBlock}>
                  <Home size={20} className={styles.addressIcon} />
                  <div>
                    <p className={styles.addressTitle}>
                      {cart.selectedAddress
                        ? `Delivering to ${cart.selectedAddress.type}`
                        : "Delivery address"}
                    </p>
                    <p className={styles.addressText}>
                      {cart.selectedAddress
                        ? cart.deliveryAddressText
                        : "Add an address to place your order"}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={styles.changeLink}
                    onClick={cart.openAddresses}
                  >
                    {cart.selectedAddress ? "Change" : "Add"}
                  </button>
                </div>
              </div>

              <button
                type="button"
                className={styles.placeOrderBtn}
                onClick={() => void cart.handlePlaceOrder()}
                disabled={cart.placing}
              >
                {cart.placing
                  ? cart.paymentMethod === "cod"
                    ? "Placing order..."
                    : "Opening payment..."
                  : cart.isAuthenticated
                    ? cart.paymentMethod === "cod"
                      ? "Place Order (COD)"
                      : "Pay with Ziina"
                    : "Login to checkout"}
                <ArrowRight size={20} />
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
