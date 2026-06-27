"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import styles from "../blogMobile.module.css";

export default function BlogDetailMobile() {
  return (
    <div className={styles.container}>
      <BookOpen size={48} className={styles.icon} />
      <h1 className={styles.title}>Read on desktop</h1>
      <p className={styles.text}>
        Blog articles are best experienced on desktop. Switch to a wider screen
        to read this article.
      </p>
      <Link href="/blog" className={styles.link}>
        Back to blog
      </Link>
    </div>
  );
}
