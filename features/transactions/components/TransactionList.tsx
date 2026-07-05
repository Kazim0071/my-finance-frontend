"use client";

import { useState, useEffect } from "react";
import { Transaction, TransactionType } from "../types";
import { TransactionForm } from "./TransactionForm";
import { TransactionCard } from "./TransactionCard";
import { transactionsApi } from "../api";
import { categoriesApi } from "@/features/categories/api";
import { Category } from "@/features/categories/types";
import { TransactionForm as TransactionFormValues } from "../schema";

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter state
  const [typeFilter, setTypeFilter] = useState<TransactionType | "">("");

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch transactions + categories
  useEffect(() => {
    Promise.all([
      transactionsApi.getAll(typeFilter ? { type: typeFilter } : undefined),
      categoriesApi.getAll(),
    ])
      .then(([txns, cats]) => {
        setTransactions(txns);
        setCategories(cats);
      })
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, [typeFilter]);

  // Add or Edit
  async function handleSubmit(data: TransactionFormValues) {
    setIsSubmitting(true);
    try {
      if (editingTransaction) {
        const res = await transactionsApi.update(editingTransaction.id, data);
        setTransactions((prev) =>
          prev.map((t) => (t.id === editingTransaction.id ? res.transaction : t))
        );
      } else {
        const res = await transactionsApi.create(data);
        setTransactions((prev) => [res.transaction, ...prev]);
      }
      setShowForm(false);
      setEditingTransaction(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Delete
  async function handleDelete() {
    if (!deletingTransaction) return;
    setIsDeleting(true);
    try {
      await transactionsApi.delete(deletingTransaction.id);
      setTransactions((prev) => prev.filter((t) => t.id !== deletingTransaction.id));
      setDeletingTransaction(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  }

  function openEdit(transaction: Transaction) {
    setEditingTransaction(transaction);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingTransaction(null);
  }

  // Summary
  const totalIncome = transactions
    .filter((t) => t.transaction_type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.transaction_type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Transactions
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your income and expenses.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-700"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add transaction
        </button>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Total income</p>
          <p className="mt-1 text-lg font-bold text-emerald-600">
            + Rs {totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Total expense</p>
          <p className="mt-1 text-lg font-bold text-red-500">
            - Rs {totalExpense.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm col-span-2 sm:col-span-1">
          <p className="text-xs font-medium text-slate-500">Balance</p>
          <p className={`mt-1 text-lg font-bold ${totalIncome - totalExpense >= 0 ? "text-slate-900" : "text-red-500"}`}>
            Rs {(totalIncome - totalExpense).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-4 flex gap-2">
        {(["", "income", "expense"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              typeFilter === type
                ? "bg-emerald-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {type === "" ? "All" : type === "income" ? "Income" : "Expense"}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
          <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <svg className="h-6 w-6 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
          </svg>
        </div>
      )}

      {/* Empty state */}
      {!loading && transactions.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-16 text-center">
          <span className="text-4xl">💸</span>
          <p className="mt-3 text-sm font-medium text-slate-900">No transactions yet</p>
          <p className="mt-1 text-sm text-slate-400">Add your first transaction to get started.</p>
        </div>
      )}

      {/* Transaction list */}
      {!loading && transactions.length > 0 && (
        <div className="flex flex-col gap-3">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              categories={categories}
              onEdit={openEdit}
              onDelete={setDeletingTransaction}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {editingTransaction ? "Edit transaction" : "Add transaction"}
              </h2>
              <button
                onClick={closeForm}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate.600"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <TransactionForm
              onSubmit={handleSubmit}
              categories={categories}
              defaultValues={
                editingTransaction
                  ? {
                      transaction_type: editingTransaction.transaction_type,
                      amount: editingTransaction.amount,
                      category_id: editingTransaction.category_id ?? undefined,
                      description: editingTransaction.description ?? "",
                      transaction_date: editingTransaction.transaction_date.slice(0, 10),
                    }
                  : undefined
              }
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deletingTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-900">Delete transaction?</h2>
            <p className="mt-2 text-sm text-slate-500">
              Ye transaction permanently delete ho jayegi. Ye action undo nahi ho sakta.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeletingTransaction(null)}
                className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
              >
                {isDeleting && (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
                  </svg>
                )}
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}