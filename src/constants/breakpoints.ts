/** Shared layout breakpoints — mobile/tablet unchanged, desktop is 1024+ */
export const BREAKPOINTS = {
  tabletMin: 768,
  desktopMin: 1024,
} as const;

export type Breakpoint = "mobile" | "tablet" | "desktop";

export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.tabletMin - 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tabletMin}px) and (max-width: ${BREAKPOINTS.desktopMin - 1}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktopMin}px)`,
  tabletUp: `(min-width: ${BREAKPOINTS.tabletMin}px)`,
  desktopUp: `(min-width: ${BREAKPOINTS.desktopMin}px)`,
} as const;

export function getBreakpointFromWidth(width: number): Breakpoint {
  if (width >= BREAKPOINTS.desktopMin) return "desktop";
  if (width >= BREAKPOINTS.tabletMin) return "tablet";
  return "mobile";
}
