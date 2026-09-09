import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { confirmZiinaPayment } from "@/lib/api/orders";
import { getAccessToken } from "@/lib/auth/session";

function stringParam(value: unknown): string | undefined {
  if (value == null || value === "") return undefined;
  if (Array.isArray(value)) {
    const first = value[0];
    if (first == null || first === "") return undefined;
    return String(first);
  }
  return String(value);
}

export const Route = createFileRoute("/orders/success")({
  validateSearch: (search: Record<string, unknown>) => ({
    orderNumber: stringParam(search.orderNumber),
    orderId: stringParam(search.orderId),
    paymentIntentId: stringParam(search.paymentIntentId),
  }),
  head: () => ({
    meta: [{ title: "Order confirmed — DEEPFIT" }],
  }),
  errorComponent: OrderSuccessFallback,
  component: OrderSuccessPage,
});

function OrderSuccessFallback() {
  return (
    <OrderSuccessLayout
      status="Your payment was received. Open My Orders to see it — refresh if it is still syncing."
    />
  );
}

function OrderSuccessLayout({
  status,
  orderNumber,
  orderId,
}: {
  status: string;
  orderNumber?: string;
  orderId?: string;
}) {
  const detailsSearch = orderId
    ? { orderId: Number(orderId) }
    : undefined;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto flex max-w-xl flex-col items-center px-6 pb-24 pt-40 text-center lg:px-10">
        <CheckCircle2 size={48} className="text-[oklch(0.7_0.15_155)]" />
        <h1 className="mt-6 font-display text-4xl">Thank you</h1>
        <p className="mt-3 text-muted-foreground">{status}</p>
        {orderNumber ? (
          <p className="mt-2 text-sm">
            Order <span className="font-medium">{orderNumber}</span>
          </p>
        ) : null}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/orders"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
          >
            View my orders
          </Link>
          {detailsSearch ? (
            <Link
              to="/orders/details"
              search={detailsSearch}
              className="rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium"
            >
              Order details
            </Link>
          ) : (
            <Link
              to="/shop"
              className="rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium"
            >
              Continue shopping
            </Link>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

function OrderSuccessPage() {
  const { orderNumber, orderId, paymentIntentId } = Route.useSearch();
  const [status, setStatus] = useState("Confirming your order…");

  useEffect(() => {
    const intentId =
      paymentIntentId ||
      (orderId && typeof window !== "undefined"
        ? sessionStorage.getItem(`ziina:${orderId}`)
        : null);

    if (!intentId || !orderId) {
      setStatus("Your order has been placed.");
      return;
    }

    let cancelled = false;

    const confirm = async () => {
      const token = getAccessToken() ?? undefined;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          const result = await confirmZiinaPayment({
            orderId,
            paymentIntentId: intentId,
            accessToken: token,
          });
          if (cancelled) return;
          if (result.djangoSynced || result.isPaid) {
            setStatus(
              result.message ||
                "Payment verified. Your order is now in My Orders.",
            );
            return;
          }
        } catch {
          // Retry — the charge can succeed before Django has un-hidden the order.
        }
        if (attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 1200));
        }
      }
      if (!cancelled) {
        setStatus(
          "Payment received. If the order is not in My Orders yet, refresh that page in a moment.",
        );
      }
    };

    void confirm();
    return () => {
      cancelled = true;
    };
  }, [orderId, paymentIntentId]);

  return (
    <OrderSuccessLayout
      status={status}
      orderNumber={orderNumber}
      orderId={orderId}
    />
  );
}
