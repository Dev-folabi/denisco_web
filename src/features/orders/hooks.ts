"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth/auth-provider";
import { cancelOrder, createOrder, getOrder, getOrders } from "./api";
import { cartKeys } from "@/features/cart/hooks";

/** Query keys for orders. */
export const orderKeys = {
  all: ["orders"] as const,
  list: (page: number) => ["orders", "list", page] as const,
  detail: (id: string) => ["orders", "detail", id] as const,
};

/** Lists the customer's orders. */
export function useOrders(page = 1, limit = 20) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: orderKeys.list(page),
    queryFn: () => getOrders({ page, limit }),
    enabled: isAuthenticated,
  });
}

/** Loads one order. */
export function useOrder(id: string) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => getOrder(id),
    enabled: isAuthenticated && Boolean(id),
  });
}

/** Places an order. */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      // Checkout empties the cart and reserves stock server-side.
      queryClient.invalidateQueries({ queryKey: cartKeys.current });
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/** Cancels an unpaid order. */
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: (order) => {
      queryClient.setQueryData(orderKeys.detail(order.id), order);
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
