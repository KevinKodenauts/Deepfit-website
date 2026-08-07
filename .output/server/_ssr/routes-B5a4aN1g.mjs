import { a as __toESM } from "../_runtime.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { x as portalUrl } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as mapDashboardCategoriesToMain, i as getDashboardData, l as mapToCategoryProduct, s as getProductsByCategory, u as mapToHomeProduct } from "./AuthContext-B71YYWma.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { _ as Skeleton, s as HomeProductRowSkeleton, y as cn } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ct as ArrowUpRight, Tt as ArrowLeft, c as Truck, d as Timer, h as Sparkles, mt as ChevronLeft, pt as ChevronRight, ut as CirclePlay, wt as ArrowRight, x as ShieldCheck } from "../_libs/lucide-react.mjs";
import { i as homeProductToCard, n as Nav, r as categoryProductToCard } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
import { t as ProductCard } from "./ProductCard-ZruFtHJy.mjs";
import { n as goals, r as products } from "./products-BNhS_ouO.mjs";
import { t as Autoplay } from "../_libs/embla-carousel-autoplay.mjs";
import { t as useEmblaCarousel } from "../_libs/embla-carousel-react+[...].mjs";
import { i as Slot } from "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B5a4aN1g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function toRating(value) {
	const rating = Number(value);
	if (!Number.isFinite(rating) || rating <= 0) return 5;
	return Math.min(5, Math.max(1, Math.round(rating)));
}
async function getTestimonials() {
	const response = await fetch(portalUrl("testimonialslist"), {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		cache: "no-store"
	});
	if (!response.ok) return [];
	const data = await response.json().catch(() => null);
	if (!data?.status || !Array.isArray(data.testimonialsList)) return [];
	return data.testimonialsList.map((item, index) => ({
		id: Number(item.id) || index + 1,
		name: (item.name ?? "").trim() || "Customer",
		companyName: (item.companyName ?? "").trim(),
		designation: (item.designation ?? "").trim(),
		message: (item.message ?? "").trim(),
		rating: toRating(item.rating),
		image: (item.image ?? "").trim()
	})).filter((item) => item.message.length > 0);
}
function getTestimonialInitials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "DF";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}
var AVATAR_COLORS = [
	"#7c3aed",
	"#0d9488",
	"#2563eb",
	"#db2777",
	"#ea580c",
	"#0891b2",
	"#4f46e5",
	"#059669"
];
function getTestimonialAvatarColor(id) {
	return AVATAR_COLORS[Math.abs(id) % AVATAR_COLORS.length];
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var CarouselContext = import_react.createContext(null);
function useCarousel() {
	const context = import_react.useContext(CarouselContext);
	if (!context) throw new Error("useCarousel must be used within a <Carousel />");
	return context;
}
var Carousel = import_react.forwardRef(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
	const [carouselRef, api] = useEmblaCarousel({
		...opts,
		axis: orientation === "horizontal" ? "x" : "y"
	}, plugins);
	const [canScrollPrev, setCanScrollPrev] = import_react.useState(false);
	const [canScrollNext, setCanScrollNext] = import_react.useState(false);
	const onSelect = import_react.useCallback((api) => {
		if (!api) return;
		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
	}, []);
	const scrollPrev = import_react.useCallback(() => {
		api?.scrollPrev();
	}, [api]);
	const scrollNext = import_react.useCallback(() => {
		api?.scrollNext();
	}, [api]);
	const handleKeyDown = import_react.useCallback((event) => {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			scrollPrev();
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			scrollNext();
		}
	}, [scrollPrev, scrollNext]);
	import_react.useEffect(() => {
		if (!api || !setApi) return;
		setApi(api);
	}, [api, setApi]);
	import_react.useEffect(() => {
		if (!api) return;
		onSelect(api);
		api.on("reInit", onSelect);
		api.on("select", onSelect);
		return () => {
			api?.off("select", onSelect);
		};
	}, [api, onSelect]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselContext.Provider, {
		value: {
			carouselRef,
			api,
			opts,
			orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
			scrollPrev,
			scrollNext,
			canScrollPrev,
			canScrollNext
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			onKeyDownCapture: handleKeyDown,
			className: cn("relative", className),
			role: "region",
			"aria-roledescription": "carousel",
			...props,
			children
		})
	});
});
Carousel.displayName = "Carousel";
var CarouselContent = import_react.forwardRef(({ className, ...props }, ref) => {
	const { carouselRef, orientation } = useCarousel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: carouselRef,
		className: "overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className: cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className),
			...props
		})
	});
});
CarouselContent.displayName = "CarouselContent";
var CarouselItem = import_react.forwardRef(({ className, ...props }, ref) => {
	const { orientation } = useCarousel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		role: "group",
		"aria-roledescription": "slide",
		className: cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className),
		...props
	});
});
CarouselItem.displayName = "CarouselItem";
var CarouselPrevious = import_react.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		ref,
		variant,
		size,
		className: cn("absolute  h-8 w-8 rounded-full", orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className),
		disabled: !canScrollPrev,
		onClick: scrollPrev,
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Previous slide"
		})]
	});
});
CarouselPrevious.displayName = "CarouselPrevious";
var CarouselNext = import_react.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		ref,
		variant,
		size,
		className: cn("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className),
		disabled: !canScrollNext,
		onClick: scrollNext,
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Next slide"
		})]
	});
});
CarouselNext.displayName = "CarouselNext";
var hero_athlete_default = "/assets/hero-athlete-CDsAco7V.jpg";
var lifestyle_gym_default = "/assets/lifestyle-gym-BD5Vbhsa.jpg";
var lifestyle_strength_default = "/assets/lifestyle-strength-CiT78Amy.jpg";
var lifestyle_yoga_default = "/assets/lifestyle-yoga-BbwxW_7w.jpg";
var SLIDER_INTERVAL_MS = 5500;
var FALLBACK_TESTIMONIALS = [
	{
		id: 1,
		name: "Amelia R.",
		companyName: "Brooklyn",
		designation: "Yoga instructor",
		message: "Feels like I moved my studio into my living room. Silent, precise and quietly beautiful.",
		rating: 5,
		image: ""
	},
	{
		id: 2,
		name: "David K.",
		companyName: "Berlin",
		designation: "Marathoner",
		message: "The hex dumbbells are the first piece of equipment I've ever wanted to leave out on the floor.",
		rating: 5,
		image: ""
	},
	{
		id: 3,
		name: "Priya M.",
		companyName: "London",
		designation: "Product designer",
		message: "Delivery, setup, first workout — everything felt like a hotel opening.",
		rating: 5,
		image: ""
	}
];
var FALLBACK_SLIDES = [
	{
		id: -1,
		title: "Transform your home into a premium fitness studio.",
		description: "Deepfit builds equipment and rituals for people who want more than a workout. Softer materials. Quieter mechanics. Wellness, from the inside out.",
		sliderImage: hero_athlete_default
	},
	{
		id: -2,
		title: "Wellness Inside Out",
		description: "Curated gear for strength, recovery, and everyday movement.",
		sliderImage: lifestyle_strength_default
	},
	{
		id: -3,
		title: "Studio-quality at home",
		description: "Silent decks, panoramic recovery, and precision-cast iron.",
		sliderImage: lifestyle_gym_default
	}
];
var FALLBACK_CATEGORY_TILES = [
	{
		id: 0,
		name: "Strength",
		img: lifestyle_strength_default,
		desc: "Precision-cast iron for the modern lifter."
	},
	{
		id: 1,
		name: "Yoga & Mobility",
		img: lifestyle_yoga_default,
		desc: "Quieter mats. Deeper stretches."
	},
	{
		id: 2,
		name: "Cardio Studios",
		img: lifestyle_gym_default,
		desc: "Silent decks, panoramic screens."
	}
];
function Home() {
	const [featured, setFeatured] = (0, import_react.useState)([]);
	const [bestSellers, setBestSellers] = (0, import_react.useState)([]);
	const [sliders, setSliders] = (0, import_react.useState)(FALLBACK_SLIDES);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getDashboardData().then((dashboard) => {
			if (cancelled) return;
			const featuredCards = (dashboard.featuredProductList ?? []).map(mapToHomeProduct).map(homeProductToCard);
			const topSelling = (dashboard.topSellingProductList ?? []).map(mapToHomeProduct).map(homeProductToCard);
			if (featuredCards.length) setFeatured(featuredCards.slice(0, 8));
			else setFeatured(products);
			if (topSelling.length) setBestSellers(topSelling.slice(0, 8));
			else if (featuredCards.length) setBestSellers(featuredCards.slice(0, 8));
			else setBestSellers([...products].reverse());
			if (dashboard.sliderList?.length) setSliders(dashboard.sliderList);
			const mappedCategories = dashboard.mainCategories?.length ? dashboard.mainCategories : mapDashboardCategoriesToMain(dashboard.categoryList ?? []);
			if (mappedCategories.length) setCategories(mappedCategories);
		}).catch(() => {
			if (cancelled) return;
			setFeatured(products);
			setBestSellers([...products].reverse());
		}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { sliders }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Categories, { categories }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Featured, {
				products: featured,
				categories,
				loading
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopByGoal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BestSellers, {
				products: bestSellers,
				loading
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newsletter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Hero({ sliders }) {
	const slides = sliders.length > 0 ? sliders : FALLBACK_SLIDES;
	const [index, setIndex] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const goTo = (0, import_react.useCallback)((next) => {
		setIndex((next + slides.length) % slides.length);
	}, [slides.length]);
	const goNext = (0, import_react.useCallback)(() => goTo(index + 1), [goTo, index]);
	const goPrev = (0, import_react.useCallback)(() => goTo(index - 1), [goTo, index]);
	(0, import_react.useEffect)(() => {
		if (slides.length <= 1 || paused) return;
		const timer = window.setInterval(goNext, SLIDER_INTERVAL_MS);
		return () => window.clearInterval(timer);
	}, [
		slides.length,
		paused,
		goNext
	]);
	const active = slides[index];
	const headline = active.title?.trim() || "Transform your home into a premium fitness studio.";
	const subhead = active.description?.trim() || "Deepfit builds equipment and rituals for people who want more than a workout. Softer materials. Quieter mechanics. Wellness, from the inside out.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-[100svh] overflow-hidden bg-soft pt-24",
		onMouseEnter: () => setPaused(true),
		onMouseLeave: () => setPaused(false),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl [background:radial-gradient(circle,var(--mint),transparent_60%)] animate-blob" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute right-[-10%] top-40 h-[600px] w-[600px] rounded-full opacity-50 blur-3xl [background:radial-gradient(circle,var(--lavender),transparent_60%)] animate-blob" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full opacity-40 blur-3xl [background:radial-gradient(circle,var(--aqua),transparent_60%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:px-10 lg:pt-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium tracking-wide text-foreground/80 shadow-soft",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
								size: 14,
								className: "text-[oklch(0.6_0.18_180)]"
							}), "Wellness Inside Out"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 16
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									y: -12
								},
								transition: { duration: .4 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-8 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-tight",
									children: headline
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-8 max-w-lg text-lg text-muted-foreground",
									children: subhead
								})]
							}, active.id)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								className: "group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition hover:opacity-90",
								children: ["Shop the collection", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									size: 16,
									className: "transition-transform group-hover:translate-x-1"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/explore",
								className: "group inline-flex items-center gap-3 rounded-full glass px-7 py-4 text-sm font-medium shadow-soft transition hover:shadow-glass",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { size: 16 }), " Explore Deepfit"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-16 grid max-w-md grid-cols-3 gap-8",
							children: [
								["120K+", "Active athletes"],
								["4.9★", "Avg. rating"],
								["60-day", "Trial at home"]
							].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-2xl font-semibold text-foreground",
								children: n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-xs uppercase tracking-widest text-muted-foreground",
								children: l
							})] }, l))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative isolate",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-glass ring-1 ring-white/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
									src: active.sliderImage,
									alt: headline,
									className: "h-full w-full object-cover",
									initial: {
										opacity: 0,
										scale: 1.04
									},
									animate: {
										opacity: 1,
										scale: 1
									},
									exit: { opacity: 0 },
									transition: { duration: .6 }
								}, active.id)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl glass p-4 text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground",
									children: "Featured"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium line-clamp-1",
									children: headline
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									className: "rounded-full bg-foreground p-2 text-background",
									"aria-label": "Shop now",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { size: 18 })
								})]
							})
						]
					}), slides.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "absolute left-2 top-1/2 -translate-y-1/2 rounded-full glass p-2 shadow-soft transition hover:opacity-90",
							onClick: goPrev,
							"aria-label": "Previous slide",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full glass p-2 shadow-soft transition hover:opacity-90",
							onClick: goNext,
							"aria-label": "Next slide",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 20 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-24 left-1/2 flex -translate-x-1/2 gap-2",
							children: slides.map((slide, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => goTo(i),
								className: `h-2 rounded-full transition-all ${i === index ? "w-6 bg-foreground" : "w-2 bg-foreground/30"}`,
								"aria-label": `Go to slide ${i + 1}`
							}, slide.id))
						})
					] })]
				})]
			})
		]
	});
}
function Marquee() {
	const words = [
		"Wellness Inside Out",
		"Precision-cast steel",
		"Silent decks",
		"Studio-grade recovery",
		"Made to last",
		"Handcrafted"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-y border-border/60 bg-background py-6 overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex w-max animate-marquee gap-14 whitespace-nowrap",
			children: [
				...words,
				...words,
				...words
			].map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-display text-2xl italic text-muted-foreground",
				children: [
					w,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-8 text-foreground/40",
						children: "✦"
					})
				]
			}, i))
		})
	});
}
function Categories({ categories }) {
	const tiles = categories.length > 0 ? categories.slice(0, 6).map((category) => ({
		id: category.id,
		name: category.mainCategoryName,
		img: category.mainCategoryImage || "/assets/lifestyle-strength-CiT78Amy.jpg",
		desc: `Explore ${category.mainCategoryName} equipment and essentials.`
	})) : FALLBACK_CATEGORY_TILES;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-6 py-24 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
				children: "01 — Categories"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
				children: "Everything for the modern studio."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/shop",
				className: "hidden items-center gap-2 text-sm font-medium hover:opacity-70 md:inline-flex",
				children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 16 })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-6 lg:grid-cols-3",
			children: tiles.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/shop",
				search: categories.length > 0 ? { main: t.id } : void 0,
				className: `group relative overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-border/50 transition hover:shadow-glass ${i === 0 ? "lg:row-span-2 lg:aspect-auto lg:min-h-[560px]" : "aspect-[4/5]"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: t.img,
						alt: t.name,
						loading: "lazy",
						className: "absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-8 left-8 right-8 text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] uppercase tracking-[0.24em] text-white/70",
								children: ["0", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-end justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-3xl leading-tight text-white",
									children: t.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-full glass-dark p-3 text-white transition group-hover:translate-x-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xs text-sm text-white/80",
								children: t.desc
							})
						]
					})
				]
			}, t.id))
		})]
	});
}
function Featured({ products, categories, loading }) {
	const [activeName, setActiveName] = (0, import_react.useState)("All");
	const [activeCategoryId, setActiveCategoryId] = (0, import_react.useState)(null);
	const [filteredProducts, setFilteredProducts] = (0, import_react.useState)(products);
	const [filtering, setFiltering] = (0, import_react.useState)(false);
	const filters = categories.length > 0 ? [{
		id: null,
		name: "All"
	}, ...categories.map((c) => ({
		id: c.id,
		name: c.mainCategoryName
	}))] : [{
		id: null,
		name: "All"
	}, ...[
		"Strength",
		"Cardio",
		"Recovery",
		"Yoga"
	].map((name) => ({
		id: null,
		name
	}))];
	(0, import_react.useEffect)(() => {
		if (activeCategoryId != null) {
			let cancelled = false;
			setFiltering(true);
			getProductsByCategory(activeCategoryId, void 0, {
				limit: 8,
				offset: 0
			}).then((result) => {
				if (cancelled) return;
				setFilteredProducts(result.products.map(mapToCategoryProduct).map(categoryProductToCard));
			}).catch(() => {
				if (!cancelled) setFilteredProducts([]);
			}).finally(() => {
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
		setFilteredProducts(products.filter((p) => p.category.toLowerCase() === activeName.toLowerCase()));
	}, [
		activeCategoryId,
		activeName,
		products
	]);
	const showLoading = Boolean(loading) || filtering;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-6 py-24 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
				children: "02 — New arrivals"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
				children: "Just dropped."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 text-xs uppercase tracking-widest text-muted-foreground",
				children: filters.map((filter) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setActiveName(filter.name);
						setActiveCategoryId(filter.id);
					},
					className: `rounded-full border border-border px-4 py-2 transition hover:bg-foreground hover:text-background ${activeName === filter.name ? "bg-foreground text-background" : ""}`,
					children: filter.name
				}, `${filter.id ?? "all"}-${filter.name}`))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12",
			children: showLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeProductRowSkeleton, { count: 4 }) : filteredProducts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: filteredProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No products in this category yet."
			})
		})]
	});
}
function ShopByGoal() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 opacity-40 [background:var(--gradient-soft)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-6 lg:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
						children: "03 — Shop by goal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
						children: [
							"What are you ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient italic",
								children: "building"
							}),
							" today?"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground",
						children: "From your first pull-up to your hundredth marathon, we've built a shelf of tools for every chapter of the practice."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 flex flex-wrap gap-3",
				children: goals.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/shop",
					className: "group rounded-full glass px-6 py-3 text-sm font-medium shadow-soft transition hover:shadow-glass hover:-translate-y-0.5",
					children: [g, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						size: 14,
						className: "ml-2 inline transition-transform group-hover:translate-x-1"
					})]
				}, g))
			})]
		})]
	});
}
function Story() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-glass",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: lifestyle_strength_default,
				alt: "",
				className: "h-full w-full object-cover"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
					children: "04 — Why Deepfit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
					children: [
						"Built for the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient italic",
							children: "quiet"
						}),
						" athlete."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-lg text-muted-foreground",
					children: "We started Deepfit because gyms had gotten louder, harsher, and more disposable. So we designed the opposite: softer materials, silent mechanics, and objects that belong in your home — not in a warehouse."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-6 sm:grid-cols-2",
					children: [
						{
							icon: ShieldCheck,
							title: "Lifetime frames",
							body: "Backed by a forever warranty on every steel frame we cast."
						},
						{
							icon: Truck,
							title: "Free white-glove",
							body: "Delivered, assembled and calibrated by our in-house team."
						},
						{
							icon: Timer,
							title: "60-day trial",
							body: "Live with it. If it doesn't fit your practice, send it back."
						},
						{
							icon: Sparkles,
							title: "Studio classes",
							body: "Every purchase includes a year of on-demand programming."
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-card p-5 shadow-soft ring-1 ring-border/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, {
								size: 20,
								className: "text-[oklch(0.55_0.15_260)]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 font-medium",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm text-muted-foreground",
								children: f.body
							})
						]
					}, f.title))
				})
			]
		})]
	});
}
function Stats() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-7xl px-6 lg:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-[2.5rem] bg-brand p-10 text-white sm:p-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay [background:radial-gradient(60%_60%_at_50%_50%,white,transparent_70%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative grid gap-8 md:grid-cols-4",
				children: [
					["120K", "Athletes trained"],
					["48", "Countries shipped"],
					["4.9/5", "Verified rating"],
					["1M+", "Workouts logged"]
				].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-5xl font-medium tracking-tight",
					children: n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 text-sm uppercase tracking-widest text-white/80",
					children: l
				})] }, l))
			})]
		})
	});
}
function BestSellers({ products, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-6 py-24 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-end justify-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
				children: "05 — Best sellers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
				children: "The forever favorites."
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeProductRowSkeleton, { count: 4 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, `best-${p.slug}`))
			})
		})]
	});
}
function Testimonials() {
	const [testimonials, setTestimonials] = (0, import_react.useState)(FALLBACK_TESTIMONIALS);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const autoplay = (0, import_react.useRef)(Autoplay({
		delay: SLIDER_INTERVAL_MS,
		stopOnInteraction: false,
		stopOnMouseEnter: true
	}));
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getTestimonials().then((data) => {
			if (cancelled) return;
			if (data.length > 0) setTestimonials(data);
		}).catch(() => {}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-6 py-24 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-end justify-between gap-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
				children: "06 — Testimonials"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
				children: "Loved from the first rep."
			})] })
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-6 lg:grid-cols-3",
			children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full flex-col rounded-3xl bg-card p-8 shadow-soft ring-1 ring-border/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-6 h-24 w-full" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-8 h-4 w-32" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-2 h-3 w-40" })
				]
			}, i))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Carousel, {
			opts: {
				align: "start",
				loop: testimonials.length > 1
			},
			plugins: testimonials.length > 1 ? [autoplay.current] : [],
			className: "relative mt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselContent, {
				className: "-ml-6",
				children: testimonials.map((testimonial) => {
					const role = [testimonial.designation, testimonial.companyName].filter(Boolean).join(", ");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselItem, {
						className: "basis-full pl-6 sm:basis-1/2 lg:basis-1/3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "flex h-full flex-col rounded-3xl bg-card p-8 shadow-soft ring-1 ring-border/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[oklch(0.55_0.15_260)]",
									"aria-label": `${testimonial.rating} out of 5 stars`,
									children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { opacity: index < testimonial.rating ? 1 : .25 },
										children: "★"
									}, index))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
									className: "mt-6 flex-1 font-display text-xl leading-snug tracking-tight",
									children: [
										"“",
										testimonial.message,
										"”"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
									className: "mt-8 flex items-center gap-3 text-sm",
									children: [testimonial.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: testimonial.image,
										alt: "",
										className: "h-10 w-10 rounded-full object-cover",
										onError: (event) => {
											event.currentTarget.style.display = "none";
										}
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white",
										style: { background: getTestimonialAvatarColor(testimonial.id) },
										"aria-hidden": true,
										children: getTestimonialInitials(testimonial.name)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: testimonial.name
									}), role ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground",
										children: role
									}) : null] })]
								})
							]
						})
					}, testimonial.id);
				})
			}), testimonials.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselPrevious, { className: "-left-2 top-[calc(50%-1.25rem)] hidden border-border bg-background shadow-soft sm:flex md:-left-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselNext, { className: "-right-2 top-[calc(50%-1.25rem)] hidden border-border bg-background shadow-soft sm:flex md:-right-4" })] }) : null]
		})]
	});
}
function Newsletter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-[2.5rem] bg-card p-10 shadow-soft ring-1 ring-border/60 sm:p-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-40 blur-3xl [background:radial-gradient(circle,var(--lavender),transparent_60%)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full opacity-40 blur-3xl [background:radial-gradient(circle,var(--mint),transparent_60%)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid gap-10 lg:grid-cols-2 lg:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.24em] text-muted-foreground",
							children: "07 — Journal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
							children: "Wellness in your inbox, weekly."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-muted-foreground",
							children: "A calm dispatch of movement, recovery, and product drops — from our studio to yours."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex flex-col gap-3 sm:flex-row",
						onSubmit: (e) => e.preventDefault(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							placeholder: "you@wellness.com",
							className: "w-full rounded-full border border-border bg-background px-6 py-4 text-sm outline-none ring-ring/30 transition focus:ring-4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition hover:opacity-90",
							children: "Subscribe"
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { Home as component };
