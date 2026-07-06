import type { CustomerUser } from "@/lib/api/types";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

type GtagCommand = "config" | "event" | "js" | "set";

declare global {
  interface Window {
    gtag?: (command: GtagCommand | string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
  }
}

export function trackPageView(url: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", action, params);
}

export function setAnalyticsUser(user: CustomerUser | null) {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) {
    return;
  }

  if (!user?.id) {
    window.gtag("config", GA_MEASUREMENT_ID, { user_id: null });
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    user_id: String(user.id),
  });
}

function crispPush(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.$crisp = window.$crisp || [];
  window.$crisp.push(args);
}

export function identifyCrispUser(user: CustomerUser | null) {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) {
    return;
  }

  if (!user?.id) {
    crispPush("do", "session:reset");
    return;
  }

  const email = user.email || user.customerEmail;
  const name = user.name || user.customerName;
  const phone = user.phone || user.customerMobile;

  if (email) {
    crispPush("set", "user:email", [email]);
  }
  if (name) {
    crispPush("set", "user:nickname", [name]);
  }
  if (phone) {
    crispPush("set", "user:phone", [phone]);
  }

  crispPush("set", "session:data", [
    [
      ["user_id", String(user.id)],
      ["platform", "website"],
    ],
  ]);
}

export function openCrispChat() {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) {
    return;
  }

  crispPush("do", "chat:open");
}

export function resetCrispSession() {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) {
    return;
  }

  crispPush("do", "session:reset");
}
