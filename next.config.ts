import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // ── Homepage ──────────────────────────────────────────────────────────
      { source: '/', destination: '/ro', permanent: false },

      // ── Articole ajunse greșit în /legal/ ─────────────────────────────────
      { source: '/ro/legal/croaziera-insulele-grecesti-2026', destination: '/ro/croaziere/croaziera-insulele-grecesti-2026', permanent: true },
      { source: '/ro/legal/city-break-londra-bucuresti-2026', destination: '/ro/city-breaks/city-break-londra-bucuresti-2026', permanent: true },

      // ── experiente: sluguri RO → EN ────────────────────────────────────────
      { source: '/en/experiente/ce-sa-faci-in-amsterdam', destination: '/en/experiente/things-to-do-amsterdam', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-atena', destination: '/en/experiente/things-to-do-athens', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-barcelona', destination: '/en/experiente/things-to-do-barcelona', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-bucuresti', destination: '/en/experiente/things-to-do-bucharest', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-budapesta', destination: '/en/experiente/things-to-do-budapest', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-istanbul', destination: '/en/experiente/things-to-do-istanbul', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-paris', destination: '/en/experiente/things-to-do-paris', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-praga', destination: '/en/experiente/things-to-do-prague', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-roma', destination: '/en/experiente/things-to-do-rome', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-viena', destination: '/en/experiente/things-to-do-vienna', permanent: true },

      // ── experiente: verticală greșită (city-breaks → experiente) ──────────
      { source: '/en/city-breaks/ce-sa-faci-in-viena', destination: '/en/experiente/things-to-do-vienna', permanent: true },

      // ── experiente: pagini RO fără echivalent EN → hub experiente EN ──────
      { source: '/en/experiente/bilete-vatican-colosseum-epuizate-last-minute', destination: '/en/experiente', permanent: true },

      // ── city-breaks: 404-uri diverse ──────────────────────────────────────
      { source: '/ro/city-breaks/bucharest-city-break-guide', destination: '/ro/experiente/ce-sa-faci-in-bucuresti', permanent: true },
      { source: '/ro/city-breaks/dubrovnik-city-break-guide', destination: '/ro/city-breaks/city-break-dubrovnik-2026', permanent: true },
      { source: '/en/city-breaks/city-break-dubrovnik-2026', destination: '/en/city-breaks/dubrovnik-city-break-guide', permanent: true },
      { source: '/en/city-breaks/grecia-2026-ghid-vacanta', destination: '/en/city-breaks/greece-2026-holiday-guide', permanent: true },
      { source: '/en/city-breaks/cum-platesti-strainatate-fara-comisioane', destination: '/en/city-breaks/pay-abroad-no-fees', permanent: true },

      // ── croaziere: sluguri RO → EN ────────────────────────────────────────
      { source: '/en/croaziere/cat-costa-o-croaziera-buget-real', destination: '/en/croaziere/cruise-cost-real-budget', permanent: true },
      { source: '/en/croaziere/prima-croaziera-ghid-incepatori', destination: '/en/croaziere/first-cruise-guide-beginners', permanent: true },
      { source: '/en/croaziere/first-time-cruise-guide', destination: '/en/croaziere/first-cruise-guide-beginners', permanent: true },

      // ── asigurari: sluguri RO → EN (corectat: destinații reale) ──────────
      { source: '/en/asigurari/ghid-asigurare-calatorie-2026', destination: '/en/asigurari/ghid-asigurare-calatorie', permanent: true },
      { source: '/en/asigurari/scam-uri-inselatorii-vacanta-2026', destination: '/en/asigurari/travel-scams-europe-2026', permanent: true },

      // ── zboruri: sluguri RO → EN ──────────────────────────────────────────
      { source: '/en/zboruri/top-destinatii-ieftine-din-bucuresti', destination: '/en/zboruri/popular-flights-from-bucharest', permanent: true },
      { source: '/en/zboruri/zboruri-populare-din-bucuresti', destination: '/en/zboruri/popular-flights-from-bucharest', permanent: true },
      { source: '/en/zboruri/cele-mai-frumoase-plaje-europa-zbor-bucuresti', destination: '/en/cazari/best-beaches-europe-2026', permanent: true },
      { source: '/en/zboruri/bagaj-pierdut-companie-aeriana-drepturi', destination: '/en/zboruri/lost-luggage-airline-rights', permanent: true },

      // ── cazari: sluguri RO → EN ───────────────────────────────────────────
      { source: '/en/cazari/fraude-rezervari-online-vacanta', destination: '/en/cazari/online-booking-fraud', permanent: true },
      { source: '/en/cazari/cum-gasesti-cazare-ieftina', destination: '/en/cazari/how-to-find-cheap-accommodation', permanent: true },
      { source: '/en/cazari/best-beaches-europe-2026-en', destination: '/en/cazari/best-beaches-europe-2026', permanent: true },

      // ── inchirieri-auto: corectat (slug identic există, nu redirecta spre inexistent) ──

      // ── esim-roaming ──────────────────────────────────────────────────────
      { source: '/ro/esim-roaming/best-esim-europe-2026', destination: '/ro/esim-roaming/esim-vs-roaming', permanent: true },

      // ── fără prefix de locale ─────────────────────────────────────────────
      { source: '/experiente/ce-sa-faci-in-roma', destination: '/ro/experiente/ce-sa-faci-in-roma', permanent: true },

      // ── legal: varianta EN ────────────────────────────────────────────────
      { source: '/en/legal/city-break-londra-bucuresti-2026', destination: '/en/city-breaks/london-city-break-from-bucharest', permanent: true },

      // ── articole EN indexate la căi fără prefix /en/ (CAT A) ─────────────
      { source: '/inchirieri-auto/car-rental-documents', destination: '/en/inchirieri-auto/car-rental-documents', permanent: true },
      { source: '/asigurari/trip-cancellation-insurance', destination: '/en/asigurari/trip-cancellation-insurance', permanent: true },
      { source: '/croaziere/first-mediterranean-cruise-guide', destination: '/en/croaziere/first-mediterranean-cruise-guide', permanent: true },
      { source: '/experiente/kotor-complete-guide', destination: '/en/experiente/kotor-complete-guide', permanent: true },
      { source: '/experiente/tirana-complete-guide', destination: '/en/experiente/tirana-complete-guide', permanent: true },
      { source: '/city-breaks/cheapest-european-destinations-2026', destination: '/en/city-breaks/cheapest-european-destinations-2026', permanent: true },
      { source: '/asigurari/emergencies-abroad-guide', destination: '/en/asigurari/emergencies-abroad-guide', permanent: true },
      { source: '/zboruri/flight-cancelled-delayed-eu261-compensation', destination: '/en/zboruri/flight-cancelled-delayed-eu261-compensation', permanent: true },
      { source: '/cazari/how-to-find-cheap-accommodation', destination: '/en/cazari/how-to-find-cheap-accommodation', permanent: true },
      { source: '/croaziere/cruise-cost-real-budget', destination: '/en/croaziere/cruise-cost-real-budget', permanent: true },
      { source: '/city-breaks/formula-1-europe-grand-prix-2026', destination: '/en/city-breaks/formula-1-europe-grand-prix-2026', permanent: true },
      { source: '/city-breaks/overtourism-europe-2026-tourist-taxes', destination: '/en/city-breaks/overtourism-europe-2026-tourist-taxes', permanent: true },
      { source: '/esim-roaming/esim-for-kids-parents-guide', destination: '/en/esim-roaming/esim-for-kids-parents-guide', permanent: true },
      { source: '/experiente/skopje-complete-guide', destination: '/en/experiente/skopje-complete-guide', permanent: true },
      { source: '/cazari/romanian-black-sea-coast-accommodation', destination: '/en/cazari/romanian-black-sea-coast-accommodation', permanent: true },
      { source: '/city-breaks/crete-complete-guide-2026', destination: '/en/city-breaks/crete-complete-guide-2026', permanent: true },
      { source: '/experiente/krakow-complete-guide', destination: '/en/experiente/krakow-complete-guide', permanent: true },
      { source: '/experiente/romantic-road-germany-castles-ludwig', destination: '/en/experiente/romantic-road-germany-castles-ludwig', permanent: true },
      { source: '/experiente/sarajevo-complete-guide', destination: '/en/experiente/sarajevo-complete-guide', permanent: true },
      { source: '/city-breaks/airport-transfer-guide', destination: '/en/city-breaks/airport-transfer-guide', permanent: true },
      { source: '/experiente/bratislava-complete-guide', destination: '/en/experiente/bratislava-complete-guide', permanent: true },
      { source: '/inchirieri-auto/car-rental-without-credit-card', destination: '/en/inchirieri-auto/car-rental-without-credit-card', permanent: true },
      { source: '/city-breaks/digital-nomad-europe-2026', destination: '/en/city-breaks/digital-nomad-europe-2026', permanent: true },
      { source: '/city-breaks/weekend-getaways-romania-2026', destination: '/en/city-breaks/weekend-getaways-romania-2026', permanent: true },
      { source: '/experiente/things-to-do-budapest', destination: '/en/experiente/things-to-do-budapest', permanent: true },
      { source: '/experiente/wroclaw-complete-guide', destination: '/en/experiente/wroclaw-complete-guide', permanent: true },
      { source: '/experiente/chisinau-complete-guide', destination: '/en/experiente/chisinau-complete-guide', permanent: true },
      { source: '/inchirieri-auto/romania-road-trip-transylvania', destination: '/en/inchirieri-auto/romania-road-trip-transylvania', permanent: true },
      { source: '/zboruri/cabin-baggage-rules-2026', destination: '/en/zboruri/cabin-baggage-rules-2026', permanent: true },
      { source: '/cazari/bulgaria-holiday-guide-2026', destination: '/en/cazari/bulgaria-holiday-guide-2026', permanent: true },
      { source: '/zboruri/layover-vs-direct-flight', destination: '/en/zboruri/layover-vs-direct-flight', permanent: true },
      { source: '/zboruri/hidden-holiday-fees-2026', destination: '/en/zboruri/hidden-holiday-fees-2026', permanent: true },
      { source: '/experiente/things-to-do-prague', destination: '/en/experiente/things-to-do-prague', permanent: true },
      { source: '/asigurari/ski-travel-insurance', destination: '/en/asigurari/ski-travel-insurance', permanent: true },
      { source: '/experiente/things-to-do-istanbul', destination: '/en/experiente/things-to-do-istanbul', permanent: true },
      { source: '/experiente/things-to-do-rome', destination: '/en/experiente/things-to-do-rome', permanent: true },
      { source: '/croaziere/greek-islands-cruise-2026', destination: '/en/croaziere/greek-islands-cruise-2026', permanent: true },
      { source: '/city-breaks/london-city-break-from-bucharest', destination: '/en/city-breaks/london-city-break-from-bucharest', permanent: true },
      { source: '/city-breaks/malaga-complete-guide-2026', destination: '/en/city-breaks/malaga-complete-guide-2026', permanent: true },
      { source: '/experiente/things-to-do-krakow', destination: '/en/experiente/things-to-do-krakow', permanent: true },
      { source: '/experiente/things-to-do-sofia', destination: '/en/experiente/things-to-do-sofia', permanent: true },
      { source: '/experiente/things-to-do-porto', destination: '/en/experiente/things-to-do-porto', permanent: true },
      { source: '/experiente/things-to-do-ljubljana', destination: '/en/experiente/things-to-do-ljubljana', permanent: true },
      { source: '/city-breaks/marseille-complete-guide-2026', destination: '/en/city-breaks/marseille-complete-guide-2026', permanent: true },
      { source: '/experiente/things-to-do-tallinn', destination: '/en/experiente/things-to-do-tallinn', permanent: true },
      { source: '/zboruri/cheapest-destinations-from-bucharest', destination: '/en/zboruri/cheapest-destinations-from-bucharest', permanent: true },
      { source: '/city-breaks/top-city-breaks-from-bucharest-2026', destination: '/en/city-breaks/top-city-breaks-from-bucharest-2026', permanent: true },

      // ── articole EN accesate la căi cu slug RO ────────────────────────────
      { source: '/en/asigurari/asigurare-anulare-calatorie', destination: '/en/asigurari/trip-cancellation-insurance', permanent: true },
      { source: '/en/asigurari/asigurare-schi-munte', destination: '/en/asigurari/ski-travel-insurance', permanent: true },
      { source: '/en/asigurari/vacanta-turcia-2026-siguranta', destination: '/en/asigurari/turkey-2026-safety-guide', permanent: true },
      { source: '/en/cazari/vacanta-bulgaria-2026-ghid-complet', destination: '/en/cazari/bulgaria-holiday-guide-2026', permanent: true },
      { source: '/en/city-breaks/transfer-aeroport-ghid', destination: '/en/city-breaks/airport-transfer-guide', permanent: true },
      { source: '/en/city-breaks/istanbul-city-break-ghid', destination: '/en/city-breaks/istanbul-city-break-guide', permanent: true },
      { source: '/en/inchirieri-auto/inchiriere-masina-fara-card-de-credit', destination: '/en/inchirieri-auto/car-rental-without-credit-card', permanent: true },
      { source: '/en/inchirieri-auto/road-trip-croatia-split-dubrovnik', destination: '/en/inchirieri-auto/croatia-road-trip-split-dubrovnik-2026', permanent: true },
      { source: '/en/inchirieri-auto/hidden-car-rental-fees', destination: '/en/inchirieri-auto/taxe-ascunse-inchiriere-auto', permanent: true },
      { source: '/en/inchirieri-auto/car-rental-greece-2026', destination: '/en/inchirieri-auto/inchiriere-masina-grecia-2026', permanent: true },
      { source: '/en/zboruri/zbor-anulat-intarziat-drepturi-compensatii', destination: '/en/zboruri/flight-cancelled-delayed-eu261-compensation', permanent: true },
      { source: '/en/zboruri/flight-delay-passenger-rights', destination: '/en/zboruri/flight-delay-cancellation-passenger-rights', permanent: true },
      { source: '/en/experiente/lisboa-complete-guide', destination: '/en/city-breaks/portugal-holiday-guide-2026', permanent: true },

      // ── articole EN: slug vechi → slug nou ───────────────────────────────
      { source: '/en/experiente/ljubljana-complete-guide', destination: '/en/experiente/things-to-do-ljubljana', permanent: true },
      { source: '/en/experiente/dubrovnik-complete-guide', destination: '/en/city-breaks/dubrovnik-city-break-guide', permanent: true },
      { source: '/en/experiente/budapesta-complete-guide', destination: '/en/experiente/things-to-do-budapest', permanent: true },
      { source: '/en/experiente/budapest-complete-guide', destination: '/en/experiente/things-to-do-budapest', permanent: true },
      { source: '/en/experiente/praga-complete-guide', destination: '/en/experiente/things-to-do-prague', permanent: true },
      { source: '/en/experiente/viena-complete-guide', destination: '/en/experiente/things-to-do-vienna', permanent: true },
      { source: '/en/experiente/moldova-wine-tours', destination: '/en/experiente/moldova-wine-tours-guide', permanent: true },
      { source: '/en/asigurari/schengen-visa-insurance', destination: '/en/asigurari/asigurare-viza-schengen', permanent: true },
      { source: '/en/cazari/portugal-holiday-guide-2026', destination: '/en/city-breaks/portugal-holiday-guide-2026', permanent: true },
      { source: '/en/city-breaks/best-beaches-europe-2026', destination: '/en/cazari/best-beaches-europe-2026', permanent: true },
      { source: '/en/city-breaks/travel-scams-europe-2026', destination: '/en/asigurari/travel-scams-europe-2026', permanent: true },

      // ── articole RO: slug vechi → slug curent ────────────────────────────
      { source: '/ro/experiente/viena-ghid-complet', destination: '/ro/experiente/ce-sa-faci-in-viena', permanent: true },
      { source: '/ro/experiente/praga-ghid-complet', destination: '/ro/experiente/ce-sa-faci-in-praga', permanent: true },
      { source: '/ro/experiente/budapesta-ghid-complet', destination: '/ro/experiente/ce-sa-faci-in-budapesta', permanent: true },
      { source: '/ro/experiente/dubrovnik-ghid-complet', destination: '/ro/city-breaks/city-break-dubrovnik-2026', permanent: true },
      { source: '/ro/city-breaks/ohrid-ghid-complet', destination: '/ro/experiente/ohrid-ghid-complet', permanent: true },
      { source: '/ro/city-breaks/tirana-ghid-complet', destination: '/ro/experiente/tirana-ghid-complet', permanent: true },
      { source: '/ro/city-breaks/ce-sa-faci-in-viena', destination: '/ro/experiente/ce-sa-faci-in-viena', permanent: true },
      { source: '/ro/city-breaks/top-insule-grecesti-2026', destination: '/ro/cazari/top-insule-grecesti-2026', permanent: true },
      { source: '/ro/city-breaks/cele-mai-ieftine-destinatii-europene-2026', destination: '/ro/city-breaks/destinatii-ieftine-europa-2026', permanent: true },
      { source: '/ro/city-breaks/cele-mai-ieftine-destinatii-europa-2026', destination: '/ro/city-breaks/destinatii-ieftine-europa-2026', permanent: true },
      { source: '/ro/city-breaks/is-romania-expensive', destination: '/ro/city-breaks/romania-scumpa-ghid', permanent: true },
      { source: '/ro/asigurari/asigurare-calatorie-europa-ghid', destination: '/ro/asigurari/ghid-asigurare-calatorie-2026', permanent: true },
      { source: '/ro/zboruri/cum-sa-planifici-vacanta-in-europa-2026', destination: '/ro/zboruri/cum-planifici-vacanta-ghid-pas-cu-pas', permanent: true },
      { source: '/ro/zboruri/cum-planifici-vacanta-europa-2026', destination: '/ro/zboruri/cum-planifici-vacanta-ghid-pas-cu-pas', permanent: true },
      { source: '/ro/zboruri/sfaturi-calatorie-ieftina-europa-2026', destination: '/ro/zboruri/trucuri-calatorie-ieftina-2026', permanent: true },
      { source: '/ro/croaziere/cat-costa-o-croaziera', destination: '/ro/croaziere/cat-costa-o-croaziera-buget-real', permanent: true },
      { source: '/ro/croaziere/first-time-cruise-guide', destination: '/ro/croaziere/prima-croaziera-ghid-incepatori', permanent: true },
      { source: '/ro/croaziere/first-mediterranean-cruise-guide', destination: '/ro/croaziere/prima-croaziera-mediterana', permanent: true },
      { source: '/ro/esim-roaming/cel-mai-bun-esim-europa-2026', destination: '/ro/esim-roaming/cel-mai-bun-esim-per-destinatie', permanent: true },
      { source: '/ro/experiente/coasta-amalfi-ghid-complet-2026', destination: '/ro/city-breaks/coasta-amalfi-ghid-complet-2026', permanent: true },
      { source: '/ro/experiente/ghid-mancare-europa-2026', destination: '/ro/experiente/ghid-gastronomie-europa-2026', permanent: true },
      { source: '/ro/experiente/ce-sa-faci-in-venetia', destination: '/ro/city-breaks/venetia-ghid-complet-2026', permanent: true },
      { source: '/ro/experiente/ce-sa-faci-in-madrid', destination: '/ro/city-breaks/madrid-ghid-complet-2026', permanent: true },
      // ── Ahrefs 03-nov-2026: 404-uri rămase ───────────────────────────────
      { source: '/en/asigurari/travel-insurance-guide', destination: '/en/asigurari/travel-insurance-guide-2026', permanent: true },
      { source: '/en/city-breaks/best-greek-islands-2026', destination: '/en/cazari/best-greek-islands-2026', permanent: true },
      { source: '/en/city-breaks/croatia-road-trip-split-dubrovnik-2026', destination: '/en/inchirieri-auto/croatia-road-trip-split-dubrovnik-2026', permanent: true },
      { source: '/en/city-breaks/tirana-complete-guide', destination: '/en/experiente/tirana-complete-guide', permanent: true },
      { source: '/en/croaziere/greek-islands-cruise-guide', destination: '/en/croaziere/greek-islands-cruise-2026', permanent: true },
      { source: '/en/croaziere/mediterranean-cruise-guide', destination: '/en/croaziere/first-mediterranean-cruise-guide', permanent: true },
      { source: '/en/esim-roaming/best-esim-by-destination', destination: '/en/esim-roaming/cel-mai-bun-esim-per-destinatie', permanent: true },
      { source: '/en/experiente/amalfi-coast-complete-guide-2026', destination: '/en/city-breaks/amalfi-coast-complete-guide-2026', permanent: true },
      { source: '/en/experiente/things-to-do-florence', destination: '/en/city-breaks/florence-complete-guide-2026', permanent: true },
      { source: '/en/experiente/varsovia-complete-guide', destination: '/en/experiente/warsaw-complete-guide', permanent: true },
      { source: '/en/inchirieri-auto/transylvania-day-trips-bucharest', destination: '/en/experiente/transylvania-day-trips-bucharest', permanent: true },
      { source: '/en/zboruri/how-to-find-cheap-flights', destination: '/en/zboruri/cum-gasesti-bilete-avion-ieftine', permanent: true },
      { source: '/en/zboruri/turkey-2026-safety-guide', destination: '/en/asigurari/turkey-2026-safety-guide', permanent: true },
      { source: '/ro/asigurari/asigurare-calatorie-europa', destination: '/ro/asigurari/ghid-asigurare-calatorie', permanent: true },
      { source: '/ro/asigurari/escrocherii-calatorie-europa-2026', destination: '/ro/asigurari/scam-uri-inselatorii-vacanta-2026', permanent: true },
      { source: '/ro/asigurari/ghid-asigurare-calatorie-europa', destination: '/ro/asigurari/ghid-asigurare-calatorie', permanent: true },
      { source: '/ro/asigurari/travel-scams-europe-2026', destination: '/ro/asigurari/scam-uri-inselatorii-vacanta-2026', permanent: true },
      { source: '/ro/city-breaks/cele-mai-frumoase-plaje-europa-zbor-bucuresti', destination: '/ro/zboruri/cele-mai-frumoase-plaje-europa-zbor-bucuresti', permanent: true },
      { source: '/ro/city-breaks/road-trip-croatia-split-dubrovnik', destination: '/ro/inchirieri-auto/road-trip-croatia-split-dubrovnik', permanent: true },
      { source: '/ro/experiente/ce-sa-faci-in-florenta', destination: '/ro/city-breaks/florenta-ghid-complet-2026', permanent: true },
      { source: '/ro/experiente/ljubljana-ghid-complet', destination: '/ro/experiente/ce-sa-faci-in-ljubljana', permanent: true },
      { source: '/ro/inchirieri-auto/taxe-ascunse-rent-a-car', destination: '/ro/inchirieri-auto/taxe-ascunse-inchiriere-auto', permanent: true },
      { source: '/ro/zboruri/cum-calatoresti-ieftin-europa-2026', destination: '/ro/zboruri/trucuri-calatorie-ieftina-europa', permanent: true },
      { source: '/ro/zboruri/cum-sa-planifici-vacanta-europa-2026', destination: '/ro/zboruri/cum-planifici-vacanta-ghid-pas-cu-pas', permanent: true },
      { source: '/ro/zboruri/interrail-europa-2026-ghid-complet', destination: '/ro/calatorii/interrail-europa-2026-ghid-complet', permanent: true },
      { source: '/ro/zboruri/sfaturi-calatorii-ieftine-europa-2026', destination: '/ro/zboruri/trucuri-calatorie-ieftina-europa', permanent: true },
      { source: '/ro/zboruri/taxe-ascunse-inchiriere-auto', destination: '/ro/inchirieri-auto/taxe-ascunse-inchiriere-auto', permanent: true },
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();