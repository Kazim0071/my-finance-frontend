const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiClient(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

export const api = {
  get: (endpoint: string) => apiClient(endpoint, { method: "GET" }),

  post: (endpoint: string, body: unknown) =>
    apiClient(endpoint, { method: "POST", body: JSON.stringify(body) }),

  put: (endpoint: string, body: unknown) =>
    apiClient(endpoint, { method: "PUT", body: JSON.stringify(body) }),

  delete: (endpoint: string) => apiClient(endpoint, { method: "DELETE" }),
};
