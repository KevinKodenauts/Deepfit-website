import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Mic, Search } from "lucide-react";
import { z } from "zod";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductsEmptyState } from "@/components/site/ProductsEmptyState";
import { ProductGridSkeleton } from "@/components/skeleton/PageSkeletons";
import { useSearchPage } from "@/hooks/useSearchPage";
import { categoryProductToCard } from "@/lib/catalog";

const searchSchema = z.object({
  q: z.string().optional(),
  voice: z.string().optional(),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Search — DEEPFIT" },
      {
        name: "description",
        content: "Search supplements, gym gear, wellness essentials and more.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const {
    inputRef,
    query,
    setQuery,
    trendingCategories,
    results,
    totalCount,
    loading,
    loadingMore,
    error,
    hasSearched,
    hasMore,
    handleLoadMore,
    isListening,
    isSupported,
    voiceError,
    toggleListening,
  } = useSearchPage(search);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="relative overflow-hidden bg-soft pt-32">
        <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl [background:radial-gradient(circle,var(--lavender),transparent_60%)]" />
        <div className="mx-auto max-w-3xl px-6 pb-16 lg:px-10">
          <button
            type="button"
            onClick={() => navigate({ to: ".." })}
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ChevronLeft size={18} />
            Back
          </button>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Search
          </div>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Find your next <span className="text-gradient italic">fit</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Find supplements, gym gear, wellness essentials and more
          </p>

          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-soft ring-1 ring-border/40 focus-within:ring-foreground/20">
            <Search size={20} className="shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Search "protein, dumbbells, vitamins..."'
              className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={toggleListening}
              disabled={!isSupported}
              aria-label={isListening ? "Stop voice search" : "Voice search"}
              aria-pressed={isListening}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                isListening
                  ? "bg-red-500/10 text-red-500"
                  : "bg-foreground/5 text-muted-foreground hover:text-foreground"
              } disabled:opacity-40`}
            >
              <Mic size={18} />
            </button>
          </div>

          {isListening ? (
            <p className="mt-3 text-sm text-muted-foreground" role="status">
              Listening… speak now
            </p>
          ) : null}
          {voiceError ? (
            <p className="mt-3 text-sm text-red-500" role="alert">
              {voiceError}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {!hasSearched ? (
          trendingCategories.length > 0 ? (
            <div>
              <h2 className="mb-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Trending categories
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {trendingCategories.map((category) => (
                  <Link
                    key={category.id}
                    to="/shop"
                    search={{ main: category.id }}
                    className="group flex cursor-pointer flex-col items-center gap-3 rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border/50 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="h-16 w-16 overflow-hidden rounded-xl bg-muted">
                      <img
                        src={category.mainCategoryImage}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-center text-sm font-medium">
                      {category.mainCategoryName}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null
        ) : loading ? (
          <ProductGridSkeleton count={6} />
        ) : error ? (
          <div className="py-20 text-center text-muted-foreground">{error}</div>
        ) : results.length === 0 ? (
          <ProductsEmptyState
            title="Product not found"
            description="Try a different keyword or browse another hub."
            actionLabel="Browse shop"
            actionTo="/shop"
          />
        ) : (
          <div>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-2xl">
                Results for &ldquo;{query.trim()}&rdquo;
              </h2>
              <span className="text-sm text-muted-foreground">
                {totalCount} {totalCount === 1 ? "product" : "products"}
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={categoryProductToCard(product)}
                />
              ))}
            </div>
            {hasMore ? (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition hover:bg-foreground/5 disabled:opacity-60"
                >
                  {loadingMore ? "Loading…" : "Load more products"}
                </button>
              </div>
            ) : null}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
