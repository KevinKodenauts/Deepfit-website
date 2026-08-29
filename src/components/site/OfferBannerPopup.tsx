import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getActiveOfferBanners,
  offerDiscountPercent,
  offerHeadline,
  subscribeToNewsletter,
} from "@/lib/api/offers";
import type { OfferBanner } from "@/lib/api/types";
import { validateEmail } from "@/lib/validation";
import heroAthlete from "@/assets/hero-athlete.jpg";

const STORAGE_PREFIX = "deepfit-offer-seen:";
const HIDDEN_PATHS = [
  "/checkout",
  "/login",
  "/signup",
  "/verify-otp",
  "/forgot-password",
];

function dismissKey(banner: OfferBanner) {
  return `${STORAGE_PREFIX}${banner.id}`;
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
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const hidden = useMemo(
    () =>
      HIDDEN_PATHS.some(
        (path) => pathname === path || pathname.startsWith(`${path}/`),
      ),
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
        setEmail("");
        setEmailError(null);
        setFormError(null);
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!banner || submitting) return;

    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setEmailError(null);
    setFormError(null);
    setSubmitting(true);

    try {
      const result = await subscribeToNewsletter(email, banner.id);
      if (!result.status) {
        setFormError(
          result.message || "Something went wrong. Please try again.",
        );
        return;
      }
      markDismissed(banner);
      setOpen(false);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!banner) return null;

  const title = offerHeadline(banner);
  const couponHint = banner.couponCode?.trim();
  const discountPercent = offerDiscountPercent(banner);
  const subtitle = couponHint
    ? "Receive your discount code when you sign up for promotional and marketing email."
    : "Sign up for promotional and marketing email to stay in the loop.";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        overlayClassName="z-[80] bg-ink/55 backdrop-blur-[6px]"
        className="fixed left-1/2 top-1/2 z-[90] w-[min(calc(100vw-1.25rem),52rem)] max-w-[52rem] max-h-[min(92dvh,40rem)] -translate-x-1/2 -translate-y-1/2 gap-0 overflow-y-auto overflow-x-hidden rounded-none border-0 bg-white p-0 shadow-[0_24px_80px_rgba(15,23,42,0.28)] ring-0 sm:rounded-none [&>button]:hidden"
        aria-describedby={undefined}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{subtitle}</DialogDescription>

        <div className="grid min-h-[22rem] bg-white sm:grid-cols-2">
          <div className="relative h-56 overflow-hidden bg-[#1A637B] sm:h-auto sm:min-h-full">
            <img
              src={heroAthlete}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink/80 via-[#1A637B]/55 to-[#006C4E]/50" />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-mint/25 blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-8 left-8 size-28 rounded-full bg-lavender/20 blur-xl"
            />

            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="absolute left-3 top-3 z-20 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm ring-1 ring-black/10 transition hover:bg-white"
              aria-label="Close offer"
            >
              <X size={18} />
            </button>

            <div className="relative z-10 flex h-full flex-col p-5 pt-16 sm:p-6 sm:pt-[4.5rem]">
              <span className="w-fit bg-[#F5C518] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-ink">
                Limited time offer!
              </span>

              <div className="mt-4 max-w-[13.5rem] pb-16 text-white sm:pb-20">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                  Deepfit
                </p>
                <p className="mt-1 font-sans text-xl font-extrabold uppercase leading-none tracking-tight sm:text-2xl">
                  Special offer
                </p>
                {discountPercent ? (
                  <p className="mt-2 font-sans text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-4xl">
                    Get {discountPercent}% off
                  </p>
                ) : (
                  <p className="mt-2 font-sans text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-4xl">
                    Welcome offer
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12">
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <h2 className="font-sans text-[1.65rem] font-bold leading-tight tracking-tight text-foreground sm:text-[1.85rem]">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {subtitle}
                </p>
              </div>

              <div>
                <label htmlFor="offer-newsletter-email" className="sr-only">
                  Email
                </label>
                <input
                  id="offer-newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (emailError) setEmailError(null);
                    if (formError) setFormError(null);
                  }}
                  onBlur={() => {
                    if (!email.trim()) return;
                    setEmailError(validateEmail(email));
                  }}
                  placeholder="Email "
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={
                    emailError ? "offer-newsletter-email-error" : undefined
                  }
                  className="h-12 w-full rounded-none border border-border bg-white px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-foreground focus:ring-2 focus:ring-ring/30"
                />
                {emailError ? (
                  <p
                    id="offer-newsletter-email-error"
                    className="mt-1.5 text-sm text-destructive"
                    role="alert"
                  >
                    {emailError}
                  </p>
                ) : null}
                {formError ? (
                  <p className="mt-1.5 text-sm text-destructive" role="alert">
                    {formError}
                  </p>
                ) : null}
              </div>

              <div className="mt-1 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className="min-h-11 cursor-pointer text-sm font-medium text-foreground underline-offset-4 transition hover:underline"
                >
                  No thanks!
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-11 min-w-[8.5rem] cursor-pointer items-center justify-center bg-foreground px-6 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
