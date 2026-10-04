"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { MoneyFromKobo } from "@/lib/utils/format";

interface SummaryLine {
  label: string;
  value: ReactNode;
}

interface CartSummaryProps {
  lines?: SummaryLine[];
  subtotal: number;
  deliveryFee?: number | null;
  total: number;
  note?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  ctaIcon?: ReactNode;
  onCtaClick?: () => void;
  disabled?: boolean;
}

export function CartSummary({
  lines,
  subtotal,
  deliveryFee,
  total,
  note,
  ctaLabel = "Proceed to Checkout",
  ctaHref,
  ctaIcon,
  onCtaClick,
  disabled,
}: CartSummaryProps) {
  const deliveryValue =
    deliveryFee == null
      ? "Calculated at checkout"
      : deliveryFee === 0
        ? "Free"
        : MoneyFromKobo(deliveryFee);

  const ctaContent = (
    <>
      {ctaIcon}
      {ctaLabel}
    </>
  );

  return (
    <div className="card cart-summary">
      <h3>Order Summary</h3>
      {lines?.map((line) => (
        <div className="summary-line" key={line.label}>
          <span>{line.label}</span>
          <span>{line.value}</span>
        </div>
      ))}
      <div className="summary-line">
        <span>Subtotal</span>
        <span>{MoneyFromKobo(subtotal)}</span>
      </div>
      <div className="summary-line">
        <span>Delivery Fee</span>
        <span>{deliveryValue}</span>
      </div>
      <div className="summary-line total">
        <span>Total</span>
        <span>{MoneyFromKobo(total)}</span>
      </div>
      {note && (
        <p className="form-hint" style={{ marginTop: 16 }}>
          {note}
        </p>
      )}
      {ctaHref ? (
        <Link
          href={ctaHref}
          className="btn btn-primary btn-block"
          style={{ marginTop: note ? 12 : 18 }}
        >
          {ctaContent}
        </Link>
      ) : (
        <button
          type="button"
          className="btn btn-primary btn-block"
          style={{ marginTop: note ? 12 : 18 }}
          onClick={onCtaClick}
          disabled={disabled}
        >
          {ctaContent}
        </button>
      )}
    </div>
  );
}
