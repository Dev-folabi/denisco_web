"use client";

import Link from "next/link";
import { CheckCircle, Clock, Loader2, TriangleAlert } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { OrderDetailCard } from "@/components/account/order-detail-card";
import { useOrder } from "@/features/orders/hooks";
import { useAuth } from "@/lib/auth/auth-provider";

export function OrderConfirmationContent({ orderId }: { orderId: string }) {
  const { isLoading: authLoading, isAuthenticated } = useAuth();
  const { data: order, isPending, isError } = useOrder(orderId);

  if (authLoading || (isAuthenticated && isPending)) {
    return (
      <section className="section">
        <div className="container flex min-h-[40vh] items-center justify-center">
          <Loader2
            size={28}
            className="animate-spin text-olive"
            aria-label="Loading your order"
          />
        </div>
      </section>
    );
  }

  if (!isAuthenticated || isError || !order) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            icon={TriangleAlert}
            title="Order Not Found"
            description="This order could not be located on your account."
            ctaLabel="Back to Shop"
            ctaHref="/shop"
          />
        </div>
      </section>
    );
  }

  const paid = order.payment_status === "paid";

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "760px" }}>
        <div className={`pay-state ${paid ? "success" : "loading"}`}>
          {paid ? (
            <CheckCircle size={58} className="pay-icon block" />
          ) : (
            <Clock size={58} className="pay-icon block" />
          )}
          <h2>
            {paid
              ? "Thank You! Your Order Is Confirmed"
              : "Your Order Is Awaiting Payment"}
          </h2>
          <p className="muted">
            {paid
              ? "A confirmation has been recorded to your account."
              : "The items are held for you. Complete payment to confirm the order."}
          </p>
        </div>

        <OrderDetailCard order={order} />

        <div style={{ textAlign: "center" }}>
          <Link href="/account/orders" className="btn btn-primary">
            Go to My Orders
          </Link>{" "}
          <Link href="/shop" className="btn btn-outline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
