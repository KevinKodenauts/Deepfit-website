"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  Menu,
  Video,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  User,
  Activity,
} from "lucide-react";
import styles from "./active.module.css";
import { imageSizes } from "@/constants/imageSizes";
import { getExerciseById } from "@/lib/api/exercise";
import { ProductCardSkeleton } from "@/components/skeleton/ProductCardSkeleton";
import type { ExerciseItem } from "@/lib/api/types";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function ActiveWorkoutPage() {
  const router = useRouter();
  const params = useParams();
  const exerciseId = Number(params.id);
  const [exercise, setExercise] = useState<ExerciseItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSet, setCurrentSet] = useState(1);

  useEffect(() => {
    if (!exerciseId || Number.isNaN(exerciseId)) {
      setLoadError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError(false);

    getExerciseById(exerciseId)
      .then((data) => {
        if (!data) {
          setLoadError(true);
          return;
        }
        setExercise(data);
        setTimeLeft(data.durationSeconds ?? 45);
        setCurrentSet(1);
      })
      .catch(() => {
        setLoadError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [exerciseId]);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timerId = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, isPlaying]);

  const duration = exercise?.durationSeconds ?? 45;
  const timerProgress = useMemo(
    () => (duration > 0 ? timeLeft / duration : 0),
    [duration, timeLeft],
  );
  const ringCircumference = 2 * Math.PI * 62;
  const ringOffset = ringCircumference * (1 - timerProgress);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const handlePrevious = () => {
    setCurrentSet((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    if (!exercise) return;
    setCurrentSet((prev) => Math.min(exercise.sets ?? 1, prev + 1));
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingWrap}>
          <ProductCardSkeleton variant="category" />
        </div>
      </div>
    );
  }

  if (loadError || !exercise) {
    return (
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <button
            type="button"
            className={styles.pageBackBtn}
            onClick={() => router.back()}
          >
            <ChevronLeft size={22} />
          </button>
          <h1 className={styles.pageTitle}>Exercise</h1>
          <span className={styles.headerSpacer} />
        </header>
        <p className={styles.errorText}>Could not load exercise details.</p>
      </div>
    );
  }

  const totalSets = exercise.sets ?? 3;
  const reps = exercise.reps ?? 12;
  const workoutProgram = exercise.workoutProgram ?? "Arm Day Blast";
  const target = (exercise.targetMuscle ?? "FULL BODY").toUpperCase();

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <button
          type="button"
          className={styles.pageBackBtn}
          onClick={() => router.back()}
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className={styles.pageTitle}>{exercise.exerciseName}</h1>
        <span className={styles.headerSpacer} />
      </header>

      <div className={styles.bodyLayout}>
        <div className={styles.mediaSection}>
          <Image
            src={exercise.exerciseImage || "/images/bicep-curl.png"}
            alt={exercise.exerciseName}
            fill
            sizes={imageSizes.exerciseVideo}
            className={styles.mediaImage}
            priority
          />
          <div className={styles.mediaOverlay} />

          <div className={styles.timerCenter}>
            <motion.div
              className={styles.timerWrapper}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, type: "spring" }}
            >
              <svg
                className={styles.timerRing}
                viewBox="0 0 140 140"
                aria-hidden
              >
                <circle
                  className={styles.timerRingTrack}
                  cx="70"
                  cy="70"
                  r="62"
                />
                <circle
                  className={styles.timerRingProgress}
                  cx="70"
                  cy="70"
                  r="62"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                />
              </svg>
              <div className={styles.timerContent}>
                <span className={styles.timerValue}>
                  {formatTime(timeLeft)}
                </span>
                <span className={styles.timerLabel}>REMAINING</span>
              </div>
            </motion.div>
          </div>

          <div className={styles.bottomImageInfo}>
            <div className={styles.bottomTextBlock}>
              <span className={styles.exerciseBadge}>{target}</span>
              <h3 className={styles.exerciseName}>{exercise.exerciseName}</h3>
            </div>

            <div className={styles.videoPlayBtn}>
              <div className={styles.playCircle}>
                <Play size={11} fill="currentColor" />
              </div>
              <span>{formatTime(duration)}</span>
            </div>

            <span className={styles.bottomSpacer} aria-hidden />
          </div>
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statBox}>
            <span className={styles.statTitle}>SET</span>
            <div className={styles.statData}>
              {currentSet}{" "}
              <span className={styles.statDataSmall}>/ {totalSets}</span>
            </div>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statTitle}>REPS</span>
            <div className={styles.statData}>{reps}</div>
          </div>
        </div>

        <div className={styles.controlsContainer}>
          <button
            type="button"
            className={styles.controlBtn}
            onClick={handlePrevious}
            aria-label="Previous set"
          >
            <SkipBack size={22} />
          </button>
          <button
            type="button"
            className={styles.playPauseBtn}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={26} fill="currentColor" />
            ) : (
              <Play
                size={26}
                fill="currentColor"
                style={{ marginLeft: "3px" }}
              />
            )}
          </button>
          <button
            type="button"
            className={styles.controlBtn}
            onClick={handleNext}
            aria-label="Next set"
          >
            <SkipForward size={22} />
          </button>
        </div>

        <div className={styles.finishWrapper}>
          <button
            type="button"
            className={styles.finishBtn}
            onClick={() => router.back()}
          >
            FINISH WORKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
