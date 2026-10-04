"use client";

import { CalendarX } from "lucide-react";
import { StatusPill } from "@/components/account/status-pill";
import type { Booking } from "@/components/account/types";
import { EmptyState } from "@/components/ui/empty-state";
import { fmtDate } from "@/lib/utils/format";

const bookings: Booking[] = [];

export default function MyBookingsPage() {
  return (
    <>
      <h1>My Consultation Bookings</h1>

      <div className="panel">
        {bookings.length ? (
          <div className="table-wrap">
            <table className="account-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td data-label="Reference">{booking.ref}</td>
                    <td data-label="Consultation">{booking.type_name}</td>
                    <td data-label="Date">{fmtDate(booking.date)}</td>
                    <td data-label="Time">{booking.time}</td>
                    <td data-label="Status">
                      <StatusPill status={booking.status} />
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
