import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { mt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as Nav } from "./Nav-BaCy2SUO.mjs";
import { n as exercise_module_default, t as ChooseEquipment } from "./ChooseEquipment-CELdJWw_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exercise.index-VP4pSq2q.js
var import_jsx_runtime = require_jsx_runtime();
function ExerciseIndexPage() {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: exercise_module_default.exerciseContainer,
			style: { paddingTop: "var(--desktop-nav-height)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: exercise_module_default.header,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: exercise_module_default.backBtn,
						onClick: () => router.history.back(),
						"aria-label": "Go back",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 24 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: exercise_module_default.pageTitle,
						children: "Choose Your Equipment"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: exercise_module_default.subtitle,
					children: "Select one or more fitness tools to discover matching exercises."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChooseEquipment, {})
			]
		})]
	});
}
//#endregion
export { ExerciseIndexPage as component };
