import { TransactionList } from "@/features/transactions/components/TransactionList";
import React from "react";

export default function TransactionsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <TransactionList />
    </div>
  );
}
