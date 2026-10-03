"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

type PaymentState = "processing" | "success" | "failed";

function PaymentCallbackContent() {
  const [state, setState] = useState<PaymentState>("processing");
  const [orderNumber, setOrderNumber] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("reference");
    if (!ref) {
      setState("failed");
      return;
    }
    // Payment verification will be handled when backend is connected
    const timer = setTimeout(() => {
      setState("success");
      setOrderNumber("DG-000000");
    }, 2000);
    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <section className="px-6 py-24">
      <div className="container">
        <div className="mx-auto max-w-[560px] rounded-[18px] border border-line bg-white p-8 text-center shadow-[var(--shadow-default)]">
          {state === "processing" && (
            <div className="py-11 px-5">
              <Loader2
                size={58}
                className="mx-auto mb-[18px] animate-spin text-clay"
              />
              <h2 className="mb-2 text-[28px] font-semibold">
                Confirming Your Order...
              </h2>
              <p className="text-muted">
                Please wait while we verify your payment.
              </p>
            </div>
          )}

          {state === "success" && (
            <div className="py-11 px-5">
              <CheckCircle
                size={58}
                className="mx-auto mb-[18px] text-olive"
              />
              <h2 className="mb-2 text-[28px] font-semibold">
                Payment Successful!
              </h2>
              <p className="mb-4 text-muted">
                Your order has been placed successfully.
              </p>
              {orderNumber && (
                <div className="my-[18px] inline-block rounded-[18px] border-[1.5px] border-dashed border-olive bg-cream-deep px-[26px] py-[18px]">
                  <strong className="font-heading text-[22px] tracking-[1px] text-forest">
                    {orderNumber}
                  </strong>
                </div>
              )}
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/account/orders"
                  className="inline-flex items-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
                >
                  View Order
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-[9px] rounded-full border-2 border-forest bg-transparent px-7 py-[15px] text-sm font-bold text-forest transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-white"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {state === "failed" && (
            <div className="py-11 px-5">
              <XCircle
                size={58}
                className="mx-auto mb-[18px] text-danger"
              />
              <h2 className="mb-2 text-[28px] font-semibold">
                Payment Failed
              </h2>
              <p className="mb-6 text-muted">
                Something went wrong with your payment. Please try again.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/checkout"
                  className="inline-flex items-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
                >
                  Try Again
                </Link>
                <Link
                  href="/cart"
                  className="inline-flex items-center gap-[9px] rounded-full border-2 border-forest bg-transparent px-7 py-[15px] text-sm font-bold text-forest transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-white"
                >
                  Back to Cart
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense>
      <PaymentCallbackContent />
    </Suspense>
  );
}
