"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import styles from "./AuthTopToast.module.css";

type AuthTopToastProps = {
  message: string;
  visible: boolean;
  onClose: () => void;
  durationMs?: number;
};

export default function AuthTopToast({
  message,
  visible,
  onClose,
  durationMs = 5000,
}: AuthTopToastProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(onClose, durationMs);
    return () => clearTimeout(timer);
  }, [visible, onClose, durationMs]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.toastWrap}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          role="status"
          aria-live="polite"
        >
          <div className={styles.toast}>
            <CheckCircle2 className={styles.icon} size={22} />
            <p className={styles.message}>{message}</p>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressBar}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: durationMs / 1000, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
