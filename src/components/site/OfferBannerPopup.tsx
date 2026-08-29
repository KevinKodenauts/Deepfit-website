import { useEffect, useMemo, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  formatOfferPrice,
  getActiveOfferBanners,
  offerBannerHref,
} from "@/lib/api/offers";
import type { OfferBanner } from "@/lib/api/types";

const STORAGE_PREFIX = "deepfit-offer-banner:";
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
  if (typeof window === "undefined") return true;
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
        setOpen(true);
      })();
    }, 700);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [hidden]);

  const handleOpenChange = (next: boolean) => {
    if (!next && banner) markDismissed(banner);
    setOpen(next);
  };

  if (!banner) return null;

  const href = offerBannerHref(banner);
  const original = formatOfferPrice(banner.originalPrice);
  const offer = formatOfferPrice(banner.offerPrice);
  const title = banner.productName || "Limited offer";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-[min(92vw,34rem)] gap-0 overflow-hidden border-0 bg-card p-0 shadow-glass sm:rounded-[2rem] [&>button]:right-3 [&>button]:top-3 [&>button]:z-10 [&>button]:flex [&>button]:size-9 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:bg-white/95 [&>button]:opacity-100 [&>button]:shadow-soft [&>button]:ring-0"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">
          {offer ? `Special offer at ${offer}` : "Current Deepfit offer"}
        </DialogDescription>
        <a
          href={href}
          className="block"
          onClick={() => markDismissed(banner)}
        >
          <div className="aspect-[4/3] overflow-hidden bg-muted sm:aspect-[16/11]">
            <img
              src={banner.productImage}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="px-6 py-5 sm:px-7 sm:py-6">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Offer
            </div>
            <h2 className="mt-2 font-display text-2xl leading-tight tracking-tight sm:text-3xl">
              {title}
            </h2>
            {original || offer ? (
              <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {offer ? (
                  <span className="text-lg font-semibold">{offer}</span>
                ) : null}
                {original && original !== offer ? (
                  <span className="text-sm text-muted-foreground line-through">
                    {original}
                  </span>
                ) : null}
              </p>
            ) : null}
            <span className="mt-5 inline-flex min-h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background">
              Shop the offer
            </span>
          </div>
        </a>
      </DialogContent>
    </Dialog>
  );
}
