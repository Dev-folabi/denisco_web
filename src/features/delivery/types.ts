/** One delivery area the farm delivers to, each with its own flat rate. */
export interface DeliveryLocation {
  id: string;
  name: string;
  /** Flat rate for this area, in kobo. */
  fee: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * What the checkout reads: whether home delivery is on at all, and the areas
 * a customer may choose between.
 *
 * `enabled` is false — and `locations` empty — while home delivery is
 * switched off at the farm or no area is active, so the checkout hides the
 * option rather than offering something the API would refuse.
 */
export interface DeliveryOffering {
  enabled: boolean;
  locations: DeliveryLocation[];
}
