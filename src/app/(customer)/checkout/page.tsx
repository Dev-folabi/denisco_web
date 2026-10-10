"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Info, Loader2, Lock, ShoppingBasket } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyState } from "@/components/ui/empty-state";
import { MoneyFromKobo } from "@/lib/utils/format";
import { SITE } from "@/lib/constants";
import { useToast } from "@/components/ui/toast";
import { ApiRequestError } from "@/lib/api/client";
import { checkoutSchema, firstIssue } from "@/lib/validation/schemas";
import { useCart } from "@/features/cart/hooks";
import { useCreateOrder } from "@/features/orders/hooks";
import { useInitializePayment } from "@/features/payments/hooks";

export default function CheckoutPage() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const { data: cart, isPending: cartPending } = useCart();
  const createOrder = useCreateOrder();
  const initializePayment = useInitializePayment();

  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  // The contact fields show the account's details until the customer edits
  // one, and only the edits are held in state. Deriving them rather than
  // copying the account into state on load means the form is correct on its
  // first render — even when the session resolves after the page has painted —
  // and an untouched field still submits the value the customer can see.
  const [edits, setEdits] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  const name =
    edits.name ??
    (user ? `${user.first_name} ${user.last_name}`.trim() : "");
  const email = edits.email ?? user?.email ?? "";
  const phone = edits.phone ?? user?.phone ?? "";

  const setName = (value: string) =>
    setEdits((current) => ({ ...current, name: value }));
  const setEmail = (value: string) =>
    setEdits((current) => ({ ...current, email: value }));
  const setPhone = (value: string) =>
    setEdits((current) => ({ ...current, phone: value }));

  const items = cart?.items ?? [];
  const subtotal = cart?.subtotal ?? 0;
  const deliveryFee =
    deliveryMethod === "delivery" ? SITE.deliveryFee * 100 : 0;
  const total = subtotal + deliveryFee;

  const submitting = createOrder.isPending || initializePayment.isPending;

  /**
   * Places the order, then hands the customer to Paystack.
   *
   * The order is created first so the stock is reserved before payment
   * begins; if payment cannot be started the order is still there, unpaid,
   * and the customer can retry from their account.
   */
  async function placeOrder() {
    setError("");

    const parsed = checkoutSchema.safeParse({
      name,
      email,
      phone,
      delivery_method: deliveryMethod,
      address,
    });

    if (!parsed.success) {
      setError(firstIssue(parsed.error));
      return;
    }

    try {
      const order = await createOrder.mutateAsync({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        delivery_method: parsed.data.delivery_method,
        address:
          parsed.data.delivery_method === "delivery"
            ? parsed.data.address
            : undefined,
      });

      try {
        const payment = await initializePayment.mutateAsync(order.id);
        window.location.href = payment.authorization_url;
      } catch (paymentError) {
        // The order exists and is holding stock, so send the customer to it
        // rather than leaving them on a form that looks like it failed.
        toast(
          "error",
          paymentError instanceof ApiRequestError
            ? paymentError.message
            : "Could not start the payment.",
        );
        router.push(`/order-confirmation/${order.id}`);
      }
    } catch (orderError) {
      setError(
        orderError instanceof ApiRequestError
          ? orderError.message
          : "Could not place your order. Please try again.",
      );
    }
  }

  if (isLoading || (isAuthenticated && cartPending)) {
    return (
      <section className="section">
        <div className="container flex min-h-[40vh] items-center justify-center">
          <Loader2
            size={28}
            className="animate-spin text-olive"
            aria-label="Loading checkout"
          />
        </div>
      </section>
    );
  }

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
            <Link href="/login?redirect=/checkout" className="btn btn-primary">
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

  if (items.length === 0) {
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

        {error && (
          <div className="mb-5 rounded-[10px] bg-badge-red-bg px-4 py-3 text-sm font-bold text-badge-red-text">
            {error}
          </div>
        )}

        <div className="cart-layout">
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              placeOrder();
            }}
          >
            <fieldset>
              <legend>01 · Contact Details</legend>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="co-name">Full Name</label>
                  <input
                    className="form-control"
                    id="co-name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="co-email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="co-email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="co-phone">Phone Number</label>
                <input
                  className="form-control"
                  id="co-phone"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
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
                Home Delivery (₦2,500 flat fee within Abuja)
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
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>
            </fieldset>
          </form>

          <CartSummary
            lines={items.map((item) => ({
              label: `${item.name} × ${item.quantity}`,
              value: MoneyFromKobo(item.line_total),
            }))}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            note={
              <>
                <Info size={12} /> You will be taken to Paystack to complete
                payment securely.
              </>
            }
            ctaLabel={submitting ? "Placing Order…" : "Place Order"}
            ctaIcon={<Lock size={14} />}
            onCtaClick={placeOrder}
            disabled={submitting || cart?.has_unavailable_items}
          />
        </div>
      </div>
    </section>
  );
}
