# Plecări — Registru widgeturi și linkuri afiliate

> Actualizat: 11 iulie 2026
> Scop: referință centrală pentru toate widgeturile, linkurile și tool-urile de monetizare disponibile.
> Se actualizează la fiecare partener nou sau widget descoperit.

---

## 1. GetYourGuide (GYG)

**Partner ID:** `EKAA80H`
**Comision:** ~8% | **Cookie:** 30 zile
**Integrare:** componentă `GYGWidget.tsx` + script analytics `GYGScript.tsx`
**Dashboard:** https://partner.getyourguide.com

### Widgeturi

| Tip | Componentă | Folosit pe | Ce face |
|---|---|---|---|
| Activity Auto | `<GYGWidget type="activity-auto" query="rome" />` | Hub-uri | Carduri automate pe bază de query, zero config |
| Activity Manual | `<GYGWidget type="activity-manual" query="rome" locale="ro-RO" numberOfItems={3} />` | Hub-uri, articole (jos) | Carduri cu control pe limbă, număr, excluderi |
| City | `<GYGWidget type="city" locationId="33" locale="ro-RO" />` | Articole (sus, după answer box) | Card vizual cu imaginea orașului + buton „Things to do" |
| Availability | `<GYGWidget type="availability" tourId="740387" locale="ro-RO" />` | Articole (inline după h2) | Disponibilitate live + booking direct per tur |

### Cum se configurează în articole (frontmatter)

```yaml
gygQuery: "rome"              # → activity widget manual (jos)
gygLocale: "ro-RO"            # → limba widgeturilor
gygLocationId: "33"           # → city widget (sus)
gygTours:                     # → availability widgets inline
  - tourId: "740387"
    afterHeading: "Colosseum"
    label: "Verifică disponibilitatea — Colosseum"
```

### Location IDs confirmate

| Oraș | Location ID | Status |
|---|---|---|
| Roma | 33 | ✅ Confirmat |
| București | 111 | ⚠️ De verificat |
| Istanbul | 56 | ⚠️ De verificat |
| Atena | 128 | ⚠️ De verificat |
| Budapesta | 29 | ⚠️ De verificat |
| Barcelona | 45 | ⚠️ De verificat |
| Paris | 16 | ⚠️ De verificat |
| Praga | 10 | ⚠️ De verificat |

### Tour IDs confirmate

| Oraș | Obiectiv | Tour ID |
|---|---|---|
| Roma | Colosseum + Forum + Palatino | 740387 |
| Roma | Muzeele Vaticanului + Capela Sixtină | 62214 |
| Istanbul | Hagia Sophia + Moscheea Albastră | 597339 |
| Istanbul | Croazieră cu cină pe Bosfor | 415437 |
| Istanbul | Grand Bazaar rooftops + pasaje | 643510 |
| Praga | Castelul Praga | 53490 |
| Praga | Praga subterană | 43385 |
| Paris | Turnul Eiffel | 1008808 |
| Paris | Versailles | 59565 |
| Budapesta | Croazieră pe Dunăre | 69093 |
| Barcelona | Sagrada Familia | 50027 |
| Barcelona | Montserrat + cramă | 382639 |

### Linkuri afiliate (pattern)

```
https://www.getyourguide.com/{city}-l{locationId}/?partner_id=EKAA80H&utm_medium=online_publisher
```

### Analytics / Tracking

Script global (layout.tsx, consent-gated):
```html
<script async defer src="https://widget.getyourguide.com/dist/pa.umd.production.min.js" data-gyg-partner-id="EKAA80H"></script>
```

---

## 2. Kiwi.com (prin Travelpayouts)

**Marker:** `747505` | **TRS:** `547266`
**Comision:** 3% | **Cookie:** 30 zile
**Campaign ID:** `111`
**Integrare:** `SearchWidget.tsx` (iframe tpwgt.com)

### Widgeturi

| Tip | Promo ID | Mărime | Folosit pe | Ce face |
|---|---|---|---|---|
| Flights Search Form | 3414 | Compact | Backup, articole simple | Formular simplu (de la, la, dată) |
| Search Results | 4478 | Mare | Hub zboruri | Motor complet + primele 3 rezultate cu prețuri reale |
| Popular Routes | 3411 | Mediu | Hub zboruri alternativ | Motor + carduri destinații populare cu imagini |
| Popular Destinations | 4563 | Mediu | Homepage, city-breaks hub | Carduri trending cu imagini și prețuri |
| Specific Route | 4484 | Mic | Articole experiențe (inline) | Bară compactă cu ruta + preț minim |

### URL-uri complete (cu culorile Plecări)

**Search Form:**
```
https://tpwgt.com/content?currency=eur&trs=547266&shmarker=747505&locale=ro&default_origin=BUH&stops=any&show_hotels=false&powered_by=true&border_radius=10&plain=true&color_button=%231F5E56&color_button_text=%232B2018&promo_id=3414&campaign_id=111
```

**Search Results (motor + rezultate):**
```
https://tpwgt.com/content?currency=eur&trs=547266&shmarker=747505&powered_by=true&locale=ro&from_name=bucharest_ro&show_header=true&limit=3&primary_color=C15540&results_background_color=FFFFFF&form_background_color=FFFFFF&campaign_id=111&promo_id=4478
```
Parametri variabili: `to_name` (ex: `rome_it`, `istanbul_tr`)

**Popular Routes:**
```
https://tpwgt.com/content?currency=eur&trs=547266&shmarker=747505&from_name=bucharest_ro&locale=ro&powered_by=true&limit=4&primary_color=C15540&results_background_color=FFFFFF&form_background_color=FFFFFF&campaign_id=111&promo_id=3411
```

**Popular Destinations:**
```
https://tpwgt.com/content?currency=eur&trs=547266&shmarker=747505&locale=ro&powered_by=true&from_name=bucharest_ro&stops=0&limit=3&primary_color=C15540&results_background_color=FFFFFF&form_background_color=FFFFFF&promo_id=4563&campaign_id=111
```

**Specific Route (compact, per destinație):**
```
https://tpwgt.com/content?currency=eur&trs=547266&shmarker=747505&powered_by=true&locale=ro&from_name=bucharest_ro&to_name={DEST}&campaign_id=111&promo_id=4484
```

### Coduri destinații Kiwi (to_name)

| Oraș | Cod | Oraș | Cod |
|---|---|---|---|
| Roma | rome_it | Londra | london_gb |
| Istanbul | istanbul_tr | Viena | vienna_at |
| Atena | athens_gr | Amsterdam | amsterdam_nl |
| Budapesta | budapest_hu | Berlin | berlin_de |
| Barcelona | barcelona_es | Lisabona | lisbon_pt |
| Paris | paris_fr | Milano | milan_it |
| Praga | prague_cz | Dubrovnik | dubrovnik_hr |

### Cum se folosește în frontmatter

```yaml
widget: "https://tpwgt.com/content?...&to_name=rome_it&...&promo_id=4484"
widgetHeight: 80
```

---

## 3. Aviasales (prin Travelpayouts)

**Marker:** `747505` | **TRS:** `547266`
**Comision:** ~40% din comisionul TP
**Status:** Motor inițial pe hub zboruri — **de înlocuit cu Kiwi** (brand mai cunoscut în RO)
**Integrare:** `SearchWidget.tsx` (iframe tpwgt.com)

### Widget motor principal

```
https://tpwgt.com/content?currency=ron&trs=547266&shmarker=747505&show_hotels=true&powered_by=true&locale=ro&searchUrl=www.aviasales.ro%2Fsearch&primary_override=%23C15540&color_button=%231F5E56&color_icons=%231F5E56&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=10&plain=true&promo_id=7879&campaign_id=100
```

### Linkuri directe (pattern)

```
https://www.aviasales.ro/search/{ORIGIN}{DATE}{DEST}1?marker=747505&trs=547266
```

---

## 4. CruiseDirect (prin CJ Affiliate) — NOU

**CJ Publisher ID:** `101821346`
**Comision:** 3% din tariful croazierei la sail completat | **Cookie:** 45 zile
**AOV:** ~$2,200 → **~$66/booking**
**Gift Cards:** 10% comision
**Dashboard:** https://members.cj.com
**Monedă:** USD

### Widgeturi interactive (Advanced Boxes)

Motoare de căutare croaziere interactive — se încarcă via JS de pe cruisedirect.com.

| Dimensiune | Link ID | Cod embed |
|---|---|---|
| 200×200 | 15534477 | `<div id="cdsearch" data-redirect-server="https://www.jdoqocy.com/click-101821346-15534477?url="></div><div id="cruiseSearchBox200x200"></div><script src="https://www.cruisedirect.com/cjjs/snippet-200x200.js"></script>` |
| 250×250 | 15534467 | `<div id="cdsearch" data-redirect-server="https://www.jdoqocy.com/click-101821346-15534467?url="></div><div id="cruiseSearchBox250x250"></div><script src="https://www.cruisedirect.com/cjjs/snippet-250x250.js"></script>` |
| 300×250 | 15534471 | `<div id="cdsearch" data-redirect-server="https://www.jdoqocy.com/click-101821346-15534471?url="></div><div id="cruiseSearchBox300x250"></div><script src="https://www.cruisedirect.com/cjjs/snippet-300x250.js"></script>` |
| 300×600 | 15534473 | `<div id="cdsearch" data-redirect-server="https://www.jdoqocy.com/click-101821346-15534473?url="></div><div id="cruiseSearchBox300x600"></div><script src="https://www.cruisedirect.com/cjjs/snippet-300x600.js"></script>` |

**Notă:** necesită `<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">` + tracking pixel `<img src="https://www.ftjcfx.com/image-101821346-{LINK_ID}" width="1" height="1" border="0"/>`.

### Link principal (Evergreen — deep-link enabled)

```
https://www.dpbolvw.net/click-101821346-15734200
```
Deep-link pattern: adaugă `?url=https://www.cruisedirect.com/{pagina}` pentru link spre orice pagină CD.

### Link homepage

```
https://www.anrdoezrs.net/click-101821346-7299361
```

### Linkuri per linie de croaziere

| Linie | Click URL |
|---|---|
| Celebrity Cruises | `https://www.kqzyfj.com/click-101821346-13096784` |
| Carnival Cruises | `https://www.kqzyfj.com/click-101821346-13096782` |
| Disney Cruises | `https://www.dpbolvw.net/click-101821346-13096793` |
| Costa Cruises | `https://www.jdoqocy.com/click-101821346-13096786` |
| Cunard Cruises | `https://www.jdoqocy.com/click-101821346-13096789` |
| Holland America | `https://www.tkqlhce.com/click-101821346-13096799` |
| Princess Cruises | `https://www.anrdoezrs.net/click-101821346-12526292` |
| Norwegian Cruise Line | (de luat din bannere) |
| MSC Cruises | (de luat din bannere) |

### Linkuri per destinație/temă

| Categorie | Click URL |
|---|---|
| Last Minute Deals | `https://www.tkqlhce.com/click-101821346-17037666` |
| Mediterranean | (din bannere — link ID 15534638 area) |
| Caribbean | `https://www.tkqlhce.com/click-101821346-15534704` |
| Alaska | `https://www.dpbolvw.net/click-101821346-13096740` |
| Bahamas | `https://www.anrdoezrs.net/click-101821346-13096743` |
| Family Cruises | `https://www.jdoqocy.com/click-101821346-8331168` |
| Honeymoon Cruises | `https://www.kqzyfj.com/click-101821346-8331176` |
| Online Exclusives | `https://www.kqzyfj.com/click-101821346-9224301` |

### Linkuri per port de plecare

| Port | Click URL |
|---|---|
| Barcelona | `https://www.dpbolvw.net/click-101821346-13245022` |
| Vancouver | `https://www.anrdoezrs.net/click-101821346-13097169` |
| San Juan | `https://www.kqzyfj.com/click-101821346-13097106` |
| San Diego | `https://www.kqzyfj.com/click-101821346-13097224` |
| Tampa | `https://www.tkqlhce.com/click-101821346-13097162` |
| Galveston | `https://www.tkqlhce.com/click-101821346-13097109` |
| Miami | `https://www.tkqlhce.com/click-101821346-15534697` |

### Unde folosim CruiseDirect

| Pagină | Ce punem | Tip |
|---|---|---|
| Hub croaziere | Advanced Box 300×250 (motor căutare) | Widget interactiv |
| Articol ghid croaziere | Linkuri per linie + Last Minute Deals | CTA butoane |
| Articol destinație croazieră (ex: Mediterana) | Link destinație + Advanced Box | Widget + CTA |
| Cross-link din experiențe porturi (ex: Barcelona, Roma) | Link port de plecare | CTA buton |

### Restricții importante (din termeni)

- NU licita pe brandurile: CruiseDirect, Holland America, Princess, Carnival, Cunard, Norwegian
- NU te prezenta ca site oficial CruiseDirect
- NU link direct din PPC ads
- Sub-afiliați: permis

---

## 5. Airalo eSIM (prin Travelpayouts)

**Comision:** variabil | **Cookie:** 30 zile
**Integrare:** `SearchWidget.tsx` pe hub eSIM

### Widget

```
https://tpwgt.com/content?trs=547266&shmarker=747505&locale=en&powered_by=true&color_button=%23C15540&color_focused=%23f2685f&secondary=%23FFFFFF&dark=%232B2018&light=%23FFFFFF&special=%231F5E56&border_radius=10&plain=true&no_labels=&promo_id=8588&campaign_id=541
```

### Link afiliat

```
https://airalo.tpo.mx/mYekFAo3
```

---

## 6. Parteneri cu linkuri/CTA (fără widget)

| Partener | Vertical | Link afiliat | Comision |
|---|---|---|---|
| EKTA | Asigurări | `https://ektatraveling.tpo.mx/uU7jZ5jK` | Variabil |
| Yesim | eSIM | `https://yesim.tpo.mx/XIGuBFkK` | Variabil |
| Saily | eSIM | `https://saily.tpo.mx/HfN66bwk` | Variabil |
| GetRentacar | Închirieri auto | `https://getrentacar.tpo.mx/C6z4XHxU` | Variabil |
| SEARADAR | Croaziere | `https://searadar.tpo.mx/kOIP44zS` | Variabil |
| AirHelp | Zboruri (compensații) | `https://airhelp.tpo.mx/Etx51IpP` | Variabil |
| Compensair | Zboruri (compensații) | `https://compensair.tpo.mx/wi3KeRBP` | Variabil |

---

## 7. Booking.com — PENDING

**Status:** Aplicație directă trimisă, în așteptare
**Vertical:** Cazări

---

## Hartă: ce widget pe ce pagină

### Homepage

| Zonă | Widget | Partener |
|---|---|---|
| Hero (motor principal) | Search Form sau Search Results | Kiwi |
| Sub verticale | Popular Destinations | Kiwi |

### Hub Zboruri

| Zonă | Widget | Partener |
|---|---|---|
| Motor principal | Search Results (cu rezultate) | Kiwi |
| Sub motor | Popular Routes | Kiwi |
| CTA-uri | AirHelp + Compensair | TP |

### Hub Croaziere

| Zonă | Widget | Partener |
|---|---|---|
| Motor principal | Advanced Box 300×250 | CruiseDirect |
| CTA-uri | SEARADAR + Last Minute Deals CD + homepage CD | SEARADAR + CruiseDirect |

### Hub Experiențe

| Zonă | Widget | Partener |
|---|---|---|
| Sub hero | Activity Manual (3 carduri) | GYG |
| CTA | Link GYG general | GYG |

### Hub City Breaks

| Zonă | Widget | Partener |
|---|---|---|
| Sub motor | Activity Manual (experiențe urbane) | GYG |
| Opțional | Popular Destinations | Kiwi |

### Hub eSIM

| Zonă | Widget | Partener |
|---|---|---|
| Motor principal | Airalo widget | Airalo/TP |
| CTA-uri | Yesim + Saily | TP |

### Articole Experiențe (per destinație)

| Zonă | Widget | Partener |
|---|---|---|
| Sus (după answer box) | City widget | GYG |
| Inline (după h2 obiective) | Availability (tourId) | GYG |
| Jos (după conținut) | Activity Manual (3 carduri) | GYG |
| Jos (sub GYG) | Specific Route (rută + preț) | Kiwi |
| CTA butoane | Link GYG + link zbor | GYG + Kiwi |

### Articole Croaziere

| Zonă | Widget | Partener |
|---|---|---|
| Sus | Advanced Box 300×250 | CruiseDirect |
| Inline per linie | CTA buton per linie | CruiseDirect |
| Jos | SEARADAR CTA | SEARADAR |
| Cross-link | Link port de plecare | CruiseDirect |

---

## Culorile Plecări (pentru configurare widgeturi)

| Rol | Hex | Folosit în |
|---|---|---|
| Cream (fundal) | `#FBF6EE` | Background widget-uri |
| Terracotta (primar) | `#C15540` | Butoane, accente, `primary_color` |
| Teal (secundar) | `#1F5E56` | Iconițe, `color_button` pe unele |
| Ochre (cald) | `#E0A22B` | Badge-uri, highlight-uri |
| Ink (text) | `#2B2018` | Text principal, `color_button_text` |

---

## Convenții și reguli

1. **Max 3-4 widgeturi per articol** — mai multe = prea comercial, UX prost
2. **Ordinea în articole:** city widget (sus) → availability inline → activity cards (jos) → rută zbor (jos) → CTA butoane
3. **Consent obligatoriu** — toate widgeturile se încarcă doar după accept cookies (GDPR)
4. **Lazy loading** — widget-urile se încarcă la IntersectionObserver, nu la page load
5. **`npx velite`** — obligatoriu după orice schimbare de frontmatter
6. **Widgeturile Kiwi/Aviasales/Airalo** folosesc `SearchWidget.tsx` (iframe tpwgt.com)
7. **Widgeturile GYG** folosesc `GYGWidget.tsx` (div-uri cu data attributes)
8. **Widgeturile CruiseDirect** folosesc embed HTML cu JS extern (necesită componentă nouă sau SearchWidget adaptat)
9. **Nu combina GYG availability + Kiwi specific route pe aceeași secțiune** — plasează-le în zone diferite
10. **CruiseDirect:** NU licita pe branduri protejate, NU te prezenta ca site oficial