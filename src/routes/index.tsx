import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles, Truck, ShieldCheck, Timer, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { goals, products as fallbackProducts, type Product } from "@/lib/products";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { getDashboardData, getProductsByCategory } from "@/lib/api/products";
import { mapToCategoryProduct, mapToHomeProduct } from "@/lib/api/mappers";
import { categoryProductToCard, homeProductToCard } from "@/lib/catalog";
import { HomeProductRowSkeleton } from "@/components/skeleton/PageSkeletons";
import { mapDashboardCategoriesToMain } from "@/lib/api/dashboard";
import {
  getTestimonialAvatarColor,
  getTestimonialInitials,
  getTestimonials,
  type Testimonial,
} from "@/lib/api/testimonials";
import type { DashboardSlider, MainCategory } from "@/lib/api/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import hero from "@/assets/hero-athlete.jpg";
import lifestyleGym from "@/assets/lifestyle-gym.jpg";
import lifestyleStrength from "@/assets/lifestyle-strength.jpg";
import lifestyleYoga from "@/assets/lifestyle-yoga.jpg";

const SLIDER_INTERVAL_MS = 5500;

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Amelia R.",
    companyName: "Brooklyn",
    designation: "Yoga instructor",
    message:
      "Feels like I moved my studio into my living room. Silent, precise and quietly beautiful.",
    rating: 5,
    image: "",
  },
  {
    id: 2,
    name: "David K.",
    companyName: "Berlin",
    designation: "Marathoner",
    message:
      "The hex dumbbells are the first piece of equipment I've ever wanted to leave out on the floor.",
    rating: 5,
    image: "",
  },
  {
    id: 3,
    name: "Priya M.",
    companyName: "London",
    designation: "Product designer",
    message:
      "Delivery, setup, first workout — everything felt like a hotel opening.",
    rating: 5,
    image: "",
  },
];

const FALLBACK_SLIDES: DashboardSlider[] = [
  {
    id: -1,
    title: "Transform your home into a premium fitness studio.",
    description:
      "Deepfit builds equipment and rituals for people who want more than a workout. Softer materials. Quieter mechanics. Wellness, from the inside out.",
    sliderImage: hero,
  },
  {
    id: -2,
    title: "Wellness Inside Out",
    description: "Curated gear for strength, recovery, and everyday movement.",
    sliderImage: lifestyleStrength,
  },
  {
    id: -3,
    title: "Studio-quality at home",
    description: "Silent decks, panoramic recovery, and precision-cast iron.",
    sliderImage: lifestyleGym,
  },
];

const FALLBACK_CATEGORY_TILES = [
  { id: 0, name: "Strength", img: lifestyleStrength, desc: "Precision-cast iron for the modern lifter." },
  { id: 1, name: "Yoga & Mobility", img: lifestyleYoga, desc: "Quieter mats. Deeper stretches." },
  { id: 2, name: "Cardio Studios", img: lifestyleGym, desc: "Silent decks, panoramic screens." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DEEPFIT — Wellness Inside Out" },
      { name: "description", content: "Premium home fitness equipment, recovery gear and wellness essentials designed for every lifestyle." },
      { property: "og:title", content: "DEEPFIT — Wellness Inside Out" },
      { property: "og:description", content: "Transform your home into a premium fitness studio with Deepfit." },
    ],
  }),
  component: Home,
});

function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [sliders, setSliders] = useState<DashboardSlider[]>(FALLBACK_SLIDES);
  const [categories, setCategories] = useState<MainCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getDashboardData()
      .then((dashboard) => {
        if (cancelled) return;
        const featuredCards = (dashboard.featuredProductList ?? [])
          .map(mapToHomeProduct)
          .map(homeProductToCard);
        const topSelling = (dashboard.topSellingProductList ?? [])
          .map(mapToHomeProduct)
          .map(homeProductToCard);
        if (featuredCards.length) setFeatured(featuredCards.slice(0, 8));
        else setFeatured(fallbackProducts);
        if (topSelling.length) setBestSellers(topSelling.slice(0, 8));
        else if (featuredCards.length) setBestSellers(featuredCards.slice(0, 8));
        else setBestSellers([...fallbackProducts].reverse());

        if (dashboard.sliderList?.length) {
          setSliders(dashboard.sliderList);
        }

        const mappedCategories =
          dashboard.mainCategories?.length
            ? dashboard.mainCategories
            : mapDashboardCategoriesToMain(dashboard.categoryList ?? []);
        if (mappedCategories.length) setCategories(mappedCategories);
      })
      .catch(() => {
        if (cancelled) return;
        setFeatured(fallbackProducts);
        setBestSellers([...fallbackProducts].reverse());
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero sliders={sliders} />
      <Marquee />
      <Categories categories={categories} />
      <Featured products={featured} categories={categories} loading={loading} />
      <ShopByGoal />
      <Story />
      <Stats />
      <BestSellers products={bestSellers} loading={loading} />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}

function Hero({ sliders }: { sliders: DashboardSlider[] }) {
  const slides = sliders.length > 0 ? sliders : FALLBACK_SLIDES;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const timer = window.setInterval(goNext, SLIDER_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [slides.length, paused, goNext]);

  const active = slides[index];
  const headline = active.title?.trim() || "Transform your home into a premium fitness studio.";
  const subhead =
    active.description?.trim() ||
    "Deepfit builds equipment and rituals for people who want more than a workout. Softer materials. Quieter mechanics. Wellness, from the inside out.";

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-soft pt-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl [background:radial-gradient(circle,var(--mint),transparent_60%)] animate-blob" />
      <div className="pointer-events-none absolute right-[-10%] top-40 h-[600px] w-[600px] rounded-full opacity-50 blur-3xl [background:radial-gradient(circle,var(--lavender),transparent_60%)] animate-blob" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full opacity-40 blur-3xl [background:radial-gradient(circle,var(--aqua),transparent_60%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:px-10 lg:pt-24">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium tracking-wide text-foreground/80 shadow-soft">
            <Sparkles size={14} className="text-[oklch(0.6_0.18_180)]" />
            Wellness Inside Out
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="mt-8 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-tight">
                {headline}
              </h1>
              <p className="mt-8 max-w-lg text-lg text-muted-foreground">{subhead}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition hover:opacity-90"
            >
              Shop the collection
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/explore"
              className="group inline-flex items-center gap-3 rounded-full glass px-7 py-4 text-sm font-medium shadow-soft transition hover:shadow-glass"
            >
              <PlayCircle size={16} /> Explore Deepfit
            </Link>
          </div>

          <div className="mt-16 grid max-w-md grid-cols-3 gap-8">
            {[
              ["120K+", "Active athletes"],
              ["4.9★", "Avg. rating"],
              ["60-day", "Trial at home"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-semibold text-foreground">{n}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual stage */}
        <div className="relative isolate">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-glass ring-1 ring-white/40">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.sliderImage}
                alt={headline}
                className="h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl glass p-4 text-foreground">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Featured</div>
                <div className="text-sm font-medium line-clamp-1">{headline}</div>
              </div>
              <Link
                to="/shop"
                className="rounded-full bg-foreground p-2 text-background"
                aria-label="Shop now"
              >
                <PlayCircle size={18} />
              </Link>
            </div>
          </div>

          {slides.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full glass p-2 shadow-soft transition hover:opacity-90"
                onClick={goPrev}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full glass p-2 shadow-soft transition hover:opacity-90"
                onClick={goNext}
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-6 bg-foreground" : "w-2 bg-foreground/30"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Wellness Inside Out", "Precision-cast steel", "Silent decks", "Studio-grade recovery", "Made to last", "Handcrafted"];
  return (
    <div className="border-y border-border/60 bg-background py-6 overflow-hidden">
      <div className="flex w-max animate-marquee gap-14 whitespace-nowrap">
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className="font-display text-2xl italic text-muted-foreground">
            {w} <span className="mx-8 text-foreground/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Categories({ categories }: { categories: MainCategory[] }) {
  const tiles =
    categories.length > 0
      ? categories.slice(0, 6).map((category) => ({
          id: category.id,
          name: category.mainCategoryName,
          img: category.mainCategoryImage || lifestyleStrength,
          desc: `Explore ${category.mainCategoryName} equipment and essentials.`,
        }))
      : FALLBACK_CATEGORY_TILES;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">01 — Categories</div>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Everything for the modern studio.</h2>
        </div>
        <Link to="/shop" className="hidden items-center gap-2 text-sm font-medium hover:opacity-70 md:inline-flex">
          View all <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tiles.map((t, i) => (
          <Link
            key={t.id}
            to="/shop"
            search={categories.length > 0 ? { main: t.id } : undefined}
            className={`group relative overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-border/50 transition hover:shadow-glass ${
              i === 0 ? "lg:row-span-2 lg:aspect-auto lg:min-h-[560px]" : "aspect-[4/5]"
            }`}
          >
            <img src={t.img} alt={t.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/70">0{i + 1}</div>
              <div className="mt-2 flex items-end justify-between gap-4">
                <h3 className="font-display text-3xl leading-tight text-white">{t.name}</h3>
                <div className="rounded-full glass-dark p-3 text-white transition group-hover:translate-x-1">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              <p className="mt-2 max-w-xs text-sm text-white/80">{t.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Featured({
  products,
  categories,
  loading,
}: {
  products: Product[];
  categories: MainCategory[];
  loading?: boolean;
}) {
  const [activeName, setActiveName] = useState("All");
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filtering, setFiltering] = useState(false);

  const filters: { id: number | null; name: string }[] =
    categories.length > 0
      ? [
          { id: null, name: "All" },
          ...categories.map((c) => ({
            id: c.id,
            name: c.mainCategoryName,
          })),
        ]
      : [
          { id: null, name: "All" },
          ...["Strength", "Cardio", "Recovery", "Yoga"].map((name) => ({
            id: null as number | null,
            name,
          })),
        ];

  useEffect(() => {
    if (activeCategoryId != null) {
      let cancelled = false;
      setFiltering(true);

      getProductsByCategory(activeCategoryId, undefined, {
        limit: 8,
        offset: 0,
      })
        .then((result) => {
          if (cancelled) return;
          setFilteredProducts(
            result.products.map(mapToCategoryProduct).map(categoryProductToCard)
          );
        })
        .catch(() => {
          if (!cancelled) setFilteredProducts([]);
        })
        .finally(() => {
          if (!cancelled) setFiltering(false);
        });

      return () => {
        cancelled = true;
      };
    }

    setFiltering(false);
    if (activeName === "All") {
      setFilteredProducts(products);
      return;
    }

    setFilteredProducts(
      products.filter(
        (p) => p.category.toLowerCase() === activeName.toLowerCase()
      )
    );
  }, [activeCategoryId, activeName, products]);

  const showLoading = Boolean(loading) || filtering;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">02 — New arrivals</div>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Just dropped.</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          {filters.map((filter) => (
            <button
              key={`${filter.id ?? "all"}-${filter.name}`}
              type="button"
              onClick={() => {
                setActiveName(filter.name);
                setActiveCategoryId(filter.id);
              }}
              className={`rounded-full border border-border px-4 py-2 transition hover:bg-foreground hover:text-background ${
                activeName === filter.name
                  ? "bg-foreground text-background"
                  : ""
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-12">
        {showLoading ? (
          <HomeProductRowSkeleton count={4} />
        ) : filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No products in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}

function ShopByGoal() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:var(--gradient-soft)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">03 — Shop by goal</div>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            What are you <span className="text-gradient italic">building</span> today?
          </h2>
          <p className="mt-4 text-muted-foreground">
            From your first pull-up to your hundredth marathon, we've built a shelf of tools for every chapter of the practice.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          {goals.map((g) => (
            <Link
              key={g}
              to="/shop"
              className="group rounded-full glass px-6 py-3 text-sm font-medium shadow-soft transition hover:shadow-glass hover:-translate-y-0.5"
            >
              {g}
              <ArrowRight size={14} className="ml-2 inline transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16 lg:px-10">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-glass">
        <img src={lifestyleStrength} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">04 — Why Deepfit</div>
        <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
          Built for the <span className="text-gradient italic">quiet</span> athlete.
        </h2>
        <p className="mt-6 max-w-lg text-muted-foreground">
          We started Deepfit because gyms had gotten louder, harsher, and more disposable. So we designed the opposite: softer materials, silent mechanics, and objects that belong in your home — not in a warehouse.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            { icon: ShieldCheck, title: "Lifetime frames", body: "Backed by a forever warranty on every steel frame we cast." },
            { icon: Truck, title: "Free white-glove", body: "Delivered, assembled and calibrated by our in-house team." },
            { icon: Timer, title: "60-day trial", body: "Live with it. If it doesn't fit your practice, send it back." },
            { icon: Sparkles, title: "Studio classes", body: "Every purchase includes a year of on-demand programming." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl bg-card p-5 shadow-soft ring-1 ring-border/60">
              <f.icon size={20} className="text-[oklch(0.55_0.15_260)]" />
              <div className="mt-3 font-medium">{f.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{f.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-brand p-10 text-white sm:p-16">
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay [background:radial-gradient(60%_60%_at_50%_50%,white,transparent_70%)]" />
        <div className="relative grid gap-8 md:grid-cols-4">
          {[
            ["120K", "Athletes trained"],
            ["48", "Countries shipped"],
            ["4.9/5", "Verified rating"],
            ["1M+", "Workouts logged"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-5xl font-medium tracking-tight">{n}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-white/80">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellers({
  products,
  loading,
}: {
  products: Product[];
  loading?: boolean;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">05 — Best sellers</div>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">The forever favorites.</h2>
        </div>
      </div>
      <div className="mt-12">
        {loading ? (
          <HomeProductRowSkeleton count={4} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={`best-${p.slug}`} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);
  const [loading, setLoading] = useState(true);
  const autoplay = useRef(
    Autoplay({
      delay: SLIDER_INTERVAL_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  useEffect(() => {
    let cancelled = false;

    getTestimonials()
      .then((data) => {
        if (cancelled) return;
        if (data.length > 0) setTestimonials(data);
      })
      .catch(() => {
        /* keep fallbacks */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            06 — Testimonials
          </div>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Loved from the first rep.
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex h-full flex-col rounded-3xl bg-card p-8 shadow-soft ring-1 ring-border/60"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-6 h-24 w-full" />
              <Skeleton className="mt-8 h-4 w-32" />
              <Skeleton className="mt-2 h-3 w-40" />
            </div>
          ))}
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: testimonials.length > 1,
          }}
          plugins={testimonials.length > 1 ? [autoplay.current] : []}
          className="relative mt-12"
        >
          <CarouselContent className="-ml-6">
            {testimonials.map((testimonial) => {
              const role = [testimonial.designation, testimonial.companyName]
                .filter(Boolean)
                .join(", ");

              return (
                <CarouselItem
                  key={testimonial.id}
                  className="basis-full pl-6 sm:basis-1/2 lg:basis-1/3"
                >
                  <figure className="flex h-full flex-col rounded-3xl bg-card p-8 shadow-soft ring-1 ring-border/60">
                    <div
                      className="text-[oklch(0.55_0.15_260)]"
                      aria-label={`${testimonial.rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          style={{ opacity: index < testimonial.rating ? 1 : 0.25 }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <blockquote className="mt-6 flex-1 font-display text-xl leading-snug tracking-tight">
                      “{testimonial.message}”
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-3 text-sm">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt=""
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
                          style={{
                            background: getTestimonialAvatarColor(testimonial.id),
                          }}
                          aria-hidden
                        >
                          {getTestimonialInitials(testimonial.name)}
                        </span>
                      )}
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        {role ? (
                          <div className="text-muted-foreground">{role}</div>
                        ) : null}
                      </div>
                    </figcaption>
                  </figure>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {testimonials.length > 1 ? (
            <>
              <CarouselPrevious className="-left-2 top-[calc(50%-1.25rem)] hidden border-border bg-background shadow-soft sm:flex md:-left-4" />
              <CarouselNext className="-right-2 top-[calc(50%-1.25rem)] hidden border-border bg-background shadow-soft sm:flex md:-right-4" />
            </>
          ) : null}
        </Carousel>
      )}
    </section>
  );
}

function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-10">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-card p-10 shadow-soft ring-1 ring-border/60 sm:p-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-40 blur-3xl [background:radial-gradient(circle,var(--lavender),transparent_60%)]" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full opacity-40 blur-3xl [background:radial-gradient(circle,var(--mint),transparent_60%)]" />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">07 — Journal</div>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Wellness in your inbox, weekly.</h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              A calm dispatch of movement, recovery, and product drops — from our studio to yours.
            </p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="you@wellness.com"
              className="w-full rounded-full border border-border bg-background px-6 py-4 text-sm outline-none ring-ring/30 transition focus:ring-4"
            />
            <button className="rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition hover:opacity-90">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
