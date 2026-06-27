"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Tag, User } from "lucide-react";
import FallbackImage from "@/components/FallbackImage";
import { formatBlogDate } from "@/lib/api/blog";
import { useBlogDetail } from "@/hooks/useBlogDetail";
import styles from "./blogDesktop.module.css";

export default function BlogDetailDesktop() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const { post, related, loading, error, reload } = useBlogDetail(slug);

  if (loading) {
    return (
      <div className={styles.detailShell}>
        <div className={styles.loadingWrap}>
          <div className={styles.loadingSpinner} />
          <p className={styles.loadingText}>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.detailShell}>
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>{error || "Article not found."}</p>
          <div className={styles.emptyActions}>
            <Link href="/blog" className={styles.retryBtn}>
              Back to blog
            </Link>
            <button type="button" className={styles.retryBtnSecondary} onClick={() => void reload()}>
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <article className={styles.detailShell}>
      <div className={styles.detailTopBar}>
        <Link href="/blog" className={styles.backLink}>
          <ArrowLeft size={18} />
          Back to blog
        </Link>
      </div>

      <header className={styles.detailHero}>
        {post.featuredImage && (
          <div className={styles.detailHeroImage}>
            <FallbackImage
              src={post.featuredImage}
              alt={post.title}
              fill
              priority
              className={styles.detailImage}
            />
            <div className={styles.detailHeroOverlay} />
          </div>
        )}

        <div className={styles.detailHeroContent}>
          {post.category?.name && (
            <span className={styles.categoryPill}>{post.category.name}</span>
          )}
          <h1 className={styles.detailTitle}>{post.title}</h1>
          {post.excerpt && (
            <p className={styles.detailExcerpt}>{post.excerpt}</p>
          )}
          <div className={styles.detailMeta}>
            <span className={styles.metaItem}>
              <User size={16} />
              {post.authorName ?? "Deepfit"}
            </span>
            <span className={styles.metaItem}>
              <Clock size={16} />
              {formatBlogDate(post.publishedAt)}
            </span>
          </div>
          {tags.length > 0 && (
            <div className={styles.tagRow}>
              <Tag size={14} />
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className={styles.detailBody}>
        <div
          className={styles.articleContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.sectionTitle}>Related articles</h2>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/blog/${item.slug}`}
                className={styles.relatedCard}
              >
                <div className={styles.relatedImageWrap}>
                  <FallbackImage
                    src={item.featuredImage ?? "/images/whey-protein.png"}
                    alt={item.title}
                    fill
                    className={styles.relatedImage}
                  />
                </div>
                <div className={styles.relatedBody}>
                  <h3 className={styles.relatedTitle}>{item.title}</h3>
                  <span className={styles.relatedDate}>
                    {formatBlogDate(item.publishedAt)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
