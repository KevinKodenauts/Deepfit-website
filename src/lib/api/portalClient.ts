import { portalUrl, PORTAL_CLIENT_ID } from "./config";
import { getAccessToken } from "@/lib/auth/session";
import { ApiError } from "./client";

type PortalRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  formFields?: Record<string, string | number | boolean | undefined | null>;
  auth?: boolean;
  token?: string;
  query?: Record<string, string | number>;
};

function applyAuthHeaders(
  headers: Record<string, string>,
  token: string | null | undefined,
  formData?: FormData
) {
  if (!token) return;

  headers.Authorization = `Bearer ${token}`;
  headers["X-Access-Token"] = token;
  formData?.append("accessToken", token);
}

export async function portalRequest<T>(
  path: string,
  {
    method = "GET",
    body,
    formFields,
    auth = false,
    token,
    query,
  }: PortalRequestOptions = {}
): Promise<T> {
  const url = portalUrl(path, query);
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  let requestBody: BodyInit | undefined;
  const authToken = auth ? token ?? getAccessToken() : null;

  if (formFields) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(formFields)) {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }

    applyAuthHeaders(headers, authToken, formData);
    requestBody = formData;
  } else {
    headers["Content-Type"] = "application/json";
    applyAuthHeaders(headers, authToken);

    if (body !== undefined) {
      requestBody = JSON.stringify(body);
    }
  }

  const response = await fetch(url, {
    method,
    headers,
    credentials: "include",
    body: requestBody,
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

export function portalCustomerFields(customerId: number) {
  return {
    customerId: String(customerId),
    clientId: String(PORTAL_CLIENT_ID),
  };
}
