import Pusher from "pusher";

let cached: Pusher | null = null;

/**
 * Lazily construct the server-side Pusher client.
 *
 * Initialisation is deferred until first use (rather than at module import)
 * and the required environment variables are validated explicitly. This keeps
 * a missing/misconfigured secret from throwing while route modules are being
 * evaluated, so the failure surfaces as a handled error inside the request
 * instead of crashing the route.
 */
export function getPusherServer(): Pusher {
  if (cached) return cached;

  const appId = process.env.PUSHER_APP_ID;
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const secret = process.env.PUSHER_SECRET;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

  if (!appId || !key || !secret || !cluster) {
    throw new Error("Pusher is not configured: missing required environment variables");
  }

  cached = new Pusher({ appId, key, secret, cluster, useTLS: true });
  return cached;
}
