import { clearSession } from "@/lib/auth/session";

export const UNAUTHORIZED_EVENT = "deepfit:unauthorized";

const SELECTED_ADDRESS_KEY = "deepfit:selectedAddressId";

const INVALID_TOKEN_MESSAGES = new Set([
  "invalid token",
  "invalid token or user not found",
  "token has expired",
  "the token is expired",
  "invalid credentials.",
]);

let loggingOut = false;

function normalizeMessage(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : null;
}

export function isInvalidTokenPayload(data: unknown): boolean {
  if (!data || typeof data !== "object") return false;

  const record = data as Record<string, unknown>;
  const messages = [record.message, record.detail, record.error]
    .map(normalizeMessage)
    .filter((value): value is string => Boolean(value));

  return messages.some(
    (message) =>
      INVALID_TOKEN_MESSAGES.has(message) ||
      message.includes("invalid token") ||
      message.includes("token has expired") ||
      message.includes("token is expired")
  );
}

export function shouldForceLogout(
  status: number,
  data: unknown,
  auth: boolean
): boolean {
  if (!auth) return false;
  if (status === 401 || status === 403) return true;
  return isInvalidTokenPayload(data);
}

/** Clears session storage and redirects to login when the auth token is invalid. */
export function forceLogout(redirectTo = "/login") {
  if (typeof window === "undefined") return;
  if (loggingOut) return;
  loggingOut = true;

  clearSession();

  try {
    localStorage.removeItem(SELECTED_ADDRESS_KEY);
    localStorage.removeItem("deepfit_access_token");
    localStorage.removeItem("deepfit_refresh_token");
    localStorage.removeItem("deepfit_user");
  } catch {
    // Ignore storage access errors (private mode, etc.)
  }

  window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));

  const { pathname, search } = window.location;
  if (pathname === "/login" || pathname.startsWith("/login/")) {
    loggingOut = false;
    return;
  }

  const next = `${pathname}${search}`;
  const loginUrl =
    next && next !== "/"
      ? `${redirectTo}?next=${encodeURIComponent(next)}`
      : redirectTo;

  window.location.assign(loginUrl);
}
