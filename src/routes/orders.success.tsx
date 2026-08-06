import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { confirmZiinaPayment } from "@/lib/api/orders";
import { getAccessToken } from "@/lib/auth/session";

const searchSchema = z.object({
  orderNumber: z.string().optional(),
  orderId: z.string().optional(),
  paymentIntentId: z.string().optional(),
});

export const Route = createFileRoute("/orders/success")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Order confirmed — DEEPFIT" }],
  }),
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const { orderNumber, orderId, paymentIntentId } = Route.useSearch();
  const [status, setStatus] = useState("Confirming your order…");

  useEffect(() => {
    const intentId =
      paymentIntentId ||
      (orderId ? sessionStorage.getItem(`ziina:${orderId}`) : null);

    if (!intentId || !orderId) {
      setStatus("Your order has been placed.");
      return;
    }

    const token = getAccessToken() ?? undefined;
    confirmZiinaPayment({
      orderId,
      paymentIntentId: intentId,
      accessToken: token,
    })
      .then((result) => {
        setStatus(
          result.message ||
            (result.isPaid
              ? "Payment verified. Thank you!"
              : "Order received. Payment is still syncing."),
        );
      })
      .catch(() => {
        setStatus("Order received. Payment confirmation is still syncing.");
      });
  }, [orderId, paymentIntentId]);

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
        <Link
          to="/shop"
          className="mt-10 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
        >
          Continue shopping
        </Link>
      </section>
      <Footer />
    </div>
  );
}
