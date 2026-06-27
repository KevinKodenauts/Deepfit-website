"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useBreakpoint } from "@/hooks/useBreakpoint";

/**
 * On desktop, navigates to a full page instead of opening a bottom sheet.
 * On mobile/tablet, calls the provided openSheet callback (unchanged behaviour).
 */
export function useSheetOrNavigate() {
  const router = useRouter();
  const { isDesktop, isHydrated } = useBreakpoint();

  const openOrNavigate = useCallback(
    (pagePath: string, openSheet: () => void) => {
      if (isHydrated && isDesktop) {
        router.push(pagePath);
        return;
      }
      openSheet();
    },
    [isDesktop, isHydrated, router]
  );

  return { openOrNavigate, isDesktop, isHydrated };
}
