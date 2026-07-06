"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import styles from "@/app/(main)/exercise/exercise.module.css";
import { imageSizes } from "@/constants/imageSizes";
import { getEquipmentList } from "@/lib/api/exercise";
import { ProductCardSkeleton } from "@/components/skeleton/ProductCardSkeleton";
import {
  getSelectedEquipment,
  saveSelectedEquipment,
} from "@/lib/exercise/selection";
import type { EquipmentItem } from "@/lib/api/types";
import { useCatalogSync } from "@/hooks/useCatalogSync";

type ChooseEquipmentProps = {
  /** Hide page header when embedded inside Explore hubs */
  hideHeader?: boolean;
  onSelectionChanged?: (hasSelection: boolean) => void;
};

export default function ChooseEquipment({
  hideHeader = false,
  onSelectionChanged,
}: ChooseEquipmentProps) {
  const router = useRouter();
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const loadEquipment = () => {
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
  };

  useEffect(() => {
    setSelected(getSelectedEquipment());
  }, []);

  useEffect(() => {
    onSelectionChanged?.(selected.length > 0);
  }, [selected, onSelectionChanged]);

  useEffect(() => {
    loadEquipment();
  }, []);

  useCatalogSync(() => {
    loadEquipment();
  });

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
    <div
      className={`${styles.exerciseContainer} ${
        hideHeader ? styles.embeddedContainer : ""
      }`}
    >
      {!hideHeader ? (
        <header className={styles.header}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className={styles.pageTitle}>Choose Your Equipment</h1>
        </header>
      ) : (
        <div className={styles.embeddedIntro}>
          <h2 className={styles.pageTitle}>Choose Your Equipment</h2>
          <p className={styles.embeddedSubtitle}>
            Select one or more fitness tools to discover matching exercises.
          </p>
        </div>
      )}

      {!hideHeader ? (
        <p className={styles.subtitle}>
          Select one or more fitness tools to discover matching exercises.
        </p>
      ) : null}

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
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Check size={12} strokeWidth={3} />
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
