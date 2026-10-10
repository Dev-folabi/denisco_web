import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchProductBySlug,
  fetchRelatedProducts,
} from "@/lib/api/server";
import { pageMetadata } from "@/lib/seo";
import { MoneyFromKobo } from "@/lib/utils/format";
import { ProductDetail } from "./product-detail";

// Regenerated every minute, so a price or description change reaches search
// results and shared links without a deploy.
// Next reads this at build time, so it has to be a literal: it is the same
// sixty seconds as CATALOGUE_REVALIDATE_SECONDS in lib/api/server.ts.
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Title, description and share card are built from the product itself, which
 * is the point of rendering this page on the server: a link to a product has
 * to show that product, not the site's default blurb.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  // notFound() here rather than in the page body on purpose: metadata is
  // resolved before the response starts streaming, and a status code cannot
  // change once it has. Raising it in the page would still render the
  // not-found UI, but as a soft 404 — a 200 that tells a crawler the removed
  // product is still a page.
  if (!product) {
    notFound();
  }

  const description = `${product.name} — ${MoneyFromKobo(product.price)} per ${
    product.unit
  }. ${product.description}`.slice(0, 300);

  return pageMetadata({
    title: product.name,
    description,
    path: `/shop/${product.slug}`,
    image: product.images[0],
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await fetchProductBySlug(slug);
  if (!product) {
    // A slug that is not in the catalogue is a 404, not an empty product page:
    // the status code is what stops a removed product lingering in an index.
    notFound();
  }

  const related = await fetchRelatedProducts(slug);

  return (
    <ProductDetail
      slug={slug}
      initialProduct={product}
      initialRelated={related}
    />
  );
}
