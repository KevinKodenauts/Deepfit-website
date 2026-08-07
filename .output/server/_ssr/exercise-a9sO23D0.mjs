import { a as EXERCISE_API, c as apiRequest } from "./auth-4WDLQ7fX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exercise-a9sO23D0.js
async function getExercises(equipmentIds) {
	const params = new URLSearchParams();
	if (equipmentIds && equipmentIds.length > 0) params.set("equipment_ids", equipmentIds.join(","));
	const query = params.toString();
	return (await apiRequest(`${EXERCISE_API}/exercises${query ? `?${query}` : ""}`)).data ?? [];
}
async function getExerciseById(exerciseId) {
	return (await apiRequest(`${EXERCISE_API}/exercises/${exerciseId}`)).data ?? null;
}
async function getEquipmentList() {
	return (await apiRequest(`${EXERCISE_API}/equipment/`)).data ?? [];
}
async function getEquipmentById(equipmentId) {
	return (await apiRequest(`${EXERCISE_API}/equipment/${equipmentId}`)).data ?? null;
}
//#endregion
export { getExercises as i, getEquipmentList as n, getExerciseById as r, getEquipmentById as t };
