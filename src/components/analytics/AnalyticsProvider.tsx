"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { identifyCrispUser } from "@/lib/analytics";

export default function AnalyticsProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const lastUserId = useRef<number | null>(null);

  useEffect(() => {
    const nextUserId = isAuthenticated && user?.id ? user.id : null;
    if (lastUserId.current === nextUserId) return;
    lastUserId.current = nextUserId;

    identifyCrispUser(isAuthenticated ? user : null);
  }, [isAuthenticated, user]);

  return <>{children}</>;
}
