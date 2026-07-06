"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { mapToHomeProduct, type HomeProductView } from "@/lib/api/mappers";
import { buildProductHref } from "@/lib/productNavigation";
import DesktopHero from "./DesktopHero";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import {
  DesktopCategoryChips,
  DesktopFeaturedCategories,
  DesktopFooter,
  DesktopLoading,
  DesktopMarquee,
  DesktopProductGrid,
} from "./DesktopHomeSections";
import { useHomeDashboard } from "./useHomeDashboard";
import styles from "./homeDesktop.module.css";

export default function HomeDesktop() {
  const router = useRouter();
  const {
    isLoading,
    dashboard,
    mainCategories,
    selectedCategoryIndex,
    handleCategorySelect,
  } = useHomeDashboard();

  const openProduct = useCallback(
    (productId: number, products: HomeProductView[]) => {
      const ids = [...new Set(products.map((item) => item.id))];
      router.push(buildProductHref(productId, ids));
    },
    [router]
  );

  return (
    <div className={styles.shell}>
      <DesktopHero sliders={dashboard?.sliderList ?? []} />
      <DesktopMarquee />

      <div className={styles.chipsSection}>
        <DesktopCategoryChips
          categories={mainCategories}
          isLoading={isLoading}
          selectedIndex={selectedCategoryIndex}
          onSelect={handleCategorySelect}
        />
      </div>

      {isLoading && !dashboard ? (
        <DesktopLoading />
      ) : (
        <>
          <DesktopFeaturedCategories categories={mainCategories} />

          <DesktopProductGrid
            eyebrow="Trending"
            title="Trending Products"
            subtitle="Popular picks for quality, style, and everyday use."
            variant="showcase"
            categories={mainCategories}
            products={(dashboard?.topSellingProductList ?? []).map(
              mapToHomeProduct
            )}
            onOpen={openProduct}
          />

          <DesktopProductGrid
            eyebrow="Best Sellers"
            title="Best Sellers"
            products={(dashboard?.topRatedProductList ?? []).map(
              mapToHomeProduct
            )}
            onOpen={openProduct}
            alt
          />

          <DesktopProductGrid
            eyebrow="New"
            title="New Arrivals"
            products={(dashboard?.featuredProductList ?? []).map(
              mapToHomeProduct
            )}
            onOpen={openProduct}
          />

          <TestimonialsSection />
        </>
      )}

      <DesktopFooter />
    </div>
  );
}
