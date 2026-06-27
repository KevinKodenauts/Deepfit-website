import styles from "./loading.module.css";

/** Shown during route transitions — nav stays interactive in the parent layout. */
export default function MainLoading() {
  return (
    <div className={styles.overlay} aria-hidden>
      <div className={styles.bar} />
    </div>
  );
}
