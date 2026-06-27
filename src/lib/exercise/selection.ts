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

export function parseEquipmentIds(value?: string | string[] | null): number[] {
  if (!value) return [];
  const raw = Array.isArray(value) ? value.join(",") : value;
  return raw
    .split(",")
    .map((id) => Number(id.trim()))
    .filter((id) => !Number.isNaN(id) && id > 0);
}
