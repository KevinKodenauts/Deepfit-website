import { Link } from "@tanstack/react-router";
import { ArrowRight, Dumbbell } from "lucide-react";
import type { EquipmentItem } from "@/lib/api/types";
import { saveSelectedEquipment } from "@/lib/exercise/selection";

function stripPlain(value?: string) {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type ProductEquipmentGuideProps = {
  equipment: EquipmentItem;
};

export function ProductEquipmentGuide({
  equipment,
}: ProductEquipmentGuideProps) {
  const summary =
    stripPlain(equipment.headline) ||
    stripPlain(equipment.description) ||
    "View guided steps and matching exercises for this product.";

  return (
    <section className="mt-8" aria-labelledby="product-equipment-heading">
      <h2
        id="product-equipment-heading"
        className="mt-2 font-display text-xl leading-tight sm:text-2xl"
      >
        How to use this equipment
      </h2>
      <Link
        to="/exercise/equipment/$id"
        params={{ id: String(equipment.id) }}
        onClick={() => saveSelectedEquipment([equipment.id])}
        className="group mt-4 flex min-h-[88px] items-center gap-4 rounded-2xl border border-border bg-card p-3 shadow-soft ring-1 ring-border/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-glass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-white">
          {equipment.equipmentImage ? (
            <img
              src={equipment.equipmentImage}
              alt=""
              className="h-full w-full object-contain p-1.5"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <Dumbbell size={22} aria-hidden />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          {equipment.category ? (
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {equipment.category}
            </span>
          ) : null}
          <p className="truncate text-sm font-semibold text-foreground">
            {equipment.name}
          </p>
          <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
            {summary}
          </p>
        </div>
        <span className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1 text-sm font-medium text-foreground">
          <span className="hidden sm:inline">View guide</span>
          <ArrowRight
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </Link>
    </section>
  );
}

export function ProductEquipmentGuideSkeleton() {
  return (
    <div
      className="mt-8 h-[148px] animate-pulse rounded-2xl bg-muted/50"
      aria-hidden
    />
  );
}
