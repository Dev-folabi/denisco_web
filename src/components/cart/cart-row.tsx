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
    <div className="cart-row">
      {item.image ? (
        <Image src={item.image} alt={item.name} width={74} height={74} />
      ) : (
        <div
          style={{
            width: 74,
            height: 74,
            borderRadius: 14,
            background: "var(--color-cream-deep)",
          }}
        />
      )}
      <div>
        <strong>{item.name}</strong>
        <br />
        <small className="muted">
          {MoneyFromKobo(item.unit_price)} / {item.unit}
        </small>
      </div>
      <QtyStepper
        value={item.quantity}
        min={1}
        max={99}
        onChange={(qty) => onChangeQty(item.id, qty)}
      />
      <strong>{MoneyFromKobo(item.unit_price * item.quantity)}</strong>
      <button
        type="button"
        className="remove-btn"
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
