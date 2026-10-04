import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <div className="empty-state">
      <Icon size={48} className="empty-icon mx-auto" />
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {ctaLabel &&
        (ctaHref ? (
          <Link href={ctaHref}>
            <Button variant="primary">{ctaLabel}</Button>
          </Link>
        ) : (
          <Button variant="primary" onClick={onCtaClick}>
            {ctaLabel}
          </Button>
        ))}
    </div>
  );
}
