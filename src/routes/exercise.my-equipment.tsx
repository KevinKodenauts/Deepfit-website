import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, Dumbbell } from "lucide-react";
import { z } from "zod";
import { Nav } from "@/components/site/Nav";
import { EquipmentCardSkeleton } from "@/components/skeleton/PageSkeletons";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useMyEquipmentPage } from "@/hooks/useMyEquipmentPage";
import mobileStyles from "@/styles/my-equipment.module.css";
import desktopStyles from "@/styles/my-equipment-desktop.module.css";

const searchSchema = z.object({
  ids: z.string().optional(),
});

export const Route = createFileRoute("/exercise/my-equipment")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "My Equipment — DEEPFIT" },
      {
        name: "description",
        content:
          "Manage your gym equipment and get personalized exercise recommendations.",
      },
    ],
  }),
  component: MyEquipmentPage,
});

function MyEquipmentPage() {
  const { ids } = Route.useSearch();
  const { isDesktop } = useBreakpoint();
  const page = useMyEquipmentPage(ids);

  return (
    <div className="bg-background text-foreground">
      <Nav />
      <div style={{ paddingTop: "var(--desktop-nav-height)" }}>
        {isDesktop ? (
          <MyEquipmentDesktop {...page} />
        ) : (
          <MyEquipmentMobile {...page} />
        )}
      </div>
    </div>
  );
}

type PageData = ReturnType<typeof useMyEquipmentPage>;

function MyEquipmentMobile({
  navigate,
  equipmentList,
  loading,
  loadError,
  librarySearch,
}: PageData) {
  const router = useRouter();

  return (
    <div className={mobileStyles.container}>
      <header className={mobileStyles.header}>
        <button
          type="button"
          className={mobileStyles.backBtn}
          onClick={() => router.history.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className={mobileStyles.pageTitle}>My Equipment</h1>
      </header>

      <div className={mobileStyles.subtitleBlock}>
        <p className={mobileStyles.subtitle}>
          Gear currently in your arsenal for precision training.
        </p>
        <span className={mobileStyles.badge}>
          {equipmentList.length} Items Selected
        </span>
      </div>

      <div
        className={`${mobileStyles.listArea} ${
          !loading && equipmentList.length >= 3
            ? mobileStyles.listAreaTabletThree
            : ""
        }`}
      >
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <EquipmentCardSkeleton key={index} />
            ))
          : null}
        {!loading && loadError ? (
          <p className={mobileStyles.statusText}>
            Could not load equipment. Please try again.
          </p>
        ) : null}
        {!loading &&
          equipmentList.map((item, i) => (
            <motion.div
              key={item.id}
              className={mobileStyles.equipCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className={mobileStyles.imageWrap}>
                {item.isPrimary ? (
                  <span className={mobileStyles.primaryBadge}>Primary</span>
                ) : null}
                <img
                  src={item.equipmentImage || "/images/dumbbells.png"}
                  alt={item.name}
                  className={mobileStyles.equipImage}
                />
              </div>
              <div className={mobileStyles.cardBody}>
                <div className={mobileStyles.cardHeader}>
                  <h2 className={mobileStyles.equipTitle}>{item.name}</h2>
                </div>
                <p className={mobileStyles.category}>
                  {item.category ?? "Equipment"}
                </p>
                <p className={mobileStyles.description}>
                  {item.description ??
                    "Premium fitness equipment designed for precision training."}
                </p>

                <button
                  type="button"
                  className={mobileStyles.howToUseBtn}
                  onClick={() =>
                    void navigate({
                      to: "/exercise/equipment/$id",
                      params: { id: String(item.id) },
                    })
                  }
                >
                  How To Use
                </button>
              </div>
            </motion.div>
          ))}
      </div>

      {!loading && !loadError && equipmentList.length > 0 ? (
        <div style={{ padding: "0 24px 32px" }}>
          <Link
            to="/exercise/library"
            search={librarySearch}
            className={desktopStyles.startBtn}
            style={{ width: "100%", justifyContent: "center" }}
          >
            Start training
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function MyEquipmentDesktop({
  navigate,
  equipmentList,
  loading,
  loadError,
  librarySearch,
  reload,
}: PageData) {
  return (
    <div className={desktopStyles.shell}>
      <div className={desktopStyles.inner}>
        <header className={desktopStyles.pageHeader}>
          <div className={desktopStyles.pageHeaderMain}>
            <h1 className={desktopStyles.pageTitle}>My Equipment</h1>
            <p className={desktopStyles.pageSubtitle}>
              Gear in your arsenal for precision training. Review usage guides
              and start your workout library.
            </p>
            {!loading && !loadError ? (
              <span className={desktopStyles.badge}>
                {equipmentList.length}{" "}
                {equipmentList.length === 1 ? "item" : "items"} selected
              </span>
            ) : null}
          </div>

          <div className={desktopStyles.headerActions}>
            <button
              type="button"
              className={desktopStyles.editBtn}
              onClick={() => void navigate({ to: "/exercise" })}
            >
              Edit selection
            </button>
            <Link
              to="/exercise/library"
              search={librarySearch}
              className={desktopStyles.startBtn}
            >
              Start training
              <ArrowRight size={16} />
            </Link>
          </div>
        </header>

        {loading ? (
          <div className={desktopStyles.loadingGrid}>
            {Array.from({ length: 3 }).map((_, index) => (
              <EquipmentCardSkeleton key={index} />
            ))}
          </div>
        ) : loadError ? (
          <div className={desktopStyles.statusCard}>
            <Dumbbell
              size={64}
              strokeWidth={1.2}
              className={desktopStyles.statusIcon}
            />
            <h2 className={desktopStyles.statusTitle}>
              Could not load equipment
            </h2>
            <p className={desktopStyles.statusText}>
              Please check your connection and try again.
            </p>
            <button
              type="button"
              className={desktopStyles.retryBtn}
              onClick={reload}
            >
              Retry
            </button>
          </div>
        ) : (
          <div className={desktopStyles.grid}>
            {equipmentList.map((item) => (
              <article key={item.id} className={desktopStyles.card}>
                <div className={desktopStyles.imageWrap}>
                  {item.isPrimary ? (
                    <span className={desktopStyles.primaryBadge}>Primary</span>
                  ) : null}
                  <img
                    src={item.equipmentImage || "/images/dumbbells.png"}
                    alt={item.name}
                    className={desktopStyles.image}
                  />
                </div>

                <div className={desktopStyles.cardBody}>
                  <div className={desktopStyles.cardTop}>
                    <h2 className={desktopStyles.cardTitle}>{item.name}</h2>
                  </div>
                  <span className={desktopStyles.category}>
                    {item.category ?? "Equipment"}
                  </span>
                  <p className={desktopStyles.description}>
                    {item.description ??
                      "Premium fitness equipment designed for precision training."}
                  </p>
                  <button
                    type="button"
                    className={desktopStyles.howToUseBtn}
                    onClick={() =>
                      void navigate({
                        to: "/exercise/equipment/$id",
                        params: { id: String(item.id) },
                      })
                    }
                  >
                    How to use
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
