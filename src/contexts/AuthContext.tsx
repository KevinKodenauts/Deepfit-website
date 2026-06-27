"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getCustomerDetails,
  loginCustomer,
  signupCustomer,
  pickAuthTokens,
} from "@/lib/api/auth";
import { invalidateCartCache } from "@/lib/api/cart";
import { invalidateCategoriesCache } from "@/lib/api/categories";
import { invalidateDashboardCache } from "@/lib/api/products";
import type { CustomerUser } from "@/lib/api/types";
import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  getStoredUser,
  saveSession,
} from "@/lib/auth/session";

type AuthContextValue = {
  user: CustomerUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  sessionVersion: number;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (payload: {
    customerName: string;
    customerEmail: string;
    customerMobile: string;
    password: string;
  }) => Promise<string | null>;
  loginWithResponse: (response: {
    access?: string;
    refresh?: string;
    user?: CustomerUser;
  }) => string | null;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeUser(user: CustomerUser): CustomerUser {
  const raw = user as CustomerUser & { customerId?: number };
  const id = raw.id ?? raw.customerId ?? 0;
  const referralCode = user.referralCode || user.referral_code || "";
  const referralPoints =
    user.referralPoints ??
    user.referral_points ??
    user.walletBalance ??
    0;

  return {
    ...user,
    id,
    name: user.name || user.customerName,
    email: user.email || user.customerEmail,
    phone: user.phone || user.customerMobile,
    profile_picture: user.profile_picture || user.profileImage,
    referralCode,
    referralPoints,
  };
}

function readStoredUser(): CustomerUser | null {
  const stored = getStoredUser();
  return stored ? normalizeUser(stored) : null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionVersion, setSessionVersion] = useState(0);

  const refreshProfile = useCallback(async () => {
    const stored = getStoredUser();
    if (!stored?.id) {
      setUser(null);
      return;
    }

    try {
      const details = await getCustomerDetails(stored.id);
      if (details) {
        const normalized = normalizeUser(details);
        setUser(normalized);
        saveSession(
          getAccessToken() ?? "",
          getRefreshToken() ?? "",
          normalized
        );
      } else {
        setUser(normalizeUser(stored));
      }
    } catch {
      setUser(normalizeUser(stored));
    }
  }, []);

  useEffect(() => {
    const stored = readStoredUser();
    if (!stored) {
      setIsLoading(false);
      return;
    }

    setUser(stored);
    setIsLoading(false);
    void refreshProfile();
  }, [refreshProfile]);

  const handleAuthSuccess = useCallback((response: {
    access?: string;
    refresh?: string;
    user?: CustomerUser;
  }) => {
    if (!response.access || !response.user) {
      return "Login failed. Please try again.";
    }

    const normalized = normalizeUser(response.user);
    saveSession(response.access, response.refresh ?? "", normalized);
    setUser(normalized);
    invalidateDashboardCache();
    invalidateCategoriesCache();
    if (normalized.id) {
      invalidateCartCache(normalized.id);
    }
    setSessionVersion((value) => value + 1);
    return null;
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await loginCustomer(email, password);
      const { access, refresh, user } = pickAuthTokens(response);

      if (response.status && access && user) {
        return handleAuthSuccess({ access, refresh, user });
      }

      return response.message ?? "Invalid credentials.";
    },
    [handleAuthSuccess]
  );

  const signup = useCallback(
    async (payload: {
      customerName: string;
      customerEmail: string;
      customerMobile: string;
      password: string;
    }) => {
      const response = await signupCustomer(payload);

      if (!response.status) {
        return response.message ?? "Signup failed. Please try again.";
      }

      // Signup completion is handled on the verify-otp screen after email OTP.
      return null;
    },
    []
  );

  const loginWithResponse = useCallback(
    (response: { access?: string; refresh?: string; user?: CustomerUser }) => {
      return handleAuthSuccess(response);
    },
    [handleAuthSuccess]
  );

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    invalidateDashboardCache();
    invalidateCategoriesCache();
    invalidateCartCache();
    setSessionVersion((value) => value + 1);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      sessionVersion,
      login,
      signup,
      loginWithResponse,
      logout,
      refreshProfile,
    }),
    [
      user,
      isLoading,
      sessionVersion,
      login,
      signup,
      loginWithResponse,
      logout,
      refreshProfile,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
