// src/lib/content.ts
export { articles, pages } from '@velite/index';

// Export light — fără body, pentru search (reduce dimensiunea handler.mjs)
import { articles as _a } from '@velite/index';
export const articlesLight = _a.map(({
  title, description, vertical, slug, locale, datePublished, dateModified, body
}) => ({
  title,
  description,
  vertical,
  slug,
  locale,
  datePublished,
  dateModified,
  // wordCount calculat aici la build, nu la request
  wordCount: body ? Math.round(body.replace(/<[^>]+>/g, '').length / 5) : undefined,
}));