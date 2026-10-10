"use client";

import Link from "next/link";
import { Loader2, PackageOpen } from "lucide-react";
import { StatusPill } from "@/components/account/status-pill";
import { EmptyState } from "@/components/ui/empty-state";
import { MoneyFromKobo, fmtDate } from "@/lib/utils/format";
import { useOrders } from "@/features/orders/hooks";

export default function MyOrdersPage() {
  const { data, isPending } = useOrders(1, 50);
  const orders = data?.data ?? [];

  return (
    <>
      <h1>My Orders</h1>

      <div className="panel">
        {isPending ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Loader2
              size={26}
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
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td data-label="Order">{order.order_number}</td>
                    <td data-label="Date">{fmtDate(order.created_at)}</td>
                    <td data-label="Items">{order.items.length} item(s)</td>
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
            description="You have not placed any orders yet."
            ctaLabel="Start Shopping"
            ctaHref="/shop"
          />
        )}
      </div>
    </>
  );
}
