import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | DeepFit",
  description:
    "Contact DeepFit for order support, product guidance, or general inquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
