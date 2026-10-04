interface TimeSlotGridProps {
  slots: string[];
  selected: string | null;
  takenSlots?: string[];
  onSelect: (time: string) => void;
}

export function TimeSlotGrid({
  slots,
  selected,
  takenSlots = [],
  onSelect,
}: TimeSlotGridProps) {
  if (slots.length === 0) {
    return (
      <div className="slot-grid">
        <p className="muted col-span-full">
          No booking times are currently available.
        </p>
      </div>
    );
  }

  return (
    <div className="slot-grid">
      {slots.map((time) => {
        const taken = takenSlots.includes(time);
        const isSelected = time === selected;
        return (
          <button
            key={time}
            type="button"
            disabled={taken}
            onClick={() => onSelect(time)}
            className={`slot-btn${isSelected ? " selected" : ""}`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
