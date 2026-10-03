"use client";

import Link from "next/link";

export default function OrderDetailPage() {
  return (
    <>
      <nav className="mb-6 text-xs text-muted">
        <Link href="/account/orders" className="text-olive hover:text-forest">
          My Orders
        </Link>{" "}
        / <span>Order Detail</span>
      </nav>

      <div className="rounded-[18px] border border-line bg-white p-7 shadow-[var(--shadow-default)] max-[760px]:p-[18px]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2.5">
          <div>
            <h1 className="m-0 text-[22px] font-semibold">Order DG-000000</h1>
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

        {/* Items table */}
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

        {/* Summary */}
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
    </>
  );
}
