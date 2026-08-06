import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, Receipt, PlusSquare, ShoppingBag } from "lucide-react";
import { CurrencyAmount, CurrencySymbol } from "@/components/CurrencySymbol";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import {
  getWalletTransactions,
  type WalletData,
  type WalletTransaction,
} from "@/lib/api/wallet";
import styles from "@/styles/wallet/wallet.module.css";
import { Skeleton } from "@/components/ui/skeleton";
import { WalletTransactionsSkeleton } from "@/components/skeleton/PageSkeletons";

function formatAmount(amount: number) {
  return amount.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

function formatTransactionDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  const formatted = date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `on ${formatted}`;
}

function TransactionIcon({ transaction }: { transaction: WalletTransaction }) {
  if (transaction.isCredit) {
    return <PlusSquare size={20} strokeWidth={2} />;
  }
  return <ShoppingBag size={20} strokeWidth={2} />;
}

export function WalletPage() {
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();
  const [wallet, setWallet] = useState<WalletData>({
    totalBalance: 0,
    transactions: [],
  });
  const [loading, setLoading] = useState(true);

  const loadWallet = useCallback(async () => {
    try {
      const data = await getWalletTransactions();
      setWallet(data);
    } catch {
      setWallet({ totalBalance: 0, transactions: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    void loadWallet();
  }, [authLoading, isAuthenticated, loadWallet]);

  const isLowBalance = wallet.totalBalance <= 0;

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div style={{ paddingTop: "var(--desktop-nav-height)" }}>
        <div className={styles.container}>
          <header className={styles.header}>
            <button
              type="button"
              className={styles.backBtn}
              onClick={() => window.history.back()}
              aria-label="Go back"
            >
              <ChevronLeft size={20} />
            </button>
          </header>

          <div className={styles.content}>
            <section className={styles.balanceSection}>
              <div className={styles.walletIcon}>
                <CurrencySymbol size={50} />
              </div>
              <p className={styles.balanceLabel}>YOUR BALANCE</p>
              <h1 className={styles.balanceAmount}>
                {loading ? (
                  <Skeleton className="mx-auto h-10 w-36" />
                ) : (
                  <CurrencyAmount>
                    {formatAmount(wallet.totalBalance)}
                  </CurrencyAmount>
                )}
              </h1>

              {isLowBalance ? (
                <p className={styles.lowBalanceText}>
                  Your balance is low. Please add money to continue enjoying one
                  click payments
                </p>
              ) : null}

              <Link to="/wallet/add" className={styles.addMoneyLink}>
                Add Money
              </Link>
            </section>

            <section className={styles.transactionsSection}>
              <h2 className={styles.sectionTitle}>Transactions</h2>

              <div className={styles.transactionsCard}>
                {loading ? (
                  <WalletTransactionsSkeleton />
                ) : wallet.transactions.length === 0 ? (
                  <div className={styles.emptyState}>
                    <Receipt size={40} strokeWidth={1.5} />
                    <p>No transaction found</p>
                  </div>
                ) : (
                  <ul className={styles.transactionsList}>
                    {wallet.transactions.map((transaction) => (
                      <li key={transaction.id} className={styles.transactionItem}>
                        <div className={styles.txIconWrap}>
                          <TransactionIcon transaction={transaction} />
                        </div>
                        <div className={styles.txInfo}>
                          <span className={styles.txTitle}>
                            {transaction.displayTitle}
                          </span>
                          <span className={styles.txDate}>
                            {formatTransactionDate(transaction.createdAt)}
                          </span>
                        </div>
                        <span
                          className={
                            transaction.isCredit
                              ? styles.txAmountPositive
                              : styles.txAmountNegative
                          }
                        >
                          {transaction.isCredit ? "+" : "-"}
                          <CurrencyAmount>
                            {formatAmount(transaction.amount)}
                          </CurrencyAmount>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            <p className={styles.footerText}>ENJOY SEAMLESS ONE TAP PAYMENTS</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
