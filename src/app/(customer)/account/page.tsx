"use client";

import Link from "next/link";
import {
  CalendarCheck,
  Coins,
  Loader2,
  Package,
  PackageOpen,
  User,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { StatCard } from "@/components/account/stat-card";
import { StatusPill } from "@/components/account/status-pill";
import { EmptyState } from "@/components/ui/empty-state";
import { MoneyFromKobo, fmtDate } from "@/lib/utils/format";
import { useOrders } from "@/features/orders/hooks";
import { useBookingCount } from "@/features/consultations/hooks";

export default function AccountDashboard() {
  const { user } = useAuth();
  // One page of orders drives both the stat cards and the recent list.
  const { data, isPending } = useOrders(1, 50);
  // The bookings count comes from its own request, because the orders page
  // says nothing about consultations.
  const { count: bookingCount, isPending: bookingsPending } = useBookingCount();

  const orders = data?.data ?? [];
  const totalOrders = data?.meta?.total ?? orders.length;
  // Only paid orders count as money spent.
  const totalSpent = orders
    .filter((order) => order.payment_status === "paid")
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <>
      <h1>Welcome back{user?.first_name ? `, ${user.first_name}` : ""}</h1>
      <p className="muted">
        {"Here's a quick overview of your account activity."}
      </p>

      <div className="stat-cards">
        <StatCard
          label="Total Orders"
          value={isPending ? "—" : String(totalOrders)}
          icon={Package}
        />
        <StatCard
          label="Total Spent"
          value={isPending ? "—" : MoneyFromKobo(totalSpent)}
          icon={Coins}
        />
        <StatCard
          label="Consultations Booked"
          value={bookingsPending ? "—" : String(bookingCount)}
          icon={CalendarCheck}
        />
        <StatCard
          label="Account Status"
          value={user?.status === "active" ? "Active" : (user?.status ?? "—")}
          icon={User}
        />
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Recent Orders</h3>
          <Link href="/account/orders" className="btn btn-ghost btn-sm">
            View All
          </Link>
        </div>

        {isPending ? (
          <div className="flex min-h-[160px] items-center justify-center">
            <Loader2
              size={24}
              className="animate-spin text-olive"
              aria-label="Loading your orders"
            />
          </div>
        ) : orders.length ? (
          <div className="table-wrap">
            <table className="account-table">
              <thead>
                <tr>
                  <th>Order No.</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 4).map((order) => (
                  <tr key={order.id}>
                    <td data-label="Order">{order.order_number}</td>
                    <td data-label="Date">{fmtDate(order.created_at)}</td>
                    <td data-label="Total">{MoneyFromKobo(order.total)}</td>
                    <td data-label="Payment">
                      <StatusPill status={order.payment_status} />
                    </td>
                    <td data-label="Status">
                      <StatusPill status={order.status} />
                    </td>
                    <td data-label="Action">
                      <Link
                        href={`/account/orders/${order.id}`}
                        className="btn btn-ghost btn-sm"
                      >
                        View order
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={PackageOpen}
            title="No Orders Yet"
            description="Your recent orders will appear here."
            ctaLabel="Start Shopping"
            ctaHref="/shop"
          />
        )}
      </div>
    </>
  );
}
