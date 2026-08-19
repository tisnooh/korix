"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import {
  budgetRanges,
  desiredTimelines,
  projectTypes,
  type ContactErrors,
  type ContactPayload,
  validateContactPayload,
} from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error";

class SubmissionError extends Error {}

const contactRecipient = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "korixagency@gmail.com";
const formSubmitEndpoint = `https://formsubmit.co/ajax/${encodeURIComponent(contactRecipient)}`;

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status !== "success") return;
    successRef.current?.focus({ preventScroll: true });
    successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status]);

  const focusFirstError = (fieldErrors: ContactErrors) => {
    const first = Object.keys(fieldErrors)[0];
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    const formElement = event.currentTarget;
    setMessage("");
    const form = new FormData(formElement);
    const payload: ContactPayload = {
      name: String(form.get("name") || ""),
      company: String(form.get("company") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      projectType: String(form.get("projectType") || ""),
      budget: String(form.get("budget") || ""),
      timeline: String(form.get("timeline") || ""),
      description: String(form.get("description") || ""),
      consent: form.get("consent") === "on",
      website: String(form.get("website") || ""),
      startedAt,
    };

    const validation = validateContactPayload(payload);
    if (!validation.valid) {
      setErrors(validation.errors);
      setStatus("error");
      setMessage("Vérifiez les champs signalés avant l’envoi.");
      focusFirstError(validation.errors);
      return;
    }

    setErrors({});
    submittingRef.current = true;
    setStatus("sending");
    try {
      const formSubmitPayload = new URLSearchParams({
        name: validation.data.name,
        company: validation.data.company,
        email: validation.data.email,
        phone: validation.data.phone || "Non renseigné",
        projectType: validation.data.projectType,
        budget: validation.data.budget,
        timeline: validation.data.timeline,
        description: validation.data.description,
        _subject: `Nouvelle demande KORIX — ${validation.data.projectType}`,
        _template: "table",
        _captcha: "false",
        _honey: validation.data.website,
      });
      const response = await fetch(formSubmitEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formSubmitPayload,
        signal: AbortSignal.timeout(15_000),
      });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        success?: boolean | string;
      };

      if (!response.ok || result.success === false || result.success === "false") {
        throw new SubmissionError(result.message || "L’envoi n’a pas abouti. Réessayez dans quelques instants.");
      }

      formElement.reset();
      setStatus("success");
      setMessage("Votre demande est arrivée chez KORIX. Nous reviendrons vers vous avec une réponse personnalisée.");
      window.dispatchEvent(new CustomEvent("korix:conversion", { detail: { event: "contact_form_sent" } }));
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof SubmissionError
          ? error.message
          : "Une erreur empêche momentanément l’envoi. Vérifiez votre connexion puis réessayez.",
      );
    } finally {
      submittingRef.current = false;
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="form-success" role="status" tabIndex={-1} data-testid="contact-success">
        <CheckCircle2 aria-hidden="true" />
        <p className="eyebrow"><span /> Demande envoyée</p>
        <h3>Merci pour votre confiance.</h3>
        <p>{message}</p>
        <button
          className="button button--ghost"
          type="button"
          onClick={() => {
            setStatus("idle");
            setStartedAt(Date.now());
            setMessage("");
          }}
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  const errorFor = (field: keyof ContactErrors) =>
    errors[field] ? <span className="field-error" id={`${field}-error`}>{errors[field]}</span> : null;

  return (
    <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate data-testid="contact-form" aria-busy={status === "sending"}>
      <div className="form-grid">
        <label>
          <span>Nom</span>
          <input name="name" autoComplete="name" minLength={2} maxLength={80} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {errorFor("name")}
        </label>
        <label>
          <span>Entreprise ou activité</span>
          <input name="company" autoComplete="organization" minLength={2} maxLength={120} required aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} />
          {errorFor("company")}
        </label>
        <label>
          <span>E-mail</span>
          <input name="email" type="email" inputMode="email" autoComplete="email" maxLength={160} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {errorFor("email")}
        </label>
        <label>
          <span>Téléphone <small>(facultatif)</small></span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {errorFor("phone")}
        </label>
        <label>
          <span>Type de projet</span>
          <select name="projectType" defaultValue="" required aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "projectType-error" : undefined}>
            <option value="" disabled>Choisir un projet</option>
            {projectTypes.map((option) => <option key={option}>{option}</option>)}
          </select>
          {errorFor("projectType")}
        </label>
        <label>
          <span>Budget envisagé</span>
          <select name="budget" defaultValue="" required aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? "budget-error" : undefined}>
            <option value="" disabled>Choisir une fourchette</option>
            {budgetRanges.map((option) => <option key={option}>{option}</option>)}
          </select>
          {errorFor("budget")}
        </label>
        <label className="form-field-wide">
          <span>Délai souhaité</span>
          <select name="timeline" defaultValue="" required aria-invalid={Boolean(errors.timeline)} aria-describedby={errors.timeline ? "timeline-error" : undefined}>
            <option value="" disabled>Choisir un délai</option>
            {desiredTimelines.map((option) => <option key={option}>{option}</option>)}
          </select>
          {errorFor("timeline")}
        </label>
        <label className="form-field-wide">
          <span>Votre projet</span>
          <textarea
            name="description"
            rows={5}
            minLength={30}
            maxLength={2000}
            placeholder="Votre activité, vos objectifs et les principaux besoins du futur site…"
            required
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? "description-error" : "description-help"}
          />
          <small className="field-help" id="description-help">30 caractères minimum.</small>
          {errorFor("description")}
        </label>
      </div>

      <label className="honeypot" aria-hidden="true">
        Ne pas remplir ce champ
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="consent-field">
        <input name="consent" type="checkbox" required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} />
        <span>
          J’accepte que KORIX utilise ces informations uniquement pour répondre à ma demande, conformément à la{" "}
          <Link href="/politique-confidentialite">politique de confidentialité</Link>.
        </span>
      </label>
      {errorFor("consent")}

      {message ? <p className={`form-message form-message--${status}`} role="alert">{message}</p> : null}
      <button className="button button--primary form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? <><LoaderCircle className="spinner" aria-hidden="true" /> Envoi en cours…</> : <>Envoyer ma demande <ArrowRight aria-hidden="true" size={18} /></>}
      </button>
      <p className="form-note">Aucune inscription automatique à une newsletter. Vos informations ne sont pas revendues.</p>
    </form>
  );
}
