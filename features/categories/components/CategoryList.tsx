"use client";

import { useState, useEffect, useMemo } from "react";
import { Category } from "../types";
import { CategoryForm } from "./CategoryForm";
import { CategoryCard } from "./CategoryCard";
import { categoriesApi } from "../api";
import { CategoryForm as CategoryFormValues } from "../schema";

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "recent">("name");

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Delete confirm state
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter and sort categories
  const filteredCategories = useMemo(() => {
    let filtered = categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [categories, searchQuery, sortBy]);

  // Fetch all categories
  function refetchCategories() {
    setLoading(true);
    setError("");
    categoriesApi
      .getAll()
      .then((data) => setCategories(data))
      .catch(() => setError("Failed to load categories"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    refetchCategories();
  }, []);

  // Add or Edit submit
  async function handleSubmit(data: CategoryFormValues) {
    setIsSubmitting(true);
    try {
      if (editingCategory) {
        const res = await categoriesApi.update(editingCategory.id, data);
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? res.category : c))
        );
      } else {
        const res = await categoriesApi.create(data);
        setCategories((prev) => [...prev, res.category]);
      }
      setShowForm(false);
      setEditingCategory(null);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Delete confirm
  async function handleDelete() {
    if (!deletingCategory) return;
    setIsDeleting(true);
    try {
      await categoriesApi.delete(deletingCategory.id);
      setCategories((prev) => prev.filter((c) => c.id !== deletingCategory.id));
      setDeletingCategory(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  }

  function openEdit(category: Category) {
    setEditingCategory(category);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingCategory(null);
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Categories
              </h1>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-sm font-bold text-white">
                {categories.length}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Manage your income and expense categories effortlessly
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setError("");
              setEditingCategory(null);
            }}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:shadow-emerald-500/50 hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add category
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-500 transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "recent")}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition-all duration-200 hover:border-slate-300 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
          >
            <option value="name">Sort by name</option>
            <option value="recent">Sort by recent</option>
          </select>
        </div>
      </div>

      {/* Error Alert with Animation */}
      {error && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-red-50/50 p-4 text-sm text-red-700 shadow-lg shadow-red-500/10 backdrop-blur-sm">
            <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div className="flex flex-1 items-center justify-between">
              <span className="font-medium">{error}</span>
              {!loading && (
                <button
                  onClick={refetchCategories}
                  className="ml-3 flex-shrink-0 font-semibold text-red-600 hover:text-red-700 transition-colors"
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading State with Skeleton */}
      {loading && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && categories.length === 0 && !searchQuery && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-slate-50/50 py-20 px-4 text-center">
          <div className="mb-4 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 p-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No categories yet</h3>
          <p className="mt-2 text-sm text-slate-600 max-w-xs">
            Start by creating your first category to organize your transactions
          </p>
          <button
            onClick={() => {
              setShowForm(true);
              setError("");
            }}
            className="mt-6 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:shadow-emerald-500/50 hover:-translate-y-0.5"
          >
            Create your first category
          </button>
        </div>
      )}

      {/* No Search Results */}
      {!loading && filteredCategories.length === 0 && searchQuery && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-slate-50/50 py-16 px-4 text-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <h3 className="text-lg font-semibold text-slate-900">No categories found</h3>
          <p className="mt-2 text-sm text-slate-600">
            Try adjusting your search query
          </p>
        </div>
      )}

      {/* Category Cards Grid */}
      {!loading && filteredCategories.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm text-slate-600">
            <span className="font-medium">{filteredCategories.length}</span>
            <span>
              {filteredCategories.length === 1 ? "category" : "categories"} found
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max">
            {filteredCategories.map((category, index) => (
              <div
                key={category.id}
                className="animate-in fade-in duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CategoryCard
                  category={category}
                  onEdit={openEdit}
                  onDelete={setDeletingCategory}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Modal with Glassmorphism */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md animate-in fade-in zoom-in duration-300 rounded-2xl border border-white/20 bg-white/95 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingCategory ? "Edit category" : "Create category"}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {editingCategory ? "Update your category details" : "Add a new category"}
                </p>
              </div>
              <button
                onClick={closeForm}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-600"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <CategoryForm
              onSubmit={handleSubmit}
              defaultValues={
                editingCategory
                  ? {
                      name: editingCategory.name,
                      icon: editingCategory.icon ?? "",
                      color: editingCategory.color ?? "#10b981",
                    }
                  : undefined
              }
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}

      {/* Delete Confirm Modal with Glassmorphism */}
      {deletingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm animate-in fade-in zoom-in duration-300 rounded-2xl border border-white/20 bg-white/95 p-6 shadow-2xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-red-100 shadow-lg shadow-red-500/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Delete category?</h2>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{deletingCategory.name}</span> will be permanently deleted. This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeletingCategory(null)}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all duration-200 hover:shadow-red-500/50 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
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