"use client";

import { useState } from "react";
import Link from "next/link";
import { Truck, MapPin } from "lucide-react";
import { Money } from "@/lib/utils/format";
import { SITE } from "@/lib/constants";

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const deliveryFee = deliveryMethod === "delivery" ? SITE.deliveryFee : 0;

  return (
    <section className="px-6 py-12">
      <div className="container">
        <h1 className="mb-8 text-[38px] font-semibold">Checkout</h1>
        <div className="grid grid-cols-[1.2fr_1fr] items-start gap-10 max-[1024px]:grid-cols-1">
          {/* Form */}
          <div>
            {/* Contact */}
            <fieldset className="mb-5 rounded-[18px] border-[1.5px] border-line bg-white p-[22px]">
              <legend className="px-2.5 text-[13px] font-extrabold uppercase tracking-[.6px] text-forest">
                01 · Contact Details
              </legend>
              <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                <div>
                  <label className="mb-2 block text-[13px] font-bold text-forest">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-bold text-forest">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                  />
                </div>
                <div className="col-span-full">
                  <label className="mb-2 block text-[13px] font-bold text-forest">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                  />
                </div>
              </div>
            </fieldset>

            {/* Delivery */}
            <fieldset className="mb-5 rounded-[18px] border-[1.5px] border-line bg-white p-[22px]">
              <legend className="px-2.5 text-[13px] font-extrabold uppercase tracking-[.6px] text-forest">
                02 · Delivery Method
              </legend>
              <label
                className={`mb-2.5 flex cursor-pointer items-center gap-3 rounded-[10px] border-[1.5px] px-4 py-3.5 ${
                  deliveryMethod === "delivery"
                    ? "border-olive bg-cream-deep"
                    : "border-line"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === "delivery"}
                  onChange={() => setDeliveryMethod("delivery")}
                  className="accent-olive"
                />
                <Truck size={18} className="text-forest" />
                <div className="flex-1">
                  <strong className="text-sm font-bold">Home Delivery</strong>
                  <span className="ml-2 text-xs text-muted">
                    {Money(SITE.deliveryFee)}
                  </span>
                </div>
              </label>
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-[10px] border-[1.5px] px-4 py-3.5 ${
                  deliveryMethod === "pickup"
                    ? "border-olive bg-cream-deep"
                    : "border-line"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === "pickup"}
                  onChange={() => setDeliveryMethod("pickup")}
                  className="accent-olive"
                />
                <MapPin size={18} className="text-forest" />
                <div className="flex-1">
                  <strong className="text-sm font-bold">Farm Pickup</strong>
                  <span className="ml-2 text-xs text-muted">Free</span>
                </div>
              </label>

              {deliveryMethod === "delivery" && (
                <div className="mt-4">
                  <label className="mb-2 block text-[13px] font-bold text-forest">
                    Delivery Address
                  </label>
                  <textarea
                    rows={3}
                    className="w-full resize-y rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none focus:border-olive"
                    placeholder="Enter your delivery address…"
                  />
                </div>
              )}
            </fieldset>
          </div>

          {/* Order summary */}
          <div className="sticky top-[110px] rounded-[18px] border border-line bg-white p-7 shadow-[var(--shadow-default)] max-[1024px]:static">
            <h3 className="mb-5 text-lg font-semibold">Order Summary</h3>
            <p className="mb-4 text-sm text-muted">
              Cart items will appear here when the cart is connected.
            </p>
            <div className="flex justify-between border-b border-dotted border-line py-[9px] text-[14.5px]">
              <span>Subtotal</span>
              <span>₦0</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-line py-[9px] text-[14.5px]">
              <span>Delivery Fee</span>
              <span>{deliveryFee > 0 ? Money(deliveryFee) : "Free"}</span>
            </div>
            <div className="mt-2.5 flex justify-between pt-4 text-lg font-extrabold text-forest">
              <span>Total</span>
              <span>{Money(deliveryFee)}</span>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
