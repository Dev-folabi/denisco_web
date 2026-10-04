"use client";

import Link from "next/link";
import { CalendarCheck, Coins, Package, PackageOpen, User } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { StatCard } from "@/components/account/stat-card";
import { StatusPill } from "@/components/account/status-pill";
import type { Order } from "@/components/account/types";
import { EmptyState } from "@/components/ui/empty-state";
import { MoneyFromKobo, fmtDate } from "@/lib/utils/format";

const orders: Order[] = [];

export default function AccountDashboard() {
  const { user } = useAuth();

  return (
    <>
      <h1>Welcome back{user?.first_name ? `, ${user.first_name}` : ""}</h1>
      <p className="muted">
        {"Here's a quick overview of your account activity."}
      </p>

      <div className="stat-cards">
        <StatCard label="Total Orders" value="0" icon={Package} />
        <StatCard label="Total Spent" value="₦0" icon={Coins} />
        <StatCard label="Consultations Booked" value="0" icon={CalendarCheck} />
        <StatCard label="Account Status" value="Active" icon={User} />
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Recent Orders</h3>
          <Link href="/account/orders" className="btn btn-ghost btn-sm">
            View All
          </Link>
        </div>

        {orders.length ? (
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
