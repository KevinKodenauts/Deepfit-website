import { CUSTOMER_PORTAL } from "./config";

const CLIENT_ID = 1;
const IP_ADDRESS = "0.0.0.0";

function extractHtmlContent(
  value: unknown,
  fieldName: string,
  listKey: string
): string | null {
  const list = (value as Record<string, unknown>)?.[listKey];
  if (!Array.isArray(list) || list.length === 0) return null;

  const content = (list[0] as Record<string, unknown>)?.[fieldName];
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content) as unknown;
      if (Array.isArray(parsed) && parsed.length > 0) {
        return String(parsed[0]);
      }
    } catch {
      return content;
    }
  }

  if (Array.isArray(content) && content.length > 0) {
    return String(content[0]);
  }

  return null;
}

async function fetchPolicy(
  endpoint: string
): Promise<Record<string, unknown> | null> {
  const url = `${CUSTOMER_PORTAL}/${endpoint}?clientId=${CLIENT_ID}&ipAddress=${IP_ADDRESS}`;
  const response = await fetch(url);
  if (!response.ok) return null;

  const data = await response.json();
  if (!data?.status) return null;
  return data as Record<string, unknown>;
}

export async function getTermsAndConditions(): Promise<string | null> {
  const data = await fetchPolicy("gettermsandconditions");
  if (!data) return null;
  return extractHtmlContent(data, "content", "contentList");
}

export async function getPrivacyPolicy(): Promise<string | null> {
  const data = await fetchPolicy("getprivacypolicy");
  if (!data) return null;
  return extractHtmlContent(
    data,
    "privacyPolicyContent",
    "privacyPolicyContentList"
  );
}

export async function getRefundPolicy(): Promise<string | null> {
  const data = await fetchPolicy("getrefundpolicy");
  if (!data) return null;
  return extractHtmlContent(
    data,
    "refundPolicyContent",
    "refundPolicyContentList"
  );
}

export async function getReturnPolicy(): Promise<string | null> {
  const data = await fetchPolicy("getreturnpolicy");
  if (!data) return null;
  return extractHtmlContent(data, "policyContent", "returnPolicyContentList");
}
