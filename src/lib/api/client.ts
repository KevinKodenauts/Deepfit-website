import { getAccessToken } from "@/lib/auth/session";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean;
  token?: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiRequest<T>(
  url: string,
  { method = "GET", body, auth = false, token }: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const authToken = token ?? getAccessToken();
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
  }

  const response = await fetch(url, {
    method,
    headers,
    credentials: "include",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      (data && typeof data === "object" && "message" in data
        ? String((data as { message: string }).message)
        : null) ?? `Request failed (${response.status})`;
    throw new ApiError(message, response.status);
  }

  return data as T;
}
