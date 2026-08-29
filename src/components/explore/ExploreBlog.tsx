import { useEffect, useState } from "react";
import { BlogCard } from "@/components/site/BlogCard";
import { BlogGridSkeleton } from "@/components/skeleton/PageSkeletons";
import { getBlogPosts, type BlogPostListItem } from "@/lib/api/blog";

export function ExploreBlog() {
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
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Journal
        </div>
        <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
          Notes for living well.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Practical writing on protein, consistency, and mindset — the Deepfit
          way of building wellness that lasts.
        </p>
      </div>

      <div className="mt-8">
        {loading ? (
          <BlogGridSkeleton />
        ) : error ? (
          <div className="rounded-[2rem] bg-card px-6 py-16 text-center shadow-soft ring-1 ring-border/60">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-[2rem] bg-card px-6 py-16 text-center shadow-soft ring-1 ring-border/60">
            <h3 className="font-display text-2xl">No articles yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              New journal notes will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
