import { fmtDate } from "@/lib/utils/format";

interface DateScrollerProps {
  dates: string[];
  selected: string | null;
  onSelect: (date: string) => void;
}

export function DateScroller({ dates, selected, onSelect }: DateScrollerProps) {
  return (
    <div
      className="booking-date-scroller"
      role="group"
      aria-label="Available consultation dates"
    >
      {dates.map((date) => {
        const value = new Date(`${date}T00:00:00`);
        const isSelected = date === selected;
        return (
          <button
            key={date}
            type="button"
            onClick={() => onSelect(date)}
            // The visible label reads "Mon 06 Oct", so the accessible name
            // has to carry the weekday too: a name that drops part of the
            // visible text cannot be used by voice control.
            aria-label={`Select ${value.toLocaleDateString("en-NG", {
              weekday: "short",
            })} ${fmtDate(date)}`}
            className={`booking-date-btn${isSelected ? " selected" : ""}`}
          >
            <span>
              {value.toLocaleDateString("en-NG", { weekday: "short" })}
            </span>
            <strong>{value.toLocaleDateString("en-NG", { day: "2-digit" })}</strong>
            <small>{value.toLocaleDateString("en-NG", { month: "short" })}</small>
          </button>
        );
      })}
    </div>
  );
}
