import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { fetchProductSlugs } from "@/lib/api/server";

/**
 * The sitemap lists what a crawler should index: the public pages and every
 * listed product.
 *
 * Account, cart, checkout and payment routes are left out on purpose — they
 * are per-customer and behind authentication, and robots.ts disallows them.
 */

/** How often the sitemap itself is regenerated, in seconds. */
export const revalidate = 3600;

/** The static public routes, with how often each is worth recrawling. */
const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/shop", changeFrequency: "daily", priority: 0.9 },
  { path: "/consultation", changeFrequency: "weekly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/policy", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // An unreachable API yields no products rather than a failed build, so the
  // static half of the sitemap is still served.
  const products = await fetchProductSlugs();

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/shop/${product.slug}`,
    lastModified: new Date(product.updated_at),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
