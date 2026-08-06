import { createFileRoute } from "@tanstack/react-router";
import {
  createZiinaPaymentIntent,
  isZiinaConfigured,
} from "@/lib/ziina/server";

type CreateBody = {
  orderId?: number | string;
  orderNumber?: string;
  amount?: number | string;
};

function siteUrl(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) return origin.replace(/\/$/, "");

  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (host) {
    const isLocal =
      host.startsWith("localhost") ||
      host.startsWith("127.0.0.1") ||
      host.startsWith("192.168.");
    const proto =
      request.headers.get("x-forwarded-proto") ?? (isLocal ? "http" : "https");
    return `${proto}://${host}`;
  }

  return (
    (typeof process !== "undefined"
      ? process.env.VITE_SITE_URL?.replace(/\/$/, "")
      : undefined) ??
    (typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
      : undefined) ??
    "https://main.d3pf7alzckc46l.amplifyapp.com"
  );
}

export const Route = createFileRoute("/api/payments/ziina/create")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          if (!isZiinaConfigured()) {
            return Response.json(
              {
                status: false,
                message:
                  "Ziina is not configured. Set ZIINA_ACCESS_TOKEN in the website environment.",
              },
              { status: 500 },
            );
          }

          const body = (await request.json()) as CreateBody;
          const orderId = body.orderId;
          const orderNumber = body.orderNumber ?? String(orderId ?? "");
          const amount = Number(body.amount);

          if (!orderId || !Number.isFinite(amount) || amount <= 0) {
            return Response.json(
              { status: false, message: "orderId and amount are required" },
              { status: 400 },
            );
          }

          const base = siteUrl(request);
          const query = new URLSearchParams({
            orderId: String(orderId),
            orderNumber: String(orderNumber),
          });

          const intent = await createZiinaPaymentIntent({
            amount,
            message: `Deepfit order ${orderNumber}`,
            successUrl: `${base}/orders/success?${query.toString()}`,
            cancelUrl: `${base}/checkout?payment=cancelled&orderId=${orderId}`,
            failureUrl: `${base}/checkout?payment=failed&orderId=${orderId}`,
          });

          const paymentUrl = intent.redirect_url || intent.embedded_url;
          if (!paymentUrl) {
            return Response.json(
              { status: false, message: "Ziina did not return a payment URL" },
              { status: 502 },
            );
          }

          query.set("paymentIntentId", intent.id);

          return Response.json({
            status: true,
            paymentIntentId: intent.id,
            paymentUrl,
            paymentRequired: true,
            successUrl: `${base}/orders/success?${query.toString()}`,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Could not start payment";
          return Response.json({ status: false, message }, { status: 500 });
        }
      },
    },
  },
});
