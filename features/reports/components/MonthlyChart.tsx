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
      <div className="flex items-center justify-center py-16">
        <svg className="h-6 w-6 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
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

  if (!data || data.labels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-16 text-center">
        <span className="text-4xl">📊</span>
        <p className="mt-3 text-sm font-medium text-slate-900">No data yet</p>
        <p className="mt-1 text-sm text-slate-400">Add transactions to see monthly report.</p>
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

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-base font-semibold text-slate-900">
        Monthly income vs expense
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
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
            formatter={(value: number) => `Rs ${value.toLocaleString()}`}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "13px",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "13px", paddingTop: "16px" }}
          />
          <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expense" fill="#f87171" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Savings" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}