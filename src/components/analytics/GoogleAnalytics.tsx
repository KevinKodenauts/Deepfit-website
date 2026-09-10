"use client";

import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { GA_MEASUREMENT_ID, initGoogleAnalytics, trackGaPageView } from "@/lib/analytics";

export default function GoogleAnalytics() {
  const locationKey = useRouterState({
    select: (s) => `${s.location.pathname}${s.location.searchStr}`,
  });

  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    trackGaPageView();
  }, [locationKey]);

  return null;
}
