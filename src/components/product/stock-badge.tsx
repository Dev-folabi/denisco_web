interface StockBadgeProps {
  stock: number;
  className?: string;
}

export function StockBadge({ stock, className = "" }: StockBadgeProps) {
  if (stock <= 0) {
    return (
      <span
        className={`inline-block rounded-full bg-badge-red-bg px-[11px] py-[5px] text-[10.5px] font-extrabold text-badge-red-text ${className}`}
      >
        Out of Stock
      </span>
    );
  }
  if (stock <= 10) {
    return (
      <span
        className={`inline-block rounded-full bg-badge-amber-bg px-[11px] py-[5px] text-[10.5px] font-extrabold text-badge-amber-text ${className}`}
      >
        Low Stock
      </span>
    );
  }
  return (
    <span
      className={`inline-block rounded-full bg-badge-green-bg px-[11px] py-[5px] text-[10.5px] font-extrabold text-badge-green-text ${className}`}
    >
      In Stock
    </span>
  );
}
