/** A product as the API returns it. Prices are integers in kobo. */
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** Category slug, which is what the shop filters on. */
  category: string;
  category_id: string;
  category_name: string;
  price: number;
  currency: string;
  unit: string;
  images: string[];
  image?: string;
  /** Sellable quantity: stock on hand minus what is reserved for unpaid orders. */
  stock: number;
  stock_badge: "in_stock" | "low_stock" | "out_of_stock";
  status: "active" | "archived";
  featured: boolean;
  created_at: string;
  updated_at: string;
}

/** A product category, used by the shop's filter chips. */
export interface Category {
  id: string;
  name: string;
  slug: string;
  position: number;
  active: boolean;
}

export type ProductSort =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "name"
  | "newest";

/** Query parameters accepted by the product listing. */
export interface ProductListParams {
  category?: string;
  search?: string;
  featured?: boolean;
  sort?: ProductSort;
  page?: number;
  limit?: number;
}
