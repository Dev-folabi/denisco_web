import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmationPage() {
  return (
    <section className="px-6 py-24 max-sm:py-16">
      <div className="mx-auto max-w-[760px]">
        {/* Success state */}
        <div className="mb-7 py-11 text-center">
          <CheckCircle
            size={58}
            className="mx-auto mb-[18px] text-olive"
          />
          <h2 className="mb-2 text-[28px] font-semibold">
            Thank You! Your Order Is Confirmed
          </h2>
          <p className="text-muted">
            A confirmation has been recorded to your account.
          </p>
        </div>

        {/* Order detail card */}
        <div className="mb-7 rounded-[18px] border border-line bg-white p-7 shadow-[var(--shadow-default)] max-[760px]:p-[18px]">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2.5">
            <div>
              <h3 className="m-0 text-[22px] font-semibold">Order DG-000000</h3>
              <span className="text-xs text-muted">Placed on —</span>
            </div>
            <div className="flex gap-2">
              <span className="inline-block rounded-full bg-badge-green-bg px-[13px] py-[5px] text-[11.5px] font-extrabold text-badge-green-text">
                Paid
              </span>
              <span className="inline-block rounded-full bg-badge-blue-bg px-[13px] py-[5px] text-[11.5px] font-extrabold text-badge-blue-text">
                Processing
              </span>
            </div>
          </div>

          <div className="mb-6 overflow-x-auto rounded-[18px] border border-line">
            <table className="w-full min-w-[480px] border-collapse">
              <thead>
                <tr>
                  <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                    Product
                  </th>
                  <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                    Price
                  </th>
                  <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                    Qty
                  </th>
                  <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={4}
                    className="px-[18px] py-6 text-center text-sm text-muted"
                  >
                    Order items will load from API.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="ml-auto max-w-[300px]">
            <div className="flex justify-between border-b border-dotted border-line py-[9px] text-[14.5px]">
              <span>Subtotal</span>
              <span>₦0</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-line py-[9px] text-[14.5px]">
              <span>Delivery Fee</span>
              <span>₦0</span>
            </div>
            <div className="mt-2.5 flex justify-between pt-4 text-lg font-extrabold text-forest">
              <span>Total</span>
              <span>₦0</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
          >
            Go to My Orders
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-[9px] rounded-full border-2 border-forest bg-transparent px-7 py-[15px] text-sm font-bold text-forest transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
