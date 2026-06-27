"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Check, Truck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./track.module.css";
import { imageSizes } from "@/constants/imageSizes";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { getCustomerOrders, type OrderSummary } from "@/lib/api/orders";
import { getCustomerId } from "@/lib/auth/session";

function OrderTrackingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = Number(searchParams.get("orderId"));
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const [order, setOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;

    const customerId = getCustomerId();
    if (!customerId || !orderId) return;

    getCustomerOrders(customerId)
      .then((orders) => orders.find((o) => o.id === orderId) ?? null)
      .then(setOrder)
      .catch(() => setOrder(null));
  }, [authLoading, isAuthenticated, orderId]);

  const status = order?.orderStatus ?? "In Transit";

  return (
    <div className={styles.trackContainer}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.pageTitle}>Track order</h1>
      </header>

      <motion.div
        className={styles.mapSection}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.mapWrapper}>
          <Image
            src="/images/map-tracking.png"
            alt="Delivery Map Route"
            fill
            sizes={imageSizes.mapTracking}
            className={styles.mapImage}
            priority
          />
        </div>
      </motion.div>

      <motion.div
        className={styles.statusBox}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className={styles.statusHeader}>
          <div className={styles.etaBlock}>
            <span className={styles.etaLabel}>Order Number</span>
            <span className={styles.etaTime}>
              {order ? `#${order.orderNumber}` : "—"}
            </span>
          </div>
          <span className={styles.statusBadge}>{status}</span>
        </div>
        <p className={styles.statusDesc}>
          Your fitness products are on the way. Track progress below while our
          delivery partner brings your order to you.
        </p>
      </motion.div>

      <motion.div
        className={styles.progressSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className={styles.progressTitle}>Order Progress</h3>

        <div className={styles.timeline}>
          <div className={styles.timelineStep}>
            <div className={`${styles.stepIcon} ${styles.completed}`}>
              <Check size={14} strokeWidth={3} />
            </div>
            <div className={styles.stepContent}>
              <span className={`${styles.stepTitle} ${styles.completed}`}>
                Order Placed
              </span>
              <span className={styles.stepMeta}>
                {order?.orderDate ?? "Confirmed"}
              </span>
            </div>
          </div>

          <div className={styles.timelineStep}>
            <div className={`${styles.stepIcon} ${styles.completed}`}>
              <Check size={14} strokeWidth={3} />
            </div>
            <div className={styles.stepContent}>
              <span className={`${styles.stepTitle} ${styles.completed}`}>
                Packed
              </span>
              <span className={styles.stepMeta}>Processing</span>
            </div>
          </div>

          <div className={styles.timelineStep}>
            <div className={`${styles.stepIcon} ${styles.active}`}>
              <Truck size={12} strokeWidth={2.5} />
            </div>
            <div className={styles.stepContent}>
              <span className={`${styles.stepTitle} ${styles.active}`}>
                On the way
              </span>
              <span className={`${styles.stepMeta} ${styles.active}`}>
                {status}
              </span>
            </div>
          </div>

          <div className={styles.timelineStep}>
            <div className={styles.stepIcon}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#94a3b8",
                }}
              />
            </div>
            <div className={styles.stepContent}>
              <span className={`${styles.stepTitle} ${styles.pending}`}>
                Delivered
              </span>
              <span className={styles.stepMeta}>Pending</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className={styles.helpLink}>
        <Link href="/orders">Back to My Orders</Link>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<p style={{ padding: "24px", color: "#64748b" }}>Loading...</p>}>
      <OrderTrackingContent />
    </Suspense>
  );
}
