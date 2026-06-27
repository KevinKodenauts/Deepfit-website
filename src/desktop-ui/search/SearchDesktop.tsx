"use client";

import { useRouter } from "next/navigation";
import { Clock, Mic, Search, Star } from "lucide-react";
import FallbackImage from "@/components/FallbackImage";
import { CurrencyAmount } from "@/components/CurrencySymbol";
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
              className={styles.micBtn}
              aria-label="Voice search"
            >
              <Mic size={18} />
            </button>
          </div>
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
                <button
                  key={product.id}
                  type="button"
                  className={styles.productCard}
                  onClick={() => handleOpenProduct(product)}
                >
                  <div className={styles.imageSection}>
                    {product.badge && (
                      <span
                        className={`${styles.badge} ${
                          product.badgeType === "red"
                            ? styles.badgeRed
                            : styles.badgePurple
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                    <div className={styles.imageWrap}>
                      <FallbackImage
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes={imageSizes.categoryProduct}
                        className={styles.productImage}
                      />
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <span className={styles.brandLabel}>{product.brand}</span>
                    <h3 className={styles.productTitle}>{product.title}</h3>

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

                    {product.deliveryTime && (
                      <div className={styles.deliveryRow}>
                        <Clock size={12} className={styles.deliveryIcon} />
                        <span className={styles.deliveryText}>
                          {product.deliveryTime}
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
                            <CurrencyAmount>
                              {product.originalPrice}
                            </CurrencyAmount>
                          </span>
                        )}
                    </div>
                  </div>
                </button>
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
