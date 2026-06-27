export type ApiProduct = {
  id: number;
  productName: string;
  sku?: string;
  productDescription?: string;
  productShortDescription?: string;
  productGallery?: string | string[];
  price?: string | number;
  isProductHasDiscount?: boolean;
  isDiscountApplicable?: string | boolean;
  discountedPercentage?: string | number;
  isFeaturedProduct?: string | boolean;
  isTopSellingProduct?: string | boolean;
  stockStatus?: string;
  mainCategoryDetails?: { id: number; mainCategoryName: string };
  categoryDetails?: { id: number; categoryName: string };
  subCategoryDetails?: { id: number; subCategoryName: string };
  clientDetails?: { clientName?: string; companyName?: string };
  variants?: Array<{
    id: number;
    price: string;
    variantkey?: string;
    variantImageGallery?: string | string[];
    attributeDetails?: { id: number; name: string; value: string };
  }>;
  attributes?: Array<{ id: number; name: string; value: string }>;
  userRatingsDetails?: Array<{
    id?: number;
    customerName?: string;
    userName?: string;
    rating?: number | string;
    review?: string;
    reviewText?: string;
    comment?: string;
    created_at?: string;
    reviewDate?: string;
    reviewImage?: string;
    reviewGallery?: string | string[];
    isVerified?: boolean | string;
    helpfulCount?: number | string;
  }>;
  averageRatingsDetails?:
    | {
        averageRating?: number | string;
        totalRatings?: number | string;
        fiveStarRating?: number | string;
        fourStarRating?: number | string;
        threeStarRating?: number | string;
        twoStarRating?: number | string;
        oneStarRating?: number | string;
      }
    | Array<{
        averageRating?: number | string;
        totalRatings?: number | string;
        fiveStarRating?: number | string;
        fourStarRating?: number | string;
        threeStarRating?: number | string;
        twoStarRating?: number | string;
        oneStarRating?: number | string;
      }>;
  additionalInformation?: Array<{ id: number; title: string; value: string }>;
  expectedDeliveryTime?: string;
};

export type MainCategory = {
  id: number;
  mainCategoryName: string;
  mainCategoryImage: string;
  categories?: Array<{
    categoryId: number;
    categoryName: string;
    categoryImage: string;
    subCategories?: Array<{
      subCategoryId: number;
      subCategoryName: string;
    }>;
  }>;
};

export type DashboardSlider = {
  id: number;
  title: string;
  description: string;
  sliderImage: string;
  link?: string;
};

export type DashboardSubCategory = {
  id: number;
  subCategoryName: string;
  subCategoryImage: string;
};

export type DashboardCategory = {
  id: number;
  categoryName: string;
  categoryImage: string;
  subCategories: DashboardSubCategory[];
};

export type DashboardBrand = {
  id: number;
  brandName: string;
  brandIcon: string;
};

export type DashboardBanner = {
  id: number;
  bannerName: string;
  bannerImage: string;
  bannerTitle?: string;
  bannerDescription?: string;
  bannerLink?: string;
  productName?: string;
  productImage?: string;
  originalPrice?: number;
  offerPrice?: number;
};

export type PopularCollection = {
  id: number;
  mainCategoryName: string;
  mainCategoryImage: string;
};

export type DashboardData = {
  status: boolean;
  sliderList?: DashboardSlider[];
  featuredProductList?: ApiProduct[];
  topRatedProductList?: ApiProduct[];
  topSellingProductList?: ApiProduct[];
  popularCollectionList?: PopularCollection[];
  brandsList?: DashboardBrand[];
  bannerList?: DashboardBanner[];
  advertiseBannerList?: DashboardBanner[];
  categoryList?: DashboardCategory[];
  mainCategories?: MainCategory[];
};

export type CustomerUser = {
  id: number;
  customerName?: string;
  customerEmail?: string;
  customerMobile?: string;
  customerAlterMobile?: string | null;
  profileImage?: string;
  name?: string;
  email?: string;
  phone?: string;
  profile_picture?: string;
  referralCode?: string;
  referral_code?: string;
  referralPoints?: number;
  referral_points?: number;
  walletBalance?: number;
};

export type ReferralCustomer = {
  id: number;
  customerName: string;
  referralCode: string;
  level: number;
  walletBalance?: number;
  totalDirectReferrals: number;
  joinedDate?: string;
  referrerName?: string;
  referrals?: ReferralCustomer[];
};

export type ReferralTreeResponse = {
  status: boolean;
  data?: {
    rootCustomer: ReferralCustomer;
    referralTree: ReferralCustomer[];
    maxLevels: number;
    totalReferrals: number;
  };
};

export type AuthResponse = {
  status?: boolean;
  message?: string;
  user?: CustomerUser;
  access?: string;
  refresh?: string;
};

export type OtpResponse = {
  status: boolean;
  message?: string;
  email?: string;
  mobile?: string;
  otp_length?: number;
};

export type OtpVerifyResponse = {
  status: boolean;
  message?: string;
  newUser?: boolean;
  email?: string;
};

export type ExerciseItem = {
  id: number;
  exerciseName: string;
  workoutProgram?: string;
  targetMuscle?: string;
  exerciseImage?: string;
  videoUrl?: string;
  difficulty?: string;
  sets?: number;
  reps?: number;
  durationSeconds?: number;
  standardRecommendation?: string;
  description?: string;
  buttonType?: string;
  equipment?: Array<{ id: number; name: string; category?: string }>;
};

export type EquipmentInstruction = {
  id: number;
  stepNumber: number;
  stepTitle: string;
  stepDescription: string;
};

export type EquipmentItem = {
  id: number;
  name: string;
  category?: string;
  description?: string;
  equipmentImage?: string;
  headline?: string;
  tags?: string[];
  proTip?: string;
  isPrimary?: boolean;
  instructions?: EquipmentInstruction[];
};
