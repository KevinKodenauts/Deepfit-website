"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Home,
  Minus,
  Plus,
  Receipt,
  ShoppingCart,
  Truck,
} from "lucide-react";
import ApplyCouponSheet from "@/components/ApplyCouponSheet";
import SelectAddressSheet from "@/components/SelectAddressSheet";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { useCartPage } from "@/hooks/useCartPage";
import { useSheetOrNavigate } from "@/hooks/useSheetOrNavigate";
import styles from "./cart.module.css";

export default function CartMobile() {
  const { openOrNavigate } = useSheetOrNavigate();
  const cart = useCartPage();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => cart.router.back()}
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <h1 className={styles.title}>Cart</h1>
      </header>

      {cart.isLoading && cart.items.length === 0 ? (
        <p className={styles.loadingText}>Loading cart...</p>
      ) : cart.items.length === 0 ? (
        <div className={styles.emptyState}>
          <ShoppingCart className={styles.emptyIcon} size={80} strokeWidth={1.5} />
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptySubtitle}>
            Add items to your cart to checkout
          </p>
        </div>
      ) : (
        <div className={styles.body}>
          <div className={styles.scrollContent}>
            <section className={styles.deliverySection}>
              <h2 className={styles.deliveryTitle}>Delivery in 17 minutes</h2>
              <p className={styles.deliverySubtitle}>
                Shipment of {cart.itemCount}{" "}
                {cart.itemCount === 1 ? "item" : "items"}
              </p>

              <div className={styles.itemsList}>
                {cart.items.map((item) => (
                  <div key={item.id} className={styles.itemRow}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={70}
                      height={70}
                      className={styles.itemImage}
                    />

                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                      {item.variant && (
                        <p className={styles.itemVariant}>{item.variant}</p>
                      )}
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => cart.removeItem(item.id)}
                      >
                        Remove from cart
                      </button>
                    </div>

                    <div className={styles.itemRight}>
                      <div className={styles.qtyPill}>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() =>
                            cart.handleQtyChange(item.id, item.qty - 1)
                          }
                          disabled={item.qty <= 1}
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
                  </div>
                ))}
              </div>
            </section>

            <button
              type="button"
              className={styles.applyCouponCard}
              onClick={() =>
                openOrNavigate("/cart/coupon", () => cart.setIsCouponOpen(true))
              }
            >
              <span className={styles.applyCouponLabel}>Apply Coupon</span>
              {cart.appliedCoupon && (
                <span className={styles.couponBadge}>{cart.appliedCoupon}</span>
              )}
              <ChevronRight size={16} className={styles.optionChevron} />
            </button>

            <div className={styles.rewardCard}>
              <div className={styles.rewardInfo}>
                <p className={styles.rewardLabel}>Reward coins</p>
                <p className={styles.rewardSubtext}>
                  My total coins: {cart.rewardCoins}
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

            <div className={styles.billCard}>
              <h3 className={styles.billTitle}>Bill details</h3>

              <div className={styles.billRow}>
                <span className={styles.billLeft}>
                  <Receipt size={18} />
                  Items total
                </span>
                <span className={styles.billValue}>
                  <CurrencyAmount>
                    {cart.itemsTotal.toLocaleString()}
                  </CurrencyAmount>
                </span>
              </div>

              <div className={styles.billRow}>
                <span className={styles.billLeft}>
                  <Truck size={18} />
                  Delivery charge
                </span>
                <span className={styles.deliveryValue}>
                  <span className={styles.strikethrough}>
                    <CurrencyAmount>30</CurrencyAmount>
                  </span>
                  <span className={styles.freeTag}>FREE</span>
                </span>
              </div>

              <div className={styles.billDivider} />

              <div className={styles.grandTotalRow}>
                <span className={styles.grandTotalLabel}>Grand total</span>
                <span className={styles.grandTotalValue}>
                  <CurrencyAmount>
                    {cart.grandTotal.toLocaleString()}
                  </CurrencyAmount>
                </span>
              </div>
            </div>
          </div>

          <footer className={styles.stickyFooter}>
            <div className={styles.addressRow}>
              <Home size={22} className={styles.addressIcon} />
              <div className={styles.addressInfo}>
                <p className={styles.addressTitle}>
                  {cart.selectedAddress
                    ? `Delivering to ${cart.selectedAddress.type}`
                    : "Select delivery address"}
                </p>
                <p className={styles.addressText}>
                  {cart.selectedAddress
                    ? cart.deliveryAddressText
                    : "Add an address to place your order"}
                </p>
              </div>
              <button
                type="button"
                className={styles.changeBtn}
                onClick={() =>
                  openOrNavigate("/profile/addresses", () =>
                    cart.setIsAddressOpen(true)
                  )
                }
              >
                {cart.selectedAddress ? "Change" : "Add"}
              </button>
            </div>

            <div className={styles.footerAction}>
              <div className={styles.totalBlock}>
                <p className={styles.totalAmount}>
                  <CurrencyAmount>
                    {cart.grandTotal.toLocaleString()}
                  </CurrencyAmount>
                </p>
                <p className={styles.totalLabel}>TOTAL</p>
              </div>
              <button
                type="button"
                className={styles.placeOrderBtn}
                onClick={() =>
                  cart.handlePlaceOrder({
                    onMissingAddress: () =>
                      openOrNavigate("/profile/addresses", () =>
                        cart.setIsAddressOpen(true)
                      ),
                  })
                }
                disabled={cart.placing}
              >
                {cart.placing ? "Placing..." : "Place Order"}
                <ArrowRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </footer>
        </div>
      )}

      <ApplyCouponSheet
        isOpen={cart.isCouponOpen}
        onClose={() => cart.setIsCouponOpen(false)}
        onApply={cart.handleApplyCoupon}
        appliedCode={cart.appliedCoupon}
      />

      <SelectAddressSheet
        isOpen={cart.isAddressOpen}
        onClose={() => cart.setIsAddressOpen(false)}
        addresses={cart.addresses}
        selectedId={cart.selectedAddressId}
        onSelect={cart.handleAddressSelect}
        onAddressesUpdated={cart.loadAddresses}
      />
    </div>
  );
}
