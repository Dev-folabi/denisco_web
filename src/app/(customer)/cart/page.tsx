"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBasket } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { CartRow } from "@/components/cart/cart-row";
import { CartSummary } from "@/components/cart/cart-summary";

interface CartItem {
  id: string;
  product_id: string;
  name: string;
  unit: string;
  unit_price: number;
  quantity: number;
  image?: string;
}

export default function CartPage() {
  const cartItems: CartItem[] = [];
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0,
  );

  return (
    <section className="section">
      <div className="container">
        <h1>Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
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
              {cartItems.map((item) => (
                <CartRow
                  key={item.id}
                  item={item}
                  onChangeQty={() => {}}
                  onRemove={() => {}}
                />
              ))}
              <div style={{ marginTop: 22 }}>
                <Link href="/shop" className="btn btn-outline">
                  <ArrowLeft size={14} /> Continue Shopping
                </Link>
              </div>
            </div>

            <CartSummary
              subtotal={subtotal}
              deliveryFee={null}
              total={subtotal}
              ctaLabel="Proceed to Checkout"
              ctaHref="/checkout"
            />
          </div>
        )}
      </div>
    </section>
  );
}
