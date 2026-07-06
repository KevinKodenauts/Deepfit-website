import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | DeepFit",
  description:
    "Discover the DEEPFIT story, our Mind. Move. Fuel. method, and our mission to make holistic wellness simple, sustainable, and accessible across the Middle East.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
