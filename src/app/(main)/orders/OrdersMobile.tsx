"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { imageSizes } from "@/constants/imageSizes";
import { ORDER_FILTERS, useOrdersPage } from "@/hooks/useOrdersPage";
import styles from "./orders.module.css";

export default function OrdersMobile() {
  const router = useRouter();
  const {
    loading,
    selectedFilter,
    setSelectedFilter,
    filteredOrders,
    orders,
    getFilterCount,
  } = useOrdersPage();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.pageTitle}>My Order</h1>
      </header>

      <div className={styles.filters}>
        {ORDER_FILTERS.map((filter) => {
          const isActive = selectedFilter === filter;
          const count = getFilterCount(filter);

          return (
            <button
              key={filter}
              type="button"
              className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ""}`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
              {filter === "All Orders" ? ` (${count})` : ""}
            </button>
          );
        })}
      </div>

      <div className={styles.contentArea}>
        {loading ? (
          <p className={styles.loadingText}>Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <ShoppingBag size={64} strokeWidth={1.5} />
            <h2>No Orders Yet</h2>
            <p>Your orders will appear here</p>
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
                  <div className={styles.orderHeader}>
                    <span className={styles.orderId}>
                      ORDER #{order.orderNumber}
                    </span>
                    <span className={styles.statusBadge}>
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className={styles.itemSummary}>
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
                        {order.orderedProducts.length} items •{" "}
                        <CurrencyAmount>
                          {order.grandTotal.toLocaleString()}
                        </CurrencyAmount>
                      </span>
                      <span className={styles.orderDate}>{order.orderDate}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
