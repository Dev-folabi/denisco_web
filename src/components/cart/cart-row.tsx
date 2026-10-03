"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { QtyStepper } from "@/components/product/qty-stepper";
import { MoneyFromKobo } from "@/lib/utils/format";

interface CartItem {
  id: string;
  product_id: string;
  name: string;
  unit: string;
  unit_price: number;
  quantity: number;
  image?: string;
}

interface CartRowProps {
  item: CartItem;
  onChangeQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export function CartRow({ item, onChangeQty, onRemove }: CartRowProps) {
  return (
    <div className="grid grid-cols-[74px_1fr_auto_auto_auto] items-center gap-5 border-b border-line py-5 max-sm:grid-cols-[60px_1fr] max-sm:gap-3">
      <div className="size-[74px] overflow-hidden rounded-[14px] bg-cream-deep max-sm:size-[60px]">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            width={74}
            height={74}
            className="size-full object-cover"
          />
        )}
      </div>
      <div className="min-w-0">
        <h4 className="mb-1 truncate text-[15px] font-semibold">{item.name}</h4>
        <span className="text-[12.5px] text-muted">
          {MoneyFromKobo(item.unit_price)} / {item.unit}
        </span>
      </div>
      <div className="max-sm:col-span-2 max-sm:flex max-sm:items-center max-sm:justify-between max-sm:gap-3">
        <QtyStepper
          value={item.quantity}
          min={1}
          max={99}
          size="sm"
          onChange={(qty) => onChangeQty(item.id, qty)}
        />
      </div>
      <span className="min-w-[90px] text-right font-heading text-[15px] font-bold text-forest max-sm:hidden">
        {MoneyFromKobo(item.unit_price * item.quantity)}
      </span>
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="grid size-[36px] place-items-center rounded-[10px] text-muted transition-colors hover:bg-badge-red-bg hover:text-danger"
        aria-label="Remove item"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
