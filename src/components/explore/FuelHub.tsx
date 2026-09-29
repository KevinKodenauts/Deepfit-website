import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UtensilsCrossed,
} from "lucide-react";
import { getMainCategories } from "@/lib/api/categories";
import {
  getProductDetails,
  getProductsByCategory,
} from "@/lib/api/products";
import { resolveProductImage } from "@/lib/api/mappers";
import type { ApiProduct } from "@/lib/api/types";
import { productNameSlug } from "@/lib/catalog";
import { useCatalogSync } from "@/hooks/useCatalogSync";
import styles from "@/styles/fuel-hub.module.css";

type FuelProduct = {
  id: number;
  name: string;
  image: string;
  description: string;
  categoryLabel: string;
  hasCertificates: boolean;
  detailsLoaded?: boolean;
};

function stripHtml(value: string): string {
  let text = value;
  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<\/p>/gi, "\n");
  text = text.replace(/<li[^>]*>/gi, "• ");
  text = text.replace(/<\/li>/gi, "\n");
  text = text.replace(/<[^>]*>/g, "");
  text = text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"');
  return text.replace(/\n{3,}/g, "\n\n").trim();
}

function longDescription(product: ApiProduct): string {
  const full = stripHtml((product.productDescription ?? "").trim());
  if (full) return full;
  return stripHtml((product.productShortDescription ?? "").trim());
}

function hasCertificates(product: ApiProduct): boolean {
  const list = (product.certificates ?? []).filter(
    (item) => (item.url ?? item.file ?? "").trim(),
  );
  if (list.length > 0) return true;
  return Boolean((product.certificate ?? "").trim());
}

function mapFuelProduct(product: ApiProduct): FuelProduct {
  return {
    id: product.id,
    name: product.productName,
    image: resolveProductImage(product),
    description: longDescription(product),
    categoryLabel:
      product.mainCategoryDetails?.mainCategoryName?.trim() || "Fuel Hub",
    hasCertificates: hasCertificates(product),
  };
}

function findFuelHubCategoryId(
  categories: Awaited<ReturnType<typeof getMainCategories>>,
): number | null {
  const exact = categories.find(
    (category) =>
      category.mainCategoryName.toLowerCase().trim() === "fuel hub",
  );
  if (exact) return exact.id;

  const fuzzy = categories.find((category) =>
    category.mainCategoryName.toLowerCase().includes("fuel"),
  );
  return fuzzy?.id ?? null;
}

export function FuelHub() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<FuelProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const productsRef = useRef<FuelProduct[]>([]);
  productsRef.current = products;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const categories = await getMainCategories();
      const fuelHubId = findFuelHubCategoryId(categories);

      if (fuelHubId == null) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const result = await getProductsByCategory(fuelHubId, fuelHubId, {
        limit: 100,
        offset: 0,
      });

      setProducts(result.products.map(mapFuelProduct));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load Fuel Hub products.",
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load, reloadToken]);

  useCatalogSync(
    () => setReloadToken((value) => value + 1),
    (event) =>
      event.entity === "product" ||
      event.entity === "category" ||
      event.entity === "sub_category" ||
      event.entity === "dashboard",
  );

  const selected = products.find((item) => item.id === selectedId) ?? null;

  useEffect(() => {
    if (selectedId == null) return;

    const current = productsRef.current.find((item) => item.id === selectedId);
    if (!current || current.detailsLoaded) return;

    const needsDescription = !current.description.trim();
    const needsCertificates = !current.hasCertificates;
    if (!needsDescription && !needsCertificates) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === selectedId ? { ...item, detailsLoaded: true } : item,
        ),
      );
      return;
    }

    let cancelled = false;
    setDetailLoading(true);

    getProductDetails(selectedId)
      .then((details) => {
        if (cancelled || !details) return;
        const mapped = mapFuelProduct(details);
        setProducts((prev) =>
          prev.map((item) =>
            item.id === mapped.id
              ? { ...item, ...mapped, detailsLoaded: true }
              : item,
          ),
        );
      })
      .catch(() => {
        if (cancelled) return;
        setProducts((prev) =>
          prev.map((item) =>
            item.id === selectedId ? { ...item, detailsLoaded: true } : item,
          ),
        );
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  const openCertificates = (product: FuelProduct) => {
    const slug = productNameSlug(product.name);
    if (!slug) return;
    void navigate({
      to: "/lab-test-report/$productName",
      params: { productName: slug },
      search: { productId: product.id, from: "explore" },
    });
  };

  if (selected) {
    return (
      <div className={styles.container}>
        <div className={styles.detail}>
          <button
            type="button"
            className={styles.detailBack}
            onClick={() => setSelectedId(null)}
          >
            <ChevronLeft size={18} />
            Back to Fuel Hub
          </button>

          <div className={styles.detailImageWrap}>
            {selected.image ? (
              <img
                src={selected.image}
                alt={selected.name}
                className={styles.detailImage}
              />
            ) : (
              <div className={styles.cardImagePlaceholder}>
                <UtensilsCrossed size={48} />
              </div>
            )}
          </div>

          <h2 className={styles.detailTitle}>{selected.name}</h2>

          {detailLoading ? (
            <div className={styles.skeletonLines}>
              <div className={`${styles.skeletonLine} ${styles.skeletonLineLong}`} />
              <div className={`${styles.skeletonLine} ${styles.skeletonLineLong}`} />
              <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
            </div>
          ) : (
            <p
              className={`${styles.detailDescription} ${
                selected.description ? "" : styles.detailDescriptionMuted
              }`}
            >
              {selected.description ||
                "No description available for this product yet."}
            </p>
          )}

          <a
            href={`/lab-test-report/${productNameSlug(selected.name)}?productId=${selected.id}&from=explore`}
            className={styles.certificateBtn}
            aria-label="View lab test reports"
            onClick={(event) => {
              if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.altKey ||
                event.ctrlKey ||
                event.shiftKey
              ) {
                return;
              }
              event.preventDefault();
              openCertificates(selected);
            }}
          >
            <span className={styles.certificateIcon}>
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <span className={styles.certificateCopy}>
              <span className={styles.certificateLabel}>Certificate</span>
              <span className={styles.certificateHint}>
                View lab test reports
              </span>
            </span>
            <ChevronRight
              size={22}
              className={styles.certificateChevron}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.skeletonCard}>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonLines}>
                <div
                  className={`${styles.skeletonLine} ${styles.skeletonLineShort}`}
                />
                <div
                  className={`${styles.skeletonLine} ${styles.skeletonLineLong}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.status}>
          <div className={styles.statusIcon}>
            <UtensilsCrossed size={28} />
          </div>
          <h2 className={styles.statusTitle}>Something went wrong</h2>
          <p className={styles.statusText}>{error}</p>
          <button
            type="button"
            className={styles.retryBtn}
            onClick={() => setReloadToken((value) => value + 1)}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.status}>
          <div className={styles.statusIcon}>
            <UtensilsCrossed size={28} />
          </div>
          <h2 className={styles.statusTitle}>No products yet</h2>
          <p className={styles.statusText}>
            Add products to the Fuel Hub category to show them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            className={styles.card}
            onClick={() => setSelectedId(product.id)}
          >
            <div className={styles.cardImageWrap}>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.cardImage}
                  loading="lazy"
                />
              ) : (
                <div className={styles.cardImagePlaceholder}>
                  <UtensilsCrossed size={36} />
                </div>
              )}
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardBadge}>{product.categoryLabel}</span>
              <h3 className={styles.cardTitle}>{product.name}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
