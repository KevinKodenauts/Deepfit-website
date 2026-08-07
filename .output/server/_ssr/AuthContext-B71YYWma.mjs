import { a as __toESM } from "../_runtime.mjs";
import { C as saveSession, T as signupCustomer, _ as getStoredUser, b as pickAuthTokens, c as apiRequest, f as getAccessToken, g as getRefreshToken, l as clearSession, n as CUSTOMER_API, p as getCustomerDetails, r as CUSTOMER_PORTAL, s as UNAUTHORIZED_EVENT, t as ApiError, u as forceLogout, v as isInvalidTokenPayload, w as shouldForceLogout, x as portalUrl, y as loginCustomer } from "./auth-4WDLQ7fX.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthContext-B71YYWma.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function applyAuthHeaders(headers, token, formData) {
	if (!token) return;
	headers.Authorization = `Bearer ${token}`;
	headers["X-Access-Token"] = token;
	formData?.append("accessToken", token);
}
async function portalRequest(path, { method = "GET", body, formFields, auth = false, token, query } = {}) {
	const url = portalUrl(path, query);
	const headers = { Accept: "application/json" };
	let requestBody;
	const authToken = auth ? token ?? getAccessToken() : null;
	if (formFields) {
		const formData = new FormData();
		for (const [key, value] of Object.entries(formFields)) if (value !== void 0 && value !== null) formData.append(key, String(value));
		applyAuthHeaders(headers, authToken, formData);
		requestBody = formData;
	} else {
		headers["Content-Type"] = "application/json";
		applyAuthHeaders(headers, authToken);
		if (body !== void 0) requestBody = JSON.stringify(body);
	}
	const response = await fetch(url, {
		method,
		headers,
		credentials: "include",
		body: requestBody
	});
	const data = await response.json().catch(() => null);
	const message = (data && typeof data === "object" && "message" in data ? String(data.message) : null) ?? `Request failed (${response.status})`;
	if (shouldForceLogout(response.status, data, auth)) {
		forceLogout();
		throw new ApiError(message, response.status);
	}
	if (!response.ok) throw new ApiError(message, response.status);
	return data;
}
function portalCustomerFields(customerId) {
	return {
		customerId: String(customerId),
		clientId: String(1)
	};
}
var cache = /* @__PURE__ */ new Map();
function getCachedProductDetail(productId) {
	return cache.get(productId) ?? null;
}
var store = /* @__PURE__ */ new Map();
function getCached(key) {
	const entry = store.get(key);
	if (!entry || entry.expires <= Date.now()) {
		store.delete(key);
		return null;
	}
	return entry.data;
}
function setCached(key, data, ttlMs) {
	store.set(key, {
		data,
		expires: Date.now() + ttlMs
	});
}
function invalidateCache(keyOrPrefix) {
	for (const key of store.keys()) if (key === keyOrPrefix || key.startsWith(`${keyOrPrefix}:`)) store.delete(key);
}
async function withCache(key, fetcher, ttlMs) {
	const cached = getCached(key);
	if (cached !== null) return cached;
	const data = await fetcher();
	setCached(key, data, ttlMs);
	return data;
}
var FALLBACK_IMAGE = "/images/whey-protein.png";
function extractGalleryUrls(gallery) {
	if (!gallery) return [];
	if (Array.isArray(gallery)) return gallery.filter(Boolean);
	if (typeof gallery === "string") {
		const urls = gallery.match(/https?:\/\/[^\s'"]+/g);
		if (urls?.length) return urls;
		try {
			const normalized = gallery.replace(/'/g, "\"");
			const parsed = JSON.parse(normalized);
			if (Array.isArray(parsed)) return parsed.filter(Boolean);
		} catch {}
	}
	return [];
}
function pickBestImageUrl(urls) {
	if (urls.length === 0) return FALLBACK_IMAGE;
	const s3Url = urls.find((url) => url.includes("kodecloud-bucket") || url.includes("s3.ap-south-1.amazonaws.com") || url.startsWith("/images/"));
	if (s3Url) return s3Url;
	const nonUnsplash = urls.find((url) => !url.includes("images.unsplash.com"));
	if (nonUnsplash) return nonUnsplash;
	return urls[0];
}
function parseProductGallery(gallery) {
	return pickBestImageUrl(extractGalleryUrls(gallery));
}
/** Listing/card image: prefer first variant gallery when the product is multi-variant. */
function resolveProductImage(product) {
	const realVariants = (product.variants ?? []).filter((variant) => variant.id > 0);
	if (realVariants.length > 0) {
		const firstVariantUrls = extractGalleryUrls(realVariants[0].variantImageGallery);
		if (firstVariantUrls.length > 0) return pickBestImageUrl(firstVariantUrls);
	}
	return parseProductGallery(product.productGallery);
}
function parseProductPrice(product) {
	if (product.price !== void 0 && product.price !== null) return Number(product.price);
	const firstVariant = product.variants?.[0];
	if (firstVariant?.price) return Number(firstVariant.price);
	return 0;
}
function parseOriginalPrice(price, product) {
	const regularFromApi = product.regularPrice != null ? Number(product.regularPrice) : product.mrp != null ? Number(product.mrp) : null;
	if (regularFromApi && regularFromApi > price) return regularFromApi;
	const discount = Number(product.discountedPercentage ?? 0);
	if ((product.isDiscountApplicable === true || product.isDiscountApplicable === "true") && discount > 0) return Math.round(price / (1 - discount / 100));
	return null;
}
function getProductBadge(product) {
	if (product.isTopSellingProduct === true || product.isTopSellingProduct === "true") return {
		text: "BESTSELLER",
		type: "red"
	};
	if (product.isFeaturedProduct === true || product.isFeaturedProduct === "true") return {
		text: "TOP RATED",
		type: "purple"
	};
	const discount = Number(product.discountedPercentage ?? 0);
	if (discount > 0) return {
		text: `SAVE ${discount}%`,
		type: "red"
	};
	return null;
}
function mapToHomeProduct(product) {
	const price = parseProductPrice(product);
	const original = parseOriginalPrice(price, product);
	const badge = getProductBadge(product);
	const ratings = Array.isArray(product.averageRatingsDetails) ? product.averageRatingsDetails[0] : product.averageRatingsDetails;
	const inStock = product.inStock === true || product.inStock === "true" || product.stockStatus !== "outofstock" && product.productStatus !== "Out of stock";
	return {
		id: product.id,
		title: product.productName,
		price,
		originalPrice: original ?? price,
		image: resolveProductImage(product),
		tag: badge?.text,
		inStock,
		stockLabel: inStock ? "In stock" : "Out of stock",
		rating: Number(ratings?.averageRating ?? 0),
		reviewCount: Number(ratings?.totalRatings ?? 0),
		categoryName: product.categoryDetails?.categoryName,
		mainCategoryName: product.mainCategoryDetails?.mainCategoryName
	};
}
function mapToCategoryProduct(product) {
	const price = parseProductPrice(product);
	const original = parseOriginalPrice(price, product);
	const badge = getProductBadge(product);
	const ratings = Array.isArray(product.averageRatingsDetails) ? product.averageRatingsDetails[0] : product.averageRatingsDetails;
	return {
		id: product.id,
		brand: product.clientDetails?.companyName ?? product.subCategoryDetails?.subCategoryName ?? "DEEPFIT",
		title: product.productName,
		price,
		originalPrice: original,
		image: resolveProductImage(product),
		badge: badge?.text,
		badgeType: badge?.type,
		rating: Number(ratings?.averageRating ?? 0),
		reviewCount: Number(ratings?.totalRatings ?? 0),
		deliveryTime: product.expectedDeliveryTime ?? "12 MINS",
		weight: product.attributes?.[0]?.value ?? product.productShortDescription ?? void 0
	};
}
function getInitials(name) {
	return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
}
function formatReviewDate(value) {
	if (!value) return "Recently";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	const diffMs = Date.now() - date.getTime();
	const diffDays = Math.floor(diffMs / 864e5);
	if (diffDays <= 0) return "Today";
	if (diffDays === 1) return "1 day ago";
	if (diffDays < 7) return `${diffDays} days ago`;
	if (diffDays < 30) return `${Math.floor(diffDays / 7)} week ago`;
	return date.toLocaleDateString();
}
function mapUserReview(item, index) {
	const author = item.customerName ?? item.userName ?? "Customer";
	const galleryImage = Array.isArray(item.reviewGallery) ? item.reviewGallery[0] : item.reviewGallery;
	return {
		id: item.id ?? index,
		author,
		initials: getInitials(author),
		rating: Number(item.rating ?? 5),
		text: item.review ?? item.reviewText ?? item.comment ?? "",
		dateLabel: formatReviewDate(item.reviewDate ?? item.created_at),
		image: item.reviewImage ?? galleryImage,
		isVerified: item.isVerified === true || item.isVerified === "true",
		helpfulCount: Number(item.helpfulCount ?? 0)
	};
}
function mapToProductDetail(product) {
	const variants = (product.variants ?? []).filter((variant) => variant.id > 0).map((variant) => {
		const variantUrls = extractGalleryUrls(variant.variantImageGallery);
		const fallbackImage = parseProductGallery(product.productGallery);
		const images = variantUrls.length > 0 ? variantUrls.map((url) => pickBestImageUrl([url])) : [fallbackImage];
		return {
			id: variant.id,
			attributeId: variant.attributeDetails?.id && variant.attributeDetails.id > 0 ? variant.attributeDetails.id : void 0,
			label: variant.variantkey ?? variant.attributeDetails?.value ?? "Standard",
			price: Number(variant.price ?? 0),
			image: images[0],
			images
		};
	});
	const price = variants[0]?.price ?? parseProductPrice(product);
	const original = parseOriginalPrice(price, product);
	const attributeName = product.attributes?.[0]?.name ?? product.variants?.[0]?.attributeDetails?.name ?? "Variant";
	const ratings = Array.isArray(product.averageRatingsDetails) ? product.averageRatingsDetails[0] : product.averageRatingsDetails;
	const galleryUrls = extractGalleryUrls(product.productGallery);
	const variantImages = variants.map((v) => v.image).filter(Boolean);
	const images = variants.length > 1 && variantImages.length > 0 ? variantImages : galleryUrls.length > 0 ? galleryUrls.map((url) => pickBestImageUrl([url])) : variantImages;
	return {
		id: product.id,
		title: product.productName,
		sku: product.sku ?? "",
		subtitle: product.productShortDescription ?? product.subCategoryDetails?.subCategoryName ?? "",
		description: product.productDescription ?? "",
		images: images.length > 0 ? images : [resolveProductImage(product)],
		price,
		originalPrice: original,
		mainCategoryId: product.mainCategoryDetails?.id ?? 0,
		categoryId: product.categoryDetails?.id ?? 0,
		categoryName: product.categoryDetails?.categoryName ?? product.mainCategoryDetails?.mainCategoryName ?? "Products",
		deliveryTime: product.expectedDeliveryTime ?? "12 MINS",
		variantLabel: attributeName,
		variants: variants.length > 0 ? variants : [{
			id: 0,
			label: "Standard",
			price,
			image: parseProductGallery(product.productGallery),
			images: galleryUrls.length > 0 ? galleryUrls.map((url) => pickBestImageUrl([url])) : [parseProductGallery(product.productGallery)]
		}],
		rating: Number(ratings?.averageRating ?? 0),
		ratingCount: Number(ratings?.totalRatings ?? 0),
		ratingBreakdown: {
			five: Number(ratings?.fiveStarRating ?? 0),
			four: Number(ratings?.fourStarRating ?? 0),
			three: Number(ratings?.threeStarRating ?? 0),
			two: Number(ratings?.twoStarRating ?? 0),
			one: Number(ratings?.oneStarRating ?? 0)
		},
		reviews: (product.userRatingsDetails ?? []).map(mapUserReview),
		isTopSelling: product.isTopSellingProduct === true || product.isTopSellingProduct === "true",
		additionalInformation: (product.additionalInformation ?? []).map((item) => ({
			title: (item.title ?? "").trim(),
			value: (item.value ?? "").trim()
		})).filter((item) => item.title || item.value),
		related: (product.related_products ?? []).filter((item) => item?.id && item.id !== product.id).map(mapToCategoryProduct)
	};
}
function mapSubCategory(sub) {
	return {
		id: sub.subCategoryId ?? sub.id ?? 0,
		subCategoryName: sub.subCategoryName ?? sub.name ?? "",
		subCategoryImage: sub.subCategoryImage ?? sub.categoryImage ?? ""
	};
}
function mapCategoryFromList(item) {
	return {
		id: item.id ?? 0,
		categoryName: item.categoryName ?? item.mainCategoryName ?? "",
		categoryImage: item.categoryImage ?? item.mainCategoryImage ?? "",
		subCategories: (item.subCategories ?? []).map(mapSubCategory)
	};
}
function mapCategoryFromMainCategory(item) {
	const nestedCategories = item.categories ?? [];
	const subCategories = [];
	for (const nested of nestedCategories) {
		const subs = nested.subCategories ?? [];
		for (const sub of subs) subCategories.push({
			id: sub.subCategoryId ?? sub.id ?? 0,
			subCategoryName: sub.subCategoryName ?? sub.name ?? "",
			subCategoryImage: sub.subCategoryImage ?? nested.categoryImage ?? item.mainCategoryImage ?? ""
		});
	}
	return {
		id: item.id ?? 0,
		categoryName: item.mainCategoryName ?? item.categoryName ?? "",
		categoryImage: item.mainCategoryImage ?? item.categoryImage ?? "",
		subCategories
	};
}
function normalizeDashboardData(raw) {
	const payload = raw && typeof raw === "object" && "data" in raw ? raw.data ?? raw : raw;
	let categories = payload.categoryList ?? payload.homepageCategoryList ?? [];
	if (categories.length === 0) categories = (payload.mainCategories ?? []).map(mapCategoryFromMainCategory);
	else categories = categories.map((item) => item.subCategories ? mapCategoryFromList(item) : mapCategoryFromMainCategory(item));
	const mapBanner = (item) => ({
		id: item.id ?? 0,
		bannerName: item.bannerName ?? item.bannerTitle ?? item.productName ?? "",
		bannerImage: item.advertiseImage ?? item.bannerImage ?? item.productImage ?? "",
		bannerTitle: item.bannerTitle,
		bannerDescription: item.bannerDescription,
		bannerLink: item.bannerLink,
		productName: item.productName,
		productImage: item.productImage,
		originalPrice: item.originalPrice ? Number(item.originalPrice) : void 0,
		offerPrice: item.offerPrice ? Number(item.offerPrice) : void 0
	});
	const mapBrand = (item) => ({
		id: item.id ?? 0,
		brandName: item.brandName ?? "",
		brandIcon: item.brandIcon ?? item.brandLogo ?? ""
	});
	const rawBrands = payload.brandsList ?? [];
	return {
		...payload,
		categoryList: categories,
		brandsList: rawBrands.map(mapBrand),
		advertiseBannerList: payload.advertiseBannerList?.map((item) => mapBanner(item)) ?? [],
		bannerList: payload.bannerList?.map((item) => mapBanner(item)) ?? [],
		popularCollectionList: payload.popularCollectionList ?? [],
		sliderList: payload.sliderList ?? [],
		featuredProductList: payload.featuredProductList ?? [],
		topRatedProductList: payload.topRatedProductList ?? [],
		topSellingProductList: payload.topSellingProductList ?? []
	};
}
function mapDashboardCategoriesToMain(categories) {
	return categories.map((category) => ({
		id: category.id,
		mainCategoryName: category.categoryName,
		mainCategoryImage: category.categoryImage,
		categories: [{
			categoryId: category.id,
			categoryName: category.categoryName,
			categoryImage: category.categoryImage,
			subCategories: category.subCategories.map((sub) => ({
				subCategoryId: sub.id,
				subCategoryName: sub.subCategoryName
			}))
		}]
	}));
}
async function fetchLegacyDashboardData() {
	try {
		const data = await apiRequest(`${CUSTOMER_API}/get_dashboard_data/`);
		if (data.status === false) return null;
		return normalizeDashboardData(data);
	} catch {
		return null;
	}
}
async function getDashboardData(options) {
	if (options?.force) invalidateDashboardCache();
	return withCache("dashboard", async () => {
		try {
			const data = await portalRequest("/dashboardfeaturedproducts");
			if (data.status !== false) return normalizeDashboardData(data);
		} catch {}
		const legacy = await fetchLegacyDashboardData();
		if (legacy) return legacy;
		throw new Error("Failed to load home data.");
	}, 12e4);
}
function invalidateDashboardCache() {
	invalidateCache("dashboard");
}
async function getProductsByCategory(mainCategoryId, categoryId, options) {
	const body = { mainCategoryId };
	if (categoryId) body.categoryId = categoryId;
	const limit = options?.limit ?? 21;
	const offset = options?.offset ?? 0;
	const url = `${CUSTOMER_PORTAL}/productsbycategories?limit=${limit}&offset=${offset}`;
	const data = await apiRequest(url, {
		method: "POST",
		body
	});
	const products = data.productList ?? [];
	const total = data.count ?? products.length;
	return {
		products,
		count: total,
		hasMore: offset + products.length < total
	};
}
async function searchProducts(query, options) {
	const trimmed = query.trim();
	if (!trimmed) return {
		products: [],
		count: 0,
		hasMore: false
	};
	const limit = options?.limit ?? 21;
	const offset = options?.offset ?? 0;
	const url = `${CUSTOMER_PORTAL}/productsbycategories?limit=${limit}&offset=${offset}`;
	const data = await apiRequest(url, {
		method: "POST",
		body: {
			productName: trimmed,
			sortingType: options?.sortingType ?? "date"
		},
		auth: true
	});
	const products = data.productList ?? [];
	const total = data.count ?? products.length;
	return {
		products,
		count: total,
		hasMore: offset + products.length < total
	};
}
async function getProductDetails(productId) {
	return (await apiRequest(`${CUSTOMER_PORTAL}/productdetailsbyproduct`, {
		method: "POST",
		body: { productId }
	})).productDetails?.[0] ?? null;
}
function resolveCartItemPrice(item) {
	const variantPrice = Number(item.variantDetails?.price ?? 0);
	if (variantPrice > 0) return variantPrice;
	const productPrice = Number(item.productDetails?.price ?? 0);
	if (productPrice > 0) return productPrice;
	return 0;
}
function mapCartItem(item) {
	const image = parseProductGallery(item.variantDetails?.variantImageGallery) !== "/images/whey-protein.png" ? parseProductGallery(item.variantDetails?.variantImageGallery) : parseProductGallery(item.productDetails.productGallery);
	return {
		id: item.id,
		productId: item.productDetails.id,
		variantId: item.variantDetails?.id && item.variantDetails.id > 0 ? item.variantDetails.id : void 0,
		title: item.productDetails.productName,
		variant: item.variantDetails?.variantkey ?? "Standard",
		price: resolveCartItemPrice(item),
		qty: Number(item.qty ?? 1),
		image
	};
}
async function enrichCartItemPrices(items) {
	const missingPrice = items.filter((item) => item.price <= 0);
	if (missingPrice.length === 0) return items;
	const priceByProductId = /* @__PURE__ */ new Map();
	await Promise.all(missingPrice.map(async (item) => {
		if (priceByProductId.has(item.productId)) return;
		const cached = getCachedProductDetail(item.productId);
		if (cached?.price && cached.price > 0) {
			priceByProductId.set(item.productId, cached.price);
			return;
		}
		const details = await getProductDetails(item.productId);
		if (details) {
			const price = parseProductPrice(details);
			if (price > 0) priceByProductId.set(item.productId, price);
		}
	}));
	return items.map((item) => {
		if (item.price > 0) return item;
		const resolved = priceByProductId.get(item.productId);
		return resolved && resolved > 0 ? {
			...item,
			price: resolved
		} : item;
	});
}
async function getCart(customerId) {
	return withCache(`cart:${customerId}`, async () => {
		return enrichCartItemPrices(((await portalRequest("/cartbycustomer", {
			method: "POST",
			auth: true,
			formFields: portalCustomerFields(customerId)
		})).cartList ?? []).map(mapCartItem));
	}, 3e4);
}
function invalidateCartCache(customerId) {
	if (customerId) {
		invalidateCache(`cart:${customerId}`);
		return;
	}
	invalidateCache("cart");
}
async function addToCart(customerId, params) {
	invalidateCartCache(customerId);
	const formFields = {
		...portalCustomerFields(customerId),
		productId: params.productId,
		qty: String(params.qty)
	};
	if (params.productAttributeId != null) formFields.productAttributeId = params.productAttributeId;
	if (params.productVariantId != null) formFields.productVariantId = params.productVariantId;
	return portalRequest("/addcart", {
		method: "POST",
		auth: true,
		formFields
	});
}
async function updateCartItem(customerId, cartItemId, qty) {
	invalidateCartCache(customerId);
	return portalRequest("/editcart", {
		method: "POST",
		auth: true,
		formFields: {
			...portalCustomerFields(customerId),
			id: cartItemId,
			qty: String(qty)
		}
	});
}
async function removeCartItem(customerId, cartItemId) {
	invalidateCartCache(customerId);
	return portalRequest("/deletecart", {
		method: "POST",
		auth: true,
		formFields: {
			id: cartItemId,
			clientId: portalCustomerFields(customerId).clientId,
			isDelete: "Yes",
			created_by: "customer"
		}
	});
}
async function getMainCategories() {
	return withCache("main-categories", async () => {
		return (await portalRequest("/maincategorieslist")).mainCategoryDetails ?? [];
	}, 12e4);
}
function invalidateCategoriesCache() {
	invalidateCache("main-categories");
}
var AuthContext = (0, import_react.createContext)(null);
function normalizeUser(user) {
	const raw = user;
	const id = raw.id ?? raw.customerId ?? 0;
	const referralCode = user.referralCode || user.referral_code || "";
	const referralPoints = user.referralPoints ?? user.referral_points ?? user.walletBalance ?? 0;
	return {
		...user,
		id,
		name: user.name || user.customerName,
		email: user.email || user.customerEmail,
		phone: user.phone || user.customerMobile,
		profile_picture: user.profile_picture || user.profileImage,
		referralCode,
		referralPoints
	};
}
function readStoredUser() {
	const stored = getStoredUser();
	return stored ? normalizeUser(stored) : null;
}
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [sessionVersion, setSessionVersion] = (0, import_react.useState)(0);
	const refreshProfile = (0, import_react.useCallback)(async () => {
		const stored = getStoredUser();
		if (!stored?.id) {
			setUser(null);
			return;
		}
		try {
			const details = await getCustomerDetails(stored.id);
			if (details) {
				const normalized = normalizeUser(details);
				setUser(normalized);
				saveSession(getAccessToken() ?? "", getRefreshToken() ?? "", normalized);
			} else setUser(normalizeUser(stored));
		} catch (error) {
			if (error instanceof ApiError && (error.status === 401 || error.status === 403 || isInvalidTokenPayload({ message: error.message }))) {
				setUser(null);
				return;
			}
			setUser(normalizeUser(stored));
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const stored = readStoredUser();
		if (!stored) {
			setIsLoading(false);
			return;
		}
		setUser(stored);
		setIsLoading(false);
		refreshProfile();
	}, [refreshProfile]);
	(0, import_react.useEffect)(() => {
		const onUnauthorized = () => {
			setUser(null);
			invalidateDashboardCache();
			invalidateCategoriesCache();
			invalidateCartCache();
			setSessionVersion((value) => value + 1);
		};
		window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
		return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
	}, []);
	const handleAuthSuccess = (0, import_react.useCallback)((response) => {
		if (!response.access || !response.user) return "Login failed. Please try again.";
		const normalized = normalizeUser(response.user);
		saveSession(response.access, response.refresh ?? "", normalized);
		setUser(normalized);
		invalidateDashboardCache();
		invalidateCategoriesCache();
		if (normalized.id) invalidateCartCache(normalized.id);
		setSessionVersion((value) => value + 1);
		return null;
	}, []);
	const login = (0, import_react.useCallback)(async (email, password) => {
		const response = await loginCustomer(email, password);
		const { access, refresh, user } = pickAuthTokens(response);
		if (response.status && access && user) return handleAuthSuccess({
			access,
			refresh,
			user
		});
		return response.message ?? "Invalid credentials.";
	}, [handleAuthSuccess]);
	const signup = (0, import_react.useCallback)(async (payload) => {
		const response = await signupCustomer(payload);
		if (!response.status) return response.message ?? "Signup failed. Please try again.";
		return null;
	}, []);
	const loginWithResponse = (0, import_react.useCallback)((response) => {
		return handleAuthSuccess(response);
	}, [handleAuthSuccess]);
	const logout = (0, import_react.useCallback)(() => {
		clearSession();
		setUser(null);
		invalidateDashboardCache();
		invalidateCategoriesCache();
		invalidateCartCache();
		setSessionVersion((value) => value + 1);
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		user,
		isLoading,
		isAuthenticated: Boolean(user),
		sessionVersion,
		login,
		signup,
		loginWithResponse,
		logout,
		refreshProfile
	}), [
		user,
		isLoading,
		sessionVersion,
		login,
		signup,
		loginWithResponse,
		logout,
		refreshProfile
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
}
//#endregion
export { useAuth as _, getMainCategories as a, mapDashboardCategoriesToMain as c, mapToProductDetail as d, portalCustomerFields as f, updateCartItem as g, searchProducts as h, getDashboardData as i, mapToCategoryProduct as l, removeCartItem as m, addToCart as n, getProductDetails as o, portalRequest as p, getCart as r, getProductsByCategory as s, AuthProvider as t, mapToHomeProduct as u };
