import { getAccessToken, clearTokens } from "@/lib/auth/token-store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface ApiError {
  code: string;
  message: string;
}

export class ApiRequestError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) return false;
    const data = await res.json();
    if (data.success && data.data?.access_token) {
      const { setAccessToken } = await import("@/lib/auth/token-store");
      setAccessToken(data.data.access_token);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

async function request<T>(
  path: string,
  options: RequestInit & { params?: Record<string, string> } = {}
): Promise<T> {
  const { params, ...init } = options;

  let url = `${BASE_URL}${path}`;
  if (params) {
    const search = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
    );
    if (search.toString()) url += `?${search}`;
  }

  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  const token = getAccessToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let res = await fetch(url, {
    ...init,
    headers,
    credentials: "include",
  });

  if (res.status === 401 && token) {
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }
    const refreshed = await refreshPromise;
    if (refreshed) {
      const newToken = getAccessToken();
      if (newToken) headers.set("Authorization", `Bearer ${newToken}`);
      res = await fetch(url, { ...init, headers, credentials: "include" });
    } else {
      clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new ApiRequestError(401, "UNAUTHORIZED", "Session expired");
    }
  }

  const body = await res.json();

  if (!res.ok || !body.success) {
    const err = body.error as ApiError | undefined;
    throw new ApiRequestError(
      res.status,
      err?.code || "UNKNOWN",
      err?.message || "An error occurred"
    );
  }

  return body.data as T;
}

export const apiClient = {
  get: <T>(path: string, opts?: { params?: Record<string, string> }) =>
    request<T>(path, { method: "GET", ...opts }),

  post: <T>(path: string, data?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(path: string, data?: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
