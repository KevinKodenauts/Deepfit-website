"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  getPolicyContent,
  POLICY_PAGES,
  POLICY_SLUGS,
  type PolicySlug,
} from "@/lib/api/policy";
import styles from "./policy.module.css";

export default function PolicyPageContent({ slug }: { slug: PolicySlug }) {
  const router = useRouter();
  const meta = POLICY_PAGES[slug];
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPolicy = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const html = await getPolicyContent(slug);
      setContent(html);
      if (!html) {
        setError("This policy is not available right now.");
      }
    } catch {
      setContent(null);
      setError("Could not load this policy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void loadPolicy();
  }, [loadPolicy]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className={styles.headerTitle}>{meta.title}</h1>
      </header>

      <div className={styles.shell}>
        <div className={styles.hero}>
          <span className={styles.eyebrow}>Legal</span>
          <h1 className={styles.title}>{meta.title}</h1>
          <p className={styles.description}>{meta.description}</p>
        </div>

        <nav className={styles.nav} aria-label="Policy pages">
          {POLICY_SLUGS.map((item) => {
            const page = POLICY_PAGES[item];
            const active = item === slug;
            return (
              <Link
                key={item}
                href={`/policies/${item}`}
                className={`${styles.navLink} ${
                  active ? styles.navLinkActive : ""
                }`}
              >
                {page.title}
              </Link>
            );
          })}
        </nav>

        <div className={styles.card}>
          {isLoading ? (
            <div className={styles.state}>
              <div className={styles.spinner} />
              <p>Loading policy…</p>
            </div>
          ) : error ? (
            <div className={styles.state}>
              <p>{error}</p>
              <button
                type="button"
                className={styles.retryBtn}
                onClick={() => void loadPolicy()}
              >
                Try again
              </button>
            </div>
          ) : content ? (
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className={styles.state}>
              <p>No content available for this policy.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
