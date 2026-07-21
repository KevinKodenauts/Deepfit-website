import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/api/blog";
import { POLICY_SLUGS } from "@/lib/api/policy";
import { getAllProducts } from "@/lib/api/products";
import { SITE_URL, SITEMAP_PATHS } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = SITEMAP_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "/home" ? "daily" : "weekly",
    priority: path === "/home" ? 1 : 0.7,
  }));

  const [products, blogPosts] = await Promise.all([
    getAllProducts().catch(() => []),
    getBlogPosts({ limit: 100 }).catch(() => ({ posts: [] })),
  ]);

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
  }));

  const policyEntries: MetadataRoute.Sitemap = POLICY_SLUGS.map((slug) => ({
    url: `${SITE_URL}/policies/${slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...productEntries,
    ...blogEntries,
    ...policyEntries,
  ];
}
