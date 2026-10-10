/** One priced line in the cart. */
export interface CartItem {
  /** The product id; a cart holds at most one line per product. */
  id: string;
  product_id: string;
  name: string;
  slug?: string;
  image?: string;
  unit?: string;
  unit_price: number;
  quantity: number;
  line_total: number;
  stock: number;
  stock_badge?: string;
  /** False when the product was archived or stock fell below the quantity held. */
  available: boolean;
  added_at: string;
}

/** The cart, priced at current catalogue prices on every read. */
export interface Cart {
  items: CartItem[];
  subtotal: number;
  item_count: number;
  currency: string;
  has_unavailable_items: boolean;
}
