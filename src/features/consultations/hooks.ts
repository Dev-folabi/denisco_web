"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth/auth-provider";
import { initializeBookingPayment } from "@/features/payments/api";
import {
  cancelBooking,
  createBooking,
  getAvailability,
  getBooking,
  getBookings,
  getConsultationTypes,
} from "./api";

/** Query keys for consultations. */
export const consultationKeys = {
  types: ["consultations", "types"] as const,
  availability: ["consultations", "availability"] as const,
  bookings: ["consultations", "bookings"] as const,
  booking: (id: string) => ["consultations", "bookings", id] as const,
};

/** Loads the consultation services on offer. */
export function useConsultationTypes() {
  return useQuery({
    queryKey: consultationKeys.types,
    queryFn: getConsultationTypes,
    // A small, slow-changing reference set.
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Loads the booking calendar.
 *
 * It is not keyed by service: a booked time is closed to every service, so
 * there is one calendar rather than one per consultation type.
 */
export function useAvailability() {
  return useQuery({
    queryKey: consultationKeys.availability,
    queryFn: getAvailability,
    // Slots are taken by other customers while the page is open, so this is
    // kept fresh rather than cached for long.
    staleTime: 30 * 1000,
  });
}

/** Lists the customer's own bookings. */
export function useBookings(page = 1, limit = 50) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [...consultationKeys.bookings, page, limit],
    queryFn: () => getBookings({ page, limit }),
    enabled: isAuthenticated,
  });
}

/**
 * Loads one booking, for the confirmation page.
 *
 * A reference makes this work for a guest as well, so the confirmation page
 * shows the real booking rather than a placeholder. Without one it waits for
 * the session, because an account's booking is only readable by its owner.
 */
export function useBooking(id: string, reference?: string) {
  const { isAuthenticated, isLoading } = useAuth();

  return useQuery({
    queryKey: [...consultationKeys.booking(id), reference ?? ""],
    queryFn: () => getBooking(id, reference),
    enabled: Boolean(id) && (Boolean(reference) || (!isLoading && isAuthenticated)),
  });
}

/** Counts the customer's bookings, for the dashboard stat card. */
export function useBookingCount() {
  // One row is enough: the count comes from the response's pagination meta,
  // not from the rows themselves.
  const { data, isPending } = useBookings(1, 1);
  return { count: data?.meta?.total ?? data?.data?.length ?? 0, isPending };
}

/** Reserves a slot. */
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      // The slot just taken is no longer available to anyone else.
      queryClient.invalidateQueries({ queryKey: consultationKeys.availability });
      queryClient.invalidateQueries({ queryKey: consultationKeys.bookings });
    },
  });
}

/**
 * Opens a Paystack checkout for a booking's outstanding fee.
 *
 * The caller is handed the authorization URL rather than being redirected
 * here, so the page can decide what to do when the provider is unavailable.
 */
export function usePayForBooking() {
  return useMutation({
    mutationFn: ({ id, reference }: { id: string; reference: string }) =>
      initializeBookingPayment(id, reference),
  });
}

/** Cancels a booking. */
export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: consultationKeys.availability });
      queryClient.invalidateQueries({ queryKey: consultationKeys.bookings });
    },
  });
}
