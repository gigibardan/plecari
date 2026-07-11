// src/config/verticals.ts — actualizat: croaziere cu CruiseDirect
export type Vertical = {
  slug: string;
  featured: boolean;
  label: {ro: string; en: string};
  desc: {ro: string; en: string};
  intro: {ro: string; en: string};
  image: string;
  widget: string;
  widgetHeight: number;
  cta: {label: string; href: string}[];
};

const AVIASALES =
  'https://tpwgt.com/content?currency=ron&trs=547266&shmarker=747505&show_hotels=true&powered_by=true&locale=ro&searchUrl=www.aviasales.ro%2Fsearch&primary_override=%23C15540&color_button=%231F5E56&color_icons=%231F5E56&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=10&plain=true&promo_id=7879&campaign_id=100';
const AIRALO =
  'https://tpwgt.com/content?trs=547266&shmarker=747505&locale=en&powered_by=true&color_button=%23C15540&color_focused=%23f2685f&secondary=%23FFFFFF&dark=%232B2018&light=%23FFFFFF&special=%231F5E56&border_radius=10&plain=true&no_labels=&promo_id=8588&campaign_id=541';

export const VERTICALS: Vertical[] = [
  {
    slug: 'zboruri',
    featured: true,
    label: {ro: 'Zboruri', en: 'Flights'},
    desc: {ro: 'Compară și găsește bilete de avion la prețuri bune.', en: 'Compare and find flight tickets at good prices.'},
    intro: {ro: 'Compară zboruri și găsește bilete la prețuri bune, dintr-un singur loc.', en: 'Compare flights and find good fares, all in one place.'},
    image: '/verticals/zboruri.webp',
    widget: AVIASALES,
    widgetHeight: 200,
    cta: [
      {label: 'Compensație zbor întârziat — verifică acum', href: 'https://compensair.tpo.mx/wi3KeRBP'},
      {label: 'Verifică despăgubirea cu AirHelp', href: 'https://airhelp.tpo.mx/Etx51IpP'}
    ]
  },
  {
    slug: 'cazari',
    featured: true,
    label: {ro: 'Cazări', en: 'Stays'},
    desc: {ro: 'Hoteluri și apartamente, comparate într-un singur loc.', en: 'Hotels and apartments, compared in one place.'},
    intro: {ro: 'Hoteluri și apartamente comparate — găsește cazarea potrivită pentru tine.', en: 'Hotels and apartments compared — find the right stay for you.'},
    image: '/verticals/cazari.webp',
    widget: '',
    widgetHeight: 200,
    cta: []
  },
  {
    slug: 'asigurari',
    featured: true,
    label: {ro: 'Asigurări', en: 'Insurance'},
    desc: {ro: 'Asigurarea de călătorie potrivită, fără bătăi de cap.', en: 'The right travel insurance, hassle-free.'},
    intro: {ro: 'Asigurarea de călătorie potrivită, fără bătăi de cap — vezi ce acoperă și compară.', en: 'The right travel insurance, hassle-free — see what it covers and compare.'},
    image: '/verticals/asigurari.webp',
    widget: '',
    widgetHeight: 200,
    cta: [{label: 'Fă-ți asigurarea cu EKTA', href: 'https://ektatraveling.tpo.mx/uU7jZ5jK'}]
  },
  {
    slug: 'croaziere',
    featured: false,
    label: {ro: 'Croaziere', en: 'Cruises'},
    desc: {ro: 'Ghiduri, oferte și comparații de croaziere.', en: 'Cruise guides, deals, and comparisons.'},
    intro: {
      ro: 'Tot ce trebuie să știi despre croaziere — de la prima rezervare la alegerea cabinei potrivite.',
      en: 'Everything you need to know about cruises — from your first booking to picking the right cabin.'
    },
    image: '/verticals/croaziere.webp',
    widget: '',
    widgetHeight: 200,
    cta: [
      {label: 'Caută oferte de croaziere pe CruiseDirect', href: 'https://www.anrdoezrs.net/click-101821346-7299361'},
      {label: 'Oferte last-minute croaziere', href: 'https://www.tkqlhce.com/click-101821346-17037666'}
    ]
  },
  {
    slug: 'esim-roaming',
    featured: false,
    label: {ro: 'eSIM & Roaming', en: 'eSIM & Roaming'},
    desc: {ro: 'Internet în străinătate, ieftin.', en: 'Cheap data abroad.'},
    intro: {ro: 'Internet ieftin în străinătate — compară planuri eSIM pentru orice destinație.', en: 'Cheap data abroad — compare eSIM plans for any destination.'},
    image: '/verticals/esim-roaming.webp',
    widget: AIRALO,
    widgetHeight: 120,
    cta: [
      {label: 'Cumpără eSIM Airalo', href: 'https://airalo.tpo.mx/mYekFAo3'},
      {label: 'Vezi planuri Yesim', href: 'https://yesim.tpo.mx/XIGuBFkK'},
      {label: 'Planuri eSIM Saily', href: 'https://saily.tpo.mx/HfN66bwk'}
    ]
  },
  {
    slug: 'inchirieri-auto',
    featured: false,
    label: {ro: 'Închirieri auto', en: 'Car rental'},
    desc: {ro: 'Mașini de închiriat, comparate.', en: 'Rental cars, compared.'},
    intro: {ro: 'Mașini de închiriat comparate — găsește oferta bună pentru vacanța ta.', en: 'Rental cars compared — find the right deal for your trip.'},
    image: '/verticals/inchirieri-auto.webp',
    widget: '',
    widgetHeight: 200,
    cta: [{label: 'Caută mașini pe GetRentacar', href: 'https://getrentacar.tpo.mx/C6z4XHxU'}]
  },
  {
    slug: 'city-breaks',
    featured: false,
    label: {ro: 'City breaks', en: 'City breaks'},
    desc: {ro: 'Idei de escapade urbane.', en: 'City escape ideas.'},
    intro: {ro: 'Idei de escapade urbane și tot ce-ți trebuie pentru un city break reușit.', en: 'City escape ideas and everything for a great city break.'},
    image: '/verticals/city-breaks.webp',
    widget: '',
    widgetHeight: 200,
    cta: []
  },
  {
    slug: 'experiente',
    featured: false,
    label: {ro: 'Experiențe', en: 'Experiences'},
    desc: {ro: 'Tururi, activități și excursii în orice destinație.', en: 'Tours, activities, and excursions at any destination.'},
    intro: {
      ro: 'Tururi ghidate, excursii de o zi și experiențe locale — găsește ce să faci în orice oraș.',
      en: 'Guided tours, day trips, and local experiences — find things to do in any city.'
    },
    image: '/verticals/experiente.webp',
    widget: '',
    widgetHeight: 200,
    cta: [
      {
        label: 'Caută experiențe pe GetYourGuide',
        href: 'https://www.getyourguide.com/?partner_id=EKAA80H&utm_medium=online_publisher'
      }
    ]
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