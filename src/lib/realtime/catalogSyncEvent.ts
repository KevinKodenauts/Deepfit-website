export type CatalogSyncEvent = {
  event: string;
  entity: string;
  action: string;
  entityId: number | null;
  timestamp: string | null;
};

export function parseCatalogSyncEvent(
  json: Record<string, unknown>
): CatalogSyncEvent {
  const rawId = json.entity_id;
  let entityId: number | null = null;

  if (typeof rawId === "number") {
    entityId = rawId;
  } else if (rawId != null) {
    const parsed = Number.parseInt(String(rawId), 10);
    entityId = Number.isNaN(parsed) ? null : parsed;
  }

  return {
    event: json.event?.toString() ?? "",
    entity: json.entity?.toString() ?? "",
    action: json.action?.toString() ?? "",
    entityId,
    timestamp: json.timestamp?.toString() ?? null,
  };
}

export function isCatalogChanged(event: CatalogSyncEvent): boolean {
  return event.event === "catalog_changed";
}

export function affectsProduct(
  event: CatalogSyncEvent,
  productId: number
): boolean {
  return (
    event.entity === "product" &&
    (event.entityId == null || event.entityId === productId)
  );
}
