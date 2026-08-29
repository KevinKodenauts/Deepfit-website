import { useEffect, useMemo, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { getActiveOfferBanners, offerBannerHref } from "@/lib/api/offers";
import type { OfferBanner } from "@/lib/api/types";

const STORAGE_PREFIX = "deepfit-offer-banner-v3:";
const HIDDEN_PATHS = [
  "/checkout",
  "/login",
  "/signup",
  "/verify-otp",
  "/forgot-password",
];

function dismissKey(banner: OfferBanner) {
  return `${STORAGE_PREFIX}${banner.id}:${banner.updated_at ?? ""}`;
}

function wasDismissed(banner: OfferBanner) {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(dismissKey(banner)) === "1";
  } catch {
    return false;
  }
}

function markDismissed(banner: OfferBanner) {
  try {
    window.localStorage.setItem(dismissKey(banner), "1");
  } catch {
    // Ignore storage errors (private mode, disabled storage).
  }
}

export function OfferBannerPopup() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [banner, setBanner] = useState<OfferBanner | null>(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const hidden = useMemo(
    () => HIDDEN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`)),
    [pathname],
  );

  useEffect(() => {
    if (hidden) {
      setOpen(false);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(() => {
      void (async () => {
        const banners = await getActiveOfferBanners();
        if (cancelled) return;
        const next = banners[0] ?? null;
        if (!next || wasDismissed(next)) {
          setBanner(null);
          setOpen(false);
          return;
        }
        setBanner(next);
        setCopied(false);
        setOpen(true);
      })();
    }, 400);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [hidden]);

  const handleOpenChange = (next: boolean) => {
    if (!next && banner) markDismissed(banner);
    setOpen(next);
  };

  const couponCode = banner?.couponCode?.trim() ?? "";

  const copyCode = async () => {
    if (!couponCode) return;
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!banner) return null;

  const href = offerBannerHref(banner);
  const title = banner.productName?.trim() || "Offer";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        overlayClassName="z-[80] bg-ink/55 backdrop-blur-[8px]"
        className="fixed left-1/2 top-1/2 z-[90] flex h-[min(92dvh,56rem)] w-[min(calc(100vw-1rem),88rem)] max-w-[88rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-0 overflow-visible border-0 bg-transparent p-0 shadow-none ring-0 sm:rounded-none [&>button]:right-2 [&>button]:top-2 [&>button]:z-20 [&>button]:flex [&>button]:size-11 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:bg-white/90 [&>button]:opacity-100 [&>button]:shadow-soft [&>button]:ring-1 [&>button]:ring-black/10 sm:[&>button]:right-3 sm:[&>button]:top-3 sm:[&>button]:size-12 [&>button_svg]:size-5"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">
          {couponCode ? `Use code ${couponCode}` : "Current Deepfit offer"}
        </DialogDescription>

        <div className="relative h-full w-full">
          <a
            href={href}
            className="flex h-full w-full items-center justify-center bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img
              src={banner.productImage}
              alt={title}
              className="h-full w-full object-contain"
            />
          </a>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-start p-4 pr-16 sm:p-6 sm:pr-20">
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                void copyCode();
              }}
              disabled={!couponCode}
              className="pointer-events-auto inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background shadow-soft transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-12 sm:px-6 sm:text-base"
              aria-label={
                !couponCode
                  ? "No coupon code"
                  : copied
                    ? "Coupon code copied"
                    : `Copy coupon code ${couponCode}`
              }
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : couponCode ? `Copy code ${couponCode}` : "Copy code"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
