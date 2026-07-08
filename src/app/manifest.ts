import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Plecări - Portal de călătorii',
    short_name: 'Plecări',
    description: 'Portal de travel generalist bilingv (RO/EN): zboruri, cazări, asigurări și city breaks.',
    start_url: '/ro', 
    display: 'standalone', 
    background_color: '#FBF6EE', 
    theme_color: '#C15540', 
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      }
    ],
  };
}