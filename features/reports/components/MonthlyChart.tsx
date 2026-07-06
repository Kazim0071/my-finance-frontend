"use client";

import { useEffect, useState } from "react";
import { MonthlyChartData } from "../types";
import { reportsApi } from "../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function MonthlyChart() {
  const [data, setData] = useState<MonthlyChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    reportsApi
      .chartMonthly()
      .then((res) => setData(res))
      .catch(() => setError("Failed to load monthly data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm">
          <div className="mb-6 h-7 w-48 rounded-lg bg-gradient-to-r from-slate-200 to-slate-100 animate-pulse" />
          <div className="flex items-center justify-center py-16">
            <svg className="h-8 w-8 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-red-50/50 p-4 text-sm text-red-700 shadow-lg shadow-red-500/10">
          <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span className="font-medium">{error}</span>
        </div>
      </div>
    );
  }

  if (!data || data.labels.length === 0) {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-slate-50/50 py-20 px-4 text-center">
          <div className="mb-4 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 p-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
              <line x1="12" y1="2" x2="12" y2="22" />
              <polyline points="20 5 9 16 4 13" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No monthly data yet</h3>
          <p className="mt-2 text-sm text-slate-600 max-w-xs">
            Add transactions to see your monthly income, expenses, and savings analysis
          </p>
        </div>
      </div>
    );
  }

  // Recharts ke liye data format
  const chartData = data.labels.map((label, i) => ({
    month: label,
    Income: data.income[i],
    Expense: data.expense[i],
    Savings: data.savings[i],
  }));

  const totalIncome = data.income.reduce((a, b) => a + b, 0);
  const totalExpense = data.expense.reduce((a, b) => a + b, 0);
  const totalSavings = data.savings.reduce((a, b) => a + b, 0);

  return (
    <div className="animate-in fade-in duration-300 space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="animate-in fade-in duration-300 rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-emerald-50/50 p-4 shadow-sm hover:shadow-md transition-all duration-200" style={{ animationDelay: "0ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Total Income</p>
              <p className="mt-2 text-2xl font-bold text-emerald-700">Rs {totalIncome.toLocaleString()}</p>
            </div>
            <div className="rounded-lg bg-emerald-100/50 p-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="animate-in fade-in duration-300 rounded-xl border border-red-100 bg-gradient-to-br from-red-50 to-red-50/50 p-4 shadow-sm hover:shadow-md transition-all duration-200" style={{ animationDelay: "50ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">Total Expense</p>
              <p className="mt-2 text-2xl font-bold text-red-700">Rs {totalExpense.toLocaleString()}</p>
            </div>
            <div className="rounded-lg bg-red-100/50 p-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                <circle cx="12" cy="12" r="1" />
                <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 0l4.24-4.24M1 12h6m6 0h6m-9.78 7.78l-4.24-4.24m3.08 0l-4.24 4.24M23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="animate-in fade-in duration-300 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-50/50 p-4 shadow-sm hover:shadow-md transition-all duration-200" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Total Savings</p>
              <p className="mt-2 text-2xl font-bold text-blue-700">Rs {totalSavings.toLocaleString()}</p>
            </div>
            <div className="rounded-lg bg-blue-100/50 p-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-lg shadow-slate-200/10 backdrop-blur-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            Monthly income vs expense
          </h2>
          <p className="mt-1 text-sm text-slate-600">Track your financial performance over time</p>
        </div>

        <div className="rounded-xl bg-white/50 p-4 backdrop-blur-sm border border-slate-100/50">
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={chartData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `Rs ${v.toLocaleString()}`}
              />
              <Tooltip
                formatter={(value) => `Rs ${Number(value).toLocaleString()}`}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  background: "rgba(255, 255, 255, 0.95)",
                  fontSize: "13px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "13px", paddingTop: "20px" }}
              />
              <Bar dataKey="Income" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Expense" fill="#f87171" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Savings" fill="#60a5fa" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}