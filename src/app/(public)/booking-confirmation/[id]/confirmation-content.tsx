"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { StatusPill } from "@/components/account/status-pill";
import { Button } from "@/components/ui/button";
import { ApiRequestError } from "@/lib/api/client";
import { MoneyFromKobo, fmtDate } from "@/lib/utils/format";
import { useAuth } from "@/lib/auth/auth-provider";
import { useBooking, usePayForBooking } from "@/features/consultations/hooks";

interface BookingConfirmationContentProps {
  bookingId: string;
  /** Carried through the redirect so a guest still sees their reference. */
  reference?: string;
}

export function BookingConfirmationContent({
  bookingId,
  reference,
}: BookingConfirmationContentProps) {
  const { isAuthenticated } = useAuth();

  // The reference comes through the redirect, which is what lets a guest read
  // their own booking back: the API takes it in place of a session.
  const { data: booking } = useBooking(bookingId, reference);
  const payForBooking = usePayForBooking();
  const [payError, setPayError] = useState("");

  const shownReference = booking?.reference ?? reference ?? "—";
  const outstanding = Boolean(booking?.payable);

  async function pay() {
    if (!booking) return;

    setPayError("");
    try {
      const checkout = await payForBooking.mutateAsync({
        id: booking.id,
        reference: booking.reference,
      });
      window.location.assign(checkout.authorization_url);
    } catch (error) {
      setPayError(
        error instanceof ApiRequestError
          ? error.message
          : "The payment could not be started. Please try again.",
      );
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 600 }}>
        <div className="pay-state success">
          <CalendarCheck size={58} className="pay-icon mx-auto block" />
          <h2>Booking Confirmed!</h2>
          <p className="muted">
            {outstanding
              ? "Your time is held. Your appointment is confirmed once the fee is paid."
              : "Your consultation request has been received."}
          </p>
          <div className="order-ref-box">
            <small className="muted">Booking Reference</small>
            <br />
            <strong>{shownReference}</strong>
          </div>
        </div>

        <div className="card" style={{ padding: 28 }}>
          {booking ? (
            <>
              <p>
                <strong>Consultation:</strong> {booking.type_name}
              </p>
              <p>
                <strong>Date:</strong> {fmtDate(booking.date)}
              </p>
              <p>
                <strong>Time:</strong> {booking.time}
              </p>
              <p>
                <strong>Status:</strong> <StatusPill status={booking.status} />
              </p>
              {booking.payment_status !== "not_required" && (
                <p>
                  <strong>Fee:</strong> {MoneyFromKobo(booking.type_price)}{" "}
                  <StatusPill status={booking.payment_status} />
                </p>
              )}

              {outstanding && (
                <div className="mt-4">
                  {payError && (
                    <div className="mb-3 rounded-[10px] bg-badge-red-bg px-4 py-3 text-sm font-bold text-badge-red-text">
                      {payError}
                    </div>
                  )}
                  <Button
                    variant="primary"
                    onClick={pay}
                    disabled={payForBooking.isPending}
                  >
                    {payForBooking.isPending
                      ? "Opening payment…"
                      : `Pay ${MoneyFromKobo(booking.type_price)}`}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <p className="muted">
              We have emailed the details to the address you gave us. Our team
              will confirm your appointment shortly.
            </p>
          )}
        </div>

        <div className="mt-[22px] text-center">
          {isAuthenticated ? (
            <Link href="/account/consultations" className="btn btn-primary">
              View My Bookings
            </Link>
          ) : (
            <Link href="/consultation" className="btn btn-primary">
              Book Another Consultation
            </Link>
          )}{" "}
          <Link href="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
