import {routing} from '@/i18n/routing';

// 🔴 SINGURA linie de schimbat în Faza 1: pune 'https://plecari.com'
export const SITE_URL = 'https://plecari.com';

export const SITE_NAME = 'Plecări';
export const LOCALES = routing.locales;
export const DEFAULT_LOCALE = routing.defaultLocale;

// Indexarea se aprinde SINGURĂ când SITE_URL devine plecari.com
export const INDEXABLE = SITE_URL.includes('plecari.com');