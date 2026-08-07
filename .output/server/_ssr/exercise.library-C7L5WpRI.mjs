import { a as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as EquipmentCardSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { _ as Link, b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Play, ht as ChevronDown, mt as ChevronLeft, n as X, rt as Eye } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { i as getExercises, n as getEquipmentList } from "./exercise-a9sO23D0.mjs";
import { n as parseEquipmentIds, t as getSelectedEquipment } from "./selection-BcMgILWp.mjs";
import { c as Route } from "./router-BAl0mxep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exercise.library-C7L5WpRI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var explore_library_module_default = {
	container: "_container_olr2v_1",
	header: "_header_olr2v_11",
	backBtn: "_backBtn_olr2v_22",
	headerMain: "_headerMain_olr2v_38",
	pageTitle: "_pageTitle_olr2v_47",
	pageSubtitle: "_pageSubtitle_olr2v_61",
	filterDropdown: "_filterDropdown_olr2v_69",
	filterTrigger: "_filterTrigger_olr2v_74",
	filterChevron: "_filterChevron_olr2v_96",
	filterChevronOpen: "_filterChevronOpen_olr2v_100",
	filterMenu: "_filterMenu_olr2v_104",
	chip: "_chip_olr2v_120",
	moreFilters: "_moreFilters_olr2v_136",
	moreChip: "_moreChip_olr2v_145",
	chipClose: "_chipClose_olr2v_157",
	listArea: "_listArea_olr2v_168",
	exerciseCard: "_exerciseCard_olr2v_178",
	imageWrap: "_imageWrap_olr2v_198",
	exerciseImage: "_exerciseImage_olr2v_206",
	imageOverlay: "_imageOverlay_olr2v_210",
	imageContent: "_imageContent_olr2v_223",
	targetBadge: "_targetBadge_olr2v_230",
	exerciseTitle: "_exerciseTitle_olr2v_245",
	cardBody: "_cardBody_olr2v_258",
	statsRow: "_statsRow_olr2v_266",
	statBlock: "_statBlock_olr2v_273",
	statLabel: "_statLabel_olr2v_280",
	statValue: "_statValue_olr2v_288",
	instructions: "_instructions_olr2v_299",
	primaryBtn: "_primaryBtn_olr2v_311",
	secondaryBtn: "_secondaryBtn_olr2v_312",
	listAreaCompact: "_listAreaCompact_olr2v_377"
};
function mapExercise(item) {
	return {
		id: item.id,
		title: item.exerciseName,
		target: (item.targetMuscle ?? "FULL BODY").toUpperCase(),
		image: item.exerciseImage || "/images/bicep-curl.png",
		difficulty: item.difficulty ?? "Beginner",
		standard: item.standardRecommendation ?? `${item.sets ?? 3} sets, ${item.reps ?? 12} reps`,
		instructions: item.description ?? "",
		primaryAction: !item.buttonType || item.buttonType === "START_EXERCISE",
		equipmentNames: (item.equipment ?? []).map((e) => e.name)
	};
}
function EquippedLibraryPage() {
	const router = useRouter();
	const search = Route.useSearch();
	const [filtersOpen, setFiltersOpen] = (0, import_react.useState)(false);
	const [exercises, setExercises] = (0, import_react.useState)([]);
	const [equipmentOptions, setEquipmentOptions] = (0, import_react.useState)([]);
	const [activeFilterIds, setActiveFilterIds] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [loadError, setLoadError] = (0, import_react.useState)(false);
	const filterRef = (0, import_react.useRef)(null);
	const availableEquipmentIds = (0, import_react.useMemo)(() => {
		const fromUrl = parseEquipmentIds(search.equipment_ids);
		if (fromUrl.length > 0) return fromUrl;
		const stored = getSelectedEquipment();
		if (stored.length > 0) return stored;
		const focus = Number(search.focus);
		return !Number.isNaN(focus) && focus > 0 ? [focus] : [];
	}, [search.equipment_ids, search.focus]);
	const focusEquipmentId = Number(search.focus);
	(0, import_react.useEffect)(() => {
		setActiveFilterIds(!Number.isNaN(focusEquipmentId) && focusEquipmentId > 0 ? [focusEquipmentId] : availableEquipmentIds);
	}, [availableEquipmentIds, focusEquipmentId]);
	(0, import_react.useEffect)(() => {
		getEquipmentList().then((data) => {
			setEquipmentOptions(data.filter((item) => availableEquipmentIds.includes(item.id)));
		}).catch(() => {
			setEquipmentOptions([]);
		});
	}, [availableEquipmentIds]);
	(0, import_react.useEffect)(() => {
		if (activeFilterIds.length === 0) {
			setExercises([]);
			setLoading(false);
			return;
		}
		setLoading(true);
		setLoadError(false);
		getExercises(activeFilterIds).then((data) => {
			setExercises(data.map(mapExercise));
		}).catch(() => {
			setExercises([]);
			setLoadError(true);
		}).finally(() => {
			setLoading(false);
		});
	}, [activeFilterIds]);
	(0, import_react.useEffect)(() => {
		const handleClickOutside = (event) => {
			if (filterRef.current && !filterRef.current.contains(event.target)) setFiltersOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const activeFilters = equipmentOptions.filter((item) => activeFilterIds.includes(item.id));
	const headline = equipmentOptions.find((item) => item.id === focusEquipmentId)?.headline ?? equipmentOptions[0]?.headline ?? "Equipped Library";
	const removeFilter = (equipmentId) => {
		setActiveFilterIds((prev) => {
			const next = prev.filter((id) => id !== equipmentId);
			return next.length > 0 ? next : prev;
		});
	};
	const addFilter = (equipmentId) => {
		setActiveFilterIds((prev) => prev.includes(equipmentId) ? prev : [...prev, equipmentId]);
		setFiltersOpen(false);
	};
	const inactiveOptions = equipmentOptions.filter((item) => !activeFilterIds.includes(item.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: explore_library_module_default.container,
			style: { paddingTop: "var(--desktop-nav-height)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: explore_library_module_default.header,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: explore_library_module_default.backBtn,
					onClick: () => router.history.back(),
					"aria-label": "Go back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: explore_library_module_default.headerMain,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: explore_library_module_default.pageTitle,
						children: headline
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: explore_library_module_default.pageSubtitle,
						children: "Equipped Library"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: explore_library_module_default.filterDropdown,
						ref: filterRef,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: explore_library_module_default.filterTrigger,
							onClick: () => setFiltersOpen((open) => !open),
							"aria-expanded": filtersOpen,
							"aria-haspopup": "true",
							children: [
								activeFilterIds.length,
								" Filters Active",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
									size: 16,
									className: `${explore_library_module_default.filterChevron} ${filtersOpen ? explore_library_module_default.filterChevronOpen : ""}`
								})
							]
						}), filtersOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: explore_library_module_default.filterMenu,
							children: [activeFilters.map((filter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: explore_library_module_default.chip,
								onClick: () => removeFilter(filter.id),
								children: [filter.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									size: 14,
									className: explore_library_module_default.chipClose
								})]
							}, filter.id)), inactiveOptions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: explore_library_module_default.moreFilters,
								children: inactiveOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: explore_library_module_default.moreChip,
									onClick: () => addFilter(option.id),
									children: ["+ ", option.name]
								}, option.id))
							}) : null]
						}) : null]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${explore_library_module_default.listArea} ${!loading && exercises.length < 2 ? explore_library_module_default.listAreaCompact : ""}`,
				children: [
					loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 p-6 sm:grid-cols-2",
						children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentCardSkeleton, {}, i))
					}) : null,
					!loading && loadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							padding: "24px",
							color: "#64748b"
						},
						children: "Could not load exercises. Please try again."
					}) : null,
					!loading && !loadError && exercises.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: {
							padding: "24px",
							color: "#64748b"
						},
						children: [
							"No exercises found for the selected equipment.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/exercise",
								className: "underline",
								children: "Choose equipment"
							})
						]
					}) : null,
					!loading && exercises.map((exercise, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: explore_library_module_default.exerciseCard,
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .4,
							delay: i * .1
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: explore_library_module_default.imageWrap,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: exercise.image,
									alt: exercise.title,
									className: explore_library_module_default.exerciseImage,
									style: {
										position: "absolute",
										inset: 0,
										width: "100%",
										height: "100%",
										objectFit: "cover"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: explore_library_module_default.imageOverlay }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: explore_library_module_default.imageContent,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: explore_library_module_default.targetBadge,
										children: exercise.target
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: explore_library_module_default.cardBody,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: explore_library_module_default.exerciseTitle,
									children: exercise.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: explore_library_module_default.statsRow,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: explore_library_module_default.statBlock,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: explore_library_module_default.statLabel,
											children: "Difficulty"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: explore_library_module_default.statValue,
											children: exercise.difficulty
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: explore_library_module_default.statBlock,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: explore_library_module_default.statLabel,
											children: "Standard"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: explore_library_module_default.statValue,
											children: exercise.standard
										})]
									})]
								}),
								exercise.instructions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: explore_library_module_default.instructions,
									children: exercise.instructions
								}) : null,
								exercise.primaryAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/exercise/active/$id",
									params: { id: String(exercise.id) },
									className: explore_library_module_default.primaryBtn,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
										size: 13,
										fill: "currentColor"
									}), "START EXERCISE"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: explore_library_module_default.secondaryBtn,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 13 }), "VIEW FORM GUIDE"]
								})
							]
						})]
					}, exercise.id))
				]
			})]
		})]
	});
}
//#endregion
export { EquippedLibraryPage as component };
