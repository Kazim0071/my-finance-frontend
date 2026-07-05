import { api } from "@/lib/api-client";

export const reportsApi = {
  monthly: () => api.get("/api/reports/monthly"),
  categories: () => api.get("/api/reports/categories"),
  chartMonthly: () => api.get("/api/reports/charts/monthly"),
  chartCategories: () => api.get("/api/reports/charts/categories"),
  exportCsv: () =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports/export`, {
      credentials: "include",
    }).then((res) => res.blob()),
};
