const DEFAULT_MAX_AGE_DAYS = 30;

export function setCookie(
  name: string,
  value: string,
  maxAgeDays = DEFAULT_MAX_AGE_DAYS
) {
  if (typeof document === "undefined") return;

  const maxAge = maxAgeDays * 24 * 60 * 60;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );

  return match ? decodeURIComponent(match[1]) : null;
}

export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0`;
}
