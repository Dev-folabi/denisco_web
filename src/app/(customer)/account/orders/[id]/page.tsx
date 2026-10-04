"use client";

import Link from "next/link";
import { OrderDetailCard } from "@/components/account/order-detail-card";
import type { Order } from "@/components/account/types";

const order: Order = {
  id: "",
  order_number: "DG-000000",
  items: [],
  subtotal: 0,
  delivery_fee: 0,
  total: 0,
  status: "processing",
  payment_status: "paid",
  delivery_method: "delivery",
  created_at: "",
};

export default function OrderDetailPage() {
  return (
    <>
      <nav className="breadcrumb" style={{ color: "var(--color-muted)" }}>
        <Link href="/account/orders">My Orders</Link> / {order.order_number}
      </nav>

      <OrderDetailCard order={order} />
    </>
  );
}
