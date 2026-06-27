const DEFAULT_API_HOST =
  process.env.NEXT_PUBLIC_API_URL ?? "https://apideepfit.gaamferi.com";

export const API_BASE_URL =
  typeof window !== "undefined" ? "" : DEFAULT_API_HOST;

export const REST_API = `${API_BASE_URL}/api`;
export const CUSTOMER_API = `${API_BASE_URL}/api/customer`;
export const CUSTOMER_PORTAL = `${API_BASE_URL}/api/customerportal`;
export const EXERCISE_API = `${API_BASE_URL}/api/exercise`;
export const BLOG_API = `${API_BASE_URL}/api/blog`;

export const PORTAL_CLIENT_ID = 1;
export const PORTAL_IP_ADDRESS = "127.0.0.1";

/** Django blog routes require trailing slashes (see Backend/blog/urls.py). */
export function blogUrl(
  path: string,
  query?: Record<string, string | number | boolean | undefined>
) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const withSlash = normalizedPath.endsWith("/")
    ? normalizedPath
    : `${normalizedPath}/`;
  const params = new URLSearchParams();

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== "") {
        params.set(key, String(value));
      }
    }
  }

  const qs = params.toString();
  return `${BLOG_API}${withSlash}${qs ? `?${qs}` : ""}`;
}

export function portalUrl(path: string, query?: Record<string, string | number>) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const params = new URLSearchParams({
    clientId: String(PORTAL_CLIENT_ID),
    ipAddress: PORTAL_IP_ADDRESS,
  });

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      params.set(key, String(value));
    }
  }

  return `${CUSTOMER_PORTAL}${normalizedPath}?${params.toString()}`;
}

export function getCatalogWebSocketUrl(): string {
  const uri = new URL(DEFAULT_API_HOST);
  const scheme = uri.protocol === "https:" ? "wss" : "ws";
  const portSuffix =
    uri.port && uri.port !== "80" && uri.port !== "443" ? `:${uri.port}` : "";
  return `${scheme}://${uri.host}${portSuffix}/ws/catalog/`;
}
