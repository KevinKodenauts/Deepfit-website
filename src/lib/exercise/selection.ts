const STORAGE_KEY = "deepfit_selected_equipment";

export function saveSelectedEquipment(ids: number[]) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function getSelectedEquipment(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((id) => Number(id)).filter((id) => !Number.isNaN(id))
      : [];
  } catch {
    return [];
  }
}

export function parseEquipmentIds(
  value?: string | string[] | number | null,
): number[] {
  if (value == null || value === "") return [];
  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0 ? [value] : [];
  }
  const raw = Array.isArray(value) ? value.join(",") : String(value);
  return raw
    .split(",")
    .map((id) => Number(id.trim().replace(/^["']|["']$/g, "")))
    .filter((id) => !Number.isNaN(id) && id > 0);
}
