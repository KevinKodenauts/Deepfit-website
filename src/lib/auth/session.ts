import type { CustomerUser } from "@/lib/api/types";
import { deleteCookie, getCookie, setCookie } from "@/lib/auth/cookies";

const ACCESS_TOKEN_KEY = "deepfit_access_token";
const REFRESH_TOKEN_KEY = "deepfit_refresh_token";
const USER_KEY = "deepfit_user";

const ACCESS_TOKEN_DAYS = 7;
const REFRESH_TOKEN_DAYS = 30;

let migrated = false;

function migrateFromLocalStorage() {
  if (typeof window === "undefined" || migrated) return;
  migrated = true;

  const legacyAccess = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!legacyAccess || getCookie(ACCESS_TOKEN_KEY)) return;

  const legacyRefresh = localStorage.getItem(REFRESH_TOKEN_KEY) ?? "";
  const legacyUser = localStorage.getItem(USER_KEY);

  setCookie(ACCESS_TOKEN_KEY, legacyAccess, ACCESS_TOKEN_DAYS);
  if (legacyRefresh) {
    setCookie(REFRESH_TOKEN_KEY, legacyRefresh, REFRESH_TOKEN_DAYS);
  }
  if (legacyUser) {
    setCookie(USER_KEY, legacyUser, REFRESH_TOKEN_DAYS);
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  migrateFromLocalStorage();
  return getCookie(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  migrateFromLocalStorage();
  return getCookie(REFRESH_TOKEN_KEY);
}

export function getStoredUser(): CustomerUser | null {
  if (typeof window === "undefined") return null;
  migrateFromLocalStorage();

  const raw = getCookie(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CustomerUser;
  } catch {
    return null;
  }
}

export function saveSession(
  access: string,
  refresh: string,
  user: CustomerUser
) {
  setCookie(ACCESS_TOKEN_KEY, access, ACCESS_TOKEN_DAYS);
  setCookie(REFRESH_TOKEN_KEY, refresh, REFRESH_TOKEN_DAYS);
  setCookie(USER_KEY, JSON.stringify(user), REFRESH_TOKEN_DAYS);
}

export function clearSession() {
  deleteCookie(ACCESS_TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
  deleteCookie(USER_KEY);

  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

export function getCustomerId(): number | null {
  const user = getStoredUser();
  if (!user) return null;

  const id = user.id ?? (user as { customerId?: number }).customerId;
  return id && id > 0 ? id : null;
}
