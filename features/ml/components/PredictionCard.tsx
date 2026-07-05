"use client";

import { useEffect, useState } from "react";
import { ExpensePrediction } from "../types";
import { mlApi } from "../api";

export function PredictionCard() {
  const [data, setData] = useState<ExpensePrediction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    mlApi
      .predict()
      .then((res) => setData(res))
      .catch(() => setError("Failed to load prediction"))
      .finally(() => setLoading(false));
  }, []);

  const confidenceConfig = {
    none: { label: "No data", color: "text-slate-400", bg: "bg-slate-100" },
    low: { label: "Low confidence", color: "text-amber-600", bg: "bg-amber-50" },
    medium: { label: "Medium confidence", color: "text-blue-600", bg: "bg-blue-50" },
    high: { label: "High confidence", color: "text-emerald-600", bg: "bg-emerald-50" },
  };

  const config = data ? confidenceConfig[data.confidence] : null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          Next month prediction
        </p>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-3 flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin text-purple-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
          </svg>
          <span className="text-sm text-slate-400">Calculating...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="mt-3 text-sm text-red-500">{error}</p>
      )}

      {/* Data */}
      {!loading && data && (
        <>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            Rs {data.predicted_expense.toLocaleString()}
          </p>

          {/* Confidence badge */}
          {config && (
            <span className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}>
              {config.label}
            </span>
          )}

          {/* Message */}
          <p className="mt-3 text-xs text-slate-400">{data.message}</p>
        </>
      )}
    </div>
  );
}