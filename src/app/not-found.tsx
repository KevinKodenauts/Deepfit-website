import type { Metadata } from "next";
import NotFoundView from "@/components/not-found/NotFoundView";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist or may have been moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundView includeShell />;
}
