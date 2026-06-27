"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";

type ResponsivePageProps = {
  /** Mobile + tablet UI — leave untouched when adding desktop variants. */
  mobile: ReactNode;
  /** Full-width desktop UI from `src/desktop-ui/`. */
  desktop?: ReactNode;
  /** Optional lazy desktop component — avoids loading desktop bundles on mobile. */
  desktopLazy?: React.ComponentType;
};

/**
 * Renders `desktop` on large screens (1024+) and `mobile` on phone/tablet.
 * Until hydration, mobile/tablet is shown to avoid layout flash.
 */
export default function ResponsivePage({
  mobile,
  desktop,
  desktopLazy: DesktopLazy,
}: ResponsivePageProps) {
  const { isDesktop, isHydrated } = useBreakpoint();

  if (isHydrated && isDesktop) {
    if (DesktopLazy) {
      return <DesktopLazy />;
    }
    return <>{desktop}</>;
  }

  return <>{mobile}</>;
}

export function createLazyDesktop<T extends React.ComponentType>(
  loader: () => Promise<{ default: T }>
) {
  return dynamic(loader, { ssr: false, loading: () => null });
}

