export const AUTH_COOKIE_NAME = "deepfit_access_token";

export const GUEST_ONLY_ROUTES = ["/", "/login", "/signup"] as const;

export const PROTECTED_ROUTE_PREFIXES = [
  "/wallet",
  "/orders",
  "/checkout",
  "/profile/wishlist",
  "/profile/addresses",
  "/profile/referral",
] as const;

export function isGuestOnlyRoute(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup"
  );
}

export function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}
