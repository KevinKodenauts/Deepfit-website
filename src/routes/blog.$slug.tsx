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
    <article className={styles.page}>
      <div className={`${styles.blob} ${styles.blobLavender}`} />
      <div className={`${styles.blob} ${styles.blobMint}`} />

      <div className={styles.shell}>
        <Link to="/explore?hub=blog" className={styles.backLink}>
          <ArrowLeft size={16} />
          All articles
        </Link>

        {loading ? (
          <div className="mt-8">
            <BlogDetailSkeleton />
          </div>
        ) : notFound ? (
          <div className={styles.state}>
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
          <div className={styles.state}>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : post ? (
          <>
            <header className={styles.hero}>
              <div className={styles.meta}>
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
              <h1 className={styles.title}>{post.title}</h1>
              {post.excerpt ? (
                <p className={styles.excerpt}>{post.excerpt}</p>
              ) : null}
            </header>

            {post.featuredImage ? (
              <div className={styles.cover}>
                <img
                  src={post.featuredImage}
                  alt={blogImageAlt(post)}
                />
              </div>
            ) : null}

            <div className={styles.layout}>
              <div
                className={styles.article}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {related.length > 0 ? (
                <aside className={styles.sidebar}>
                  <div className={styles.sidebarLabel}>Keep reading</div>
                  <div className={styles.relatedList}>
                    {related.map((item) => (
                      <Link
                        key={item.id}
                        to="/blog/$slug"
                        params={{ slug: item.slug }}
                        className={styles.relatedCard}
                      >
                        {item.featuredImage ? (
                          <div className={styles.relatedImage}>
                            <img
                              src={item.featuredImage}
                              alt={blogImageAlt(item)}
                            />
                          </div>
                        ) : null}
                        <div className={styles.relatedBody}>
                          <div className={styles.relatedCategory}>
                            {item.category?.name ?? "Journal"}
                          </div>
                          <h2 className={styles.relatedTitle}>{item.title}</h2>
                          <span className={styles.relatedCta}>
                            Read article
                            <ArrowUpRight size={15} />
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
