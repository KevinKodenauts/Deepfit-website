"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { imageSizes } from "@/constants/imageSizes";
import { ORDER_FILTERS, useOrdersPage } from "@/hooks/useOrdersPage";
import styles from "./ordersDesktop.module.css";

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

export default function OrdersDesktop() {
  const {
    loading,
    selectedFilter,
    setSelectedFilter,
    filteredOrders,
    orders,
    getFilterCount,
  } = useOrdersPage();

  return (
    <div className={styles.shell}>
      <div className={styles.inner}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>My Orders</h1>
          <p className={styles.pageSubtitle}>
            {loading
              ? "Loading your order history..."
              : orders.length === 0
                ? "You have not placed any orders yet"
                : `${orders.length} ${orders.length === 1 ? "order" : "orders"} in your account`}
          </p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.filtersCard} aria-label="Order filters">
            <p className={styles.filtersTitle}>FILTER BY STATUS</p>
            {ORDER_FILTERS.map((filter) => {
              const isActive = selectedFilter === filter;
              const count = getFilterCount(filter);

              return (
                <button
                  key={filter}
                  type="button"
                  className={`${styles.filterBtn} ${
                    isActive ? styles.filterBtnActive : ""
                  }`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  <span>{filter}</span>
                  <span className={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </aside>

          <div className={styles.main}>
            {loading ? (
              <div className={styles.loadingWrap}>
                <div className={styles.loadingSpinner} />
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className={styles.emptyState}>
                <ShoppingBag size={72} strokeWidth={1.2} className={styles.emptyIcon} />
                <h2 className={styles.emptyTitle}>No orders found</h2>
                <p className={styles.emptyText}>
                  {selectedFilter === "All Orders"
                    ? "When you place an order, it will show up here."
                    : `No orders match "${selectedFilter}". Try another filter.`}
                </p>
                <Link href="/categories" className={styles.browseBtn}>
                  Browse products
                </Link>
              </div>
            ) : (
              <div className={styles.ordersList}>
                {filteredOrders.map((order) => {
                  const firstProduct = order.orderedProducts[0];
                  const itemLabel = order.orderedProducts
                    .map((product) => product.productName)
                    .slice(0, 2)
                    .join(", ");

                  return (
                    <Link
                      key={`${order.id}-${order.orderNumber}`}
                      href={`/orders/details?orderId=${order.id}`}
                      className={styles.orderCard}
                    >
                      <div className={styles.orderTop}>
                        <div className={styles.orderMeta}>
                          <span className={styles.orderId}>
                            Order #{order.orderNumber}
                          </span>
                          <span className={styles.orderDate}>{order.orderDate}</span>
                        </div>
                        <span
                          className={`${styles.statusBadge} ${statusClass(order.orderStatus)}`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>

                      <div className={styles.orderBody}>
                        <div className={styles.itemImageWrap}>
                          <Image
                            src={firstProduct?.image || "/images/whey-protein.png"}
                            alt={firstProduct?.productName ?? "Order item"}
                            fill
                            sizes={imageSizes.orderThumb}
                            className={styles.itemImage}
                          />
                        </div>

                        <div className={styles.itemDetails}>
                          <span className={styles.itemTitle}>
                            {itemLabel || "Order items"}
                          </span>
                          <span className={styles.itemMeta}>
                            {order.orderedProducts.length}{" "}
                            {order.orderedProducts.length === 1 ? "item" : "items"}
                          </span>
                          <span className={styles.itemTotal}>
                            <CurrencyAmount>
                              {order.grandTotal.toLocaleString()}
                            </CurrencyAmount>
                          </span>
                        </div>

                        <span className={styles.viewLink}>
                          View details
                          <ChevronRight size={16} />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
