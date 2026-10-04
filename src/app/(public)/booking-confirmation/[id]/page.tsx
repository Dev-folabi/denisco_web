import Link from "next/link";
import { CalendarCheck } from "lucide-react";

export default function BookingConfirmationPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 600 }}>
        {/* Success state */}
        <div className="pay-state success">
          <CalendarCheck size={58} className="pay-icon mx-auto block" />
          <h2>Booking Confirmed!</h2>
          <p className="muted">Your consultation request has been received.</p>
          <div className="order-ref-box">
            <small className="muted">Booking Reference</small>
            <br />
            <strong>CB-00000</strong>
          </div>
        </div>

        {/* Booking detail card */}
        <div className="card" style={{ padding: 28 }}>
          <p>
            <strong>Consultation:</strong> General Farm Setup Consultation
          </p>
          <p>
            <strong>Date:</strong> —
          </p>
          <p>
            <strong>Time:</strong> —
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="status-pill badge-amber">Pending</span>
          </p>
        </div>

        <div className="mt-[22px] text-center">
          <Link href="/account/consultations" className="btn btn-primary">
            View My Bookings
          </Link>{" "}
          <Link href="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
