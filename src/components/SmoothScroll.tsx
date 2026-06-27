"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { LenisContext } from "@/contexts/LenisContext";
import { BREAKPOINTS } from "@/constants/breakpoints";

function shouldEnableSmoothScroll() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  return window.matchMedia(`(min-width: ${BREAKPOINTS.desktopMin}px)`).matches;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!shouldEnableSmoothScroll()) {
      return;
    }

    const instance = new Lenis({ lerp: 0.12, smoothWheel: true });
    let frame = 0;

    function raf(time: number) {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);
    setLenis(instance);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
