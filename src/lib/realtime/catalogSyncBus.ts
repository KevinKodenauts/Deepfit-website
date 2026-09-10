import type { CatalogSyncEvent } from "@/lib/realtime/catalogSyncEvent";

type CatalogSyncListener = (event: CatalogSyncEvent) => void;

class CatalogSyncBus {
  private listeners = new Set<CatalogSyncListener>();

  subscribe(listener: CatalogSyncListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(event: CatalogSyncEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}

export const catalogSyncBus = new CatalogSyncBus();
