import { createFileRoute } from "@tanstack/react-router";
import {
  createZiinaRefund,
  getZiinaPaymentIntent,
  getZiinaRefund,
  isZiinaConfigured,
} from "@/lib/ziina/server";
import { DEFAULT_API_HOST } from "@/lib/api/config";

type RefundBody = {
  orderId?: number | string;
  paymentIntentId?: string;
  refundId?: string;
  amount?: number | string;
  accessToken?: string;
  cancelOrder?: boolean;
  reason?: string;
};

async function syncDjangoRefund(body: RefundBody) {
  if (!body.accessToken || (!body.orderId && !body.paymentIntentId)) {
    return { synced: false as const, data: null };
  }

  try {
    const djangoResponse = await fetch(
      `${DEFAULT_API_HOST}/api/customerportal/refundziinapayment?clientId=1&ipAddress=127.0.0.1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${body.accessToken}`,
        },
        body: JSON.stringify({
          orderId: body.orderId,
          paymentIntentId: body.paymentIntentId,
          amount: body.amount,
          cancelOrder: body.cancelOrder,
          reason: body.reason,
        }),
      },
    );
    const djangoData = (await djangoResponse.json().catch(() => null)) as {
      status?: boolean;
      message?: string;
      refundId?: string;
      refundStatus?: string;
    } | null;
    return {
      synced: djangoResponse.ok && djangoData?.status === true,
      data: djangoData,
    };
  } catch {
    return { synced: false as const, data: null };
  }
}

export const Route = createFileRoute("/api/payments/ziina/refund")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          if (!isZiinaConfigured()) {
            return Response.json(
              { status: false, message: "Ziina is not configured" },
              { status: 500 },
            );
          }

          const url = new URL(request.url);
          const refundId = url.searchParams.get("refundId")?.trim();
          if (!refundId) {
            return Response.json(
              { status: false, message: "refundId is required" },
              { status: 400 },
            );
          }

          const refund = await getZiinaRefund(refundId);
          return Response.json({
            status: true,
            refundId: refund.id,
            paymentIntentId: refund.payment_intent_id,
            refundStatus: refund.status,
            refundAmount: refund.amount,
            refund,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Could not fetch refund";
          return Response.json({ status: false, message }, { status: 500 });
        }
      },
      POST: async ({ request }) => {
        try {
          if (!isZiinaConfigured()) {
            return Response.json(
              { status: false, message: "Ziina is not configured" },
              { status: 500 },
            );
          }

          const body = (await request.json()) as RefundBody;
          const paymentIntentId = body.paymentIntentId?.trim();
          const amount = body.amount;

          const django = await syncDjangoRefund(body);
          if (django.synced && django.data) {
            return Response.json({
              status: true,
              message: django.data.message || "Refund processed",
              orderId: body.orderId,
              paymentIntentId,
              refundId: django.data.refundId,
              refundStatus: django.data.refundStatus,
              djangoSynced: true,
            });
          }

          if (!paymentIntentId) {
            return Response.json(
              {
                status: false,
                message:
                  django.data?.message ||
                  "paymentIntentId is required when Django refund is unavailable",
              },
              { status: 400 },
            );
          }

          let refundAmount = amount;
          if (refundAmount == null || refundAmount === "") {
            const intent = await getZiinaPaymentIntent(paymentIntentId);
            refundAmount = Number(intent.amount || 0) / 100;
          }

          const refund = await createZiinaRefund({
            paymentIntentId,
            amount: refundAmount,
            refundId: body.refundId,
          });

          return Response.json({
            status: refund.status !== "failed",
            message:
              refund.status === "failed"
                ? refund.error?.message || "Refund failed"
                : "Refund processed via Ziina",
            orderId: body.orderId,
            paymentIntentId,
            refundId: refund.id,
            refundStatus: refund.status,
            refundAmount: refund.amount,
            djangoSynced: false,
            refund,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Could not refund payment";
          return Response.json({ status: false, message }, { status: 500 });
        }
      },
    },
  },
});
