"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader2, TriangleAlert } from "lucide-react";
import { OrderDetailCard } from "@/components/account/order-detail-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ApiRequestError } from "@/lib/api/client";
import { useCancelOrder, useOrder } from "@/features/orders/hooks";
import { useInitializePayment } from "@/features/payments/hooks";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isPending, isError } = useOrder(id);
  const cancelOrder = useCancelOrder();
  const initializePayment = useInitializePayment();
  const { toast } = useToast();

  if (isPending) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2
          size={28}
          className="animate-spin text-olive"
          aria-label="Loading your order"
        />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title="Order Not Found"
        description="This order could not be located on your account."
        ctaLabel="Back to My Orders"
        ctaHref="/account/orders"
      />
    );
  }

  // An unpaid order still holds its stock, so the customer can either finish
  // paying or release it by cancelling.
  const awaitingPayment =
    order.payment_status === "pending" && order.status !== "cancelled";

  async function payNow() {
    try {
      const payment = await initializePayment.mutateAsync(order!.id);
      window.location.href = payment.authorization_url;
    } catch (error) {
      toast(
        "error",
        error instanceof ApiRequestError
          ? error.message
          : "Could not start the payment.",
      );
    }
  }

  async function cancel() {
    try {
      await cancelOrder.mutateAsync(order!.id);
      toast("success", "Order cancelled and the items released.");
    } catch (error) {
      toast(
        "error",
        error instanceof ApiRequestError
          ? error.message
          : "Could not cancel this order.",
      );
    }
  }

  return (
    <>
      <nav className="breadcrumb" style={{ color: "var(--color-muted)" }}>
        <Link href="/account/orders">My Orders</Link> / {order.order_number}
      </nav>

      <OrderDetailCard order={order} />

      {awaitingPayment && (
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={payNow}
            disabled={initializePayment.isPending}
          >
            {initializePayment.isPending ? "Starting payment…" : "Pay Now"}
          </Button>
          <Button
            variant="outline"
            onClick={cancel}
            disabled={cancelOrder.isPending}
          >
            {cancelOrder.isPending ? "Cancelling…" : "Cancel Order"}
          </Button>
        </div>
      )}
    </>
  );
}
