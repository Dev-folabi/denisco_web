"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

type PaymentState = "processing" | "success" | "failed";

export function PaymentCallbackContent({ reference }: { reference?: string }) {
  const ref = reference;
  const [state, setState] = useState<PaymentState>(
    ref ? "processing" : "failed",
  );
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    if (!ref) return;
    // Payment verification will be handled when backend is connected
    const timer = setTimeout(() => {
      setState("success");
      setOrderNumber("DG-000000");
    }, 2000);
    return () => clearTimeout(timer);
  }, [ref]);

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
              <h3>Confirming Your Order…</h3>
              <p className="muted">
                Please wait while payment is simulated automatically.
              </p>
            </div>
          )}

          {state === "success" && (
            <div className="pay-state success">
              <CheckCircle size={58} className="pay-icon block" />
              <h3>Payment Successful!</h3>
              <p className="muted">Your order has been placed successfully.</p>
              <div className="order-ref-box">
                <small className="muted">Order Number</small>
                <br />
                <strong>{orderNumber}</strong>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Link href="/account/orders" className="btn btn-primary">
                  View Order
                </Link>
                <Link href="/shop" className="btn btn-outline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {state === "failed" && (
            <div className="pay-state fail">
              <XCircle size={58} className="pay-icon block" />
              <h3>Payment Failed</h3>
              <p className="muted">
                Your simulated payment could not be completed. No charge was
                made and your cart is unaffected.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Link href="/checkout" className="btn btn-primary">
                  Try Again
                </Link>
                <Link href="/" className="btn btn-outline">
                  Cancel
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
