import { api } from "@/lib/api-client";

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authApi = {
  register: (data: RegisterData) => api.post("/api/auth/register", data),

  login: (data: LoginData) => api.post("/api/auth/login", data),

  logout: () => api.post("/api/auth/logout", {}),
};
