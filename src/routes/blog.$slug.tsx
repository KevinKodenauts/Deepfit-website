import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BlogDetailSkeleton } from "@/components/skeleton/PageSkeletons";
import {
  blogImageAlt,
  formatBlogDate,
  getBlogPostBySlug,
  getBlogPosts,
  type BlogPostDetail,
  type BlogPostListItem,
} from "@/lib/api/blog";
import { ApiError } from "@/lib/api/client";
import styles from "@/styles/blog.module.css";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Blog — DEEPFIT" },
      {
        name: "description",
        content: "Read this Deepfit journal note on everyday wellness.",
      },
      { property: "og:title", content: "Blog — DEEPFIT" },
    ],
  }),
  component: BlogPostPage,
});

function categoryTone(slug?: string | null) {
  if (slug === "fuel") return "bg-mint/50 text-foreground";
  if (slug === "move") return "bg-aqua/50 text-foreground";
  if (slug === "mind") return "bg-lavender/35 text-foreground";
  return "bg-muted text-muted-foreground";
}

function BlogPostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [related, setRelated] = useState<BlogPostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!post?.title) return;
    const base = post.metaTitle || post.title;
    document.title = /deepfit/i.test(base)
      ? base.replace(/\s*\|\s*/, " — ")
      : `${base} — DEEPFIT`;
  }, [post?.metaTitle, post?.title]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setNotFound(false);
      setError("");
      setPost(null);
      try {
        const [detail, list] = await Promise.all([
          getBlogPostBySlug(slug),
          getBlogPosts(),
        ]);
        if (cancelled) return;
        setPost(detail);
        setRelated(list.posts.filter((item) => item.slug !== slug));
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          setNotFound(true);
        } else {
          setError("Could not load this article right now.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <article className="relative overflow-hidden bg-soft pt-28 sm:pt-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full opacity-35 blur-3xl [background:radial-gradient(circle,var(--lavender),transparent_60%)]" />
      <div className="pointer-events-none absolute -left-32 top-40 h-[380px] w-[380px] rounded-full opacity-25 blur-3xl [background:radial-gradient(circle,var(--mint),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <Link
          to="/blog"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft size={16} />
          All articles
        </Link>

        {loading ? (
          <div className="mt-8">
            <BlogDetailSkeleton />
          </div>
        ) : notFound ? (
          <div className="mt-10 rounded-[2rem] bg-card px-6 py-16 text-center shadow-soft ring-1 ring-border/60">
            <h1 className="font-display text-3xl">Article not found</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              This journal note may have been moved or is no longer published.
            </p>
            <Link
              to="/blog"
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
            >
              Back to the journal
            </Link>
          </div>
        ) : error ? (
          <div className="mt-10 rounded-[2rem] bg-card px-6 py-16 text-center shadow-soft ring-1 ring-border/60">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : post ? (
          <>
            <header className="mt-8 grid items-end gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] lg:gap-16">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {post.category?.name ? (
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 tracking-[0.12em]",
                        categoryTone(post.category.slug),
                      )}
                    >
                      {post.category.name}
                    </span>
                  ) : null}
                  {post.publishedAt ? (
                    <span>{formatBlogDate(post.publishedAt)}</span>
                  ) : null}
                  {post.authorName ? <span>{post.authorName}</span> : null}
                </div>
                <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  {post.title}
                </h1>
              </div>
              {post.excerpt ? (
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:pb-1">
                  {post.excerpt}
                </p>
              ) : null}
            </header>

            {post.featuredImage ? (
              <div className="mt-10 overflow-hidden rounded-[1.75rem] bg-muted shadow-soft sm:rounded-[2rem]">
                <img
                  src={post.featuredImage}
                  alt={blogImageAlt(post)}
                  className="aspect-[16/9] w-full object-cover lg:aspect-[2.2/1]"
                />
              </div>
            ) : null}

            <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)] lg:items-start lg:gap-14">
              <div
                className={`${styles.article} rounded-[1.75rem] bg-card p-6 shadow-soft ring-1 ring-border/50 sm:p-10 lg:p-12`}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {related.length > 0 ? (
                <aside className="lg:sticky lg:top-28">
                  <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Keep reading
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {related.map((item) => (
                      <Link
                        key={item.id}
                        to="/blog/$slug"
                        params={{ slug: item.slug }}
                        className="group overflow-hidden rounded-[1.5rem] bg-card shadow-soft ring-1 ring-border/50 transition hover:-translate-y-0.5"
                      >
                        {item.featuredImage ? (
                          <div className="aspect-[16/10] overflow-hidden bg-muted">
                            <img
                              src={item.featuredImage}
                              alt={blogImageAlt(item)}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                            />
                          </div>
                        ) : null}
                        <div className="p-5">
                          <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            {item.category?.name ?? "Journal"}
                          </div>
                          <h2 className="mt-2 font-display text-xl leading-snug">
                            {item.title}
                          </h2>
                          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                            Read article
                            <ArrowUpRight
                              size={15}
                              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </aside>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}
