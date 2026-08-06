import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthContext";
import { socialLoginCustomer, pickAuthTokens } from "@/lib/api/auth";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          prompt: (cb?: (notification: { isNotDisplayed: () => boolean }) => void) => void;
        };
      };
    };
  }
}

export function useGoogleSignIn() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { next?: string };
  const { loginWithResponse } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const initializedRef = useRef(false);

  const handleCredential = useCallback(
    async (idToken: string) => {
      setLoading(true);
      setError("");
      try {
        const response = await socialLoginCustomer("google", idToken);
        const tokens = pickAuthTokens(response);

        if (response.status && tokens.access && tokens.user) {
          const err = loginWithResponse({
            access: tokens.access,
            refresh: tokens.refresh,
            user: tokens.user,
          });
          if (!err) {
            const next = search.next;
            void navigate({ to: next && next.startsWith("/") ? next : "/" });
          } else {
            setError(err);
          }
        } else {
          setError(
            (response as { message?: string }).message ??
              "Google sign-in failed. Please try again."
          );
        }
      } catch {
        setError("Google sign-in failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [loginWithResponse, navigate, search.next]
  );

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || initializedRef.current) return;

    const init = () => {
      window.google?.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: { credential?: string }) => {
          if (response.credential) {
            void handleCredential(response.credential);
          }
        },
      });
      initializedRef.current = true;
    };

    if (window.google?.accounts?.id) {
      init();
    } else {
      const script = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (script) {
        script.addEventListener("load", init);
      } else {
        const s = document.createElement("script");
        s.src = "https://accounts.google.com/gsi/client";
        s.async = true;
        s.onload = init;
        document.head.appendChild(s);
      }
    }
  }, [handleCredential]);

  const signIn = useCallback(() => {
    setError("");
    if (!GOOGLE_CLIENT_ID) {
      setError("Google sign-in is not configured.");
      return;
    }
    window.google?.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        // One Tap not available, fall back — this can happen if user dismissed before
        setError("Google sign-in popup was blocked. Please allow popups and try again.");
      }
    });
  }, []);

  const isAvailable = Boolean(GOOGLE_CLIENT_ID);

  return { signIn, loading, error, isAvailable };
}
