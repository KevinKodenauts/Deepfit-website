import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import styles from "@/styles/exercise.module.css";
import { getEquipmentList } from "@/lib/api/exercise";
import type { EquipmentItem } from "@/lib/api/types";
import {
  getSelectedEquipment,
  saveSelectedEquipment,
} from "@/lib/exercise/selection";
import { EquipmentCardSkeleton } from "@/components/skeleton/PageSkeletons";

type ChooseEquipmentProps = {
  hideHeader?: boolean;
  onSelectionChanged?: (hasSelection: boolean) => void;
};

export default function ChooseEquipment({
  hideHeader = false,
  onSelectionChanged,
}: ChooseEquipmentProps) {
  const navigate = useNavigate();
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setSelected(getSelectedEquipment());
  }, []);

  useEffect(() => {
    onSelectionChanged?.(selected.length > 0);
  }, [selected, onSelectionChanged]);

  useEffect(() => {
    setLoading(true);
    setLoadError(false);
    getEquipmentList()
      .then((data) => setEquipmentList(data))
      .catch(() => {
        setEquipmentList([]);
        setLoadError(true);
      })
      .finally(() => setLoading(false));
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
    void navigate({
      to: "/exercise/my-equipment",
      search: { ids: selected.join(",") },
    });
  };

  return (
    <div
      className={`${styles.exerciseContainer} ${
        hideHeader ? styles.embeddedContainer : ""
      }`}
    >
      {hideHeader ? (
        <div className={styles.embeddedIntro}>
          <h2 className={styles.pageTitle}>Choose Your Product</h2>
          <p className={styles.embeddedSubtitle}>
            Select one or more products to discover matching exercises.
          </p>
        </div>
      ) : null}

      <div
        className={`${styles.gridArea} ${
          selected.length > 0 ? styles.gridAreaWithAction : ""
        }`}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <EquipmentCardSkeleton key={index} />
            ))
          : null}

        {!loading && loadError ? (
          <p className={styles.loadError}>
            Could not load equipment. Please try again.
          </p>
        ) : null}

        {!loading && !loadError
          ? equipmentList.map((item, index) => {
              const isSelected = selected.includes(item.id);
              return (
                <motion.div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  className={`${styles.equipCard} ${
                    isSelected ? styles.equipCardSelected : ""
                  }`}
                  onClick={() => toggleSelection(item.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      toggleSelection(item.id);
                    }
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className={styles.imageWrap}>
                    {isSelected ? (
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
                    ) : null}
                    <img
                      src={item.equipmentImage || "/images/dumbbells.png"}
                      alt={item.name}
                      className={styles.equipImage}
                      loading="lazy"
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
            })
          : null}
      </div>

      {selected.length > 0 ? (
        <div className={styles.bottomAction}>
          <button
            type="button"
            className={styles.viewBtn}
            onClick={handleViewSelected}
          >
            View Selected Products
          </button>
        </div>
      ) : null}
    </div>
  );
}
