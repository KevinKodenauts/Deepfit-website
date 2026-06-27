"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Dumbbell } from "lucide-react";
import { imageSizes } from "@/constants/imageSizes";
import { useMyEquipmentPage } from "@/hooks/useMyEquipmentPage";
import styles from "./myEquipmentDesktop.module.css";

export default function MyEquipmentDesktop() {
  const { router, equipmentList, loading, loadError, libraryHref } =
    useMyEquipmentPage();

  return (
    <div className={styles.shell}>
      <div className={styles.inner}>
        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderMain}>
            <h1 className={styles.pageTitle}>My Equipment</h1>
            <p className={styles.pageSubtitle}>
              Gear in your arsenal for precision training. Review usage guides
              and start your workout library.
            </p>
            {!loading && !loadError && (
              <span className={styles.badge}>
                {equipmentList.length}{" "}
                {equipmentList.length === 1 ? "item" : "items"} selected
              </span>
            )}
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.editBtn}
              onClick={() => router.push("/exercise")}
            >
              Edit selection
            </button>
            <Link href={libraryHref} className={styles.startBtn}>
              Start training
              <ArrowRight size={16} />
            </Link>
          </div>
        </header>

        {loading ? (
          <div className={styles.loadingGrid}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={styles.skeletonCard} />
            ))}
          </div>
        ) : loadError ? (
          <div className={styles.statusCard}>
            <Dumbbell
              size={64}
              strokeWidth={1.2}
              className={styles.statusIcon}
            />
            <h2 className={styles.statusTitle}>Could not load equipment</h2>
            <p className={styles.statusText}>
              Please check your connection and try again.
            </p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => router.refresh()}
            >
              Retry
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {equipmentList.map((item) => (
              <article key={item.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  {item.isPrimary ? (
                    <span className={styles.primaryBadge}>Primary</span>
                  ) : null}
                  <Image
                    src={item.equipmentImage || "/images/dumbbells.png"}
                    alt={item.name}
                    fill
                    sizes={imageSizes.exerciseCard}
                    className={styles.image}
                  />
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <h2 className={styles.cardTitle}>{item.name}</h2>
                  </div>
                  <span className={styles.category}>
                    {item.category ?? "Equipment"}
                  </span>
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
                    How to use
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
