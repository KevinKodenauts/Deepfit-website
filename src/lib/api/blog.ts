import { ApiError } from "./client";
import { blogUrl } from "./config";

export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
  order?: number;
  is_active?: boolean;
};

export type BlogPostListItem = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string | null;
  category?: BlogCategory | null;
  authorName?: string;
  tags?: string[];
  publishedAt?: string | null;
  isFeatured?: boolean;
};

export type BlogPostDetail = BlogPostListItem & {
  content: string;
  metaTitle?: string;
  metaDescription?: string;
};

type BlogListResponse = {
  status: boolean;
  message?: string;
  data: BlogPostListItem[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
};

type BlogDetailResponse = {
  status: boolean;
  message?: string;
  data: BlogPostDetail;
};

type BlogCategoriesResponse = {
  status: boolean;
  message?: string;
  data: BlogCategory[];
};

type BlogFeaturedResponse = {
  status: boolean;
  message?: string;
  data: BlogPostListItem[];
};

export function formatBlogDate(iso?: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

async function blogRequest<T>(
  path: string,
  query?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const url = blogUrl(path, query);
  const response = await fetch(url, { credentials: "include" });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      (data && typeof data === "object" && "message" in data
        ? String((data as { message: string }).message)
        : null) ?? `Request failed (${response.status})`;
    throw new ApiError(message, response.status);
  }

  if (data && typeof data === "object" && "status" in data && data.status === false) {
    throw new ApiError(
      String((data as { message?: string }).message ?? "Blog request failed"),
      response.status
    );
  }

  return data as T;
}

export async function getBlogPosts(options?: {
  category?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const data = await blogRequest<BlogListResponse>("/posts", {
    category: options?.category,
    featured: options?.featured ? "true" : undefined,
    search: options?.search,
    page: options?.page,
    limit: options?.limit,
  });

  return {
    posts: data.data ?? [],
    pagination: data.pagination,
  };
}

export async function getFeaturedBlogPosts(): Promise<BlogPostListItem[]> {
  const data = await blogRequest<BlogFeaturedResponse>("/featured");
  return data.data ?? [];
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const data = await blogRequest<BlogCategoriesResponse>("/categories");
  return data.data ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail> {
  const encoded = encodeURIComponent(slug);
  const data = await blogRequest<BlogDetailResponse>(`/posts/${encoded}`);

  if (!data.data) {
    throw new ApiError("Blog post not found", 404);
  }

  return data.data;
}
