import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Mic, Search, X } from "lucide-react";
import { useSearchPage } from "@/hooks/useSearchPage";
import { categoryProductToCard } from "@/lib/catalog";
import { SearchDropdownSkeleton } from "@/components/skeleton/PageSkeletons";

export function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const {
    inputRef,
    query,
    setQuery,
    results,
    loading,
    hasSearched,
    isListening,
    isSupported,
    voiceError,
    toggleListening,
    handleOpenProduct,
  } = useSearchPage();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open, inputRef]);

  const showResults = open && hasSearched && query.trim().length > 0;

  return (
    <>
      <Link
        to="/search"
        aria-label="Search"
        className="rounded-full p-2 transition hover:bg-foreground/5 sm:hidden"
      >
        <Search size={18} />
      </Link>

      <div ref={panelRef} className="relative hidden sm:block">
      {open ? (
        <div className="flex w-[min(420px,42vw)] items-center gap-2 rounded-full border border-border/80 bg-card px-3 py-1.5 shadow-soft ring-1 ring-border/40">
          <Search size={16} className="shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && query.trim()) {
                setOpen(false);
                void navigate({
                  to: "/search",
                  search: { q: query.trim() },
                });
              }
            }}
            placeholder='Search "protein, dumbbells..."'
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={toggleListening}
            disabled={!isSupported}
            aria-label={isListening ? "Stop voice search" : "Voice search"}
            aria-pressed={isListening}
            className={`rounded-full p-1.5 transition ${
              isListening
                ? "bg-red-500/10 text-red-500"
                : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            } disabled:opacity-40`}
          >
            <Mic size={16} />
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close search"
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search"
          className="rounded-full p-2 transition hover:bg-foreground/5"
        >
          <Search size={18} />
        </button>
      )}

      {open && isListening ? (
        <p
          className="absolute right-0 top-full mt-2 whitespace-nowrap text-xs text-muted-foreground"
          role="status"
        >
          Listening… speak now
        </p>
      ) : null}

      {open && voiceError ? (
        <p
          className="absolute right-0 top-full mt-2 max-w-xs text-xs text-red-500"
          role="alert"
        >
          {voiceError}
        </p>
      ) : null}

      {showResults ? (
        <div className="absolute right-0 top-full z-50 mt-3 w-[min(420px,90vw)] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-glass ring-1 ring-border/40">
          {loading ? (
            <SearchDropdownSkeleton count={4} />
          ) : results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No products found
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.slice(0, 6).map((product) => {
                const card = categoryProductToCard(product);
                return (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        handleOpenProduct(product);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-foreground/5"
                    >
                      <img
                        src={card.image}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-lg bg-white object-contain p-0.5"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {card.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          AED {card.price}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {results.length > 0 ? (
            <div className="border-t border-border/60 px-4 py-3">
              <Link
                to="/search"
                search={{ q: query.trim() }}
                onClick={() => setOpen(false)}
                className="text-xs font-medium uppercase tracking-widest text-foreground/80 transition hover:text-foreground"
              >
                View all results
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
    </>
  );
}
