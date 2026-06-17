const memoryCache = new Map();

export function setCache(key, value, ttlSeconds = 60) {
  const expiresAt = Date.now() + ttlSeconds * 1000;

  memoryCache.set(key, {
    value,
    expiresAt,
  });
}

export function getCache(key) {
  const item = memoryCache.get(key);

  if (!item) return null;

  if (Date.now() > item.expiresAt) {
    memoryCache.delete(key);
    return null;
  }

  return item.value;
}

export function clearCache(key) {
  if (key) {
    memoryCache.delete(key);
    return;
  }

  memoryCache.clear();
}