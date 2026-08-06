import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { ORDER_FILTERS, useOrdersPage } from "@/hooks/useOrdersPage";
import { OrdersListSkeleton } from "@/components/skeleton/PageSkeletons";
import styles from "@/styles/orders/orders.module.css";

type OrdersPageData = ReturnType<typeof useOrdersPage>;

export function OrdersMobile({
  loading,
  selectedFilter,
  setSelectedFilter,
  filteredOrders,
  getFilterCount,
}: OrdersPageData) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => window.history.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.pageTitle}>My Orders</h1>
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
          <OrdersListSkeleton count={4} />
        ) : filteredOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <ShoppingBag size={64} strokeWidth={1.5} className={styles.emptyIcon} />
            <h2>No orders found</h2>
            <p>
              {selectedFilter === "All Orders"
                ? "When you place an order, it will show up here."
                : `No orders match "${selectedFilter}". Try another filter.`}
            </p>
            <Link to="/shop" className={styles.browseBtn}>
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
                  to="/orders/details"
                  search={{ orderId: order.id }}
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
                      <img
                        src={firstProduct?.image || "/images/whey-protein.png"}
                        alt={firstProduct?.productName ?? "Order item"}
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
                    <ChevronRight size={18} className={styles.chevron} />
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
