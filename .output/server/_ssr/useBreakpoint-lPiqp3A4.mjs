import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useBreakpoint-lPiqp3A4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Shared layout breakpoints — mobile/tablet unchanged, desktop is 1024+ */
var BREAKPOINTS = {
	tabletMin: 768,
	desktopMin: 1024
};
BREAKPOINTS.tabletMin - 1, `${BREAKPOINTS.tabletMin}`, BREAKPOINTS.desktopMin - 1, `${BREAKPOINTS.desktopMin}`, `${BREAKPOINTS.tabletMin}`, `${BREAKPOINTS.desktopMin}`;
function getBreakpointFromWidth(width) {
	if (width >= BREAKPOINTS.desktopMin) return "desktop";
	if (width >= BREAKPOINTS.tabletMin) return "tablet";
	return "mobile";
}
var cachedBreakpoint = typeof window !== "undefined" ? getBreakpointFromWidth(window.innerWidth) : "tablet";
var listeners = /* @__PURE__ */ new Set();
function emit() {
	for (const listener of listeners) listener();
}
function readBreakpoint() {
	if (typeof window === "undefined") return "tablet";
	return getBreakpointFromWidth(window.innerWidth);
}
function updateBreakpoint() {
	const next = readBreakpoint();
	if (next === cachedBreakpoint) return;
	cachedBreakpoint = next;
	emit();
}
if (typeof window !== "undefined") {
	let resizeTimer = null;
	const scheduleUpdate = () => {
		if (resizeTimer) clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			resizeTimer = null;
			updateBreakpoint();
		}, 120);
	};
	window.addEventListener("resize", scheduleUpdate, { passive: true });
	window.matchMedia(`(min-width: ${BREAKPOINTS.desktopMin}px)`).addEventListener("change", scheduleUpdate);
}
function subscribeBreakpoint(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}
function getBreakpointSnapshot() {
	return cachedBreakpoint;
}
function getBreakpointServerSnapshot() {
	return "tablet";
}
function useBreakpoint() {
	const breakpoint = (0, import_react.useSyncExternalStore)(subscribeBreakpoint, getBreakpointSnapshot, getBreakpointServerSnapshot);
	return {
		breakpoint,
		isMobile: breakpoint === "mobile",
		isTablet: breakpoint === "tablet",
		isDesktop: breakpoint === "desktop",
		isHydrated: typeof window !== "undefined"
	};
}
//#endregion
export { useBreakpoint as t };
