"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingCart, Hash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useCart } from "@/contexts/CartContext";
import styles from "./CartModal.module.css";
import { CurrencyAmount } from "@/components/CurrencySymbol";

export default function CartModal() {
  const router = useRouter();
  const { isCartOpen, pendingProduct, closeCart, confirmAddToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [qtyInput, setQtyInput] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useBodyScrollLock(isCartOpen);

  useEffect(() => {
    if (isCartOpen && pendingProduct) {
      setQuantity(1);
      setQtyInput("1");
      setIsSubmitting(false);
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
    setIsSubmitting(true);
    const error = await confirmAddToCart(quantity);
    setIsSubmitting(false);

    if (error?.includes("login")) {
      closeCart();
      router.replace("/login");
      return;
    }

    if (!error) {
      router.push("/cart");
    }
  };

  const itemLabel = quantity === 1 ? "item" : "items";

  return (
    <AnimatePresence>
      {isCartOpen && pendingProduct && (
        <div
          className={styles.backdrop}
          data-lenis-prevent
          onClick={closeCart}
        >
          <motion.div
            className={styles.sheet}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.handle} />

            <div className={styles.header}>
              <h2 className={styles.title}>Add to Cart</h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={closeCart}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

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

            <div className={styles.footer}>
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
