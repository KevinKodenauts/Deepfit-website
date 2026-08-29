import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Lightbulb } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { EquipmentCardSkeleton } from "@/components/skeleton/PageSkeletons";
import {
  getEquipmentById,
  resolveProductIdForEquipment,
} from "@/lib/api/exercise";
import { getSelectedEquipment } from "@/lib/exercise/selection";
import type { EquipmentItem } from "@/lib/api/types";
import styles from "@/styles/explore-equipment.module.css";

export const Route = createFileRoute("/exercise/equipment/$id")({
  head: () => ({
    meta: [
      { title: "Equipment Guide — DEEPFIT" },
      {
        name: "description",
        content: "Learn how to use your Deepfit equipment with guided steps.",
      },
    ],
  }),
  component: EquipmentDetailsPage,
});

function EquipmentDetailsPage() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const { id } = Route.useParams();
  const equipmentId = Number(id);
  const [equipment, setEquipment] = useState<EquipmentItem | null>(null);
  const [productId, setProductId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!equipmentId || Number.isNaN(equipmentId)) {
      setLoadError(true);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setLoadError(false);
    setProductId(null);

    getEquipmentById(equipmentId)
      .then(async (data) => {
        if (cancelled) return;
        if (!data) {
          setLoadError(true);
          return;
        }
        setEquipment(data);
        const resolved = await resolveProductIdForEquipment(data);
        if (!cancelled) setProductId(resolved);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [equipmentId]);

  const handleShowExercise = () => {
    const selectedIds = getSelectedEquipment();
    const filterIds =
      selectedIds.length > 0 ? selectedIds : equipment ? [equipment.id] : [];
    void navigate({
      to: "/exercise/library",
      search: {
        equipment_ids: filterIds.join(","),
        focus: String(equipmentId),
      },
    });
  };

  return (
    <div className="bg-background text-foreground">
      <Nav />
      <div
        className={styles.container}
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <header className={styles.header}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => router.history.back()}
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className={styles.pageTitle}>
            {loading ? "Equipment" : (equipment?.name ?? "Equipment")}
          </h1>
        </header>

        {loading ? (
          <div style={{ padding: 24 }}>
            <EquipmentCardSkeleton />
          </div>
        ) : loadError || !equipment ? (
          <p style={{ padding: 24, color: "#64748b" }}>
            Could not load equipment details.
          </p>
        ) : (
          <EquipmentContent
            equipment={equipment}
            productId={productId}
            onShowExercise={handleShowExercise}
          />
        )}
      </div>
    </div>
  );
}

function EquipmentContent({
  equipment,
  productId,
  onShowExercise,
}: {
  equipment: EquipmentItem;
  productId: number | null;
  onShowExercise: () => void;
}) {
  const tags = equipment.tags?.length
    ? equipment.tags
    : [equipment.category ?? "Equipment"];
  const steps = equipment.instructions ?? [];

  return (
    <div className={styles.contentBox}>
      <div className={styles.scrollArea}>
        <motion.div
          className={styles.heroImageWrap}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={equipment.equipmentImage || "/images/dumbbells.png"}
            alt={equipment.name}
            className={styles.heroImage}
          />
        </motion.div>

        <div className={styles.badges}>
          {tags.map((badge, i) => (
            <span key={`${badge}-${i}`} className={styles.badge}>
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
            onClick={onShowExercise}
          >
            Show Exercise
          </button>
          {productId ? (
            <Link
              to="/product/$slug"
              params={{ slug: String(productId) }}
              className={styles.shopNowBtn}
            >
              Shop Now
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
