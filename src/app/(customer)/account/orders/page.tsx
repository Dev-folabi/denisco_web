"use client";

import Link from "next/link";

export default function MyOrdersPage() {
  return (
    <>
      <h1 className="mb-6 text-[34px] font-semibold max-[760px]:text-[clamp(25px,8vw,34px)]">
        My Orders
      </h1>

      <div className="rounded-[18px] border border-line bg-white p-[26px] shadow-[var(--shadow-default)] max-sm:p-4">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2.5">
          <h3 className="m-0 text-[17px] font-semibold">All Orders</h3>
        </div>

        <div className="overflow-x-auto rounded-[18px] border border-line">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                  Order No.
                </th>
                <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                  Date
                </th>
                <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                  Items
                </th>
                <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                  Total
                </th>
                <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                  Payment
                </th>
                <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                  Status
                </th>
                <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={7}
                  className="px-[18px] py-10 text-center text-sm text-muted"
                >
                  No orders yet. Your orders will appear here.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
