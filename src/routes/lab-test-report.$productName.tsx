import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getProductByNameSlug } from "@/lib/api/products";
import { mapToProductDetail, type ProductDetailView } from "@/lib/api/mappers";

export const Route = createFileRoute("/lab-test-report/$productName")({
  head: ({ params }) => {
    const label = params.productName.replace(/-/g, " ");
    return {
      meta: [
        { title: `Lab test reports — ${label} — DEEPFIT` },
        {
          name: "description",
          content: `Official lab test reports for ${label}.`,
        },
      ],
    };
  },
  component: LabTestReportPage,
});

function LabTestReportPage() {
  const { productName } = Route.useParams();
  const [product, setProduct] = useState<ProductDetailView | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProductByNameSlug(productName)
      .then((details) => {
        if (cancelled) return;
        setProduct(details ? mapToProductDetail(details) : null);
      })
      .catch(() => {
        if (!cancelled) setProduct(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [productName]);

  useEffect(() => {
    if (!product?.title) return;
    document.title = `Lab test reports — ${product.title} — DEEPFIT`;
  }, [product?.title]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-32 lg:px-10">
        {product ? (
          <Link
            to="/product/$slug"
            params={{ slug: String(product.id) }}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to product
          </Link>
        ) : (
          <Link
            to="/shop"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to shop
          </Link>
        )}

        <div className="mt-8 flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1A637B] text-white">
            <ShieldCheck size={22} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Lab test reports
            </p>
            <h1 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
              {product?.title || "Product certificates"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Open a report to view the official PDF in a new tab.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="mt-10 space-y-3">
            <div className="h-20 animate-pulse rounded-2xl bg-muted" />
            <div className="h-20 animate-pulse rounded-2xl bg-muted" />
          </div>
        ) : !product ? (
          <p className="mt-10 text-sm text-muted-foreground">
            Product not found.
          </p>
        ) : product.certificates.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">
            No lab test reports are available for this product yet.
          </p>
        ) : (
          <ul className="mt-10 space-y-3">
            {product.certificates.map((cert) => (
              <li key={`${cert.id}-${cert.name}`}>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-[#1A637B]/20 bg-[#E8F3F6]/70 px-4 py-4 shadow-[0_8px_24px_-12px_rgba(26,99,123,0.3)] transition duration-200 hover:border-[#1A637B]/40 hover:bg-[#E8F3F6] hover:shadow-[0_12px_28px_-10px_rgba(26,99,123,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A637B] focus-visible:ring-offset-2"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1A637B] shadow-sm">
                    <FileText size={18} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[#1A637B]">
                      {cert.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      PDF · Opens in a new tab
                    </span>
                  </span>
                  <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[#1A637B] transition group-hover:bg-[#1A637B] group-hover:text-white">
                    <ExternalLink size={16} aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Footer />
    </div>
  );
}
