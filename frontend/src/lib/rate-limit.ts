type Entry = { count: number; resetAt: number };

const globalStore = globalThis as typeof globalThis & {
  korixContactRateLimit?: Map<string, Entry>;
};

const store = globalStore.korixContactRateLimit || new Map<string, Entry>();
globalStore.korixContactRateLimit = store;

export function checkRateLimit(key: string, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, retryAfter: 0 };
}
