"use client";

import { Suspense, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ResponsivePage, {
  createLazyDesktop,
} from "@/components/ResponsivePage";
import ProductPeekExperience from "@/components/product/ProductPeekExperience";
import { parseProductList } from "@/lib/productNavigation";
import styles from "./product.module.css";

const ProductDetailDesktop = createLazyDesktop(
  () => import("@/desktop-ui/product/ProductDetailDesktop"),
);

function ProductPageMobile() {
  const params = useParams();
  const searchParams = useSearchParams();
  const productId = Number(params.id);
  const listParam = searchParams.get("list");

  const productIds = useMemo(
    () => parseProductList(listParam, productId),
    [listParam, productId],
  );

  if (!productId) {
    return <p className={styles.loading}>Invalid product.</p>;
  }

  return (
    <ProductPeekExperience
      key={`${productId}-${listParam ?? "single"}`}
      initialId={productId}
      productIds={productIds}
    />
  );
}

export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<p className={styles.loading}>Loading...</p>}>
      <ResponsivePage
        mobile={<ProductPageMobile />}
        desktopLazy={ProductDetailDesktop}
      />
    </Suspense>
  );
}
