import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_COOKIE_NAME,
  isGuestOnlyRoute,
  isProtectedRoute,
} from "@/lib/auth/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken = Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);

  if (hasToken && isGuestOnlyRoute(pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!hasToken && isProtectedRoute(pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/wallet/:path*",
    "/orders/:path*",
    "/checkout",
    "/profile/wishlist",
    "/profile/addresses",
    "/profile/referral",
  ],
};
