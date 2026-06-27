"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Tag } from "lucide-react";
import { validateCoupon } from "@/lib/api/orders";
import { getCustomerId } from "@/lib/auth/session";
import styles from "./applyCouponMobile.module.css";

function ApplyCouponMobileContent() {
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
        <h1 className={styles.pageTitle}>Apply Coupon</h1>
        <div className={styles.headerSpacer} />
      </header>

      <div className={styles.content}>
        <label className={styles.fieldLabel} htmlFor="coupon-code-mobile">
          <Tag size={16} />
          Enter coupon code
        </label>
        <input
          id="coupon-code-mobile"
          type="text"
          className={styles.input}
          placeholder="e.g. SAVE20"
          value={couponCode}
          onChange={(event) => setCouponCode(event.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button
          type="button"
          className={styles.applyBtn}
          onClick={handleApply}
          disabled={isApplying}
        >
          {isApplying ? "Applying..." : "Apply Coupon"}
        </button>
      </div>
    </div>
  );
}

export default function ApplyCouponMobile() {
  return (
    <Suspense fallback={null}>
      <ApplyCouponMobileContent />
    </Suspense>
  );
}
