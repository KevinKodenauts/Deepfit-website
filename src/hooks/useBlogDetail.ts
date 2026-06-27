"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getBlogPostBySlug,
  getBlogPosts,
  type BlogPostDetail,
  type BlogPostListItem,
} from "@/lib/api/blog";
import { useRequestGuard } from "@/hooks/useRequestGuard";

export function useBlogDetail(slug: string) {
  const { begin, isActive } = useRequestGuard();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [related, setRelated] = useState<BlogPostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPost = useCallback(async () => {
    if (!slug) return;

    const request = begin();
    setLoading(true);
    setError("");

    try {
      const detail = await getBlogPostBySlug(slug);
      if (!isActive(request)) return;

      setPost(detail);

      if (detail.category?.slug) {
        const { posts } = await getBlogPosts({
          category: detail.category.slug,
          limit: 4,
        });
        if (!isActive(request)) return;
        setRelated(posts.filter((item) => item.slug !== slug).slice(0, 3));
      } else {
        setRelated([]);
      }
    } catch (err) {
      if (!isActive(request)) return;
      setPost(null);
      setRelated([]);
      setError(err instanceof Error ? err.message : "Could not load this article.");
    } finally {
      if (isActive(request)) {
        setLoading(false);
      }
    }
  }, [slug, begin, isActive]);

  useEffect(() => {
    void loadPost();
  }, [loadPost]);

  return { post, related, loading, error, reload: loadPost };
}
