"use client";

import { Loader2, Receipt } from "lucide-react";
import { StatusPill } from "@/components/account/status-pill";
import { EmptyState } from "@/components/ui/empty-state";
import { MoneyFromKobo, fmtDate } from "@/lib/utils/format";
import { usePayments } from "@/features/payments/hooks";

export default function TransactionsPage() {
  const { data, isPending } = usePayments(1, 50);
  const transactions = data?.data ?? [];

  return (
    <>
      <h1>Transaction History</h1>

      <div className="panel">
        {isPending ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Loader2
              size={26}
              className="animate-spin text-olive"
              aria-label="Loading your transactions"
            />
          </div>
        ) : transactions.length ? (
          <div className="table-wrap">
            <table className="account-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>For</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td data-label="Reference">{tx.reference}</td>
                    {/* A transaction pays for an order or a consultation, so
                        this column names whichever it was. */}
                    <td data-label="For">
                      {tx.purpose === "consultation"
                        ? `Consultation ${tx.booking_reference ?? ""}`.trim()
                        : (tx.order_number ?? "—")}
                    </td>
                    <td data-label="Amount">{MoneyFromKobo(tx.amount)}</td>
                    <td data-label="Method">{tx.method ?? "Paystack"}</td>
                    <td data-label="Status">
                      <StatusPill status={tx.status} />
                    </td>
                    <td data-label="Date">{fmtDate(tx.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={Receipt}
            title="No Transactions Yet"
            description="Your payment history will appear here after your first order or consultation."
          />
        )}
      </div>
    </>
  );
}
