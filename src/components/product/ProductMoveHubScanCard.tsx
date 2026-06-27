"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import styles from "./ProductMoveHubScanCard.module.css";

type ProductMoveHubScanCardProps = {
  loading?: boolean;
  error?: string;
  variant?: "mobile" | "desktop";
  onScan: () => void;
};

export default function ProductMoveHubScanCard({
  loading = false,
  error,
  variant = "mobile",
  onScan,
}: ProductMoveHubScanCardProps) {
  return (
    <div>
      <button
        type="button"
        className={`${styles.card} ${
          variant === "desktop" ? styles.cardDesktop : ""
        }`}
        onClick={onScan}
        disabled={loading}
        aria-label="Scan for more product exercise info"
      >
        <div className={styles.qrImageWrap}>
          <Image
            src="/images/Deepfit-move-hub-Qr.png"
            alt="Deepfit Move Hub QR"
            width={60}
            height={60}
            className={styles.qrImage}
          />
        </div>
        <div className={styles.textCol}>
          <div className={styles.title}>Scan for more info</div>
          <div className={styles.desc}>View complete exercise of product</div>
        </div>
        {loading ? (
          <div className={styles.spinner} aria-hidden />
        ) : (
          <ChevronRight size={18} className={styles.chevron} />
        )}
      </button>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
