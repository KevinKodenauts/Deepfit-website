import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Product card matching the New site ProductCard shape */
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border/50",
        className,
      )}
      aria-hidden
    >
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="mt-auto flex items-end justify-between pt-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("grid gap-6 sm:grid-cols-2 xl:grid-cols-3", className)}
      aria-busy
      aria-label="Loading products"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryTileSkeleton() {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border/50"
      aria-hidden
    >
      <Skeleton className="h-16 w-16 rounded-xl" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}

export function CategoryGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 md:grid-cols-4"
      aria-busy
      aria-label="Loading categories"
    >
      {Array.from({ length: count }).map((_, i) => (
        <CategoryTileSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div
      className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 pt-32 lg:grid-cols-2 lg:px-10"
      aria-busy
      aria-label="Loading product"
    >
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-3xl" />
        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-16 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="space-y-5 pt-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-10 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-8 w-28" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-20 rounded-full" />
        </div>
        <div className="flex gap-3 pt-4">
          <Skeleton className="h-12 flex-1 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
        <Skeleton className="mt-6 h-32 w-full rounded-2xl" />
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div
      className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]"
      aria-busy
      aria-label="Loading cart"
    >
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-5 rounded-lg bg-card p-4 shadow-soft ring-1 ring-border/60 sm:p-5"
          >
            <Skeleton className="h-20 w-20 shrink-0 rounded-lg sm:h-24 sm:w-24" />
            <div className="min-w-0 flex-1 space-y-3">
              <Skeleton className="h-5 w-3/5" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-28 rounded-full" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
      <div className="h-fit space-y-4 rounded-lg bg-card p-6 shadow-soft ring-1 ring-border/60">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-4 h-12 w-full rounded-full" />
      </div>
    </div>
  );
}

export function CheckoutSkeleton() {
  return (
    <div className="mt-10 space-y-6" aria-busy aria-label="Loading checkout">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="space-y-4 rounded-[2rem] bg-card p-6 shadow-soft ring-1 ring-border/60"
        >
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      ))}
      <Skeleton className="h-12 w-full rounded-full" />
    </div>
  );
}

export function SearchDropdownSkeleton({ count = 4 }: { count?: number }) {
  return (
    <ul className="max-h-80 overflow-y-auto py-2" aria-busy aria-label="Searching">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 px-4 py-2.5">
          <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-16" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function OrderCardSkeleton() {
  return (
    <div
      className="flex gap-4 rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border/50"
      aria-hidden
    >
      <Skeleton className="h-16 w-16 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-6 w-16" />
    </div>
  );
}

export function OrdersListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4" aria-busy aria-label="Loading orders">
      {Array.from({ length: count }).map((_, i) => (
        <OrderCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function OrderDetailsSkeleton() {
  return (
    <div
      className="mx-auto max-w-3xl space-y-6 px-6 pb-24 pt-32"
      aria-busy
      aria-label="Loading order"
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-7 w-40" />
      </div>
      <Skeleton className="h-28 w-full rounded-2xl" />
      <div className="space-y-3 rounded-2xl bg-card p-5 ring-1 ring-border/50">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-14" />
          </div>
        ))}
      </div>
      <Skeleton className="h-40 w-full rounded-2xl" />
    </div>
  );
}

export function AddressCardSkeleton() {
  return (
    <div
      className="space-y-3 rounded-2xl bg-card p-5 shadow-soft ring-1 ring-border/50"
      aria-hidden
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-5 w-28" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-2/5" />
    </div>
  );
}

export function AddressesGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2"
      aria-busy
      aria-label="Loading addresses"
    >
      {Array.from({ length: count }).map((_, i) => (
        <AddressCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function AddressesListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="mt-4 space-y-3" aria-busy aria-label="Loading addresses">
      {Array.from({ length: count }).map((_, i) => (
        <AddressCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div
      className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[260px_1fr]"
      aria-busy
      aria-label="Loading profile"
    >
      <div className="space-y-4 rounded-2xl bg-card p-6 ring-1 ring-border/50">
        <Skeleton className="mx-auto h-20 w-20 rounded-full" />
        <Skeleton className="mx-auto h-5 w-32" />
        <Skeleton className="mx-auto h-4 w-24" />
        <div className="space-y-2 pt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-xl" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    </div>
  );
}

export function ProfileMobileSkeleton() {
  return (
    <div className="space-y-4 px-4 py-4" aria-busy aria-label="Loading profile">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-36 w-full rounded-2xl" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-xl" />
      ))}
    </div>
  );
}

export function WalletSkeleton() {
  return (
    <div className="space-y-6" aria-busy aria-label="Loading wallet">
      <div className="flex flex-col items-center gap-3 py-6">
        <Skeleton className="h-14 w-14 rounded-full" />
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      <WalletTransactionsSkeleton />
    </div>
  );
}

export function WalletTransactionsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-busy aria-label="Loading transactions">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

export function ReferralTreeSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-busy aria-label="Loading referrals">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-xl bg-card p-3 ring-1 ring-border/40"
        >
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EquipmentCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border/50"
      aria-hidden
    >
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-3/5" />
      </div>
    </div>
  );
}

export function EquipmentGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy
      aria-label="Loading equipment"
    >
      {Array.from({ length: count }).map((_, i) => (
        <EquipmentCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PolicyContentSkeleton() {
  return (
    <div className="space-y-3 p-2" aria-busy aria-label="Loading policy">
      <Skeleton className="h-5 w-2/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  );
}

export function AuthPageSkeleton() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background px-6"
      aria-busy
      aria-label="Loading"
    >
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="mx-auto h-10 w-32" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
  );
}

export function HomeProductRowSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      aria-busy
      aria-label="Loading products"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HomeHubCardSkeleton() {
  return (
    <div
      className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-card shadow-soft ring-1 ring-border/50"
      aria-hidden
    >
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="absolute inset-x-0 bottom-0 space-y-3 p-7 sm:p-8">
        <Skeleton className="h-3 w-8 bg-background/50" />
        <div className="flex items-end justify-between gap-4">
          <Skeleton className="h-8 w-36 bg-background/50" />
          <Skeleton className="size-11 rounded-full bg-background/50" />
        </div>
        <Skeleton className="h-4 w-3/4 bg-background/50" />
        <Skeleton className="h-4 w-1/2 bg-background/50" />
      </div>
    </div>
  );
}

export function HomeHubGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy
      aria-label="Loading categories"
    >
      {Array.from({ length: count }).map((_, i) => (
        <HomeHubCardSkeleton key={i} />
      ))}
    </div>
  );
}
