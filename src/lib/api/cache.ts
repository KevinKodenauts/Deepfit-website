type CacheEntry<T> = {
  data: T;
  expires: number;
};

const store = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry || entry.expires <= Date.now()) {
    store.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCached<T>(key: string, data: T, ttlMs: number) {
  store.set(key, { data, expires: Date.now() + ttlMs });
}

export function invalidateCache(keyOrPrefix: string) {
  for (const key of store.keys()) {
    if (key === keyOrPrefix || key.startsWith(`${keyOrPrefix}:`)) {
      store.delete(key);
    }
  }
}

export function invalidateCaches(...keys: string[]) {
  for (const key of keys) {
    invalidateCache(key);
  }
}

export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number
): Promise<T> {
  const cached = getCached<T>(key);
  if (cached !== null) {
    return cached;
  }

  const data = await fetcher();
  setCached(key, data, ttlMs);
  return data;
}
