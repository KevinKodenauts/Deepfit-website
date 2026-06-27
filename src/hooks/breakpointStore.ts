import {
  BREAKPOINTS,
  type Breakpoint,
  getBreakpointFromWidth,
} from "@/constants/breakpoints";

let cachedBreakpoint: Breakpoint =
  typeof window !== "undefined"
    ? getBreakpointFromWidth(window.innerWidth)
    : "tablet";

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function readBreakpoint(): Breakpoint {
  if (typeof window === "undefined") {
    return "tablet";
  }
  return getBreakpointFromWidth(window.innerWidth);
}

function updateBreakpoint() {
  const next = readBreakpoint();
  if (next === cachedBreakpoint) return;
  cachedBreakpoint = next;
  emit();
}

if (typeof window !== "undefined") {
  let resizeTimer: ReturnType<typeof setTimeout> | null = null;

  const scheduleUpdate = () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeTimer = null;
      updateBreakpoint();
    }, 120);
  };

  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window
    .matchMedia(`(min-width: ${BREAKPOINTS.desktopMin}px)`)
    .addEventListener("change", scheduleUpdate);
}

export function subscribeBreakpoint(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getBreakpointSnapshot(): Breakpoint {
  return cachedBreakpoint;
}

export function getBreakpointServerSnapshot(): Breakpoint {
  return "tablet";
}
