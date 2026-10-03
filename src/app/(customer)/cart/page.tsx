"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBasket, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const cartItems: never[] = [];
  const isEmpty = cartItems.length === 0;

  if (isEmpty) {
    return (
      <section className="px-6 py-24">
        <div className="container text-center">
          <ShoppingBasket
            size={48}
            className="mx-auto mb-[18px] text-olive-light"
          />
          <h3 className="mb-2 text-[22px] font-semibold">
            Your cart is empty
          </h3>
          <p className="mx-auto mb-[22px] max-w-[400px] text-muted">
            Looks like you haven&rsquo;t added anything to your cart yet. Browse
            our products to get started.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12">
      <div className="container">
        <h1 className="mb-8 text-[38px] font-semibold">Shopping Cart</h1>
        <div className="grid grid-cols-[1.6fr_1fr] items-start gap-10 max-[1024px]:grid-cols-1 max-[760px]:gap-[22px]">
          {/* Items */}
          <div>
            <Link
              href="/shop"
              className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-olive hover:text-forest"
            >
              <ArrowLeft size={14} /> Continue Shopping
            </Link>
            {/* Cart rows will be rendered here from state */}
          </div>

          {/* Summary */}
          <div className="sticky top-[110px] rounded-[18px] border border-line bg-white p-7 shadow-[var(--shadow-default)] max-[760px]:static">
            <h3 className="mb-5 text-lg font-semibold">Order Summary</h3>
            <div className="flex justify-between border-b border-dotted border-line py-[9px] text-[14.5px]">
              <span>Subtotal</span>
              <span>₦0</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-line py-[9px] text-[14.5px]">
              <span>Delivery</span>
              <span className="text-muted">Calculated at checkout</span>
            </div>
            <div className="mt-2.5 flex justify-between pt-4 text-lg font-extrabold text-forest">
              <span>Total</span>
              <span>₦0</span>
            </div>
            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
