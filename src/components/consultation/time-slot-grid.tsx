interface TimeSlotGridProps {
  slots: string[];
  selected: string;
  takenSlots?: string[];
  onSelect: (time: string) => void;
}

export function TimeSlotGrid({
  slots,
  selected,
  takenSlots = [],
  onSelect,
}: TimeSlotGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2.5 max-sm:grid-cols-2">
      {slots.map((time) => {
        const taken = takenSlots.includes(time);
        const isActive = time === selected;
        return (
          <button
            key={time}
            type="button"
            disabled={taken}
            onClick={() => onSelect(time)}
            className={`rounded-full px-4 py-[11px] text-[13px] font-bold transition-colors ${
              taken
                ? "border border-line bg-badge-grey-bg text-muted line-through opacity-60"
                : isActive
                  ? "bg-forest text-white"
                  : "border border-line bg-white text-ink hover:border-forest"
            }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
