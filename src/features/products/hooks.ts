"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "./api";
import type { Category, Product, ProductListParams } from "./types";

/** Query keys, kept together so invalidation stays consistent. */
export const productKeys = {
  all: ["products"] as const,
  list: (params: ProductListParams) => ["products", "list", params] as const,
  detail: (slug: string) => ["products", "detail", slug] as const,
  related: (slug: string) => ["products", "related", slug] as const,
  categories: ["categories"] as const,
};

/**
 * Lists products for the shop and the home page.
 *
 * `initialData` is the server-rendered copy, which the catalogue pages pass
 * down so the first paint is real content. The query still refetches on mount,
 * because the server copy is up to sixty seconds old and stock figures move.
 */
export function useProducts(
  params: ProductListParams = {},
  initialData?: { data: Product[]; meta?: { total: number } },
) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => getProducts(params),
    initialData,
  });
}

/** Loads one product for the detail page. */
export function useProduct(slug: string, initialData?: Product) {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => getProductBySlug(slug),
    enabled: Boolean(slug),
    initialData,
  });
}

/** Loads the related products shown under a product. */
export function useRelatedProducts(slug: string, initialData?: Product[]) {
  return useQuery({
    queryKey: productKeys.related(slug),
    queryFn: () => getRelatedProducts(slug),
    enabled: Boolean(slug),
    initialData,
  });
}

/** Loads the shop's category filter chips. */
export function useCategories(initialData?: Category[]) {
  return useQuery({
    queryKey: productKeys.categories,
    queryFn: getCategories,
    // Categories are a small, slow-changing reference set.
    staleTime: 10 * 60 * 1000,
    initialData,
  });
}
