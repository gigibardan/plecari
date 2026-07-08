# Plecări — Documentație tehnică a proiectului

> Portal de călătorii bilingv (RO/EN), generalist, monetizat prin afiliere.
> Document de referință: ce am construit, cum funcționează, capcanele de evitat, refactoruri viitoare.
> Ultima actualizare: iulie 2026.

---

## 1. Ce este Plecări

Portal de travel **generalist** (nu axat pe o singură verticală). Verticale egale ca importanță:
zboruri, cazări, asigurări, croaziere, eSIM & roaming, închirieri auto, city breaks.

**Obiective:**
- Site genuin **util** (motoare de căutare / widget-uri, nu doar articole)
- Super **indexabil** SEO + optimizat pentru **citare de AI** (AI Overviews, ChatGPT, Perplexity)
- Monetizare prin **afiliere** (Travelpayouts ca agregator + parteneri direcți viitori)

---

## 2. Stack tehnic

| Componentă | Alegere |
|---|---|
| Framework | **Next.js 16** (App Router) |
| Deploy | **Cloudflare Workers** via `@opennextjs/cloudflare` (NU Pages) |
| i18n | **next-intl v4**, `localePrefix: 'always'` (`/ro/`, `/en/`) |
| Conținut | **Velite** (markdown → HTML la build) |
| Styling | **Tailwind v4** + sistem de design propriu în `globals.css` |
| CI/CD | **Cloudflare Workers Builds** (git push → build pe Linux → deploy) |
| Domeniu | **plecari.com** (Cloudflare Registrar) |
| Repo | `github.com/gigibardan/plecari` |
| Dev local | Windows + VS Code + `next dev` |

**Regulă de aur pe Windows:** dezvolți local cu `next dev`. Build-ul OpenNext rulează
DOAR în CI (Linux), niciodată local — OpenNext are probleme pe Windows.

---

## 3. Structura de foldere

```
plecari/
├─ content/
│  ├─ articles/         # articole pe verticale (.mdx)
│  └─ pages/            # pagini statice: legale etc. (.mdx)
├─ messages/            # ro.json, en.json (traduceri UI)
├─ public/
│  ├─ hero.webp         # imagine hero homepage
│  └─ verticals/        # imagini hero per verticală ({slug}.webp)
├─ src/
│  ├─ app/[locale]/
│  │  ├─ layout.tsx                 # layout rădăcină (fonturi, header/footer, providers)
│  │  ├─ page.tsx                   # homepage (hero duotone + widget + verticale)
│  │  ├─ [vertical]/
│  │  │  ├─ page.tsx                # hub verticală (hero + motor/CTA + articole)
│  │  │  └─ [slug]/page.tsx         # pagină articol
│  │  └─ legal/[slug]/page.tsx      # pagini legale
│  ├─ app/globals.css               # sistem de design + toate stilurile
│  ├─ app/sitemap.ts, robots.ts     # se auto-activează când e indexabil
│  ├─ components/
│  │  ├─ Header, Footer, LanguageSwitcher
│  │  ├─ AnswerBox, FAQ, Breadcrumbs, JsonLd
│  │  ├─ AffiliateDisclosure, AffiliateButton
│  │  ├─ SearchWidget                # wrapper: lazy + consent-gated
│  │  └─ CookieConsent               # banner GDPR
│  ├─ config/
│  │  ├─ site.ts                    # SITE_URL, INDEXABLE
│  │  └─ verticals.ts               # sursa unică per verticală
│  ├─ i18n/                          # routing, request, navigation
│  └─ lib/                           # content, metadata, schema, consent
├─ velite.config.ts                 # config Velite
└─ next.config.ts                   # next-intl + redirect / → /ro + OpenNext dev
```

---

## 4. i18n (next-intl)

- **Prefix mereu:** `/ro/...` și `/en/...`. Default = `ro`.
- `[locale]` dinamic; `generateStaticParams` pre-generează ro + en.
- `setRequestLocale(locale)` menține paginile statice (SSG).
- **NU folosim middleware/proxy** (vezi 9.2). Redirect `/` → `/ro` în `next.config.ts`.
- Linkuri interne: `Link` din `@/i18n/navigation`, NU `next/link`.
- Compromis: fără detecție automată de limbă după browser (RO-first e ok pentru target).

---

## 5. Conținut (Velite)

**Două colecții:** `articles` și `pages`.

**Model important:** corpul e **markdown → HTML compilat la build** (`s.markdown()`).
Elementele speciale sunt în **frontmatter**:
- `answer:` → AnswerBox
- `widget:` → scriptSrc motor de căutare
- `widgetHeight:` → înălțime minimă rezervată
- `cta:` → butoane afiliere `[{label, href}]`
- `faq:` → Q&A (generează FAQPage schema)
- tabelele = markdown normal (`| ... |`)

**De ce NU `s.mdx()`:** renderer-ul MDX folosea `new Function`, interzis pe Cloudflare Workers.
Vezi capcana 9.1.

**Regulă:** după orice modificare în `velite.config.ts`, rulează `npx velite`.

### Adăugarea unui articol nou
1. `content/articles/nume.ro.mdx`
2. Frontmatter: `title, description, locale, vertical, slug, datePublished, answer?, widget?, widgetHeight?, cta?, faq?`
3. Corpul: markdown curat
4. Apare automat pe `/ro/{vertical}/{slug}`

---

## 6. Verticale — arhitectura hub-and-spoke

**`src/config/verticals.ts` = sursa unică per verticală.** Câmpuri:
- Prezentare: `slug, featured, label, desc, intro, image`
- Monetizare: `widget, widgetHeight, cta[]`

**Hub-ul `/ro/{vertical}` e 100% data-driven** — afișează automat hero duotone (imagine per verticală)
+ motor (widget/CTA din config) + articole filtrate. Modifici o verticală într-un loc, se propagă
în homepage (FEATURED/REST), header, footer, hub și rutare.

### Componente
| Componentă | Rol |
|---|---|
| `Header` | Nav din verticals + hamburger mobil + switch limbă |
| `Footer` | Brand + verticale + linkuri legale |
| `AnswerBox` | Paragraful-răspuns citat de AI |
| `FAQ` | Q&A + schema FAQPage |
| `Breadcrumbs` | Nav + schema BreadcrumbList |
| `JsonLd` | Randează schema.org |
| `AffiliateDisclosure` | Notă de conformitate |
| `AffiliateButton` | CTA afiliere: `rel="sponsored nofollow"`, tab nou |
| `SearchWidget` | Wrapper widget: lazy + consent-gated |
| `CookieConsent` | Banner GDPR |

`MDXContent.tsx` a fost ȘTERS (folosea `new Function`).

---

## 7. SEO & citabilitate AI

Injectate automat pe fiecare pagină:
- schema.org: Article, FAQPage, BreadcrumbList, Organization
- hreflang + canonical (`lib/metadata.ts`)
- sitemap + robots (se auto-activează cu `INDEXABLE`)
- Conținut answer-first, tabele citabile
- HTML de la server (nu din JS)

**Comutator:** `INDEXABLE` = `SITE_URL.includes('plecari.com')` — o linie, tot restul se aliniază.

**Search Console:** proprietate `plecari.com` verificată prin TXT, sitemap trimis.
Date în raport după 1-3 zile.

---

## 8. Monetizare

**Travelpayouts** = agregator principal. Marker: `shmarker=747505`.
- **29 programe active**, 25 blocate (deblocare la **3 luni trafic constant**)

### Programe active integrate
| Verticală | Motor / CTA | Comision | Cookie |
|---|---|---|---|
| Homepage hero | Aviasales Flights Search Form (widget) | 40% | 30z |
| Asigurări (hub + 2 articole) | EKTA (buton) | **25%** | 30z |
| eSIM (hub + articol) | Airalo (widget) + Yesim (buton) | 12% / 18% | 30/90z |
| Închirieri auto (hub + articol) | GetRentacar (buton) | 10% | 90z |
| Zboruri (hub) | Aviasales (widget) | 40% | 30z |

### Blocate până la trafic
Booking, Agoda, Expedia, DiscoverCars (23-54%!), Trip.com, Hotels.com, GetYourGuide, Viator,
Hostelworld, Vio.com etc. **Prioritatea reală acum = trafic**, nu mai multe programe.

### Widget-uri Travelpayouts — lecții
- **Domeniu contează:** `tpwgt.com` se randează inline OK; `tp.media` (GetRentacar) e blocat prin
  X-Frame-Options → folosește buton CTA (link) în loc.
- **Portal vs search form:** widget-urile „white label" (Localrent) sunt SPA-uri întregi, ok pe
  hub dedicat, nu în articol.

### Tool-uri viitoare Travelpayouts
- **Links API** — bulk links (la scară 50+ articole)
- **Data API** — date de prețuri pentru conținut auto-actualizat (vezi 12.5)

---

## 9. CAPCANE REZOLVATE

### 9.1. `new Function` interzis pe Cloudflare Workers
Simptom: pagini de conținut → Internal Server Error pe producție (merg local).
Fix: markdown → HTML la build, componente în frontmatter.
Regulă: NU folosi biblioteci care fac `eval`/`new Function` la runtime.

### 9.2. Node middleware nesuportat de OpenNext
Simptom: build CI pică cu „Node.js middleware is not currently supported".
Fix: eliminat `proxy.ts`. next-intl merge fără middleware (localePrefix always + setRequestLocale).
Redirect `/` → `/ro` în `next.config.ts`.

### 9.3. Middleware redenumit în Next 16
`middleware.ts` → `proxy.ts` (dar l-am eliminat, vezi 9.2).

### 9.4. Import Velite prin cale cu `.` (Turbopack)
Fix: alias `"@velite/*": ["./.velite/*"]` în tsconfig, import din `@velite/index`.

### 9.5. Diacritice RO
Fonturile trebuie cu `subsets: ['latin', 'latin-ext']`.

### 9.6. Stiluri care „nu se aplică"
Cache Turbopack. Fix: `rm -rf .next` + restart + hard refresh.

### 9.7. Tipuri MDX prea stricte
`ComponentType<any>` pentru registrul de componente.

### 9.8. Duplicate `page.tsx` în locul greșit
Simptom: homepage 404, hero de hub nu apare.
Cauză: două `page.tsx` (homepage + hub) încurcate la instalare.
Recunoaștere: `HERO_WIDGET_SRC` = homepage, `getVertical` = hub.

---

## 10. Deploy & domeniu

- **Build CI:** `npx velite && npx opennextjs-cloudflare build`
- **Flux:** git push → CI Linux → build → deploy. Branch → preview.
- **URL dev:** `plecari.gheorghe-bardan.workers.dev`
- **Domeniu:** `plecari.com` (Custom Domain pe Worker)
- **www:** CNAME proxied + Redirect Rule 301 la non-www
- **Email:** Cloudflare Email Routing → `contact@plecari.com` (de finalizat)

---

## 11. Design

**Direcție:** editorial cald, distinctiv (NU aspect generic AI).
- **Paletă:** cremă `#FBF6EE`, teracotă `#C15540`, teal `#1F5E56`, ochre `#E0A22B`, ink `#2B2018`
- **Tipografie:** Fraunces (titluri) + Hanken Grotesk (text)
- **Hero:** foto duotone (teracotă→teal peste grayscale) + text alb + widget centrat
- Tokenuri în `:root`, componentele folosesc `var(--...)`
- Responsive: header hamburger sub 880px, grid-uri fluide

---

## 12. REFACTORURI PLANIFICATE (când proiectul crește)

Idei bune pentru viitor, **NU se aplică acum**. Principiu YAGNI: adaugi structură când problema
există, nu preventiv. Fiecare are un **trigger** clar — momentul în care merită implementat.

### 12.1. CTA localizat
Actual: `cta: {label: string; href: string}[]` — label netradus.
Refactor: `label: {ro, en}`.
**Trigger:** prima verticală cu diferență reală de label RO vs EN.

### 12.2. Widget ca union type
Actual: `widget: string`. Ok cât toate widget-urile sunt `tpwgt.com` script.
Refactor:
```ts
type VerticalWidget =
  | {type: 'travelpayouts-script'; scriptSrc: string; height: number}
  | {type: 'iframe'; url: string; height: number}
  | {type: 'component'; name: string; props: object}
  | {type: 'none'};
```
**Trigger:** primul widget non-tpwgt.com.

### 12.3. Separare `partners.ts` de `verticals.ts`
Actual: CTA-uri direct în verticals (1/verticală). Ok acum.
Refactor: layer separat cu metadata (network, priority, market, expirare):
```ts
type PartnerOffer = {
  id: string;
  vertical: VerticalSlug;
  network?: 'travelpayouts' | '2performant' | 'awin' | 'cj' | 'direct';
  provider: string;
  locale?: 'ro' | 'en';
  label: LocaleText;
  href: string;
  featured?: boolean;
  trackingId?: string;
};
```
Verticala referențiază prin `partnerOfferIds: [...]`.
**Trigger:** primul partener non-Travelpayouts adăugat.

### 12.4. Parteneri non-Travelpayouts (anticipat)
**Va exista** monetizare în afara Travelpayouts:
- **2Performant / Profitshare** — piața RO (Travelminit, Vola.ro etc.)
- **Awin, CJ Affiliate** — rețele internaționale mari
- **Contracte directe** cu asigurători/travel companies din RO
- Fiecare cu dashboard propriu, formate de link și tracking diferite

**Când vine primul:** aplică 12.3 (separare `partners.ts`) + câmp `network` în tip.
`AffiliateButton` rămâne același; doar sursele de linkuri se diversifică.

### 12.5. Layer de date (Supabase + API-uri parteneri)
Anticipat: verticalele au sens cu **date live**, nu doar articole editoriale:
- **Aviasales/Travelpayouts Data API** — prețuri și oferte de zboruri per rută
- API-uri parteneri direcți (asigurări, eSIM, croaziere)
- Cache în **Supabase** ca sursă unică:
  - `partners` — sincronizat din partners.ts + tabele externe
  - `deals` — oferte extrase prin cron zilnic
  - `routes` — rute populare cu prețuri
  - `programmatic_pages` — pagini generate din date (ex. „zboruri București→Roma")

**Arhitectură viitoare:**
```
Cron (Cloudflare) → API-uri parteneri → transformare → Supabase
                                                        ↓
                          Next.js SSG rebuild zilnic (Deploy Hook)
                                                        ↓
                     Pagini programmatic + secțiuni "oferte" pe hub
```

**Implicație pentru arhitectura de acum:** hub-urile vor avea nevoie să știe ce colecții
alimentează. Când Supabase e activ, hub-ul de zboruri va trage 1) articole din Velite,
2) oferte din Supabase, 3) rute populare din Supabase. Verticala primește un câmp:
```ts
contentSources: Array<'editorial' | 'deals' | 'programmatic'>
```
**Trigger:** prima verticală cu date live (probabil zboruri + Data API).

### 12.6. `hubSections` (configurabilitate hub)
Anticipat: hub-uri diferite = layout-uri diferite (zboruri = rute populare + oferte;
croaziere = ghiduri + FAQ). Refactor:
```ts
hubSections: Array<'widget' | 'featured-articles' | 'popular-routes' | 'offers' | 'faq' | 'partners'>
```
Hub-ul devine renderer configurabil.
**Trigger:** al doilea hub cu structură vizibil diferită.

### 12.7. `seo` per verticală
Actual: `title = label`, `description = intro`. Ok pentru majoritatea.
Refactor: `seo?: {title: LocaleText; description: LocaleText}`.
**Trigger:** primul caz în care titlul SEO trebuie să difere de labelul afișat.

### 12.8. `/go/[partner]` — click tracking Worker
Anticipat: la 100+ linkuri de afiliere, tracking centralizat.
Cloudflare Worker `/go/discovercars?ref=article-x` log-uiește click + redirect.
Elimină dependența de dashboard-uri externe pentru analytics.
**Trigger:** când vrei „ce articole convertesc" fără să deschizi 5 dashboard-uri.

### 12.9. `AffiliateDisclosure` automat
Actual: pus manual. Risc de compliance la scară.
Refactor: apariție automată pe orice pagină cu CTA / widget de afiliere.
**Trigger:** primul audit compliance sau creștere peste ~20 articole.

### 12.10. Detecție automată de limbă (opțional)
Actual: `/` → `/ro` fix. Fără middleware (limitare OpenNext).
Refactor: dacă OpenNext acceptă cândva Edge middleware Next 16, se poate reintroduce detecția.
**Trigger:** OpenNext + Next roadmap să dea unda verde.

---

## 13. Ce urmează (roadmap)

**Făcut:** infrastructură completă, lansat pe plecari.com, hero duotone, 3 verticale monetizate
(asigurări/EKTA, eSIM/Airalo+Yesim, mașini/GetRentacar), Search Console pornit.

**Următorii pași (creștere, nu construcție):**
1. **Trafic** — Search Console pornit; date în 1-3 zile. Blocajul real (deblochează programele mari). Prioritate #1.
2. **Conținut pilon** — 3-4 articole per verticală (avem 2 pe asigurări, 1 pe restul).
3. **Poze de verticală** — `public/verticals/*.webp` (hero merge și fără).
4. **Versiuni EN** ale conținutului.
5. **2Performant / Profitshare** — piața RO (aplică 12.3-12.4).
6. **Data API + Supabase** — pagini cu prețuri auto-actualizate (aplică 12.5).

**De completat înainte de promovare intensă:**
- Placeholderele `[EMAIL DE CONTACT]`, `[OPERATOR]`, `[ADRESĂ]` în cele 8 pagini legale
- Finalizat Email Routing (`contact@plecari.com`)
- `timeZone` în layout (Europe/Bucharest)