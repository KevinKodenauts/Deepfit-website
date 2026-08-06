import type { CustomerUser } from "@/lib/api/types";

const DEFAULT_CRISP_WEBSITE_ID = "2cff09c6-98f2-4f8b-aa34-a3a43e77dd09";

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

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
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
