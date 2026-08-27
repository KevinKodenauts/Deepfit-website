import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { BlogGridSkeleton } from "@/components/skeleton/PageSkeletons";
import {
  formatBlogDate,
  getBlogPosts,
  blogImageAlt,
  type BlogPostListItem,
} from "@/lib/api/blog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — DEEPFIT" },
      {
        name: "description",
        content:
          "Read Deepfit journal notes on protein, consistency, mindset, and everyday wellness.",
      },
      { property: "og:title", content: "Blog — DEEPFIT" },
      {
        property: "og:description",
        content:
          "Mind. Move. Fuel. Practical wellness writing from Deepfit.",
      },
    ],
  }),
  component: BlogIndexPage,
});

function categoryTone(slug?: string | null) {
  if (slug === "fuel") return "bg-mint/50 text-foreground";
  if (slug === "move") return "bg-aqua/50 text-foreground";
  if (slug === "mind") return "bg-lavender/35 text-foreground";
  return "bg-muted text-muted-foreground";
}

function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getBlogPosts();
        if (!cancelled) setPosts(data.posts);
      } catch {
        if (!cancelled) setError("Could not load articles right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-soft pt-32">
        <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl [background:radial-gradient(circle,var(--mint),transparent_60%)]" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full opacity-30 blur-3xl [background:radial-gradient(circle,var(--lavender),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Journal
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl">
            Notes for living well,{" "}
            <span className="text-gradient italic">every day</span>.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Practical writing on protein, consistency, and mindset — the Deepfit
            way of building wellness that lasts.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {loading ? (
          <BlogGridSkeleton />
        ) : error ? (
          <div className="rounded-[2rem] bg-card px-6 py-16 text-center shadow-soft ring-1 ring-border/60">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-[2rem] bg-card px-6 py-16 text-center shadow-soft ring-1 ring-border/60">
            <h2 className="font-display text-2xl">No articles yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              New journal notes will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex flex-col overflow-hidden rounded-[2rem] bg-card shadow-soft ring-1 ring-border/50 transition hover:-translate-y-0.5 hover:shadow-glass"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage}
                      alt={blogImageAlt(post)}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="h-full w-full bg-soft" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
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
                  </div>
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
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
