import type { CustomerUser } from "@/lib/api/types";

const DEFAULT_CRISP_WEBSITE_ID = "2cff09c6-98f2-4f8b-aa34-a3a43e77dd09";
const DEFAULT_CLARITY_PROJECT_ID = "yg38li43j6";
const DEFAULT_GA_MEASUREMENT_ID = "G-P99F9LK7K2";

function readEnv(name: string): string | undefined {
  if (typeof import.meta !== "undefined" && import.meta.env?.[name]) {
    return String(import.meta.env[name]);
  }
  if (typeof process !== "undefined" && process.env?.[name]) {
    return process.env[name];
  }
  return undefined;
}

export const CRISP_WEBSITE_ID =
  readEnv("VITE_CRISP_WEBSITE_ID") ??
  readEnv("NEXT_PUBLIC_CRISP_WEBSITE_ID") ??
  DEFAULT_CRISP_WEBSITE_ID;

export const CLARITY_PROJECT_ID =
  readEnv("VITE_CLARITY_PROJECT_ID") ??
  readEnv("NEXT_PUBLIC_CLARITY_PROJECT_ID") ??
  DEFAULT_CLARITY_PROJECT_ID;

export const GA_MEASUREMENT_ID =
  readEnv("VITE_GA_MEASUREMENT_ID") ??
  readEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID") ??
  DEFAULT_GA_MEASUREMENT_ID;

type ClarityFn = {
  (...args: unknown[]): void;
  q?: unknown[];
};

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
    clarity?: ClarityFn;
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

function crispPush(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.$crisp = window.$crisp || [];
  window.$crisp.push(args);
}

export function isCrispEnabled() {
  return Boolean(CRISP_WEBSITE_ID);
}

export function isClarityEnabled() {
  return Boolean(CLARITY_PROJECT_ID);
}

export function isGoogleAnalyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID);
}

function getGtag(): GtagFn | undefined {
  if (typeof window === "undefined") return undefined;

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // Official gtag snippet queues via the arguments object.
      window.dataLayer!.push(arguments);
    };
  }

  return window.gtag;
}

export function initGoogleAnalytics() {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  if (document.getElementById("google-analytics-script")) return;

  const gtag = getGtag();
  if (!gtag) return;

  const script = document.createElement("script");
  script.id = "google-analytics-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

export function trackGaPageView() {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;

  const gtag = getGtag();
  if (!gtag) return;

  gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
  });
}

export function identifyGaUser(user: CustomerUser | null) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;

  const gtag = getGtag();
  if (!gtag) return;

  gtag("set", {
    user_id: user?.id ? String(user.id) : undefined,
  });
}

function getClarity(): ClarityFn | undefined {
  if (typeof window === "undefined") return undefined;

  if (!window.clarity) {
    const clarity = function (...args: unknown[]) {
      (clarity.q = clarity.q || []).push(args);
    } as ClarityFn;
    window.clarity = clarity;
  }

  return window.clarity;
}

export function identifyClarityUser(user: CustomerUser | null) {
  if (typeof window === "undefined" || !CLARITY_PROJECT_ID) {
    return;
  }

  const clarity = getClarity();
  if (!clarity || !user?.id) return;

  clarity("identify", String(user.id));

  const name = user.name || user.customerName;
  if (name) {
    clarity("set", "userName", name);
  }
}

export function identifyCrispUser(user: CustomerUser | null) {
  if (typeof window === "undefined" || !CRISP_WEBSITE_ID) {
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
  if (typeof window === "undefined" || !CRISP_WEBSITE_ID) {
    return;
  }

  crispPush("do", "chat:open");
}

export function resetCrispSession() {
  if (typeof window === "undefined" || !CRISP_WEBSITE_ID) {
    return;
  }

  crispPush("do", "session:reset");
}
