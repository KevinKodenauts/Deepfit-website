"use client";

import type { ReactNode } from "react";
import styles from "./desktopPageShell.module.css";

type DesktopPageShellProps = {
  children: ReactNode;
  className?: string;
  /** Content max-width preset */
  width?: "default" | "narrow" | "wide";
  /** Remove vertical padding (e.g. hero pages) */
  flush?: boolean;
};

export default function DesktopPageShell({
  children,
  className,
  width = "default",
  flush = false,
}: DesktopPageShellProps) {
  const widthClass =
    width === "narrow"
      ? styles.narrow
      : width === "wide"
        ? styles.wide
        : "";

  return (
    <div className={`${styles.pageShell} ${className ?? ""}`}>
      <div
        className={`${styles.inner} ${widthClass} ${
          flush ? styles.innerFlush : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
