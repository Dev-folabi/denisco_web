"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  wide?: boolean;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, wide, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const handleClose = () => onClose();
    el.addEventListener("close", handleClose);
    return () => el.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={`m-auto max-h-[90vh] w-full overflow-y-auto bg-white p-[30px] shadow-[var(--shadow-lg)] open:flex open:flex-col [@media(max-width:640px)]:max-h-[94dvh] [@media(max-width:640px)]:mt-auto [@media(max-width:640px)]:mb-0 [@media(max-width:640px)]:rounded-t-[20px] [@media(max-width:640px)]:rounded-b-[14px] [@media(max-width:640px)]:p-[25px_18px_20px] ${
        wide ? "max-w-[820px] rounded-[24px]" : "max-w-[560px] rounded-[24px]"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-[18px] right-[18px] grid size-9 place-items-center rounded-full border-none bg-cream-deep text-forest [@media(max-width:640px)]:top-3 [@media(max-width:640px)]:right-3"
        aria-label="Close"
      >
        <X size={18} />
      </button>
      {title && <h3 className="mb-[22px] pr-10">{title}</h3>}
      <div className="min-w-0">{children}</div>
    </dialog>
  );
}
