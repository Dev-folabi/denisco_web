"use client";

import { useState, useMemo } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { ConsultTypeCard } from "@/components/consultation/consult-type-card";
import { DateScroller } from "@/components/consultation/date-scroller";
import { TimeSlotGrid } from "@/components/consultation/time-slot-grid";
import { Button } from "@/components/ui/button";

const DEMO_TYPES = [
  {
    id: "CT-01",
    name: "General Farm Setup Consultation",
    duration: "60 mins",
    price: 1500000,
    description:
      "One-on-one guidance for individuals or groups planning to start a poultry, livestock, or crop farming business.",
  },
  {
    id: "CT-02",
    name: "Poultry Health & Management Advisory",
    duration: "45 mins",
    price: 1000000,
    description:
      "Practical advice on poultry housing, feeding, disease prevention and flock management.",
  },
  {
    id: "CT-03",
    name: "Livestock (Ruminant) Management Consultation",
    duration: "60 mins",
    price: 1500000,
    description:
      "Expert guidance on cattle, goat, sheep and ram rearing, breeding and pasture management.",
  },
  {
    id: "CT-04",
    name: "Piggery & Snail Farming Consultation",
    duration: "45 mins",
    price: 1000000,
    description:
      "Support for setting up or improving a piggery or snail farming operation, including housing and feeding.",
  },
  {
    id: "CT-05",
    name: "Crop Production & Soil Advisory",
    duration: "60 mins",
    price: 1500000,
    description:
      "Guidance on land preparation, crop selection, planting schedules and post-harvest handling.",
  },
];

const TIME_SLOTS = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"];

function generateDates(count: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export default function ConsultationPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showTypeError, setShowTypeError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showTimeError, setShowTimeError] = useState(false);
  const dates = useMemo(() => generateDates(31), []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowTypeError(!selectedType);
    setShowDateError(!selectedDate);
    setShowTimeError(!selectedTime);
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
          <div className="grid grid-3 gap-7">
            {DEMO_TYPES.map((type) => (
              <ConsultTypeCard
                key={type.id}
                type={type}
                selected={selectedType === type.id}
                onSelect={(t) => {
                  setSelectedType(t.id);
                  setShowTypeError(false);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-deep">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="card" style={{ padding: 36 }}>
            <h3>Booking Details</h3>
            <form onSubmit={handleSubmit} noValidate>
              <input
                type="hidden"
                id="bk-type"
                value={selectedType ?? ""}
                readOnly
              />
              {showTypeError && (
                <div className="form-group field-invalid">
                  <span className="form-error">
                    Please select a consultation type above.
                  </span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="bk-date">Preferred Date</label>
                <input
                  type="hidden"
                  id="bk-date"
                  value={selectedDate ?? ""}
                  readOnly
                />
                {dates.length ? (
                  <>
                    <DateScroller
                      dates={dates}
                      selected={selectedDate}
                      onSelect={(d) => {
                        setSelectedDate(d);
                        setShowDateError(false);
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
                {showDateError && (
                  <p className="form-error">Please select a date</p>
                )}
              </div>

              <div className="form-group">
                <label>Preferred Time</label>
                <input
                  type="hidden"
                  id="bk-time"
                  value={selectedTime ?? ""}
                  readOnly
                />
                <TimeSlotGrid
                  slots={TIME_SLOTS}
                  selected={selectedTime}
                  onSelect={(t) => {
                    setSelectedTime(t);
                    setShowTimeError(false);
                  }}
                />
                {showTimeError && (
                  <p className="form-error">Please select a time slot</p>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bk-name">Full Name</label>
                  <input
                    type="text"
                    id="bk-name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bk-email">Email Address</label>
                  <input
                    type="email"
                    id="bk-email"
                    className="form-control"
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
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bk-notes">
                  Describe Your Consultation Needs
                </label>
                <textarea
                  id="bk-notes"
                  rows={3}
                  className="form-control"
                  placeholder="Briefly describe what you'd like to discuss"
                />
              </div>

              <Button type="submit" variant="primary" block>
                Submit Booking
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
