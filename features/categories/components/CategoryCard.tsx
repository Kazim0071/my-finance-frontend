import React from "react";
import { Category } from "../types";

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryCard({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Left: icon + name */}
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl"
          style={{
            backgroundColor: category.color ? `${category.color}20` : "#f1f5f9",
          }}
        >
          {category.icon || "📁"}
        </span>
        <div>
          <p className="text-sm font-medium text-slate-900">{category.name}</p>
          <p className="text-xs text-slate-400">
            {category.created_at.slice(0, 10)}
          </p>
        </div>
      </div>

      {/* Right: color dot + edit/delete */}
      <div className="flex items-center gap-2">
        {/* Color indicator */}
        <span
          className="h-3 w-3 rounded-full border border-white shadow-sm"
          style={{ backgroundColor: category.color || "#10b981" }}
        />

        {/* Edit button */}
        <button
          onClick={() => onEdit(category)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Edit category"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>

        {/* Delete button */}
        <button
          onClick={() => onDelete(category)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
          aria-label="Delete category"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
