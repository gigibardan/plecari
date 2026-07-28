import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // ── Homepage ──────────────────────────────────────────────
      { source: '/', destination: '/ro', permanent: false },

      // ── Articole mutate din /legal/ în verticala corectă ─────
      {
        source: '/ro/legal/croaziera-insulele-grecesti-2026',
        destination: '/ro/croaziere/croaziera-insulele-grecesti-2026',
        permanent: true
      },
      {
        source: '/ro/legal/city-break-londra-bucuresti-2026',
        destination: '/ro/city-breaks/city-break-londra-bucuresti-2026',
        permanent: true
      },

      // ── Migrare sluguri EN: română → engleză ─────────────────

      // experiente / things-to-do-*
      { source: '/en/experiente/ce-sa-faci-in-roma', destination: '/en/experiente/things-to-do-rome', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-paris', destination: '/en/experiente/things-to-do-paris', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-istanbul', destination: '/en/experiente/things-to-do-istanbul', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-amsterdam', destination: '/en/experiente/things-to-do-amsterdam', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-atena', destination: '/en/experiente/things-to-do-athens', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-barcelona', destination: '/en/experiente/things-to-do-barcelona', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-bucuresti', destination: '/en/experiente/things-to-do-bucharest', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-budapesta', destination: '/en/experiente/things-to-do-budapest', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-viena', destination: '/en/experiente/things-to-do-vienna', permanent: true },
      { source: '/en/experiente/ce-sa-faci-in-praga', destination: '/en/experiente/things-to-do-prague', permanent: true },

      // croaziere
      { source: '/en/croaziere/ghid-croaziere-mediterana', destination: '/en/croaziere/mediterranean-cruise-guide', permanent: true },

      // asigurari
      { source: '/en/asigurari/ghid-asigurare-calatorie', destination: '/en/asigurari/travel-insurance-guide', permanent: true },
      { source: '/en/asigurari/ghid-asigurare-calatorie-2026', destination: '/en/asigurari/travel-insurance-guide', permanent: true },
      { source: '/en/asigurari/asigurare-viza-schengen', destination: '/en/asigurari/schengen-visa-insurance', permanent: true },
      { source: '/en/asigurari/card-european-vs-asigurare-calatorie', destination: '/en/asigurari/ehic-vs-travel-insurance', permanent: true },

      // zboruri
      { source: '/en/zboruri/cum-gasesti-bilete-avion-ieftine', destination: '/en/zboruri/how-to-find-cheap-flights', permanent: true },

      // inchirieri-auto
      { source: '/en/inchirieri-auto/taxe-ascunse-inchiriere-auto', destination: '/en/inchirieri-auto/hidden-car-rental-fees', permanent: true },
      { source: '/en/inchirieri-auto/inchiriere-masina-grecia-2026', destination: '/en/inchirieri-auto/car-rental-greece-2026', permanent: true },

      // esim-roaming
      { source: '/en/esim-roaming/cel-mai-bun-esim-per-destinatie', destination: '/en/esim-roaming/best-esim-by-destination', permanent: true },

      // ── 404-uri din Search Console ────────────────────────────
      { source: '/experiente/ce-sa-faci-in-roma', destination: '/ro/experiente/ce-sa-faci-in-roma', permanent: true },
      { source: '/en/city-breaks/ce-sa-faci-in-viena', destination: '/en/experiente/things-to-do-vienna', permanent: true },
      { source: '/en/city-breaks/city-break-dubrovnik-2026', destination: '/en/city-breaks/dubrovnik-city-break-guide', permanent: true },
      { source: '/ro/city-breaks/bucharest-city-break-guide', destination: '/ro/experiente/ce-sa-faci-in-bucuresti', permanent: true },
      { source: '/ro/city-breaks/dubrovnik-city-break-guide', destination: '/ro/city-breaks/city-break-dubrovnik-2026', permanent: true },
      { source: '/ro/esim-roaming/best-esim-europe-2026', destination: '/ro/esim-roaming/esim-vs-roaming', permanent: true },
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();