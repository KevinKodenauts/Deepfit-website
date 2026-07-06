"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMainCategories } from "@/lib/api/categories";
import {
  mapToCategoryProduct,
  type CategoryProductView,
} from "@/lib/api/mappers";
import { searchProducts } from "@/lib/api/products";
import type { MainCategory } from "@/lib/api/types";
import { buildProductHref } from "@/lib/productNavigation";
import { useCatalogSync } from "@/hooks/useCatalogSync";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

export const SEARCH_LIMIT = 24;
export const SEARCH_DEBOUNCE_MS = 350;

export function useSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [trendingCategories, setTrendingCategories] = useState<MainCategory[]>(
    []
  );
  const [results, setResults] = useState<CategoryProductView[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(Boolean(searchParams.get("q")));
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const voiceAutoStartRef = useRef(false);

  const {
    isListening,
    isSupported,
    error: voiceError,
    setError: setVoiceError,
    startListening,
    toggleListening,
  } = useSpeechRecognition({
    onResult: (transcript) => {
      setQuery(transcript);
      setVoiceError("");
    },
  });

  useEffect(() => {
    getMainCategories()
      .then((categories) => setTrendingCategories(categories.slice(0, 8)))
      .catch(() => setTrendingCategories([]));
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (searchParams.get("voice") !== "1" || !isSupported || voiceAutoStartRef.current) {
      return;
    }

    voiceAutoStartRef.current = true;
    startListening();

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("voice");
    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `/search?${nextQuery}` : "/search");
  }, [searchParams, isSupported, startListening, router]);

  const runSearch = useCallback(async (searchQuery: string, nextOffset = 0) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setResults([]);
      setTotalCount(0);
      setHasSearched(false);
      setHasMore(false);
      setOffset(0);
      return;
    }

    if (nextOffset === 0) {
      setLoading(true);
      setError("");
      setHasSearched(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await searchProducts(trimmed, {
        limit: SEARCH_LIMIT,
        offset: nextOffset,
      });

      const mapped = response.products.map(mapToCategoryProduct);

      if (nextOffset === 0) {
        setResults(mapped);
        setTotalCount(response.count);
      } else {
        setResults((prev) => [...prev, ...mapped]);
      }

      const newOffset = nextOffset + mapped.length;
      setOffset(newOffset);
      setHasMore(newOffset < response.count);
    } catch {
      if (nextOffset === 0) {
        setResults([]);
        setTotalCount(0);
        setError("Could not search products. Please try again.");
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setTotalCount(0);
      setHasSearched(false);
      setHasMore(false);
      setOffset(0);
      setError("");
      return;
    }

    const timer = window.setTimeout(() => {
      void runSearch(trimmed);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query, runSearch]);

  useCatalogSync(() => {
    if (query.trim()) {
      void runSearch(query.trim());
      return;
    }

    getMainCategories()
      .then((categories) => setTrendingCategories(categories.slice(0, 8)))
      .catch(() => setTrendingCategories([]));
  });

  const handleLoadMore = () => {
    if (!hasMore || loadingMore || loading || !query.trim()) return;
    void runSearch(query, offset);
  };

  const handleOpenProduct = (product: CategoryProductView) => {
    router.push(
      buildProductHref(
        product.id,
        results.map((item) => item.id)
      )
    );
  };

  return {
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
    handleOpenProduct,
    isListening,
    isSupported,
    voiceError,
    toggleListening,
  };
}
