import { Manrope, Playfair_Display } from "next/font/google";
import { SITE } from "./site";
import "./globals.css";

const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const serif = Playfair_Display({ variable: "--font-serif", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });

const title = "Hero Homes Greater Noida | Luxury 3 BHK from ₹1.89 Cr* | Sector MU";
const description =
  "Hero Homes by Hero Realty in Sector MU, Greater Noida: 3 BHK homes of 1,650–2,000 sq ft from ₹1.89 Cr*, 3 towers, 80% greens and a 25,000+ sq ft clubhouse. Get the price list and book a free site visit.";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  alternates: { canonical: "/" },
  keywords: ["Hero Homes Greater Noida", "Hero Homes Sector MU", "Hero Realty Greater Noida", "3 BHK Greater Noida", "new launch Greater Noida"],
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.project,
    title,
    description,
    locale: "en_IN",
    images: [{ url: "/img/hero-banner.webp", width: 2048, height: 1142, alt: "Hero Homes Greater Noida towers at sunset (artist's impression)" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/img/hero-banner.webp"] },
  icons: { icon: "/img/fav-192.png", apple: "/img/fav-192.png" },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#0C192B", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
