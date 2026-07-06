"use client";

import { notFound, useParams } from "next/navigation";
import { isPolicySlug } from "@/lib/api/policy";
import PolicyPageContent from "./PolicyPageContent";

export default function PolicyPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  if (!slug || !isPolicySlug(slug)) {
    notFound();
  }

  return <PolicyPageContent slug={slug} />;
}
