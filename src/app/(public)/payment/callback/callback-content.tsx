"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { verifyPayment } from "@/features/payments/api";
import type { Payment } from "@/features/payments/types";
import { useAuth } from "@/lib/auth/auth-provider";

type PaymentState = "processing" | "success" | "failed";

export function PaymentCallbackContent({ reference }: { reference?: string }) {
  const { isLoading } = useAuth();
  const [state, setState] = useState<PaymentState>(
    reference ? "processing" : "failed",
  );
  const [payment, setPayment] = useState<Payment | null>(null);
  const [message, setMessage] = useState("");

  // React runs effects twice in development; verification is idempotent on the
  // server, but this keeps the page from firing two requests on every load.
  const verified = useRef(false);

  useEffect(() => {
    // The session is restored from the refresh cookie on load, so wait for
    // that before asking: an order payment is only readable by its owner.
    // A consultation fee paid by a guest has no session at all, which is why
    // this no longer waits to be authenticated — only to know either way.
    if (!reference || isLoading || verified.current) return;
    verified.current = true;

    let cancelled = false;

    (async () => {
      try {
        // The backend asks Paystack for the authoritative result: arriving
        // back here proves nothing about whether the payment succeeded.
        const result = await verifyPayment(reference);
        if (cancelled) return;

        setPayment(result);

        if (result.status === "successful") {
          setState("success");
          return;
        }

        setState("failed");
        setMessage(
          result.status === "pending" || result.status === "initialized"
            ? "Your payment has not been confirmed yet. If you completed it, refresh this page in a moment."
            : "The payment was not completed.",
        );
      } catch {
        if (!cancelled) {
          setState("failed");
          setMessage("We could not confirm this payment.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reference, isLoading]);

  const isConsultation = payment?.purpose === "consultation";

  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            maxWidth: "560px",
            width: "100%",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "24px",
            padding: "30px",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {state === "processing" && (
            <div className="pay-state loading">
              <Loader2 size={58} className="pay-icon block animate-spin" />
              <h3>Confirming Your Payment…</h3>
              <p className="muted">
                Please wait while we confirm your payment with Paystack.
              </p>
            </div>
          )}

          {state === "success" && isConsultation && (
            <div className="pay-state success">
              <CheckCircle size={58} className="pay-icon block" />
              <h3>Payment Successful!</h3>
              <p className="muted">
                Your consultation is confirmed. We will be in touch before your
                appointment.
              </p>
              <div className="order-ref-box">
                <small className="muted">Booking Reference</small>
                <br />
                <strong>{payment?.booking_reference}</strong>
              </div>
              <div style={{ marginTop: 22 }}>
                <Link
                  href={
                    payment?.booking_id
                      ? `/booking-confirmation/${payment.booking_id}?ref=${payment.booking_reference ?? ""}`
                      : "/account/consultations"
                  }
                  className="btn btn-primary"
                >
                  View Booking
                </Link>{" "}
                <Link href="/shop" className="btn btn-outline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {state === "success" && !isConsultation && (
            <div className="pay-state success">
              <CheckCircle size={58} className="pay-icon block" />
              <h3>Payment Successful!</h3>
              <p className="muted">Your order has been placed successfully.</p>
              <div className="order-ref-box">
                <small className="muted">Order Number</small>
                <br />
                <strong>{payment?.order_number}</strong>
              </div>
              <div style={{ marginTop: 22 }}>
                <Link
                  href={
                    payment?.order_id
                      ? `/account/orders/${payment.order_id}`
                      : "/account/orders"
                  }
                  className="btn btn-primary"
                >
                  View Order
                </Link>{" "}
                <Link href="/shop" className="btn btn-outline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {state === "failed" && (
            <div className="pay-state failed">
              <XCircle size={58} className="pay-icon block" />
              <h3>Payment Not Confirmed</h3>
              <p className="muted">
                {message || "This payment reference could not be confirmed."}
              </p>
              {/* A consultation keeps its slot when the fee is not paid, so
                  "try again" returns to the booking rather than to a cart. */}
              <div style={{ marginTop: 22 }}>
                {isConsultation ? (
                  <>
                    <Link
                      href={
                        payment?.booking_id
                          ? `/booking-confirmation/${payment.booking_id}?ref=${payment.booking_reference ?? ""}`
                          : "/account/consultations"
                      }
                      className="btn btn-primary"
                    >
                      Try Again
                    </Link>{" "}
                    <Link href="/consultation" className="btn btn-outline">
                      Back to Consultations
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={
                        payment?.order_id
                          ? `/order-confirmation/${payment.order_id}`
                          : "/cart"
                      }
                      className="btn btn-primary"
                    >
                      Try Again
                    </Link>{" "}
                    <Link href="/shop" className="btn btn-outline">
                      Back to Shop
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
