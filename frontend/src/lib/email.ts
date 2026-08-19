import { createHash } from "node:crypto";
import type { ContactPayload } from "@/lib/contact";
import { siteConfig } from "@/lib/site-config";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

let resendClientPromise: Promise<import("resend").Resend> | null = null;

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  resendClientPromise ??= import("resend").then(({ Resend }) => new Resend(apiKey));
  return resendClientPromise;
}

export async function sendContactLead(data: ContactPayload) {
  const mode = process.env.CONTACT_DELIVERY_MODE || "resend";
  if (mode === "console" && process.env.NODE_ENV !== "production") {
    console.info("[KORIX contact test]", {
      name: data.name,
      email: data.email,
      projectType: data.projectType,
    });
    return { id: `console-${Date.now()}` };
  }

  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) throw new Error("Contact destination email is not configured");

  const safe = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, escapeHtml(String(value))]),
  ) as Record<keyof ContactPayload, string>;

  const subject = `Nouvelle demande KORIX — ${data.projectType}`;
  const text = [
    `Nom : ${data.name}`,
    `Entreprise : ${data.company}`,
    `E-mail : ${data.email}`,
    `Téléphone : ${data.phone || "Non renseigné"}`,
    `Projet : ${data.projectType}`,
    `Budget : ${data.budget}`,
    `Délai : ${data.timeline}`,
    "",
    data.description,
  ].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#111827">
      <h1 style="font-size:24px">Nouvelle demande de projet KORIX</h1>
      <table style="border-collapse:collapse;width:100%">
        <tbody>
          <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb"><strong>Nom</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${safe.name}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb"><strong>Entreprise</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${safe.company}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb"><strong>E-mail</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${safe.email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb"><strong>Téléphone</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${safe.phone || "Non renseigné"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb"><strong>Projet</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${safe.projectType}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb"><strong>Budget</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${safe.budget}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e5e7eb"><strong>Délai</strong></td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${safe.timeline}</td></tr>
        </tbody>
      </table>
      <h2 style="font-size:18px;margin-top:24px">Description</h2>
      <p style="white-space:pre-wrap;line-height:1.6">${safe.description}</p>
    </div>`;

  if (mode === "formsubmit") {
    const siteOrigin = new URL(siteConfig.url).origin;
    const form = new URLSearchParams({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone || "Non renseigné",
      projectType: data.projectType,
      budget: data.budget,
      timeline: data.timeline,
      description: data.description,
      _subject: subject,
      _template: "table",
      _captcha: "false",
    });
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: siteOrigin,
        Referer: `${siteOrigin}/contact`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
      },
      body: form,
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });
    const result = (await response.json().catch(() => null)) as
      | { success?: boolean | string; message?: string }
      | null;
    if (!response.ok || result?.success === false || result?.success === "false") {
      throw new Error(result?.message || `FormSubmit delivery failed with status ${response.status}`);
    }
    return {
      id: `formsubmit-${createHash("sha256").update(`${data.email}:${data.startedAt}`).digest("hex").slice(0, 16)}`,
    };
  }

  if (mode !== "resend") throw new Error(`Unsupported contact delivery mode: ${mode}`);

  const from = process.env.CONTACT_FROM_EMAIL;
  if (!from) throw new Error("Resend sender email is not configured");
  const client = await getResendClient();

  const { data: result, error } = await client.emails.send(
    {
      from,
      to,
      replyTo: data.email,
      subject,
      text,
      html,
    },
    {
      headers: {
        "Idempotency-Key": createHash("sha256")
          .update(`${data.email}:${data.startedAt}`)
          .digest("hex"),
      },
    },
  );

  if (error) throw new Error(error.message);
  return { id: result?.id || "sent" };
}
