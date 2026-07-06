"use client";

import FallbackImage from "@/components/FallbackImage";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { imageSizes } from "@/constants/imageSizes";
import type { HomeProductView } from "@/lib/api/mappers";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import styles from "./premium.module.css";

export default function PremiumProductCard({
  product,
  onOpen,
}: {
  product: HomeProductView;
  onOpen: () => void;
}) {
  return (
    <button type="button" className={styles.productCard} onClick={onOpen}>
      <div className={styles.productImageWrap}>
        {product.tag && (
          <span className={styles.productBadge}>{product.tag}</span>
        )}
        <div className={styles.productActions}>
          <span className={styles.actionBtn} aria-hidden>
            <Heart size={16} />
          </span>
          <span className={styles.actionBtn} aria-hidden>
            <Eye size={16} />
          </span>
        </div>
        <FallbackImage
          src={product.image}
          alt={product.title}
          fill
          sizes={imageSizes.productCard}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productBody}>
        <span className={styles.productTitle}>{product.title}</span>
        <div className={styles.productRating}>
          <Star size={12} fill="#f59e0b" color="#f59e0b" />
          4.9
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
        <span className={styles.addToCartBtn}>
          <ShoppingBag size={14} />
          Add to Cart
        </span>
      </div>
    </button>
  );
}
