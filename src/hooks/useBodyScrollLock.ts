"use client";

import { useEffect } from "react";
import { useLenis } from "@/contexts/LenisContext";

let lockCount = 0;
let savedScrollY = 0;

export function useBodyScrollLock(isOpen: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!isOpen) return;

    if (lockCount === 0) {
      savedScrollY = window.scrollY;
      lenis?.stop();
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    }
    lockCount++;

    return () => {
      lockCount--;
      if (lockCount === 0) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, savedScrollY);
        lenis?.start();
      }
    };
  }, [isOpen, lenis]);
}
