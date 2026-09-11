import { getBlogPosts } from "@/lib/api/blog";
import { getAllProducts } from "@/lib/api/products";
import { POLICY_SLUGS } from "@/lib/api/policy";
import { SITE_URL } from "@/lib/site";

type SitemapEntry = {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
};

const STATIC_PAGES: SitemapEntry[] = [
  { path: "/", changefreq: "daily", priority: 1 },
  { path: "/shop", changefreq: "daily", priority: 0.9 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
  { path: "/contact", changefreq: "monthly", priority: 0.6 },
  { path: "/blog", changefreq: "weekly", priority: 0.8 },
  { path: "/explore", changefreq: "weekly", priority: 0.7 },
  { path: "/exercise", changefreq: "weekly", priority: 0.6 },
  ...POLICY_SLUGS.map((slug) => ({
    path: `/policies/${slug}`,
    changefreq: "yearly" as const,
    priority: 0.3,
  })),
];

function readEnv(name: string): string | undefined {
  if (typeof import.meta !== "undefined" && import.meta.env?.[name]) {
    return String(import.meta.env[name]);
  }
  if (typeof process !== "undefined" && process.env?.[name]) {
    return process.env[name];
  }
  return undefined;
}

export function getCanonicalSiteUrl() {
  return (
    readEnv("VITE_SITE_URL") ??
    readEnv("NEXT_PUBLIC_SITE_URL") ??
    SITE_URL
  ).replace(/\/$/, "");
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toLoc(origin: string, path: string) {
  if (path === "/") return `${origin}/`;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

function urlXml(origin: string, entry: SitemapEntry, lastmod: string) {
  const changefreq = entry.changefreq
    ? `\n    <changefreq>${entry.changefreq}</changefreq>`
    : "";
  const priority =
    entry.priority != null
      ? `\n    <priority>${entry.priority.toFixed(1)}</priority>`
      : "";

  return `  <url>
    <loc>${escapeXml(toLoc(origin, entry.path))}</loc>
    <lastmod>${lastmod}</lastmod>${changefreq}${priority}
  </url>`;
}

async function productPaths(): Promise<string[]> {
  try {
    const products = await getAllProducts();
    const slugs = new Set<string>();
    for (const product of products) {
      if (!product.id) continue;
      slugs.add(`/product/${product.id}`);
    }
    return [...slugs];
  } catch {
    return [];
  }
}

async function blogPaths(): Promise<string[]> {
  try {
    const slugs = new Set<string>();
    let page = 1;
    const limit = 100;

    while (page <= 20) {
      const { posts, pagination } = await getBlogPosts({ page, limit });
      for (const post of posts) {
        if (post.slug) slugs.add(`/blog/${post.slug}`);
      }
      const total = pagination?.total ?? slugs.size;
      if (posts.length === 0 || slugs.size >= total) break;
      page += 1;
    }

    return [...slugs];
  } catch {
    return [];
  }
}

export async function buildSitemapXml() {
  const origin = getCanonicalSiteUrl();
  const lastmod = new Date().toISOString().slice(0, 10);
  const [products, blogs] = await Promise.all([productPaths(), blogPaths()]);

  const entries: SitemapEntry[] = [
    ...STATIC_PAGES,
    ...products.map((path) => ({
      path,
      changefreq: "weekly" as const,
      priority: 0.8,
    })),
    ...blogs.map((path) => ({
      path,
      changefreq: "weekly" as const,
      priority: 0.7,
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((entry) => urlXml(origin, entry, lastmod)).join("\n")}
</urlset>
`;
}
