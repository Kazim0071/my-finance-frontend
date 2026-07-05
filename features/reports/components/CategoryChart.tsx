"use client";

import { useEffect, useState, useMemo } from "react";
import { CategoryChartData } from "../types";
import { CategoryBreakdown } from "../types";
import { reportsApi } from "../api";
import { categoriesApi } from "@/features/categories/api";
import { Category } from "@/features/categories/types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FALLBACK_COLORS = [
  "#10b981",
  "#f87171",
  "#60a5fa",
  "#fbbf24",
  "#a78bfa",
  "#fb923c",
  "#34d399",
  "#f472b6",
];

export function CategoryChart() {
  const [data, setData] = useState<CategoryBreakdown[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([reportsApi.categories(), categoriesApi.getAll()])
      .then(([breakdown, cats]) => {
        setData(breakdown);
        setCategories(cats);
      })
      .catch(() => setError("Failed to load category data"))
      .finally(() => setLoading(false));
  }, []);

  // Calculate chart data and total BEFORE any conditional returns
  const chartData = useMemo(() => {
    return data.map((item, i) => {
      const category = categories.find((c) => c.id === item.category_id);
      return {
        name: category?.name || `Category ${item.category_id}`,
        value: item.amount,
        percentage: item.percentage,
        color: category?.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length],
      };
    });
  }, [data, categories]);

  const totalAmount = useMemo(
    () => chartData.reduce((sum, item) => sum + item.value, 0),
    [chartData]
  );

  if (loading) {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm">
          <div className="mb-6 h-6 w-40 rounded-lg bg-gradient-to-r from-slate-200 to-slate-100 animate-pulse" />
          <div className="flex items-center justify-center py-16">
            <svg
              className="h-8 w-8 animate-spin text-emerald-600"
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

  if (data.length === 0) {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-slate-50/50 py-20 px-4 text-center">
          <div className="mb-4 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 p-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No expense data yet</h3>
          <p className="mt-2 text-sm text-slate-600 max-w-xs">
            Add expense transactions to see your spending breakdown by category
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-lg shadow-slate-200/10 backdrop-blur-sm">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Expense breakdown by category
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Total spending: <span className="font-semibold text-emerald-600">Rs {totalAmount.toLocaleString()}</span>
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-xl bg-white/50 p-4 backdrop-blur-sm border border-slate-100/50">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={60}
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `Rs ${value.toLocaleString()}`,
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  background: "rgba(255, 255, 255, 0.95)",
                  fontSize: "13px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown cards */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {chartData.map((item, i) => {
            const barWidth = (item.value / totalAmount) * 100;
            return (
              <div
                key={i}
                className="animate-in fade-in duration-300 rounded-lg border border-slate-100/50 bg-white/50 p-3.5 backdrop-blur-sm hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-3.5 w-3.5 rounded-full shadow-md"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-slate-900">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-100/50 px-2 py-1 rounded-full">
                    {item.percentage}%
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-gradient-to-r"
                      style={{
                        width: `${barWidth}%`,
                        backgroundImage: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-slate-600">Rs {item.value.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
