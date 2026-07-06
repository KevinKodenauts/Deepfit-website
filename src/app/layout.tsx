import localFont from "next/font/local";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dirham = localFont({
  src: "../../public/fonts/Dirham.ttf",
  variable: "--font-dirham",
  display: "swap",
});

export const metadata = rootMetadata;

import { Suspense } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import CrispChat from "@/components/analytics/CrispChat";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import { AddressProvider } from "@/contexts/AddressContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { RealtimeProvider } from "@/contexts/RealtimeContext";
import CatalogSyncManager from "@/components/CatalogSyncManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${dirham.variable}`}>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <GoogleAnalytics />
        <CrispChat />
        <AuthProvider>
          <AddressProvider>
            <CartProvider>
              <WishlistProvider>
                <NotificationProvider>
                  <RealtimeProvider>
                    <CatalogSyncManager />
                    <Suspense fallback={null}>
                      <AnalyticsProvider>
                        <SmoothScroll>
                          <div className="app-viewport">{children}</div>
                        </SmoothScroll>
                      </AnalyticsProvider>
                    </Suspense>
                  </RealtimeProvider>
                </NotificationProvider>
              </WishlistProvider>
            </CartProvider>
          </AddressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
