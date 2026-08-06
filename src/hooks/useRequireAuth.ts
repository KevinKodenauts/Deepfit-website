import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function useRequireAuth(redirectTo = "/login") {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoading) return;
    if (!auth.isAuthenticated) {
      void navigate({ to: redirectTo });
    }
  }, [auth.isAuthenticated, auth.isLoading, redirectTo, navigate]);

  return auth;
}
