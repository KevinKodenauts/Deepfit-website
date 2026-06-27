"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Mic, Search, Star } from "lucide-react";
import FallbackImage from "@/components/FallbackImage";
import styles from "./search.module.css";
import { CurrencyAmount } from "@/components/CurrencySymbol";
import { buildProductsHref } from "@/lib/categoryNavigation";
import { imageSizes } from "@/constants/imageSizes";
import { useSearchPage } from "@/hooks/useSearchPage";

export default function SearchMobile() {
  const router = useRouter();
  const {
    inputRef,
    query,
    setQuery,
    trendingCategories,
    results,
    loading,
    loadingMore,
    error,
    hasSearched,
    hasMore,
    handleLoadMore,
    handleOpenProduct,
  } = useSearchPage();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>

        <div className={styles.searchField}>
          <Search size={18} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="search"
            className={styles.searchInput}
            placeholder='Search for atta, dal, coke and more'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
          <button type="button" className={styles.micBtn} aria-label="Voice search">
            <Mic size={18} />
          </button>
        </div>
      </header>

      <div className={styles.content}>
        {!hasSearched ? (
          trendingCategories.length > 0 && (
            <section className={styles.trendingSection}>
              <h2 className={styles.sectionTitle}>Trending in your city</h2>
              <div className={styles.trendingGrid}>
                {trendingCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={styles.trendingCard}
                    onClick={() =>
                      router.push(buildProductsHref(category.id))
                    }
                  >
                    <div className={styles.trendingImageWrap}>
                      <FallbackImage
                        src={category.mainCategoryImage}
                        alt={category.mainCategoryName}
                        fill
                        sizes={imageSizes.categoryIcon}
                        className={styles.trendingImage}
                      />
                    </div>
                    <span className={styles.trendingLabel}>
                      {category.mainCategoryName}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )
        ) : loading ? (
          <p className={styles.statusText}>Searching...</p>
        ) : error ? (
          <p className={styles.statusText}>{error}</p>
        ) : results.length === 0 ? (
          <div className={styles.emptyState}>
            <Search size={48} className={styles.emptyIcon} />
            <p className={styles.statusText}>No products found</p>
          </div>
        ) : (
          <div className={styles.resultsList}>
            {results.map((product) => (
              <button
                key={product.id}
                type="button"
                className={styles.resultCard}
                onClick={() => handleOpenProduct(product)}
              >
                <div className={styles.resultImageWrap}>
                  <FallbackImage
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes={imageSizes.categoryProduct}
                    className={styles.resultImage}
                  />
                </div>

                <div className={styles.resultBody}>
                  <h3 className={styles.resultTitle}>{product.title}</h3>

                  {product.rating > 0 && (
                    <div className={styles.ratingRow}>
                      {Array.from({
                        length: Math.min(5, Math.floor(product.rating)),
                      }).map((_, index) => (
                        <Star
                          key={index}
                          size={12}
                          fill="#ffc107"
                          color="#ffc107"
                        />
                      ))}
                      <span className={styles.reviewCount}>
                        ({product.reviewCount})
                      </span>
                    </div>
                  )}

                  <div className={styles.priceRow}>
                    <span className={styles.currentPrice}>
                      <CurrencyAmount>{product.price}</CurrencyAmount>
                    </span>
                    {product.originalPrice != null &&
                      product.originalPrice > product.price && (
                        <span className={styles.originalPrice}>
                          <CurrencyAmount>{product.originalPrice}</CurrencyAmount>
                        </span>
                      )}
                  </div>
                </div>
              </button>
            ))}

            {hasMore && (
              <button
                type="button"
                className={styles.loadMoreBtn}
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load more"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
