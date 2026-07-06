import Script from "next/script";

const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID ?? "2cff09c6-98f2-4f8b-aa34-a3a43e77dd09";

export default function CrispChat() {
  if (!CRISP_WEBSITE_ID) {
    return null;
  }

  return (
    <Script id="crisp-chat" strategy="afterInteractive">
      {`
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "${CRISP_WEBSITE_ID}";
        (function () {
          var d = document;
          var s = d.createElement("script");
          s.src = "https://client.crisp.chat/l.js";
          s.async = 1;
          d.getElementsByTagName("head")[0].appendChild(s);
        })();
      `}
    </Script>
  );
}

export function isCrispEnabled() {
  return Boolean(CRISP_WEBSITE_ID);
}
