import { useQuery } from "@tanstack/react-query";
import { getDeliveryOffering } from "./api";

/** Query keys for the delivery offering. */
export const deliveryKeys = {
  all: ["delivery"] as const,
  offering: ["delivery", "offering"] as const,
};

/**
 * Loads the home-delivery offering for the checkout.
 *
 * Cached across the session: the farm's areas and rates change rarely, and
 * the checkout is the only reader.
 */
export function useDeliveryOffering() {
  return useQuery({
    queryKey: deliveryKeys.offering,
    queryFn: getDeliveryOffering,
    staleTime: 5 * 60 * 1000,
  });
}
