"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CONFIGS, SITE, waLink } from "./site";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid"];

function readUtm() {
  const out = {};
  try {
    const q = new URLSearchParams(window.location.search);
    let saved = {};
    try {
      saved = JSON.parse(sessionStorage.getItem("hh_utm") || "{}");
    } catch {}
    for (const k of UTM_KEYS) out[k] = q.get(k) || saved[k] || "";
    try {
      sessionStorage.setItem("hh_utm", JSON.stringify(out));
    } catch {}
  } catch {}
  return out;
}

function check(f) {
  const e = {};
  if (!/^[\p{L} .'-]{2,60}$/u.test(f.name.trim())) e.name = "Please enter your full name.";
  const d = f.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "").replace(/^0/, "");
  if (!/^[6-9]\d{9}$/.test(d)) e.phone = "Please enter a valid 10-digit mobile number.";
  return e;
}

/**
 * Site-visit form. `variant="hero"` is the compact card in the first screen,
 * `variant="full"` is the bigger form near the end of the page.
 */
export default function EnquiryForm({ variant = "full", title, sub }) {
  const id = useId();
  const utm = useRef({});
  const [f, setF] = useState({ name: "", phone: "", config: "", visit: "This weekend", company: "" });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | done
  const [wa, setWa] = useState("");

  useEffect(() => {
    utm.current = readUtm();
  }, []);

  const set = (k) => (ev) => {
    setF((p) => ({ ...p, [k]: ev.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function submit(ev) {
    ev.preventDefault();
    const e = check(f);
    setErrors(e);
    if (Object.keys(e).length) {
      ev.currentTarget.querySelector(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    setState("sending");
    const msg = `Hi, I am ${f.name.trim()} (${f.phone.trim()}). I am interested in Hero Homes Greater Noida${
      f.config ? ` – ${f.config}` : ""
    }. Site visit: ${f.visit}. Please send the brochure and price list.`;
    const link = waLink(msg);
    let sent = false;
    try {
      const r = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, ...utm.current, page: window.location.href }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.status === 422 && j.errors) {
        setErrors(j.errors);
        setState("idle");
        return;
      }
      sent = !!j.sent;
    } catch {}
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "generate_lead", form: variant, config: f.config || "any" });
    } catch {}
    setWa(sent ? "" : link);
    setState("done");
  }

  if (state === "done") {
    return (
      <div className={`ef ef-${variant} ef-done`} role="status" aria-live="polite">
        <div className="ef-tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="30" height="30"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <p className="ef-title">Thank you, {f.name.trim().split(" ")[0]}!</p>
        {wa ? (
          <>
            <p className="ef-sub">Tap below to get the brochure and price list on WhatsApp right now.</p>
            <a className="btn btn-wa" href={wa} target="_blank" rel="noopener">
              Get brochure on WhatsApp
            </a>
          </>
        ) : (
          <p className="ef-sub">Our property advisor will call you shortly on {f.phone.trim()} with the price list and site-visit slots.</p>
        )}
        <a className="ef-call" href={`tel:${SITE.phoneE164}`}>
          Or call {SITE.phoneDisplay}
        </a>
      </div>
    );
  }

  const btn = (
    <button className="btn btn-red ef-btn" type="submit" disabled={state === "sending"}>
      {state === "sending" ? "Sending…" : variant === "full" ? "Book my free site visit" : "Get price list"}
    </button>
  );

  return (
    <form className={`ef ef-${variant}`} onSubmit={submit} noValidate aria-labelledby={`${id}-t`}>
      <p className="ef-title" id={`${id}-t`}>
        {title}
      </p>
      {sub && <p className="ef-sub">{sub}</p>}
      <div className="ef-hp" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" value={f.company} onChange={set("company")} />
        </label>
      </div>
      <div className="ef-grid">
        <div className="ef-field">
          <label htmlFor={`${id}-n`}>Full name</label>
          <input id={`${id}-n`} name="name" autoComplete="name" placeholder="Your name" value={f.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-ne` : undefined} required />
          {errors.name && <span className="ef-err" id={`${id}-ne`}>{errors.name}</span>}
        </div>
        <div className="ef-field">
          <label htmlFor={`${id}-p`}>Mobile number</label>
          <div className="ef-phone">
            <span aria-hidden="true">+91</span>
            <input id={`${id}-p`} name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="10-digit mobile" maxLength={14} value={f.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-pe` : undefined} required />
          </div>
          {errors.phone && <span className="ef-err" id={`${id}-pe`}>{errors.phone}</span>}
        </div>
        <div className="ef-field">
          <label htmlFor={`${id}-c`}>Interested in</label>
          <select id={`${id}-c`} name="config" value={f.config} onChange={set("config")}>
            <option value="">Any 3 BHK</option>
            {CONFIGS.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name} · {c.super.toLocaleString("en-IN")} sq ft
              </option>
            ))}
          </select>
        </div>
        {variant === "full" && (
          <div className="ef-field">
            <label htmlFor={`${id}-v`}>Site visit</label>
            <select id={`${id}-v`} name="visit" value={f.visit} onChange={set("visit")}>
              <option>This weekend</option>
              <option>On a weekday</option>
              <option>Video call first</option>
              <option>Just send the brochure</option>
            </select>
          </div>
        )}
        {variant === "bar" && btn}
      </div>
      {variant !== "bar" && btn}
      <p className="ef-note">
        By submitting, you agree to be contacted by call, SMS or WhatsApp. <a href={SITE.privacy} target="_blank" rel="noopener">Privacy policy</a>
      </p>
    </form>
  );
}
