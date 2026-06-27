"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function useRequireAuth(redirectTo = "/login") {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.isLoading) return;
    if (!auth.isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [auth.isAuthenticated, auth.isLoading, redirectTo, router]);

  return auth;
}
