"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { imageSizes } from "@/constants/imageSizes";
import { ProductCardSkeleton } from "@/components/skeleton/ProductCardSkeleton";
import { useMyEquipmentPage } from "@/hooks/useMyEquipmentPage";
import styles from "./my-equipment.module.css";

export default function MyEquipmentMobile() {
  const { router, equipmentList, loading, loadError } = useMyEquipmentPage();

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
        <h1 className={styles.pageTitle}>My Equipment</h1>
      </header>

      <div className={styles.subtitleBlock}>
        <p className={styles.subtitle}>
          Gear currently in your arsenal for precision training.
        </p>
        <span className={styles.badge}>
          {equipmentList.length} Items Selected
        </span>
      </div>

      <div
        className={`${styles.listArea} ${
          !loading && equipmentList.length >= 3
            ? styles.listAreaTabletThree
            : ""
        }`}
      >
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <ProductCardSkeleton key={index} variant="category" />
            ))
          : null}
        {!loading && loadError ? (
          <p className={styles.statusText}>
            Could not load equipment. Please try again.
          </p>
        ) : null}
        {!loading &&
          equipmentList.map((item, i) => (
            <motion.div
              key={item.id}
              className={styles.equipCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className={styles.imageWrap}>
                {item.isPrimary ? (
                  <span className={styles.primaryBadge}>Primary</span>
                ) : null}
                <Image
                  src={item.equipmentImage || "/images/dumbbells.png"}
                  alt={item.name}
                  fill
                  sizes={imageSizes.exerciseCard}
                  className={styles.equipImage}
                />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.equipTitle}>{item.name}</h2>
                </div>
                <p className={styles.category}>{item.category ?? "Equipment"}</p>
                <p className={styles.description}>
                  {item.description ??
                    "Premium fitness equipment designed for precision training."}
                </p>

                <button
                  type="button"
                  className={styles.howToUseBtn}
                  onClick={() =>
                    router.push(`/exercise/equipment/${item.id}`)
                  }
                >
                  How To Use
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
