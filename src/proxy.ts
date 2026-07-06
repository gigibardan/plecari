import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // rulează pe toate rutele, mai puțin api, fișiere statice, interne
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};