import { EXERCISE_API } from "./config";
import { apiRequest, ApiError } from "./client";
import type { EquipmentItem, ExerciseItem } from "./types";
import { matchEquipmentForProduct } from "@/lib/exercise/productEquipmentMatcher";

type ExerciseListResponse = {
  status: boolean;
  data: ExerciseItem[];
};

type EquipmentListResponse = {
  status: boolean;
  data: EquipmentItem[];
};

export async function getExercises(
  equipmentIds?: number[]
): Promise<ExerciseItem[]> {
  const params = new URLSearchParams();
  if (equipmentIds && equipmentIds.length > 0) {
    params.set("equipment_ids", equipmentIds.join(","));
  }
  const query = params.toString();
  const data = await apiRequest<ExerciseListResponse>(
    `${EXERCISE_API}/exercises${query ? `?${query}` : ""}`
  );
  return data.data ?? [];
}

export async function getExerciseById(
  exerciseId: number
): Promise<ExerciseItem | null> {
  const data = await apiRequest<{
    status: boolean;
    data: ExerciseItem;
  }>(`${EXERCISE_API}/exercises/${exerciseId}`);
  return data.data ?? null;
}

export async function getEquipmentList(): Promise<EquipmentItem[]> {
  const data = await apiRequest<EquipmentListResponse>(
    `${EXERCISE_API}/equipment`
  );
  return data.data ?? [];
}

export async function getEquipmentById(
  equipmentId: number
): Promise<EquipmentItem | null> {
  const data = await apiRequest<{
    status: boolean;
    data: EquipmentItem;
  }>(`${EXERCISE_API}/equipment/${equipmentId}`);
  return data.data ?? null;
}

type EquipmentByProductResponse = {
  status: boolean;
  data: EquipmentItem[];
};

async function fetchEquipmentForProductFromApi(
  productId: number,
): Promise<EquipmentItem[]> {
  try {
    const data = await apiRequest<EquipmentByProductResponse>(
      `${EXERCISE_API}/equipment/by-product/${productId}/`,
    );
    return data.data ?? [];
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export async function getEquipmentForProduct({
  productId,
  productName,
  productSku,
}: {
  productId: number;
  productName?: string;
  productSku?: string;
}): Promise<EquipmentItem[]> {
  let fromApi: EquipmentItem[] = [];
  try {
    fromApi = await fetchEquipmentForProductFromApi(productId);
  } catch {
    fromApi = [];
  }

  if (fromApi.length > 0) return fromApi;

  const allEquipment = await getEquipmentList();
  return matchEquipmentForProduct({
    equipment: allEquipment,
    productName,
    productSku,
  });
}
