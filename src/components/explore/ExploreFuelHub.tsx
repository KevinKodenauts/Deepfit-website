import { Link } from "@tanstack/react-router";
import { ExternalLink, ShieldCheck } from "lucide-react";

const WHEY_PROTEIN = {
  name: "Deepfit Whey Protein Isolate",
  badge: "Fuel",
  image: "/images/whey-protein.jpeg",
  stats: [
    { label: "Type", value: "Whey Isolate" },
    { label: "Servings", value: "40 servings" },
    { label: "Origin", value: "Made in UAE" },
  ],
  steps: [
    {
      title: "Clean protein",
      description:
        "Designed to support strength, recovery and everyday wellbeing.",
    },
    {
      title: "Pack size",
      description: "Net WT 1.29 kg — 40 servings per tub.",
    },
    {
      title: "Flavors",
      description: "Matcha Vanilla, Simply Vanilla, and Island Cocoa.",
    },
    {
      title: "Certified",
      description: "Halal Certified and HACCP Certified.",
    },
  ],
  tip: "Fuel With Intention — clean protein for strength, recovery, and everyday wellbeing.",
  productId: 282,
  productName: "whey-protein",
};

export function ExploreFuelHub() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-900/[0.08] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#6faef7]/35 hover:shadow-[0_10px_24px_rgba(111,174,247,0.12)]">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
            <img
              src={WHEY_PROTEIN.image}
              alt={WHEY_PROTEIN.name}
              className="absolute inset-0 h-full w-full bg-white object-contain p-4"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/35 via-slate-900/8 to-slate-900/12"
              aria-hidden
            />
            <div className="absolute left-3 top-3 z-[2]">
              <span className="inline-block rounded-full border border-white/12 bg-slate-900/72 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.04em] text-white backdrop-blur-[6px]">
                {WHEY_PROTEIN.badge}
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2.5 px-3 pb-3.5 pt-3">
            <h2 className="line-clamp-2 text-[15px] font-bold leading-snug text-slate-900">
              {WHEY_PROTEIN.name}
            </h2>

            <div className="grid grid-cols-3 gap-2.5">
              {WHEY_PROTEIN.stats.map((stat) => (
                <div key={stat.label} className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.04em] text-slate-400">
                    {stat.label}
                  </span>
                  <span className="line-clamp-2 text-xs font-bold leading-snug text-slate-900">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
              {WHEY_PROTEIN.steps.map((step, index) => (
                <li key={step.title} className="flex items-start gap-2">
                  <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.04em] leading-snug text-slate-900">
                      {step.title}
                    </span>
                    <p className="m-0 text-xs leading-snug text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="m-0 rounded-[10px] border-l-[3px] border-teal-700 bg-slate-50 px-2.5 py-2 text-xs leading-snug text-slate-600">
              {WHEY_PROTEIN.tip}
            </p>

            <Link
              to="/lab-test-report/$productName"
              params={{ productName: WHEY_PROTEIN.productName }}
              search={{
                productId: WHEY_PROTEIN.productId,
                from: "explore",
              }}

              rel="noopener noreferrer"
              aria-label="View certificate"
              className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-gradient-to-br from-indigo-600 to-violet-600 px-3 py-[11px] text-[11px] font-bold uppercase tracking-[0.04em] text-white shadow-[0_6px_14px_rgba(79,70,229,0.22)] transition duration-150 hover:-translate-y-px hover:shadow-[0_8px_18px_rgba(79,70,229,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            >
              <ShieldCheck size={13} aria-hidden="true" />
              View Certificate
              <ExternalLink size={12} aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
