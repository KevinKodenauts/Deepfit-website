import type { Metadata } from "next";
import localFont from "next/font/local";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const dirham = localFont({
  src: "../../public/fonts/Dirham.ttf",
  variable: "--font-dirham",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deepfit - Wellness Inside Out",
  description:
    "Shop supplements, gym essentials & wellness products in minutes.",
};

import SmoothScroll from "@/components/SmoothScroll";
import { AddressProvider } from "@/contexts/AddressContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { RealtimeProvider } from "@/contexts/RealtimeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dirham.variable}`}>
      <body className={`${outfit.className} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <AddressProvider>
            <CartProvider>
              <WishlistProvider>
                <NotificationProvider>
                  <RealtimeProvider>
                    <SmoothScroll>
                      <div className="app-viewport">{children}</div>
                    </SmoothScroll>
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
