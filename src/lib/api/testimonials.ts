import { portalUrl } from "./config";

export type Testimonial = {
  id: number;
  name: string;
  companyName: string;
  designation: string;
  message: string;
  rating: number;
  image: string;
};

type TestimonialsResponse = {
  status?: boolean;
  testimonialsList?: Array<{
    id?: number;
    name?: string;
    companyName?: string;
    designation?: string;
    message?: string;
    rating?: number | string;
    image?: string;
  }>;
};

function toRating(value: number | string | undefined): number {
  const rating = Number(value);
  if (!Number.isFinite(rating) || rating <= 0) return 5;
  return Math.min(5, Math.max(1, Math.round(rating)));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const response = await fetch(portalUrl("testimonialslist"), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) return [];

  const data = (await response.json().catch(() => null)) as TestimonialsResponse | null;
  if (!data?.status || !Array.isArray(data.testimonialsList)) return [];

  return data.testimonialsList
    .map((item, index) => ({
      id: Number(item.id) || index + 1,
      name: (item.name ?? "").trim() || "Customer",
      companyName: (item.companyName ?? "").trim(),
      designation: (item.designation ?? "").trim(),
      message: (item.message ?? "").trim(),
      rating: toRating(item.rating),
      image: (item.image ?? "").trim(),
    }))
    .filter((item) => item.message.length > 0);
}

export function getTestimonialInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "DF";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

const AVATAR_COLORS = [
  "#7c3aed",
  "#0d9488",
  "#2563eb",
  "#db2777",
  "#ea580c",
  "#0891b2",
  "#4f46e5",
  "#059669",
];

export function getTestimonialAvatarColor(id: number): string {
  return AVATAR_COLORS[Math.abs(id) % AVATAR_COLORS.length];
}
