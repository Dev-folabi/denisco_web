"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-provider";
import {
  LayoutDashboard,
  Package,
  CalendarCheck,
  CreditCard,
  LogOut,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Dashboard", shortLabel: "Home", href: "/account", icon: LayoutDashboard },
  { label: "My Orders", shortLabel: "Orders", href: "/account/orders", icon: Package },
  { label: "My Consultations", shortLabel: "Bookings", href: "/account/consultations", icon: CalendarCheck },
  { label: "Transaction History", shortLabel: "Payments", href: "/account/payments", icon: CreditCard },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) =>
    href === "/account"
      ? pathname === "/account"
      : pathname.startsWith(href);

  const initials = user
    ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
    : "?";

  return (
    <>
      <section className="px-6 py-12 max-[760px]:pb-[78px]">
        <div className="mx-auto grid max-w-[1220px] grid-cols-[270px_1fr] items-start gap-8 max-[1024px]:grid-cols-1">
          {/* Desktop sidebar */}
          <div className="sticky top-[110px] rounded-[18px] border border-line bg-white p-[22px] max-[760px]:hidden max-[1024px]:static">
            <div className="mb-[18px] flex items-center gap-3 border-b border-line pb-[18px]">
              <div className="grid size-[46px] place-items-center rounded-full bg-cream-deep font-heading font-extrabold text-forest">
                {initials}
              </div>
              <div className="min-w-0">
                <strong className="block truncate text-sm text-forest">
                  {user?.first_name} {user?.last_name}
                </strong>
                <span className="block truncate text-xs text-muted">
                  {user?.email}
                </span>
              </div>
            </div>
            <nav>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`mb-[5px] flex items-center gap-[11px] rounded-[10px] px-3.5 py-3 text-sm font-bold transition-colors ${
                    isActive(link.href)
                      ? "bg-cream-deep text-forest"
                      : "text-ink hover:bg-cream-deep hover:text-forest"
                  }`}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={logout}
                className="mt-1 flex w-full items-center gap-[11px] rounded-[10px] border-0 bg-transparent px-3.5 py-3 text-sm font-bold text-danger transition-colors hover:bg-cream-deep"
              >
                <LogOut size={16} />
                Logout
              </button>
            </nav>
          </div>

          {/* Main content */}
          <div className="min-w-0">{children}</div>
        </div>
      </section>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-[190] flex border-t border-line bg-white/95 px-2 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_22px_rgba(14,34,19,0.08)] backdrop-blur-[12px] min-[760px]:hidden">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] px-0.5 py-[5px] text-[9px] font-extrabold max-[390px]:text-[8.5px] ${
              isActive(link.href) ? "text-forest" : "text-muted"
            }`}
          >
            <span
              className={`${
                isActive(link.href)
                  ? "grid size-[30px] place-items-center rounded-[10px] bg-cream-deep"
                  : ""
              }`}
            >
              <link.icon size={isActive(link.href) ? 15 : 14} />
            </span>
            {link.shortLabel}
          </Link>
        ))}
        <button
          type="button"
          onClick={logout}
          className="flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] border-0 bg-transparent px-0.5 py-[5px] text-[9px] font-extrabold text-muted max-[390px]:text-[8.5px]"
        >
          <LogOut size={14} />
          Logout
        </button>
      </nav>
    </>
  );
}
