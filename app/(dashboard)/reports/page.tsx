"use client";

import { MonthlyChart } from "@/features/reports/components/MonthlyChart";
import { CategoryChart } from "@/features/reports/components/CategoryChart";
import { reportsApi } from "@/features/reports/api";
import { useState } from "react";

export default function ReportsPage() {
  const [downloading, setDownloading] = useState(false);

  async function handleExport() {
    setDownloading(true);
    try {
      const blob = await reportsApi.exportCsv();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transactions.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Export failed");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Reports
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Visual breakdown of your finances.
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={downloading}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {downloading ? "Exporting..." : "Export CSV"}
        </button>
      </div>

      {/* Charts */}
      <div className="flex flex-col gap-6">
        <MonthlyChart />
        <CategoryChart />
      </div>
    </div>
  );
}