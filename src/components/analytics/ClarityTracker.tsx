"use client";

import { useEffect } from "react";
import { CLARITY_PROJECT_ID } from "@/lib/analytics";

export default function ClarityTracker() {
  useEffect(() => {
    if (!CLARITY_PROJECT_ID) return;
    if (document.getElementById("microsoft-clarity-script")) return;

    window.clarity =
      window.clarity ||
      function (...args: unknown[]) {
        (window.clarity!.q = window.clarity!.q || []).push(args);
      };

    const script = document.createElement("script");
    script.id = "microsoft-clarity-script";
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;

    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
