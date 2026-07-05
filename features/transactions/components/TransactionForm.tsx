"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, type TransactionForm } from "../schema";
import { Category } from "@/features/categories/types";

interface TransactionFormProps {
  onSubmit: (data: TransactionForm) => Promise<void>;
  defaultValues?: Partial<TransactionForm>;
  isSubmitting: boolean;
  categories: Category[];
}

export function TransactionForm({
  onSubmit,
  defaultValues,
  isSubmitting,
  categories,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransactionForm>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transaction_type: "expense",
      amount: undefined,
      category_id: undefined,
      description: "",
      transaction_date: new Date().toISOString().slice(0, 10),
      ...defaultValues,
    },
  });

  const selectedType = watch("transaction_type");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      
      {/* Transaction type toggle */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["expense", "income"] as const).map((type) => (
            <label
              key={type}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition ${
                selectedType === type
                  ? type === "income"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-red-400 bg-red-50 text-red-600"
                  : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                value={type}
                {...register("transaction_type")}
                className="sr-only"
              />
              {type === "income" ? "↑ Income" : "↓ Expense"}
            </label>
          ))}
        </div>
        {errors.transaction_type && (
          <p className="mt-1.5 text-sm text-red-600">{errors.transaction_type.message}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label
          htmlFor="amount"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Amount
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm font-medium">
            Rs
          </span>
          <input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount", { valueAsNumber: true })}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>
        {errors.amount && (
          <p className="mt-1.5 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      {/* Category dropdown */}
      <div>
        <label
          htmlFor="category_id"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Category
        </label>
        <select
          id="category_id"
          {...register("category_id", { valueAsNumber: true })}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon ? `${cat.icon} ` : ""}{cat.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="mt-1.5 text-sm text-red-600">{errors.category_id.message}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="transaction_date"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Date
        </label>
        <input
          id="transaction_date"
          type="date"
          {...register("transaction_date")}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
        />
        {errors.transaction_date && (
          <p className="mt-1.5 text-sm text-red-600">{errors.transaction_date.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Description{" "}
          <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="Add a note..."
          {...register("description")}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
          </svg>
        )}
        {isSubmitting ? "Saving..." : defaultValues ? "Update transaction" : "Add transaction"}
      </button>
    </form>
  );
}