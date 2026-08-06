import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearch } from "@tanstack/react-router";
import { ChevronLeft, Check, CreditCard, BadgeCheck } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import styles from "@/styles/orders/details.module.css";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import {
  canCancelOrder,
  canReturnOrder,
  cancelOrder,
  returnOrder,
  getCustomerOrders,
  type OrderSummary,
} from "@/lib/api/orders";
import { getCustomerId } from "@/lib/auth/session";
import { OrderDetailsSkeleton } from "@/components/skeleton/PageSkeletons";

export function OrderDetailsPage() {
  const search = useSearch({ from: "/orders/details" });
  const orderId = Number(search.orderId);
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const loadOrder = useCallback(
    (options?: { silent?: boolean }) => {
      if (authLoading || !isAuthenticated) return;

      const customerId = getCustomerId();
      if (!customerId || !orderId) {
        setLoading(false);
        return;
      }

      if (!options?.silent) setLoading(true);
      getCustomerOrders(customerId)
        .then((orders) => orders.find((o) => o.id === orderId) ?? null)
        .then(setOrder)
        .catch(() => setOrder(null))
        .finally(() => {
          if (!options?.silent) setLoading(false);
        });
    },
    [authLoading, isAuthenticated, orderId]
  );

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  const handleCancelOrder = async () => {
    if (!order || isCancelling) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel this order? If you paid online, a refund will be processed automatically."
    );
    if (!confirmed) return;

    setIsCancelling(true);
    try {
      const res = await cancelOrder(order.id);
      if (res.status) {
        setOrder({ ...order, orderStatus: "Cancelled", canReturn: false });
        loadOrder({ silent: true });
      } else {
        window.alert(res.message || "Failed to cancel order. Please try again.");
      }
    } catch {
      window.alert("Failed to cancel order. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleReturnOrder = async () => {
    if (!order || isReturning) return;

    const reason =
      window.prompt(
        "Please share a reason for returning this order (optional):",
        ""
      ) ?? null;
    if (reason === null) return;

    const confirmed = window.confirm(
      "Submit a return request? An admin will review it after the product is received."
    );
    if (!confirmed) return;

    setIsReturning(true);
    try {
      const res = await returnOrder(order.id, reason.trim() || undefined);
      if (res.status) {
        setOrder({
          ...order,
          orderStatus: "Return Requested",
          canReturn: false,
        });
        loadOrder({ silent: true });
        window.alert(
          res.message ||
            "Return request submitted. Admin will review after receiving the product."
        );
      } else {
        window.alert(res.message || "Failed to submit return. Please try again.");
      }
    } catch {
      window.alert("Failed to submit return. Please try again.");
    } finally {
      setIsReturning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <OrderDetailsSkeleton />
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <div className={`${styles.detailsContainer} pt-24`}>
          <header className={styles.header}>
            <button
              type="button"
              className={styles.backBtn}
              onClick={() => window.history.back()}
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className={styles.pageTitle}>Orders Details</h1>
          </header>
          <p style={{ padding: "24px", color: "#64748b" }}>Order not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const itemTotal = order.orderedProducts.reduce(
    (sum, p) => sum + p.totalPrice,
    0
  );
  const showCancel = canCancelOrder(order.orderStatus);
  const showReturn = canReturnOrder(order);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className={`${styles.detailsContainer} pt-24`}>
        <header className={styles.header}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => window.history.back()}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className={styles.pageTitle}>Orders Details</h1>
        </header>

        <div className={styles.scrollContent}>
          <motion.div
            className={styles.statusCard}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.checkCircle}>
              <Check size={24} strokeWidth={3} />
            </div>
            <div className={styles.statusText}>
              <h2 className={styles.statusTitle}>{order.orderStatus}</h2>
              <span className={styles.statusDate}>
                Order #{order.orderNumber} • {order.orderDate}
              </span>
            </div>
          </motion.div>

          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>
              ORDER ITEMS ({order.orderedProducts.length})
            </span>
          </div>
          <motion.div
            className={styles.itemsBlock}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {order.orderedProducts.map((product) => (
              <div key={product.id} className={styles.orderItem}>
                <div className={styles.itemImageWrap}>
                  <img
                    src={product.image || "/images/whey-protein.png"}
                    alt={product.productName}
                    className={styles.itemImage}
                  />
                </div>
                <div className={styles.itemInfo}>
                  <h4 className={styles.itemTitle}>{product.productName}</h4>
                  <span className={styles.itemWeight}>Qty: {product.quantity}</span>
                  <span className={styles.itemPrice}>
                    AED {product.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>PAYMENT METHOD</span>
          </div>
          <motion.div
            className={`${styles.blockCard} ${styles.paymentBlock}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div
              className={styles.iconWrap}
              style={{ background: "#f3e8ff", color: "#9333ea" }}
            >
              <CreditCard size={20} />
            </div>
            <div className={styles.paymentInfo}>
              <span className={styles.paymentTitle}>
                {order.isPaid ? "Paid" : "Cash on Delivery"}
              </span>
              <span className={styles.paymentSubtitle}>
                {order.isPaid ? "Payment received" : "Pay when you receive"}
              </span>
            </div>
            <BadgeCheck size={20} className={styles.verifiedIcon} />
          </motion.div>

          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>SUMMARY</span>
          </div>
          <motion.div
            className={styles.summaryBlock}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className={styles.summaryRow}>
              <span>Item Total</span>
              <span>AED {itemTotal.toLocaleString()}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Delivery</span>
              <span className={styles.greenText}>FREE</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.grandTotalRow}>
              <span className={styles.grandTotalLabel}>Grand Total</span>
              <span className={styles.grandTotalValue}>
                AED {order.grandTotal.toLocaleString()}
              </span>
            </div>
          </motion.div>

          {showCancel && (
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => void handleCancelOrder()}
              disabled={isCancelling}
            >
              {isCancelling ? "Cancelling..." : "Cancel Order"}
            </button>
          )}

          {showReturn && (
            <button
              type="button"
              className={styles.returnBtn}
              onClick={() => void handleReturnOrder()}
              disabled={isReturning}
            >
              {isReturning ? "Submitting..." : "Return Order"}
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
