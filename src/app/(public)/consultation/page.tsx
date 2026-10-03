"use client";

import { useState, useMemo } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { Clock, ArrowRight } from "lucide-react";
import { MoneyFromKobo } from "@/lib/utils/format";

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

function generateDates(count: number) {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }
  return dates;
}

export default function ConsultationPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const dates = useMemo(() => generateDates(31), []);

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

      <section className="bg-white px-6 py-24 max-sm:py-16">
        <div className="container">
          {/* Type cards */}
          <div className="mb-10">
            <div className="mb-[54px] text-center">
              <span className="eyebrow mb-4">Consultation Types</span>
              <h2 className="text-[38px] font-semibold max-sm:text-[31px]">
                Choose a Session That Fits Your Needs
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-7 max-[1024px]:grid-cols-2 max-sm:grid-cols-1">
              {DEMO_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`rounded-[18px] border-2 p-[26px] text-left transition-colors ${
                    selectedType === type.id
                      ? "border-olive bg-cream-deep"
                      : "border-line bg-white hover:border-olive"
                  }`}
                >
                  <h3 className="mb-2 text-[19px] font-semibold">
                    {type.name}
                  </h3>
                  <p className="mb-3 text-[13px] text-muted">
                    {type.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Clock size={12} /> {type.duration}
                    </span>
                    <span className="font-heading text-[19px] font-bold text-forest">
                      {MoneyFromKobo(type.price)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-deep px-6 py-24 max-sm:py-16">
        <div className="container">
          {/* Booking form card */}
          <div className="mx-auto max-w-[760px] rounded-[18px] border border-line bg-white p-9 shadow-[var(--shadow-default)] max-sm:p-[22px]">
            <h3 className="mb-6 text-xl font-semibold">Booking Details</h3>
            {/* Date scroller */}
            <div className="mb-8">
              <label className="mb-3 block text-[13px] font-bold text-forest">
                Preferred Date
              </label>
              <div className="flex gap-2.5 overflow-x-auto pb-3 max-[480px]:gap-2 [scrollbar-color:var(--color-olive-light)_var(--color-cream-deep)] [scrollbar-width:thin] [scroll-snap-type:x_mandatory]">
                {dates.map((date) => {
                  const key = date.toISOString().slice(0, 10);
                  const isSelected = selectedDate === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedDate(key)}
                      className={`flex min-h-[84px] w-[76px] shrink-0 flex-col items-center justify-center gap-px rounded-[14px] border-[1.5px] transition-colors max-[480px]:w-[70px] max-[480px]:min-h-[78px] [scroll-snap-align:start] ${
                        isSelected
                          ? "border-forest bg-forest text-white shadow-[var(--shadow-default)]"
                          : "border-line bg-white text-forest hover:border-olive hover:bg-cream-deep"
                      }`}
                    >
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-[.4px] ${
                          isSelected ? "text-lime" : "text-olive"
                        }`}
                      >
                        {date.toLocaleDateString("en-NG", { weekday: "short" })}
                      </span>
                      <strong className="font-heading text-[22px] leading-none">
                        {date.getDate()}
                      </strong>
                      <small
                        className={`text-[10px] font-bold ${
                          isSelected ? "text-[#d3e7c8]" : "text-muted"
                        }`}
                      >
                        {date.toLocaleDateString("en-NG", { month: "short" })}
                      </small>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slot grid */}
            <div className="mb-8">
              <label className="mb-3 block text-[13px] font-bold text-forest">
                Preferred Time
              </label>
              <div className="grid grid-cols-4 gap-2.5 max-sm:grid-cols-2">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-full border-[1.5px] py-[11px] text-[12.5px] font-bold transition-colors ${
                      selectedTime === time
                        ? "border-forest bg-forest text-white"
                        : "border-line bg-white text-ink hover:border-olive"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div>
              <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                <div>
                  <label className="mb-2 block text-[13px] font-bold text-forest">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-bold text-forest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-bold text-forest">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-[13px] font-bold text-forest">
                  Describe Your Consultation Needs
                </label>
                <textarea
                  rows={3}
                  className="w-full resize-y rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                  placeholder="Briefly describe what you'd like to discuss"
                />
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive disabled:cursor-not-allowed disabled:opacity-45"
                disabled={!selectedType || !selectedDate || !selectedTime}
              >
                Submit Booking
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

