"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingCart, Hash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useCart } from "@/contexts/CartContext";
import styles from "./CartModal.module.css";
import { CurrencyAmount } from "@/components/CurrencySymbol";

export default function CartModal() {
  const router = useRouter();
  const { isDesktop, isHydrated } = useBreakpoint();
  const desktop = isHydrated && isDesktop;
  const { isCartOpen, pendingProduct, closeCart, confirmAddToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [qtyInput, setQtyInput] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useBodyScrollLock(isCartOpen);

  useEffect(() => {
    if (isCartOpen && pendingProduct) {
      setQuantity(1);
      setQtyInput("1");
      setIsSubmitting(false);
      setError("");
    }
  }, [isCartOpen, pendingProduct?.productId]);

  const syncQuantity = (next: number) => {
    const value = Math.max(1, next);
    setQuantity(value);
    setQtyInput(String(value));
  };

  const handleInputChange = (value: string) => {
    const digits = value.replace(/\D/g, "");
    setQtyInput(digits);

    const parsed = parseInt(digits, 10);
    if (!Number.isNaN(parsed) && parsed > 0) {
      setQuantity(parsed);
    }
  };

  const handleInputBlur = () => {
    const parsed = parseInt(qtyInput, 10);
    if (Number.isNaN(parsed) || parsed < 1) {
      syncQuantity(quantity);
    } else {
      syncQuantity(parsed);
    }
  };

  const handleAddToCart = async () => {
    if (!pendingProduct) return;

    setIsSubmitting(true);
    setError("");

    const apiError = await confirmAddToCart(quantity, pendingProduct);
    setIsSubmitting(false);

    if (apiError?.includes("login")) {
      closeCart();
      router.replace("/login");
      return;
    }

    if (apiError) {
      setError(apiError);
      return;
    }

    router.push("/cart");
  };

  const itemLabel = quantity === 1 ? "item" : "items";
  const lineTotal = pendingProduct
    ? pendingProduct.price * quantity
    : 0;

  return (
    <AnimatePresence>
      {isCartOpen && pendingProduct && (
        <div
          className={`${styles.backdrop} ${desktop ? styles.backdropDesktop : ""}`}
          data-lenis-prevent
          onClick={closeCart}
        >
          <motion.div
            className={`${styles.sheet} ${desktop ? styles.sheetDesktop : ""}`}
            initial={
              desktop ? { opacity: 0, y: 8 } : { y: "100%" }
            }
            animate={desktop ? { opacity: 1, y: 0 } : { y: 0 }}
            exit={desktop ? { opacity: 0, y: 8 } : { y: "100%" }}
            transition={
              desktop
                ? { duration: 0.18, ease: "easeOut" }
                : { type: "spring", damping: 28, stiffness: 320 }
            }
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-to-cart-title"
          >
            {!desktop && <div className={styles.handle} />}

            <div className={styles.header}>
              <h2 id="add-to-cart-title" className={styles.title}>
                Add to cart
              </h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={closeCart}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {desktop ? (
              <>
                <div className={styles.desktopBody}>
                  <div className={styles.productRow}>
                    <Image
                      src={pendingProduct.image}
                      alt={pendingProduct.title}
                      width={64}
                      height={64}
                      className={styles.productThumb}
                    />
                    <div className={styles.productMeta}>
                      <p className={styles.productName}>
                        {pendingProduct.title}
                      </p>
                      <p className={styles.productPrice}>
                        <CurrencyAmount>
                          {pendingProduct.price.toLocaleString()}
                        </CurrencyAmount>
                      </p>
                    </div>
                  </div>

                  <div className={styles.qtyRow}>
                    <span className={styles.qtyLabel}>Quantity</span>
                    <div className={styles.stepper}>
                      <button
                        type="button"
                        className={styles.stepperBtn}
                        onClick={() => syncQuantity(quantity - 1)}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className={styles.qtyValue}>{quantity}</span>
                      <button
                        type="button"
                        className={styles.stepperBtn}
                        onClick={() => syncQuantity(quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.desktopFooter}>
                  {error && <p className={styles.errorText}>{error}</p>}
                  <div className={styles.desktopFooterRow}>
                    <p className={styles.total}>
                      <CurrencyAmount>{lineTotal.toLocaleString()}</CurrencyAmount>
                    </p>
                    <button
                      type="button"
                      className={styles.addBtn}
                      onClick={handleAddToCart}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className={styles.spinner} />
                      ) : (
                        "Add to cart"
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.divider} />

                <div className={styles.productSection}>
                  <Image
                    src={pendingProduct.image}
                    alt={pendingProduct.title}
                    width={80}
                    height={80}
                    className={styles.productImage}
                  />
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{pendingProduct.title}</h3>
                    <p className={styles.productPrice}>
                      <CurrencyAmount>
                        {pendingProduct.price.toLocaleString()}
                      </CurrencyAmount>
                    </p>
                  </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.quantitySection}>
                  <p className={styles.quantityLabel}>Quantity</p>

                  <div className={styles.stepper}>
                    <button
                      type="button"
                      className={styles.stepperBtn}
                      onClick={() => syncQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={20} />
                    </button>

                    <span className={styles.qtyDisplay}>{quantity}</span>

                    <button
                      type="button"
                      className={`${styles.stepperBtn} ${styles.stepperBtnPlus}`}
                      onClick={() => syncQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <div className={styles.orDivider}>
                    <span className={styles.orLine} />
                    <span className={styles.orText}>OR</span>
                    <span className={styles.orLine} />
                  </div>

                  <div className={styles.qtyInputWrap}>
                    <span className={styles.qtyInputLabel}>Enter quantity</span>
                    <Hash size={18} className={styles.qtyInputIcon} />
                    <input
                      type="text"
                      inputMode="numeric"
                      className={styles.qtyInput}
                      value={qtyInput}
                      onChange={(event) => handleInputChange(event.target.value)}
                      onBlur={handleInputBlur}
                      aria-label="Enter quantity"
                    />
                  </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.footer}>
                  {error && <p className={styles.errorText}>{error}</p>}
                  <button
                    type="button"
                    className={styles.addBtn}
                    onClick={handleAddToCart}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className={styles.spinner} />
                    ) : (
                      <>
                        <ShoppingCart size={22} />
                        Add to Cart • {quantity} {itemLabel}
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
