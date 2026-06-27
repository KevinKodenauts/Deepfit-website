"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Lightbulb } from "lucide-react";
import styles from "./equipment.module.css";
import { imageSizes } from "@/constants/imageSizes";
import { getEquipmentById } from "@/lib/api/exercise";
import { ProductCardSkeleton } from "@/components/skeleton/ProductCardSkeleton";
import { getSelectedEquipment } from "@/lib/exercise/selection";
import type { EquipmentItem } from "@/lib/api/types";

export default function EquipmentDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const equipmentId = Number(params.id);
  const [equipment, setEquipment] = useState<EquipmentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!equipmentId || Number.isNaN(equipmentId)) {
      setLoadError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError(false);

    getEquipmentById(equipmentId)
      .then((data) => {
        if (!data) {
          setLoadError(true);
          return;
        }
        setEquipment(data);
      })
      .catch(() => {
        setLoadError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [equipmentId]);

  const handleShowExercise = () => {
    const selectedIds = getSelectedEquipment();
    const filterIds =
      selectedIds.length > 0 ? selectedIds : equipment ? [equipment.id] : [];
    router.push(
      `/exercise/library?equipment_ids=${filterIds.join(",")}&focus=${equipmentId}`
    );
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <button className={styles.backBtn} onClick={() => router.back()}>
            <ChevronLeft size={24} />
          </button>
          <h1 className={styles.pageTitle}>Equipment</h1>
        </header>
        <div style={{ padding: 24 }}>
          <ProductCardSkeleton variant="category" />
        </div>
      </div>
    );
  }

  if (loadError || !equipment) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <button className={styles.backBtn} onClick={() => router.back()}>
            <ChevronLeft size={24} />
          </button>
          <h1 className={styles.pageTitle}>Equipment</h1>
        </header>
        <p style={{ padding: 24, color: "#64748b" }}>
          Could not load equipment details.
        </p>
      </div>
    );
  }

  const tags = equipment.tags?.length ? equipment.tags : [equipment.category ?? "Equipment"];
  const steps = equipment.instructions ?? [];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.pageTitle}>{equipment.name}</h1>
      </header>

      <div className={styles.contentBox}>
        <div className={styles.scrollArea}>
          <motion.div
            className={styles.heroImageWrap}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={equipment.equipmentImage || "/images/dumbbells.png"}
              alt={equipment.name}
              fill
              sizes={imageSizes.exerciseHero}
              className={styles.heroImage}
              priority
            />
          </motion.div>

          <div className={styles.badges}>
            {tags.map((badge, i) => (
              <span key={i} className={styles.badge}>
                {badge}
              </span>
            ))}
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>
              {equipment.headline ?? "Elite Precision Performance"}
            </h2>
            <p className={styles.description}>
              {equipment.description ??
                "Follow the proper form and usage instructions to get the most out of your training equipment."}
            </p>

            <h3 className={styles.sectionTitle}>How to Use</h3>

            <div className={styles.stepList}>
              {steps.length > 0 ? (
                steps.map((step, i) => (
                  <motion.div
                    key={step.id ?? i}
                    className={styles.stepItem}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <div className={styles.stepNumber}>
                      {step.stepNumber ?? i + 1}
                    </div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>{step.stepTitle}</h4>
                      <p className={styles.stepDesc}>{step.stepDescription}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className={styles.description}>
                  Usage instructions will be available soon.
                </p>
              )}
            </div>

            {equipment.proTip ? (
              <motion.div
                className={styles.proTipBox}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className={styles.proTipHeader}>
                  <Lightbulb size={16} color="#1a1a2e" strokeWidth={3} />
                  <span className={styles.proTipTitle}>PRO TIP</span>
                </div>
                <p className={styles.proTipDesc}>{equipment.proTip}</p>
              </motion.div>
            ) : null}
          </div>
          <div className={styles.bottomAction}>
            <button
              type="button"
              className={styles.showExerciseBtn}
              onClick={handleShowExercise}
            >
              Show Exercise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
