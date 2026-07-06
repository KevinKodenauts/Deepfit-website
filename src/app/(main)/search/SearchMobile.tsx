"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Mic, Search } from "lucide-react";
import FallbackImage from "@/components/FallbackImage";
import ProductCard from "@/components/product/ProductCard";
import styles from "./search.module.css";
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
    isListening,
    isSupported,
    voiceError,
    toggleListening,
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

        <div className={styles.headerSearchWrap}>
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
            <button
              type="button"
              className={`${styles.micBtn} ${isListening ? styles.micBtnActive : ""}`}
              onClick={toggleListening}
              disabled={!isSupported}
              aria-label={isListening ? "Stop voice search" : "Voice search"}
              aria-pressed={isListening}
            >
              <Mic size={18} />
            </button>
          </div>
          {isListening ? (
            <p className={styles.voiceStatus} role="status">
              Listening… speak now
            </p>
          ) : null}
          {voiceError ? (
            <p className={styles.voiceError} role="alert">
              {voiceError}
            </p>
          ) : null}
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
          <div className={styles.resultsGrid}>
            {results.map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                rating={product.rating || 5}
                onOpen={() => handleOpenProduct(product)}
              />
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
