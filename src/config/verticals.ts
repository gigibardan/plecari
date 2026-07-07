// src/config/verticals.ts — extins pentru hub-uri (hero + motor per verticală)

export type Vertical = {
  slug: string;
  featured: boolean;
  label: {ro: string; en: string};
  desc: {ro: string; en: string}; // scurt, pentru carduri pe homepage
  intro: {ro: string; en: string}; // subtitlu în hero-ul de hub
  image: string; // /verticals/{slug}.webp (dacă lipsește, rămâne gradientul de brand)
  widget: string; // scriptSrc motor de căutare ('' dacă nu există)
  widgetHeight: number;
  cta: {label: string; href: string}[]; // butoane de afiliere
};

// motoare reutilizate
const AVIASALES =
  'https://tpwgt.com/content?currency=ron&trs=547266&shmarker=747505&show_hotels=true&powered_by=true&locale=ro&searchUrl=www.aviasales.ro%2Fsearch&primary_override=%23C15540&color_button=%231F5E56&color_icons=%231F5E56&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=10&plain=true&promo_id=7879&campaign_id=100';
const AIRALO =
  'https://tpwgt.com/content?trs=547266&shmarker=747505&locale=en&powered_by=true&color_button=%23C15540&color_focused=%23f2685f&secondary=%23FFFFFF&dark=%232B2018&light=%23FFFFFF&special=%231F5E56&border_radius=10&plain=true&no_labels=&promo_id=8588&campaign_id=541';

export const VERTICALS: Vertical[] = [
  {
    slug: 'zboruri',
    featured: true,
    label: {ro: 'Zboruri', en: 'Flights'},
    desc: {
      ro: 'Compară și găsește bilete de avion la prețuri bune.',
      en: 'Compare and find flight tickets at good prices.'
    },
    intro: {
      ro: 'Compară zboruri și găsește bilete la prețuri bune, dintr-un singur loc.',
      en: 'Compare flights and find good fares, all in one place.'
    },
    image: '/verticals/zboruri.webp',
    widget: AVIASALES,
    widgetHeight: 200,
    cta: []
  },
  {
    slug: 'cazari',
    featured: true,
    label: {ro: 'Cazări', en: 'Stays'},
    desc: {
      ro: 'Hoteluri și apartamente, comparate într-un singur loc.',
      en: 'Hotels and apartments, compared in one place.'
    },
    intro: {
      ro: 'Hoteluri și apartamente comparate — găsește cazarea potrivită pentru tine.',
      en: 'Hotels and apartments compared — find the right stay for you.'
    },
    image: '/verticals/cazari.webp',
    widget: '',
    widgetHeight: 200,
    cta: []
  },
  {
    slug: 'asigurari',
    featured: true,
    label: {ro: 'Asigurări', en: 'Insurance'},
    desc: {
      ro: 'Asigurarea de călătorie potrivită, fără bătăi de cap.',
      en: 'The right travel insurance, hassle-free.'
    },
    intro: {
      ro: 'Asigurarea de călătorie potrivită, fără bătăi de cap — vezi ce acoperă și compară.',
      en: 'The right travel insurance, hassle-free — see what it covers and compare.'
    },
    image: '/verticals/asigurari.webp',
    widget: '', // adaugă aici un widget/link de asigurări (ex. EKTA)
    widgetHeight: 200,
    cta: []
  },
  {
    slug: 'croaziere',
    featured: false,
    label: {ro: 'Croaziere', en: 'Cruises'},
    desc: {ro: 'Ghiduri și oferte de croaziere.', en: 'Cruise guides and deals.'},
    intro: {
      ro: 'Ghiduri și oferte de croaziere, de la prima rezervare la cabina potrivită.',
      en: 'Cruise guides and deals, from first booking to the right cabin.'
    },
    image: '/verticals/croaziere.webp',
    widget: '',
    widgetHeight: 200,
    cta: []
  },
  {
    slug: 'esim-roaming',
    featured: false,
    label: {ro: 'eSIM & Roaming', en: 'eSIM & Roaming'},
    desc: {ro: 'Internet în străinătate, ieftin.', en: 'Cheap data abroad.'},
    intro: {
      ro: 'Internet ieftin în străinătate — compară planuri eSIM pentru orice destinație.',
      en: 'Cheap data abroad — compare eSIM plans for any destination.'
    },
    image: '/verticals/esim-roaming.webp',
    widget: AIRALO,
    widgetHeight: 120,
    cta: [{label: 'Vezi planuri eSIM pe Yesim', href: 'https://yesim.tpo.mx/XIGuBFkK'}]
  },
  {
    slug: 'inchirieri-auto',
    featured: false,
    label: {ro: 'Închirieri auto', en: 'Car rental'},
    desc: {ro: 'Mașini de închiriat, comparate.', en: 'Rental cars, compared.'},
    intro: {
      ro: 'Mașini de închiriat comparate — găsește oferta bună pentru vacanța ta.',
      en: 'Rental cars compared — find the right deal for your trip.'
    },
    image: '/verticals/inchirieri-auto.webp',
    widget: '',
    widgetHeight: 200,
    cta: [
      {label: 'Caută mașini pe GetRentacar', href: 'https://getrentacar.tpo.mx/C6z4XHxU'}
    ]
  },
  {
    slug: 'city-breaks',
    featured: false,
    label: {ro: 'City breaks', en: 'City breaks'},
    desc: {ro: 'Idei de escapade urbane.', en: 'City escape ideas.'},
    intro: {
      ro: 'Idei de escapade urbane și tot ce-ți trebuie pentru un city break reușit.',
      en: 'City escape ideas and everything for a great city break.'
    },
    image: '/verticals/city-breaks.webp',
    widget: '',
    widgetHeight: 200,
    cta: []
  }
];

export const VERTICAL_SLUGS: string[] = VERTICALS.map((v) => v.slug);
export const FEATURED = VERTICALS.filter((v) => v.featured);
export const REST = VERTICALS.filter((v) => !v.featured);

export function getVertical(slug: string): Vertical | undefined {
  return VERTICALS.find((v) => v.slug === slug);
}

export function verticalLabel(slug: string, locale: string): string {
  const v = getVertical(slug);
  if (!v) return slug;
  return locale === 'en' ? v.label.en : v.label.ro;
}