function addOrigin(origins: Set<string>, candidate: string | null | undefined) {
  if (!candidate) return;
  try {
    origins.add(new URL(candidate).origin);
  } catch {
    // Invalid optional configuration must not crash the contact route.
  }
}

export function isAllowedRequestOrigin(request: Request, configuredUrl = process.env.NEXT_PUBLIC_SITE_URL) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const requestUrl = new URL(request.url);
  const allowedOrigins = new Set<string>([requestUrl.origin]);
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host");
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProtocol || requestUrl.protocol.slice(0, -1);

  if (host && (protocol === "http" || protocol === "https")) {
    addOrigin(allowedOrigins, `${protocol}://${host}`);
  }
  addOrigin(allowedOrigins, configuredUrl);

  return allowedOrigins.has(origin);
}
