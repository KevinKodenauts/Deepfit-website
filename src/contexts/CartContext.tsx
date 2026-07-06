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
  cartToast: string | null;
  dismissCartToast: () => void;
  openAddToCart: (
    product: AddToCartProduct,
    quantity?: number
  ) => Promise<string | null>;
  refreshCart: (options?: { silent?: boolean }) => Promise<void>;
  updateQuantity: (cartItemId: number, qty: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

async function resolveVariantIds(product: AddToCartProduct): Promise<{
  variantId?: number;
  productAttributeId?: number;
}> {
  const details = await getProductDetails(product.productId);
  if (!details) {
    throw new Error("Product not found");
  }

  const realVariants = (details.variants ?? []).filter((variant) => variant.id > 0);

  if (realVariants.length === 0) {
    return {};
  }

  const variant =
    product.variantId && product.variantId > 0
      ? realVariants.find((item) => item.id === product.variantId) ??
        realVariants[0]
      : realVariants[0];

  const variantId = variant.id;
  const attributeId =
    product.productAttributeId && product.productAttributeId > 0
      ? product.productAttributeId
      : variant.attributeDetails?.id && variant.attributeDetails.id > 0
        ? variant.attributeDetails.id
        : details.attributes?.[0]?.id;

  return {
    variantId,
    ...(attributeId && attributeId > 0
      ? { productAttributeId: attributeId }
      : {}),
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState<CartItemView[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartToast, setCartToast] = useState<string | null>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

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
      setItems([]);
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

  const dismissCartToast = useCallback(() => {
    setCartToast(null);
  }, []);

  const openAddToCart = useCallback(
    async (product: AddToCartProduct, quantity = 1) => {
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

        if (!result.status) {
          const message = result.message ?? "Could not add to cart.";
          setCartToast(message);
          return message;
        }

        await refreshCart({ silent: true });
        setCartToast(`${product.title} added to cart`);
        return null;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Could not add to cart.";
        setCartToast(message);
        return message;
      }
    },
    [refreshCart]
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
      cartToast,
      dismissCartToast,
      openAddToCart,
      refreshCart,
      updateQuantity,
      removeItem,
    }),
    [
      items,
      itemCount,
      subtotal,
      isLoading,
      cartToast,
      dismissCartToast,
      openAddToCart,
      refreshCart,
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
