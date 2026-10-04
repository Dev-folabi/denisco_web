"use client";

import { useState } from "react";
import Link from "next/link";
import { Info, Lock, ShoppingBasket } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyState } from "@/components/ui/empty-state";
import { MoneyFromKobo } from "@/lib/utils/format";
import { SITE } from "@/lib/constants";

interface CheckoutItem {
  id: string;
  name: string;
  unit: string;
  unit_price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const { isAuthenticated, user } = useAuth();
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );

  const cartItems: CheckoutItem[] = [];
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0,
  );
  const deliveryFee =
    deliveryMethod === "delivery" ? SITE.deliveryFee * 100 : 0;
  const total = subtotal + deliveryFee;

  if (!isAuthenticated) {
    return (
      <section className="section">
        <div
          className="container"
          style={{ maxWidth: "500px", textAlign: "center" }}
        >
          <div className="empty-state">
            <Lock size={48} className="empty-icon" />
            <h3>Please Log In to Checkout</h3>
            <p>
              You need a customer account to complete checkout and track your
              order.
            </p>
            <Link href="/login?redirect=checkout" className="btn btn-primary">
              Login
            </Link>{" "}
            <Link href="/register" className="btn btn-outline">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            icon={ShoppingBasket}
            title="Your cart is empty"
            description="Add products to your cart before proceeding to checkout."
            ctaLabel="Go to Shop"
            ctaHref="/shop"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1>Checkout</h1>
        <div className="cart-layout">
          <form noValidate>
            <fieldset>
              <legend>01 · Contact Details</legend>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="co-name">Full Name</label>
                  <input
                    className="form-control"
                    id="co-name"
                    required
                    defaultValue={
                      user
                        ? `${user.first_name} ${user.last_name}`.trim()
                        : ""
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="co-email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="co-email"
                    required
                    defaultValue={user?.email ?? ""}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="co-phone">Phone Number</label>
                <input
                  className="form-control"
                  id="co-phone"
                  required
                  defaultValue={user?.phone ?? ""}
                />
              </div>
            </fieldset>

            <fieldset>
              <legend>02 · Delivery Method</legend>
              <label
                className={`radio-card ${
                  deliveryMethod === "delivery" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="delivery-method"
                  value="delivery"
                  checked={deliveryMethod === "delivery"}
                  onChange={() => setDeliveryMethod("delivery")}
                />{" "}
                Home Delivery (₦2,500 flat fee within Abuja, demo rate)
              </label>
              <label
                className={`radio-card ${
                  deliveryMethod === "pickup" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="delivery-method"
                  value="pickup"
                  checked={deliveryMethod === "pickup"}
                  onChange={() => setDeliveryMethod("pickup")}
                />{" "}
                Farm Pickup (Free)
              </label>
              <div
                className="form-group"
                id="address-group"
                style={{
                  display: deliveryMethod === "pickup" ? "none" : "block",
                }}
              >
                <label htmlFor="co-address">Delivery Address</label>
                <textarea
                  className="form-control"
                  id="co-address"
                  rows={2}
                  placeholder="Enter your delivery address"
                />
              </div>
            </fieldset>
          </form>

          <CartSummary
            lines={cartItems.map((item) => ({
              label: `${item.name} × ${item.quantity}`,
              value: MoneyFromKobo(item.unit_price * item.quantity),
            }))}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            note={
              <>
                <Info size={12} /> Payment is simulated automatically when you
                place your order.
              </>
            }
            ctaLabel="Place Order"
            ctaIcon={<Lock size={14} />}
          />
        </div>
      </div>
    </section>
  );
}
