"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Clock, Search, User } from "lucide-react";
import FallbackImage from "@/components/FallbackImage";
import { formatBlogDate } from "@/lib/api/blog";
import { useBlogPage } from "@/hooks/useBlogPage";
import styles from "./blogDesktop.module.css";

export default function BlogDesktop() {
  const router = useRouter();
  const {
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
    reload,
  } = useBlogPage();

  return (
    <div className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>
            <BookOpen size={16} />
            Deepfit Journal
          </span>
          <h1 className={styles.heroTitle}>
            Wellness insights, training tips & nutrition guides
          </h1>
          <p className={styles.heroDesc}>
            Expert articles on fitness, supplements, recovery, and building
            healthier habits — curated for your Deepfit journey.
          </p>
          <div className={styles.heroSearch}>
            <Search size={18} className={styles.heroSearchIcon} />
            <input
              type="search"
              className={styles.heroSearchInput}
              placeholder="Search articles..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
      </section>

      <div className={styles.body}>
        {!loading && featured.length > 0 && (
          <section className={styles.featuredSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Featured stories</h2>
            </div>
            <div className={styles.featuredGrid}>
              {featured.slice(0, 3).map((post, index) => (
                <button
                  key={post.id}
                  type="button"
                  className={`${styles.featuredCard} ${
                    index === 0 ? styles.featuredCardHero : ""
                  }`}
                  onClick={() => router.push(`/blog/${post.slug}`)}
                >
                  <div className={styles.featuredImageWrap}>
                    <FallbackImage
                      src={post.featuredImage ?? "/images/whey-protein.png"}
                      alt={post.title}
                      fill
                      className={styles.featuredImage}
                    />
                    <div className={styles.featuredOverlay} />
                  </div>
                  <div className={styles.featuredBody}>
                    {post.category?.name && (
                      <span className={styles.categoryPill}>
                        {post.category.name}
                      </span>
                    )}
                    <h3 className={styles.featuredTitle}>{post.title}</h3>
                    {post.excerpt && (
                      <p className={styles.featuredExcerpt}>{post.excerpt}</p>
                    )}
                    <span className={styles.metaRow}>
                      <User size={14} />
                      {post.authorName ?? "Deepfit"}
                      <Clock size={14} />
                      {formatBlogDate(post.publishedAt)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <p className={styles.sidebarTitle}>Categories</p>
            <button
              type="button"
              className={`${styles.categoryBtn} ${
                selectedCategory === "" ? styles.categoryBtnActive : ""
              }`}
              onClick={() => setSelectedCategory("")}
            >
              All articles
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`${styles.categoryBtn} ${
                  selectedCategory === category.slug
                    ? styles.categoryBtnActive
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.slug)}
              >
                {category.name}
              </button>
            ))}
          </aside>

          <div className={styles.main}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {selectedCategory
                  ? categories.find((item) => item.slug === selectedCategory)
                      ?.name ?? "Articles"
                  : "Latest articles"}
              </h2>
              {!loading && (
                <span className={styles.resultCount}>
                  {posts.length} {posts.length === 1 ? "article" : "articles"}
                </span>
              )}
            </div>

            {loading ? (
              <div className={styles.loadingWrap}>
                <div className={styles.loadingSpinner} />
                <p className={styles.loadingText}>Loading articles...</p>
              </div>
            ) : error ? (
              <div className={styles.emptyState}>
                <BookOpen size={48} className={styles.emptyIcon} />
                <p className={styles.emptyText}>{error}</p>
                <button type="button" className={styles.retryBtn} onClick={() => void reload()}>
                  Try again
                </button>
              </div>
            ) : posts.length === 0 ? (
              <div className={styles.emptyState}>
                <BookOpen size={48} className={styles.emptyIcon} />
                <p className={styles.emptyText}>
                  No articles found. Try another category or search term.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.postGrid}>
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className={styles.postCard}
                    >
                      <div className={styles.postImageWrap}>
                        <FallbackImage
                          src={post.featuredImage ?? "/images/whey-protein.png"}
                          alt={post.title}
                          fill
                          className={styles.postImage}
                        />
                        {post.category?.name && (
                          <span className={styles.postCategory}>
                            {post.category.name}
                          </span>
                        )}
                      </div>
                      <div className={styles.postBody}>
                        <h3 className={styles.postTitle}>{post.title}</h3>
                        {post.excerpt && (
                          <p className={styles.postExcerpt}>{post.excerpt}</p>
                        )}
                        <div className={styles.postMeta}>
                          <span>{post.authorName ?? "Deepfit"}</span>
                          <span>{formatBlogDate(post.publishedAt)}</span>
                        </div>
                        <span className={styles.readMore}>
                          Read article
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <button
                      type="button"
                      className={styles.pageBtn}
                      disabled={page <= 1}
                      onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    >
                      Previous
                    </button>
                    <span className={styles.pageInfo}>
                      Page {page} of {totalPages}
                    </span>
                    <button
                      type="button"
                      className={styles.pageBtn}
                      disabled={page >= totalPages}
                      onClick={() =>
                        setPage((prev) => Math.min(totalPages, prev + 1))
                      }
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
