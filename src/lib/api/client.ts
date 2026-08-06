import { forceLogout, shouldForceLogout } from "@/lib/auth/forceLogout";
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

function responseMessage(data: unknown, status: number) {
  return (
    (data && typeof data === "object" && "message" in data
      ? String((data as { message: string }).message)
      : null) ?? `Request failed (${status})`
  );
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

  if (shouldForceLogout(response.status, data, auth)) {
    forceLogout();
    throw new ApiError(responseMessage(data, response.status), response.status);
  }

  if (!response.ok) {
    throw new ApiError(responseMessage(data, response.status), response.status);
  }

  return data as T;
}
