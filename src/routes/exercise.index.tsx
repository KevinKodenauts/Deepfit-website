import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import ChooseEquipment from "@/components/explore/ChooseEquipment";
import { Nav } from "@/components/site/Nav";
import styles from "@/styles/exercise.module.css";

export const Route = createFileRoute("/exercise/")({
  head: () => ({
    meta: [
      { title: "Choose Your Equipment — DEEPFIT" },
      {
        name: "description",
        content:
          "Select your fitness equipment to unlock matching Deepfit exercises and workouts.",
      },
    ],
  }),
  component: ExerciseIndexPage,
});

function ExerciseIndexPage() {
  const router = useRouter();

  return (
    <div className="bg-background text-foreground">
      <Nav />
      <div
        className={styles.exerciseContainer}
        style={{ paddingTop: "var(--desktop-nav-height)" }}
      >
        <header className={styles.header}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => router.history.back()}
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className={styles.pageTitle}>Choose Your Equipment</h1>
        </header>
        <p className={styles.subtitle}>
          Select one or more fitness tools to discover matching exercises.
        </p>
        <ChooseEquipment />
      </div>
    </div>
  );
}
