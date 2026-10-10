import { Clock } from "lucide-react";
import { MoneyFromKobo } from "@/lib/utils/format";

import type { ConsultationType as ConsultType } from "@/features/consultations/types";

export type { ConsultType };

interface ConsultTypeCardProps {
  type: ConsultType;
  selected: boolean;
  onSelect: (type: ConsultType) => void;
}

export function ConsultTypeCard({
  type,
  selected,
  onSelect,
}: ConsultTypeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(type)}
      aria-pressed={selected}
      className={`card consult-type-card text-left${selected ? " selected" : ""}`}
    >
      <h3>{type.name}</h3>
      <p className="muted text-[13.5px]">{type.description}</p>
      <p className="flex items-center gap-1.5">
        <Clock size={16} />
        {type.duration}
      </p>
      <div className="price">{MoneyFromKobo(type.price)}</div>
    </button>
  );
}
