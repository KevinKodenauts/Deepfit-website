import styles from "@/components/skeleton/skeleton.module.css";

type ProductCardSkeletonProps = {
  variant?: "home" | "category";
};

export function ProductCardSkeleton({
  variant = "home",
}: ProductCardSkeletonProps) {
  if (variant === "category") {
    return (
      <div className={styles.categoryCard} aria-hidden>
        <div className={`${styles.skeleton} ${styles.categoryImage}`} />
        <div className={`${styles.skeleton} ${styles.categoryBrand}`} />
        <div className={`${styles.skeleton} ${styles.categoryTitle}`} />
        <div className={`${styles.skeleton} ${styles.categoryTitleShort}`} />
        <div className={styles.categoryFooter}>
          <div className={`${styles.skeleton} ${styles.categoryPrice}`} />
          <div className={`${styles.skeleton} ${styles.categoryAddBtn}`} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.homeCard} aria-hidden>
      <div className={`${styles.skeleton} ${styles.homeImage}`} />
      <div className={`${styles.skeleton} ${styles.homeTitle}`} />
      <div className={`${styles.skeleton} ${styles.homeTitleShort}`} />
      <div className={styles.homeFooter}>
        <div className={styles.homePriceBlock}>
          <div className={`${styles.skeleton} ${styles.homePrice}`} />
          <div className={`${styles.skeleton} ${styles.homeOriginalPrice}`} />
        </div>
        <div className={`${styles.skeleton} ${styles.homeAddBtn}`} />
      </div>
    </div>
  );
}

type ProductCardSkeletonRowProps = {
  count?: number;
  variant?: "home" | "category";
  className?: string;
};

export function ProductCardSkeletonList({
  count = 4,
  variant = "home",
  className,
}: ProductCardSkeletonRowProps) {
  if (variant === "category") {
    return (
      <div className={`${styles.categoryGrid} ${className ?? ""}`}>
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} variant="category" />
        ))}
      </div>
    );
  }

  return (
    <div className={`${styles.homeRow} ${className ?? ""}`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} variant="home" />
      ))}
    </div>
  );
}

export function CategorySidebarSkeleton({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.sidebarItem} aria-hidden>
          <div className={`${styles.skeleton} ${styles.sidebarIcon}`} />
          <div className={`${styles.skeleton} ${styles.sidebarLabel}`} />
        </div>
      ))}
    </>
  );
}
