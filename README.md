# Hero Homes Greater Noida — landing page

Next.js 16 (App Router). One page (`src/app/page.js`) plus the lead endpoint (`src/app/api/enquiry/route.js`).

- **Edit content** (prices, sizes, RERA, phone, FAQs): `src/app/site.js`
- **Styles & 3D** (pure CSS, no WebGL): `src/app/globals.css`
- **Lead form**: `src/app/EnquiryForm.js` → `POST /api/enquiry` → email

## Lead email setup
Set the variables listed in `.env.example` in Vercel (or `.env.local`), then redeploy.
No keys live in the code, so the project can be moved to any Next.js host.
Until `LEAD_TO_EMAIL` is set, visitors are handed to WhatsApp (+91 96868 97597) with their details.

UTM parameters (`utm_*`, `gclid`, `gbraid`, `wbraid`, `fbclid`) are captured and included in the email.

## Run
```
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```
