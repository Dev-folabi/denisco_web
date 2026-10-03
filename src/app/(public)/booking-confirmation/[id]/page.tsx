import Link from "next/link";
import { CalendarCheck } from "lucide-react";

export default function BookingConfirmationPage() {
  return (
    <section className="px-6 py-24 max-sm:py-16">
      <div className="mx-auto max-w-[600px]">
        {/* Success state */}
        <div className="py-11 text-center">
          <CalendarCheck
            size={58}
            className="mx-auto mb-[18px] text-olive"
          />
          <h2 className="mb-2 text-[28px] font-semibold">
            Booking Confirmed!
          </h2>
          <p className="mb-[18px] text-muted">
            Your consultation request has been received.
          </p>
          <div className="mx-auto mb-1 inline-block rounded-[14px] border-[1.5px] border-dashed border-olive bg-cream-deep px-[26px] py-[18px]">
            <small className="block text-[11.5px] font-bold uppercase tracking-[.4px] text-muted">
              Booking Reference
            </small>
            <strong className="font-heading text-[22px] tracking-[1px] text-forest">
              CB-00000
            </strong>
          </div>
        </div>

        {/* Booking detail card */}
        <div className="mb-7 rounded-[18px] border border-line bg-white p-7 shadow-[var(--shadow-default)]">
          <div className="grid gap-[18px]">
            <div className="flex justify-between border-b border-dotted border-line pb-[14px]">
              <span className="text-[13px] font-bold text-forest">
                Consultation
              </span>
              <span className="text-[13.5px] text-muted">
                General Farm Setup Consultation
              </span>
            </div>
            <div className="flex justify-between border-b border-dotted border-line pb-[14px]">
              <span className="text-[13px] font-bold text-forest">Date</span>
              <span className="text-[13.5px] text-muted">—</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-line pb-[14px]">
              <span className="text-[13px] font-bold text-forest">Time</span>
              <span className="text-[13.5px] text-muted">—</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[13px] font-bold text-forest">Status</span>
              <span className="inline-block rounded-full bg-badge-blue-bg px-[13px] py-[5px] text-[11.5px] font-extrabold text-badge-blue-text">
                Pending
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/account/consultations"
            className="inline-flex items-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
          >
            View My Bookings
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-[9px] rounded-full border-2 border-forest bg-transparent px-7 py-[15px] text-sm font-bold text-forest transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
