import { api } from "@/lib/api-client";
import { CreateCategoryInput, UpdateCategoryInput } from "./types";

export const categoriesApi = {
  getAll: () => api.get("/api/categories"),
  create: (data: CreateCategoryInput) => api.post("/api/categories", data),
  update: (id: number, data: UpdateCategoryInput) =>
    api.put(`/api/categories/${id}`, data),
  delete: (id: number) => api.delete(`/api/categories/${id}`),
};
