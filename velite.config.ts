// velite.config.ts — complet cu gygQuery, gygLocale, gygLocationId, gygTours și cdLinkId
import { defineConfig, s } from 'velite';

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
        gygLocationId: s.string().optional(),
        gygTours: s
          .array(
            s.object({
              tourId: s.string(),
              afterHeading: s.string(),
              label: s.string().optional(),
              locale: s.string().optional(),
              currency: s.string().optional(),
              variant: s.enum(['horizontal', 'vertical']).optional()
            })
          )
          .optional(),
        cdLinkId: s.string().optional(), // NOU: Adăugat pentru widget-ul CruiseDirect
        bookingCity: s.string().optional(),
        translationOf: s.string().optional(), // slug-ul RO corespondent; se pune DOAR în articolele EN

        // Widgeturi Kiwi.com (prin Travelpayouts). URL-urile se construiesc în
        // src/config/kiwi.ts — aici ținem doar datele, nu link-uri scrise de mână.
        kiwiWidget: s
          .object({
            promoId: s.number().optional(),
            origin: s.string().optional(),
            destination: s.string().optional()
          })
          .optional(),
        kiwiWidgetGeneral: s
          .object({ promoId: s.number().optional() })
          .optional(),
        
        seoOffer: s
          .object({
            type: s.enum(['Product', 'TouristTrip']),
            name: s.string().optional(),
            description: s.string().optional(),
            provider: s.string().optional(),
            price: s.string().optional(),
            currency: s.string().optional(),
            url: s.string().optional()
          })
          .optional(),
        cta: s
          .array(s.object({ label: s.string(), href: s.string() }))
          .optional(),
        faq: s
          .array(s.object({ question: s.string(), answer: s.string() }))
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