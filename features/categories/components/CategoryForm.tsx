import React from "react";
import { useForm } from "react-hook-form";
import {
  categorySchema,
  type CategoryForm,
  type CategoryFormInput,
} from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface CategoryFormProps {
  onSubmit: (data: CategoryForm) => Promise<void>;
  defaultValues?: Partial<CategoryFormInput>;
  isSubmitting: boolean;
}

export function CategoryForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CategoryFormInput, unknown, CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      icon: "",
      color: "#10b981",
      ...defaultValues,
    },
  });

  const iconValue = watch("icon");
  const colorValue = watch("color");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name field */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Category name
        </label>
        <input
          type="text"
          id="name"
          placeholder="e.g. Food, Rent, Salary"
          {...register("name")}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Icon field */}
      <div>
        <label
          htmlFor="icon"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Icon <span className="text-slate-400 font-normal">(emoji)</span>
        </label>
        <div className="flex items-center gap-3">
          {/* Preview */}
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xl">
            {iconValue || "?"}
          </span>
          <input
            id="icon"
            type="text"
            placeholder="Paste an emoji e.g. 🍔"
            {...register("icon")}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>
      </div>

      {/* Color field */}
      <div>
        <label
          htmlFor="color"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Color
        </label>
        <div className="flex items-center gap-3">
          <input
            id="color"
            type="color"
            {...register("color")}
            className="h-10 w-10 shrink-0 cursor-pointer rounded-lg border border-slate-200 bg-white p-1 shadow-sm outline-none"
          />
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 font-mono">
            {colorValue}
          </span>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
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
        )}
        {isSubmitting
          ? "Saving..."
          : defaultValues
            ? "Update category"
            : "Add category"}
      </button>
    </form>
  );
}
