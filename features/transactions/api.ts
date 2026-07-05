import { api } from "@/lib/api-client";
import { CreateTransactionInput, UpdateTransactionInput } from "./types";

interface TransactionFilters {
  type?: "income" | "expense";
  category_id?: number;
}

export const transactionsApi = {
  getAll: (filters?: TransactionFilters) => {
    const params = new URLSearchParams();
    if (filters?.type) params.append("type", filters.type);
    if (filters?.category_id)
      params.append("category_id", String(filters.category_id));
    const query = params.toString();
    return api.get(`/api/transactions${query ? `?${query}` : ""}`);
  },
  create: (data: CreateTransactionInput) => api.post("/api/transactions", data),
  update: (id: number, data: UpdateTransactionInput) =>
    api.put(`/api/transactions/${id}`, data),
  delete: (id: number) => api.delete(`/api/transactions/${id}`),
};
