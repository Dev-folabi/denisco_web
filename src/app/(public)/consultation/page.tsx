"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ConsultTypeCard } from "@/components/consultation/consult-type-card";
import { DateScroller } from "@/components/consultation/date-scroller";
import { TimeSlotGrid } from "@/components/consultation/time-slot-grid";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/auth-provider";
import { ApiRequestError } from "@/lib/api/client";
import { bookingSchema, firstIssue } from "@/lib/validation/schemas";
import {
  useAvailability,
  useConsultationTypes,
  useCreateBooking,
  usePayForBooking,
} from "@/features/consultations/hooks";

export default function ConsultationPage() {
  const router = useRouter();
  const { user } = useAuth();

  const { data: types = [], isPending: typesPending } = useConsultationTypes();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // One calendar for every service: a booked hour is closed to all of them,
  // because the farm runs a single consultation at a time.
  const { data: availability, isPending: slotsPending } = useAvailability();
  const createBooking = useCreateBooking();
  const payForBooking = usePayForBooking();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [chosenTime, setChosenTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const [showTypeError, setShowTypeError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showTimeError, setShowTimeError] = useState(false);

  // The contact fields show a signed-in customer's details until they edit
  // one, and only the edits are held in state. Deriving them keeps the form
  // right on its first render, including when the session resolves after the
  // page has painted.
  const [edits, setEdits] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  const name =
    edits.name ??
    (user ? `${user.first_name} ${user.last_name}`.trim() : "");
  const email = edits.email ?? user?.email ?? "";
  const phone = edits.phone ?? user?.phone ?? "";

  const setName = (value: string) =>
    setEdits((current) => ({ ...current, name: value }));
  const setEmail = (value: string) =>
    setEdits((current) => ({ ...current, email: value }));
  const setPhone = (value: string) =>
    setEdits((current) => ({ ...current, phone: value }));

  const dates = availability?.dates ?? [];
  const times = availability?.times ?? [];

  // Times already booked on the chosen date, whichever service took them.
  const takenTimes = useMemo(() => {
    if (!availability || !selectedDate) return [];
    return availability.slots
      .filter((slot) => slot.date === selectedDate && !slot.available)
      .map((slot) => slot.time);
  }, [availability, selectedDate]);

  // A time that becomes unavailable while the form is open must not stay
  // selected, or the customer would submit a slot they cannot have. Dropping
  // it while deriving the selection, rather than clearing state in an effect,
  // means the form never renders a selection it would then take back.
  const selectedTime =
    chosenTime && !takenTimes.includes(chosenTime) ? chosenTime : null;

  const setSelectedTime = setChosenTime;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    setShowTypeError(!selectedType);
    setShowDateError(!selectedDate);
    setShowTimeError(!selectedTime);

    // The type, date and time are marked on the cards and the grid rather
    // than in the message above the form, so they are checked separately.
    if (!selectedType || !selectedDate || !selectedTime) return;

    const parsed = bookingSchema.safeParse({
      type_id: selectedType,
      date: selectedDate,
      time: selectedTime,
      name,
      email,
      phone,
      notes,
    });

    if (!parsed.success) {
      setError(firstIssue(parsed.error));
      return;
    }

    let booking;
    try {
      booking = await createBooking.mutateAsync({
        ...parsed.data,
        notes: parsed.data.notes || undefined,
      });
    } catch (bookingError) {
      setError(
        bookingError instanceof ApiRequestError
          ? bookingError.message
          : "Your booking could not be completed. Please try again.",
      );
      return;
    }

    const confirmation = `/booking-confirmation/${booking.id}?ref=${booking.reference}`;

    // The slot is held either way. A booking with a fee hands over to
    // Paystack now; if the handover fails — no provider configured, provider
    // down — the visitor still reaches the confirmation page, which shows the
    // outstanding fee and offers the payment again, rather than losing the
    // booking they just made.
    if (!booking.payable) {
      router.push(confirmation);
      return;
    }

    try {
      const checkout = await payForBooking.mutateAsync({
        id: booking.id,
        reference: booking.reference,
      });
      window.location.assign(checkout.authorization_url);
    } catch {
      router.push(confirmation);
    }
  }

  return (
    <>
      <PageHero
        title="Book an Agricultural Consultation"
        description="Get practical, one-on-one guidance from our team on poultry, livestock, piggery, snail or crop farming."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Consultation" },
        ]}
      />

      <section className="section section-white">
        <div className="container">
          <div className="section-head mx-auto mb-[54px] max-w-[620px] text-center">
            <span className="eyebrow">Consultation Types</span>
            <h2 className="text-[38px] font-semibold [@media(max-width:640px)]:text-[31px]">
              Choose a Session That Fits Your Needs
            </h2>
          </div>

          {typesPending ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <Loader2
                size={28}
                className="animate-spin text-olive"
                aria-label="Loading consultation types"
              />
            </div>
          ) : (
            <div className="grid grid-3 gap-7">
              {types.map((type) => (
                <ConsultTypeCard
                  key={type.id}
                  type={type}
                  selected={selectedType === type.id}
                  onSelect={(chosen) => {
                    setSelectedType(chosen.id);
                    setShowTypeError(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-deep">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="card" style={{ padding: 36 }}>
            <h3>Booking Details</h3>

            {error && (
              <div className="mb-4 rounded-[10px] bg-badge-red-bg px-4 py-3 text-sm font-bold text-badge-red-text">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <input type="hidden" id="bk-type" value={selectedType ?? ""} readOnly />
              {showTypeError && (
                <div className="form-group field-invalid">
                  <span className="form-error">
                    Please select a consultation type above.
                  </span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="bk-date">Preferred Date</label>
                <input type="hidden" id="bk-date" value={selectedDate ?? ""} readOnly />

                {slotsPending ? (
                  <p className="form-hint">Loading available dates…</p>
                ) : dates.length ? (
                  <>
                    <DateScroller
                      dates={dates}
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setShowDateError(false);
                        setSelectedTime(null);
                      }}
                    />
                    <p className="form-hint">
                      Scroll to view the next available dates, then select one.
                    </p>
                  </>
                ) : (
                  <p className="form-hint">
                    No consultation dates are currently available. Please check
                    again later.
                  </p>
                )}
                {showDateError && <p className="form-error">Please select a date</p>}
              </div>

              <div className="form-group">
                <label>Preferred Time</label>
                <input type="hidden" id="bk-time" value={selectedTime ?? ""} readOnly />
                <TimeSlotGrid
                  slots={times}
                  selected={selectedTime}
                  takenSlots={takenTimes}
                  onSelect={(time) => {
                    setSelectedTime(time);
                    setShowTimeError(false);
                  }}
                />
                {selectedDate && takenTimes.length > 0 && (
                  <p className="form-hint">
                    Struck-through times are already booked on the selected
                    date.
                  </p>
                )}
                {showTimeError && <p className="form-error">Please select a time slot</p>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bk-name">Full Name</label>
                  <input
                    type="text"
                    id="bk-name"
                    className="form-control"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bk-email">Email Address</label>
                  <input
                    type="email"
                    id="bk-email"
                    className="form-control"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bk-phone">Phone Number</label>
                <input
                  type="tel"
                  id="bk-phone"
                  className="form-control"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bk-notes">Describe Your Consultation Needs</label>
                <textarea
                  id="bk-notes"
                  rows={3}
                  className="form-control"
                  placeholder="Briefly describe what you'd like to discuss"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                block
                disabled={createBooking.isPending || payForBooking.isPending}
              >
                {createBooking.isPending
                  ? "Submitting…"
                  : payForBooking.isPending
                    ? "Opening payment…"
                    : "Submit Booking"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
