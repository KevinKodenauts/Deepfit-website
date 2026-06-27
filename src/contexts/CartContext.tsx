"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  addToCart as addToCartApi,
  getCart,
  removeCartItem,
  updateCartItem,
  type CartItemView,
} from "@/lib/api/cart";
import { getProductDetails } from "@/lib/api/products";
import { useAuth } from "@/contexts/AuthContext";
import { getCustomerId } from "@/lib/auth/session";

export type AddToCartProduct = {
  productId: number;
  title: string;
  image: string;
  price: number;
  variantId?: number;
  productAttributeId?: number;
};

type CartContextValue = {
  items: CartItemView[];
  itemCount: number;
  subtotal: number;
  isLoading: boolean;
  isCartOpen: boolean;
  pendingProduct: AddToCartProduct | null;
  openAddToCart: (product: AddToCartProduct) => void;
  closeCart: () => void;
  refreshCart: (options?: { silent?: boolean }) => Promise<void>;
  confirmAddToCart: (
    quantity: number,
    productOverride?: AddToCartProduct,
  ) => Promise<string | null>;
  updateQuantity: (cartItemId: number, qty: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

function isApiSuccess(status: unknown): boolean {
  return status === true || status === "true" || status === 1 || status === "1";
}

async function resolveVariantIds(product: AddToCartProduct) {
  if (product.variantId && product.productAttributeId) {
    return {
      variantId: product.variantId,
      productAttributeId: product.productAttributeId,
    };
  }

  const details = await getProductDetails(product.productId);
  if (!details) {
    throw new Error("Product not found");
  }

  const variant =
    product.variantId && details.variants?.length
      ? (details.variants.find((item) => item.id === product.variantId) ??
        details.variants[0])
      : details.variants?.[0];

  const variantId = variant?.id;
  const productAttributeId =
    product.productAttributeId ??
    variant?.attributeDetails?.id ??
    details.attributes?.[0]?.id;

  if (!variantId || !productAttributeId) {
    throw new Error("Please select product variant");
  }

  return { variantId, productAttributeId };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState<CartItemView[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<AddToCartProduct | null>(
    null,
  );
  const itemsRef = useRef(items);
  const pendingProductRef = useRef<AddToCartProduct | null>(null);
  itemsRef.current = items;
  pendingProductRef.current = pendingProduct;

  const refreshCart = useCallback(async (options?: { silent?: boolean }) => {
    const customerId = getCustomerId();
    if (!customerId) {
      setItems([]);
      return;
    }

    const silent = options?.silent ?? itemsRef.current.length > 0;
    if (!silent) {
      setIsLoading(true);
    }

    try {
      const cart = await getCart(customerId);
      setItems(cart);
    } catch {
      // Keep existing cart items on transient fetch errors.
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    } else {
      setItems([]);
    }
  }, [isAuthenticated, refreshCart]);

  const openAddToCart = useCallback((product: AddToCartProduct) => {
    setPendingProduct(product);
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
    setPendingProduct(null);
  }, []);

  const confirmAddToCart = useCallback(
    async (quantity: number, productOverride?: AddToCartProduct) => {
      const product = productOverride ?? pendingProductRef.current;
      if (!product) {
        return "No product selected.";
      }

      const customerId = getCustomerId();
      if (!customerId) {
        return "Please login to add items to cart.";
      }

      try {
        const { variantId, productAttributeId } =
          await resolveVariantIds(product);

        const result = await addToCartApi(customerId, {
          productId: product.productId,
          qty: quantity,
          productAttributeId,
          productVariantId: variantId,
        });

        if (!isApiSuccess(result.status)) {
          return result.message ?? "Could not add to cart.";
        }

        await refreshCart({ silent: false });
        closeCart();
        return null;
      } catch (error) {
        return error instanceof Error
          ? error.message
          : "Could not add to cart.";
      }
    },
    [refreshCart, closeCart],
  );

  const updateQuantity = useCallback(
    async (cartItemId: number, qty: number) => {
      const customerId = getCustomerId();
      if (!customerId || qty < 1) return;

      setItems((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, qty } : item))
      );

      try {
        await updateCartItem(customerId, cartItemId, qty);
      } catch {
        await refreshCart();
      }
    },
    [refreshCart]
  );

  const removeItem = useCallback(
    async (cartItemId: number) => {
      const customerId = getCustomerId();
      if (!customerId) return;

      setItems((prev) => prev.filter((item) => item.id !== cartItemId));

      try {
        await removeCartItem(customerId, cartItemId);
      } catch {
        await refreshCart();
      }
    },
    [refreshCart]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isLoading,
      isCartOpen,
      pendingProduct,
      openAddToCart,
      closeCart,
      refreshCart,
      confirmAddToCart,
      updateQuantity,
      removeItem,
    }),
    [
      items,
      itemCount,
      subtotal,
      isLoading,
      isCartOpen,
      pendingProduct,
      openAddToCart,
      closeCart,
      refreshCart,
      confirmAddToCart,
      updateQuantity,
      removeItem,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
