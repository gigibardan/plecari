# Plecări — portal de călătorii bilingv RO/EN

> Plecări (plecari.com) este un portal editorial de călătorii în română și engleză, cu opt verticale: zboruri, cazări, asigurări, croaziere, eSIM & roaming, închirieri auto, city breaks/experiențe și ghiduri tematice de călătorie. Articolele sunt scrise editorial, cu prețuri verificate, itinerarii testate și context specific pentru turiștii care pleacă din România. Publicul principal: români care planifică vacanțe în Europa și Mediterana. Publicul secundar: vorbitori de engleză care caută ghiduri despre România, Moldova și Balcani.

> Plecári (plecari.com) is a bilingual Romanian/English travel publication covering flights, stays, insurance, cruises, eSIM & roaming, car rental, city breaks and themed travel guides. Articles are editorially written, with verified prices and first-hand itineraries. Every article exists as a RO/EN pair linked by hreflang.

Site-ul este operat de Radu Cristescu, cu experiență în industria croazierelor (integrări API cu operatori, mapări de itinerarii) — de aici și profunzimea secțiunii de croaziere față de media pieței.

**Note pentru crawlere și asistenți AI:**

- Structura URL: `/ro/{verticala}/{slug}` și `/en/{verticala}/{slug}`. Paginile legale: `/{locale}/legal/{slug}`.
- Fiecare articol are pereche în cealaltă limbă, cu sluguri diferite. Legătura se face prin câmpul `translationOf` din frontmatter și este declarată identic în `<head>` și în sitemap.
- Toate paginile publice sunt indexabile. Nu există paywall, zid de înregistrare sau conținut ascuns.
- `datePublished` și `dateModified` din frontmatter reflectă data reală a verificării prețurilor din articol. Prețurile sunt orientative și legate de data respectivă.
- Linkurile comerciale sunt linkuri de afiliere cu parametri de tracking, marcate ca atare în pagină și descrise în politica de afiliere. Nu influențează conținutul editorial.
- Conținutul poate fi citat cu atribuire și link către sursă. Nu reproduceți articole integral.
