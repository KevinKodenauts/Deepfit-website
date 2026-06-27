"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import styles from "./ApplyCouponSheet.module.css";

type ApplyCouponSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (code: string) => Promise<string | null>;
  appliedCode?: string | null;
};

export default function ApplyCouponSheet({
  isOpen,
  onClose,
  onApply,
  appliedCode,
}: ApplyCouponSheetProps) {
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState("");

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setCouponCode(appliedCode ?? "");
      setError("");
      setIsApplying(false);
    }
  }, [isOpen, appliedCode]);

  const handleApply = async () => {
    const code = couponCode.trim();
    if (!code) {
      setError("Please enter a coupon code");
      return;
    }

    setIsApplying(true);
    setError("");
    const result = await onApply(code);
    setIsApplying(false);

    if (result) {
      setError(result);
      return;
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.backdrop} data-lenis-prevent onClick={onClose}>
          <motion.div
            className={styles.sheet}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.handle} />
            <h2 className={styles.title}>Apply Coupon</h2>

            <div className={styles.inputWrap}>
              <Tag size={20} className={styles.inputIcon} />
              <input
                type="text"
                className={styles.input}
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(event) => setCouponCode(event.target.value.toUpperCase())}
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button
              type="button"
              className={styles.applyBtn}
              onClick={handleApply}
              disabled={isApplying}
            >
              {isApplying ? <span className={styles.spinner} /> : "Apply Coupon"}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
