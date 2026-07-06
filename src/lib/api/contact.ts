import { portalUrl } from "./config";

export type ContactUsPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ApiResponse = {
  status?: boolean;
  message?: string;
};

async function postPortal(
  endpoint: string,
  body: Record<string, unknown>
): Promise<ApiResponse | null> {
  const response = await fetch(portalUrl(endpoint), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  return (await response.json().catch(() => null)) as ApiResponse | null;
}

export async function recordWebTraffic(
  payload: ContactUsPayload
): Promise<void> {
  try {
    await postPortal("addwebtraffic", {
      page: "contact-us",
      source: "contact_form",
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
    });
  } catch {
    // Traffic tracking should not block contact submission.
  }
}

export async function submitContactUs(
  payload: ContactUsPayload
): Promise<{ ok: boolean; message: string }> {
  const [contactResult] = await Promise.all([
    postPortal("addcontactus", {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
    }),
    recordWebTraffic(payload),
  ]);

  if (!contactResult?.status) {
    return {
      ok: false,
      message:
        contactResult?.message ||
        "Could not send your message. Please try again.",
    };
  }

  return {
    ok: true,
    message: contactResult.message || "Message sent successfully",
  };
}
