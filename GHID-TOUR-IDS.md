# Cum adaugi availability widgets inline în articole

## 1. Găsești tour ID-ul

### Varianta rapidă (din URL):
- Intri pe getyourguide.com, cauți experiența
- URL-ul arată: `getyourguide.com/rome-l33/skip-the-line-colosseum-t740387/`
- Tour ID = **740387** (numărul după `-t`)

### Varianta din dashboard:
- partner.getyourguide.com → Tools → Availability widget
- Cauți experiența → copiezi `data-gyg-tour-id` din codul generat

## 2. Adaugi în frontmatter

```yaml
gygTours:
  - tourId: "740387"
    afterHeading: "Colosseum"
    label: "Verifică disponibilitatea — Colosseum"
  - tourId: "62214"
    afterHeading: "Vatican"
    label: "Verifică disponibilitatea — Muzeele Vaticanului"
```

### Câmpuri:
- `tourId` (obligatoriu) — ID-ul turului GYG
- `afterHeading` (obligatoriu) — substring din titlul h2 după care se inserează widgetul
- `label` (opțional) — text deasupra widgetului
- `locale` (opțional) — default: ro-RO
- `currency` (opțional) — default: EUR
- `variant` (opțional) — "horizontal" (default) sau "vertical"

### Cum funcționează match-ul:
`afterHeading: "Colosseum"` match-uiește `## Colosseum, Forum Roman și Palatino`
`afterHeading: "Vatican"` match-uiește `## Vaticanul — Muzeele Vaticanului + Capela Sixtină`

E substring case-insensitive — pune cuvântul cheie din heading.

## 3. Exemple de tour IDs utile pe destinații

### Roma (confirmate)
| Obiectiv | Tour ID | Link |
|---|---|---|
| Colosseum + Forum + Palatino | 740387 | skip-the-line-colosseum-t740387 |
| Muzeele Vaticanului + Capela Sixtină | 62214 | vatican-museums-sistine-chapel-t62214 |

### Istanbul (de verificat)
- Hagia Sophia + Moscheea Albastră: caută pe GYG → copiază tour ID
- Croazieră Bosfor: caută "bosphorus cruise istanbul" → tour ID
- Grand Bazaar: caută "grand bazaar guided tour" → tour ID

### Atena (de verificat)
- Acropole: caută "acropolis guided tour" → tour ID
- Meteora: caută "meteora day trip athens" → tour ID

### Paris (de verificat)
- Turnul Eiffel: caută "eiffel tower skip the line" → tour ID
- Luvru: caută "louvre museum guided tour" → tour ID
- Versailles: caută "versailles day trip paris" → tour ID

### Barcelon (de verificat)
- Sagrada Familia: caută "sagrada familia skip the line" → tour ID
- Park Güell: caută "park guell guided tour" → tour ID

## 4. Tips

- Pune max 2-3 availability widgets per articol (mai multe = prea multă reclamă)
- Alege experiențele CELE MAI populare/căutate (nu orice)
- Widget-ul orizontal (default) arată bine pe desktop și mobil
- Widgetul vertical e mai bun pentru sidebar-uri (nu avem acum)
