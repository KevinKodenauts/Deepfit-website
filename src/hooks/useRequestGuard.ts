"use client";

import { useCallback, useEffect, useRef } from "react";
import { useMountedRef } from "@/hooks/useMountedRef";

/**
 * Ignores stale async responses after navigation/unmount.
 * Concurrent in-flight requests are allowed; cancel() invalidates all of them.
 */
export function useRequestGuard() {
  const mountedRef = useMountedRef();
  const requestCounterRef = useRef(0);
  const invalidateGenerationRef = useRef(0);

  const begin = useCallback(() => {
    requestCounterRef.current += 1;

    return {
      id: requestCounterRef.current,
      generation: invalidateGenerationRef.current,
    };
  }, []);

  const isActive = useCallback(
    (request: { id: number; generation: number }) =>
      mountedRef.current &&
      request.generation === invalidateGenerationRef.current,
    [mountedRef]
  );

  const cancel = useCallback(() => {
    invalidateGenerationRef.current += 1;
  }, []);

  useEffect(() => cancel, [cancel]);

  return { begin, isActive, cancel, mountedRef };
}
