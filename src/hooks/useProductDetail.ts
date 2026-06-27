"use client";

import { useCallback, useEffect, useState } from "react";
import { mapToProductDetail, type ProductDetailView } from "@/lib/api/mappers";
import { getProductDetails } from "@/lib/api/products";
import {
  clearCachedProductDetail,
  getCachedProductDetail,
  setCachedProductDetail,
} from "@/lib/product/productDetailCache";
import { useCatalogSync } from "@/hooks/useCatalogSync";
import { affectsProduct } from "@/lib/realtime/catalogSyncEvent";

export function useProductDetail(productId: number) {
  const [product, setProduct] = useState<ProductDetailView | null>(() =>
    getCachedProductDetail(productId),
  );
  const [loading, setLoading] = useState(
    () => !getCachedProductDetail(productId),
  );

  const reloadProduct = useCallback(
    (force = false) => {
      if (!productId) return;

      if (!force) {
        const cached = getCachedProductDetail(productId);
        if (cached) {
          setProduct(cached);
          setLoading(false);
          return;
        }
      } else {
        clearCachedProductDetail(productId);
      }

      setLoading(true);
      getProductDetails(productId)
        .then((data) => {
          if (!data) {
            setProduct(null);
            return;
          }
          const mapped = mapToProductDetail(data);
          setCachedProductDetail(productId, mapped);
          setProduct(mapped);
        })
        .catch(() => setProduct(null))
        .finally(() => setLoading(false));
    },
    [productId],
  );

  useEffect(() => {
    reloadProduct();
  }, [reloadProduct]);

  useCatalogSync(
    () => {
      reloadProduct(true);
    },
    (event) => {
      if (event.entity === "product") {
        return affectsProduct(event, productId);
      }
      return (
        event.entity === "category" ||
        event.entity === "sub_category" ||
        event.entity === "dashboard"
      );
    },
  );

  return { product, loading, reload: () => reloadProduct(true) };
}

export function useSiblingProducts(
  productId: number,
  siblingProductIds: number[],
) {
  const [siblingProducts, setSiblingProducts] = useState<ProductDetailView[]>(
    [],
  );

  useEffect(() => {
    const similarIds = siblingProductIds.filter((id) => id !== productId);
    if (similarIds.length === 0) {
      setSiblingProducts([]);
      return;
    }

    const loaded = similarIds
      .map((id) => getCachedProductDetail(id))
      .filter((item): item is ProductDetailView => item != null);

    setSiblingProducts(loaded);

    similarIds.forEach((id) => {
      if (getCachedProductDetail(id)) return;
      getProductDetails(id)
        .then((data) => {
          if (!data) return;
          const mapped = mapToProductDetail(data);
          setCachedProductDetail(id, mapped);
          setSiblingProducts((current) => {
            if (current.some((item) => item.id === mapped.id)) return current;
            return [...current, mapped];
          });
        })
        .catch(() => undefined);
    });
  }, [productId, siblingProductIds]);

  return siblingProducts;
}
