"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import styles from "./exercise.module.css";
import { imageSizes } from "@/constants/imageSizes";
import { getEquipmentList } from "@/lib/api/exercise";
import { ProductCardSkeleton } from "@/components/skeleton/ProductCardSkeleton";
import { getSelectedEquipment, saveSelectedEquipment } from "@/lib/exercise/selection";
import type { EquipmentItem } from "@/lib/api/types";

export default function ChooseEquipmentPage() {
  const router = useRouter();
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setSelected(getSelectedEquipment());
  }, []);

  useEffect(() => {
    setLoading(true);
    setLoadError(false);

    getEquipmentList()
      .then((data) => {
        setEquipmentList(data);
      })
      .catch(() => {
        setEquipmentList([]);
        setLoadError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleSelection = (id: number) => {
    setSelected((prev) => {
      const next = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];
      saveSelectedEquipment(next);
      return next;
    });
  };

  const handleViewSelected = () => {
    if (selected.length === 0) return;
    saveSelectedEquipment(selected);
    router.push(`/exercise/my-equipment?ids=${selected.join(",")}`);
  };

  return (
    <div className={styles.exerciseContainer}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.pageTitle}>Choose Your Equipment</h1>
      </header>

      <p className={styles.subtitle}>
        Select one or more fitness tools to discover matching exercises.
      </p>

      <div
        className={`${styles.gridArea} ${
          selected.length > 0 ? styles.gridAreaWithAction : ""
        }`}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} variant="category" />
            ))
          : null}
        {!loading && loadError ? (
          <p className={styles.statusText}>
            Could not load equipment. Please try again.
          </p>
        ) : null}
        {!loading &&
          equipmentList.map((item, index) => {
            const isSelected = selected.includes(item.id);

            return (
              <motion.div
                key={item.id}
                className={`${styles.equipCard} ${isSelected ? styles.selected : ""}`}
                onClick={() => toggleSelection(item.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className={styles.imageWrap}>
                  {isSelected && (
                    <motion.div
                      className={styles.checkBadge}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </motion.div>
                  )}
                  <Image
                    src={item.equipmentImage || "/images/dumbbells.png"}
                    alt={item.name}
                    fill
                    sizes={imageSizes.exerciseCard}
                    className={styles.equipImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.categoryBadge}>
                    {item.category ?? "Equipment"}
                  </span>
                  <span className={styles.equipTitle}>{item.name}</span>
                </div>
              </motion.div>
            );
          })}
      </div>

      {selected.length > 0 ? (
        <div className={styles.bottomAction}>
          <button
            type="button"
            className={styles.viewBtn}
            onClick={handleViewSelected}
          >
            View Selected Equipments
          </button>
        </div>
      ) : null}
    </div>
  );
}
