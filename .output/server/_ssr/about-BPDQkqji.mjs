import { a as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { Et as Activity, K as Leaf, Z as Heart, f as Target, h as Sparkles, mt as ChevronLeft, rt as Eye, yt as Brain } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as Footer } from "./Footer-C1eaAiAb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BPDQkqji.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var premium_module_default = {
	reveal: "_reveal_12nz6_1",
	revealVisible: "_revealVisible_12nz6_9"
};
function AnimatedSection({ children, className = "", delay = 0 }) {
	const ref = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const node = ref.current;
		if (!node) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setVisible(true);
			return;
		}
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setVisible(true);
				observer.disconnect();
			}
		}, {
			threshold: .12,
			rootMargin: "0px 0px -40px 0px"
		});
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: `${premium_module_default.reveal} ${visible ? premium_module_default.revealVisible : ""} ${className}`,
		style: delay ? { transitionDelay: `${delay}ms` } : void 0,
		children
	});
}
var about_module_default = {
	page: "_page_1d5gl_3",
	header: "_header_1d5gl_11",
	backBtn: "_backBtn_1d5gl_24",
	headerTitle: "_headerTitle_1d5gl_37",
	content: "_content_1d5gl_45",
	hero: "_hero_1d5gl_53",
	heroBg: "_heroBg_1d5gl_67",
	heroMesh: "_heroMesh_1d5gl_79",
	heroGrid: "_heroGrid_1d5gl_88",
	heroInner: "_heroInner_1d5gl_98",
	heroBadge: "_heroBadge_1d5gl_107",
	heroBadgeDot: "_heroBadgeDot_1d5gl_124",
	heroTitle: "_heroTitle_1d5gl_132",
	heroTitleAccent: "_heroTitleAccent_1d5gl_142",
	heroLead: "_heroLead_1d5gl_150",
	heroChips: "_heroChips_1d5gl_159",
	heroChip: "_heroChip_1d5gl_159",
	heroScroll: "_heroScroll_1d5gl_177",
	scrollDot: "_scrollDot_1d5gl_1",
	sectionNum: "_sectionNum_1d5gl_209",
	sectionNumDark: "_sectionNumDark_1d5gl_220",
	sectionLabel: "_sectionLabel_1d5gl_231",
	sectionLabelLight: "_sectionLabelLight_1d5gl_244",
	storyBlock: "_storyBlock_1d5gl_259",
	founderBlock: "_founderBlock_1d5gl_268",
	founderSignature: "_founderSignature_1d5gl_277",
	storyAside: "_storyAside_1d5gl_286",
	storyHeading: "_storyHeading_1d5gl_290",
	storyBody: "_storyBody_1d5gl_301",
	leadPara: "_leadPara_1d5gl_314",
	quoteCard: "_quoteCard_1d5gl_325",
	methodBand: "_methodBand_1d5gl_358",
	methodHead: "_methodHead_1d5gl_393",
	methodHeadLeft: "_methodHeadLeft_1d5gl_402",
	methodTitle: "_methodTitle_1d5gl_406",
	methodWordMind: "_methodWordMind_1d5gl_416",
	methodWordMove: "_methodWordMove_1d5gl_420",
	methodWordFuel: "_methodWordFuel_1d5gl_424",
	methodDot: "_methodDot_1d5gl_428",
	methodIntro: "_methodIntro_1d5gl_434",
	methodBody: "_methodBody_1d5gl_446",
	methodDiagram: "_methodDiagram_1d5gl_457",
	diagramSvg: "_diagramSvg_1d5gl_464",
	diagramCenter: "_diagramCenter_1d5gl_472",
	diagramCenterGlow: "_diagramCenterGlow_1d5gl_486",
	hubPulse: "_hubPulse_1d5gl_1",
	diagramCenterText: "_diagramCenterText_1d5gl_496",
	diagramNode: "_diagramNode_1d5gl_518",
	diagramNodeIcon: "_diagramNodeIcon_1d5gl_541",
	mind: "_mind_1d5gl_551",
	move: "_move_1d5gl_568",
	fuel: "_fuel_1d5gl_580",
	methodCards: "_methodCards_1d5gl_594",
	methodCard: "_methodCard_1d5gl_594",
	methodCardGlow: "_methodCardGlow_1d5gl_612",
	methodCardInner: "_methodCardInner_1d5gl_636",
	methodCardTop: "_methodCardTop_1d5gl_656",
	methodCardIcon: "_methodCardIcon_1d5gl_663",
	methodCardMeta: "_methodCardMeta_1d5gl_688",
	methodCardNum: "_methodCardNum_1d5gl_695",
	methodCardTag: "_methodCardTag_1d5gl_703",
	methodClosing: "_methodClosing_1d5gl_727",
	methodClosingIcon: "_methodClosingIcon_1d5gl_741",
	pillarStack: "_pillarStack_1d5gl_756",
	pillarRow: "_pillarRow_1d5gl_763",
	pillarMeta: "_pillarMeta_1d5gl_774",
	pillarIconWrap: "_pillarIconWrap_1d5gl_784",
	pillarText: "_pillarText_1d5gl_796",
	valuesSection: "_valuesSection_1d5gl_805",
	valuesHead: "_valuesHead_1d5gl_809",
	valuesTitle: "_valuesTitle_1d5gl_813",
	valuesBento: "_valuesBento_1d5gl_822",
	valueTile: "_valueTile_1d5gl_828",
	valueMint: "_valueMint_1d5gl_854",
	valueAqua: "_valueAqua_1d5gl_855",
	valueSky: "_valueSky_1d5gl_856",
	valueLavender: "_valueLavender_1d5gl_857",
	valueGradient: "_valueGradient_1d5gl_858",
	valueIndex: "_valueIndex_1d5gl_860",
	valueFeatured: "_valueFeatured_1d5gl_885",
	brandDuo: "_brandDuo_1d5gl_893",
	brandPanel: "_brandPanel_1d5gl_900",
	brandLead: "_brandLead_1d5gl_908",
	nameBreakdown: "_nameBreakdown_1d5gl_915",
	namePart: "_namePart_1d5gl_921",
	nameKey: "_nameKey_1d5gl_928",
	nameDivider: "_nameDivider_1d5gl_940",
	traitList: "_traitList_1d5gl_945",
	traitPill: "_traitPill_1d5gl_952",
	promisePanel: "_promisePanel_1d5gl_961",
	promiseIcon: "_promiseIcon_1d5gl_988",
	promiseTitle: "_promiseTitle_1d5gl_993",
	promiseEmphasis: "_promiseEmphasis_1d5gl_1009",
	pillarRowReverse: "_pillarRowReverse_1d5gl_1086"
};
var STORY_CHIPS = [
	"The way we think",
	"The way we move",
	"The way we nourish"
];
var VALUES = [
	{
		title: "Simplicity",
		text: "The best wellness routines are the ones we can sustain. We believe healthy living should feel clear, practical and achievable.",
		accent: "mint"
	},
	{
		title: "Balance",
		text: "True wellbeing comes from nurturing the mind, moving the body and fuelling it well. Every part matters, and each strengthens the other.",
		accent: "aqua"
	},
	{
		title: "Quality",
		text: "Whether it's a product, an ingredient or a piece of educational content, we create with care, intention and uncompromising standards.",
		accent: "sky"
	},
	{
		title: "Growth",
		text: "Wellness is a lifelong journey. We celebrate progress, curiosity and the small improvements that lead to meaningful change.",
		accent: "lavender"
	},
	{
		title: "Community",
		text: "Wellness is more rewarding when it's shared. We're building a community that encourages, supports and inspires one another.",
		accent: "gradient",
		featured: true
	}
];
var METHOD_PILLARS = [
	{
		icon: Brain,
		title: "Mind",
		tag: "Foundation",
		text: "Every healthy habit begins with the way we think. The choices we make, the routines we build and the mindset we nurture influence every aspect of our wellbeing. A healthy mind creates the foundation for lasting change.",
		accent: "mind"
	},
	{
		icon: Activity,
		title: "Move",
		tag: "Energy",
		text: "Movement is one of life's greatest gifts. Whether it's a strength workout, a morning walk, stretching between meetings or practising yoga, every movement contributes to feeling stronger, more energised and more connected to our bodies.",
		accent: "move"
	},
	{
		icon: Leaf,
		title: "Fuel",
		tag: "Vitality",
		text: "The food we eat is more than nourishment—it's information for our body. Choosing wholesome, functional nutrition gives us the energy to perform, recover and enjoy life with vitality.",
		accent: "fuel"
	}
];
var PILLARS = [
	{
		icon: Target,
		label: "Our Mission",
		num: "04",
		text: "We exist to help people become the kind who naturally prioritise their wellbeing. Someone who moves with intention. Nourishes themself thoughtfully. Makes time for recovery. And understands that small daily choices create extraordinary lives."
	},
	{
		icon: Eye,
		label: "Our Vision",
		num: "05",
		text: "We envision a future where wellness feels natural, enjoyable and accessible to everyone. Our ambition is to become the Middle East's most trusted holistic wellness brand, inspiring individuals and communities to embrace healthier lifestyles through an integrated approach to wellbeing."
	},
	{
		icon: Heart,
		label: "Our Purpose",
		num: "06",
		text: "We created DEEPFIT with one purpose: to help people feel their best—not just for a season, but for life. Everything we design, develop and share is intended to make healthy living simpler, more enjoyable and easier to maintain. Because when wellness fits naturally into everyday life, consistency follows. And consistency is where lasting transformation begins."
	}
];
var FIT_TRAITS = [
	"Strong",
	"Capable",
	"Confident",
	"Energised",
	"Balanced"
];
function AboutPage() {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: about_module_default.page,
			style: { paddingTop: "var(--desktop-nav-height)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: about_module_default.header,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: about_module_default.backBtn,
						onClick: () => router.history.back(),
						"aria-label": "Go back",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 22 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: about_module_default.headerTitle,
						children: "About Us"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: about_module_default.hero,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: about_module_default.heroBg,
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: about_module_default.heroMesh,
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: about_module_default.heroGrid,
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: about_module_default.heroInner,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									className: about_module_default.heroBadge,
									initial: {
										opacity: 0,
										y: 14
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { duration: .55 },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: about_module_default.heroBadgeDot }), "About DeepFit"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
									className: about_module_default.heroTitle,
									initial: {
										opacity: 0,
										y: 24
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										duration: .65,
										delay: .08
									},
									children: ["Wellness", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: about_module_default.heroTitleAccent,
										children: "Inside Out"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									className: about_module_default.heroLead,
									initial: {
										opacity: 0,
										y: 18
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										duration: .65,
										delay: .16
									},
									children: "A deeper, more meaningful approach to wellbeing—built on the small choices we make every day."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: about_module_default.heroChips,
									initial: {
										opacity: 0,
										y: 16
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										duration: .65,
										delay: .24
									},
									children: STORY_CHIPS.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: about_module_default.heroChip,
										children: chip
									}, chip))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: about_module_default.heroScroll,
							"aria-hidden": true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: about_module_default.content,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
							className: about_module_default.storyBlock,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: about_module_default.storyAside,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: about_module_default.sectionNum,
										children: "01"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: about_module_default.sectionLabel,
										children: "Our Story"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: about_module_default.storyHeading,
										children: "Wellness is created through daily choices"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: about_module_default.storyBody,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: about_module_default.leadPara,
										children: [
											"At ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "DEEPFIT" }),
											", we believe wellness is created through the small choices we make every day."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No single choice defines our health, but together, they shape how we feel, how we perform and how we experience life. That's the philosophy behind everything we create." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
										className: about_module_default.quoteCard,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", { children: ["DEEPFIT didn't begin with a product. It began with a question:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: " What if wellness could feel simpler?" })] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Our journey started in nutrition, helping people make better food choices. Along the way, we realised something important—nutrition is only one part of feeling well. Lasting wellbeing comes from the way we think, the way we move and the way we fuel ourselves." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "That realisation became the foundation for DEEPFIT. We didn't want to create another fitness brand. We wanted to build a wellness ecosystem." })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
							className: about_module_default.founderBlock,
							delay: 40,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: about_module_default.storyAside,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: about_module_default.sectionNum,
										children: "02"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: about_module_default.sectionLabel,
										children: "Founder"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: about_module_default.storyHeading,
										children: "Meet Deepa"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: about_module_default.storyBody,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: about_module_default.leadPara,
										children: [
											"I'm ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Deepa" }),
											", founder of ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "DEEPFIT" }),
											"."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Like many people, I spent years believing wellness had to be intense to be effective—long workouts, strict routines, and the constant pressure to do more." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Over time, I realised that lasting health is built differently." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "It's created through consistent movement, nourishing food, a resilient mindset, and habits that fit into everyday life." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "That belief became DEEPFIT." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every product, every idea, and every conversation is designed around one purpose: to make holistic wellness simpler, more practical, and sustainable for real life." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Because wellness shouldn't feel overwhelming. It should feel like something you can come back to, every single day." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Welcome to DEEPFIT." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
										className: about_module_default.quoteCard,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: about_module_default.founderSignature,
											children: "Wellness. Inside Out."
										}) })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
							className: about_module_default.methodBand,
							delay: 80,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: about_module_default.methodHead,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: about_module_default.methodHeadLeft,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: about_module_default.sectionNumDark,
												children: "03"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: about_module_default.sectionLabelLight,
												children: "The DeepFit Method"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
												className: about_module_default.methodTitle,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: about_module_default.methodWordMind,
														children: "Mind"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: about_module_default.methodDot,
														"aria-hidden": true,
														children: "·"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: about_module_default.methodWordMove,
														children: "Move"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: about_module_default.methodDot,
														"aria-hidden": true,
														children: "·"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: about_module_default.methodWordFuel,
														children: "Fuel"
													})
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: about_module_default.methodIntro,
										children: "Everything we create is guided by one simple belief: wellness works best when it's connected. We've called this The DEEPFIT Method—our integrated approach to helping people build healthier, more sustainable lives."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: about_module_default.methodBody,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: about_module_default.methodDiagram,
										"aria-hidden": true,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												className: about_module_default.diagramSvg,
												viewBox: "0 0 360 320",
												fill: "none",
												xmlns: "http://www.w3.org/2000/svg",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
															id: "lineMind",
															x1: "180",
															y1: "160",
															x2: "180",
															y2: "52",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
																stopColor: "#a78bfa",
																stopOpacity: "0.8"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
																offset: "1",
																stopColor: "#a78bfa",
																stopOpacity: "0"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
															id: "lineMove",
															x1: "180",
															y1: "160",
															x2: "68",
															y2: "252",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
																stopColor: "#6ee7b7",
																stopOpacity: "0.8"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
																offset: "1",
																stopColor: "#6ee7b7",
																stopOpacity: "0"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
															id: "lineFuel",
															x1: "180",
															y1: "160",
															x2: "292",
															y2: "252",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
																stopColor: "#6faef7",
																stopOpacity: "0.8"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
																offset: "1",
																stopColor: "#6faef7",
																stopOpacity: "0"
															})]
														})
													] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
														cx: "180",
														cy: "160",
														r: "108",
														stroke: "rgba(15,23,42,0.08)",
														strokeWidth: "1",
														strokeDasharray: "6 8"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "180",
														y1: "160",
														x2: "180",
														y2: "68",
														stroke: "url(#lineMind)",
														strokeWidth: "2",
														strokeLinecap: "round"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "180",
														y1: "160",
														x2: "76",
														y2: "244",
														stroke: "url(#lineMove)",
														strokeWidth: "2",
														strokeLinecap: "round"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "180",
														y1: "160",
														x2: "284",
														y2: "244",
														stroke: "url(#lineFuel)",
														strokeWidth: "2",
														strokeLinecap: "round"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: about_module_default.diagramCenter,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: about_module_default.diagramCenterGlow }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: about_module_default.diagramCenterText,
													children: "Better Life"
												})]
											}),
											METHOD_PILLARS.map((pillar, i) => {
												const Icon = pillar.icon;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: `${about_module_default.diagramNode} ${about_module_default[pillar.accent]}`,
													"data-position": i + 1,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: about_module_default.diagramNodeIcon,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
															size: 16,
															strokeWidth: 2.2
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pillar.title })]
												}, pillar.title);
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: about_module_default.methodCards,
										children: METHOD_PILLARS.map((pillar, i) => {
											const Icon = pillar.icon;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
												className: `${about_module_default.methodCard} ${about_module_default[pillar.accent]}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: about_module_default.methodCardGlow,
													"aria-hidden": true
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: about_module_default.methodCardInner,
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: about_module_default.methodCardTop,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: about_module_default.methodCardIcon,
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
																	size: 20,
																	strokeWidth: 2.2
																})
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: about_module_default.methodCardMeta,
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: about_module_default.methodCardNum,
																	children: String(i + 1).padStart(2, "0")
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: about_module_default.methodCardTag,
																	children: pillar.tag
																})]
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: pillar.title }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: pillar.text })
													]
												})]
											}, pillar.title);
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: about_module_default.methodClosing,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: about_module_default.methodClosingIcon,
										"aria-hidden": true,
										children: "✦"
									}), "Together, these three elements create a balanced approach to wellness that's practical, sustainable and designed for real life."]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: about_module_default.pillarStack,
							children: PILLARS.map((pillar, i) => {
								const Icon = pillar.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
									className: `${about_module_default.pillarRow} ${i % 2 === 1 ? about_module_default.pillarRowReverse : ""}`,
									delay: i * 60,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: about_module_default.pillarMeta,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: about_module_default.sectionNum,
												children: pillar.num
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: about_module_default.pillarIconWrap,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 22 })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: about_module_default.sectionLabel,
												children: pillar.label
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: about_module_default.pillarText,
										children: pillar.text
									})]
								}, pillar.label);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
							className: about_module_default.valuesSection,
							delay: 40,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: about_module_default.valuesHead,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: about_module_default.sectionNum,
										children: "07"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: about_module_default.sectionLabel,
										children: "Our Values"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: about_module_default.valuesTitle,
										children: "What guides everything we do"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: about_module_default.valuesBento,
								children: VALUES.map((value, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: `${about_module_default.valueTile} ${"featured" in value && value.featured ? about_module_default.valueFeatured : ""} ${about_module_default[`value${value.accent.charAt(0).toUpperCase()}${value.accent.slice(1)}`]}`,
									style: { transitionDelay: `${i * 50}ms` },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: about_module_default.valueIndex,
											children: String(i + 1).padStart(2, "0")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: value.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: value.text })
									]
								}, value.title))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatedSection, {
							className: about_module_default.brandDuo,
							delay: 60,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: about_module_default.brandPanel,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: about_module_default.sectionNum,
										children: "08"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: about_module_default.sectionLabel,
										children: "Why the name “DEEPFIT”?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: about_module_default.brandLead,
										children: "Every great brand begins with a meaningful idea. For us, that idea is reflected in our name."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: about_module_default.nameBreakdown,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: about_module_default.namePart,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: about_module_default.nameKey,
													children: "DEEP"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Lasting wellness starts beneath the surface—built through intention, knowledge and habits that strengthen us from within." })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: about_module_default.nameDivider,
												"aria-hidden": true
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: about_module_default.namePart,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: about_module_default.nameKey,
														children: "FIT"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: about_module_default.traitList,
														children: FIT_TRAITS.map((trait) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: about_module_default.traitPill,
															children: trait
														}, trait))
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "How we want people to feel—not by someone else's definition, but by discovering their own." })
												]
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: about_module_default.promisePanel,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
										size: 28,
										className: about_module_default.promiseIcon
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: about_module_default.sectionLabelLight,
										children: "Why “Wellness Inside Out”?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: about_module_default.promiseTitle,
										children: "Our daily promise"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Real wellness begins within. It starts with the choices we make, the food we eat, the way we move and the mindset we cultivate." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "When these elements work together, wellbeing naturally becomes visible in our energy, confidence and the way we experience life." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: about_module_default.promiseEmphasis,
										children: "It's the philosophy behind every product, every conversation, and every decision we make."
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		})]
	});
}
//#endregion
export { AboutPage as component };
