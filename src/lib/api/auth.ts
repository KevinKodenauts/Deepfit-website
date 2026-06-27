import { CUSTOMER_PORTAL, portalUrl } from "./config";
import { portalCustomerFields, portalRequest } from "./portalClient";
import { getAccessToken } from "@/lib/auth/session";
import {
  sendCustomerOtp,
  verifyCustomerOtp,
} from "./customerAuth";
import { apiRequest } from "./client";
import type {
  AuthResponse,
  CustomerUser,
  OtpResponse,
  OtpVerifyResponse,
  ReferralTreeResponse,
} from "./types";
const APP_SOURCE = "Mobile";

type CustomerDetailsResponse = {
  status: boolean;
  customerDetails?: CustomerUser;
  customerList?: CustomerUser[];
  message?: string;
};

type AddressListResponse = {
  status: boolean;
  addressList: Array<{
    id: number;
    addressType?: string;
    fullName?: string;
    mobileNo?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    isDefault?: string | boolean;
  }>;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeMobile(mobile: string) {
  const trimmed = mobile.trim();
  if (trimmed.startsWith("+91")) {
    return trimmed.replace(/^\+91/, "").trim();
  }
  return trimmed;
}

export async function loginCustomer(
  username: string,
  password: string
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>(`${CUSTOMER_PORTAL}/customerlogin`, {
    method: "POST",
    body: {
      username: username.trim(),
      password,
      source: APP_SOURCE,
    },
  });
}

export async function signupCustomer(payload: {
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  password: string;
}): Promise<AuthResponse> {
  return apiRequest<AuthResponse>(`${CUSTOMER_PORTAL}/customersignup`, {
    method: "POST",
    body: {
      customerName: payload.customerName.trim(),
      customerEmail: normalizeEmail(payload.customerEmail),
      customerMobile: normalizeMobile(payload.customerMobile),
      password: payload.password,
      source: APP_SOURCE,
    },
  });
}

export {
  CUSTOMER_OTP_EXPIRY_MINUTES,
  CUSTOMER_OTP_LENGTH,
  sendCustomerOtp,
  verifyCustomerOtp,
} from "./customerAuth";

export async function sendSignupEmailOtp(
  email: string,
  phone?: string
): Promise<OtpResponse> {
  return sendCustomerOtp({ email, phone });
}

export async function verifySignupEmailOtp(
  email: string,
  otp: string
): Promise<OtpVerifyResponse> {
  return verifyCustomerOtp({ email, otp });
}

export async function verifyForgotPasswordOtp(
  email: string,
  otp: string
): Promise<OtpVerifyResponse> {
  if (!/^\d{6}$/.test(otp)) {
    throw new Error("OTP must be a 6-digit code");
  }

  return apiRequest<OtpVerifyResponse>(`${CUSTOMER_PORTAL}/verifyotp`, {
    method: "POST",
    body: {
      email: normalizeEmail(email),
      otp,
      purpose: "password_reset",
    },
  });
}

/** @deprecated Use sendSignupEmailOtp */
export async function sendEmailOtp(email: string, phone?: string) {
  return sendSignupEmailOtp(email, phone);
}

/** @deprecated Use sendSignupEmailOtp */
export async function sendOtp(email: string, phone?: string) {
  return sendSignupEmailOtp(email, phone);
}

/** @deprecated Use verifySignupEmailOtp or verifyForgotPasswordOtp */
export async function verifyEmailOtp(email: string, otp: string) {
  return verifySignupEmailOtp(email, otp);
}

/** @deprecated Use verifySignupEmailOtp */
export async function verifyOtp(email: string, otp: string) {
  return verifySignupEmailOtp(email, otp);
}

export async function loginAfterOtp(mobile: string): Promise<AuthResponse> {
  return apiRequest<AuthResponse>(`${CUSTOMER_PORTAL}/customerloginotp`, {
    method: "POST",
    body: { mobile: normalizeMobile(mobile), source: APP_SOURCE },
  });
}

export async function getCustomerDetails(
  customerId: number
): Promise<CustomerUser | null> {
  const data = await apiRequest<CustomerDetailsResponse>(
    portalUrl("/customerdetailsbycustomerid"),
    {
      method: "POST",
      body: { customerId },
      auth: true,
    }
  );

  if (!data.status) return null;
  return data.customerDetails ?? data.customerList?.[0] ?? null;
}

export async function getCustomerReferralTree(
  customerId: number
): Promise<ReferralTreeResponse | null> {
  const data = await apiRequest<ReferralTreeResponse>(
    portalUrl("/getcustomerreferraltree", { maxLevels: 9 }),
    {
      method: "POST",
      body: { customerId },
      auth: true,
    }
  );

  return data.status ? data : null;
}

export async function getCustomerAddresses(customerId: number) {
  const data = await portalRequest<AddressListResponse>(
    "/addressesbycustomer",
    {
      method: "POST",
      auth: true,
      formFields: portalCustomerFields(customerId),
    }
  );
  return data.addressList ?? [];
}

export async function sendWhatsappOtpLogin(customerMobile: string) {
  return apiRequest<{ status: boolean; message?: string; mobile?: string }>(
    `${CUSTOMER_PORTAL}/sendwhatsappotp`,
    {
      method: "POST",
      body: { customerMobile: normalizeMobile(customerMobile) },
    }
  );
}

export async function sendWhatsappOtpSignup(customerMobile: string) {
  return apiRequest<{ status: boolean; message?: string; mobile?: string }>(
    `${CUSTOMER_PORTAL}/sendwhatsappotpsignup`,
    {
      method: "POST",
      body: { customerMobile: normalizeMobile(customerMobile) },
    }
  );
}

export async function verifyWhatsappOtp(customerMobile: string, otp: string) {
  return apiRequest<AuthResponse>(`${CUSTOMER_PORTAL}/verifywhatsappotp`, {
    method: "POST",
    body: { customerMobile: normalizeMobile(customerMobile), otp },
  });
}

export async function updateNewCustomerData(payload: {
  customerMobile: string;
  customerName: string;
  customerEmail: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}) {
  return apiRequest<{ status: boolean; message?: string }>(
    `${CUSTOMER_PORTAL}/updatenewcustomerdata`,
    {
      method: "POST",
      body: payload,
    }
  );
}

export async function forgotPassword(email: string) {
  return apiRequest<OtpResponse>(`${CUSTOMER_PORTAL}/customerforgotpassword`, {
    method: "POST",
    body: { email: normalizeEmail(email) },
  });
}

export async function resetForgottenPassword(
  email: string,
  newPassword: string
) {
  const trimmedEmail = normalizeEmail(email);

  try {
    const reset = await apiRequest<{ status: boolean; message?: string }>(
      `${CUSTOMER_PORTAL}/customerresetpassword`,
      {
        method: "POST",
        body: {
          email: trimmedEmail,
          newPassword,
        },
      }
    );

    if (reset.status) return reset;

    let message =
      reset.message ?? "Password could not be updated. Please request a new code.";

    if (message.toLowerCase().includes("verify otp")) {
      message =
        "OTP session expired. Please go back and request a new code.";
    }

    return { status: false, message };
  } catch (err) {
    return {
      status: false,
      message:
        err instanceof Error
          ? err.message
          : "Failed to reset password. Please try again.",
    };
  }
}

export async function updateCustomerPassword(
  newPassword: string,
  oldPassword?: string,
  token?: string
) {
  return apiRequest<{ status: boolean; message?: string }>(
    portalUrl("/updatecustomerpassword"),
    {
      method: "POST",
      body: {
        newPassword,
        ...(oldPassword ? { oldPassword } : {}),
      },
      auth: true,
      token,
    }
  );
}

type UpdateProfileResponse = {
  status: boolean;
  message?: string;
  user?: CustomerUser;
};

export async function updateCustomerProfile(payload: {
  customerId: number;
  customerName: string;
  customerMobile: string;
  customerAlterMobile?: string;
  updatedBy: string;
}): Promise<UpdateProfileResponse> {
  const formData = new FormData();
  formData.append("id", String(payload.customerId));
  formData.append("customerName", payload.customerName);
  formData.append("customerMobile", payload.customerMobile);
  formData.append("updated_by", payload.updatedBy);
  formData.append("customerAlterMobile", payload.customerAlterMobile ?? "");

  const token = getAccessToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(portalUrl("/editcustomerprofile"), {
    method: "POST",
    headers,
    body: formData,
    credentials: "include",
  });

  const data = (await response.json().catch(() => null)) as UpdateProfileResponse | null;

  if (!response.ok || !data) {
    return {
      status: false,
      message: data?.message ?? `Request failed (${response.status})`,
    };
  }

  return data;
}

export function pickAuthTokens(response: AuthResponse) {
  const raw = response as AuthResponse & {
    access_token?: string;
    token?: string;
    customerDetails?: CustomerUser;
    data?: {
      access?: string;
      access_token?: string;
      token?: string;
      refresh?: string;
      user?: CustomerUser;
      customerDetails?: CustomerUser;
    };
  };

  const access =
    raw.access ??
    raw.access_token ??
    raw.token ??
    raw.data?.access ??
    raw.data?.access_token ??
    raw.data?.token;

  const refresh = raw.refresh ?? raw.data?.refresh;

  const user =
    raw.user ?? raw.customerDetails ?? raw.data?.user ?? raw.data?.customerDetails;

  if (user) {
    const normalizedUser = user as CustomerUser & { customerId?: number };
    return {
      access,
      refresh,
      user: {
        ...user,
        id: normalizedUser.id ?? normalizedUser.customerId ?? 0,
      },
    };
  }

  return { access, refresh, user };
}
