import { NextResponse } from 'next/server';

export interface RateLimitConfig {
  /** Maximum number of requests allowed within the window */
  maxRequests?: number;
  /** Window duration in seconds */
  windowSeconds?: number;
  /** Maximum concurrent in-flight requests per client IP */
  maxConcurrentPerClient?: number;
  /** Maximum concurrent in-flight requests globally across all clients */
  maxConcurrentGlobal?: number;
}

interface ClientEntry {
  timestamps: number[];
  activeCount: number;
}

interface RateLimitStore {
  clients: Map<string, ClientEntry>;
  globalActive: Map<string, number>;
  lastCleanup: number;
}

// Store on globalThis so Next.js HMR in development preserves state
const globalKey = Symbol.for('__jev_rate_limit_store__');
const globalObject = globalThis as unknown as { [key: symbol]: RateLimitStore };

if (!globalObject[globalKey]) {
  globalObject[globalKey] = {
    clients: new Map(),
    globalActive: new Map(),
    lastCleanup: Date.now(),
  };
}

const store = globalObject[globalKey];

/**
 * Extracts client IP from incoming request headers
 */
export function getClientIp(request: Request): string {
  const headers = request.headers;

  const cfConnectingIp = headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xRealIp = headers.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();

  const xForwardedFor = headers.get('x-forwarded-for');
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }

  const xClientIp = headers.get('x-client-ip');
  if (xClientIp) return xClientIp.trim();

  return '127.0.0.1';
}

/**
 * Periodically purge stale entries from memory
 */
function cleanupStore(windowMs: number) {
  const now = Date.now();
  // Run cleanup at most once per 30 seconds
  if (now - store.lastCleanup < 30_000) return;
  store.lastCleanup = now;

  for (const [key, entry] of store.clients.entries()) {
    entry.timestamps = entry.timestamps.filter((ts) => now - ts < windowMs);
    if (entry.timestamps.length === 0 && entry.activeCount <= 0) {
      store.clients.delete(key);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  response?: NextResponse;
  headers: Record<string, string>;
  release: () => void;
}

/**
 * Evaluates rate limit and concurrent execution constraints for a given route
 */
export function checkRateLimit(
  request: Request,
  routeKey: 'jev' | 'llm',
  customConfig?: RateLimitConfig
): RateLimitResult {
  const maxRequests =
    customConfig?.maxRequests ??
    (process.env.RATE_LIMIT_MAX_REQUESTS
      ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10)
      : 5);

  const windowSeconds =
    customConfig?.windowSeconds ??
    (process.env.RATE_LIMIT_WINDOW_SECONDS
      ? parseInt(process.env.RATE_LIMIT_WINDOW_SECONDS, 10)
      : 60);

  const maxConcurrentPerClient =
    customConfig?.maxConcurrentPerClient ??
    (process.env.RATE_LIMIT_MAX_CONCURRENT
      ? parseInt(process.env.RATE_LIMIT_MAX_CONCURRENT, 10)
      : 1);

  const maxConcurrentGlobal =
    customConfig?.maxConcurrentGlobal ??
    (process.env.RATE_LIMIT_GLOBAL_MAX_CONCURRENT
      ? parseInt(process.env.RATE_LIMIT_GLOBAL_MAX_CONCURRENT, 10)
      : 5);

  const windowMs = windowSeconds * 1000;
  const now = Date.now();
  cleanupStore(windowMs);

  const clientIp = getClientIp(request);
  const clientKey = `${clientIp}:${routeKey}`;

  let clientEntry = store.clients.get(clientKey);
  if (!clientEntry) {
    clientEntry = { timestamps: [], activeCount: 0 };
    store.clients.set(clientKey, clientEntry);
  }

  // Filter out timestamps older than the sliding window
  clientEntry.timestamps = clientEntry.timestamps.filter((ts) => now - ts < windowMs);

  const currentGlobalActive = store.globalActive.get(routeKey) || 0;

  // 1. Check client concurrency limit
  if (clientEntry.activeCount >= maxConcurrentPerClient) {
    const errorMsg = `A ${routeKey.toUpperCase()} benchmark is already in progress for your IP. Please wait for it to complete.`;
    return {
      allowed: false,
      headers: {
        'Retry-After': '5',
        'X-RateLimit-Limit': String(maxRequests),
        'X-RateLimit-Remaining': '0',
      },
      response: NextResponse.json(
        {
          success: false,
          error: errorMsg,
          retryAfter: 5,
        },
        {
          status: 429,
          headers: {
            'Retry-After': '5',
            'X-RateLimit-Limit': String(maxRequests),
            'X-RateLimit-Remaining': '0',
          },
        }
      ),
      release: () => {},
    };
  }

  // 2. Check global concurrency limit
  if (currentGlobalActive >= maxConcurrentGlobal) {
    const errorMsg = 'Server is currently at maximum concurrent benchmark capacity. Please try again shortly.';
    return {
      allowed: false,
      headers: {
        'Retry-After': '5',
        'X-RateLimit-Limit': String(maxRequests),
        'X-RateLimit-Remaining': '0',
      },
      response: NextResponse.json(
        {
          success: false,
          error: errorMsg,
          retryAfter: 5,
        },
        {
          status: 429,
          headers: {
            'Retry-After': '5',
            'X-RateLimit-Limit': String(maxRequests),
            'X-RateLimit-Remaining': '0',
          },
        }
      ),
      release: () => {},
    };
  }

  // 3. Check sliding window request count
  if (clientEntry.timestamps.length >= maxRequests) {
    const oldestTimestamp = clientEntry.timestamps[0];
    const retryAfter = Math.max(
      1,
      Math.ceil((oldestTimestamp + windowMs - now) / 1000)
    );
    const resetTimestamp = Math.ceil((oldestTimestamp + windowMs) / 1000);

    const errorMsg = `Rate limit exceeded. Maximum ${maxRequests} requests per ${windowSeconds}s allowed. Please try again in ${retryAfter}s.`;

    const rateLimitHeaders: Record<string, string> = {
      'Retry-After': String(retryAfter),
      'X-RateLimit-Limit': String(maxRequests),
      'X-RateLimit-Remaining': '0',
      'X-RateLimit-Reset': String(resetTimestamp),
    };

    return {
      allowed: false,
      headers: rateLimitHeaders,
      response: NextResponse.json(
        {
          success: false,
          error: errorMsg,
          retryAfter,
        },
        {
          status: 429,
          headers: rateLimitHeaders,
        }
      ),
      release: () => {},
    };
  }

  // Request is permitted: record timestamp and increment active counts
  clientEntry.timestamps.push(now);
  clientEntry.activeCount += 1;
  store.globalActive.set(routeKey, currentGlobalActive + 1);

  const remaining = Math.max(0, maxRequests - clientEntry.timestamps.length);
  const resetTimestamp = Math.ceil((clientEntry.timestamps[0] + windowMs) / 1000);

  const rateLimitHeaders: Record<string, string> = {
    'X-RateLimit-Limit': String(maxRequests),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset': String(resetTimestamp),
  };

  let released = false;
  const release = () => {
    if (released) return;
    released = true;

    if (clientEntry) {
      clientEntry.activeCount = Math.max(0, clientEntry.activeCount - 1);
    }
    const currentGlobal = store.globalActive.get(routeKey) || 0;
    store.globalActive.set(routeKey, Math.max(0, currentGlobal - 1));
  };

  return {
    allowed: true,
    headers: rateLimitHeaders,
    release,
  };
}
