import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useAuth, a as getMainCategories, h as searchProducts, l as mapToCategoryProduct } from "./AuthContext-B71YYWma.mjs";
import { i as useWishlist, r as useCart } from "./WishlistContext-DDsVW1bM.mjs";
import { g as SearchDropdownSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Search, I as Menu, P as Mic, Z as Heart, n as X, o as User, y as ShoppingBag } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Nav-BaCy2SUO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getSpeechRecognitionCtor() {
	if (typeof window === "undefined") return void 0;
	const win = window;
	return win.SpeechRecognition ?? win.webkitSpeechRecognition;
}
function getTranscript(event) {
	let transcript = "";
	for (let index = event.resultIndex; index < event.results.length; index += 1) transcript += event.results[index][0]?.transcript ?? "";
	const isFinal = event.results[event.results.length - 1]?.isFinal ?? false;
	return {
		transcript: transcript.trim(),
		isFinal
	};
}
function useSpeechRecognition({ onResult, lang = "en-US" }) {
	const [isListening, setIsListening] = (0, import_react.useState)(false);
	const [isSupported, setIsSupported] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const recognitionRef = (0, import_react.useRef)(null);
	const onResultRef = (0, import_react.useRef)(onResult);
	onResultRef.current = onResult;
	(0, import_react.useEffect)(() => {
		const Ctor = getSpeechRecognitionCtor();
		setIsSupported(Boolean(Ctor));
		if (!Ctor) return;
		const recognition = new Ctor();
		recognition.continuous = false;
		recognition.interimResults = true;
		recognition.lang = lang;
		recognition.onresult = (event) => {
			const { transcript, isFinal } = getTranscript(event);
			if (!transcript) return;
			onResultRef.current(transcript, isFinal);
		};
		recognition.onerror = (event) => {
			if (event.error === "aborted") {
				setIsListening(false);
				return;
			}
			if (event.error === "no-speech") setError("No speech detected. Try again.");
			else if (event.error === "not-allowed") setError("Microphone permission denied.");
			else setError("Voice search is unavailable. Please type instead.");
			setIsListening(false);
		};
		recognition.onend = () => {
			setIsListening(false);
		};
		recognitionRef.current = recognition;
		return () => {
			recognition.abort();
			recognitionRef.current = null;
		};
	}, [lang]);
	const startListening = (0, import_react.useCallback)(() => {
		const recognition = recognitionRef.current;
		if (!recognition) {
			setError("Voice search is not supported in this browser.");
			return;
		}
		try {
			setError("");
			setIsListening(true);
			recognition.start();
		} catch {
			setIsListening(false);
			setError("Could not start voice search. Try again.");
		}
	}, []);
	const stopListening = (0, import_react.useCallback)(() => {
		recognitionRef.current?.stop();
		setIsListening(false);
	}, []);
	return {
		isListening,
		isSupported,
		error,
		setError,
		startListening,
		stopListening,
		toggleListening: (0, import_react.useCallback)(() => {
			if (isListening) {
				stopListening();
				return;
			}
			startListening();
		}, [
			isListening,
			startListening,
			stopListening
		])
	};
}
function useSearchPage(searchParams = {}) {
	const navigate = useNavigate();
	const inputRef = (0, import_react.useRef)(null);
	const [query, setQuery] = (0, import_react.useState)(searchParams.q ?? "");
	const [trendingCategories, setTrendingCategories] = (0, import_react.useState)([]);
	const [results, setResults] = (0, import_react.useState)([]);
	const [totalCount, setTotalCount] = (0, import_react.useState)(0);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [loadingMore, setLoadingMore] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [hasSearched, setHasSearched] = (0, import_react.useState)(Boolean(searchParams.q));
	const [hasMore, setHasMore] = (0, import_react.useState)(false);
	const [offset, setOffset] = (0, import_react.useState)(0);
	const voiceAutoStartRef = (0, import_react.useRef)(false);
	const { isListening, isSupported, error: voiceError, setError: setVoiceError, startListening, toggleListening } = useSpeechRecognition({ onResult: (transcript) => {
		setQuery(transcript);
		setVoiceError("");
	} });
	(0, import_react.useEffect)(() => {
		getMainCategories().then((categories) => setTrendingCategories(categories.slice(0, 8))).catch(() => setTrendingCategories([]));
	}, []);
	(0, import_react.useEffect)(() => {
		if (searchParams.q !== void 0) {
			setQuery(searchParams.q);
			setHasSearched(Boolean(searchParams.q));
		}
	}, [searchParams.q]);
	(0, import_react.useEffect)(() => {
		inputRef.current?.focus();
	}, []);
	(0, import_react.useEffect)(() => {
		if (searchParams.voice !== "1" || !isSupported || voiceAutoStartRef.current) return;
		voiceAutoStartRef.current = true;
		startListening();
		navigate({
			to: "/search",
			search: searchParams.q ? { q: searchParams.q } : {},
			replace: true
		});
	}, [
		searchParams.voice,
		searchParams.q,
		isSupported,
		startListening,
		navigate
	]);
	const runSearch = (0, import_react.useCallback)(async (searchQuery, nextOffset = 0) => {
		const trimmed = searchQuery.trim();
		if (!trimmed) {
			setResults([]);
			setTotalCount(0);
			setHasSearched(false);
			setHasMore(false);
			setOffset(0);
			return;
		}
		if (nextOffset === 0) {
			setLoading(true);
			setError("");
			setHasSearched(true);
		} else setLoadingMore(true);
		try {
			const response = await searchProducts(trimmed, {
				limit: 24,
				offset: nextOffset
			});
			const mapped = response.products.map(mapToCategoryProduct);
			if (nextOffset === 0) {
				setResults(mapped);
				setTotalCount(response.count);
			} else setResults((prev) => [...prev, ...mapped]);
			const newOffset = nextOffset + mapped.length;
			setOffset(newOffset);
			setHasMore(newOffset < response.count);
		} catch {
			if (nextOffset === 0) {
				setResults([]);
				setTotalCount(0);
				setError("Could not search products. Please try again.");
			}
		} finally {
			setLoading(false);
			setLoadingMore(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const trimmed = query.trim();
		if (!trimmed) {
			setResults([]);
			setTotalCount(0);
			setHasSearched(false);
			setHasMore(false);
			setOffset(0);
			setError("");
			return;
		}
		const timer = window.setTimeout(() => {
			runSearch(trimmed);
		}, 350);
		return () => window.clearTimeout(timer);
	}, [query, runSearch]);
	const handleLoadMore = () => {
		if (!hasMore || loadingMore || loading || !query.trim()) return;
		runSearch(query, offset);
	};
	const handleOpenProduct = (product) => {
		navigate({
			to: "/product/$slug",
			params: { slug: String(product.id) }
		});
	};
	return {
		inputRef,
		query,
		setQuery,
		trendingCategories,
		results,
		totalCount,
		loading,
		loadingMore,
		error,
		hasSearched,
		hasMore,
		handleLoadMore,
		handleOpenProduct,
		isListening,
		isSupported,
		voiceError,
		toggleListening
	};
}
/** Adapt API product views to the New site ProductCard shape (keeps New design). */
function homeProductToCard(product) {
	return {
		slug: String(product.id),
		name: product.title,
		tagline: product.stockLabel || "Premium Deepfit product",
		price: product.price,
		compareAt: product.originalPrice > product.price ? product.originalPrice : void 0,
		image: product.image,
		category: product.mainCategoryName || product.categoryName || "All",
		badge: product.tag,
		rating: product.rating || 0,
		reviews: product.reviewCount || 0,
		colors: [],
		description: product.title,
		features: [],
		specs: {}
	};
}
function categoryProductToCard(product) {
	return {
		slug: String(product.id),
		name: product.title,
		tagline: product.brand || product.deliveryTime || "Premium Deepfit product",
		price: product.price,
		compareAt: product.originalPrice && product.originalPrice > product.price ? product.originalPrice : void 0,
		image: product.image,
		category: "Strength",
		badge: product.badge,
		rating: product.rating || 0,
		reviews: product.reviewCount || 0,
		colors: [],
		description: product.title,
		features: [],
		specs: product.weight ? { Weight: product.weight } : {}
	};
}
function productIdFromSlug(slug) {
	const id = Number(slug);
	return Number.isFinite(id) && id > 0 ? id : null;
}
function HeaderSearch() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const panelRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const { inputRef, query, setQuery, results, loading, hasSearched, isListening, isSupported, voiceError, toggleListening, handleOpenProduct } = useSearchPage();
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKeyDown = (event) => {
			if (event.key === "Escape") setOpen(false);
		};
		const onPointerDown = (event) => {
			if (!panelRef.current?.contains(event.target)) setOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		document.addEventListener("mousedown", onPointerDown);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("mousedown", onPointerDown);
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (open) window.setTimeout(() => inputRef.current?.focus(), 0);
	}, [open, inputRef]);
	const showResults = open && hasSearched && query.trim().length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/search",
		"aria-label": "Search",
		className: "rounded-full p-2 transition hover:bg-foreground/5 sm:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: panelRef,
		className: "relative hidden sm:block",
		children: [
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-[min(420px,42vw)] items-center gap-2 rounded-full border border-border/80 bg-card px-3 py-1.5 shadow-soft ring-1 ring-border/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						size: 16,
						className: "shrink-0 text-muted-foreground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "search",
						value: query,
						onChange: (event) => setQuery(event.target.value),
						onKeyDown: (event) => {
							if (event.key === "Enter" && query.trim()) {
								setOpen(false);
								navigate({
									to: "/search",
									search: { q: query.trim() }
								});
							}
						},
						placeholder: "Search \"protein, dumbbells...\"",
						className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground",
						autoComplete: "off"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: toggleListening,
						disabled: !isSupported,
						"aria-label": isListening ? "Stop voice search" : "Voice search",
						"aria-pressed": isListening,
						className: `rounded-full p-1.5 transition ${isListening ? "bg-red-500/10 text-red-500" : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"} disabled:opacity-40`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { size: 16 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen(false),
						"aria-label": "Close search",
						className: "rounded-full p-1.5 text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setOpen(true),
				"aria-label": "Search",
				className: "rounded-full p-2 transition hover:bg-foreground/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 })
			}),
			open && isListening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "absolute right-0 top-full mt-2 whitespace-nowrap text-xs text-muted-foreground",
				role: "status",
				children: "Listening… speak now"
			}) : null,
			open && voiceError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "absolute right-0 top-full mt-2 max-w-xs text-xs text-red-500",
				role: "alert",
				children: voiceError
			}) : null,
			showResults ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-0 top-full z-50 mt-3 w-[min(420px,90vw)] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-glass ring-1 ring-border/40",
				children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchDropdownSkeleton, { count: 4 }) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 py-6 text-center text-sm text-muted-foreground",
					children: "No products found"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "max-h-80 overflow-y-auto py-2",
					children: results.slice(0, 6).map((product) => {
						const card = categoryProductToCard(product);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setOpen(false);
								handleOpenProduct(product);
							},
							className: "flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-foreground/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: card.image,
								alt: "",
								className: "h-10 w-10 shrink-0 rounded-lg bg-white object-contain p-0.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-medium",
									children: card.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: ["AED ", card.price]
								})]
							})]
						}) }, product.id);
					})
				}), results.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border/60 px-4 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/search",
						search: { q: query.trim() },
						onClick: () => setOpen(false),
						className: "text-xs font-medium uppercase tracking-widest text-foreground/80 transition hover:text-foreground",
						children: "View all results"
					})
				}) : null]
			}) : null
		]
	})] });
}
var logo_module_default = {
	logo: "_logo_1luvp_1",
	logoColor: "_logoColor_1luvp_8"
};
var SOURCES = {
	color: "/images/logo/bcaa.png",
	white: "/images/logo/Deepfit-Logo-white.png"
};
function Logo({ variant = "color", height = 44, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: SOURCES[variant],
		alt: "Deepfit — Wellness Inside Out",
		className: `${logo_module_default.logo} ${variant === "color" ? logo_module_default.logoColor : ""} ${className ?? ""}`,
		style: { maxHeight: `${height}px` }
	});
}
var lockCount = 0;
var savedScrollY = 0;
function useBodyScrollLock(isOpen) {
	(0, import_react.useEffect)(() => {
		if (!isOpen) return;
		if (lockCount === 0) {
			savedScrollY = window.scrollY;
			document.body.style.position = "fixed";
			document.body.style.top = `-${savedScrollY}px`;
			document.body.style.left = "0";
			document.body.style.right = "0";
			document.body.style.width = "100%";
			document.body.style.overflow = "hidden";
		}
		lockCount++;
		return () => {
			lockCount--;
			if (lockCount === 0) {
				document.body.style.position = "";
				document.body.style.top = "";
				document.body.style.left = "";
				document.body.style.right = "";
				document.body.style.width = "";
				document.body.style.overflow = "";
				window.scrollTo(0, savedScrollY);
			}
		};
	}, [isOpen]);
}
var links = [
	{
		to: "/shop",
		label: "Shop"
	},
	{
		to: "/explore",
		label: "Explore"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function Nav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const { itemCount, cartToast, dismissCartToast } = useCart();
	const { isAuthenticated, user } = useAuth();
	const { itemCount: wishlistCount } = useWishlist();
	useBodyScrollLock(mobileOpen);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!cartToast) return;
		const t = window.setTimeout(() => dismissCartToast(), 2800);
		return () => window.clearTimeout(t);
	}, [cartToast, dismissCartToast]);
	(0, import_react.useEffect)(() => {
		if (!mobileOpen) return;
		const onKeyDown = (event) => {
			if (event.key === "Escape") setMobileOpen(false);
		};
		const onResize = () => {
			if (window.matchMedia("(min-width: 768px)").matches) setMobileOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("resize", onResize);
		};
	}, [mobileOpen]);
	const closeMobile = () => setMobileOpen(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-border/80 bg-[rgba(252,252,253,0.96)] shadow-soft backdrop-blur-xl" : "border-transparent bg-[rgba(252,252,253,0.88)] backdrop-blur-md"}`,
		children: [
			cartToast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 top-full flex justify-center px-4 pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-full bg-foreground px-4 py-2 text-xs text-background shadow-soft",
					children: cartToast
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10 lg:py-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": mobileOpen ? "Close menu" : "Open menu",
							"aria-expanded": mobileOpen,
							"aria-controls": "mobile-nav",
							className: "rounded-full p-2 text-foreground/80 transition hover:bg-foreground/5 md:hidden",
							onClick: () => setMobileOpen((open) => !open),
							children: mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "flex shrink-0 items-center py-1",
							onClick: closeMobile,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { height: 52 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-10 md:flex",
						children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: "story-link text-sm font-medium text-foreground/80 transition-colors hover:text-foreground",
							activeProps: { className: "text-foreground" },
							children: l.label
						}, l.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 text-foreground/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderSearch, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/profile/wishlist",
								"aria-label": "Wishlist",
								className: "relative hidden rounded-full p-2 transition hover:bg-foreground/5 sm:inline-flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									size: 18,
									fill: wishlistCount > 0 ? "currentColor" : "none",
									className: wishlistCount > 0 ? "text-red-500" : void 0
								}), wishlistCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background",
									children: wishlistCount > 99 ? "99+" : wishlistCount
								}) : null]
							}),
							isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profile",
								"aria-label": `Account ${user?.name ?? ""}`,
								className: "hidden rounded-full p-2 transition hover:bg-foreground/5 sm:inline-flex",
								title: user?.name ?? "Account",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 18 })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								"aria-label": "Account",
								className: "hidden rounded-full p-2 transition hover:bg-foreground/5 sm:inline-flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 18 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cart",
								"aria-label": "Cart",
								className: "ml-1 flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:opacity-90",
								onClick: closeMobile,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 16 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "hidden sm:inline",
										children: ["Cart · ", itemCount]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sm:hidden",
										children: itemCount
									})
								]
							})
						]
					})
				]
			}),
			mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-full md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Close menu",
					className: "fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px]",
					onClick: closeMobile
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "mobile-nav",
					role: "dialog",
					"aria-modal": "true",
					"aria-label": "Navigation menu",
					className: "relative z-50 border-b border-border/80 bg-[rgba(252,252,253,0.98)] shadow-soft backdrop-blur-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4",
						children: [
							links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.to,
								onClick: closeMobile,
								className: "rounded-xl px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground",
								activeProps: { className: "bg-foreground/5 text-foreground" },
								children: l.label
							}, l.to)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-2 h-px bg-border/70" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/profile/wishlist",
								onClick: closeMobile,
								className: "flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
										size: 18,
										fill: wishlistCount > 0 ? "currentColor" : "none",
										className: wishlistCount > 0 ? "text-red-500" : void 0
									}), "Wishlist"]
								}), wishlistCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[11px] font-medium text-background",
									children: wishlistCount > 99 ? "99+" : wishlistCount
								}) : null]
							}),
							isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/profile",
								onClick: closeMobile,
								className: "inline-flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 18 }), user?.name ? `Account · ${user.name}` : "Account"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login",
								onClick: closeMobile,
								className: "inline-flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 18 }), "Sign in"]
							})
						]
					})
				})]
			}) : null
		]
	});
}
//#endregion
export { productIdFromSlug as a, homeProductToCard as i, Nav as n, useBodyScrollLock as o, categoryProductToCard as r, useSearchPage as s, Logo as t };
