import { a as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as EquipmentCardSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { gt as Check } from "../_libs/lucide-react.mjs";
import { n as getEquipmentList } from "./exercise-a9sO23D0.mjs";
import { r as saveSelectedEquipment, t as getSelectedEquipment } from "./selection-BcMgILWp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ChooseEquipment-CELdJWw_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var exercise_module_default = {
	exerciseContainer: "_exerciseContainer_14fuh_1",
	header: "_header_14fuh_10",
	backBtn: "_backBtn_14fuh_20",
	pageTitle: "_pageTitle_14fuh_32",
	subtitle: "_subtitle_14fuh_40",
	embeddedContainer: "_embeddedContainer_14fuh_47",
	embeddedIntro: "_embeddedIntro_14fuh_54",
	embeddedSubtitle: "_embeddedSubtitle_14fuh_58",
	statusText: "_statusText_14fuh_66",
	gridArea: "_gridArea_14fuh_75",
	loadError: "_loadError_14fuh_84",
	gridAreaWithAction: "_gridAreaWithAction_14fuh_92",
	equipCard: "_equipCard_14fuh_97",
	equipImage: "_equipImage_14fuh_119",
	selected: "_selected_14fuh_123",
	categoryBadge: "_categoryBadge_14fuh_130",
	imageWrap: "_imageWrap_14fuh_140",
	checkBadge: "_checkBadge_14fuh_166",
	cardContent: "_cardContent_14fuh_183",
	equipTitle: "_equipTitle_14fuh_208",
	bottomAction: "_bottomAction_14fuh_221",
	viewBtn: "_viewBtn_14fuh_233"
};
function ChooseEquipment({ hideHeader = false, onSelectionChanged }) {
	const navigate = useNavigate();
	const [equipmentList, setEquipmentList] = (0, import_react.useState)([]);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [loadError, setLoadError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSelected(getSelectedEquipment());
	}, []);
	(0, import_react.useEffect)(() => {
		onSelectionChanged?.(selected.length > 0);
	}, [selected, onSelectionChanged]);
	(0, import_react.useEffect)(() => {
		setLoading(true);
		setLoadError(false);
		getEquipmentList().then((data) => setEquipmentList(data)).catch(() => {
			setEquipmentList([]);
			setLoadError(true);
		}).finally(() => setLoading(false));
	}, []);
	const toggleSelection = (id) => {
		setSelected((prev) => {
			const next = prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id];
			saveSelectedEquipment(next);
			return next;
		});
	};
	const handleViewSelected = () => {
		if (selected.length === 0) return;
		saveSelectedEquipment(selected);
		navigate({
			to: "/exercise/my-equipment",
			search: { ids: selected.join(",") }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${exercise_module_default.exerciseContainer} ${hideHeader ? exercise_module_default.embeddedContainer : ""}`,
		children: [
			hideHeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: exercise_module_default.embeddedIntro,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: exercise_module_default.pageTitle,
					children: "Choose Your Equipment"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: exercise_module_default.embeddedSubtitle,
					children: "Select one or more fitness tools to discover matching exercises."
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${exercise_module_default.gridArea} ${selected.length > 0 ? exercise_module_default.gridAreaWithAction : ""}`,
				children: [
					loading ? Array.from({ length: 8 }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentCardSkeleton, {}, index)) : null,
					!loading && loadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: exercise_module_default.loadError,
						children: "Could not load equipment. Please try again."
					}) : null,
					!loading && !loadError ? equipmentList.map((item, index) => {
						const isSelected = selected.includes(item.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							role: "button",
							tabIndex: 0,
							className: `${exercise_module_default.equipCard} ${isSelected ? exercise_module_default.equipCardSelected : ""}`,
							onClick: () => toggleSelection(item.id),
							onKeyDown: (event) => {
								if (event.key === "Enter" || event.key === " ") {
									event.preventDefault();
									toggleSelection(item.id);
								}
							},
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .3,
								delay: index * .05
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: exercise_module_default.imageWrap,
								children: [isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: exercise_module_default.checkBadge,
									initial: { scale: 0 },
									animate: { scale: 1 },
									transition: {
										type: "spring",
										stiffness: 300,
										damping: 20
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										size: 12,
										strokeWidth: 3
									})
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.equipmentImage || "/images/dumbbells.png",
									alt: item.name,
									className: exercise_module_default.equipImage,
									style: {
										position: "absolute",
										inset: 0,
										width: "100%",
										height: "100%"
									}
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: exercise_module_default.cardContent,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: exercise_module_default.categoryBadge,
									children: item.category ?? "Equipment"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: exercise_module_default.equipTitle,
									children: item.name
								})]
							})]
						}, item.id);
					}) : null
				]
			}),
			selected.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: exercise_module_default.bottomAction,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: exercise_module_default.viewBtn,
					onClick: handleViewSelected,
					children: "View Selected Equipments"
				})
			}) : null
		]
	});
}
//#endregion
export { exercise_module_default as n, ChooseEquipment as t };
