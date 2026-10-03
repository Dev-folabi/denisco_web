import Link from "next/link";
import { MoneyFromKobo } from "@/lib/utils/format";

interface CartSummaryProps {
  subtotal: number;
  deliveryFee?: number | null;
  total: number;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  disabled?: boolean;
}

export function CartSummary({
  subtotal,
  deliveryFee,
  total,
  ctaLabel = "Proceed to Checkout",
  ctaHref,
  onCtaClick,
  disabled,
}: CartSummaryProps) {
  const btnClass =
    "mt-6 block w-full rounded-full bg-forest px-7 py-[15px] text-center text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive disabled:cursor-not-allowed disabled:opacity-45";

  return (
    <div className="sticky top-[110px] rounded-[18px] border border-line bg-white p-7 shadow-[var(--shadow-default)] max-sm:static max-sm:p-5">
      <h3 className="mb-5 text-[17px] font-semibold">Order Summary</h3>
      <div className="flex justify-between border-b border-dotted border-line py-[9px] text-[14.5px]">
        <span>Subtotal</span>
        <span>{MoneyFromKobo(subtotal)}</span>
      </div>
      <div className="flex justify-between border-b border-dotted border-line py-[9px] text-[14.5px]">
        <span>Delivery</span>
        <span>
          {deliveryFee == null
            ? "Calculated at checkout"
            : deliveryFee === 0
              ? "Free"
              : MoneyFromKobo(deliveryFee)}
        </span>
      </div>
      <div className="mt-2.5 flex justify-between pt-4 text-lg font-extrabold text-forest">
        <span>Total</span>
        <span>{MoneyFromKobo(total)}</span>
      </div>
      {ctaHref ? (
        <Link href={ctaHref} className={btnClass}>
          {ctaLabel}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onCtaClick}
          disabled={disabled}
          className={btnClass}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
