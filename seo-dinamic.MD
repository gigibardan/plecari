Markdown
# Ghid Implementare SEO Dinamic (Scheme JSON-LD pentru oferte)

**Scop:** Injectarea automată a schemelor tranzacționale (`TouristTrip` sau `Product`) pentru Google direct din frontmatter-ul articolelor `.mdx`, pentru a obține *Rich Snippets* (afișarea ofertelor, partenerilor și prețurilor direct în rezultatele Google).

Platforma (prin Velite și `page.tsx`) detectează automat blocul `seoOffer` și generează scriptul JSON-LD ascuns necesar.

---

## 1. Structura Câmpurilor (Frontmatter)

Câmpul principal se numește `seoOffer` și se adaugă între `---` la începutul fișierului `.mdx`. Toate proprietățile de mai jos sunt opționale, cu excepția `type`.

```yaml
seoOffer:
  type: "TouristTrip" # SAU "Product" (Obligatoriu)
  provider: "Numele Partenerului" # ex: CruiseDirect, Airalo, GetYourGuide
  name: "Nume custom ofertă" # Opțional. Fallback: Titlul articolului
  description: "Descriere ofertă" # Opțional. Fallback: Descrierea articolului
  price: "150.00" # Doar cifre și punct
  currency: "EUR" # Codul monedei
  url: "[https://link-afiliat.com/](https://link-afiliat.com/)..." # Opțional. Fallback: Primul link din array-ul `cta`
2. Exemple de Utilizare
Cazul A: Croaziere sau Tururi/Experiențe (TouristTrip)
Se folosește pentru orice implică o călătorie, un itinerariu sau o experiență ghidată (Croaziere, tururi GetYourGuide). De regulă, nu punem preț fix aici, deoarece variază foarte mult.

YAML
---
title: "Ghid complet croaziere în Mediterana 2026"
seoOffer:
  type: "TouristTrip"
  provider: "CruiseDirect"
  url: "[https://www.anrdoezrs.net/click-101821346-7299361](https://www.anrdoezrs.net/click-101821346-7299361)"
---
Cazul B: Produse sau Servicii cu preț fix (Product)
Se folosește pentru produse clare, cum ar fi un pachet de date eSIM sau o poliță de asigurare, mai ales atunci când au un preț minim bine definit.

YAML
---
title: "Cel mai bun eSIM pentru Turcia: Saily vs Airalo"
seoOffer:
  type: "Product"
  name: "eSIM Turcia 1GB / 7 Zile"
  provider: "Airalo"
  price: "4.50"
  currency: "USD"
  url: "[https://airalo.tpo.mx/mYekFAo3](https://airalo.tpo.mx/mYekFAo3)"
---
3. Sistemul de Fallback (Siguranță la erori)
Pentru a nu fi nevoie să repeți informații în frontmatter, codul aplică niște plase de siguranță:

Lipsă name sau description: Dacă nu le completezi în blocul seoOffer, sistemul va prelua automat title și description de la nivelul articolului.

Lipsă url: Dacă omiți linkul ofertei, dar ai definit un bloc cta cu butoane de afiliere, sistemul va extrage primul href din acel bloc cta.

4. Validare
După adăugarea ofertei în MDX, trebuie rulată comanda:
npx velite
(Aceasta recompilează datele din markdown în .velite/).