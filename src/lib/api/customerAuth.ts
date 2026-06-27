import { CUSTOMER_API } from "./config";
import type { OtpResponse, OtpVerifyResponse } from "./types";

/** Matches Backend/customer/views.py OTP_LENGTH */
export const CUSTOMER_OTP_LENGTH = 6;

/** Matches Backend/customer/views.py OTP_EXPIRY_MINUTES */
export const CUSTOMER_OTP_EXPIRY_MINUTES = 10;

type CustomerApiPayload = Record<string, string>;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizePhone(phone: string) {
  const trimmed = phone.trim();
  if (trimmed.startsWith("+91")) {
    return trimmed.replace(/^\+91/, "").trim();
  }
  return trimmed;
}

async function customerApiPost<T extends { status: boolean; message?: string }>(
  path: string,
  body: CustomerApiPayload
): Promise<T> {
  const response = await fetch(`${CUSTOMER_API}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = (await response.json().catch(() => null)) as T | null;

  if (!data || typeof data !== "object" || typeof data.status !== "boolean") {
    throw new Error("Invalid response from server.");
  }

  if (!response.ok) {
    throw new Error(data.message ?? `Request failed (${response.status})`);
  }

  return data;
}

/**
 * POST /api/customer/send-otp/ (Django requires trailing slash; proxy adds it)
 * Backend: customer.views.send_otp
 */
export async function sendCustomerOtp(payload: {
  email: string;
  phone?: string;
}): Promise<OtpResponse> {
  const email = normalizeEmail(payload.email);

  if (!email) {
    return {
      status: false,
      message: "Email is required",
    };
  }

  const body: CustomerApiPayload = { email };

  const phone = payload.phone?.trim();
  if (phone) {
    body.phone = normalizePhone(phone);
  }

  return customerApiPost<OtpResponse>("/send-otp", body);
}

/**
 * POST /api/customer/verify-otp/ (Django requires trailing slash; proxy adds it)
 * Backend: customer.views.verify_otp
 */
export async function verifyCustomerOtp(payload: {
  email: string;
  otp: string;
}): Promise<OtpVerifyResponse> {
  const email = normalizeEmail(payload.email);
  const otp = payload.otp.trim();

  if (!email) {
    return {
      status: false,
      message: "Email is required",
    };
  }

  if (!otp) {
    return {
      status: false,
      message: "OTP is required",
    };
  }

  if (!/^\d+$/.test(otp) || otp.length !== CUSTOMER_OTP_LENGTH) {
    return {
      status: false,
      message: `OTP must be a ${CUSTOMER_OTP_LENGTH}-digit code`,
    };
  }

  return customerApiPost<OtpVerifyResponse>("/verify-otp", { email, otp });
}
