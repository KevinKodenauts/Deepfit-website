"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import styles from "./blogMobile.module.css";

export default function BlogMobile() {
  return (
    <div className={styles.container}>
      <BookOpen size={48} className={styles.icon} />
      <h1 className={styles.title}>Deepfit Blog</h1>
      <p className={styles.text}>
        Our blog is optimized for desktop. Open Deepfit on a larger screen to
        read wellness articles, training tips, and nutrition guides.
      </p>
      <Link href="/home" className={styles.link}>
        Back to home
      </Link>
    </div>
  );
}
