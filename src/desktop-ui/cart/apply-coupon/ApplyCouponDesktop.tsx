"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Tag } from "lucide-react";
import { validateCoupon } from "@/lib/api/orders";
import { getCustomerId } from "@/lib/auth/session";
import DesktopPageShell from "@/desktop-ui/layout/DesktopPageShell";
import styles from "./applyCouponDesktop.module.css";

export default function ApplyCouponDesktop() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const existing = searchParams.get("code");
    if (existing) setCouponCode(existing);
  }, [searchParams]);

  const handleApply = async () => {
    const code = couponCode.trim();
    if (!code) {
      setError("Please enter a coupon code");
      return;
    }

    const customerId = getCustomerId();
    if (!customerId) {
      setError("Please login to apply coupon.");
      return;
    }

    setIsApplying(true);
    setError("");

    try {
      const result = await validateCoupon(customerId, code);
      if (!result.status) {
        setError(result.message ?? "Invalid coupon code");
        return;
      }

      router.push(`/cart?coupon=${encodeURIComponent(code)}`);
    } catch {
      setError("Could not validate coupon");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className={styles.title}>Apply Coupon</h1>
      </header>

      <DesktopPageShell width="narrow" flush>
        <div className={styles.content}>
          <label className={styles.fieldLabel} htmlFor="coupon-code">
            <Tag size={16} style={{ display: "inline", marginRight: 6, verticalAlign: "text-bottom" }} />
            Enter coupon code
          </label>
          <div className={styles.inputRow}>
            <input
              id="coupon-code"
              type="text"
              className={styles.input}
              placeholder="e.g. SAVE20"
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void handleApply();
              }}
            />
            <button
              type="button"
              className={styles.applyBtn}
              onClick={handleApply}
              disabled={isApplying}
            >
              {isApplying ? "Applying..." : "Apply"}
            </button>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <p className={styles.hint}>
            Coupon discounts are applied at checkout. Enter a valid code and return to your cart.
          </p>
        </div>
      </DesktopPageShell>
    </div>
  );
}
