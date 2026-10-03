"use client";

export default function TransactionsPage() {
  return (
    <>
      <h1 className="mb-6 text-[34px] font-semibold max-[760px]:text-[clamp(25px,8vw,34px)]">
        Transaction History
      </h1>

      <div className="rounded-[18px] border border-line bg-white p-[26px] shadow-[var(--shadow-default)] max-sm:p-4">
        <div className="overflow-x-auto rounded-[18px] border border-line">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                  Reference
                </th>
                <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                  Date
                </th>
                <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                  Type
                </th>
                <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                  Amount
                </th>
                <th className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={5}
                  className="px-[18px] py-10 text-center text-sm text-muted"
                >
                  No transactions yet. Your payment history will appear here.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
