import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as UtensilsCrossed, mt as ChevronLeft, ot as Dumbbell, yt as Brain } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { t as ChooseEquipment } from "./ChooseEquipment-CELdJWw_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore-DjEYKl4-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var explore_module_default = {
	page: "_page_17lan_1",
	header: "_header_17lan_10",
	backBtn: "_backBtn_17lan_21",
	hubTitle: "_hubTitle_17lan_35",
	content: "_content_17lan_47",
	contentFlush: "_contentFlush_17lan_55",
	comingSoon: "_comingSoon_17lan_59",
	iconCircle: "_iconCircle_17lan_70",
	comingSoonLabel: "_comingSoonLabel_17lan_86",
	comingSoonHub: "_comingSoonHub_17lan_94",
	comingSoonText: "_comingSoonText_17lan_104",
	hubNavOuter: "_hubNavOuter_17lan_112",
	hubNav: "_hubNav_17lan_112",
	hubTab: "_hubTab_17lan_139",
	hubTabActive: "_hubTabActive_17lan_154",
	hubTabLabel: "_hubTabLabel_17lan_160",
	desktopHubBar: "_desktopHubBar_17lan_183",
	desktopHubTab: "_desktopHubTab_17lan_191",
	desktopHubTabActive: "_desktopHubTabActive_17lan_212"
};
var HUBS = [
	{
		id: "move",
		name: "Move Hub",
		icon: Dumbbell
	},
	{
		id: "fuel",
		name: "Fuel Hub",
		icon: UtensilsCrossed,
		description: "Nutrition plans, meal guides, and fueling tips are on the way."
	},
	{
		id: "mind",
		name: "Mind Hub",
		icon: Brain,
		description: "Mindfulness, recovery, and mental wellness content is coming soon."
	}
];
function ComingSoonHub({ hub }) {
	const Icon = hub.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: explore_module_default.comingSoon,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: explore_module_default.iconCircle,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					size: 32,
					strokeWidth: 1.8
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: explore_module_default.comingSoonLabel,
				children: "Coming Soon"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: explore_module_default.comingSoonHub,
				children: hub.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: explore_module_default.comingSoonText,
				children: hub.description
			})
		]
	});
}
function ExplorePage() {
	const router = useRouter();
	const [activeHub, setActiveHub] = (0, import_react.useState)(0);
	const [hasEquipmentSelection, setHasEquipmentSelection] = (0, import_react.useState)(false);
	const hub = HUBS[activeHub];
	const showHubNav = activeHub !== 0 || !hasEquipmentSelection;
	const handleSelectionChanged = (0, import_react.useCallback)((hasSelection) => {
		setHasEquipmentSelection(hasSelection);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: explore_module_default.page,
			style: { paddingTop: "var(--desktop-nav-height)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: explore_module_default.header,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: explore_module_default.backBtn,
						onClick: () => router.history.back(),
						"aria-label": "Go back",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 22 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: explore_module_default.hubTitle,
						children: hub.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: explore_module_default.desktopHubBar,
					role: "tablist",
					"aria-label": "Hubs",
					children: HUBS.map((item, index) => {
						const Icon = item.icon;
						const isActive = activeHub === index;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							role: "tab",
							"aria-selected": isActive,
							className: `${explore_module_default.desktopHubTab} ${isActive ? explore_module_default.desktopHubTabActive : ""}`,
							onClick: () => setActiveHub(index),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								size: 16,
								strokeWidth: isActive ? 2.4 : 2
							}), item.name]
						}, item.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `${explore_module_default.content} ${!showHubNav ? explore_module_default.contentFlush : ""}`,
					children: activeHub === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChooseEquipment, {
						hideHeader: true,
						onSelectionChanged: handleSelectionChanged
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoonHub, { hub })
				}),
				showHubNav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: explore_module_default.hubNavOuter,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: explore_module_default.hubNav,
						"aria-label": "Explore hubs",
						children: HUBS.map((item, index) => {
							const Icon = item.icon;
							const isActive = activeHub === index;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `${explore_module_default.hubTab} ${isActive ? explore_module_default.hubTabActive : ""}`,
								onClick: () => setActiveHub(index),
								"aria-current": isActive ? "page" : void 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									size: 20,
									strokeWidth: isActive ? 2.4 : 2
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: explore_module_default.hubTabLabel,
									children: item.name
								})]
							}, item.id);
						})
					})
				}) : null
			]
		})]
	});
}
//#endregion
export { ExplorePage as component };
