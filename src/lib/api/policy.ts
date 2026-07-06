import { portalUrl } from "./config";

export type PolicySlug = "terms" | "privacy" | "return" | "refund";

export type PolicyMeta = {
  slug: PolicySlug;
  title: string;
  description: string;
  endpoint: string;
  listKey: string;
  fieldName: string;
};

export const POLICY_PAGES: Record<PolicySlug, PolicyMeta> = {
  terms: {
    slug: "terms",
    title: "Terms and Conditions",
    description: "Read the terms and conditions for using DeepFit services.",
    endpoint: "gettermsandconditions",
    listKey: "contentList",
    fieldName: "content",
  },
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    description: "Learn how DeepFit collects, uses, and protects your data.",
    endpoint: "getprivacypolicy",
    listKey: "privacyPolicyContentList",
    fieldName: "privacyPolicyContent",
  },
  return: {
    slug: "return",
    title: "Return Policy",
    description: "Understand DeepFit return eligibility and process.",
    endpoint: "getreturnpolicy",
    listKey: "returnPolicyContentList",
    fieldName: "policyContent",
  },
  refund: {
    slug: "refund",
    title: "Refund Policy",
    description: "Details on refunds for DeepFit orders and payments.",
    endpoint: "getrefundpolicy",
    listKey: "refundPolicyContentList",
    fieldName: "refundPolicyContent",
  },
};

export const POLICY_SLUGS = Object.keys(POLICY_PAGES) as PolicySlug[];

function extractHtmlContent(
  value: unknown,
  fieldName: string,
  listKey: string
): string | null {
  const list = (value as Record<string, unknown>)?.[listKey];
  if (!Array.isArray(list) || list.length === 0) return null;

  const content = (list[0] as Record<string, unknown>)?.[fieldName];
  if (typeof content === "string") {
    const trimmed = content.trim();
    if (!trimmed) return null;

    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (Array.isArray(parsed) && parsed.length > 0) {
        return String(parsed[0]);
      }
      if (typeof parsed === "string" && parsed.trim()) {
        return parsed;
      }
    } catch {
      return content;
    }

    return content;
  }

  if (Array.isArray(content) && content.length > 0) {
    return String(content[0]);
  }

  return null;
}

async function fetchPolicy(
  endpoint: string
): Promise<Record<string, unknown> | null> {
  const response = await fetch(portalUrl(endpoint), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) return null;

  const data = (await response.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;

  if (!data || data.status === false) return null;
  return data;
}

export async function getPolicyContent(slug: PolicySlug): Promise<string | null> {
  const meta = POLICY_PAGES[slug];
  const data = await fetchPolicy(meta.endpoint);
  if (!data) return null;
  return extractHtmlContent(data, meta.fieldName, meta.listKey);
}

export async function getTermsAndConditions(): Promise<string | null> {
  return getPolicyContent("terms");
}

export async function getPrivacyPolicy(): Promise<string | null> {
  return getPolicyContent("privacy");
}

export async function getRefundPolicy(): Promise<string | null> {
  return getPolicyContent("refund");
}

export async function getReturnPolicy(): Promise<string | null> {
  return getPolicyContent("return");
}

export function isPolicySlug(value: string): value is PolicySlug {
  return value in POLICY_PAGES;
}
