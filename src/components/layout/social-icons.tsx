interface IconProps {
  size?: number;
  className?: string;
}

export function FacebookIcon({ size = 17, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M14 8.5h2V5.6c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6v2.2H6v3.3h2.8V24h3.4v-8.4h2.7l.5-3.3h-3.2V10c0-1 .3-1.5 1.8-1.5z" />
    </svg>
  );
}

export function InstagramIcon({ size = 17, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon({ size = 17, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 4h4.6l4.1 5.5L17.6 4H20l-6.3 7.4L20.5 20h-4.6l-4.5-6-5 6H4l6.7-7.9L4 4z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 17, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22.5l5.4-1.4A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-2.1 1.3-.6.1-1.3.1-3.6-1a13.2 13.2 0 0 1-5.4-5.1c-.8-1.3-1.2-2.6-1-3.4.2-.7.7-1.2 1.2-1.3h.8c.3 0 .5-.1.8.6l.9 2.1c.1.2 0 .5-.1.6l-.6.8c-.2.2-.3.4-.1.7a10 10 0 0 0 4.4 3.8c.3.1.5.1.7-.1l.9-1.1c.2-.3.5-.3.7-.2l2 1c.3.1.4.3.4.6z" />
    </svg>
  );
}
