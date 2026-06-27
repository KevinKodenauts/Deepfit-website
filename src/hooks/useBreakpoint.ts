"use client";

import { useSyncExternalStore } from "react";
import type { Breakpoint } from "@/constants/breakpoints";
import { MEDIA_QUERIES } from "@/constants/breakpoints";
import {
  getBreakpointServerSnapshot,
  getBreakpointSnapshot,
  subscribeBreakpoint,
} from "@/hooks/breakpointStore";

export type UseBreakpointResult = {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isHydrated: boolean;
};

export function useBreakpoint(): UseBreakpointResult {
  const breakpoint = useSyncExternalStore(
    subscribeBreakpoint,
    getBreakpointSnapshot,
    getBreakpointServerSnapshot
  );

  return {
    breakpoint,
    isMobile: breakpoint === "mobile",
    isTablet: breakpoint === "tablet",
    isDesktop: breakpoint === "desktop",
    isHydrated: typeof window !== "undefined",
  };
}

export { BREAKPOINTS, MEDIA_QUERIES } from "@/constants/breakpoints";
