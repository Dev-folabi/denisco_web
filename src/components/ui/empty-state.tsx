import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
}: EmptyStateProps) {
  return (
    <div className="py-20 text-center">
      <Icon size={48} className="mx-auto mb-[18px] text-olive-light" />
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      {description && (
        <p className="mx-auto mb-[22px] max-w-[400px] text-sm text-muted">
          {description}
        </p>
      )}
      {ctaLabel &&
        (ctaHref ? (
          <Link
            href={ctaHref}
            className="inline-block rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
          >
            {ctaLabel}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onCtaClick}
            className="rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
          >
            {ctaLabel}
          </button>
        ))}
    </div>
  );
}
