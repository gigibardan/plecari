// src/config/verticals.ts
// Sursă unică pentru verticale + etichete RO/EN (folosită de header, footer, hub).
export const VERTICALS = [
  {slug: 'croaziere', label: {ro: 'Croaziere', en: 'Cruises'}},
  {slug: 'zboruri', label: {ro: 'Zboruri', en: 'Flights'}},
  {slug: 'cazari', label: {ro: 'Cazări', en: 'Stays'}},
  {slug: 'asigurari', label: {ro: 'Asigurări', en: 'Insurance'}},
  {slug: 'esim-roaming', label: {ro: 'eSIM & Roaming', en: 'eSIM & Roaming'}},
  {slug: 'inchirieri-auto', label: {ro: 'Închirieri auto', en: 'Car rental'}},
  {slug: 'city-breaks', label: {ro: 'City breaks', en: 'City breaks'}}
] as const;

export const VERTICAL_SLUGS = VERTICALS.map((v) => v.slug);

export function verticalLabel(slug: string, locale: string): string {
  const v = VERTICALS.find((x) => x.slug === slug);
  if (!v) return slug;
  return locale === 'en' ? v.label.en : v.label.ro;
}