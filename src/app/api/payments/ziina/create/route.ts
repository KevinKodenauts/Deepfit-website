import { NextResponse } from "next/server";
import {
  createZiinaPaymentIntent,
  isZiinaConfigured,
} from "@/lib/ziina/server";

export const runtime = "nodejs";

type CreateBody = {
  orderId?: number | string;
  orderNumber?: string;
  amount?: number | string;
};

function siteUrl(request: Request) {
  // Prefer the browser origin so local dev returns to localhost, not production.
  const origin = request.headers.get("origin");
  if (origin) return origin.replace(/\/$/, "");

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
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
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://deepfit.life"
  );
}

export async function POST(request: Request) {
  try {
    if (!isZiinaConfigured()) {
      return NextResponse.json(
        {
          status: false,
          message:
            "Ziina is not configured. Set ZIINA_ACCESS_TOKEN in the website environment.",
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as CreateBody;
    const orderId = body.orderId;
    const orderNumber = body.orderNumber ?? String(orderId ?? "");
    const amount = Number(body.amount);

    if (!orderId || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { status: false, message: "orderId and amount are required" },
        { status: 400 }
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
      return NextResponse.json(
        { status: false, message: "Ziina did not return a payment URL" },
        { status: 502 }
      );
    }

    query.set("paymentIntentId", intent.id);

    return NextResponse.json({
      status: true,
      paymentIntentId: intent.id,
      paymentUrl,
      paymentRequired: true,
      successUrl: `${base}/orders/success?${query.toString()}`,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not start payment";
    return NextResponse.json({ status: false, message }, { status: 500 });
  }
}
