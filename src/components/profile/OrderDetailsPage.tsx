import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  BadgeCheck,
  ChevronLeft,
  CreditCard,
  Package,
  ShoppingBag,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import styles from "@/styles/orders/details.module.css";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import {
  canCancelOrder,
  canReturnOrder,
  cancelOrder,
  returnOrder,
  getCustomerOrders,
  groupOrdersByNumber,
  type OrderSummary,
} from "@/lib/api/orders";
import { getCustomerId } from "@/lib/auth/session";
import { useOrderSync } from "@/hooks/useOrderSync";
import { OrderDetailsSkeleton } from "@/components/skeleton/PageSkeletons";

function statusClass(status: string) {
  const normalized = status.toLowerCase();
  if (
    normalized.includes("deliver") ||
    normalized.includes("complete") ||
    normalized.includes("paid")
  ) {
    return styles.statusSuccess;
  }
  if (
    normalized.includes("cancel") ||
    normalized.includes("return") ||
    normalized.includes("fail")
  ) {
    return styles.statusWarning;
  }
  if (normalized.includes("pending")) {
    return styles.statusMuted;
  }
  return "";
}

function formatOrderDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function OrderDetailsPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/orders/details" });
  const orderId = Number(search.orderId);
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

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
        .then(
          (orders) =>
            groupOrdersByNumber(orders).find((o) => o.id === orderId) ?? null
        )
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

  useOrderSync(
    {
      onAny: () => loadOrder({ silent: true }),
    },
    Number.isFinite(orderId) ? orderId : undefined,
  );

  const openCancelModal = () => {
    setCancelError(null);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!order || isCancelling) return;

    setIsCancelling(true);
    setCancelError(null);
    try {
      const res = await cancelOrder(order.id);
      if (res.status) {
        setCancelModalOpen(false);
        void navigate({ to: "/orders" });
        return;
      }
      setCancelError(res.message || "Failed to cancel order. Please try again.");
    } catch {
      setCancelError("Failed to cancel order. Please try again.");
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
        <div style={{ paddingTop: "var(--desktop-nav-height)" }}>
          <OrderDetailsSkeleton />
        </div>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <div
          className={styles.shell}
          style={{ paddingTop: "var(--desktop-nav-height)" }}
        >
          <div className={styles.inner}>
            <header className={styles.pageHeader}>
              <Link to="/orders" className={styles.backBtn} aria-label="Back to orders">
                <ChevronLeft size={20} />
              </Link>
              <div className={styles.headerText}>
                <h1 className={styles.pageTitle}>Order details</h1>
                <p className={styles.pageSubtitle}>
                  We could not find this order
                </p>
              </div>
            </header>
            <div className={styles.emptyState}>
              <ShoppingBag size={64} strokeWidth={1.2} color="#d0d0d0" />
              <h2 className={styles.emptyTitle}>Order not found</h2>
              <p className={styles.emptyText}>
                It may have been removed, or the link is no longer valid.
              </p>
              <Link to="/orders" className={styles.browseBtn}>
                Back to my orders
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const itemTotal = order.orderedProducts.reduce(
    (sum, product) => sum + product.totalPrice,
    0
  );
  const showCancel = canCancelOrder(order.orderStatus);
  const showReturn = canReturnOrder(order);
  const itemCount = order.orderedProducts.length;

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div
        className={styles.shell}
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <div className={styles.inner}>
          <header className={styles.pageHeader}>
            <Link to="/orders" className={styles.backBtn} aria-label="Back to orders">
              <ChevronLeft size={20} />
            </Link>
            <div className={styles.headerText}>
              <h1 className={styles.pageTitle}>Order details</h1>
              <p className={styles.pageSubtitle}>
                {itemCount} {itemCount === 1 ? "item" : "items"} •{" "}
                <CurrencyAmount>{order.grandTotal.toLocaleString()}</CurrencyAmount>
              </p>
            </div>
          </header>

          <div className={styles.content}>
            <section className={`${styles.card} ${styles.statusCard}`}>
              <div className={styles.statusMeta}>
                <span className={styles.orderId}>
                  Order #{order.orderNumber}
                </span>
                <span className={styles.orderDate}>
                  Placed on {formatOrderDate(order.orderDate)}
                </span>
              </div>
              <span
                className={`${styles.statusBadge} ${statusClass(order.orderStatus)}`}
              >
                {order.orderStatus}
              </span>
            </section>

            <section className={styles.card}>
              <h2 className={styles.sectionTitle}>
                ORDER ITEMS ({itemCount})
              </h2>
              <div className={styles.itemsList}>
                {order.orderedProducts.map((product) => (
                  <div key={product.id} className={styles.orderItem}>
                    <div className={styles.itemImageWrap}>
                      <img
                        src={product.image || "/images/whey-protein.png"}
                        alt={product.productName}
                        className={styles.itemImage}
                      />
                    </div>
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemTitle}>{product.productName}</h3>
                      <span className={styles.itemMeta}>
                        Qty: {product.quantity}
                        {product.lastTrackedStatus
                          ? ` • ${product.lastTrackedStatus}`
                          : ""}
                      </span>
                    </div>
                    <span className={styles.itemPrice}>
                      <CurrencyAmount>
                        {product.totalPrice.toLocaleString()}
                      </CurrencyAmount>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <div className={styles.gridTwo}>
              <section className={styles.card}>
                <h2 className={styles.sectionTitle}>PAYMENT</h2>
                <div className={styles.infoRow}>
                  <div className={styles.iconWrap}>
                    <CreditCard size={20} />
                  </div>
                  <div className={styles.infoText}>
                    <span className={styles.infoTitle}>
                      {order.isPaid ? "Paid online" : "Cash on Delivery"}
                    </span>
                    <span className={styles.infoSubtitle}>
                      {order.isPaid
                        ? "Payment received"
                        : "Pay when you receive"}
                    </span>
                  </div>
                  {order.isPaid ? (
                    <BadgeCheck size={20} className={styles.verifiedIcon} />
                  ) : null}
                </div>
              </section>

              <section className={styles.card}>
                <h2 className={styles.sectionTitle}>FULFILLMENT</h2>
                <div className={styles.infoRow}>
                  <div className={styles.iconWrap}>
                    <Package size={20} />
                  </div>
                  <div className={styles.infoText}>
                    <span className={styles.infoTitle}>{order.orderStatus}</span>
                    <span className={styles.infoSubtitle}>
                      {order.deliveredAt
                        ? `Delivered ${formatOrderDate(order.deliveredAt)}`
                        : "We’ll notify you as the status updates"}
                    </span>
                  </div>
                </div>
              </section>
            </div>

            <section className={styles.card}>
              <h2 className={styles.sectionTitle}>SUMMARY</h2>
              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>Item total</span>
                  <span className={styles.summaryValue}>
                    <CurrencyAmount>
                      {itemTotal.toLocaleString()}
                    </CurrencyAmount>
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Delivery</span>
                  <span className={styles.freeText}>FREE</span>
                </div>
                <div className={styles.summaryDivider} />
                <div className={styles.grandTotalRow}>
                  <span className={styles.grandTotalLabel}>Grand total</span>
                  <span className={styles.grandTotalValue}>
                    <CurrencyAmount>
                      {order.grandTotal.toLocaleString()}
                    </CurrencyAmount>
                  </span>
                </div>
              </div>
            </section>

            {(showCancel || showReturn) && (
              <div className={styles.actions}>
                {showCancel ? (
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={openCancelModal}
                    disabled={isCancelling}
                  >
                    Cancel order
                  </button>
                ) : null}
                {showReturn ? (
                  <button
                    type="button"
                    className={styles.returnBtn}
                    onClick={() => void handleReturnOrder()}
                    disabled={isReturning}
                  >
                    {isReturning ? "Submitting..." : "Return order"}
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>

      <AlertDialog
        open={cancelModalOpen}
        onOpenChange={(open) => {
          if (isCancelling) return;
          setCancelModalOpen(open);
          if (!open) setCancelError(null);
        }}
      >
        <AlertDialogContent className={styles.modalContent}>
          <AlertDialogHeader>
            <AlertDialogTitle className={styles.modalTitle}>
              Cancel this order?
            </AlertDialogTitle>
            <AlertDialogDescription className={styles.modalDescription}>
              Are you sure you want to cancel order #{order.orderNumber}? If you
              paid online, a refund will be processed automatically.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {cancelError ? (
            <p className={styles.modalError} role="alert">
              {cancelError}
            </p>
          ) : null}
          <AlertDialogFooter className={styles.modalFooter}>
            <AlertDialogCancel
              className={styles.modalNoBtn}
              disabled={isCancelling}
            >
              No
            </AlertDialogCancel>
            <button
              type="button"
              className={styles.modalYesBtn}
              onClick={() => void handleConfirmCancel()}
              disabled={isCancelling}
            >
              {isCancelling ? "Cancelling..." : "Yes, cancel"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
}
