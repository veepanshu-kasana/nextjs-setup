/**
 * Single source of truth for the Hero Homes landing page.
 * Change values here — page copy, SEO tags and structured data all read from this file.
 */
export const SITE = {
  /** Final public URL of this page, no trailing slash. Can be overridden with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nextjs-setup-sigma.vercel.app",
  project: "Hero Homes Greater Noida",
  shortName: "Hero Homes",
  developer: "Hero Realty",
  /** Shown on the page so visitors and ad reviewers know who runs it. */
  partnerNote: "Authorised Channel Partner",
  location: "Sector MU, Greater Noida",
  address: "Plot GH-02, Sector MU, Greater Noida, Uttar Pradesh",
  rera: "UPRERAPRJ414014/10/2026",
  reraPortal: "https://www.up-rera.in/",
  possession: "2031 onwards*",
  phoneDisplay: "+91 96868 97597",
  phoneE164: "+919686897597",
  whatsapp: "919686897597",
  email: "info@herohomenoida.com",
  /** Legal pages on the main site */
  privacy: "https://www.herohomenoida.com/privacy-policy.html",
  disclaimer: "https://www.herohomenoida.com/disclaimer.html",
};

export const waLink = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
export const WA_DEFAULT = waLink("I am interested in Hero Homes Greater Noida. Please send brochure and prices.");

/** n = number the counter animates to */
export const STATS = [
  { n: 3, pre: "", s: "", l: "Towers" },
  { n: 31, pre: "G+", s: "", l: "Storeys" },
  { n: 80, pre: "", s: "%", l: "Open greens" },
  { n: 6, pre: "", s: "", l: "Homes per floor" },
  { n: 25, pre: "", s: "K+", l: "Sq ft clubhouse" },
];

export const CONFIGS = [
  {
    id: "2t",
    name: "3 BHK + 2 Toilets",
    super: 1650,
    carpet: 1180,
    price: "₹1.89 Cr*",
    balconies: "3 wide balconies",
    tag: "Smart layout",
    rooms: { living: "12'0\" × 18'0\"", master: "11'0\" × 14'0\"" },
    plan: [
      { n: "Living / Dining", x: 0, y: 0, w: 55, h: 55, c: "a" },
      { n: "Master", x: 55, y: 0, w: 45, h: 40, c: "b" },
      { n: "Bed 2", x: 55, y: 40, w: 45, h: 30, c: "c" },
      { n: "Kitchen", x: 0, y: 55, w: 30, h: 45, c: "d" },
      { n: "Bed 3", x: 30, y: 55, w: 25, h: 45, c: "c" },
      { n: "Balcony", x: 55, y: 70, w: 45, h: 30, c: "e" },
    ],
  },
  {
    id: "3t",
    name: "3 BHK + 3 Toilets",
    super: 1800,
    carpet: 1360,
    price: "₹2.07 Cr*",
    balconies: "3 wide balconies",
    tag: "Most popular",
    rooms: { living: "14'0\" × 22'0\"", master: "12'0\" × 16'0\"" },
    plan: [
      { n: "Living / Dining", x: 0, y: 0, w: 60, h: 52, c: "a" },
      { n: "Master", x: 60, y: 0, w: 40, h: 42, c: "b" },
      { n: "Bed 2", x: 60, y: 42, w: 40, h: 30, c: "c" },
      { n: "Kitchen", x: 0, y: 52, w: 28, h: 48, c: "d" },
      { n: "Bed 3", x: 28, y: 52, w: 32, h: 48, c: "c" },
      { n: "Balcony", x: 60, y: 72, w: 40, h: 28, c: "e" },
    ],
  },
  {
    id: "sv",
    name: "3 BHK + Servant Room",
    super: 2000,
    carpet: 1580,
    price: "₹2.30 Cr*",
    balconies: "4 spacious balconies",
    tag: "VRV AC · private foyer",
    rooms: { living: "16'0\" × 24'0\"", master: "14'0\" × 18'0\"" },
    plan: [
      { n: "Living Hall", x: 0, y: 0, w: 58, h: 50, c: "a" },
      { n: "Master Suite", x: 58, y: 0, w: 42, h: 44, c: "b" },
      { n: "Bed 2", x: 58, y: 44, w: 42, h: 28, c: "c" },
      { n: "Kitchen", x: 0, y: 50, w: 26, h: 30, c: "d" },
      { n: "Servant", x: 0, y: 80, w: 26, h: 20, c: "f" },
      { n: "Bed 3", x: 26, y: 50, w: 32, h: 50, c: "c" },
      { n: "Balcony", x: 58, y: 72, w: 42, h: 28, c: "e" },
    ],
  },
];

export const INCLUDED = [
  "Wooden flooring in all rooms",
  "Modular kitchen",
  "Four air conditioners",
  "Fully fitted master bath",
  "Air purifiers in towers & lifts",
];

export const AMENITIES = [
  { i: "club", t: "25,000+ sq ft clubhouse", d: "Dining, café, card room and mini-theatre" },
  { i: "pool", t: "Swimming pool", d: "With kids' splash pool and LED lighting" },
  { i: "gym", t: "Fully equipped gym", d: "Cardio machines and free weights" },
  { i: "shield", t: "Smart security", d: "Biometric entry, perimeter protection and CCTV" },
  { i: "leaf", t: "Aromatherapy gardens", d: "Zen zones and a yoga & meditation deck" },
  { i: "laptop", t: "Coworking lounge", d: "Wi-Fi and video-call rooms" },
  { i: "kids", t: "Kids' play arena", d: "Sandbox and play areas" },
  { i: "ev", t: "EV charging", d: "Charging bays in the basement" },
];

export const GALLERY = [
  { src: "/img/exterior_sunset.webp", alt: "Hero Homes towers at sunset (artist's impression)", t: "Towers at sunset" },
  { src: "/img/exterior_daytime.webp", alt: "Grand entrance and towers (artist's impression)", t: "Grand entrance" },
  { src: "/img/interior_living.webp", alt: "Living room interior (artist's impression)", t: "Living room" },
  { src: "/img/interior_bedroom.webp", alt: "Master bedroom interior (artist's impression)", t: "Master bedroom" },
  { src: "/img/clubhouse_pool.webp", alt: "Clubhouse and pool (artist's impression)", t: "Clubhouse & pool" },
  { src: "/img/amenity_yoga_deck.webp", alt: "Yoga and meditation deck (artist's impression)", t: "Yoga deck" },
];

/** Drive times as published on the project website (approximate). */
export const PLACES = [
  { t: "Noida–Greater Noida Expressway", m: 5, s: "Expressway", a: 0 },
  { t: "Pari Chowk / Depot Metro", m: 8, s: "Metro", a: 180 },
  { t: "DPS, Ryan & Shriram schools", m: 10, s: "Schools", a: 120 },
  { t: "Kailash & Fortis hospitals", m: 12, s: "Hospitals", a: 240 },
  { t: "Yamuna Expressway & malls", m: 15, s: "Yamuna Expy", a: 60 },
  { t: "Noida International Airport, Jewar", m: 35, s: "Jewar Airport", a: 300 },
];

export const FAQS = [
  { q: "What is the price of Hero Homes Greater Noida?", a: "Indicative starting prices are ₹1.89 Cr* for 3 BHK + 2T (1,650 sq ft), ₹2.07 Cr* for 3 BHK + 3T (1,800 sq ft) and ₹2.30 Cr* for 3 BHK + Servant (2,000 sq ft), at a base rate of about ₹11,500 per sq ft. Final price depends on floor, tower, PLC and statutory charges; GST, registration and stamp duty are extra." },
  { q: "Where is Hero Homes located?", a: "Plot GH-02, Sector MU, Greater Noida, about 5 minutes from the Noida–Greater Noida Expressway and 8 minutes from Pari Chowk / Depot metro." },
  { q: "What is the RERA number?", a: "The RERA number shown for the project is UPRERAPRJ414014/10/2026. Please verify the latest details on the UP RERA portal before booking." },
  { q: "When is possession?", a: "Possession is indicated as 2031 onwards*, subject to the developer's schedule and RERA timelines." },
  { q: "Is a home loan available?", a: "Yes, home loan assistance is available from leading banks, subject to eligibility. NRIs can also buy as per RBI/FEMA guidelines." },
  { q: "How do I book a site visit?", a: "Fill the site visit form or call / WhatsApp +91 96868 97597. We'll share the brochure and cost sheet and arrange a visit at your preferred time." },
];
