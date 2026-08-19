import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/contact";
import { sendContactLead } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { isAllowedRequestOrigin } from "@/lib/request-origin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(body: unknown, status = 200, headers?: Record<string, string>) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "local"
  );
}

export async function POST(request: Request) {
  if (process.env.CONTACT_API_ENABLED !== "true") {
    return json({ message: "Ressource introuvable." }, 404);
  }

  if (!isAllowedRequestOrigin(request)) {
    return json({ message: "Origine de la demande refusée." }, 403);
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ message: "Format de requête non pris en charge." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 25_000) {
    return json({ message: "La demande est trop volumineuse." }, 413);
  }

  const limit = checkRateLimit(getClientIp(request));
  if (!limit.allowed) {
    return json(
      { message: "Trop de demandes ont été envoyées. Réessayez dans quelques minutes." },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 25_000) {
      return json({ message: "La demande est trop volumineuse." }, 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return json({ message: "Le formulaire transmis est invalide." }, 400);
  }

  const result = validateContactPayload(body);
  if (!result.valid) {
    return json({ message: "Certains champs nécessitent votre attention.", errors: result.errors }, 422);
  }

  // Honeypot: return a neutral success response without sending anything.
  if (result.data.website) {
    return json({ message: "Votre demande a bien été reçue." });
  }

  // A real visitor cannot complete this form in under three seconds.
  if (!result.data.startedAt || Date.now() - result.data.startedAt < 3_000) {
    return json({ message: "La demande a été envoyée trop rapidement." }, 400);
  }

  try {
    const delivery = await sendContactLead(result.data);
    return json({ message: "Votre demande a bien été envoyée.", id: delivery.id });
  } catch (error) {
    console.error("[KORIX contact] delivery failed", error);
    return json({ message: "L’envoi n’a pas abouti. Réessayez dans quelques instants." }, 503);
  }
}
