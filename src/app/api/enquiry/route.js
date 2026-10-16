/**
 * POST /api/enquiry — receives the site-visit form and emails it.
 *
 * Configure with environment variables (Vercel → Project → Settings → Environment Variables,
 * or a local .env.local file). Nothing secret lives in the code, so the project can move to
 * any host that runs Next.js.
 *
 *   LEAD_TO_EMAIL     where leads go (comma-separate for several addresses)   ← required
 *   LEAD_FROM_EMAIL   sender address, e.g. "Hero Homes <leads@yourdomain.com>"
 *
 *   Option A – Resend (simplest):  RESEND_API_KEY
 *   Option B – any SMTP mailbox:   SMTP_HOST, SMTP_PORT (465 or 587), SMTP_USER, SMTP_PASS
 *                                  (Gmail / Google Workspace: smtp.gmail.com, 465, an App Password)
 *
 * Until LEAD_TO_EMAIL is set, the form still works: the visitor is handed to WhatsApp with
 * their details and the lead is written to the server log.
 */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid"];
const hits = new Map();

const clean = (v, max = 200) => String(v ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function sameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
    return new URL(origin).host === host || /^http:\/\/localhost(:\d+)?$/.test(origin);
  } catch {
    return false;
  }
}

function tooMany(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 5;
}

async function sendMail({ to, from, subject, text, html, replyTo }) {
  if (process.env.RESEND_API_KEY) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text, html, reply_to: replyTo }),
    });
    if (!r.ok) throw new Error(`Resend ${r.status}: ${(await r.text()).slice(0, 200)}`);
    return;
  }
  if (process.env.SMTP_HOST) {
    const nodemailer = (await import("nodemailer")).default;
    const port = Number(process.env.SMTP_PORT || 465);
    const t = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await t.sendMail({ from, to, subject, text, html, replyTo });
    return;
  }
  throw new Error("No mail transport configured (set RESEND_API_KEY or SMTP_HOST)");
}

export async function POST(request) {
  if (!sameOrigin(request)) return json({ ok: false, error: "origin" }, 403);

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Honeypot: real people never fill this hidden field.
  if (clean(data.company)) return json({ ok: true, sent: true });

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (tooMany(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  const name = clean(data.name, 60);
  const phone = clean(data.phone, 20).replace(/[^\d+]/g, "");
  const digits = phone.replace(/^\+?91/, "").replace(/^0/, "");
  const email = clean(data.email, 120);
  const config = clean(data.config, 60) || "Not specified";
  const visit = clean(data.visit, 40) || "Not specified";
  const page = clean(data.page, 300);

  const errors = {};
  if (!/^[\p{L} .'-]{2,60}$/u.test(name)) errors.name = "Please enter your full name.";
  if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = "Please enter a valid 10-digit mobile number.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Please check your email.";
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  const utm = {};
  for (const k of UTM_KEYS) {
    const v = clean(data[k], 150);
    if (v) utm[k] = v;
  }

  const rows = [
    ["Name", name],
    ["Mobile", `+91 ${digits}`],
    ["Email", email || "—"],
    ["Interested in", config],
    ["Site visit", visit],
    ...Object.entries(utm),
    ["Page", page || "—"],
    ["Received", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"],
  ];

  const to = (process.env.LEAD_TO_EMAIL || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!to.length) {
    console.log("[enquiry] email not configured — lead:", JSON.stringify(Object.fromEntries(rows)));
    return json({ ok: true, sent: false });
  }

  const subject = `New Hero Homes enquiry: ${name} (+91 ${digits}) · ${config}`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2 style="font-family:Arial,sans-serif;color:#0C192B">New site visit enquiry — Hero Homes Greater Noida</h2>
<table cellpadding="8" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="background:#f6f2ea;font-weight:bold;border:1px solid #e5dccb">${esc(k)}</td><td style="border:1px solid #e5dccb">${esc(String(v))}</td></tr>`)
    .join("")}</table>
<p style="font-family:Arial,sans-serif"><a href="tel:+91${digits}">Call</a> · <a href="https://wa.me/91${digits}">WhatsApp</a></p>`;

  try {
    await sendMail({
      to,
      from: process.env.LEAD_FROM_EMAIL || "Hero Homes Leads <onboarding@resend.dev>",
      subject,
      text,
      html,
      replyTo: email || undefined,
    });
    console.log("[enquiry] emailed", { config, ...utm });
    return json({ ok: true, sent: true });
  } catch (e) {
    console.error("[enquiry] send failed:", e.message, "— lead:", JSON.stringify(Object.fromEntries(rows)));
    return json({ ok: true, sent: false });
  }
}
