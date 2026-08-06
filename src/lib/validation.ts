/** Shared validation helpers for auth forms */

import type { ParsedCountry } from "react-international-phone";
import { validatePhoneNumber } from "@/lib/phone/utils";

export type FieldErrors = Record<string, string>;

export const TERMS_ACCEPTANCE_ERROR =
  "You must accept the Terms & Conditions and Privacy Policy to continue.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^[6-9]\d{9}$/;

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

export const PASSWORD_REQUIREMENTS = [
  "At least 8 characters",
  "One uppercase letter",
  "One lowercase letter",
  "One number",
] as const;

export type PasswordCheck = {
  label: (typeof PASSWORD_REQUIREMENTS)[number];
  met: boolean;
};

export function getPasswordChecks(password: string): PasswordCheck[] {
  return [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
    { label: "One number", met: /\d/.test(password) },
  ];
}

export function getPasswordStrength(password: string): {
  score: number;
  total: number;
  percent: number;
  label: "Weak" | "Fair" | "Good" | "Strong" | "";
  error: string | null;
} {
  if (!password) {
    return { score: 0, total: 4, percent: 0, label: "", error: null };
  }

  const checks = getPasswordChecks(password);
  const score = checks.filter((check) => check.met).length;
  const total = checks.length;
  const percent = (score / total) * 100;

  let label: "Weak" | "Fair" | "Good" | "Strong" = "Weak";
  if (score >= 4) label = "Strong";
  else if (score === 3) label = "Good";
  else if (score === 2) label = "Fair";

  return {
    score,
    total,
    percent,
    label,
    error: validatePassword(password),
  };
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

export function validateTermsAcceptance(accepted: boolean): string | null {
  if (!accepted) return TERMS_ACCEPTANCE_ERROR;
  return null;
}

export function validateLoginForm(
  email: string,
  password: string,
  acceptedTerms: boolean,
): FieldErrors {
  const errors: FieldErrors = {};
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  if (!password) errors.password = "Password is required.";
  const termsErr = validateTermsAcceptance(acceptedTerms);
  if (termsErr) errors.acceptedTerms = termsErr;
  return errors;
}

export function validateSignupForm(fields: {
  name: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
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

  const termsErr = validateTermsAcceptance(fields.acceptedTerms);
  if (termsErr) errors.acceptedTerms = termsErr;

  return errors;
}
