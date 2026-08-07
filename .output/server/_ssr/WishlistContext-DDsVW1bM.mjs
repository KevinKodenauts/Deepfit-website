import { a as __toESM } from "../_runtime.mjs";
import { m as getCustomerId } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useAuth, f as portalCustomerFields, g as updateCartItem, l as mapToCategoryProduct, m as removeCartItem, n as addToCart, o as getProductDetails, p as portalRequest, r as getCart } from "./AuthContext-B71YYWma.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/WishlistContext-DDsVW1bM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CartContext = (0, import_react.createContext)(null);
async function resolveVariantIds(product) {
	const details = await getProductDetails(product.productId);
	if (!details) throw new Error("Product not found");
	const realVariants = (details.variants ?? []).filter((variant) => variant.id > 0);
	if (realVariants.length === 0) return {};
	const variant = product.variantId && product.variantId > 0 ? realVariants.find((item) => item.id === product.variantId) ?? realVariants[0] : realVariants[0];
	const variantId = variant.id;
	const attributeId = product.productAttributeId && product.productAttributeId > 0 ? product.productAttributeId : variant.attributeDetails?.id && variant.attributeDetails.id > 0 ? variant.attributeDetails.id : details.attributes?.[0]?.id;
	return {
		variantId,
		...attributeId && attributeId > 0 ? { productAttributeId: attributeId } : {}
	};
}
function CartProvider({ children }) {
	const { isAuthenticated } = useAuth();
	const [items, setItems] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [cartToast, setCartToast] = (0, import_react.useState)(null);
	const itemsRef = (0, import_react.useRef)(items);
	itemsRef.current = items;
	const refreshCart = (0, import_react.useCallback)(async (options) => {
		const customerId = getCustomerId();
		if (!customerId) {
			setItems([]);
			return;
		}
		const silent = options?.silent ?? itemsRef.current.length > 0;
		if (!silent) setIsLoading(true);
		try {
			const cart = await getCart(customerId);
			setItems(cart);
		} catch {
			setItems([]);
		} finally {
			if (!silent) setIsLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (isAuthenticated) refreshCart();
		else setItems([]);
	}, [isAuthenticated, refreshCart]);
	const dismissCartToast = (0, import_react.useCallback)(() => {
		setCartToast(null);
	}, []);
	const openAddToCart = (0, import_react.useCallback)(async (product, quantity = 1) => {
		const customerId = getCustomerId();
		if (!customerId) return "Please login to add items to cart.";
		try {
			const { variantId, productAttributeId } = await resolveVariantIds(product);
			const result = await addToCart(customerId, {
				productId: product.productId,
				qty: quantity,
				productAttributeId,
				productVariantId: variantId
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
			const message = error instanceof Error ? error.message : "Could not add to cart.";
			setCartToast(message);
			return message;
		}
	}, [refreshCart]);
	const updateQuantity = (0, import_react.useCallback)(async (cartItemId, qty) => {
		const customerId = getCustomerId();
		if (!customerId || qty < 1) return;
		setItems((prev) => prev.map((item) => item.id === cartItemId ? {
			...item,
			qty
		} : item));
		try {
			await updateCartItem(customerId, cartItemId, qty);
		} catch {
			await refreshCart();
		}
	}, [refreshCart]);
	const removeItem = (0, import_react.useCallback)(async (cartItemId) => {
		const customerId = getCustomerId();
		if (!customerId) return;
		setItems((prev) => prev.filter((item) => item.id !== cartItemId));
		try {
			await removeCartItem(customerId, cartItemId);
		} catch {
			await refreshCart();
		}
	}, [refreshCart]);
	const itemCount = (0, import_react.useMemo)(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);
	const subtotal = (0, import_react.useMemo)(() => items.reduce((sum, item) => sum + item.price * item.qty, 0), [items]);
	const value = (0, import_react.useMemo)(() => ({
		items,
		itemCount,
		subtotal,
		isLoading,
		cartToast,
		dismissCartToast,
		openAddToCart,
		refreshCart,
		updateQuantity,
		removeItem
	}), [
		items,
		itemCount,
		subtotal,
		isLoading,
		cartToast,
		dismissCartToast,
		openAddToCart,
		refreshCart,
		updateQuantity,
		removeItem
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const context = (0, import_react.useContext)(CartContext);
	if (!context) throw new Error("useCart must be used within CartProvider");
	return context;
}
async function getWishlist(customerId) {
	return ((await portalRequest("/wishlistbycustomer", {
		method: "POST",
		auth: true,
		formFields: portalCustomerFields(customerId)
	})).wishlistList ?? []).map((item) => ({
		...mapToCategoryProduct(item.productDetails),
		wishlistId: item.id
	}));
}
async function addToWishlist(customerId, productId, createdBy) {
	return portalRequest("/addwishlist", {
		method: "POST",
		auth: true,
		formFields: {
			...portalCustomerFields(customerId),
			productId: String(productId),
			...createdBy ? { created_by: createdBy } : {}
		}
	});
}
async function removeFromWishlist(customerId, wishlistId) {
	return portalRequest("/deletewishlist", {
		method: "POST",
		auth: true,
		formFields: {
			id: String(wishlistId),
			clientId: String(1),
			isDelete: "Yes"
		}
	});
}
var WishlistContext = (0, import_react.createContext)(null);
function WishlistProvider({ children }) {
	const { isAuthenticated, user } = useAuth();
	const [items, setItems] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const itemsRef = (0, import_react.useRef)(items);
	itemsRef.current = items;
	const refreshWishlist = (0, import_react.useCallback)(async (options) => {
		const customerId = getCustomerId();
		if (!customerId) {
			setItems([]);
			return;
		}
		const silent = options?.silent ?? itemsRef.current.length > 0;
		if (!silent) setIsLoading(true);
		try {
			const wishlist = await getWishlist(customerId);
			setItems(wishlist);
		} catch {
			setItems([]);
		} finally {
			if (!silent) setIsLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (isAuthenticated) refreshWishlist();
		else setItems([]);
	}, [isAuthenticated, refreshWishlist]);
	const productIdMap = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const item of items) map.set(item.id, item.wishlistId);
		return map;
	}, [items]);
	const isWishlisted = (0, import_react.useCallback)((productId) => productIdMap.has(productId), [productIdMap]);
	const getWishlistId = (0, import_react.useCallback)((productId) => productIdMap.get(productId), [productIdMap]);
	const toggleWishlist = (0, import_react.useCallback)(async (productId, createdBy) => {
		const customerId = getCustomerId();
		if (!customerId) return false;
		const existingId = productIdMap.get(productId);
		const creatorName = createdBy ?? user?.customerName ?? user?.name ?? "Customer";
		if (existingId) {
			try {
				if ((await removeFromWishlist(customerId, existingId)).status) {
					setItems((prev) => prev.filter((item) => item.wishlistId !== existingId));
					return true;
				}
			} catch {
				return false;
			}
			return false;
		}
		try {
			if ((await addToWishlist(customerId, productId, creatorName)).status) {
				await refreshWishlist({ silent: true });
				return true;
			}
		} catch {
			return false;
		}
		return false;
	}, [
		productIdMap,
		refreshWishlist,
		user
	]);
	const removeWishlistItem = (0, import_react.useCallback)(async (wishlistId) => {
		const customerId = getCustomerId();
		if (!customerId) return false;
		try {
			if ((await removeFromWishlist(customerId, wishlistId)).status) {
				setItems((prev) => prev.filter((item) => item.wishlistId !== wishlistId));
				return true;
			}
		} catch {
			return false;
		}
		return false;
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		items,
		itemCount: items.length,
		isLoading,
		isWishlisted,
		getWishlistId,
		refreshWishlist,
		toggleWishlist,
		removeWishlistItem
	}), [
		items,
		isLoading,
		isWishlisted,
		getWishlistId,
		refreshWishlist,
		toggleWishlist,
		removeWishlistItem
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WishlistContext.Provider, {
		value,
		children
	});
}
function useWishlist() {
	const context = (0, import_react.useContext)(WishlistContext);
	if (!context) throw new Error("useWishlist must be used within WishlistProvider");
	return context;
}
//#endregion
export { useWishlist as i, WishlistProvider as n, useCart as r, CartProvider as t };
