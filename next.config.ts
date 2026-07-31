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
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();