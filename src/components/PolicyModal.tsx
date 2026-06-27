"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./PolicyModal.module.css";

type PolicyModalProps = {
  title: string;
  visible: boolean;
  onClose: () => void;
  fetchPolicy: () => Promise<string | null>;
};

export default function PolicyModal({
  title,
  visible,
  onClose,
  fetchPolicy,
}: PolicyModalProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!visible) return;

    let cancelled = false;
    setLoading(true);
    setError(false);
    setContent(null);

    fetchPolicy()
      .then((html) => {
        if (cancelled) return;
        if (!html) {
          setError(true);
          return;
        }
        setContent(html);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [visible, fetchPolicy]);

  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-modal-title"
      >
        <div className={styles.header}>
          <h2 id="policy-modal-title" className={styles.title}>
            {title}
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          {loading && <p className={styles.status}>Loading...</p>}
          {error && (
            <p className={styles.status}>
              Unable to load this policy. Please try again later.
            </p>
          )}
          {content && (
            <div
              className={styles.htmlContent}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
