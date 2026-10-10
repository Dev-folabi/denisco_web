"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { QtyStepper } from "@/components/product/qty-stepper";
import { MoneyFromKobo } from "@/lib/utils/format";

import type { CartItem } from "@/features/cart/types";

interface CartRowProps {
  item: CartItem;
  /** Called with the product id, which is how a cart line is addressed. */
  onChangeQty: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
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
        {!item.available && (
          <>
            <br />
            <small className="text-danger font-bold">
              {item.stock > 0
                ? `Only ${item.stock} left — reduce the quantity`
                : "No longer available"}
            </small>
          </>
        )}
      </div>
      <QtyStepper
        value={item.quantity}
        min={1}
        max={Math.max(item.stock, 1)}
        onChange={(qty) => onChangeQty(item.product_id, qty)}
      />
      <strong>{MoneyFromKobo(item.line_total)}</strong>
      <button
        type="button"
        className="remove-btn"
        onClick={() => onRemove(item.product_id)}
        aria-label="Remove item"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
