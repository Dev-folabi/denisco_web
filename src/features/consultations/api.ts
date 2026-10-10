import { apiClient, type ApiMeta } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";
import type { Availability, Booking, BookInput, ConsultationType } from "./types";

/** Lists the consultation services on offer. */
export async function getConsultationTypes(): Promise<ConsultationType[]> {
  return apiClient.get<ConsultationType[]>(API.consultations.types);
}

/**
 * Loads the booking calendar.
 *
 * A booked time is unavailable to every service, so the calendar does not
 * depend on which one the visitor picked.
 */
export async function getAvailability(): Promise<Availability> {
  return apiClient.get<Availability>(API.consultations.slots);
}

/**
 * Reserves a slot.
 *
 * Booking is open to guests: a signed-in customer's booking is attached to
 * their account so it appears in their history, and a visitor's simply is not.
 */
export async function createBooking(input: BookInput): Promise<Booking> {
  return apiClient.post<Booking>(API.consultations.bookings.create, input);
}

/** Lists the customer's own bookings. */
export async function getBookings(
  params: { page?: number; limit?: number } = {},
): Promise<{ data: Booking[]; meta?: ApiMeta }> {
  return apiClient.getPage<Booking[]>(API.consultations.bookings.list, { params });
}

/**
 * Retrieves one booking.
 *
 * A guest booking belongs to no account, so the reference is sent alongside
 * the identifier; the API requires both together.
 */
export async function getBooking(
  id: string,
  reference?: string,
): Promise<Booking> {
  return apiClient.get<Booking>(API.consultations.bookings.byId(id), {
    params: { ref: reference },
  });
}

/** Cancels a booking and frees its slot. */
export async function cancelBooking(id: string): Promise<Booking> {
  return apiClient.post<Booking>(API.consultations.bookings.cancel(id));
}
