// src/config/kiwi.ts
// SURSĂ UNICĂ pentru widgeturile Kiwi.com (prin Travelpayouts).
//
// Până acum, frontmatter-ul avea două convenții paralele:
//   1. `widget: "https://tpwgt.com/content?...&to_name=rome_it&...&promo_id=4484"`
//      — URL scris de mână, funcționa (103 articole)
//   2. `kiwiWidget: { promoId, origin, destination }`
//      — obiect declarativ, NU era în schema Velite, deci era șters
//      silențios din build și nu ajungea niciodată pe pagină (72 articole)
//
// Modulul ăsta implementează convenția 2 și construiește exact același URL,
// ca să nu existe două surse de adevăr pentru marker/trs/campaign.
//
// Parametrii și promo ID-urile vin din REGISTRU-WIDGETURI-AFILIATE.md.

export const KIWI = {
  marker: '747505',
  trs: '547266',
  campaignId: '111',
  /** Specific Route — bară compactă cu ruta + preț minim. Înălțime 80. */
  promoRoute: 4484,
  /** Search Results — motor complet + primele 3 rezultate. Înălțime 400. */
  promoSearch: 4478,
  /** Plecarea implicită pentru publicul nostru. */
  defaultOrigin: 'OTP'
} as const;

// IATA → `to_name`/`from_name` pentru Travelpayouts.
//
// Scriptul tpwgt pasează valoarea direct către widgetul Kiwi ca `data-from` /
// `data-to`, iar valorile lui implicite sunt „PRG" și „STN", adică tot coduri
// IATA — deci un cod nemapat rămâne valid ca fallback.
//
// [verificat] = slug folosit deja pe plecari.com, pe pagini care randează corect.
// [dedus]     = același tipar `oras_cc`, neconfirmat încă pe o pagină live.
const PLACE: Record<string, string> = {
  // Toate codurile Bucureștiului trimit la aceeași localitate, ca să putem
  // detecta ruta degenerată București → București.
  OTP: 'bucharest_ro', // [verificat]
  BUH: 'bucharest_ro', // [verificat]
  BBU: 'bucharest_ro', // [verificat]
  GDN: 'gdansk_pl',    // [verificat]
  KRK: 'krakow_pl',    // [verificat]
  PRG: 'prague_cz',    // [verificat]
  TIA: 'tirana_al',    // [verificat]
  TLL: 'tallinn_ee',   // [verificat]

  ARN: 'stockholm_se', // [dedus]
  BEG: 'belgrade_rs',  // [dedus]
  BTS: 'bratislava_sk',// [dedus]
  CPH: 'copenhagen_dk',// [dedus]
  HEL: 'helsinki_fi',  // [dedus]
  OHD: 'ohrid_mk',     // [dedus]
  OSL: 'oslo_no',      // [dedus]
  RIX: 'riga_lv',      // [dedus]
  RMO: 'chisinau_md',  // [dedus]
  SJJ: 'sarajevo_ba',  // [dedus]
  SKP: 'skopje_mk',    // [dedus]
  TIV: 'tivat_me',     // [dedus]
  VNO: 'vilnius_lt',   // [dedus]
  WAW: 'warsaw_pl',    // [dedus]
  WRO: 'wroclaw_pl',   // [dedus]
  ZAG: 'zagreb_hr'     // [dedus]

  // Intenționat nemapate (rămân coduri IATA, mai precise pentru rute interne):
  // CLJ, IAS, OMR, TSR, GHV
};

/** IATA → valoarea trimisă widgetului. Codul nemapat trece ca atare. */
export function kiwiPlace(code: string): string {
  return PLACE[code.toUpperCase()] ?? code.toUpperCase();
}

function base(locale: string, promoId: number): URLSearchParams {
  return new URLSearchParams({
    currency: 'eur',
    trs: KIWI.trs,
    shmarker: KIWI.marker,
    powered_by: 'true',
    locale: locale === 'en' ? 'en' : 'ro',
    campaign_id: KIWI.campaignId,
    promo_id: String(promoId)
  });
}

/**
 * Bara compactă pentru o rută anume (promo 4484).
 * Întoarce `null` când ruta nu are sens — origine lipsă, destinație lipsă sau
 * origine identică cu destinația (ex. OTP → BUH, adică București → București).
 */
export function kiwiRouteUrl(
  opts: { origin?: string; destination?: string; promoId?: number },
  locale: string
): string | null {
  const origin = (opts.origin ?? KIWI.defaultOrigin).toUpperCase();
  const destination = opts.destination?.toUpperCase();
  if (!destination) return null;

  const from = kiwiPlace(origin);
  const to = kiwiPlace(destination);
  if (from === to) return null; // aceeași localitate la ambele capete

  const p = base(locale, opts.promoId ?? KIWI.promoRoute);
  p.set('from_name', from);
  p.set('to_name', to);
  return `https://tpwgt.com/content?${p.toString()}`;
}

/** Motorul general de căutare zboruri (promo 4478). */
export function kiwiSearchUrl(
  opts: { promoId?: number },
  locale: string
): string {
  const p = base(locale, opts.promoId ?? KIWI.promoSearch);
  p.set('from_name', kiwiPlace(KIWI.defaultOrigin));
  p.set('show_header', 'true');
  p.set('limit', '3');
  p.set('primary_color', 'C15540');
  p.set('results_background_color', 'FFFFFF');
  p.set('form_background_color', 'FFFFFF');
  return `https://tpwgt.com/content?${p.toString()}`;
}
