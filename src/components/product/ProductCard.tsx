"use client";

import FallbackImage from "@/components/FallbackImage";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import styles from "./ProductCard.module.css";

export type ProductCardProps = {
  productId: number;
  image: string;
  title: string;
  price: number | string;
  rating?: number;
  onOpen?: () => void;
  overlayAction?: ReactNode;
  className?: string;
};

function formatPrice(price: number | string) {
  const value = typeof price === "number" ? price : Number(price);
  if (Number.isNaN(value)) return price;
  return value % 1 === 0 ? value.toFixed(0) : value.toFixed(2);
}

export default function ProductCard({
  productId,
  image,
  title,
  price,
  rating = 5,
  onOpen,
  overlayAction,
  className,
}: ProductCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { openAddToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const ratingLabel = rating.toFixed(1);

  const handleOpenDetail = () => {
    onOpen?.();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!onOpen) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  const handleAddToCart = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isAdding) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setIsAdding(true);
    try {
      const priceValue =
        typeof price === "number" ? price : Number(price) || 0;
      await openAddToCart({
        productId,
        title,
        image,
        price: priceValue,
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <article
      className={`${styles.card} ${onOpen ? styles.cardClickable : ""} ${className ?? ""}`}
      onClick={handleOpenDetail}
      onKeyDown={handleCardKeyDown}
      role={onOpen ? "link" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      aria-label={onOpen ? `View ${title}` : undefined}
    >
      {overlayAction ? (
        <div
          className={styles.overlayAction}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          {overlayAction}
        </div>
      ) : null}

      <div className={styles.priceBadge}>
        <CurrencyAmount>{formatPrice(price)}</CurrencyAmount>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.imageWrap}>
          <FallbackImage
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, 240px"
            className={styles.image}
          />
        </div>
        <div className={styles.imageFrost} aria-hidden />
      </div>

      <div className={styles.body}>
        <div className={styles.rating}>
          <span className={styles.stars} aria-hidden>
            ★★★★★
          </span>
          <span className={styles.ratingValue}>({ratingLabel})</span>
        </div>

        <h3 className={styles.title}>{title}</h3>

        <button
          type="button"
          className={styles.buyButton}
          onClick={handleAddToCart}
          disabled={isAdding}
          aria-busy={isAdding}
        >
          <ShoppingBag size={14} strokeWidth={2.2} aria-hidden />
          {isAdding ? "Adding…" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
