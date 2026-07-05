import { api } from "@/lib/api-client";

export const dashboardApi = {
  get: () => api.get("/api/dashboard"),
};