"use client";

import { useRouter } from "next/navigation";
import { Mic, Search } from "lucide-react";
import FallbackImage from "@/components/FallbackImage";
import ProductCard from "@/components/product/ProductCard";
import { imageSizes } from "@/constants/imageSizes";
import { buildProductsHref } from "@/lib/categoryNavigation";
import { useSearchPage } from "@/hooks/useSearchPage";
import styles from "./searchDesktop.module.css";

export default function SearchDesktop() {
  const router = useRouter();
  const {
    inputRef,
    query,
    setQuery,
    trendingCategories,
    results,
    totalCount,
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
    <div className={styles.shell}>
      <section className={styles.searchHero}>
        <div className={styles.searchHeroInner}>
          <h1 className={styles.pageTitle}>Search products</h1>
          <p className={styles.pageSubtitle}>
            Find supplements, gym gear, wellness essentials and more
          </p>
          <div className={styles.searchBar}>
            <Search size={20} className={styles.searchBarIcon} />
            <input
              ref={inputRef}
              type="search"
              className={styles.searchBarInput}
              placeholder='Search "protein, dumbbells, vitamins..."'
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
      </section>

      <div className={styles.body}>
        {!hasSearched ? (
          trendingCategories.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Trending categories</h2>
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
          <div className={styles.stateWrap}>
            <div className={styles.spinner} />
            <p className={styles.stateText}>Searching products...</p>
          </div>
        ) : error ? (
          <div className={styles.stateWrap}>
            <p className={styles.stateText}>{error}</p>
          </div>
        ) : results.length === 0 ? (
          <div className={styles.stateWrap}>
            <Search size={52} className={styles.emptyIcon} />
            <p className={styles.stateTitle}>No products found</p>
            <p className={styles.stateText}>
              Try a different keyword or browse categories
            </p>
          </div>
        ) : (
          <section className={styles.section}>
            <div className={styles.resultsHeader}>
              <h2 className={styles.sectionTitle}>
                Results for &quot;{query.trim()}&quot;
              </h2>
              <span className={styles.resultCount}>
                {totalCount} {totalCount === 1 ? "product" : "products"}
              </span>
            </div>

            <div className={styles.productGrid}>
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
            </div>

            {hasMore && (
              <div className={styles.loadMoreWrap}>
                <button
                  type="button"
                  className={styles.loadMoreBtn}
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading..." : "Load more products"}
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
