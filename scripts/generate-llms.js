#!/usr/bin/env node

/**
 * generate-llms.js
 * Generează AMBELE fișiere llms din datele compilate de Velite:
 *
 *   public/llms.txt       — index concis, format llmstxt.org (titlu + rezumat + linkuri)
 *   public/llms-full.txt  — textul complet al tuturor articolelor
 *
 * Rulează DUPĂ `velite`, ÎNAINTE de `next build`.
 *   node scripts/generate-llms.js
 *
 * De ce generat, nu scris de mână: lista de articole și slugurile se schimbă
 * la fiecare publicare. Un llms.txt scris manual rămâne în urmă și ajunge să
 * conțină linkuri 404 (exact ce s-a întâmplat cu versiunea anterioară, care
 * trimitea spre /ro/despre și /ro/legal/privacy — ambele inexistente).
 *
 * Partea editorială (titlu, rezumat, context despre site) NU e generată:
 * stă în content/llms-intro.md și se păstrează la fiecare regenerare.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

// ── Configurare ──────────────────────────────────────────────────────────────

const CONFIG = {
  siteUrl: 'https://plecari.com',

  articlesJson: join(ROOT, '.velite', 'articles.json'),
  pagesJson: join(ROOT, '.velite', 'pages.json'),
  verticalsTs: join(ROOT, 'src', 'config', 'verticals.ts'),
  introMd: join(ROOT, 'content', 'llms-intro.md'),

  outIndex: join(ROOT, 'public', 'llms.txt'),
  outFull: join(ROOT, 'public', 'llms-full.txt'),

  /** false → llms-full.txt conține doar metadate + FAQ (mic, ~1 MB).
   *  true  → include și textul integral al articolelor (~6-7 MB). */
  includeBody: true,

  /** Taie descrierile din index la atâtea caractere (0 = fără limită). */
  descriptionLimit: 140,

  /** Articole listate per verticală în llms.txt (0 = toate).
   *  Pune 15 dacă vrei un index scurt; restul rămâne descoperibil
   *  din sitemap.xml și llms-full.txt, ambele linkate la final. */
  maxPerVertical: 0,

  /** Avertizează la build dacă un fișier depășește limita. */
  warnIfOver: { index: 256 * 1024, full: 12 * 1024 * 1024 },

  excludeVerticals: [],
  excludeSlugs: [],
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const url = (locale, vertical, slug) => `${CONFIG.siteUrl}/${locale}/${vertical}/${slug}`
const legalUrl = (locale, slug) => `${CONFIG.siteUrl}/${locale}/legal/${slug}`

function read(path, what) {
  try {
    return JSON.parse(readFileSync(path, 'utf-8'))
  } catch {
    console.error(`❌ Nu s-a putut citi ${what} (${path}). Rulează mai întâi: npx velite`)
    process.exit(1)
  }
}

function stripHtml(html) {
  return String(html)
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(p|div|li|h[1-6]|tr|blockquote)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(?:39|x27);/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x26;/g, '&')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n')
    .map((l) => l.trim())
    .join('\n')
    .trim()
}

function clamp(text, limit) {
  const t = String(text || '').replace(/\s+/g, ' ').trim()
  if (!limit || t.length <= limit) return t
  return t.slice(0, limit - 1).replace(/[\s,;:.–—-]+$/, '') + '…'
}

const formatBytes = (b) =>
  b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(2)} MB`

/**
 * Citește etichetele verticalelor direct din src/config/verticals.ts,
 * ca să existe o singură sursă de adevăr. Dacă parsarea eșuează, scriptul
 * nu crapă build-ul — folosește slugul ca etichetă și avertizează.
 */
function readVerticalLabels() {
  const labels = new Map()
  let src
  try {
    src = readFileSync(CONFIG.verticalsTs, 'utf-8')
  } catch {
    console.warn('⚠️  verticals.ts nu a putut fi citit — folosesc slugurile ca etichete')
    return labels
  }
  const re = /slug:\s*'([^']+)'[\s\S]*?label:\s*\{\s*ro:\s*'([^']*)'\s*,\s*en:\s*'([^']*)'\s*\}/g
  let m
  while ((m = re.exec(src)) !== null) labels.set(m[1], { ro: m[2], en: m[3] })
  if (labels.size === 0) console.warn('⚠️  Nicio verticală extrasă din verticals.ts — verifică formatul')
  return labels
}

function readIntro() {
  if (existsSync(CONFIG.introMd)) return readFileSync(CONFIG.introMd, 'utf-8').trim()
  console.warn('⚠️  content/llms-intro.md lipsește — folosesc un antet minimal')
  return [
    '# Plecări',
    '',
    '> Portal editorial de călătorii bilingv română/engleză (plecari.com).',
  ].join('\n')
}

// ── Încărcare date ───────────────────────────────────────────────────────────

const articles = read(CONFIG.articlesJson, 'articles.json').filter(
  (a) => !CONFIG.excludeVerticals.includes(a.vertical) && !CONFIG.excludeSlugs.includes(a.slug)
)
const pages = existsSync(CONFIG.pagesJson) ? read(CONFIG.pagesJson, 'pages.json') : []
const labels = readVerticalLabels()

// Ordinea verticalelor: cea din verticals.ts, apoi orice verticală necunoscută.
const known = [...labels.keys()]
const present = [...new Set(articles.map((a) => a.vertical))]
const unknown = present.filter((v) => !known.includes(v))
if (unknown.length) {
  console.warn(`⚠️  Verticale prezente în articole dar absente din verticals.ts: ${unknown.join(', ')}`)
  console.warn('   Hub-urile lor nu există → vor da 404. Adaugă-le în src/config/verticals.ts.')
}
const order = [...known.filter((v) => present.includes(v)), ...unknown]

const heading = (v) => {
  const l = labels.get(v)
  if (!l) return v
  return l.ro === l.en ? l.ro : `${l.ro} (${l.en})`
}

const byDateDesc = (a, b) =>
  String(b.dateModified ?? b.datePublished ?? '').localeCompare(
    String(a.dateModified ?? a.datePublished ?? '')
  )

// ── 1. public/llms.txt ───────────────────────────────────────────────────────

function buildIndex() {
  const out = [readIntro(), '']

  for (const vertical of order) {
    const inVertical = articles.filter((a) => a.vertical === vertical)
    if (!inVertical.length) continue

    out.push(`## ${heading(vertical)}`, '')
    // Hub-urile verticalei — punctele de intrare, în ambele limbi.
    out.push(
      `- [${labels.get(vertical)?.ro ?? vertical} — hub RO](${CONFIG.siteUrl}/ro/${vertical})`,
      `- [${labels.get(vertical)?.en ?? vertical} — hub EN](${CONFIG.siteUrl}/en/${vertical})`,
      ''
    )
    for (const locale of ['ro', 'en']) {
      let list = inVertical.filter((a) => a.locale === locale).sort(byDateDesc)
      const total = list.length
      if (!total) continue
      if (CONFIG.maxPerVertical > 0) list = list.slice(0, CONFIG.maxPerVertical)
      out.push(`### ${locale.toUpperCase()}`, '')
      for (const a of list) {
        const desc = clamp(a.description, CONFIG.descriptionLimit)
        out.push(`- [${a.title}](${url(a.locale, a.vertical, a.slug)})${desc ? `: ${desc}` : ''}`)
      }
      if (list.length < total) {
        out.push(`- …și încă ${total - list.length} articole ${locale.toUpperCase()} în această verticală — vezi sitemap.xml`)
      }
      out.push('')
    }
  }

  if (pages.length) {
    out.push('## Pagini legale (Legal)', '')
    for (const locale of ['ro', 'en']) {
      const list = pages.filter((p) => p.locale === locale).sort((a, b) => a.slug.localeCompare(b.slug))
      if (!list.length) continue
      out.push(`### ${locale.toUpperCase()}`, '')
      for (const p of list) {
        const desc = clamp(p.description, CONFIG.descriptionLimit)
        out.push(`- [${p.title}](${legalUrl(p.locale, p.slug)})${desc ? `: ${desc}` : ''}`)
      }
      out.push('')
    }
  }

  out.push(
    '## Optional',
    '',
    `- [llms-full.txt](${CONFIG.siteUrl}/llms-full.txt): textul integral al tuturor articolelor, într-un singur fișier.`,
    `- [sitemap.xml](${CONFIG.siteUrl}/sitemap.xml): toate URL-urile cu hreflang RO/EN și dată de modificare.`,
    ''
  )

  return out.join('\n')
}

// ── 2. public/llms-full.txt ──────────────────────────────────────────────────

function buildFull() {
  const sorted = [...articles].sort((a, b) =>
    a.locale === b.locale ? a.vertical.localeCompare(b.vertical) || a.slug.localeCompare(b.slug)
                          : a.locale === 'ro' ? -1 : 1
  )
  const ro = sorted.filter((a) => a.locale === 'ro').length

  const out = [
    '# Plecări — llms-full.txt',
    '',
    '> Textul integral al articolelor de pe plecari.com (RO + EN).',
    '> Generat automat la build din scripts/generate-llms.js. Nu edita manual.',
    `> Generat: ${new Date().toISOString()}`,
    `> Articole: ${sorted.length} (${ro} RO, ${sorted.length - ro} EN)`,
    `> Index concis: ${CONFIG.siteUrl}/llms.txt`,
    '',
    '---',
    '',
  ]

  for (const a of sorted) {
    out.push(`## ${a.title}`, '')
    out.push(`URL: ${url(a.locale, a.vertical, a.slug)}`)
    out.push(`Limbă: ${a.locale === 'ro' ? 'Română' : 'English'}`)
    out.push(`Verticală: ${a.vertical}`)
    if (a.datePublished) out.push(`Publicat: ${a.datePublished}`)
    if (a.dateModified) out.push(`Actualizat: ${a.dateModified}`)
    if (a.translationOf) {
      const pair = articles.find((b) => b.locale === 'ro' && b.slug === a.translationOf)
      if (pair) out.push(`Versiunea RO: ${url(pair.locale, pair.vertical, pair.slug)}`)
    }
    out.push('')

    if (a.description) out.push(`Descriere: ${a.description}`, '')
    if (a.answer) out.push(`Răspuns scurt: ${a.answer}`, '')

    if (CONFIG.includeBody && a.body) {
      const text = stripHtml(a.body)
      if (text) out.push(text, '')
    }

    if (Array.isArray(a.faq) && a.faq.length) {
      out.push('### Întrebări frecvente', '')
      for (const item of a.faq) out.push(`Î: ${item.question}`, `R: ${item.answer}`, '')
    }

    out.push('---', '')
  }

  out.push(
    `© ${new Date().getFullYear()} Plecări (plecari.com).`,
    'Conținut disponibil pentru citare cu atribuire și link către sursă.'
  )
  return out.join('\n')
}

// ── Scriere ──────────────────────────────────────────────────────────────────

mkdirSync(join(ROOT, 'public'), { recursive: true })

for (const [name, content, path, limit] of [
  ['llms.txt', buildIndex(), CONFIG.outIndex, CONFIG.warnIfOver.index],
  ['llms-full.txt', buildFull(), CONFIG.outFull, CONFIG.warnIfOver.full],
]) {
  writeFileSync(path, content, 'utf-8')
  const bytes = Buffer.byteLength(content, 'utf-8')
  console.log(`✅ ${name.padEnd(14)} ${formatBytes(bytes).padStart(9)}  →  public/${name}`)
  if (bytes > limit) console.warn(`⚠️  ${name} depășește ${formatBytes(limit)}`)
}

console.log(
  `   ${articles.length} articole, ${pages.length} pagini legale, ${order.length} verticale` +
    (CONFIG.includeBody ? '' : '  (includeBody: false — llms-full fără text integral)')
)
