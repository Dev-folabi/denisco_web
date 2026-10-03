"use client";

import Link from "next/link";
import { Package, CreditCard, CalendarCheck, UserCheck } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";

const STATS = [
  { label: "Total Orders", value: "0", icon: Package },
  { label: "Total Spent", value: "₦0", icon: CreditCard },
  { label: "Consultations Booked", value: "0", icon: CalendarCheck },
  { label: "Account Status", value: "Active", icon: UserCheck },
];

export default function AccountDashboard() {
  const { user } = useAuth();
  return (
    <>
      <h1 className="mb-1 text-[34px] font-semibold max-[760px]:text-[clamp(25px,8vw,34px)]">
        Welcome back{user?.first_name ? `, ${user.first_name}` : ""}
      </h1>
      <p className="mb-6 text-muted">
        Here&rsquo;s a quick overview of your account activity.
      </p>

      {/* Stat cards */}
      <div className="mb-[34px] grid grid-cols-4 gap-5 max-[1024px]:grid-cols-2 max-[420px]:grid-cols-1 max-sm:gap-3 max-sm:mb-[18px]">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-2 rounded-[18px] border border-line border-l-4 border-l-olive bg-white p-6 shadow-[var(--shadow-default)] max-sm:p-4"
          >
            <div className="mb-2 grid size-[42px] place-items-center rounded-full bg-cream-deep text-forest max-sm:size-9">
              <stat.icon size={18} />
            </div>
            <span className="font-heading text-[25px] font-bold text-forest max-sm:text-xl">
              {stat.value}
            </span>
            <span className="text-xs text-muted">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="rounded-[18px] border border-line bg-white p-[26px] shadow-[var(--shadow-default)] max-sm:p-4">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2.5">
          <h3 className="m-0 text-[17px] font-semibold">Recent Orders</h3>
          <Link
            href="/account/orders"
            className="rounded-full bg-cream-deep px-[18px] py-[9px] text-[12.5px] font-bold text-forest transition-all hover:bg-olive hover:text-white"
          >
            View All
          </Link>
        </div>
        <p className="text-sm text-muted">
          No orders yet. Orders will appear here once you start shopping.
        </p>
      </div>
    </>
  );
}
