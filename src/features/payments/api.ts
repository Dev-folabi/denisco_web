import { apiClient, type ApiMeta } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";
import type { Payment, PaymentInitialization } from "./types";

/** Starts a payment attempt for an order and returns the checkout URL. */
export async function initializePayment(
  orderId: string,
): Promise<PaymentInitialization> {
  return apiClient.post<PaymentInitialization>(API.payments.initialize, {
    order_id: orderId,
  });
}

/**
 * Starts a payment attempt for a consultation booking.
 *
 * The reference travels with the identifier because booking is open to
 * guests: a visitor has no session for the API to check them against, so
 * holding both is what proves the booking is theirs.
 */
export async function initializeBookingPayment(
  bookingId: string,
  bookingReference: string,
): Promise<PaymentInitialization> {
  return apiClient.post<PaymentInitialization>(API.payments.initialize, {
    booking_id: bookingId,
    booking_reference: bookingReference,
  });
}

/**
 * Asks the backend to confirm the result with Paystack.
 *
 * The callback page calls this rather than trusting the redirect: arriving
 * back from the provider proves nothing about whether payment succeeded.
 */
export async function verifyPayment(reference: string): Promise<Payment> {
  return apiClient.post<Payment>(API.payments.verify, { reference });
}

/** Retrieves a payment by reference. */
export async function getPayment(reference: string): Promise<Payment> {
  return apiClient.get<Payment>(API.payments.byRef(reference));
}

/** Lists the customer's transaction history. */
export async function getPayments(
  params: { page?: number; limit?: number } = {},
): Promise<{ data: Payment[]; meta?: ApiMeta }> {
  return apiClient.getPage<Payment[]>(API.payments.list, { params });
}
