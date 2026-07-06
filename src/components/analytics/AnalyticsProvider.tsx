"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  identifyCrispUser,
  setAnalyticsUser,
  trackPageView,
} from "@/lib/analytics";

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const lastUserId = useRef<number | null>(null);

  useEffect(() => {
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    trackPageView(url);
  }, [pathname, searchParams]);

  useEffect(() => {
    const nextUserId = isAuthenticated && user?.id ? user.id : null;
    if (lastUserId.current === nextUserId) return;
    lastUserId.current = nextUserId;

    setAnalyticsUser(isAuthenticated ? user : null);
    identifyCrispUser(isAuthenticated ? user : null);
  }, [isAuthenticated, user]);

  return <>{children}</>;
}
