export const SITE_NAME = "Deepfit";
export const SITE_TAGLINE = "Wellness Inside Out";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deepfit.life";
export const DEFAULT_DESCRIPTION =
  "Shop supplements, gym essentials & wellness products in minutes.";
export const DEFAULT_OG_IMAGE = "/images/logo/Deepfit-Logo.png";

export type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export const PUBLIC_PAGES = {
  home: {
    title: "Home",
    description:
      "Discover trending supplements, gym essentials, and wellness products. Shop fitness gear curated for your health journey.",
    path: "/home",
  },
  categories: {
    title: "Categories",
    description:
      "Browse wellness and fitness product categories. Find supplements, equipment, and essentials at Deepfit.",
    path: "/categories",
  },
  categoryProducts: {
    title: "Products",
    description:
      "Explore products in your selected category. Shop supplements and fitness essentials at Deepfit.",
    path: "/categories/products",
  },
  search: {
    title: "Search",
    description:
      "Search supplements, gym gear, and wellness products at Deepfit.",
    path: "/search",
  },
  blog: {
    title: "Blog",
    description:
      "Read fitness tips, wellness guides, and health insights from the Deepfit blog.",
    path: "/blog",
  },
  explore: {
    title: "Explore",
    description:
      "Explore Move Hub workouts, Fuel Hub nutrition, and Mind Hub wellness with Deepfit.",
    path: "/explore",
  },
  exercise: {
    title: "Exercise",
    description:
      "Explore workouts and exercises tailored to your fitness goals with Deepfit Move Hub.",
    path: "/exercise",
  },
  exerciseLibrary: {
    title: "Exercise Library",
    description:
      "Browse our full library of exercises and workout programs at Deepfit.",
    path: "/exercise/library",
  },
  myEquipment: {
    title: "My Equipment",
    description:
      "Manage your gym equipment and get personalized exercise recommendations.",
    path: "/exercise/my-equipment",
  },
  notifications: {
    title: "Notifications",
    description: "View your Deepfit notifications and updates.",
    path: "/notifications",
    noIndex: true,
  },
  about: {
    title: "About Us",
    description:
      "Discover the Deepfit story, our Mind. Move. Fuel. method, and our mission to make holistic wellness simple and sustainable.",
    path: "/about",
  },
  contact: {
    title: "Contact Us",
    description:
      "Contact Deepfit for order support, product guidance, or general inquiries.",
    path: "/contact",
  },
} as const satisfies Record<string, PageSeoConfig>;

export const PRIVATE_PAGES = {
  login: {
    title: "Login",
    description: "Sign in to your Deepfit account to shop and track orders.",
    path: "/login",
    noIndex: true,
  },
  signup: {
    title: "Sign Up",
    description: "Create your Deepfit account and start your wellness journey.",
    path: "/signup",
    noIndex: true,
  },
  verifyOtp: {
    title: "Verify OTP",
    description: "Verify your phone number to complete Deepfit account setup.",
    path: "/verify-otp",
    noIndex: true,
  },
  welcome: {
    title: "Welcome",
    description: "Welcome to Deepfit — your wellness journey starts here.",
    path: "/welcome",
    noIndex: true,
  },
  forgotPassword: {
    title: "Forgot Password",
    description: "Reset your Deepfit account password.",
    path: "/forgot-password",
    noIndex: true,
  },
  forgotPasswordVerify: {
    title: "Verify Reset Code",
    description: "Enter the verification code to reset your Deepfit password.",
    path: "/forgot-password/verify",
    noIndex: true,
  },
  forgotPasswordReset: {
    title: "Reset Password",
    description: "Choose a new password for your Deepfit account.",
    path: "/forgot-password/reset",
    noIndex: true,
  },
  cart: {
    title: "Cart",
    description: "Review items in your Deepfit shopping cart.",
    path: "/cart",
    noIndex: true,
  },
  cartCoupon: {
    title: "Apply Coupon",
    description: "Apply a coupon code to your Deepfit order.",
    path: "/cart/coupon",
    noIndex: true,
  },
  checkout: {
    title: "Checkout",
    description: "Complete your Deepfit purchase securely.",
    path: "/checkout",
    noIndex: true,
  },
  wallet: {
    title: "Wallet",
    description: "View your Deepfit wallet balance and transactions.",
    path: "/wallet",
    noIndex: true,
  },
  walletAdd: {
    title: "Add Money",
    description: "Add funds to your Deepfit wallet.",
    path: "/wallet/add",
    noIndex: true,
  },
  orders: {
    title: "Orders",
    description: "View your Deepfit order history.",
    path: "/orders",
    noIndex: true,
  },
  orderDetails: {
    title: "Order Details",
    description: "View details for your Deepfit order.",
    path: "/orders/details",
    noIndex: true,
  },
  orderTrack: {
    title: "Track Order",
    description: "Track the delivery status of your Deepfit order.",
    path: "/orders/track",
    noIndex: true,
  },
  orderSuccess: {
    title: "Order Placed",
    description: "Your Deepfit order has been placed successfully.",
    path: "/orders/success",
    noIndex: true,
  },
  profile: {
    title: "Profile",
    description: "Manage your Deepfit account profile.",
    path: "/profile",
    noIndex: true,
  },
  profileEdit: {
    title: "Edit Profile",
    description: "Update your Deepfit account information.",
    path: "/profile/edit",
    noIndex: true,
  },
  profileChangePassword: {
    title: "Change Password",
    description: "Update your Deepfit account password.",
    path: "/profile/change-password",
    noIndex: true,
  },
  profileWishlist: {
    title: "Wishlist",
    description: "View your saved Deepfit products.",
    path: "/profile/wishlist",
    noIndex: true,
  },
  profileAddresses: {
    title: "Addresses",
    description: "Manage your delivery addresses on Deepfit.",
    path: "/profile/addresses",
    noIndex: true,
  },
  profileReferral: {
    title: "Referral",
    description: "Invite friends and earn rewards with Deepfit referrals.",
    path: "/profile/referral",
    noIndex: true,
  },
} as const satisfies Record<string, PageSeoConfig>;

export const SITEMAP_PATHS = (
  Object.values(PUBLIC_PAGES) as PageSeoConfig[]
).filter((page) => !page.noIndex).map((page) => page.path);

export const ROBOTS_DISALLOW_PATHS = [
  ...new Set([
    ...(Object.values(PRIVATE_PAGES) as PageSeoConfig[]).map(
      (page) => page.path,
    ),
    ...(Object.values(PUBLIC_PAGES) as PageSeoConfig[])
      .filter((page) => page.noIndex)
      .map((page) => page.path),
    "/api",
  ]),
];
