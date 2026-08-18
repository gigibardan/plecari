// src/config/booking.ts
// Booking.com via CJ Affiliate — Central & Eastern Europe (CID 5096493)
// Publisher: 101821346 | Deeplink ID: 14082509 | Commission: 4% cazări, €2 zboruri
// IMPORTANT: Atribuirea e session-based (nu cookie 30 zile)

export const CJ_PUBLISHER_ID = '101821346';
export const CJ_DEEPLINK_ID = '14082509';
export const CJ_CLICK_BASE = `https://www.tkqlhce.com/click-${CJ_PUBLISHER_ID}-${CJ_DEEPLINK_ID}`;

/**
 * Construiește un deeplink CJ → Booking.com cu parametri de căutare.
 */
export function bookingSearchUrl(
  city: string,
  locale: 'ro' | 'en',
  checkin: string,
  checkout: string,
  adults: number
): string {
  const langCode = locale === 'ro' ? 'ro' : 'en-gb';
  const params = new URLSearchParams({
    ss: city,
    checkin,
    checkout,
    group_adults: String(adults),
    no_rooms: '1',
  });
  const destination = `https://www.booking.com/searchresults.${langCode}.html?${params}`;
  return `${CJ_CLICK_BASE}?url=${encodeURIComponent(destination)}`;
}

/**
 * Deeplink simplu fără date (fallback/bottom CTA).
 */
export function bookingDeepLink(city: string, locale: 'ro' | 'en'): string {
  const langCode = locale === 'ro' ? 'ro' : 'en-gb';
  const destination = `https://www.booking.com/searchresults.${langCode}.html?ss=${encodeURIComponent(city)}`;
  return `${CJ_CLICK_BASE}?url=${encodeURIComponent(destination)}`;
}