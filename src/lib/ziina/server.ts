const ZIINA_API_BASE =
  process.env.ZIINA_API_BASE?.replace(/\/$/, "") ??
  "https://api-v2.ziina.com/api";

function getAccessToken() {
  return process.env.ZIINA_ACCESS_TOKEN ?? "jOFFkJir9N24ghPELu8s66rcRwjaI/5Nig1PmS5axbn4IBkCrAcSgsc6cEu2dUsw";
}

export function isZiinaConfigured() {
  return Boolean(getAccessToken());
}

export function toMinorUnits(amount: number | string) {
  const value = Math.round(Number(amount) * 100);
  if (!Number.isFinite(value) || value < 0) {
    throw new Error("Invalid payment amount");
  }
  return value;
}

export type ZiinaPaymentIntent = {
  id: string;
  amount: number;
  currency_code: string;
  status: string;
  redirect_url?: string;
  embedded_url?: string;
  success_url?: string;
  cancel_url?: string;
};

export async function createZiinaPaymentIntent(input: {
  amount: number | string;
  message: string;
  successUrl: string;
  cancelUrl: string;
  failureUrl: string;
  test?: boolean;
}): Promise<ZiinaPaymentIntent> {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Ziina is not configured on the website server");
  }

  const minor = toMinorUnits(input.amount);
  if (minor < 200) {
    throw new Error("Online payments require a minimum of 2 AED");
  }

  const response = await fetch(`${ZIINA_API_BASE}/payment_intent`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      amount: minor,
      currency_code: process.env.ZIINA_CURRENCY ?? "AED",
      message: input.message,
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      failure_url: input.failureUrl,
      test:
        input.test ??
        ["1", "true", "yes"].includes(
          (process.env.ZIINA_TEST_MODE ?? "false").toLowerCase()
        ),
    }),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => null)) as
    | ZiinaPaymentIntent
    | { message?: string; code?: string }
    | null;

  if (!response.ok || !data || !("id" in data)) {
    const message =
      data && "message" in data && data.message
        ? data.message
        : `Ziina create failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

export async function getZiinaPaymentIntent(
  paymentIntentId: string
): Promise<ZiinaPaymentIntent> {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Ziina is not configured on the website server");
  }

  const response = await fetch(
    `${ZIINA_API_BASE}/payment_intent/${paymentIntentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const data = (await response.json().catch(() => null)) as
    | ZiinaPaymentIntent
    | { message?: string }
    | null;

  if (!response.ok || !data || !("id" in data)) {
    const message =
      data && "message" in data && data.message
        ? data.message
        : `Ziina fetch failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}
