"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth/auth-provider";
import { getPayments, initializePayment, verifyPayment } from "./api";

/** Query keys for payments. */
export const paymentKeys = {
  all: ["payments"] as const,
  list: (page: number) => ["payments", "list", page] as const,
};

/** Lists the customer's transactions. */
export function usePayments(page = 1, limit = 20) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: paymentKeys.list(page),
    queryFn: () => getPayments({ page, limit }),
    enabled: isAuthenticated,
  });
}

/** Starts a payment for an order. */
export function useInitializePayment() {
  return useMutation({ mutationFn: initializePayment });
}

/** Confirms a payment result with the backend. */
export function useVerifyPayment() {
  return useMutation({ mutationFn: verifyPayment });
}
