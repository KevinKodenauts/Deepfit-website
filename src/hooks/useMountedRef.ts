"use client";

import { useEffect, useRef } from "react";

/** Returns a ref that is `true` while the component is mounted. */
export function useMountedRef() {
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
}
