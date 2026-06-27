/** Shared validation helpers for auth forms */

import type { ParsedCountry } from "react-international-phone";
import { validatePhoneNumber } from "@/lib/phone/utils";

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^[6-9]\d{9}$/; // Indian mobile: starts with 6-9, 10 digits

export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required.";
  if (!EMAIL_RE.test(trimmed)) return "Please enter a valid email address.";
  return null;
}

export function validateMobile(mobile: string): string | null {
  const trimmed = mobile.trim();
  if (!trimmed) return "Mobile number is required.";
  if (!/^\d+$/.test(trimmed)) return "Mobile number must contain only digits.";
  if (trimmed.length !== 10) return "Mobile number must be 10 digits.";
  if (!MOBILE_RE.test(trimmed))
    return "Please enter a valid Indian mobile number.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(password))
    return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(password))
    return "Password must include a lowercase letter.";
  if (!/\d/.test(password)) return "Password must include a number.";
  return null;
}

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return "Full name is required.";
  if (trimmed.length < 2) return "Name must be at least 2 characters.";
  if (trimmed.length > 50) return "Name must be under 50 characters.";
  return null;
}

/**
 * Validate the login form and return a map of field → error message.
 * Returns an empty object when all fields are valid.
 */
export function validateLoginForm(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  if (!password) errors.password = "Password is required.";
  return errors;
}

/**
 * Validate the signup form and return a map of field → error message.
 * Returns an empty object when all fields are valid.
 */
export function validateSignupForm(fields: {
  name: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobileCountry?: ParsedCountry;
}): FieldErrors {
  const errors: FieldErrors = {};

  const nameErr = validateName(fields.name);
  if (nameErr) errors.name = nameErr;

  const mobileErr = fields.mobileCountry
    ? validatePhoneNumber(fields.mobile, fields.mobileCountry)
    : validateMobile(fields.mobile);
  if (mobileErr) errors.mobile = mobileErr;

  const emailErr = validateEmail(fields.email);
  if (emailErr) errors.email = emailErr;

  const pwErr = validatePassword(fields.password);
  if (pwErr) errors.password = pwErr;

  if (!fields.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}
