"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  Gauge,
  Lock,
  LogOut,
  Package,
  Receipt,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { EmptyState } from "@/components/ui/empty-state";

interface NavItem {
  label: string;
  shortLabel: string;
  href: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", shortLabel: "Home", href: "/account", icon: Gauge },
  {
    label: "My Orders",
    shortLabel: "Orders",
    href: "/account/orders",
    icon: Package,
  },
  {
    label: "My Consultations",
    shortLabel: "Bookings",
    href: "/account/consultations",
    icon: CalendarCheck,
  },
  {
    label: "Transaction History",
    shortLabel: "Payments",
    href: "/account/payments",
    icon: Receipt,
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();

  const isActive = (href: string) =>
    href === "/account"
      ? pathname === "/account"
      : pathname.startsWith(href);

  if (!isLoading && !user) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: "500px" }}>
          <EmptyState
            icon={Lock}
            title="Please Log In"
            description="Log in to view your account dashboard."
            ctaLabel="Login"
            ctaHref="/login"
          />
        </div>
      </section>
    );
  }

  const initials = user
    ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
    : "";

  return (
    <section className="section">
      <div className="container">
        <div className="dash-shell">
          <aside className="dash-side">
            <div className="user-mini">
              <div className="avatar-circle">{initials}</div>
              <div>
                <strong>
                  {user?.first_name} {user?.last_name}
                </strong>
                <br />
                <small className="muted">{user?.email}</small>
              </div>
            </div>

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "active" : undefined}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}

            <Link href="/" className="danger" onClick={logout}>
              <LogOut size={16} />
              Logout
            </Link>
          </aside>

          <nav className="account-mobile-nav" aria-label="Account navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={isActive(item.href) ? "active" : undefined}
              >
                <span className="nav-icon">
                  <item.icon size={15} className="[@media(max-width:390px)]:size-[14px]" />
                </span>
                <span>{item.shortLabel}</span>
              </Link>
            ))}
            <Link href="/" aria-label="Log out" onClick={logout}>
              <span className="nav-icon">
                <LogOut size={15} className="[@media(max-width:390px)]:size-[14px]" />
              </span>
              <span>Logout</span>
            </Link>
          </nav>

          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
