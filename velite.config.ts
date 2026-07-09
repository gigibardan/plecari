// velite.config.ts — cu suport GYG widget în articole (gygQuery + gygLocale)
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
        vertical: s.string(),
        slug: s.string(),
        datePublished: s.string(),
        dateModified: s.string().optional(),
        featured: s.boolean().default(false),
        answer: s.string().optional(),
        widget: s.string().optional(),
        widgetHeight: s.number().optional(),
        gygQuery: s.string().optional(),
        gygLocale: s.string().optional(),
        cta: s
          .array(s.object({label: s.string(), href: s.string()}))
          .optional(),
        faq: s
          .array(s.object({question: s.string(), answer: s.string()}))
          .optional(),
        body: s.markdown()
      })
    },
    pages: {
      name: 'Page',
      pattern: 'pages/**/*.mdx',
      schema: s.object({
        title: s.string(),
        description: s.string().optional(),
        locale: s.enum(['ro', 'en']),
        slug: s.string(),
        updated: s.string().optional(),
        body: s.markdown()
      })
    }
  }
});