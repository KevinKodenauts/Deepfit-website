export const FORGOT_EMAIL_KEY = "deepfit_forgot_email";
export const FORGOT_VERIFIED_KEY = "deepfit_forgot_verified";

const EMAIL_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;

export function isValidForgotPasswordEmail(email: string) {
  return EMAIL_PATTERN.test(email.trim());
}

export function clearForgotPasswordSession() {
  sessionStorage.removeItem(FORGOT_EMAIL_KEY);
  sessionStorage.removeItem(FORGOT_VERIFIED_KEY);
}
