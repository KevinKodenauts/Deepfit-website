import { Link } from "@tanstack/react-router";

type ProductsEmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionTo?: "/shop" | "/";
};

export function ProductsEmptyState({
  title = "Product not found",
  description = "Nothing matches this selection yet. Try another hub or browse the full catalog.",
  actionLabel = "Back home",
  actionTo = "/",
}: ProductsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-3xl bg-card px-6 py-16 text-center shadow-soft ring-1 ring-border/60">
      <img
        src="/images/empty-products.jpg"
        alt=""
        width={220}
        height={220}
        className="h-44 w-44 object-contain sm:h-52 sm:w-52"
      />
      <h2 className="mt-6 font-display text-2xl leading-tight sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <Link
        to={actionTo}
        className="mt-6 inline-flex min-h-11 cursor-pointer items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-90"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
