# Plecări — Documentație tehnică a proiectului

> Portal de călătorii bilingv (RO/EN), generalist, monetizat prin afiliere.
> Document de referință: ce am construit, cum funcționează, și capcanele de evitat.
> Ultima actualizare: iulie 2026.

---

## 1. Ce este Plecări

Portal de travel **generalist** (nu axat pe o singură verticală). Verticale egale ca importanță:
zboruri, cazări, asigurări, croaziere, eSIM & roaming, închirieri auto, city breaks.

**Obiective:**
- Site genuin **util** (motoare de căutare / widget-uri, nu doar articole)
- Super **indexabil** SEO + optimizat pentru **citare de AI** (AI Overviews, ChatGPT, Perplexity)
- Monetizare prin **afiliere** (Travelpayouts ca agregator principal)

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

**Regulă de aur pe Windows:** dezvolți local cu `next dev` (merge perfect). Build-ul OpenNext
rulează DOAR în CI (Linux), niciodată local — OpenNext are probleme pe Windows.

---

## 3. Structura de foldere (cheie)

```
plecari/
├─ content/
│  ├─ articles/         # articole pe verticale (.mdx)
│  └─ pages/            # pagini statice: legale, despre etc. (.mdx)
├─ messages/
│  ├─ ro.json           # traduceri RO
│  └─ en.json           # traduceri EN
├─ src/
│  ├─ app/[locale]/
│  │  ├─ layout.tsx                 # layout rădăcină (html/body, fonturi, header/footer, providers)
│  │  ├─ page.tsx                   # homepage (hero + widget + verticale)
│  │  ├─ [vertical]/
│  │  │  ├─ page.tsx                # hub verticală (listă articole + slot widget)
│  │  │  └─ [slug]/page.tsx         # pagină articol
│  │  └─ legal/[slug]/page.tsx      # pagini legale
│  ├─ app/globals.css               # sistem de design + toate stilurile
│  ├─ app/sitemap.ts                # sitemap (gol dacă nu e indexabil)
│  ├─ app/robots.ts                 # robots (blochează tot dacă nu e indexabil)
│  ├─ components/                    # componente (vezi secțiunea 6)
│  ├─ config/
│  │  ├─ site.ts                    # SITE_URL, INDEXABLE, constante globale
│  │  └─ verticals.ts               # sursa unică pentru verticale (slug, label, desc, featured)
│  ├─ i18n/
│  │  ├─ routing.ts                 # locales, defaultLocale, localePrefix
│  │  ├─ request.ts                 # getRequestConfig (încarcă mesajele)
│  │  └─ navigation.ts              # Link, usePathname, useRouter localizate
│  └─ lib/
│     ├─ content.ts                 # re-export date Velite (articles, pages)
│     ├─ metadata.ts                # hreflang + canonical
│     ├─ schema.ts                  # generatoare JSON-LD
│     └─ consent.tsx                # context consimțământ cookies
├─ velite.config.ts                 # config Velite (colecțiile de conținut)
└─ next.config.ts                   # next-intl plugin + redirect / → /ro + OpenNext dev
```

---

## 4. i18n (next-intl) — cum funcționează

- **URL-uri cu prefix mereu:** `/ro/...` și `/en/...`. Default = `ro`.
- `[locale]` e segment dinamic; `generateStaticParams` pre-generează ro + en.
- `setRequestLocale(locale)` în fiecare pagină/layout → menține paginile **statice** (SSG).
- **NU folosim middleware/proxy** (vezi capcana din secțiunea 9). Redirectul `/` → `/ro`
  e făcut în `next.config.ts` prin `redirects()`.
- Linkuri interne: folosește `Link` din `@/i18n/navigation` (adaugă prefixul de limbă automat),
  NU `next/link`.
- Schimbarea limbii: `LanguageSwitcher` folosește `router.replace(pathname, {locale})`.

**Compromis acceptat:** fără middleware nu mai există detecție automată de limbă după browser.
Toți userii de la `/` merg pe `/ro`; EN se accesează prin switch sau direct din Google.

---

## 5. Conținut (Velite) — cum funcționează

**Două colecții** în `velite.config.ts`:
- `articles` — articolele pe verticale
- `pages` — pagini statice (legale etc.)

**Model de conținut (important):** corpul e **markdown → HTML compilat la build** (`s.markdown()`).
Elementele speciale sunt în **frontmatter**, nu în corp:
- `answer:` → paragraful-răspuns de sus (AnswerBox)
- `widget:` → scriptSrc-ul unui motor de căutare (opțional)
- `faq:` → listă de întrebări/răspunsuri (generează și schema FAQPage)
- tabelele de comparație = tabele markdown normale (`| ... |`), stilate automat

**De ce așa (NU MDX cu `s.mdx()`):** renderer-ul MDX folosea `new Function`, INTERZIS pe
Cloudflare Workers. Vezi capcana din secțiunea 9.

**Regulă:** după orice modificare în `velite.config.ts`, rulează `npx velite` ca să
regenerezi datele + tipurile. `dev` și `build` rulează velite automat.

### Cum adaugi un articol nou
1. Creezi `content/articles/nume-articol.ro.mdx`
2. Frontmatter: `title, description, locale, vertical, slug, datePublished, answer?, widget?, faq?`
3. Corpul: markdown curat (titluri `##`, tabele, liste)
4. `generateStaticParams` îl prinde automat → apare pe `/ro/{vertical}/{slug}`

---

## 6. Componente (src/components)

| Componentă | Rol |
|---|---|
| `Header.tsx` | Header responsive: marcă, nav verticale, hamburger mobil, switch limbă |
| `Footer.tsx` | Footer: brand, verticale, linkuri legale |
| `LanguageSwitcher.tsx` | Comută RO/EN păstrând pagina |
| `AnswerBox.tsx` | Paragraful-răspuns de sus (citat de AI) |
| `FAQ.tsx` | Bloc Q&A + injectează schema FAQPage |
| `Breadcrumbs.tsx` | Breadcrumb vizual + schema BreadcrumbList |
| `JsonLd.tsx` | Randează obiecte schema.org ca `<script ld+json>` |
| `AffiliateDisclosure.tsx` | Notă de conformitate afiliere (din traduceri) |
| `SearchWidget.tsx` | Wrapper widget afiliere: lazy-load + consent-gated |
| `CookieConsent.tsx` | Banner GDPR de consimțământ |

**Notă:** `MDXContent.tsx` a fost ȘTERS (folosea `new Function`).

---

## 7. SEO & citabilitate AI — cum funcționează

Toate băgate în componente, se aplică automat pe fiecare pagină:
- **schema.org** (`lib/schema.ts`): Article, FAQPage, BreadcrumbList, Organization
- **hreflang + canonical** (`lib/metadata.ts` → `getAlternates`)
- **sitemap.ts + robots.ts** — se activează singure când site-ul e indexabil
- **Conținut answer-first** (AnswerBox), titluri ca întrebări, tabele citabile, fapte atomice
- Conținut randat **în HTML de la server** (nu din JS) → indexabil fără execuție JS

**Comutatorul indexare:** în `src/config/site.ts`, `INDEXABLE` = `SITE_URL.includes('plecari.com')`.
- Pe workers.dev (dev) → noindex, sitemap gol, robots blochează tot
- Pe plecari.com → indexare permisă, sitemap populat, robots deschis
Practic: schimbi `SITE_URL` = o linie, tot restul se aliniază automat.

---

## 8. Monetizare (afiliere)

- **Travelpayouts** = agregator principal (un cont → zeci de branduri + widget-uri)
- Cont aprobat; ~29 programe active, restul se deblochează cu site public + review
- Marker afiliere: `shmarker=747505` (e în scriptul widget-ului)
- **Widget pe homepage:** Aviasales Flights Search Form (zboruri + hoteluri via Booking)
  - Pus în `HERO_WIDGET_SRC` din `app/[locale]/page.tsx`
  - Consent-gated: se încarcă doar după accept cookies

**Widget-urile vin de la Travelpayouts → Tools → Widgets.** Iei DOAR URL-ul din `src="..."`
al scriptului și îl pui în `HERO_WIDGET_SRC` sau în `widget:` din frontmatter-ul unui articol.

**Parteneri buni per verticală (din cont):**
- Închirieri auto: **DiscoverCars** (23–54%, cookie 365 zile!)
- Asigurări: **EKTA** (25%)
- eSIM: Airalo, Saily, GigSky, Yesim
- Cazări: Vio.com, Booking, Agoda
- Zboruri: Aviasales (40%)
- Croaziere: SEARADAR

**Tool-uri viitoare Travelpayouts:** Links API (linkuri în masă, la scară), Data API
(date de prețuri pentru conținut auto-actualizat prin cron — Faza 2).

---

## 9. CAPCANE REZOLVATE (foarte important — să nu le repetăm)

### 9.1. `new Function` interzis pe Cloudflare Workers
- **Simptom:** paginile de conținut dau Internal Server Error pe producție (merg pe local).
- **Cauză:** Workers blochează `new Function`/`eval` la runtime. Renderer-ul MDX îl folosea.
- **Fix:** conținutul se compilează markdown → HTML la build (`s.markdown()`), componentele
  speciale trec în frontmatter. Zero eval la runtime.
- **Regulă permanentă:** NU folosi biblioteci care fac `eval`/`new Function` la runtime.

### 9.2. Node middleware nesuportat de OpenNext
- **Simptom:** build CI pică cu „Node.js middleware is not currently supported".
- **Cauză:** Next 16 rulează `proxy.ts` pe runtime Node; OpenNext acceptă doar Edge.
- **Fix:** am ELIMINAT `proxy.ts` complet. next-intl merge fără middleware (avem
  `localePrefix: 'always'` + `generateStaticParams` + `setRequestLocale`). Redirect `/` → `/ro`
  făcut în `next.config.ts`.

### 9.3. Middleware redenumit în Next 16
- În Next 16, `middleware.ts` → `proxy.ts` (dar noi l-am eliminat oricum, vezi 9.2).

### 9.4. Import Velite prin cale relativă cu `.` (Turbopack)
- **Simptom:** „Module not found: Can't resolve '../../.velite'" în browser.
- **Fix:** alias în `tsconfig.json` → `"@velite/*": ["./.velite/*"]`, import din `@velite/index`.

### 9.5. Diacritice RO (ă, î, ș, ț) în fonturi
- Fonturile (Fraunces, Hanken Grotesk) trebuie încărcate cu `subsets: ['latin', 'latin-ext']`,
  altfel diacriticele apar ca tofu.

### 9.6. Stiluri care „nu se aplică"
- De obicei = cache Turbopack. Fix: `rm -rf .next` + restart `npm run dev` + hard refresh (Ctrl+Shift+R).

### 9.7. Tipuri MDX prea stricte
- `components?: Record<string, ComponentType>` respinge componente cu props → folosește
  `ComponentType<any>` pentru registrul de componente.

---

## 10. Deploy & domeniu

- **Build command în CI (Cloudflare):** `npx velite && npx opennextjs-cloudflare build`
- **Flux:** `git push` pe `main` → CI Linux → build → deploy. Branch secundar → preview.
- **URL dev:** `plecari.gheorghe-bardan.workers.dev` (pattern: `<worker>.<subdomeniu-cont>.workers.dev`)
- **Domeniu:** `plecari.com` atașat ca Custom Domain pe Worker; `www.plecari.com` → redirect 301
  la non-www (regulă „Redirect from WWW to root" + CNAME `www` proxied).
- **Email:** Cloudflare Email Routing → `contact@plecari.com` forward la Gmail (de finalizat).

---

## 11. Design (sistem vizual)

**Direcție:** editorial cald, distinctiv (NU aspect generic de AI).
- **Paletă pământie:** cremă `#FBF6EE`, teracotă `#C15540`, teal `#1F5E56`, ochre `#E0A22B`, ink `#2B2018`
- **Tipografie:** Fraunces (titluri, serif cald) + Hanken Grotesk (text)
- Toate tokenurile în `:root` din `globals.css`; componentele folosesc `var(--...)`
- Responsive: header cu hamburger sub 880px, grid-uri fluide

---

## 12. Ce urmează (roadmap)

**Făcut:** infrastructură completă, lansat pe plecari.com, primul widget live cu tracking.

**Următorii pași (creștere, nu construcție):**
1. **Widget-uri + ghiduri pe verticale** — fiecare verticală: motor de căutare + articol citabil
   (prioritar: închirieri auto/DiscoverCars, asigurări/EKTA, eSIM)
2. **Conținut pilon** — articole SEO serioase, answer-first
3. **Rafinare hero + homepage** — pass vizual „modern"
4. **Versiuni EN** ale conținutului (când extinzi internațional)
5. **Google Search Console** — trimite sitemap, pornește indexarea
6. **Faza 2:** Data API Travelpayouts pentru conținut cu prețuri auto-actualizate (cron)

**De completat înainte de promovare intensă:**
- Placeholderele `[EMAIL DE CONTACT]`, `[OPERATOR]`, `[ADRESĂ]` în cele 8 pagini legale (RO+EN)
- `timeZone` în layout (acum UTC → Europe/Bucharest, când afișezi date)
- Dezactivat ruta publică workers.dev (opțional, curățenie)