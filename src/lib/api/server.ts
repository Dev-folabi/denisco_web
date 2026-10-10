import { API } from "@/lib/api/endpoints";
import type {
  Category,
  Product,
  ProductListParams,
} from "@/features/products/types";

/**
 * Server-side reads of the public catalogue.
 *
 * The shop, the home page's featured grid and the product pages are rendered
 * on the server so a crawler — and the first paint — sees real products rather
 * than a skeleton. The same data is handed to the client components as
 * TanStack Query's initial data, which then refetches on mount: the server
 * copy is good for SEO, and the client copy keeps stock figures live.
 *
 * Nothing here throws. A catalogue read that fails during a build or an ISR
 * revalidation returns null, the page renders without it, and the client query
 * fills the gap — which is better than a deploy failing because the API was
 * briefly unreachable.
 */

/** Origin of the API. Paths in `API` already carry the `/api/v1` prefix. */
const API_ORIGIN = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * How long a server-rendered catalogue page stays cached. Sixty seconds is the
 * plan's figure: long enough to absorb a crawl, short enough that a price
 * change is visible quickly. Live stock does not depend on it, because the
 * client refetches on mount.
 */
export const CATALOGUE_REVALIDATE_SECONDS = 60;

/** The response envelope every endpoint returns. */
interface Envelope<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

/** Builds a URL with the non-empty query parameters only. */
function url(path: string, params: Record<string, unknown> = {}): string {
  const target = new URL(path, API_ORIGIN);

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    target.searchParams.set(key, String(value));
  }

  return target.toString();
}

/**
 * The outcome of a server-side read. `missing` is a 404 from the API, which is
 * a real answer; `failed` is anything else, which is not.
 */
type Read<T> =
  | { outcome: "ok"; envelope: Envelope<T> }
  | { outcome: "missing" }
  | { outcome: "failed" };

/** Fetches and unwraps an envelope, reporting how the read went. */
async function read<T>(
  target: string,
  revalidate: number | false = CATALOGUE_REVALIDATE_SECONDS,
): Promise<Read<T>> {
  try {
    const response = await fetch(target, {
      headers: { Accept: "application/json" },
      next: revalidate === false ? { revalidate: 0 } : { revalidate },
    });

    if (response.status === 404) return { outcome: "missing" };
    if (!response.ok) return { outcome: "failed" };

    const envelope = (await response.json()) as Envelope<T>;
    if (!envelope?.success) return { outcome: "failed" };

    return { outcome: "ok", envelope };
  } catch {
    // The API is unreachable.
    return { outcome: "failed" };
  }
}

/** Lists products for the shop and the home page's featured grid. */
export async function fetchProducts(
  params: ProductListParams = {},
): Promise<{ data: Product[]; meta?: Envelope<Product[]>["meta"] } | null> {
  const result = await read<Product[]>(
    url(API.products.list, {
      category: params.category,
      search: params.search,
      featured: params.featured,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    }),
  );

  if (result.outcome !== "ok") return null;

  return { data: result.envelope.data ?? [], meta: result.envelope.meta };
}

/**
 * Retrieves one product by its URL slug. It returns null only when the API
 * says the slug does not exist, and throws when the read failed for any other
 * reason — so a page renders a 404 for a removed product and a 500 for an
 * unreachable API, rather than telling a crawler a product is gone because of
 * a blip.
 */
export async function fetchProductBySlug(
  slug: string,
): Promise<Product | null> {
  const result = await read<Product>(url(API.products.bySlug(slug)));

  switch (result.outcome) {
    case "ok":
      return result.envelope.data ?? null;
    case "missing":
      return null;
    default:
      throw new Error(`could not read the product "${slug}" from the API`);
  }
}

/** Retrieves the products shown under a product as related. */
export async function fetchRelatedProducts(slug: string): Promise<Product[]> {
  const result = await read<Product[]>(url(API.products.related(slug)));
  return result.outcome === "ok" ? (result.envelope.data ?? []) : [];
}

/** Lists the active categories, in display order. */
export async function fetchCategories(): Promise<Category[]> {
  const result = await read<Category[]>(url(API.categories.list));
  return result.outcome === "ok" ? (result.envelope.data ?? []) : [];
}

/**
 * Lists every listed product's slug, for the sitemap. The limit is the API's
 * maximum page size; the catalogue is a farm's product list, not a marketplace,
 * so one page covers it.
 */
export async function fetchProductSlugs(): Promise<
  Array<{ slug: string; updated_at: string }>
> {
  const result = await read<Product[]>(url(API.products.list, { limit: 100 }));
  const products = result.outcome === "ok" ? (result.envelope.data ?? []) : [];

  return products.map((product) => ({
    slug: product.slug,
    updated_at: product.updated_at ?? new Date().toISOString(),
  }));
}
