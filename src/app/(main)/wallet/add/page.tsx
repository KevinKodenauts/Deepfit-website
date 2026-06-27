"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./addMoney.module.css";
import { CurrencyAmount, CurrencySymbol } from "@/components/CurrencySymbol";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { addMoneyToWallet } from "@/lib/api/wallet";

const AMOUNTS = [2000, 5000, 10000];

export default function AddMoneyPage() {
  const router = useRouter();
  const { isAuthenticated } = useRequireAuth();
  const [amount, setAmount] = useState(2000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayNow = async () => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await addMoneyToWallet(amount);
      if (result.status) {
        router.push("/wallet");
        return;
      }
      setError(result.message ?? "Could not add money. Please try again.");
    } catch {
      setError("Could not add money. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.pageTitle}>Add money</h1>
      </header>

      <div className={styles.content}>
        <span className={styles.inputLabel}>Enter amount to add</span>
        
        <div className={styles.amountDisplay}>
          <CurrencySymbol className={styles.currencySymbol} size={48} />
          <span className={styles.amountValue}>{amount.toLocaleString()}</span>
        </div>

        <div className={styles.chipsContainer}>
          {AMOUNTS.map((val) => (
            <button
              key={val}
              className={`${styles.chip} ${amount === val ? styles.chipActive : ""}`}
              onClick={() => setAmount(val)}
            >
              <CurrencyAmount>{val.toLocaleString()}</CurrencyAmount>
            </button>
          ))}
        </div>

        <div className={styles.noteSection}>
          <h4 className={styles.noteTitle}>NOTE</h4>
          <ul className={styles.noteList}>
            <li className={styles.noteItem}>
              Deepfit Money balance is valid for 1 year from the date of money added
            </li>
            <li className={styles.noteItem}>
              Deepfit Money cannot be transferred to a bank account as per RBI guidelines. <span className={styles.linkText}>Read T&Cs</span>
            </li>
          </ul>
        </div>

        <div className={styles.watermarkContainer}>
          <div className={styles.watermarkCard}>
            <CurrencySymbol className={styles.watermarkIcon} size={30} />
          </div>
          <h2 className={styles.watermarkText}>
            Enjoy seamless<br/>single tap payments
          </h2>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.payUsing}>
            <div className={styles.payUsingLabelRow}>
              <div className={styles.dot} />
              <span className={styles.payUsingLabel}>PAY USING</span>
            </div>
            <span className={styles.paymentMethod}>Credit Card</span>
          </div>

          <button
            type="button"
            className={styles.payNowBtn}
            onClick={handlePayNow}
            disabled={loading}
          >
            <div className={styles.payAmount}>
              <span className={styles.payAmountValue}>
                <CurrencyAmount>
                  {amount.toLocaleString()}.00
                </CurrencyAmount>
              </span>
              <span className={styles.payAmountLabel}>TOTAL</span>
            </div>
            <div className={styles.payAction}>
              {loading ? "Processing..." : "Pay Now"}{" "}
              <ChevronRight size={18} strokeWidth={2.5} />
            </div>
          </button>
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
