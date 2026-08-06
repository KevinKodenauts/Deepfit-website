import { useCallback, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";

export function useWishlistToggle(productId: number | null | undefined) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [pending, setPending] = useState(false);

  const id =
    typeof productId === "number" && Number.isFinite(productId) && productId > 0
      ? productId
      : null;
  const wishlisted = id != null ? isWishlisted(id) : false;

  const toggle = useCallback(
    async (event?: { preventDefault?: () => void; stopPropagation?: () => void }) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();

      if (id == null) return false;

      if (!isAuthenticated) {
        void navigate({
          to: "/login",
          search: {
            next:
              typeof window !== "undefined"
                ? `${window.location.pathname}${window.location.search}`
                : "/profile/wishlist",
          },
        });
        return false;
      }

      setPending(true);
      try {
        return await toggleWishlist(
          id,
          user?.customerName || user?.name || "Customer"
        );
      } finally {
        setPending(false);
      }
    },
    [id, isAuthenticated, navigate, toggleWishlist, user?.customerName, user?.name]
  );

  return { wishlisted, pending, toggle, productId: id };
}
