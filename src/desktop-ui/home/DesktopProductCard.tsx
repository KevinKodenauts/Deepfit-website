"use client";

import FallbackImage from "@/components/FallbackImage";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { imageSizes } from "@/constants/imageSizes";
import type { HomeProductView } from "@/lib/api/mappers";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import styles from "./homeDesktop.module.css";

export default function DesktopProductCard({
  product,
  onOpen,
}: {
  product: HomeProductView;
  onOpen: () => void;
}) {
  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  return (
    <article className={styles.productCard}>
      <button
        type="button"
        className={styles.productMedia}
        onClick={onOpen}
        aria-label={product.title}
      >
        {(product.tag || discount > 0) && (
          <div className={styles.productBadges}>
            {product.tag && (
              <span className={styles.productBadge}>{product.tag}</span>
            )}
            {discount > 0 && (
              <span className={styles.productDiscount}>-{discount}%</span>
            )}
          </div>
        )}

        <div className={styles.productActions}>
          <span className={styles.productActionBtn} title="Wishlist">
            <Heart size={15} />
          </span>
          <span className={styles.productActionBtn} title="Quick view">
            <Eye size={15} />
          </span>
        </div>

        <FallbackImage
          src={product.image}
          alt={product.title}
          fill
          sizes={imageSizes.productCard}
          className={styles.productImage}
        />

        <div className={styles.productMediaOverlay} />
      </button>

      <div className={styles.productBody}>
        <button
          type="button"
          className={styles.productTitle}
          onClick={onOpen}
        >
          {product.title}
        </button>

        <div className={styles.productMeta}>
          <span className={styles.productRating}>
            <Star size={12} fill="#F59E0B" color="#F59E0B" />
            4.9
          </span>
          <span
            className={styles.productStock}
            style={{ color: product.inStock ? undefined : "#dc2626" }}
          >
            {product.stockLabel}
          </span>
        </div>

        <div className={styles.productPriceRow}>
          <span className={styles.productPrice}>
            <CurrencyAmount>{product.price}</CurrencyAmount>
          </span>
          {product.originalPrice > product.price && (
            <span className={styles.productMrp}>
              <CurrencyAmount>{product.originalPrice}</CurrencyAmount>
            </span>
          )}
        </div>

        <button type="button" className={styles.addToCart} onClick={onOpen} disabled={!product.inStock}>
          <ShoppingBag size={15} />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
}
