// velite.config.ts — versiune fără eval (compilează markdown -> HTML la build)
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
        // elemente "speciale" mutate în frontmatter (randate ca React, fără eval):
        answer: s.string().optional(), // paragraful-răspuns (AnswerBox)
        widget: s.string().optional(), // scriptSrc pentru motorul de căutare
        faq: s
          .array(s.object({question: s.string(), answer: s.string()}))
          .optional(),
        // corpul articolului: markdown (inclusiv tabele GFM) -> HTML la build
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
        body: s.markdown() // markdown -> HTML
      })
    }
  }
});