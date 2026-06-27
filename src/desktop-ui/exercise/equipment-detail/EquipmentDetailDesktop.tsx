"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { imageSizes } from "@/constants/imageSizes";
import { ProductCardSkeleton } from "@/components/skeleton/ProductCardSkeleton";
import { useEquipmentDetailPage } from "@/hooks/useEquipmentDetailPage";
import styles from "./equipmentDetailDesktop.module.css";

export default function EquipmentDetailDesktop() {
  const {
    router,
    equipment,
    loading,
    loadError,
    handleShowExercise,
    tags,
    steps,
  } = useEquipmentDetailPage();

  if (loading) {
    return (
      <div className={styles.shell}>
        <div className={styles.inner}>
          <button
            type="button"
            className={styles.backLink}
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} />
            Back to My Equipment
          </button>
          <div className={styles.loadingWrap}>
            <ProductCardSkeleton variant="category" />
          </div>
        </div>
      </div>
    );
  }

  if (loadError || !equipment) {
    return (
      <div className={styles.shell}>
        <div className={styles.inner}>
          <button
            type="button"
            className={styles.backLink}
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} />
            Back to My Equipment
          </button>
          <div className={styles.statusCard}>
            <p className={styles.statusText}>
              Could not load equipment details.
            </p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => router.refresh()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.backLink}
          onClick={() => router.back()}
        >
          <ArrowLeft size={18} />
          Back to My Equipment
        </button>

        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderMain}>
            <span className={styles.equipmentLabel}>{equipment.name}</span>
            <h1 className={styles.pageTitle}>
              {equipment.headline ?? "Elite Precision Performance"}
            </h1>
            <p className={styles.pageSubtitle}>
              {equipment.description ??
                "Follow the proper form and usage instructions to get the most out of your training equipment."}
            </p>
          </div>
          <button
            type="button"
            className={styles.showExerciseBtn}
            onClick={handleShowExercise}
          >
            Show exercises
            <ArrowRight size={16} />
          </button>
        </header>

        <div className={styles.mainGrid}>
          <div className={styles.mediaColumn}>
            <div className={styles.heroImageWrap}>
              <Image
                src={equipment.equipmentImage || "/images/dumbbells.png"}
                alt={equipment.name}
                fill
                sizes={imageSizes.exerciseHero}
                className={styles.heroImage}
                priority
              />
            </div>
            <div className={styles.badges}>
              {tags.map((badge, i) => (
                <span key={i} className={styles.badge}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.contentColumn}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>How to Use</h2>

              {steps.length > 0 ? (
                <div className={styles.stepGrid}>
                  {steps.map((step, i) => (
                    <div key={step.id ?? i} className={styles.stepCard}>
                      <div className={styles.stepNumber}>
                        {step.stepNumber ?? i + 1}
                      </div>
                      <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>{step.stepTitle}</h3>
                        <p className={styles.stepDesc}>
                          {step.stepDescription}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.emptySteps}>
                  Usage instructions will be available soon.
                </p>
              )}
            </section>

            {equipment.proTip ? (
              <div className={styles.proTipBox}>
                <div className={styles.proTipHeader}>
                  <Lightbulb size={18} color="#1a637b" strokeWidth={2.5} />
                  <span className={styles.proTipTitle}>Pro Tip</span>
                </div>
                <p className={styles.proTipDesc}>{equipment.proTip}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
