import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/contact";
import { sendContactLead } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIp(request: Request) {
  return (
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "local"
  );
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const requestOrigin = new URL(request.url).origin;
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const allowedOrigins = new Set([requestOrigin]);
  if (configuredUrl) allowedOrigins.add(new URL(configuredUrl).origin);
  return allowedOrigins.has(origin);
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ message: "Origine de la demande refusée." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 25_000) {
    return NextResponse.json({ message: "La demande est trop volumineuse." }, { status: 413 });
  }

  const limit = checkRateLimit(getClientIp(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { message: "Trop de demandes ont été envoyées. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Le formulaire transmis est invalide." }, { status: 400 });
  }

  const result = validateContactPayload(body);
  if (!result.valid) {
    return NextResponse.json(
      { message: "Certains champs nécessitent votre attention.", errors: result.errors },
      { status: 422 },
    );
  }

  // Honeypot: return a neutral success response without sending anything.
  if (result.data.website) {
    return NextResponse.json({ message: "Votre demande a bien été reçue." });
  }

  // A real visitor cannot complete this form in under three seconds.
  if (!result.data.startedAt || Date.now() - result.data.startedAt < 3_000) {
    return NextResponse.json({ message: "La demande a été envoyée trop rapidement." }, { status: 400 });
  }

  try {
    const delivery = await sendContactLead(result.data);
    return NextResponse.json({ message: "Votre demande a bien été envoyée.", id: delivery.id });
  } catch (error) {
    console.error("[KORIX contact] delivery failed", error);
    return NextResponse.json(
      { message: "L’envoi n’a pas abouti. Réessayez dans quelques instants." },
      { status: 503 },
    );
  }
}
