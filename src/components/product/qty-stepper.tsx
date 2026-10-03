"use client";

import { Minus, Plus } from "lucide-react";

interface QtyStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
}

export function QtyStepper({
  value,
  min = 1,
  max = 999,
  onChange,
  size = "md",
}: QtyStepperProps) {
  const btnClass =
    size === "sm"
      ? "grid size-[30px] place-items-center"
      : "grid size-[38px] place-items-center";
  const inputClass =
    size === "sm"
      ? "w-[36px] text-center text-[13px] font-bold"
      : "w-[48px] text-center text-[15px] font-bold";

  return (
    <div className="inline-flex items-center rounded-[10px] border-[1.5px] border-line">
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${btnClass} text-muted transition-colors hover:text-forest disabled:opacity-30`}
        aria-label="Decrease quantity"
      >
        <Minus size={size === "sm" ? 13 : 15} />
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
        }}
        className={`${inputClass} border-x-[1.5px] border-line bg-transparent outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      />
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={`${btnClass} text-muted transition-colors hover:text-forest disabled:opacity-30`}
        aria-label="Increase quantity"
      >
        <Plus size={size === "sm" ? 13 : 15} />
      </button>
    </div>
  );
}
