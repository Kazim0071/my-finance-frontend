"use client";

import { useEffect, useState } from "react";
import { dashboardApi } from "@/features/dashboard/api";
import { DashboardData } from "@/features/dashboard/types";
import { categoriesApi } from "@/features/categories/api";
import { Category } from "@/features/categories/types";
import Link from "next/link";
import { PredictionCard } from "@/features/ml/components/PredictionCard";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([dashboardApi.get(), categoriesApi.getAll()])
      .then(([dashboard, cats]) => {
        setData(dashboard);
        setCategories(cats);
      })
      .catch(() => setError("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <svg
          className="h-6 w-6 animate-spin text-emerald-600"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
          />
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Your financial summary at a glance.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Total income</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-emerald-600">
            Rs {data?.total_income.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Total expense</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f87171"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-red-500">
            Rs {data?.total_expense.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Balance</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 1v22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </span>
          </div>
          <p
            className={`mt-3 text-2xl font-bold ${(data?.balance ?? 0) >= 0 ? "text-slate-900" : "text-red-500"}`}
          >
            Rs {data?.balance.toLocaleString()}
          </p>
        </div>
      </div>

      <PredictionCard />

      {/* Recent transactions */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Recent transactions
          </h2>
          <Link
            href="/transactions"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            View all →
          </Link>
        </div>

        {data?.recent_transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl">💸</span>
            <p className="mt-3 text-sm font-medium text-slate-900">
              No transactions yet
            </p>
            <p className="mt-1 text-sm text-slate-400">
              <Link
                href="/dashboard/transactions"
                className="text-emerald-600 hover:underline"
              >
                Add your first transaction
              </Link>
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data?.recent_transactions.map((t) => {
              const category = categories.find((c) => c.id === t.category_id);
              const isIncome = t.transaction_type === "income";
              return (
                <div
                  key={t.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg"
                      style={{
                        backgroundColor: category?.color
                          ? `${category.color}20`
                          : "#f1f5f9",
                      }}
                    >
                      {category?.icon || "💳"}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {t.description || category?.name || "Transaction"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {t.transaction_date.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold ${isIncome ? "text-emerald-600" : "text-red-500"}`}
                  >
                    {isIncome ? "+" : "-"} Rs {t.amount.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
