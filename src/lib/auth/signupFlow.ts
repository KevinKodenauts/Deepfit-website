export type PendingSignup = {
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  password: string;
};

const PENDING_SIGNUP_KEY = "deepfit_signup_pending";

export function savePendingSignup(data: PendingSignup) {
  sessionStorage.setItem(PENDING_SIGNUP_KEY, JSON.stringify(data));
  sessionStorage.setItem("deepfit_signup_email", data.customerEmail);
  sessionStorage.setItem("deepfit_signup_mobile", data.customerMobile);
}

export function getPendingSignup(): PendingSignup | null {
  const raw = sessionStorage.getItem(PENDING_SIGNUP_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as PendingSignup;
  } catch {
    return null;
  }
}

export function clearPendingSignup() {
  sessionStorage.removeItem(PENDING_SIGNUP_KEY);
  sessionStorage.removeItem("deepfit_signup_email");
  sessionStorage.removeItem("deepfit_signup_mobile");
}
