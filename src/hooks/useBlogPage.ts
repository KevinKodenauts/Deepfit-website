"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getBlogCategories,
  getBlogPosts,
  getFeaturedBlogPosts,
  type BlogCategory,
  type BlogPostListItem,
} from "@/lib/api/blog";
import { useRequestGuard } from "@/hooks/useRequestGuard";

const PAGE_SIZE = 9;

export function useBlogPage() {
  const { begin, isActive } = useRequestGuard();
  const [featured, setFeatured] = useState<BlogPostListItem[]>([]);
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, debouncedSearch]);

  const loadBlog = useCallback(async () => {
    const request = begin();
    setLoading(true);
    setError("");

    try {
      const [featuredPosts, categoryList, listResult] = await Promise.all([
        getFeaturedBlogPosts(),
        getBlogCategories(),
        getBlogPosts({
          category: selectedCategory || undefined,
          search: debouncedSearch || undefined,
          page,
          limit: PAGE_SIZE,
        }),
      ]);

      if (!isActive(request)) return;

      setFeatured(featuredPosts);
      setCategories(categoryList);
      setPosts(listResult.posts);
      setTotal(listResult.pagination?.total ?? listResult.posts.length);
    } catch (err) {
      if (!isActive(request)) return;
      setFeatured([]);
      setCategories([]);
      setPosts([]);
      setTotal(0);
      setError(
        err instanceof Error ? err.message : "Could not load blog posts."
      );
    } finally {
      if (isActive(request)) {
        setLoading(false);
      }
    }
  }, [begin, isActive, selectedCategory, debouncedSearch, page]);

  useEffect(() => {
    void loadBlog();
  }, [loadBlog]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return {
    featured,
    posts,
    categories,
    selectedCategory,
    setSelectedCategory,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    loading,
    error,
    reload: loadBlog,
  };
}
