"use client";

import { useEffect } from "react";
import { CRISP_WEBSITE_ID, isCrispEnabled } from "@/lib/analytics";

export default function CrispChat() {
  useEffect(() => {
    if (!CRISP_WEBSITE_ID) return;
    if (document.getElementById("crisp-chat-script")) return;

    window.$crisp = window.$crisp || [];
    window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

    const script = document.createElement("script");
    script.id = "crisp-chat-script";
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.getElementsByTagName("head")[0].appendChild(script);
  }, []);

  return null;
}

export { isCrispEnabled };
