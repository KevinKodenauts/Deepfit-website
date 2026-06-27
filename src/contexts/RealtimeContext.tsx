"use client";

import { createContext, useContext, useEffect } from "react";
import { realtimeService } from "@/lib/realtime/realtimeService";

const RealtimeContext = createContext(realtimeService);

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void realtimeService.connect();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        realtimeService.ensureConnected();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      realtimeService.disconnect();
    };
  }, []);

  return (
    <RealtimeContext.Provider value={realtimeService}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtimeService() {
  return useContext(RealtimeContext);
}
