"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Check, Truck, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./success.module.css";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") ?? "#ORDER";
  const orderId = searchParams.get("orderId");

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
          Your fitness essentials are on the way
        </motion.p>

        <motion.div
          className={styles.infoGrid}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className={styles.infoCard}>
            <span className={styles.infoLabel}>ORDER ID</span>
            <span className={styles.infoValue}>#{orderNumber}</span>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoLabel}>STATUS</span>
            <span className={styles.infoValue}>Confirmed</span>
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
