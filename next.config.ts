import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async redirects() {
    return [{source: '/', destination: '/ro', permanent: false}];
  }
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);

// Enable calling `getCloudflareContext()` in `next dev`.
import {initOpenNextCloudflareForDev} from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();