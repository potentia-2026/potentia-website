# Potentia website — www.my-potentia.com

The marketing website for **Potentia Software & Consultancy Services W.L.L.**, built on the recommended 2026 stack:

| Layer | Technology | Where |
|---|---|---|
| Frontend | **Next.js 14** (App Router, server components, static generation) | `apps/web` |
| Language | **TypeScript** (strict) across front end and back end | everywhere |
| Styling | **Tailwind CSS** with the Potentia brand kit as design tokens | `apps/web/tailwind.config.ts`, `src/app/globals.css` |
| API | **NestJS 10**: validated enquiry endpoint that emails `info@my-potentia.com` | `apps/api` |

Section order everywhere (menus, dialog, cards, footer): **Banking & Fintech → Business Automation → Education & Wellbeing**.

Product families: Banking — Payment Rail, Omni Flow, Smart Recon, CMS, Card Switch · Business Automation — **Campus** (school management), **Spark** (billing), **Hive** (inventory) · Education & Wellbeing — Pulse, Vibe, Link and University Admissions.

---

## 1. Quick start (local)

Requirements: **Node.js 20.11+** and npm 10.

```bash
# from the project root
npm install                      # installs both apps (npm workspaces)

cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

npm run dev:api                  # API on http://localhost:4000
npm run dev:web                  # site on http://localhost:3000
```

With `SMTP_HOST` left empty, the API **prints enquiries to the console** instead of emailing them, so you can test all four forms without a mail account.

Useful scripts (root):

| Command | What it does |
|---|---|
| `npm run build` | Production build of the API and the website |
| `npm run typecheck` | TypeScript check of both apps |
| `npm run lint` | Next.js lint (web) and type check (API) |
| `npm test -w apps/api` | Unit tests for the enquiry email logic |

---

## 2. Project structure

```
potentia/
├── apps/
│   ├── web/                          Next.js + TypeScript + Tailwind
│   │   ├── public/brand/             Potentia logo (colour, white, icon)
│   │   ├── public/images/            Banner, Why Potentia tiles, challenge photos
│   │   └── src/
│   │       ├── app/                  Routes: / , /banking, /business, /education, /about, /contact, /privacy, /terms
│   │       │                         (/academics permanently redirects to /education)
│   │       │                         + sitemap.ts, robots.ts, not-found.tsx, icon.png
│   │       ├── components/
│   │       │   ├── layout/           Header (menus, sticky section bar, mobile menu), Footer, Logo
│   │       │   ├── landing/          ChoiceDialog (remembers choice 30 days), NetworkCanvas
│   │       │   ├── banking/          BankingBanner, WhyTiles, ChallengeCards, ProductSwitcher,
│   │       │   │                     LiveScreen (5 live demo screens), MarketsCascade, Flags, SecurityTiles
│   │       │   ├── business/         BusinessBanner + product strip, ProductSlider (3 dots), ProductMark (Campus/Spark/Hive identities)
│   │       │   ├── education/        EducationBanner, UniversityFinder (searchable, country tabs)
│   │       │   ├── shared/           CampaignBanner (banner + product strip), ProductMark (product identities)
│   │       │   ├── forms/            EnquiryForm (one component for all 4 forms), FormSection
│   │       │   └── ui/               Hero, SectionHead, StatBand, Steps, Accordion, GenArt, …
│   │       ├── content/              ALL SITE COPY — edit text here, not in components
│   │       └── lib/                  genart (brand visuals), api client, cross-component events
│   └── api/                          NestJS
│       └── src/
│           ├── enquiries/            POST /enquiries (DTO validation, honeypot, email composition)
│           ├── mail/                 SMTP via nodemailer (console fallback in development)
│           └── health/               GET /health
├── docker-compose.yml
└── README.md
```

### Editing content

All copy lives in `apps/web/src/content/`:

| File | Contents |
|---|---|
| `site.ts` | Company details, section order, menus, values |
| `banking.ts` | Products, markets, Why Potentia tiles, challenges, security, services, consultancy |
| `business.ts` | **Potentia Campus** (school management), **Potentia Spark** (billing), **Potentia Hive** (inventory): slider copy, features, consultancy |
| `education.ts` | Pulse, Vibe, Link, University Admissions, consultancy, **testimonials** |
| `universities.ts` | University and pathway lists by country |
| `forms.ts` | Fields for the four forms |

---

## 3. The enquiry API

`POST /enquiries` (JSON). Every form sends its section, which becomes the email subject:

```
[Banking & Fintech] Website enquiry from Aisha, Gulf Bank
```

- **Validation:** `class-validator` whitelists and length-limits every field; unknown fields are rejected.
- **Spam protection:** hidden honeypot field (silently discarded) and **5 requests per minute per IP** (`@nestjs/throttler`). Add reCAPTCHA or Cloudflare Turnstile later if needed.
- **Security headers:** `helmet`. **CORS** limited to `WEB_ORIGIN`.
- **Reply-to** is set to the visitor's email, so the team can answer directly.
- **Health check:** `GET /health`.

Configure SMTP in `apps/api/.env` (Microsoft 365, Google Workspace, Amazon SES and SendGrid all work over SMTP).

---

## 4. Deployment

**Option A — Docker (any server or cloud VM)**

```bash
docker compose up --build -d     # web on :3000, api on :4000
```

Put both behind a reverse proxy (Nginx, Caddy or a cloud load balancer) with HTTPS, e.g. `www.my-potentia.com` → web and `api.my-potentia.com` → api. Build the web image with `NEXT_PUBLIC_API_URL=https://api.my-potentia.com`, and set `WEB_ORIGIN=https://www.my-potentia.com` for the API.

**Option B — managed hosting**

- Web: Vercel, Netlify or AWS Amplify (root directory `apps/web`).
- API: Render, Railway, Fly.io, AWS App Runner or Azure Container Apps (root directory `apps/api`, start command `node dist/main.js`).

Security headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) are set in `apps/web/next.config.mjs`.

---

## 5. Before launch — checklist

- [ ] **Testimonials:** seven are loaded from www.my-potentia.com in `src/content/education.ts`. Confirm the attribution for the last one (shown as "Client") and that clients consent to being quoted.
- [ ] **Technology Lead:** add name and photo in `src/app/about/page.tsx`; add the founder's photo.
- [ ] **Spark and Hive features:** confirm the proposed lists in `src/content/business.ts`.
- [ ] **Trademarks:** check "Potentia Campus", "Potentia Spark" and "Potentia Hive" on the Qatar MOCI trademark register (software classes 9 and 42).
- [ ] **Privacy policy and terms:** replace the placeholders in `src/app/privacy` and `src/app/terms`.
- [ ] **Images:** the GCC-markets image shows UAE flags on several countries; the secure-core image lists "Core Banking"; the banner says "Message Convertor". Regenerate or retouch these. The challenge-card photos in `public/images/challenges/` are cut from the banking banner and the Why Potentia images; replace them with dedicated photos when available.
- [ ] **Flags:** check the Saudi inscription and the simplified Oman emblem in `components/banking/Flags.tsx`.
- [ ] **Brand visuals:** every `<GenArt …/>` slot can be swapped for `next/image` once real photography is available.
- [ ] **Map:** optionally replace the map illustration on `/contact` with a Google Maps embed.
- [ ] **Figures:** confirm all numbers (programme hours, case counts, market systems).
- [ ] **Logo:** a higher-resolution PNG or SVG of the logo will look sharper on retina screens (`public/brand/`).
- [ ] **Analytics and consent:** add your analytics tool and a cookie notice if required.

---

## 6. Notes on design decisions

- **Brand kit:** Deep Royal Purple `#5D2E8E`, Tech Magenta `#9D4496`, Lavender Highlight `#C792C8`, white; Montserrat (Black Ops One is reserved for the logo wordmark).
- **Accessibility:** WCAG 2.1 AA colour contrast, visible keyboard focus, skip link, labelled forms, keyboard-operable tabs, cascade and dialog, and every animation stops for visitors with *reduced motion* turned on.
- **Performance:** pages are server-rendered and statically generated; only interactive parts (dialog, product switcher, live screens, markets cascade, university finder, forms) ship JavaScript. Images go through `next/image` (AVIF/WebP, responsive sizes).
- **SEO:** per-page titles and descriptions from the content brief, canonical URLs, `sitemap.xml`, `robots.txt` and Organization structured data.
- **Live product screens** are labelled *Demo data* and use randomised figures; replace them with real screenshots or recordings when available.
