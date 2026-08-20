# Plecări.com — Analiză completă & Strategie de conținut

**Data analizei:** 20 august 2026
**Scop:** Audit complet al proiectului, identificarea gap-urilor, plan de 30+ articole noi, roadmap de dezvoltare

---

## 1. STAREA ACTUALĂ A PROIECTULUI — Snapshot

### Inventar de conținut

| Metric | Valoare |
|---|---|
| **Total articole** | **298** |
| Articole RO | 152 |
| Articole EN | 146 |
| Dimensiune totală conținut RO | 2.3 MB (~2376 KB) |
| Dimensiune totală conținut EN | 2.6 MB (~2683 KB) |
| Media per articol RO | 15.6 KB |
| Media per articol EN | 18.4 KB |
| Pagini legale | 10 (5 RO + 5 EN) |
| Verticale active | 8 |

### Verticale configurate

| # | Verticală | Slug | Featured | Widget | CTA-uri |
|---|---|---|---|---|---|
| 1 | Zboruri | `zboruri` | ✅ | Kiwi Search | Compensair, AirHelp |
| 2 | Cazări | `cazari` | ✅ | — | — |
| 3 | Asigurări | `asigurari` | ✅ | — | EKTA |
| 4 | Croaziere | `croaziere` | ❌ | — | CruiseDirect (×2) |
| 5 | eSIM & Roaming | `esim-roaming` | ❌ | Airalo | Airalo, Yesim, Saily |
| 6 | Închirieri auto | `inchirieri-auto` | ❌ | — | GetRentacar |
| 7 | City breaks | `city-breaks` | ❌ | — | — |
| 8 | Experiențe | `experiente` | ❌ | — | GetYourGuide |

### Integrări afiliere active

- **Travelpayouts** (marker 747505) — Aviasales/Kiwi (zboruri), Airalo (eSIM), Yesim, Saily, GetRentacar, EKTA (asigurări), Compensair, AirHelp
- **CJ Affiliate** — Booking.com CEE (deeplink integrat în componenta BookingWidget, comision 4% cazări / €2 zboruri, session-based)
- **CruiseDirect** (prin CJ) — linkuri directe
- **GetYourGuide** — experiențe (partner_id EKAA80H)

### Infrastructura tehnică

- **Stack:** Next.js 16 + Velite (conținut) + Tailwind v4 + Cloudflare Workers
- **Deploy:** Cloudflare Workers Builds (git push → build Linux → deploy)
- **Domeniu:** plecari.com (Cloudflare Registrar)
- **SEO:** Schema.org (Article, FAQ, Breadcrumb, Organization), hreflang, sitemap, robots, llms.txt
- **INDEXABLE:** activat (SITE_URL = plecari.com)
- **BookingWidget:** integrat cu Booking.com via CJ deeplink, afișare automată per bookingCity din frontmatter

---

## 2. ANALIZA CRITICĂ — CE MERGE BINE ȘI CE NU

### ✅ Puncte forte

1. **Volum impresionant:** 298 articole în ~6 săptămâni e un ritm foarte bun
2. **Acoperire bilingvă solidă:** raport RO/EN aproape 1:1
3. **Ghiduri de destinație ample:** Italia (Florența 35KB, Veneția 32KB, Coasta Amalfi 31KB), Balcani (Sarajevo, Zagreb, Belgrad 20KB+), Nordice, Baltice — toate cu perechi RO+EN
4. **Diversificare verticale:** 8 verticale acoperă întregul funnel de călătorie
5. **SEO tehnic solid:** schema, hreflang, llms.txt, answer-first, FAQ
6. **Monetizare multi-strat:** Booking deeplink, GetYourGuide, Travelpayouts, CruiseDirect — 5+ comisioane posibile per cititor

### ⚠️ Probleme identificate

#### A. Articole THIN (sub 8KB) — 30 RO + 3 EN = 33 articole subțiri

Acestea sunt articolele care riscă să fie considerate **thin content** de Google, mai ales pe un site nou. Cele mai critice:

| Articol | Dimensiune | Problema |
|---|---|---|
| `asigurare-calatorie-ghid.ro` | **2.1 KB** | ❌ Extrem de subțire — e marcat ca PILON dar are doar 3 paragrafe |
| `acte-necesare-inchiriere-masina.ro` | 5.0 KB | Prea scurt pentru un ghid practic complet |
| `card-european-vs-asigurare-calatorie.ro` | 5.1 KB | Comparația merită mult mai mult detaliu |
| `esim-vs-roaming.ro` | 5.2 KB | Topic esențial tratat superficial |
| `ce-sa-faci-in-viena.ro` | 5.9 KB | Viena = destinație majoră, articolul e de 3x mai mic decât echivalentele |
| `grecia-2026-ghid-vacanta.ro` | 6.0 KB | Grecia = cel mai căutat topic RO, articolul e minuscul |
| `drepturi-pasager-zbor-intarziat.ro` | 6.3 KB | Topic cu potențial SEO enorm, tratat minimal |
| `ce-sa-faci-in-paris.ro` | 7.2 KB | Paris = cea mai căutată destinație, articolul e de 4x mai mic decât Cracovia |
| `ce-sa-faci-in-roma.ro` | 8.0 KB | Roma la fel — vs. Cracovia (28KB) sau Sevilla (27KB) |
| `ce-sa-faci-in-barcelona.ro` | 7.8 KB | Barcelona — aceeași problemă |
| `ce-sa-faci-in-atena.ro` | 7.6 KB | Atena — la fel |
| `ce-sa-faci-in-budapesta.ro` | 7.8 KB | Budapesta — la fel |
| `ce-sa-faci-in-istanbul.ro` | 8.8 KB | Istanbul — la fel |

**Concluzie:** Cele mai populare destinații (Paris, Roma, Barcelona, Viena, Atena, Budapesta, Istanbul) au articole de 3-5x mai mici decât destinațiile secundare (Cracovia 28KB, Sevilla 27KB, Gdansk 26KB). **Asta e inversul a ceea ce ar trebui.**

#### B. Dezechilibru masiv la "ce-sa-faci" — capitolele mari RO vs. mici

Unele "ce-sa-faci" au fost rescrise amplu (Berlin 24KB, Cracovia 28KB, Lisabona 24KB, Porto 24KB, Sevilla 27KB, Sofia 24KB, Verona 28KB), dar top destinații rămân subțiri. Perechile EN (things-to-do) au aceeași problemă — Vienna 7.3KB vs. Krakow 26.5KB.

#### C. Verticale slab acoperite

| Verticală | Nr. articole RO (estimat) | Problema |
|---|---|---|
| **Cazări** | ~3-4 | Extrem de slab. Ai Booking integrat dar aproape zero conținut dedicat cazărilor |
| **Croaziere** | ~6 | Sub-exploatat — e diferențiatorul tău conform planului! |
| **Închirieri auto** | ~4 | Minimal |
| **Experiențe** | ~5-6 (doar "ce-sa-faci") | Lipsă articole tematice (food tours, aventură, culturale) |

#### D. Perechi RO-EN lipsă (articole doar într-o limbă)

**RO fără EN:**
- `ai-turism-imagini-false-2026` — topic actual, merită EN
- `bilete-vatican-colosseum-epuizate-last-minute` — relevant EN
- `cele-mai-bune-aplicatii-calatorie-2026` — evergreen
- `cum-planifici-vacanta-ghid-pas-cu-pas` — universal
- `cum-platesti-strainatate-fara-comisioane` — relevant EN
- `formula-1-europa-2026-grand-prix` — are EN dar dimensiuni diferite
- `israel-2026-ghid-calatorie` — nișă
- `rusia-2026-ghid-calatorie-romani` — nișă specifică RO
- `turism-sportiv-meci-fotbal-europa` — relevant EN
- `ucraina-2026-ghid-calatorie` — nișă specifică RO
- Majoritatea ghidurilor de destinație (`lacul-como`, `coasta-amalfi`, `drumul-romantic-germania`) — ample, fără EN

**EN fără RO:**
- `bulgaria-holiday-guide-2026` — NU are RO!
- `egypt-holiday-guide-2026` — NU are RO!
- `moldova-wine-tours-guide` — NU are RO!
- `old-orhei-complete-guide` — NU are RO!
- `transnistria-complete-guide` — NU are RO!
- `interrail-europe-2026-complete-guide` — topic excelent, lipsește RO

#### E. Verticală "Cazări" — aproape goală

Verticala `cazari` e featured (apare pe homepage) dar are aproape zero conținut dedicat. Articolul `cum-gasesti-cazare-ieftina.ro` (17KB) e singurul solid. Lipsesc complet:
- Ghiduri pe tipuri de cazare (hosteluri, Airbnb, apartamente, glamping)
- Topuri pe zone (cazări Brașov, litoral, Delta, munte)
- Comparații platforme (Booking vs Airbnb vs Travelminit)
- Sezonale (cazări litoral 2027, cazări munte iarnă)

---

## 3. PLAN DE 30+ ARTICOLE NOI + RESCRISE

### Prioritate 1: RESCRIERE articole thin pe destinații majore (10 articole)

Acestea sunt articole existente care trebuie rescrise complet la standard amplu (20-30KB), cu tabele de prețuri, secțiuni detaliate, FAQ extinse, bookingCity, gygQuery, seoOffer. E cea mai mare victorie SEO — transformi pagini subțiri în pagini pillar.

| # | Articol de rescris | De la | Target | Limbă | Verticală |
|---|---|---|---|---|---|
| **R1** | `ce-sa-faci-in-paris.ro` | 7.2 KB | 25-30 KB | RO | experiente |
| **R2** | `ce-sa-faci-in-roma.ro` | 8.0 KB | 25-30 KB | RO | experiente |
| **R3** | `ce-sa-faci-in-barcelona.ro` | 7.8 KB | 25-30 KB | RO | experiente |
| **R4** | `ce-sa-faci-in-viena.ro` | 5.9 KB | 25-30 KB | RO | experiente |
| **R5** | `ce-sa-faci-in-atena.ro` | 7.6 KB | 20-25 KB | RO | experiente |
| **R6** | `ce-sa-faci-in-budapesta.ro` | 7.8 KB | 25-30 KB | RO | experiente |
| **R7** | `ce-sa-faci-in-istanbul.ro` | 8.8 KB | 25-30 KB | RO | experiente |
| **R8** | `ce-sa-faci-in-praga.ro` | 8.4 KB | 25-30 KB | RO | experiente |
| **R9** | `grecia-2026-ghid-vacanta.ro` | 6.0 KB | 20-25 KB | RO | city-breaks |
| **R10** | `asigurare-calatorie-ghid.ro` | 2.1 KB | 15-20 KB | RO | asigurari |

### Prioritate 2: ARTICOLE NOI — Verticala CAZĂRI (5 articole)

Verticala e goală și trebuie populată urgent — e featured pe homepage.

| # | Titlu propus | Slug | Limbă | Dimensiune target | Monetizare |
|---|---|---|---|---|---|
| **N1** | Cele mai bune cazări din Brașov 2027 — hoteluri, pensiuni, apartamente | `cele-mai-bune-cazari-brasov-2027` | RO | 20-25 KB | Booking deeplink |
| **N2** | Booking vs Airbnb vs Travelminit — unde rezervi în România | `booking-vs-airbnb-vs-travelminit` | RO | 18-22 KB | Booking + Travelminit |
| **N3** | Cazări cu ciubăr în România — top 20 pensiuni romantice | `cazari-cu-ciubuc-romania-top-pensiuni` | RO | 20-25 KB | Booking deeplink |
| **N4** | Cazare litoralul românesc 2027 — Mamaia, Vama Veche, Eforie | `cazare-litoral-romanesc-2027` | RO | 20-25 KB | Booking + Travelminit |
| **N5** | Cele mai frumoase hoteluri boutique din Europa sub 100€/noapte | `hoteluri-boutique-europa-sub-100-euro` | RO | 22-28 KB | Booking deeplink |

### Prioritate 3: ARTICOLE NOI — Verticala CROAZIERE (5 articole)

Diferențiatorul tău principal, conform planului de business. Trebuie consolidat masiv.

| # | Titlu propus | Slug | Limbă | Dimensiune target | Monetizare |
|---|---|---|---|---|---|
| **N6** | Croaziere pe Dunăre 2027 — de la Viena la Delta, itinerarii complete | `croaziere-dunare-2027-ghid-complet` | RO | 22-28 KB | CruiseDirect |
| **N7** | Ce să împachetezi pentru o croazieră — checklist complet | `ce-sa-impachetezi-croaziera-checklist` | RO | 15-20 KB | CruiseDirect + EKTA |
| **N8** | Croaziere din Constanța și Atena — pachet cu zbor din România | `croaziere-constanta-atena-zbor-romania` | RO | 20-25 KB | CruiseDirect + Aviasales |
| **N9** | Cele mai bune cabine pe navele MSC — ghid alegere | `cele-mai-bune-cabine-msc-ghid` | RO | 18-22 KB | CruiseDirect |
| **N10** | Mediterranean Cruises from Romania — Complete Booking Guide | `mediterranean-cruises-from-romania` | EN | 25-30 KB | CruiseDirect + Aviasales |

### Prioritate 4: ARTICOLE NOI — Destinații lipsă & tematice ample (10 articole)

| # | Titlu propus | Slug | Limbă | Dimensiune target | Verticală |
|---|---|---|---|---|---|
| **N11** | Interrail Europa 2027 — ghid complet, rute, prețuri, sfaturi | `interrail-europa-2027-ghid-complet` | RO | 25-30 KB | zboruri (transport) |
| **N12** | Ghid litoral Bulgaria 2027 — Sunny Beach, Sozopol, Nessebar | `litoral-bulgaria-2027-ghid-complet` | RO | 22-28 KB | city-breaks |
| **N13** | Vacanță Egipt 2027 — ghid complet all-inclusive, prețuri, sfaturi | `vacanta-egipt-2027-ghid-complet` | RO | 22-28 KB | city-breaks |
| **N14** | Road trip Grecia cu mașina din România — trasee, costuri, ferry | `road-trip-grecia-masina-romania` | RO | 25-30 KB | inchirieri-auto |
| **N15** | Cele mai bune aplicații de călătorie 2027 — ghid actualizat | `aplicatii-calatorie-2027-ghid` | RO | 18-22 KB | zboruri |
| **N16** | Weekend prelungit în Europa — 15 destinații la 2-3 ore zbor | `weekend-prelungit-europa-destinatii` | RO | 22-28 KB | city-breaks |
| **N17** | Dubrovnik ghid complet 2027 — Game of Thrones, plaje, costuri | `dubrovnik-ghid-complet-2027` | RO | 25-30 KB | city-breaks |
| **N18** | Amsterdam ghid complet — muzee, canale, biciclete și coffeeshops | `amsterdam-ghid-complet-2027` | RO | 25-30 KB | city-breaks |
| **N19** | Ghid vacanță Muntenegru 2027 — Budva, Kotor, Tivat | `vacanta-muntenegru-2027-ghid-complet` | RO | 22-28 KB | city-breaks |
| **N20** | Top 10 experiențe food tours în Europa — ghid gastro-turism | `food-tours-europa-top-experiențe` | RO | 20-25 KB | experiente |

### Prioritate 5: ARTICOLE NOI — Articole tematice evergreen cu potențial SEO mare (10 articole)

| # | Titlu propus | Slug | Limbă | Dimensiune target | Verticală |
|---|---|---|---|---|---|
| **N21** | Cum să călătorești cu animalul de companie în Europa — reguli 2027 | `calatorii-animal-companie-europa-reguli` | RO | 18-22 KB | zboruri |
| **N22** | Cele mai bune carduri bancare pentru călătorii — Revolut, Wise, N26 | `carduri-bancare-calatorii-revolut-wise` | RO | 20-25 KB | zboruri |
| **N23** | Vacanță cu buget mic — cum să mergi în Europa sub 500€/persoană | `vacanta-buget-mic-europa-sub-500-euro` | RO | 22-28 KB | cazari |
| **N24** | Glamping în România 2027 — cele mai bune locuri | `glamping-romania-2027-cele-mai-bune` | RO | 18-22 KB | cazari |
| **N25** | Ghid complet Schengen — viză, reguli, documente 2027 | `ghid-schengen-viza-reguli-documente` | RO | 20-25 KB | zboruri |
| **N26** | Delta Dunării — ghid complet, pensiuni, trasee, prețuri | `delta-dunarii-ghid-complet-2027` | RO | 25-30 KB | cazari |
| **N27** | Cele mai sigure țări pentru călătorit solo ca femeie | `calatorit-solo-femeie-tari-sigure` | RO | 20-25 KB | city-breaks |
| **N28** | Ghid complet aeroport Otopeni — parkinguri, transferuri, duty free | `aeroport-otopeni-ghid-complet` | RO | 18-22 KB | zboruri |
| **N29** | Best Time to Visit Romania — Month by Month Travel Guide | `best-time-visit-romania-month-guide` | EN | 22-28 KB | city-breaks |
| **N30** | Romania Travel Budget — How Much Does a Holiday Cost | `romania-travel-budget-cost-guide` | EN | 20-25 KB | city-breaks |

### BONUS: Perechi EN lipsă (traduceri de articole RO ample deja existente) — 5 articole

| # | Articol RO existent | Articol EN de creat | Dimensiune RO |
|---|---|---|---|
| **T1** | `drumul-romantic-germania-castele-ludwig.ro` (33KB) | `romantic-road-germany-castles-ludwig.en` | ✅ Există deja |
| **T2** | `coasta-amalfi-ghid-complet-2026.ro` (31KB) | `amalfi-coast-complete-guide-2026.en` | ✅ Există deja |
| **T3** | `lacul-como-ghid-complet-2026.ro` (27KB) | `lake-como-complete-guide-2026.en` | ✅ Există deja |
| **T4** | `toscana-rurala-ghid-complet-2026.ro` (27KB) | `tuscany-rural-complete-guide-2026.en` | ✅ Există deja |
| **T5** | `sicilia-ghid-complet-2026.ro` (26KB) | `sicily-complete-guide-2026.en` | ✅ Există deja |

*(La verificare, perechile Italia sunt deja traduse — bine! Concentrează-te pe cele care NU au pereche EN.)*

---

## 4. ORDINE DE EXECUȚIE RECOMANDATĂ

### Sprint 1 (Săptămâna 1-2): Rescriere thin content pe destinații majore
**De ce primele:** Aceste pagini există deja, sunt indexate, dar performează slab din cauza dimensiunii. Rescrierea lor e cea mai rapidă victorie SEO — Google vede actualizare de conținut pe URL-uri existente.

1. **R1** — Paris (cea mai căutată destinație RO)
2. **R2** — Roma
3. **R3** — Barcelona
4. **R4** — Viena
5. **R5** — Atena

### Sprint 2 (Săptămâna 3-4): Completare thin + cazări
6. **R6** — Budapesta
7. **R7** — Istanbul
8. **R8** — Praga
9. **R10** — Asigurare ghid (pilonul vertical)
10. **N1** — Cazări Brașov
11. **N2** — Booking vs Airbnb vs Travelminit

### Sprint 3 (Săptămâna 5-6): Croaziere + cazări
12. **N3** — Cazări cu ciubăr (long-tail RO)
13. **N4** — Litoral românesc 2027
14. **N6** — Croaziere Dunăre
15. **N7** — Checklist croazieră
16. **N8** — Croaziere Constanța/Atena

### Sprint 4 (Săptămâna 7-8): Destinații noi + tematice
17. **N11** — Interrail
18. **N12** — Litoral Bulgaria 2027
19. **N14** — Road trip Grecia
20. **N16** — Weekend prelungit Europa
21. **N17** — Dubrovnik complet

### Sprint 5 (Săptămâna 9-10): Evergreen + EN
22. **N22** — Carduri bancare călătorii
23. **N26** — Delta Dunării
24. **N28** — Aeroport Otopeni
25. **N29** — Best Time to Visit Romania (EN)
26. **N30** — Romania Travel Budget (EN)

### Sprint 6 (Săptămâna 11-12): Rest
27-35. Restul articolelor (N5, N9, N10, N13, N15, N18-N21, N23-N25, N27)

---

## 5. ARTICOLE THIN RĂMASE — De rescris în paralel

Pe lângă planul de 30+, aceste articole trebuie **expandate** la minim 12-15KB fiecare, pe rând:

| Articol | Dimensiune actuală | Prioritate |
|---|---|---|
| `asigurare-calatorie-ghid.ro` | 2.1 KB | 🔴 Critică |
| `acte-necesare-inchiriere-masina.ro` | 5.0 KB | 🟡 Mare |
| `card-european-vs-asigurare-calatorie.ro` | 5.1 KB | 🟡 Mare |
| `esim-vs-roaming.ro` | 5.2 KB | 🟡 Mare |
| `drepturi-pasager-zbor-intarziat.ro` | 6.3 KB | 🟡 Mare |
| `taxe-ascunse-inchiriere-auto.ro` | 6.3 KB | 🟡 Mare |
| `escapade-weekend-romania-2026.ro` | 6.5 KB | 🟡 Mare |
| `cum-gasesti-bilete-avion-ieftine.ro` | 6.7 KB | 🟡 Mare |
| `asigurare-viza-schengen.ro` | 6.8 KB | 🟡 Mare |
| `cum-instalezi-esim.ro` | 6.9 KB | 🟡 Mare |
| `transfer-aeroport-ghid.ro` | 6.9 KB | 🟡 Mare |
| `bagaj-pierdut-companie-aeriana.ro` | 6.9 KB | 🟡 Mare |
| `asigurare-schi-munte.ro` | 6.6 KB | 🟡 Mare |
| `asigurare-calatorie-copii.ro` | 7.1 KB | 🟢 Medie |
| `saily-esim-comparatie.ro` | 7.1 KB | 🟢 Medie |
| `cum-platesti-strainatate.ro` | 7.2 KB | 🟢 Medie |
| `bagaj-mana-dimensiuni-reguli.ro` | 7.3 KB | 🟢 Medie |
| `vacanta-turcia-2026.ro` | 7.5 KB | 🟢 Medie |
| `cel-mai-bun-esim-per-destinatie.ro` | 7.8 KB | 🟢 Medie |
| `istanbul-city-break-ghid.ro` | 7.8 KB | 🟢 Medie |
| `ai-turism-imagini-false.ro` | 7.8 KB | 🟢 Medie |

---

## 6. ANALIZĂ VERTICALE — Ce lipsește pe fiecare

### 🛫 Zboruri (verticala cea mai activă)
**Ce ai:** bilete ieftine, bagaje, drepturi pasager, zbor cu escală, compensații, zboruri populare din BUH
**Ce lipsește:**
- Ghid aeroport Otopeni complet (parkinguri, transfer, lounge, duty free)
- Low-cost vs. companii tradiționale — când merită fiecare
- Cum funcționează programele de miles/puncte (Blue Air Club, Wizz Discount Club)
- Ghid Ryanair/Wizz Air — bagaje, check-in, capcane
- Zboruri charter vs. de linie — avantaje/dezavantaje

### 🏨 Cazări (cea mai subțire verticală — URGENTĂ)
**Ce ai:** doar `cum-gasesti-cazare-ieftina` (17KB) și câteva mențiuni tangențiale
**Ce lipsește COMPLET:**
- Topuri cazări pe zone românești (Brașov, litoral, Delta, munte, balnear)
- Comparații platforme (Booking vs Airbnb vs Travelminit)
- Cazări tematice (ciubăr, piscină interioară, pet-friendly, romantice)
- Ghid Travelminit — cum folosești cardul de vacanță
- Glamping România
- Cele mai frumoase hoteluri boutique din Europa
- Cum verifici recenziile false pe Booking/Airbnb

### 🛡️ Asigurări (bine acoperită, dar pilon slab)
**Ce ai:** 7 articole RO + 6 EN — acoperire decentă
**Problema principală:** `asigurare-calatorie-ghid.ro` — PILONUL vertical — are doar 2.1KB. E de 6x mai mic decât sateliții săi.
**Ce lipsește:**
- Pilon rescris amplu (cu comparații reale EKTA vs SafetyWing vs Heymondo)
- Asigurare pentru sporturi extreme / aventură
- Ce faci când se întâmplă ceva — ghid pas-cu-pas de utilizare a asigurării

### 🚢 Croaziere (DIFERENȚIATORUL — sub-exploatat!)
**Ce ai:** 6 articole RO + 4 EN — sub potențial
**Ce lipsește critic:**
- Croaziere pe Dunăre (piață enormă, competiție mică RO)
- Checklist bagaje croazieră
- Croaziere din România (Constanța/Atena cu zbor)
- Ghid cabine MSC (ai experiență reală!)
- Croaziere pentru familii — ce companie alegi
- Croaziere Last Minute — cum găsești oferte
- Norwegian vs Royal Caribbean vs MSC vs Costa — comparație completă (EN)
- Cruise packing list (EN)
- Greek Islands Cruise guide extins (ai unul dar e 10KB)

### 📱 eSIM & Roaming (acoperire OK)
**Ce ai:** 5 RO + 4 EN — subiect acoperit decent
**Ce lipsește:**
- Comparație completă Airalo vs Saily vs Yesim vs Holafly (tabel cu prețuri)
- eSIM per destinație specifică (Turcia, Egipt, Grecia — popular)
- WiFi calling — cum funcționează cu eSIM

### 🚗 Închirieri auto (acoperire minimă)
**Ce ai:** 4 RO + 3 EN
**Ce lipsește:**
- Road trip Grecia cu mașina (super popular RO)
- Ghid complet închiriere mașină — tot ce trebuie să știi
- Top rute europene cu mașina din România
- Închiriere mașină Italia — capcane și sfaturi

### 🏙️ City breaks (cea mai mare verticală ca articole)
**Ce ai:** Excelent — zeci de ghiduri de destinație
**Ce lipsește:**
- Destinații RO interne (Delta Dunării, Maramureș, Bucovina)
- Ghid complet Amsterdam (rescris amplu)
- Dubrovnik ghid complet (ai doar un city-break scurt)
- Weekend prelungit — topuri cu destinații noi

### 🎭 Experiențe (acoperire prin "ce-sa-faci")
**Ce ai:** Experiențele sunt distribute prin city guides
**Ce lipsește:**
- Food tours tematice Europa (top experiențe)
- Cele mai bune tururi gratuite (free walking tours) din Europa
- Experiențe extreme/aventură (bungee, paragliding, rafting)

---

## 7. DEZVOLTĂRI VIITOARE ALE PROIECTULUI — Roadmap tehnic

### Trimestrul 4 2026 (septembrie-decembrie)

#### 7.1 Conținut & SEO
- [ ] Rescriere cele 10 articole thin pe destinații majore (Sprint 1-2)
- [ ] Populare verticală Cazări cu minim 5 articole ample
- [ ] Consolidare verticală Croaziere cu 5 articole noi
- [ ] Scrie ACUM conținut pentru litoral/vară 2027 (indexarea durează luni)
- [ ] Actualizare date în articolele din iulie (prețuri, disponibilitate)

#### 7.2 Tehnic
- [ ] **Pagini programatice pilot:** 20-30 rute de zbor din BUH/CLJ cu date din API Travelpayouts
- [ ] **Widget Booking pe verticala cazări:** search widget dedicat (nu doar deeplink-uri)
- [ ] **Newsletter setup** (Brevo/Resend) — formular pe homepage + hub-uri verticale
- [ ] **Pinterest auto-posting** — OG images → pin-uri automate per articol nou
- [ ] **Componenta de comparație prețuri:** tabel interactiv pentru asigurări și eSIM
- [ ] **Search intern** — pare că ai /search dar verifică dacă funcționează bine
- [ ] **Link intern automatizat** — script care adaugă link-uri contextuale între articole din aceeași verticală

#### 7.3 Monetizare
- [ ] Aplică la **2Performant** → Travelminit, Vola.ro
- [ ] Aplică la **Awin** (cu trafic demonstrabil)
- [ ] Negociază acord de lead-uri cu agenție de croaziere (conform plan)
- [ ] Tracking intern `/go/[partner]` — redirect Worker cu logging

### Trimestrul 1 2027 (ianuarie-martie) — SEZONUL DE BOOKING ⭐

#### 7.4 Conținut sezonier
- [ ] "Unde zbori ieftin în 2027" — articol-magnet actualizat săptămânal
- [ ] Early booking litoral 2027 — ghid complet
- [ ] Croaziere mediterana vară 2027 — oferte și itinerarii
- [ ] City break-uri de primăvară — Paște, 1 Mai
- [ ] Actualizare TOATE ghidurile de destinație cu prețuri 2027

#### 7.5 Tehnic
- [ ] Scalare pagini programatice la 100-300 (rute, cazări long-tail)
- [ ] Cron zilnic prețuri + deploy hook
- [ ] Optimizare CTR pe paginile cu impresii dar CTR slab (GSC data)
- [ ] A/B test titluri meta pe top 20 pagini

#### 7.6 Diversificare trafic
- [ ] Pinterest — minim 3 boards active (city breaks, croaziere, România)
- [ ] Facebook — share util în grupuri de călătorii RO
- [ ] Newsletter săptămânal cu oferte (automatizat)

### Trimestrul 2 2027 (aprilie-iunie)

#### 7.7 Consolidare
- [ ] Analiza 12 luni de date — care verticală convertește? Realocă 70% din efort acolo
- [ ] Link building serios pe paginile care fac bani
- [ ] Investiție din profit: tool SEO (Keysearch ~17$/lună)
- [ ] Decizie PFA/SRL dacă veniturile sunt constante (100€+/lună)
- [ ] Eventual content freelancer pentru EN

### Anul 2 (2027-2028) — Scală

#### 7.8 Features avansate
- [ ] **ISR** (dacă treci de 300+ pagini) via @opennextjs/cloudflare
- [ ] **Supabase** pentru cache prețuri și tracking conversii
- [ ] **Comparator de zboruri propriu** (beyond widget) — rich snippets
- [ ] **Pagini de oferte** actualizate automat din API
- [ ] **User accounts** (favorite, alerte de preț) — dacă traficul justifică
- [ ] **Vertical "Activități/Things to Do"** — pagini programatice per oraș cu GYG API
- [ ] **Schema TravelAction** pe paginile programatice
- [ ] **AMP sau Instant Articles** — dacă traficul mobile e dominant

---

## 8. STRATEGIA SEO PE TERMEN LUNG

### 8.1 Pillar & Cluster — Status și completare

| Cluster | Pilon | Sateliți existenți | Sateliți de adăugat |
|---|---|---|---|
| **Croaziere** | `ghid-croaziere-mediterana` (12.9KB — de amplificat) | MSC vs Costa, Prima croazieră, Cât costă, Insulele grecești | Dunăre, Checklist, Cabine MSC, Constanța/Atena, Familii |
| **Asigurări** | `asigurare-calatorie-ghid` (2.1KB — ❌ RESCRIE) | Copii, Schi, Schengen, Anulare, Card european, Ghid 2026 | Sporturi extreme, Cum folosești polița |
| **City breaks** | `top-city-break-uri-din-bucuresti` (19KB ✅) | ~30 ghiduri destinații | Amsterdam, Dubrovnik, Muntenegru, Weekend prelungit |
| **eSIM** | `cel-mai-bun-esim-per-destinatie` (7.8KB — de amplificat) | Instalare, vs Roaming, Copii, Saily | Comparație completă, WiFi calling, Per destinație specifică |
| **Închirieri** | Lipsă pilon! | Acte, Fără card credit, Grecia, Taxe ascunse | Road trip Grecia, Ghid complet, Rute europene |
| **Cazări** | `cum-gasesti-cazare-ieftina` (17.8KB ✅) | Aproape nimic | 5+ articole noi (vezi plan) |
| **Zboruri** | `cum-gasesti-bilete-avion-ieftine` (6.7KB — de amplificat) | Bagaje, Drepturi, Escală, Compensații | Aeroport Otopeni, Ryanair/Wizz, Miles |

### 8.2 Strategia de link building

**Gratuit, primele 6 luni:**
1. Directoare travel RO (TripAdvisor forum, FunTravelBlog, CalatorUsor etc.)
2. Guest posts pe bloguri de travel RO — oferi audit SEO gratuit
3. Parteneriat jinfotours (link contextual)
4. Pinterest (trafic direct + semnale sociale)
5. Comunități Facebook (share util, nu spam)
6. HARO/Connectively pe EN (mentiuni de presă)

**Cu investiție minimă, după luna 6:**
7. Colaborări cu travel bloggers RO (schimb de linkuri/content)
8. Infografice shareable (costul vieții per destinație, harta eSIM, sezonalitate)
9. Răspunsuri pe Quora/Reddit per articolele EN

### 8.3 Strategia de citabilitate AI

Proiectul e deja bine poziționat cu:
- AnswerBox pe fiecare articol
- FAQ structurate
- Tabele cu date concrete
- llms.txt implementat
- robots.txt care permite GPTBot, PerplexityBot, ClaudeBot

**De adăugat:**
- Definiții concise în primele 2-3 propoziții (format "X este Y care Z")
- Mai multe tabele comparative cu date numerice citabile
- Secțiuni "TL;DR" sau "Pe scurt" la articolele de 20KB+

---

## 9. KPI-URI ȘI MILESTONES

### Milestone-uri de conținut

| Deadline | Target |
|---|---|
| 15 sept 2026 | Toate cele 10 articole thin rescrise la 20KB+ |
| 30 sept 2026 | Verticala Cazări are minim 5 articole ample |
| 31 oct 2026 | Verticala Croaziere are minim 10 articole |
| 30 nov 2026 | Total articole: 350+ |
| 31 dec 2026 | Conținut litoral/vară 2027 indexat |
| 28 feb 2027 | Total articole: 400+ |

### Milestone-uri trafic (estimate realiste)

| Perioadă | Vizite/lună | Comisioane/lună |
|---|---|---|
| Sept 2026 | 1.000-3.000 | 0-20 € |
| Dec 2026 | 3.000-8.000 | 20-80 € |
| Mar 2027 (sezon booking) | 8.000-20.000 | 80-300 € |
| Iun 2027 | 15.000-40.000 | 200-600 € |
| Dec 2027 | 30.000-80.000 | 500-1.500 € |

### KPI-uri săptămânale de urmărit

1. **Pagini indexate** (GSC) — target: >80% din publicate
2. **Click-uri organice** — trend crescător săptămânal
3. **Click-uri afiliate** — tracking intern `/go/[partner]`
4. **Articole publicate** — minim 4/săptămână
5. **Articole rescrise/amplificate** — minim 2/săptămână

---

## 10. REZUMAT EXECUTIV

**Starea proiectului:** Solidă tehnic, volum de conținut impresionant (298 articole), dar cu dezechilibre importante de calitate și acoperire.

**Top 3 probleme urgente:**
1. **30 articole thin** pe destinații majore (Paris, Roma, Barcelona, Viena etc.) — performanță SEO compromisă
2. **Verticala Cazări aproape goală** — featured pe homepage dar fără conținut
3. **Croazierele sub-exploatate** — diferențiatorul principal din plan, dar doar 6 articole RO

**Top 3 acțiuni cu cel mai mare impact:**
1. Rescrie cele 10 ghiduri de destinații majore la 20-30KB (Sprint 1-2) — câștig SEO imediat
2. Populează verticala Cazări cu 5 articole ample — monetizare Booking
3. Adaugă 5 articole noi pe Croaziere — construiește autoritate pe nișa ta principală

**Plan total:** 10 rescrise + 30 articole noi = 40 piese de conținut, executabile în ~12 săptămâni la ritm de 3-4/săptămână.

---

*Document generat pe 20 august 2026. Bazat pe analiza completă a 298 articole, 8 verticale, configurații tehnice, plan de business v1.1 și structura proiectului din repo GitHub.*
