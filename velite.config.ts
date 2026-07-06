// velite.config.ts  (la RĂDĂCINA proiectului, lângă next.config.ts)
import {defineConfig, s} from 'velite';

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: {
    articles: {
      name: 'Article',
      pattern: 'articles/**/*.mdx',
      schema: s.object({
        title: s.string().max(120),
        description: s.string().max(200),
        locale: s.enum(['ro', 'en']),
        vertical: s.string(), // ex: 'asigurari', 'zboruri', 'croaziere'
        slug: s.string(),
        datePublished: s.string(), // format ISO: YYYY-MM-DD
        dateModified: s.string().optional(),
        featured: s.boolean().default(false),
        faq: s
          .array(s.object({question: s.string(), answer: s.string()}))
          .optional(),
        code: s.mdx() // compilează corpul MDX la build
      })
    }
  }
});
