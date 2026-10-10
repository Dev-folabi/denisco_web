import { apiClient, type ApiMeta } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";
import type { Category, Product, ProductListParams } from "./types";

/** Lists listed products, filtered and sorted as the shop requests. */
export async function getProducts(
  params: ProductListParams = {},
): Promise<{ data: Product[]; meta?: ApiMeta }> {
  return apiClient.getPage<Product[]>(API.products.list, {
    params: {
      category: params.category,
      search: params.search,
      featured: params.featured,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    },
  });
}

/** Retrieves one product by its URL slug. */
export async function getProductBySlug(slug: string): Promise<Product> {
  return apiClient.get<Product>(API.products.bySlug(slug));
}

/** Retrieves up to four other products in the same category. */
export async function getRelatedProducts(slug: string): Promise<Product[]> {
  return apiClient.get<Product[]>(API.products.related(slug));
}

/** Lists the active categories, in display order. */
export async function getCategories(): Promise<Category[]> {
  return apiClient.get<Category[]>(API.categories.list);
}
