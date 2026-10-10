import type { Metadata } from "next";
import { ShopContent } from "./shop-content";
import {
  fetchCategories,
  fetchProducts,
} from "@/lib/api/server";
import { pageMetadata } from "@/lib/seo";

// Regenerated every minute: the grid is in the HTML for crawlers, and the
// client query refreshes stock when the page is opened.
// Next reads this at build time, so it has to be a literal: it is the same
// sixty seconds as CATALOGUE_REVALIDATE_SECONDS in lib/api/server.ts.
export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Farm Products Shop",
  description:
    "Order quality poultry, livestock, piggery, snail and crop produce directly from the DENISCO farm, with delivery in Abuja or pickup at the farm.",
  path: "/shop",
});

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const sp = await searchParams;
  const search = sp.search ?? "";
  const category = sp.category ?? "";

  // The same filters the client component starts with, so the server render
  // and the first client render agree.
  const [products, categories] = await Promise.all([
    fetchProducts({
      category: category || undefined,
      search: search || undefined,
      sort: "featured",
      limit: 100,
    }),
    fetchCategories(),
  ]);

  return (
    <ShopContent
      initialSearch={search}
      initialCategory={category}
      initialProducts={products ?? undefined}
      initialCategories={categories}
    />
  );
}
