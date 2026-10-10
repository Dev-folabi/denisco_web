"use client";

import { CalendarX, Loader2 } from "lucide-react";
import { StatusPill } from "@/components/account/status-pill";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ApiRequestError } from "@/lib/api/client";
import { MoneyFromKobo, fmtDate } from "@/lib/utils/format";
import {
  useBookings,
  useCancelBooking,
  usePayForBooking,
} from "@/features/consultations/hooks";

export default function MyBookingsPage() {
  const { data, isPending } = useBookings();
  const cancelBooking = useCancelBooking();
  const payForBooking = usePayForBooking();
  const { toast } = useToast();

  const bookings = data?.data ?? [];

  async function pay(id: string, reference: string) {
    try {
      const checkout = await payForBooking.mutateAsync({ id, reference });
      window.location.assign(checkout.authorization_url);
    } catch (error) {
      toast(
        "error",
        error instanceof ApiRequestError
          ? error.message
          : "The payment could not be started.",
      );
    }
  }

  async function cancel(id: string) {
    try {
      await cancelBooking.mutateAsync(id);
      toast("success", "Booking cancelled and the time released.");
    } catch (error) {
      toast(
        "error",
        error instanceof ApiRequestError
          ? error.message
          : "Could not cancel this booking.",
      );
    }
  }

  return (
    <>
      <h1>My Consultation Bookings</h1>

      <div className="panel">
        {isPending ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Loader2
              size={26}
              className="animate-spin text-olive"
              aria-label="Loading your bookings"
            />
          </div>
        ) : bookings.length ? (
          <div className="table-wrap">
            <table className="account-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td data-label="Reference">{booking.reference}</td>
                    <td data-label="Consultation">{booking.type_name}</td>
                    <td data-label="Date">{fmtDate(booking.date)}</td>
                    <td data-label="Time">{booking.time}</td>
                    {/* The fee shares the payment cell rather than taking a
                        column of its own: the prototype's table is five
                        columns wide, and eight does not fit the dashboard's
                        content column without scrolling the action out of
                        sight. */}
                    <td data-label="Payment">
                      <span className="payment-cell">
                        <StatusPill status={booking.payment_status} />
                        <small className="muted">
                          {booking.type_price > 0
                            ? MoneyFromKobo(booking.type_price)
                            : "Free"}
                        </small>
                      </span>
                    </td>
                    <td data-label="Status">
                      <StatusPill status={booking.status} />
                    </td>
                    <td data-label="Action">
                      {/* Grouped so the pair wraps together once the row
                          becomes a card on a phone: two pill buttons do not
                          fit beside the label at 390px. */}
                      <div className="row-actions">
                        {/* An outstanding fee can be settled from here, which
                            is also how a declined card is retried: the booking
                            keeps its time, so there is something to pay for. */}
                        {booking.payable && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => pay(booking.id, booking.reference)}
                            disabled={payForBooking.isPending}
                          >
                            Pay Fee
                          </Button>
                        )}
                        {/* Only a booking that still holds its time can be
                            cancelled; a completed one no longer can. */}
                        {(booking.status === "pending" ||
                          booking.status === "confirmed") && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => cancel(booking.id)}
                            disabled={cancelBooking.isPending}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={CalendarX}
            title="No Consultations Booked"
            description="Book a session with our agricultural experts."
            ctaLabel="Book a Consultation"
            ctaHref="/consultation"
          />
        )}
      </div>
    </>
  );
}
