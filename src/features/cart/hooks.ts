"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth/auth-provider";
import {
  addCartItem,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "./api";
import type { Cart } from "./types";

/** Query key for the cart. */
export const cartKeys = {
  current: ["cart"] as const,
};

/**
 * Loads the cart.
 *
 * The cart lives on the server, so it is only fetched for a signed-in
 * customer; a guest sees the empty state until they sign in.
 */
export function useCart() {
  const { isAuthenticated, isLoading } = useAuth();

  return useQuery({
    queryKey: cartKeys.current,
    queryFn: getCart,
    enabled: isAuthenticated && !isLoading,
  });
}

/**
 * Builds a mutation that writes the cart the server returns straight into the
 * cache, so the basket badge and the cart page update without a second fetch.
 */
function useCartMutation<TArgs extends unknown[]>(
  mutationFn: (...args: TArgs) => Promise<Cart>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: TArgs) => mutationFn(...args),
    onSuccess: (cart) => {
      queryClient.setQueryData(cartKeys.current, cart);
      // Stock changes as items are reserved elsewhere, so the catalogue's
      // cached quantities are no longer trustworthy.
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/** Adds a product to the cart. */
export function useAddToCart() {
  return useCartMutation<[string, number?]>(addCartItem);
}

/** Replaces a line's quantity. */
export function useUpdateCartItem() {
  return useCartMutation<[string, number]>(updateCartItem);
}

/** Removes a line from the cart. */
export function useRemoveCartItem() {
  return useCartMutation<[string]>(removeCartItem);
}

/** Empties the cart. */
export function useClearCart() {
  return useCartMutation<[]>(clearCart);
}
