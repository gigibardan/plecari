import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // Homepage
      { source: '/', destination: '/ro', permanent: false },
      // Articole mutate din /legal/ în verticala corectă
      {
        source: '/ro/legal/croaziera-insulele-grecesti-2026',
        destination: '/ro/croaziere/croaziera-insulele-grecesti-2026',
        permanent: true
      },
      {
        source: '/ro/legal/city-break-londra-bucuresti-2026',
        destination: '/ro/city-breaks/city-break-londra-bucuresti-2026',
        permanent: true
      }
    ];
  }
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);

import {initOpenNextCloudflareForDev} from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();