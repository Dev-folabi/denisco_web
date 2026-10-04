"use client";

import { Receipt } from "lucide-react";
import { StatusPill } from "@/components/account/status-pill";
import type { Transaction } from "@/components/account/types";
import { EmptyState } from "@/components/ui/empty-state";
import { MoneyFromKobo, fmtDate } from "@/lib/utils/format";

const transactions: Transaction[] = [];

export default function TransactionsPage() {
  return (
    <>
      <h1>Transaction History</h1>

      <div className="panel">
        {transactions.length ? (
          <div className="table-wrap">
            <table className="account-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Order No.</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td data-label="Reference">{tx.ref}</td>
                    <td data-label="Order">{tx.order_number}</td>
                    <td data-label="Amount">{MoneyFromKobo(tx.amount)}</td>
                    <td data-label="Method">{tx.method}</td>
                    <td data-label="Status">
                      <StatusPill status={tx.status} />
                    </td>
                    <td data-label="Date">{fmtDate(tx.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={Receipt}
            title="No Transactions Yet"
            description="Your payment history will appear here after your first order."
          />
        )}
      </div>
    </>
  );
}
