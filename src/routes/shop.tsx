import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductsEmptyState } from "@/components/site/ProductsEmptyState";
import { ProductGridSkeleton } from "@/components/skeleton/PageSkeletons";
import { categories as fallbackCategories, type Product } from "@/lib/products";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { getMainCategories } from "@/lib/api/categories";
import { getProductsByCategory } from "@/lib/api/products";
import { mapToCategoryProduct } from "@/lib/api/mappers";
import { categoryProductToCard } from "@/lib/catalog";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { ApiProduct, MainCategory } from "@/lib/api/types";

const searchSchema = z.object({
  main: z.coerce.number().optional(),
});

type DisciplineItem = {
  key: string;
  name: string;
  categoryId: number;
  subCategoryId?: number;
};

type PriceKey = "under-100" | "100-500" | "500-1000" | "1000-plus";
type AvailabilityKey = "instock" | "preorder" | "new";

const PRICE_OPTIONS: Array<{
  key: PriceKey;
  label: string;
  matches: (price: number) => boolean;
}> = [
  { key: "under-100", label: "Under AED 100", matches: (price) => price < 100 },
  {
    key: "100-500",
    label: "AED 100 – 500",
    matches: (price) => price >= 100 && price <= 500,
  },
  {
    key: "500-1000",
    label: "AED 500 – 1,000",
    matches: (price) => price > 500 && price <= 1000,
  },
  { key: "1000-plus", label: "AED 1,000+", matches: (price) => price > 1000 },
];

const AVAILABILITY_OPTIONS: Array<{ key: AvailabilityKey; label: string }> = [
  { key: "instock", label: "In stock" },
  { key: "preorder", label: "Pre-order" },
  { key: "new", label: "New arrival" },
];

function formatLabel(name: string) {
  return name
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildDisciplineItems(main: MainCategory | undefined): DisciplineItem[] {
  if (!main) return [];

  const fromTopLevel = (main.subCategories ?? []).filter(
    (sub) => sub.subCategoryId && sub.subCategoryName
  );
  if (fromTopLevel.length > 0) {
    return fromTopLevel.map((sub) => ({
      key: `sub-${main.id}-${sub.subCategoryId}`,
      name: formatLabel(sub.subCategoryName),
      categoryId: main.id,
      subCategoryId: sub.subCategoryId,
    }));
  }

  const seen = new Set<number>();
  const items: DisciplineItem[] = [];

  for (const category of main.categories ?? []) {
    for (const sub of category.subCategories ?? []) {
      if (!sub.subCategoryId || seen.has(sub.subCategoryId)) continue;
      seen.add(sub.subCategoryId);
      items.push({
        key: `sub-${main.id}-${sub.subCategoryId}`,
        name: formatLabel(sub.subCategoryName),
        categoryId: main.id,
        subCategoryId: sub.subCategoryId,
      });
    }
  }

  return items;
}

function toggleSetValue<T>(prev: Set<T>, value: T) {
  const next = new Set(prev);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

function isInStock(product: ApiProduct) {
  const status = String(product.stockStatus ?? "").toLowerCase();
  if (status === "outofstock" || product.productStatus === "Out of stock") {
    return false;
  }
  if (product.inStock === false || product.inStock === "false") return false;
  return true;
}

function isPreorder(product: ApiProduct) {
  return String(product.stockStatus ?? "").toLowerCase() === "onbackorder";
}

function isNewArrival(product: ApiProduct) {
  return (
    product.isFeaturedProduct === true ||
    product.isFeaturedProduct === "true" ||
    product.isFeaturedProduct === "1"
  );
}

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — DEEPFIT" },
      {
        name: "description",
        content:
          "Explore Deepfit's full catalog across Move Hub, Fuel Hub and Mind Hub.",
      },
      { property: "og:title", content: "Shop premium wellness — DEEPFIT" },
      {
        property: "og:description",
        content: "The full Deepfit catalog: Move, Fuel and Mind.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const navigate = useNavigate({ from: "/shop" });
  const { main: mainFromUrl } = useSearch({ from: "/shop" });
  const [rawProducts, setRawProducts] = useState<ApiProduct[]>([]);
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedDisciplineKeys, setSelectedDisciplineKeys] = useState<
    Set<string>
  >(new Set());
  const [selectedPrices, setSelectedPrices] = useState<Set<PriceKey>>(new Set());
  const [selectedAvailability, setSelectedAvailability] = useState<
    Set<AvailabilityKey>
  >(new Set());
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getMainCategories()
      .then((list) => {
        if (cancelled) return;
        setMainCategories(list);
        if (list.length) {
          const preferredId =
            mainFromUrl && list.some((c) => c.id === mainFromUrl)
              ? mainFromUrl
              : list[0].id;
          setSelectedCategoryId(preferredId);
        }
      })
      .catch(() => {
        /* keep empty — fall back UI below */
      });
    return () => {
      cancelled = true;
    };
  }, [mainFromUrl]);

  const selectedMain = useMemo(
    () => mainCategories.find((c) => c.id === selectedCategoryId),
    [mainCategories, selectedCategoryId]
  );

  const disciplineItems = useMemo(
    () => buildDisciplineItems(selectedMain),
    [selectedMain]
  );

  const selectedName = useMemo(() => {
    if (selectedMain) return selectedMain.mainCategoryName;
    return fallbackCategories[0]?.name ?? "Shop";
  }, [selectedMain]);

  useEffect(() => {
    setSelectedDisciplineKeys(new Set());
    setSelectedPrices(new Set());
    setSelectedAvailability(new Set());
  }, [selectedCategoryId]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    if (selectedCategoryId == null) {
      setLoading(false);
      return;
    }

    const selectedDisciplines = disciplineItems.filter((item) =>
      selectedDisciplineKeys.has(item.key)
    );

    const categoryIdForApi =
      selectedDisciplines.length === 1
        ? selectedDisciplines[0].categoryId
        : undefined;

    getProductsByCategory(selectedCategoryId, categoryIdForApi, {
      limit: 48,
      offset: 0,
    })
      .then((result) => {
        if (cancelled) return;
        setRawProducts(result.products);
      })
      .catch(() => {
        if (!cancelled) setRawProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedCategoryId, selectedDisciplineKeys, disciplineItems]);

  const items: Product[] = useMemo(() => {
    const selectedDisciplines = disciplineItems.filter((item) =>
      selectedDisciplineKeys.has(item.key)
    );

    let filtered = rawProducts;

    if (selectedDisciplines.length > 0) {
      const subIds = new Set(
        selectedDisciplines
          .map((d) => d.subCategoryId)
          .filter((id): id is number => id != null)
      );

      filtered = rawProducts.filter((product) => {
        const subId = product.subCategoryDetails?.id;
        return subId != null && subIds.has(subId);
      });
    }

    if (selectedAvailability.size > 0) {
      filtered = filtered.filter((product) => {
        if (selectedAvailability.has("instock") && isInStock(product)) return true;
        if (selectedAvailability.has("preorder") && isPreorder(product)) return true;
        if (selectedAvailability.has("new") && isNewArrival(product)) return true;
        return false;
      });
    }

    let mapped = filtered.map(mapToCategoryProduct).map(categoryProductToCard);

    if (selectedPrices.size > 0) {
      mapped = mapped.filter((product) =>
        PRICE_OPTIONS.some(
          (option) =>
            selectedPrices.has(option.key) && option.matches(product.price)
        )
      );
    }

    return mapped;
  }, [
    rawProducts,
    selectedDisciplineKeys,
    disciplineItems,
    selectedPrices,
    selectedAvailability,
  ]);

  const selectCategory = (id: number) => {
    if (id <= 0) return;
    setSelectedCategoryId(id);
    setFiltersOpen(false);
    void navigate({ search: { main: id } });
  };

  const categoryList =
    mainCategories.length > 0
      ? mainCategories.map((c) => ({
          id: c.id,
          name: c.mainCategoryName,
          image: c.mainCategoryImage,
        }))
      : fallbackCategories.map((c, i) => ({
          id: -(i + 1),
          name: c.name,
          image: "",
        }));

  const filterPanel = (
    <ShopFilters
      categoryList={categoryList}
      selectedCategoryId={selectedCategoryId}
      onSelectCategory={selectCategory}
      disciplineItems={disciplineItems}
      selectedDisciplineKeys={selectedDisciplineKeys}
      onToggleDiscipline={(key) =>
        setSelectedDisciplineKeys((prev) => toggleSetValue(prev, key))
      }
      selectedPrices={selectedPrices}
      onTogglePrice={(key) =>
        setSelectedPrices((prev) => toggleSetValue(prev, key))
      }
      selectedAvailability={selectedAvailability}
      onToggleAvailability={(key) =>
        setSelectedAvailability((prev) => toggleSetValue(prev, key))
      }
    />
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="relative overflow-hidden bg-soft pt-32">
        <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl [background:radial-gradient(circle,var(--lavender),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            The catalog
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl">
            Every piece, <span className="text-gradient italic">designed</span>{" "}
            to last a lifetime.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Filter by hub, discipline or price. Everything ships with a 60-day
            home trial.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-[1.75rem] bg-card p-5 shadow-soft ring-1 ring-border/60">
              {filterPanel}
            </div>
          </aside>
          <div>
            <div className="mb-8 flex items-center justify-between gap-3 rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border/60">
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border px-4 text-xs uppercase tracking-widest lg:hidden"
                  >
                    <SlidersHorizontal size={14} /> Filters
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[min(100%,320px)] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">{filterPanel}</div>
                </SheetContent>
              </Sheet>
              <div className="text-sm text-muted-foreground">
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-medium text-foreground">
                      {items.length}
                    </span>{" "}
                    in {selectedName}
                  </>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-pressed="true"
                  aria-label="Grid view"
                  className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-foreground text-background"
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  type="button"
                  aria-label="List view unavailable"
                  disabled
                  className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground/50"
                >
                  <List size={14} />
                </button>
              </div>
            </div>
            {loading ? (
              <ProductGridSkeleton count={6} />
            ) : items.length === 0 ? (
              <ProductsEmptyState
                title="Product not found"
                description={`We couldn't find products in ${selectedName} yet. Try another hub or browse the full catalog.`}
              />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function ShopFilters({
  categoryList,
  selectedCategoryId,
  onSelectCategory,
  disciplineItems,
  selectedDisciplineKeys,
  onToggleDiscipline,
  selectedPrices,
  onTogglePrice,
  selectedAvailability,
  onToggleAvailability,
}: {
  categoryList: Array<{ id: number; name: string; image?: string }>;
  selectedCategoryId: number | null;
  onSelectCategory: (id: number) => void;
  disciplineItems: DisciplineItem[];
  selectedDisciplineKeys: Set<string>;
  onToggleDiscipline: (key: string) => void;
  selectedPrices: Set<PriceKey>;
  onTogglePrice: (key: PriceKey) => void;
  selectedAvailability: Set<AvailabilityKey>;
  onToggleAvailability: (key: AvailabilityKey) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Category
        </div>
        <ul className="space-y-2">
          {categoryList.map((category) => {
            const selected = selectedCategoryId === category.id;
            return (
              <li key={category.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelectCategory(category.id)}
                  className={cn(
                    "flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-2xl px-2 py-1.5 text-left text-sm transition",
                    selected
                      ? "bg-foreground/[0.06] font-medium shadow-soft ring-1 ring-foreground/15"
                      : "hover:bg-foreground/5"
                  )}
                >
                  <span className="size-10 shrink-0 overflow-hidden rounded-xl bg-muted ring-1 ring-border/60">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        {category.name.charAt(0)}
                      </span>
                    )}
                  </span>
                  <span className="leading-snug">{category.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {disciplineItems.length > 0 ? (
        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Discipline
          </div>
          <ul className="space-y-1">
            {disciplineItems.map((item) => (
              <FilterCheckRow
                key={item.key}
                label={item.name}
                checked={selectedDisciplineKeys.has(item.key)}
                onToggle={() => onToggleDiscipline(item.key)}
              />
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <div className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Price
        </div>
        <ul className="space-y-1">
          {PRICE_OPTIONS.map((option) => (
            <FilterCheckRow
              key={option.key}
              label={option.label}
              checked={selectedPrices.has(option.key)}
              onToggle={() => onTogglePrice(option.key)}
            />
          ))}
        </ul>
      </div>

      <div>
        <div className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Availability
        </div>
        <ul className="space-y-1">
          {AVAILABILITY_OPTIONS.map((option) => (
            <FilterCheckRow
              key={option.key}
              label={option.label}
              checked={selectedAvailability.has(option.key)}
              onToggle={() => onToggleAvailability(option.key)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function FilterCheckRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={checked}
        className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-2 text-left text-sm transition hover:bg-foreground/5"
      >
        <Checkbox
          checked={checked}
          tabIndex={-1}
          className="pointer-events-none size-5"
          aria-hidden="true"
        />
        <span className={cn(checked && "font-medium")}>{label}</span>
      </button>
    </li>
  );
}
