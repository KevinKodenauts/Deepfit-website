import { NextResponse } from "next/server";
import {
  getZiinaPaymentIntent,
  isZiinaConfigured,
  toMinorUnits,
} from "@/lib/ziina/server";

export const runtime = "nodejs";

type VerifyBody = {
  orderId?: number | string;
  paymentIntentId?: string;
  amount?: number | string;
  accessToken?: string;
};

export async function POST(request: Request) {
  try {
    if (!isZiinaConfigured()) {
      return NextResponse.json(
        { status: false, message: "Ziina is not configured" },
        { status: 500 }
      );
    }

    const body = (await request.json()) as VerifyBody;
    const paymentIntentId = body.paymentIntentId?.trim();
    if (!paymentIntentId) {
      return NextResponse.json(
        { status: false, message: "paymentIntentId is required" },
        { status: 400 }
      );
    }

    const intent = await getZiinaPaymentIntent(paymentIntentId);
    const paymentStatus = (intent.status || "").toLowerCase();

    if (paymentStatus !== "completed") {
      return NextResponse.json({
        status: false,
        message: `Payment not completed (status: ${intent.status})`,
        paymentStatus: intent.status,
        orderId: body.orderId,
        paymentIntentId,
        isPaid: false,
      });
    }

    if (body.amount != null && body.amount !== "") {
      const expected = toMinorUnits(body.amount);
      const actual = Number(intent.amount || 0);
      if (actual && Math.abs(actual - expected) > 1) {
        return NextResponse.json(
          { status: false, message: "Payment amount does not match order total" },
          { status: 400 }
        );
      }
    }

    // Best-effort: mark paid on Django (required for Zoho sales order sync).
    let djangoSynced = false;
    if (body.orderId && body.accessToken) {
      const apiHost =
        process.env.NEXT_PUBLIC_API_URL ?? "https://apideepfit.gaamferi.com";
      try {
        const djangoResponse = await fetch(
          `${apiHost}/api/customerportal/verifyziinapayment?clientId=1&ipAddress=127.0.0.1`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${body.accessToken}`,
            },
            body: JSON.stringify({
              orderId: body.orderId,
              paymentIntentId,
            }),
            cache: "no-store",
          }
        );
        const djangoData = (await djangoResponse.json().catch(() => null)) as {
          status?: boolean;
          message?: string;
        } | null;
        djangoSynced = djangoResponse.ok && djangoData?.status === true;
      } catch {
        djangoSynced = false;
      }
    }

    return NextResponse.json({
      status: true,
      message: djangoSynced
        ? "Payment verified successfully"
        : "Payment received. Order confirmation is still syncing — refresh shortly.",
      orderId: body.orderId,
      paymentIntentId,
      paymentStatus: "completed",
      isPaid: true,
      djangoSynced,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not verify payment";
    return NextResponse.json({ status: false, message }, { status: 500 });
  }
}
