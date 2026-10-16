import Image from "next/image";
import EnquiryForm from "./EnquiryForm";
import { AMENITIES, CONFIGS, FAQS, GALLERY, INCLUDED, PLACES, SITE, STATS, WA_DEFAULT } from "./site";

/* ---------- small icon set (inline SVG, no icon library) ---------- */
const P = {
  phone: "M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z",
  wa: "M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.15l-.3-.18-3 .78.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.25-.12-1.47-.72-1.7-.8s-.39-.12-.56.12-.64.8-.78.97-.29.18-.54.06a6.7 6.7 0 01-3.33-2.9c-.25-.43.25-.4.72-1.34a.45.45 0 000-.43c-.06-.12-.56-1.34-.76-1.84s-.4-.42-.56-.43h-.48a.92.92 0 00-.66.31 2.8 2.8 0 00-.87 2.07 4.86 4.86 0 001 2.58 11.1 11.1 0 004.27 3.77c1.58.68 2.2.74 3 .62a2.55 2.55 0 001.68-1.18 2.07 2.07 0 00.14-1.18c-.06-.1-.23-.16-.48-.28z",
  pin: "M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z",
  check: "M5 12.5l4.5 4.5L19 7.5",
  club: "M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6",
  pool: "M2 18c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M8 15V5a2 2 0 014 0M16 15V5a2 2 0 00-4 0M8 9h8",
  gym: "M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
  leaf: "M5 19c0-8 6-14 15-14 0 9-6 15-14 15M5 19l7-7",
  laptop: "M4 6h16v10H4zM2 19h20",
  kids: "M12 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 9v6M8 21l4-6 4 6M7 11h10",
  ev: "M7 3h7v18H7zM14 8h3l2 3v6a1.5 1.5 0 01-3 0v-3h-2M10 8l-1.5 3h3L10 14",
  arrow: "M5 12h14M13 6l6 6-6 6",
};
function Icon({ n, size = 22, fill = false }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path d={P[n]} fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const fmt = (n) => n.toLocaleString("en-IN");

/* ---------- 3D pieces (pure CSS, no WebGL, no JS) ---------- */
function Box({ cls = "", style }) {
  return (
    <div className={`box ${cls}`} style={style}>
      <i className="f-t" />
      <i className="f-f" />
      <i className="f-r" />
      <i className="f-b" />
      <i className="f-l" />
    </div>
  );
}

function Towers() {
  return (
    <div className="tw-scene" role="img" aria-label="Indicative 3D massing of the three G+31 towers around central greens">
      <div className="tw-city">
        <div className="tw-plate">
          <i className="tw-lawn" />
          <i className="tw-pool" />
          <i className="tw-path" />
        </div>
        <Box cls="tw tw-a" />
        <Box cls="tw tw-b" />
        <Box cls="tw tw-c" />
        <Box cls="tw-club" />
        {[18, 34, 62, 78, 50].map((x, i) => (
          <i key={i} className="tw-tree" style={{ "--x": `${x}%`, "--y": `${[70, 40, 74, 46, 86][i]}%` }} />
        ))}
      </div>
      <span className="tw-tag tw-tag-a">3 towers · G+31</span>
      <span className="tw-tag tw-tag-g">80% greens</span>
    </div>
  );
}

function Plan3D({ c }) {
  return (
    <div className="pl-scene" role="img" aria-label={`Indicative 3D layout of ${c.name}`}>
      <div className="pl-plate">
        {c.plan.map((r) => (
          <div key={r.n} className={`pl-room pl-${r.c}`} style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}>
            <i className="w w-f" />
            <i className="w w-r" />
            <i className="w w-b" />
            <i className="w w-l" />
            <span>{r.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Orbit() {
  const max = 35;
  return (
    <div className="orb-scene" role="img" aria-label="Drive times from Hero Homes to nearby landmarks">
      <div className="orb-disc">
        {[5, 12, 20, 35].map((m) => (
          <i key={m} className="orb-ring" style={{ "--r": Math.sqrt(m / max).toFixed(3) }}>
            <b>{m} min</b>
          </i>
        ))}
        {PLACES.map((p, i) => (
          <div key={p.t} className="orb-dot" style={{ "--a": `${p.a}deg`, "--d": Math.sqrt(p.m / max).toFixed(3), "--i": i }}>
            <span className="orb-pin">
              <em>{p.m} min</em>
            </span>
          </div>
        ))}
        <div className="orb-home">
          <i />
          <span>Hero Homes</span>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      name: SITE.project,
      description: "Luxury 3 BHK residences by Hero Realty in Sector MU, Greater Noida, with 3 towers, 80% open greens and a 25,000+ sq ft clubhouse.",
      url: SITE.url,
      image: `${SITE.url}/img/hero-banner.webp`,
      address: { "@type": "PostalAddress", streetAddress: "Plot GH-02, Sector MU", addressLocality: "Greater Noida", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
      amenityFeature: AMENITIES.map((a) => ({ "@type": "LocationFeatureSpecification", name: a.t, value: true })),
      telephone: SITE.phoneE164,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* ---------------- Header ---------------- */}
      <header className="hd">
        <div className="wrap hd-in">
          <a href="#top" className="hd-logo" aria-label="Hero Homes Greater Noida home">
            <Image src="/img/logo.webp" alt="Hero Homes" width={116} height={43} />
          </a>
          <span className="hd-cp">{SITE.partnerNote}</span>
          <nav className="hd-nav" aria-label="Sections">
            <a href="#project">Project</a>
            <a href="#homes">Homes & prices</a>
            <a href="#amenities">Amenities</a>
            <a href="#location">Location</a>
          </nav>
          <a className="btn btn-line hd-call" href={`tel:${SITE.phoneE164}`}>
            <Icon n="phone" size={16} fill />
            <span>{SITE.phoneDisplay}</span>
          </a>
        </div>
      </header>

      <main id="top">
        {/* ---------------- Hero ---------------- */}
        <section className="hero" aria-labelledby="h1">
          <div className="hero-bg" aria-hidden="true">
            <Image src="/img/hero-banner.webp" alt="" fill preload sizes="100vw" quality={80} />
          </div>
          <div className="hero-glow" aria-hidden="true" />
          <div className="wrap hero-in">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="dot" /> New launch · RERA registered · {SITE.location}
              </p>
              <h1 id="h1">
                Hero Homes <span className="gold">Greater Noida</span>
              </h1>
              <p className="hero-sub">
                Luxury 3 BHK residences by <strong>Hero Realty</strong>, 1,650–2,000 sq ft, set amid 80% open greens beside the Noida–Greater Noida Expressway.
              </p>
              <div className="hero-price">
                <span>Starting</span>
                <strong>₹1.89 Cr*</strong>
                <em>Base rate ~₹11,500 / sq ft*</em>
              </div>
              <ul className="hero-chips">
                <li>3 BHK + 2T / 3T / Servant</li>
                <li>Possession {SITE.possession}</li>
                <li>Home loans from leading banks</li>
              </ul>
              <div className="hero-cta">
                <a className="btn btn-red" href="#visit">
                  Book a free site visit
                </a>
                <a className="btn btn-glass" href={WA_DEFAULT} target="_blank" rel="noopener">
                  <Icon n="wa" size={18} fill /> WhatsApp us
                </a>
              </div>
            </div>
          </div>

          <div className="wrap hero-form">
            <span className="hero-ribbon">Limited inventory</span>
            <EnquiryForm variant="bar" title="Get price list & floor plans" sub="Instant callback from our advisor." />
          </div>

          <ul className="wrap stats" aria-label="Project at a glance">
            {STATS.map((s) => (
              <li key={s.l}>
                <strong>
                  <span className="sr-only">{`${s.pre}${s.n}${s.s}`}</span>
                  <span aria-hidden="true">
                    {s.pre}
                    <span className="count" style={{ "--to": s.n }} />
                    {s.s}
                  </span>
                </strong>
                <span>{s.l}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------------- Project overview + 3D towers ---------------- */}
        <section className="sec ov" id="project" aria-labelledby="ov-h">
          <div className="wrap ov-in">
            <div className="ov-copy rv">
              <p className="kicker">The project</p>
              <h2 id="ov-h">Three towers. One quiet, green address.</h2>
              <p>
                Hero Homes rises as three G+31 towers with just six homes per floor, so every residence gets light, cross-ventilation and privacy. Around 80% of the land is kept open for
                landscaped gardens, walking trails and play areas.
              </p>
              <dl className="ov-facts">
                <div>
                  <dt>Developer</dt>
                  <dd>{SITE.developer} (Hero Enterprise)</dd>
                </div>
                <div>
                  <dt>Address</dt>
                  <dd>{SITE.address.replace(", Uttar Pradesh", "")}</dd>
                </div>
                <div>
                  <dt>RERA</dt>
                  <dd>{SITE.rera}</dd>
                </div>
                <div>
                  <dt>Possession</dt>
                  <dd>{SITE.possession}</dd>
                </div>
              </dl>
            </div>
            <div className="ov-3d rv">
              <Towers />
              <p className="cap">Indicative 3D massing, not to scale.</p>
            </div>
          </div>
        </section>

        {/* ---------------- Homes & prices with 3D plans (CSS-only tabs) ---------------- */}
        <section className="sec cf" id="homes" aria-labelledby="cf-h">
          <div className="wrap">
            <div className="sec-head rv">
              <p className="kicker">Homes & prices</p>
              <h2 id="cf-h">Choose your 3 BHK</h2>
              <p>Base rate around ₹11,500 per sq ft. Tap a home to explore its layout in 3D.</p>
            </div>
            <div className="cf-box rv">
              {CONFIGS.map((c, i) => (
                <input key={c.id} type="radio" name="cfg" id={`cfg-${c.id}`} className="cf-radio" defaultChecked={i === 1} aria-label={c.name} />
              ))}
              <div className="cf-tabs" role="presentation">
                {CONFIGS.map((c) => (
                  <label key={c.id} htmlFor={`cfg-${c.id}`} className={`cf-tab cf-tab-${c.id}`}>
                    <span className="cf-tab-n">{c.name}</span>
                    <span className="cf-tab-s">
                      {fmt(c.super)} sq ft · <b>{c.price}</b>
                    </span>
                  </label>
                ))}
              </div>
              {CONFIGS.map((c) => (
                <div key={c.id} className={`cf-panel cf-panel-${c.id}`}>
                  <div className="cf-plan">
                    <Plan3D c={c} />
                    <p className="cap">Indicative layout for illustration only. Ask us for the official floor plan.</p>
                  </div>
                  <div className="cf-info">
                    <span className="cf-tag">{c.tag}</span>
                    <h3>{c.name}</h3>
                    <p className="cf-price">
                      {c.price} <small>onwards</small>
                    </p>
                    <dl className="cf-sizes">
                      <div>
                        <dt>Super area</dt>
                        <dd>{fmt(c.super)} sq ft</dd>
                      </div>
                      <div>
                        <dt>Carpet area</dt>
                        <dd>{fmt(c.carpet)} sq ft</dd>
                      </div>
                      <div>
                        <dt>Living room</dt>
                        <dd>{c.rooms.living}</dd>
                      </div>
                      <div>
                        <dt>Master bedroom</dt>
                        <dd>{c.rooms.master}</dd>
                      </div>
                    </dl>
                    <p className="cf-bal">
                      <Icon n="check" size={16} /> {c.balconies}
                    </p>
                    <a className="btn btn-red" href="#visit">
                      Get cost sheet <Icon n="arrow" size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <ul className="incl rv" aria-label="Included with every home">
              {INCLUDED.map((t) => (
                <li key={t}>
                  <Icon n="check" size={15} /> {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- Amenities + 3D gallery ring ---------------- */}
        <section className="sec am" id="amenities" aria-labelledby="am-h">
          <div className="wrap am-in">
            <div className="am-left">
              <div className="sec-head left rv">
                <p className="kicker">Amenities</p>
                <h2 id="am-h">A resort-style life, right at home</h2>
              </div>
              <ul className="am-grid">
                {AMENITIES.map((a) => (
                  <li key={a.t} className="am-card rv">
                    <span className="am-ic">
                      <Icon n={a.i} />
                    </span>
                    <span>
                      <b>{a.t}</b>
                      <small>{a.d}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ring-wrap rv" aria-label="Project gallery, artist's impressions">
              <div className="ring">
                {GALLERY.map((g, i) => (
                  <figure key={g.src} className="ring-face" style={{ "--i": i }}>
                    <div className="ring-front">
                      <Image src={g.src} alt={g.alt} width={420} height={280} sizes="(max-width: 700px) 200px, 280px" />
                      <figcaption>{g.t}</figcaption>
                    </div>
                  </figure>
                ))}
              </div>
              <p className="cap ring-cap">All images are artist's impressions.</p>
            </div>
          </div>
        </section>

        {/* ---------------- Location orbit ---------------- */}
        <section className="sec lo" id="location" aria-labelledby="lo-h">
          <div className="wrap lo-in">
            <div className="lo-3d rv">
              <Orbit />
            </div>
            <div className="lo-copy rv">
              <p className="kicker">Location</p>
              <h2 id="lo-h">Everything you need, minutes away</h2>
              <p>Sector MU sits off the Noida–Greater Noida Expressway, close to the metro, top schools and hospitals, with the upcoming Jewar airport a short drive away.</p>
              <ol className="lo-list">
                {PLACES.map((p, i) => (
                  <li key={p.t} style={{ "--i": i }}>
                    <span className="lo-min">
                      {p.m}
                      <small>min</small>
                    </span>
                    <span>{p.t}</span>
                  </li>
                ))}
              </ol>
              <p className="cap">Approximate drive times, subject to traffic.</p>
            </div>
          </div>
        </section>

        {/* ---------------- Site visit + FAQ ---------------- */}
        <section className="sec vs" id="visit" aria-labelledby="vs-h">
          <div className="wrap vs-in">
            <div className="vs-form rv">
              <EnquiryForm variant="full" title="Book your free site visit" sub="Pick-up and drop available on request. Get the latest price list, payment plan and offers." />
            </div>
            <div className="vs-faq rv">
              <p className="kicker">Questions</p>
              <h2 id="vs-h">Hero Homes Greater Noida FAQs</h2>
              <div className="faq">
                {FAQS.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- Footer ---------------- */}
      <footer className="ft">
        <div className="wrap">
          <div className="ft-top">
            <Image src="/img/logo.webp" alt="Hero Homes" width={108} height={40} className="ft-logo" />
            <p>
              <Icon n="pin" size={16} fill /> {SITE.address}
            </p>
            <p>
              <a href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a> ·{" "}
              <a href={WA_DEFAULT} target="_blank" rel="noopener">
                WhatsApp
              </a>
            </p>
          </div>
          <p className="ft-rera">
            RERA: {SITE.rera} ·{" "}
            <a href={SITE.reraPortal} target="_blank" rel="noopener">
              Verify on up-rera.in
            </a>
          </p>
          <p className="ft-disc">
            Disclaimer: This website is managed by an {SITE.partnerNote.toLowerCase()} for marketing purposes only and is not the official website of the developer. Prices marked * are indicative,
            exclude GST, registration, stamp duty and other charges, and are subject to change without notice. Images, 3D views and layouts are artist&apos;s impressions for illustration only.
            Specifications, amenities and possession timelines are as per the developer and subject to change. Please verify all details, including the RERA registration, with the developer
            and on the UP RERA portal before making any purchase decision. By submitting your details you consent to receive calls, SMS and WhatsApp messages about this project.{" "}
            <a href={SITE.disclaimer} target="_blank" rel="noopener">
              Full disclaimer
            </a>{" "}
            ·{" "}
            <a href={SITE.privacy} target="_blank" rel="noopener">
              Privacy policy
            </a>
          </p>
        </div>
      </footer>

      {/* ---------------- Mobile action bar ---------------- */}
      <nav className="mbar" aria-label="Quick contact">
        <a href={`tel:${SITE.phoneE164}`}>
          <Icon n="phone" size={18} fill /> Call
        </a>
        <a href={WA_DEFAULT} target="_blank" rel="noopener" className="mbar-wa">
          <Icon n="wa" size={18} fill /> WhatsApp
        </a>
        <a href="#visit" className="mbar-red">
          Site visit
        </a>
      </nav>
      <a className="wa-float" href={WA_DEFAULT} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <Icon n="wa" size={28} fill />
      </a>
    </>
  );
}
