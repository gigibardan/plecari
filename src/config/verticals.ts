// src/config/verticals.ts — actualizat: descrieri + care sunt "în față"
export const VERTICALS = [
  {
    slug: 'zboruri',
    featured: true,
    label: {ro: 'Zboruri', en: 'Flights'},
    desc: {
      ro: 'Compară și găsește bilete de avion la prețuri bune.',
      en: 'Compare and find flight tickets at good prices.'
    }
  },
  {
    slug: 'cazari',
    featured: true,
    label: {ro: 'Cazări', en: 'Stays'},
    desc: {
      ro: 'Hoteluri și apartamente, comparate într-un singur loc.',
      en: 'Hotels and apartments, compared in one place.'
    }
  },
  {
    slug: 'asigurari',
    featured: true,
    label: {ro: 'Asigurări', en: 'Insurance'},
    desc: {
      ro: 'Asigurarea de călătorie potrivită, fără bătăi de cap.',
      en: 'The right travel insurance, hassle-free.'
    }
  },
  {
    slug: 'croaziere',
    featured: false,
    label: {ro: 'Croaziere', en: 'Cruises'},
    desc: {ro: 'Ghiduri și oferte de croaziere.', en: 'Cruise guides and deals.'}
  },
  {
    slug: 'esim-roaming',
    featured: false,
    label: {ro: 'eSIM & Roaming', en: 'eSIM & Roaming'},
    desc: {ro: 'Internet în străinătate, ieftin.', en: 'Cheap data abroad.'}
  },
  {
    slug: 'inchirieri-auto',
    featured: false,
    label: {ro: 'Închirieri auto', en: 'Car rental'},
    desc: {ro: 'Mașini de închiriat, comparate.', en: 'Rental cars, compared.'}
  },
  {
    slug: 'city-breaks',
    featured: false,
    label: {ro: 'City breaks', en: 'City breaks'},
    desc: {ro: 'Idei de escapade urbane.', en: 'City escape ideas.'}
  }
] as const;

export const VERTICAL_SLUGS: string[] = VERTICALS.map((v) => v.slug);
export const FEATURED = VERTICALS.filter((v) => v.featured);
export const REST = VERTICALS.filter((v) => !v.featured);

export function verticalLabel(slug: string, locale: string): string {
  const v = VERTICALS.find((x) => x.slug === slug);
  if (!v) return slug;
  return locale === 'en' ? v.label.en : v.label.ro;
}