"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Brain,
  ChevronLeft,
  Dumbbell,
  type LucideIcon,
  UtensilsCrossed,
} from "lucide-react";
import ChooseEquipment from "@/components/exercise/ChooseEquipment";
import styles from "./explore.module.css";

type HubId = "move" | "fuel" | "mind";

type Hub = {
  id: HubId;
  name: string;
  icon: LucideIcon;
  description?: string;
};

const HUBS: Hub[] = [
  {
    id: "move",
    name: "Move Hub",
    icon: Dumbbell,
  },
  {
    id: "fuel",
    name: "Fuel Hub",
    icon: UtensilsCrossed,
    description:
      "Nutrition plans, meal guides, and fueling tips are on the way.",
  },
  {
    id: "mind",
    name: "Mind Hub",
    icon: Brain,
    description:
      "Mindfulness, recovery, and mental wellness content is coming soon.",
  },
];

function ComingSoonHub({ hub }: { hub: Hub }) {
  const Icon = hub.icon;

  return (
    <div className={styles.comingSoon}>
      <div className={styles.iconCircle}>
        <Icon size={32} strokeWidth={1.8} />
      </div>
      <h2 className={styles.comingSoonLabel}>Coming Soon</h2>
      <p className={styles.comingSoonHub}>{hub.name}</p>
      <p className={styles.comingSoonText}>{hub.description}</p>
    </div>
  );
}

export default function ExplorePage() {
  const router = useRouter();
  const [activeHub, setActiveHub] = useState(0);
  const [hasEquipmentSelection, setHasEquipmentSelection] = useState(false);

  const hub = HUBS[activeHub];
  const showHubNav = activeHub !== 0 || !hasEquipmentSelection;

  const handleSelectionChanged = useCallback((hasSelection: boolean) => {
    setHasEquipmentSelection(hasSelection);
  }, []);

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
        <h1 className={styles.hubTitle}>{hub.name}</h1>
      </header>

      <div className={styles.desktopHubBar} role="tablist" aria-label="Hubs">
        {HUBS.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeHub === index;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.desktopHubTab} ${
                isActive ? styles.desktopHubTabActive : ""
              }`}
              onClick={() => setActiveHub(index)}
            >
              <Icon size={16} strokeWidth={isActive ? 2.4 : 2} />
              {item.name}
            </button>
          );
        })}
      </div>

      <div
        className={`${styles.content} ${
          !showHubNav ? styles.contentFlush : ""
        }`}
      >
        {activeHub === 0 ? (
          <ChooseEquipment
            hideHeader
            onSelectionChanged={handleSelectionChanged}
          />
        ) : (
          <ComingSoonHub hub={hub} />
        )}
      </div>

      {showHubNav ? (
        <div className={styles.hubNavOuter}>
          <nav className={styles.hubNav} aria-label="Explore hubs">
            {HUBS.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeHub === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.hubTab} ${
                    isActive ? styles.hubTabActive : ""
                  }`}
                  onClick={() => setActiveHub(index)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
                  <span className={styles.hubTabLabel}>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
