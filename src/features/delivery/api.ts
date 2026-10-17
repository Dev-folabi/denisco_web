import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";
import type { DeliveryOffering } from "./types";

/**
 * Retrieves the home-delivery offering: the areas the farm delivers to and
 * each one's fee, so checkout can quote them.
 *
 * Public and anonymous — the checkout reads it before a customer has an
 * account behind the choice.
 */
export async function getDeliveryOffering(): Promise<DeliveryOffering> {
  return apiClient.get<DeliveryOffering>(API.delivery.offering);
}
