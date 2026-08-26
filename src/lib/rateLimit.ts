interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

/**
 * In-memory rate limiting middleware
 * @param ipOrIdentifier Unique identifier (IP address, user ID, or email)
 * @param limit Maximum number of requests allowed in window
 * @param windowMs Time window in milliseconds (default: 1 minute)
 */
export function checkRateLimit(
  ipOrIdentifier: string,
  limit: number = 30,
  windowMs: number = 60 * 1000
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = memoryStore.get(ipOrIdentifier);

  if (!record || now > record.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + windowMs,
    };
    memoryStore.set(ipOrIdentifier, newRecord);
    return { success: true, remaining: limit - 1, resetTime: newRecord.resetTime };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count, resetTime: record.resetTime };
}
