//#region node_modules/.nitro/vite/services/ssr/assets/selection-BcMgILWp.js
var STORAGE_KEY = "deepfit_selected_equipment";
function saveSelectedEquipment(ids) {
	if (typeof window === "undefined") return;
	sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}
function getSelectedEquipment() {
	if (typeof window === "undefined") return [];
	try {
		const raw = sessionStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.map((id) => Number(id)).filter((id) => !Number.isNaN(id)) : [];
	} catch {
		return [];
	}
}
function parseEquipmentIds(value) {
	if (!value) return [];
	return (Array.isArray(value) ? value.join(",") : value).split(",").map((id) => Number(id.trim())).filter((id) => !Number.isNaN(id) && id > 0);
}
//#endregion
export { parseEquipmentIds as n, saveSelectedEquipment as r, getSelectedEquipment as t };
