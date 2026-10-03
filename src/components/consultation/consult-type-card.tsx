import { Clock } from "lucide-react";
import { MoneyFromKobo } from "@/lib/utils/format";

interface ConsultType {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

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
      className={`flex flex-col rounded-[18px] border-2 bg-white p-6 text-left transition-all max-sm:p-4 ${
        selected
          ? "border-forest shadow-[var(--shadow-default)]"
          : "border-line hover:border-olive hover:shadow-[var(--shadow-default)]"
      }`}
    >
      <h4 className="mb-2 text-[16.5px] font-semibold">{type.name}</h4>
      <p className="mb-4 flex-1 text-[12.8px] text-muted">{type.description}</p>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[12px] text-muted">
          <Clock size={13} /> {type.duration} min
        </span>
        <span className="font-heading text-[15px] font-bold text-forest">
          {MoneyFromKobo(type.price)}
        </span>
      </div>
    </button>
  );
}
