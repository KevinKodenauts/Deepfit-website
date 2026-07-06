"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Truck, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { confirmZiinaPayment, verifyZiinaPayment } from "@/lib/api/orders";
import { getAccessToken } from "@/lib/auth/session";
import styles from "./success.module.css";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const { refreshCart } = useCart();
  const orderNumber = searchParams.get("orderNumber") ?? "#ORDER";
  const orderId = searchParams.get("orderId");
  const paymentIntentFromQuery = searchParams.get("paymentIntentId");
  const needsPaymentCheck = Boolean(orderId);
  const [verifying, setVerifying] = useState(needsPaymentCheck);
  const [paymentError, setPaymentError] = useState("");
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState(orderNumber);

  useEffect(() => {
    let cancelled = false;

    async function confirmPayment() {
      if (!orderId) {
        setVerifying(false);
        return;
      }

      const paymentIntentId =
        paymentIntentFromQuery ||
        (typeof window !== "undefined"
          ? sessionStorage.getItem(`ziina:${orderId}`)
          : null);

      try {
        // Prefer website-side Ziina verification when we have an intent id.
        if (paymentIntentId) {
          const result = await confirmZiinaPayment({
            orderId,
            paymentIntentId,
            accessToken: getAccessToken(),
          });

          if (cancelled) return;

          if (result.status) {
            sessionStorage.removeItem(`ziina:${orderId}`);
            await refreshCart();
          } else {
            setPaymentError(
              result.message ??
                "Payment is still processing. Your order will update once confirmed."
            );
          }
          return;
        }

        // Fallback: Django verify (COD or backend-managed Ziina).
        const result = await verifyZiinaPayment({ orderId });
        if (cancelled) return;

        if (result.status) {
          if (result.orderNumber) {
            setConfirmedOrderNumber(result.orderNumber);
          }
          await refreshCart();
        } else if (result.paymentStatus) {
          setPaymentError(
            result.message ??
              "Payment is still processing. Your order will update once confirmed."
          );
        } else {
          await refreshCart();
        }
      } catch {
        if (!cancelled && paymentIntentId) {
          setPaymentError(
            "Could not verify payment yet. If you were charged, your order will confirm shortly."
          );
        } else if (!cancelled) {
          await refreshCart();
        }
      } finally {
        if (!cancelled) setVerifying(false);
      }
    }

    void confirmPayment();
    return () => {
      cancelled = true;
    };
  }, [orderId, paymentIntentFromQuery, refreshCart]);

  if (verifying) {
    return (
      <div className={styles.container}>
        <div className={styles.content} style={{ textAlign: "center" }}>
          <Loader2
            size={40}
            className="animate-spin"
            style={{ margin: "48px auto 16px", color: "#0f172a" }}
          />
          <p style={{ color: "#64748b" }}>Confirming your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.iconWrapper}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
        >
          <div className={styles.mainCircle}>
            <Check size={48} strokeWidth={3} />
          </div>
          <motion.div
            className={styles.chipSuccess}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            SUCCESS
          </motion.div>
          <motion.div
            className={styles.chipConfirmed}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            CONFIRMED
          </motion.div>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Order Confirmed
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {paymentError || "Your fitness essentials are on the way"}
        </motion.p>

        <motion.div
          className={styles.infoGrid}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className={styles.infoCard}>
            <span className={styles.infoLabel}>ORDER ID</span>
            <span className={styles.infoValue}>#{confirmedOrderNumber}</span>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoLabel}>STATUS</span>
            <span className={styles.infoValue}>
              {paymentError ? "Processing" : "Confirmed"}
            </span>
          </div>
        </motion.div>

        <motion.div
          className={styles.bundleCard}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Image
            src="/images/dumbbells.png"
            alt="Order placed"
            width={56}
            height={56}
            className={styles.bundleImage}
          />
          <div className={styles.bundleInfo}>
            <h3 className={styles.bundleTitle}>Order Placed</h3>
            <p className={styles.bundleDesc}>Track your delivery anytime</p>
          </div>
          <ChevronRight size={20} className={styles.arrowIcon} />
        </motion.div>

        <motion.div
          className={styles.actions}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Link
            href={orderId ? `/orders/track?orderId=${orderId}` : "/orders/track"}
            className={styles.trackBtn}
          >
            <Truck size={20} /> Track Order
          </Link>
          <Link href="/home" className={styles.continueBtn}>
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<p style={{ padding: "24px", color: "#64748b" }}>Loading...</p>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
