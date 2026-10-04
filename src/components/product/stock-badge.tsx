interface StockBadgeProps {
  stock?: number;
  className?: string;
  inline?: boolean;
}

export function StockBadge({
  stock,
  className = "",
  inline = false,
}: StockBadgeProps) {
  let variant = "badge-green";
  let label = "In Stock";

  if (!stock || stock <= 0) {
    variant = "badge-red";
    label = "Out of Stock";
  } else if (stock <= 10) {
    variant = "badge-amber";
    label = "Low Stock";
  }

  return (
    <span
      className={`stock-badge ${variant} ${className}`.trim()}
      style={inline ? { position: "static" } : undefined}
    >
      {label}
    </span>
  );
}
