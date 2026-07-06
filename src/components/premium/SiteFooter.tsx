"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import {
  SITE_ADDRESS_LINES,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
} from "@/lib/siteContact";
import { Mail, MapPin, Phone } from "lucide-react";
import styles from "./premium.module.css";

const PAYMENTS = [
  "Visa",
  "Mastercard",
  "Apple Pay",
  "Google Pay",
  "Tabby",
  "Tamara",
  "COD",
];

export default function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.siteFooterMain}>
        <div className={styles.siteFooterBrand}>
          <Logo variant="white" height={32} />
          <p>
            DeepFit is the UAE&apos;s premium destination for fitness equipment
            and wellness essentials — designed for modern living.
          </p>
          <div className={styles.siteFooterContact}>
            <a href={`mailto:${SITE_EMAIL}`}>
              <Mail size={14} />
              {SITE_EMAIL}
            </a>
            <a href={SITE_PHONE_HREF}>
              <Phone size={14} />
              {SITE_PHONE_DISPLAY}
            </a>
            <address className={styles.siteFooterAddress}>
              <MapPin size={14} />
              <span className={styles.siteFooterAddressText}>
                {SITE_ADDRESS_LINES.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </span>
            </address>
          </div>
        </div>

        <div className={styles.siteFooterCols}>
          <div>
            <h4>Shop</h4>
            <Link href="/categories">All Categories</Link>
            <Link href="/home">Trending</Link>
            <Link href="/home">Best Sellers</Link>
            <Link href="/profile/wishlist">Wishlist</Link>
          </div>
          <div>
            <h4>Support</h4>
            <Link href="/orders">Track Order</Link>
            <Link href="/orders">My Orders</Link>
            <Link href="/profile">My Account</Link>
            <Link href="/cart">Cart</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/exercise">Workouts</Link>
          </div>
          <div>
            <h4>Policies</h4>
            <Link href="/policies/terms">Terms</Link>
            <Link href="/policies/privacy">Privacy</Link>
            <Link href="/policies/return">Returns</Link>
            <Link href="/policies/refund">Refunds</Link>
          </div>
        </div>

        <div className={styles.siteFooterTrust}>
          <div>
            <strong>Free UAE Delivery</strong>
            <span>Orders above AED 200</span>
          </div>
          <div>
            <strong>Secure Payments</strong>
            <span>Cards, Apple Pay & BNPL</span>
          </div>
          <div>
            <strong>Easy Returns</strong>
            <span>14-day returns</span>
          </div>
          <div>
            <strong>Expert Support</strong>
            <span>Wellness specialists</span>
          </div>
        </div>

        <div className={styles.siteFooterBottom}>
          <p>
            © {new Date().getFullYear()} DeepFit Trading LLC. All rights
            reserved.
          </p>
          <div className={styles.siteFooterPayments}>
            {PAYMENTS.map((pay) => (
              <span key={pay}>{pay}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
