import { api } from "@/lib/api-client";
import { RegisterData, LoginData } from "./types";

export const authApi = {
  register: (data: RegisterData) => api.post("/api/auth/register", data),
  login: (data: LoginData) => api.post("/api/auth/login", data),
  logout: () => api.post("/api/auth/logout", {}),
};
