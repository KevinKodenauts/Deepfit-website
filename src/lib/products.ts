import dumbbell from "@/assets/product-dumbbell.jpg";
import yogamat from "@/assets/product-yogamat.jpg";
import recovery from "@/assets/product-recovery.jpg";
import treadmill from "@/assets/product-treadmill.jpg";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  compareAt?: number;
  image: string;
  category: string;
  badge?: string;
  rating: number;
  reviews: number;
  colors: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
};

export const products: Product[] = [
  {
    slug: "obsidian-hex-dumbbells",
    name: "Obsidian Hex Dumbbells",
    tagline: "Precision-cast, studio-grade weight for the modern strength ritual.",
    price: 289,
    compareAt: 349,
    image: dumbbell,
    category: "Strength",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 1284,
    colors: ["#5b6b8a", "#2a2f3a", "#c9c2b8"],
    description:
      "Cast from single-piece steel and finished with a soft-touch matte coat, these hex dumbbells sit quietly in any room and lift like tournament iron.",
    features: [
      "Single-piece cast steel core",
      "Diamond-knurled chrome grip",
      "Non-slip hex bumper base",
      "5 – 50 lb increments",
    ],
    specs: {
      Material: "Cast steel, chrome",
      Weight: "Adjustable 5 – 50 lb",
      Warranty: "Lifetime",
      Origin: "Handcrafted, US",
    },
  },
  {
    slug: "aurora-yoga-mat",
    name: "Aurora Yoga Mat",
    tagline: "Cushioned, grippy and quiet. A calmer surface for a stronger practice.",
    price: 118,
    image: yogamat,
    category: "Yoga",
    badge: "New",
    rating: 4.8,
    reviews: 642,
    colors: ["#a8e6c9", "#c8b8e6", "#f4e8d8"],
    description:
      "A 6mm natural rubber mat with a moisture-wicking suede top. Designed for hot flow, restorative work, and everything between.",
    features: [
      "6mm dual-layer natural rubber",
      "Alignment stripe printed to the millimeter",
      "Sweat-wicking microfiber top",
      "Rolls flat in seconds",
    ],
    specs: {
      Dimensions: "72 × 26 in",
      Thickness: "6 mm",
      Weight: "5.2 lb",
      Material: "Natural rubber + microfiber",
    },
  },
  {
    slug: "reset-foam-roller",
    name: "Reset Foam Roller",
    tagline: "Deep-tissue release engineered for post-session recovery.",
    price: 74,
    image: recovery,
    category: "Recovery",
    rating: 4.7,
    reviews: 389,
    colors: ["#1a1a1a", "#7a8f9e"],
    description:
      "A textured EVA foam roller with dual density zones. Softer edges for warm-up, firmer center for targeted release.",
    features: [
      "Dual-density EVA core",
      "Trigger-point contour grid",
      "500 lb load rated",
      "Odorless, closed-cell foam",
    ],
    specs: {
      Length: "18 in",
      Diameter: "5.5 in",
      Material: "EVA foam over PVC core",
      Warranty: "3 years",
    },
  },
  {
    slug: "meridian-treadmill",
    name: "Meridian Treadmill",
    tagline: "A silent, panoramic running deck built for the modern home studio.",
    price: 2490,
    compareAt: 2890,
    image: treadmill,
    category: "Cardio",
    badge: "Flagship",
    rating: 4.9,
    reviews: 214,
    colors: ["#7a7f8f", "#2a2f3a"],
    description:
      "A 3.5HP brushless motor, 22-inch touchscreen, and a shock-absorbing deck that reads more like a cushioned trail than a machine.",
    features: [
      "3.5HP whisper-quiet brushless motor",
      "22-inch 4K touch display",
      "Auto-incline 0 – 15%",
      "Live and on-demand classes",
    ],
    specs: {
      Speed: "0.5 – 12.5 mph",
      Deck: "60 × 22 in cushioned",
      Weight: "285 lb",
      Warranty: "10 years frame",
    },
  },
];

export const categories = [
  { name: "Strength", slug: "strength", blurb: "Iron and steel, precision-cast." },
  { name: "Cardio", slug: "cardio", blurb: "Silent decks, panoramic screens." },
  { name: "Recovery", slug: "recovery", blurb: "Release, restore, return." },
  { name: "Yoga", slug: "yoga", blurb: "A calmer surface for a stronger practice." },
  { name: "Accessories", slug: "accessories", blurb: "The quiet details that matter." },
  { name: "Wellness", slug: "wellness", blurb: "Inside-out essentials." },
];

export const goals = [
  "Upper body",
  "Lower body",
  "Core",
  "Power Cardio",
  "Mobility",
  "Yoga",
  "Mat Pilates",
];