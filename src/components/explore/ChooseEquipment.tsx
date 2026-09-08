import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import styles from "@/styles/exercise.module.css";
import { getEquipmentList } from "@/lib/api/exercise";
import type { EquipmentItem } from "@/lib/api/types";
import { saveSelectedEquipment } from "@/lib/exercise/selection";
import { EquipmentCardSkeleton } from "@/components/skeleton/PageSkeletons";

type ChooseEquipmentProps = {
  hideHeader?: boolean;
};

export default function ChooseEquipment({
  hideHeader = false,
}: ChooseEquipmentProps) {
  const navigate = useNavigate();
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

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

  const openExercises = (id: number) => {
    saveSelectedEquipment([id]);
    void navigate({
      to: "/exercise/library",
      search: {
        equipment_ids: String(id),
        focus: String(id),
      },
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
            Select a product to discover matching exercises.
          </p>
        </div>
      ) : null}

      <div className={styles.gridArea}>
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
          ? equipmentList.map((item, index) => (
              <motion.div
                key={item.id}
                role="button"
                tabIndex={0}
                className={styles.equipCard}
                onClick={() => openExercises(item.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openExercises(item.id);
                  }
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className={styles.imageWrap}>
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
            ))
          : null}
      </div>
    </div>
  );
}
