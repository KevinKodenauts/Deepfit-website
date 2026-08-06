import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductGridSkeleton } from "@/components/skeleton/PageSkeletons";
import { categories as fallbackCategories, type Product } from "@/lib/products";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { getMainCategories } from "@/lib/api/categories";
import { getProductsByCategory } from "@/lib/api/products";
import { mapToCategoryProduct } from "@/lib/api/mappers";
import { categoryProductToCard } from "@/lib/catalog";
import { Skeleton } from "@/components/ui/skeleton";
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

function buildDisciplineItems(main: MainCategory | undefined): DisciplineItem[] {
  if (!main) return [];

  const nested = main.categories ?? [];
  if (nested.length === 0) return [];

  const items: DisciplineItem[] = [];

  for (const category of nested) {
    const subs = category.subCategories ?? [];
    if (subs.length > 0) {
      for (const sub of subs) {
        items.push({
          key: `sub-${category.categoryId}-${sub.subCategoryId}`,
          name: sub.subCategoryName,
          categoryId: category.categoryId,
          subCategoryId: sub.subCategoryId,
        });
      }
      continue;
    }

    items.push({
      key: `cat-${category.categoryId}`,
      name: category.categoryName,
      categoryId: category.categoryId,
    });
  }

  return items;
}

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — DEEPFIT" },
      {
        name: "description",
        content:
          "Explore Deepfit's full catalog of premium strength, cardio, recovery, and yoga equipment.",
      },
      { property: "og:title", content: "Shop premium fitness equipment — DEEPFIT" },
      {
        property: "og:description",
        content:
          "The full Deepfit catalog: strength, cardio, recovery and wellness essentials.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { main: mainFromUrl } = useSearch({ from: "/shop" });
  const [rawProducts, setRawProducts] = useState<ApiProduct[]>([]);
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedDisciplineKeys, setSelectedDisciplineKeys] = useState<
    Set<string>
  >(new Set());
  const [loading, setLoading] = useState(true);

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

  // Reset discipline filters when main category changes
  useEffect(() => {
    setSelectedDisciplineKeys(new Set());
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

    // When exactly one discipline is selected, narrow the API request by categoryId
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
      const categoryIds = new Set(
        selectedDisciplines.map((d) => d.categoryId)
      );

      filtered = rawProducts.filter((product) => {
        const subId = product.subCategoryDetails?.id;
        const catId = product.categoryDetails?.id;

        if (subIds.size > 0 && subId != null && subIds.has(subId)) {
          return true;
        }

        // Discipline items without subcategories filter by category
        if (
          subIds.size === 0 &&
          catId != null &&
          categoryIds.has(catId)
        ) {
          return true;
        }

        // Mixed: also match category when item has no sub id match path
        if (
          subIds.size > 0 &&
          selectedDisciplines.some(
            (d) => d.subCategoryId == null && d.categoryId === catId
          )
        ) {
          return true;
        }

        return false;
      });
    }

    return filtered.map(mapToCategoryProduct).map(categoryProductToCard);
  }, [rawProducts, selectedDisciplineKeys, disciplineItems]);

  const toggleDiscipline = (key: string) => {
    setSelectedDisciplineKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const categoryList =
    mainCategories.length > 0
      ? mainCategories.map((c) => ({ id: c.id, name: c.mainCategoryName }))
      : fallbackCategories.map((c, i) => ({ id: -(i + 1), name: c.name }));

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
            Filter by category, discipline or price. Everything ships with a
            60-day home trial and lifetime frame warranty.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <div>
                <div className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Category
                </div>
                <ul className="space-y-2 text-sm">
                  {categoryList.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => {
                          if (c.id > 0) setSelectedCategoryId(c.id);
                        }}
                        className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-left transition hover:bg-foreground/5 ${
                          selectedCategoryId === c.id
                            ? "bg-foreground/5 font-medium"
                            : ""
                        }`}
                      >
                        {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Discipline
                </div>
                {disciplineItems.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {disciplineItems.map((item) => {
                      const checked = selectedDisciplineKeys.has(item.key);
                      return (
                        <li key={item.key}>
                          <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-foreground/5">
                            <span className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                className="accent-foreground"
                                checked={checked}
                                onChange={() => toggleDiscipline(item.key)}
                              />
                              {item.name}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="px-2 text-sm text-muted-foreground">
                    No subcategories for this category.
                  </p>
                )}
              </div>

              <FilterGroup
                title="Price"
                items={[
                  "Under $100",
                  "$100 – $500",
                  "$500 – $1000",
                  "$1000+",
                ]}
              />
              <FilterGroup
                title="Availability"
                items={["In stock", "Pre-order", "New arrival"]}
              />
            </div>
          </aside>
          <div>
            <div className="mb-8 flex items-center justify-between rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border/60">
              <button className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest lg:hidden">
                <SlidersHorizontal size={14} /> Filters
              </button>
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
              <div className="flex items-center gap-2">
                <button className="rounded-full bg-foreground p-2 text-background">
                  <LayoutGrid size={14} />
                </button>
                <button className="rounded-full p-2 text-muted-foreground">
                  <List size={14} />
                </button>
              </div>
            </div>
            {loading ? (
              <ProductGridSkeleton count={6} />
            ) : items.length === 0 ? (
              <div className="rounded-3xl bg-card p-10 text-center text-muted-foreground shadow-soft ring-1 ring-border/60">
                No products found.{" "}
                <Link to="/" className="underline">
                  Back home
                </Link>
              </div>
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

function FilterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
        {title}
      </div>
      <ul className="space-y-2 text-sm">
        {items.map((i) => (
          <li key={i}>
            <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-foreground/5">
              <span className="flex items-center gap-3">
                <input type="checkbox" className="accent-foreground" />
                {i}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
