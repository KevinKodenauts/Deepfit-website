import { a as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as EquipmentCardSkeleton } from "./PageSkeletons-BRCRpe-E.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as Lightbulb, mt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as getEquipmentById } from "./exercise-a9sO23D0.mjs";
import { t as getSelectedEquipment } from "./selection-BcMgILWp.mjs";
import { l as Route } from "./router-BAl0mxep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exercise.equipment._id-CCiwMk77.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var explore_equipment_module_default = {
	container: "_container_1ake6_1",
	contentBox: "_contentBox_1ake6_10",
	header: "_header_1ake6_23",
	backBtn: "_backBtn_1ake6_35",
	pageTitle: "_pageTitle_1ake6_47",
	scrollArea: "_scrollArea_1ake6_58",
	heroImageWrap: "_heroImageWrap_1ake6_66",
	heroImage: "_heroImage_1ake6_66",
	badges: "_badges_1ake6_78",
	badge: "_badge_1ake6_78",
	content: "_content_1ake6_10",
	title: "_title_1ake6_98",
	description: "_description_1ake6_106",
	sectionTitle: "_sectionTitle_1ake6_114",
	stepList: "_stepList_1ake6_133",
	stepItem: "_stepItem_1ake6_140",
	stepNumber: "_stepNumber_1ake6_146",
	stepContent: "_stepContent_1ake6_161",
	stepTitle: "_stepTitle_1ake6_166",
	stepDesc: "_stepDesc_1ake6_175",
	proTipBox: "_proTipBox_1ake6_182",
	proTipHeader: "_proTipHeader_1ake6_191",
	proTipTitle: "_proTipTitle_1ake6_198",
	proTipDesc: "_proTipDesc_1ake6_206",
	bottomAction: "_bottomAction_1ake6_213",
	showExerciseBtn: "_showExerciseBtn_1ake6_219"
};
function EquipmentDetailsPage() {
	const router = useRouter();
	const navigate = Route.useNavigate();
	const { id } = Route.useParams();
	const equipmentId = Number(id);
	const [equipment, setEquipment] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [loadError, setLoadError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!equipmentId || Number.isNaN(equipmentId)) {
			setLoadError(true);
			setLoading(false);
			return;
		}
		setLoading(true);
		setLoadError(false);
		getEquipmentById(equipmentId).then((data) => {
			if (!data) {
				setLoadError(true);
				return;
			}
			setEquipment(data);
		}).catch(() => {
			setLoadError(true);
		}).finally(() => {
			setLoading(false);
		});
	}, [equipmentId]);
	const handleShowExercise = () => {
		const selectedIds = getSelectedEquipment();
		const filterIds = selectedIds.length > 0 ? selectedIds : equipment ? [equipment.id] : [];
		navigate({
			to: "/exercise/library",
			search: {
				equipment_ids: filterIds.join(","),
				focus: String(equipmentId)
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: explore_equipment_module_default.container,
			style: { paddingTop: "var(--desktop-nav-height)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: explore_equipment_module_default.header,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: explore_equipment_module_default.backBtn,
					onClick: () => router.history.back(),
					"aria-label": "Go back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: explore_equipment_module_default.pageTitle,
					children: loading ? "Equipment" : equipment?.name ?? "Equipment"
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { padding: 24 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentCardSkeleton, {})
			}) : loadError || !equipment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					padding: 24,
					color: "#64748b"
				},
				children: "Could not load equipment details."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentContent, {
				equipment,
				onShowExercise: handleShowExercise
			})]
		})]
	});
}
function EquipmentContent({ equipment, onShowExercise }) {
	const tags = equipment.tags?.length ? equipment.tags : [equipment.category ?? "Equipment"];
	const steps = equipment.instructions ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: explore_equipment_module_default.contentBox,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: explore_equipment_module_default.scrollArea,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: explore_equipment_module_default.heroImageWrap,
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: { duration: .4 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: equipment.equipmentImage || "/images/dumbbells.png",
						alt: equipment.name,
						className: explore_equipment_module_default.heroImage,
						style: {
							position: "absolute",
							inset: 0,
							width: "100%",
							height: "100%"
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: explore_equipment_module_default.badges,
					children: tags.map((badge, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: explore_equipment_module_default.badge,
						children: badge
					}, `${badge}-${i}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: explore_equipment_module_default.content,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: explore_equipment_module_default.title,
							children: equipment.headline ?? "Elite Precision Performance"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: explore_equipment_module_default.description,
							children: equipment.description ?? "Follow the proper form and usage instructions to get the most out of your training equipment."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: explore_equipment_module_default.sectionTitle,
							children: "How to Use"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: explore_equipment_module_default.stepList,
							children: steps.length > 0 ? steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								className: explore_equipment_module_default.stepItem,
								initial: {
									opacity: 0,
									x: -20
								},
								animate: {
									opacity: 1,
									x: 0
								},
								transition: {
									duration: .3,
									delay: i * .1
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: explore_equipment_module_default.stepNumber,
									children: step.stepNumber ?? i + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: explore_equipment_module_default.stepContent,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: explore_equipment_module_default.stepTitle,
										children: step.stepTitle
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: explore_equipment_module_default.stepDesc,
										children: step.stepDescription
									})]
								})]
							}, step.id ?? i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: explore_equipment_module_default.description,
								children: "Usage instructions will be available soon."
							})
						}),
						equipment.proTip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: explore_equipment_module_default.proTipBox,
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
								delay: .4
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: explore_equipment_module_default.proTipHeader,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, {
									size: 16,
									color: "#1a1a2e",
									strokeWidth: 3
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: explore_equipment_module_default.proTipTitle,
									children: "PRO TIP"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: explore_equipment_module_default.proTipDesc,
								children: equipment.proTip
							})]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: explore_equipment_module_default.bottomAction,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: explore_equipment_module_default.showExerciseBtn,
						onClick: onShowExercise,
						children: "Show Exercise"
					})
				})
			]
		})
	});
}
//#endregion
export { EquipmentDetailsPage as component };
