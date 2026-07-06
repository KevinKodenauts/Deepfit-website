"use client";

import { Banknote, CreditCard } from "lucide-react";
import styles from "./CartPaymentMethodSection.module.css";

export type CartPaymentMethod = "ziina" | "cod";

type CartPaymentMethodSectionProps = {
  value: CartPaymentMethod;
  onChange: (method: CartPaymentMethod) => void;
};

export default function CartPaymentMethodSection({
  value,
  onChange,
}: CartPaymentMethodSectionProps) {
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Payment method</h3>
      <div className={styles.list}>
        <button
          type="button"
          className={`${styles.card} ${value === "ziina" ? styles.cardSelected : ""}`}
          onClick={() => onChange("ziina")}
          aria-pressed={value === "ziina"}
        >
          <div className={styles.iconWrap}>
            <CreditCard size={22} />
          </div>
          <div className={styles.info}>
            <p className={styles.cardTitle}>Pay Online (Ziina)</p>
            <p className={styles.cardDesc}>Cards, Apple Pay & more</p>
          </div>
          <span
            className={`${styles.radio} ${value === "ziina" ? styles.radioSelected : ""}`}
            aria-hidden
          />
        </button>

        <button
          type="button"
          className={`${styles.card} ${value === "cod" ? styles.cardSelected : ""}`}
          onClick={() => onChange("cod")}
          aria-pressed={value === "cod"}
        >
          <div className={styles.iconWrap}>
            <Banknote size={22} />
          </div>
          <div className={styles.info}>
            <p className={styles.cardTitle}>Cash on Delivery</p>
            <p className={styles.cardDesc}>Pay when you receive</p>
          </div>
          <span
            className={`${styles.radio} ${value === "cod" ? styles.radioSelected : ""}`}
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
}
