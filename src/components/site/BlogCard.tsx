import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  blogCategoryTone,
  blogImageAlt,
  formatBlogDate,
  type BlogPostListItem,
} from "@/lib/api/blog";
import { cn } from "@/lib/utils";

export function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPostListItem;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group grid overflow-hidden rounded-[2rem] bg-card shadow-soft ring-1 ring-border/50 transition duration-300 hover:-translate-y-0.5 hover:shadow-glass sm:rounded-[2.5rem] lg:grid-cols-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted lg:aspect-auto lg:min-h-[28rem]">
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={blogImageAlt(post)}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="h-full w-full bg-soft" />
          )}
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <BlogMeta post={post} />
          <h2 className="mt-4 font-display text-3xl leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h2>
          {post.excerpt ? (
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {post.excerpt}
            </p>
          ) : null}
          <span className="mt-8 inline-flex items-center gap-1 text-sm font-medium">
            Read article
            <ArrowUpRight
              size={16}
              className="transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col overflow-hidden rounded-[2rem] bg-card shadow-soft ring-1 ring-border/50 transition duration-300 hover:-translate-y-0.5 hover:shadow-glass"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={blogImageAlt(post)}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="h-full w-full bg-soft" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <BlogMeta post={post} />
        <h2 className="mt-3 font-display text-2xl leading-snug tracking-tight">
          {post.title}
        </h2>
        {post.excerpt ? (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium">
          Read article
          <ArrowUpRight
            size={16}
            className="transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

function BlogMeta({ post }: { post: BlogPostListItem }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-muted-foreground">
      {post.category?.name ? (
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]",
            blogCategoryTone(post.category.slug),
          )}
        >
          {post.category.name}
        </span>
      ) : null}
      {post.publishedAt ? (
        <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
      ) : null}
    </div>
  );
}
