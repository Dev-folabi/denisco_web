"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, ShoppingBasket, TriangleAlert } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { CartRow } from "@/components/cart/cart-row";
import { CartSummary } from "@/components/cart/cart-summary";
import { useToast } from "@/components/ui/toast";
import { ApiRequestError } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-provider";
import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from "@/features/cart/hooks";

export default function CartPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const { data: cart, isPending, isError } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const { toast } = useToast();

  // Mutations report the reason they failed — usually that someone else
  // reserved the stock first — so the customer is told rather than left with a
  // quantity that silently refused to change.
  const notifyFailure = (error: unknown) => {
    toast(
      "error",
      error instanceof ApiRequestError
        ? error.message
        : "Could not update your cart.",
    );
  };

  const changeQty = (productId: string, quantity: number) => {
    updateItem.mutate([productId, quantity], { onError: notifyFailure });
  };

  const remove = (productId: string) => {
    removeItem.mutate([productId], { onError: notifyFailure });
  };

  if (isLoading || (isAuthenticated && isPending)) {
    return (
      <section className="section">
        <div className="container flex min-h-[40vh] items-center justify-center">
          <Loader2
            size={28}
            className="animate-spin text-olive"
            aria-label="Loading your cart"
          />
        </div>
      </section>
    );
  }

  const items = cart?.items ?? [];

  return (
    <section className="section">
      <div className="container">
        <h1>Your Shopping Cart</h1>

        {isError ? (
          <EmptyState
            icon={TriangleAlert}
            title="Could not load your cart"
            description="Please check your connection and try again."
            ctaLabel="Back to Shop"
            ctaHref="/shop"
          />
        ) : items.length === 0 ? (
          <EmptyState
            icon={ShoppingBasket}
            title="Your cart is empty"
            description="Browse our shop to add fresh farm products to your cart."
            ctaLabel="Start Shopping"
            ctaHref="/shop"
          />
        ) : (
          <div className="cart-layout">
            <div>
              {items.map((item) => (
                <CartRow
                  key={item.id}
                  item={item}
                  onChangeQty={changeQty}
                  onRemove={remove}
                />
              ))}
              <div style={{ marginTop: 22 }}>
                <Link href="/shop" className="btn btn-outline">
                  <ArrowLeft size={14} /> Continue Shopping
                </Link>
              </div>
            </div>

            <CartSummary
              subtotal={cart?.subtotal ?? 0}
              deliveryFee={null}
              total={cart?.subtotal ?? 0}
              ctaLabel="Proceed to Checkout"
              ctaHref={cart?.has_unavailable_items ? undefined : "/checkout"}
              disabled={cart?.has_unavailable_items}
              note={
                cart?.has_unavailable_items
                  ? "Remove the unavailable items above before checking out."
                  : undefined
              }
            />
          </div>
        )}
      </div>
    </section>
  );
}
