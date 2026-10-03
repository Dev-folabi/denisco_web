"use client";

import { useRef, useEffect } from "react";

interface DateScrollerProps {
  dates: Date[];
  selected: string;
  onSelect: (dateStr: string) => void;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function toKey(d: Date) {
  return d.toISOString().split("T")[0];
}

export function DateScroller({ dates, selected, onSelect }: DateScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const active = scrollRef.current.querySelector("[data-active]");
    if (active) active.scrollIntoView({ inline: "center", behavior: "smooth" });
  }, [selected]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2.5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {dates.map((d) => {
        const key = toKey(d);
        const isActive = key === selected;
        return (
          <button
            key={key}
            type="button"
            data-active={isActive || undefined}
            onClick={() => onSelect(key)}
            className={`flex min-w-[72px] flex-shrink-0 flex-col items-center rounded-[14px] px-3 py-3 text-center transition-colors ${
              isActive
                ? "bg-forest text-white"
                : "border border-line bg-white text-ink hover:border-forest"
            }`}
            style={{ scrollSnapAlign: "center" }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[.5px] opacity-70">
              {WEEKDAYS[d.getDay()]}
            </span>
            <span className="text-[20px] font-bold leading-tight">
              {d.getDate()}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[.5px] opacity-70">
              {MONTHS[d.getMonth()]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
