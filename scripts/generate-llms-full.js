#!/usr/bin/env node

/**
 * generate-llms-full.js
 * Generează automat llms-full.txt din articolele compilate de Velite.
 * Rulează după `npx velite`, înainte de build.
 *
 * Output: public/llms-full.txt
 * Utilizare: node scripts/generate-llms-full.js
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ── Configurare ──────────────────────────────────────────────────────────────

const CONFIG = {
  // Sursa articolelor compilate de Velite
  articlesJson: join(ROOT, '.velite', 'articles.json'),

  // Output
  outputPath: join(ROOT, 'public', 'llms-full.txt'),

  // URL-ul de bază al site-ului
  siteUrl: 'https://plecari.com',

  // Limită de dimensiune (bytes) — avertizează dacă depășește
  warnIfOver: 2 * 1024 * 1024, // 2MB

  // Câmpuri din frontmatter incluse în header-ul fiecărui articol
  frontmatterFields: [
    'title',
    'description',
    'locale',
    'vertical',
    'slug',
    'datePublished',
    'dateModified',
    'translationOf',
  ],

  // Verticale excluse (pagini tehnice, legal etc.)
  excludeVerticals: ['legal'],

  // Sluguri excluse explicit
  excludeSlugs: [],
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildUrl(locale, vertical, slug) {
  return `${CONFIG.siteUrl}/${locale}/${vertical}/${slug}`
}

function formatFrontmatter(article) {
  const lines = []
  for (const field of CONFIG.frontmatterFields) {
    if (article[field] !== undefined && article[field] !== null) {
      lines.push(`${field}: ${article[field]}`)
    }
  }
  return lines.join('\n')
}

function stripHtml(html) {
  // Elimină taguri HTML din conținutul compilat de Velite
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim()
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

// ── Main ──────────────────────────────────────────────────────────────────────

function generate() {
  console.log('📄 Generare llms-full.txt...')

  // Citește articolele compilate de Velite
  let articles
  try {
    const raw = readFileSync(CONFIG.articlesJson, 'utf-8')
    articles = JSON.parse(raw)
  } catch (err) {
    console.error(`❌ Nu s-a putut citi ${CONFIG.articlesJson}`)
    console.error('   Rulează mai întâi: npx velite')
    process.exit(1)
  }

  console.log(`   ${articles.length} articole găsite în .velite/articles.json`)

  // Filtrează articolele excluse
  const filtered = articles.filter((a) => {
    if (CONFIG.excludeVerticals.includes(a.vertical)) return false
    if (CONFIG.excludeSlugs.includes(a.slug)) return false
    return true
  })

  console.log(`   ${filtered.length} articole după filtrare`)

  // Sortează: RO înainte de EN, apoi alfabetic după slug
  filtered.sort((a, b) => {
    if (a.locale === 'ro' && b.locale === 'en') return -1
    if (a.locale === 'en' && b.locale === 'ro') return 1
    return a.slug.localeCompare(b.slug)
  })

  // Grupează pe limbi pentru statistici
  const roCount = filtered.filter((a) => a.locale === 'ro').length
  const enCount = filtered.filter((a) => a.locale === 'en').length

  // ── Construiește fișierul ─────────────────────────────────────────────────

  const now = new Date().toISOString()
  const lines = []

  // Header global
  lines.push(`# Plecări — llms-full.txt`)
  lines.push(``)
  lines.push(`> Conținut complet al portalului de travel plecari.com (RO + EN).`)
  lines.push(`> Generat automat la build time. Nu edita manual.`)
  lines.push(`> Ultima generare: ${now}`)
  lines.push(`> Articole incluse: ${filtered.length} (${roCount} RO, ${enCount} EN)`)
  lines.push(`> Site: https://plecari.com`)
  lines.push(``)
  lines.push(`---`)
  lines.push(``)

  // Cuprins rapid (linkuri)
  lines.push(`## Cuprins`)
  lines.push(``)
  for (const article of filtered) {
    const url = buildUrl(article.locale, article.vertical, article.slug)
    const lang = article.locale === 'ro' ? '🇷🇴' : '🇬🇧'
    lines.push(`- ${lang} [${article.title}](${url})`)
  }
  lines.push(``)
  lines.push(`---`)
  lines.push(``)

  // Conținut complet al fiecărui articol
  for (const article of filtered) {
    const url = buildUrl(article.locale, article.vertical, article.slug)

    // Separator și titlu
    lines.push(`## ${article.title}`)
    lines.push(``)

    // Metadata
    lines.push(`**URL:** ${url}`)
    lines.push(`**Limbă:** ${article.locale === 'ro' ? 'Română' : 'English'}`)
    lines.push(`**Verticală:** ${article.vertical}`)
    if (article.datePublished) lines.push(`**Publicat:** ${article.datePublished}`)
    if (article.dateModified) lines.push(`**Actualizat:** ${article.dateModified}`)
    if (article.translationOf) {
      lines.push(`**Traducere a:** [${article.translationOf}](${CONFIG.siteUrl}/ro/${article.vertical}/${article.translationOf})`)
    }
    lines.push(``)

    // Descriere (din frontmatter)
    if (article.description) {
      lines.push(`**Descriere:** ${article.description}`)
      lines.push(``)
    }

    // Răspuns scurt (câmpul answer din frontmatter)
    if (article.answer) {
      lines.push(`**Rezumat rapid:** ${article.answer}`)
      lines.push(``)
    }

    // Conținut complet (HTML → text curat)
    if (article.content || article.html) {
      const rawContent = article.html || article.content || ''
      const cleanContent = stripHtml(rawContent)
      if (cleanContent.length > 100) {
        lines.push(`**Conținut:**`)
        lines.push(``)
        lines.push(cleanContent)
        lines.push(``)
      }
    }

    // FAQ (dacă există în frontmatter)
    if (article.faq && Array.isArray(article.faq) && article.faq.length > 0) {
      lines.push(`**Întrebări frecvente:**`)
      lines.push(``)
      for (const item of article.faq) {
        lines.push(`**Î: ${item.question}**`)
        lines.push(`R: ${item.answer}`)
        lines.push(``)
      }
    }

    lines.push(`---`)
    lines.push(``)
  }

  // Footer
  lines.push(`*Generat automat de scripts/generate-llms-full.js*`)
  lines.push(`*© ${new Date().getFullYear()} Plecări (plecari.com) — Radu Cristescu*`)
  lines.push(`*Conținut disponibil pentru citare cu atribuire. Nu reprodus verbatim fără permisiune.*`)

  // ── Scrie fișierul ────────────────────────────────────────────────────────

  const output = lines.join('\n')
  const outputBytes = Buffer.byteLength(output, 'utf-8')

  // Creează directorul public/ dacă nu există
  mkdirSync(join(ROOT, 'public'), { recursive: true })

  writeFileSync(CONFIG.outputPath, output, 'utf-8')

  console.log(`✅ llms-full.txt generat: ${CONFIG.outputPath}`)
  console.log(`   Dimensiune: ${formatBytes(outputBytes)}`)
  console.log(`   Articole: ${filtered.length} (${roCount} RO, ${enCount} EN)`)

  if (outputBytes > CONFIG.warnIfOver) {
    console.warn(`⚠️  Fișierul depășește ${formatBytes(CONFIG.warnIfOver)} — consideră filtrarea`)
    console.warn(`   Poți exclude verticale sau limita conținutul la frontmatter + answer`)
  }
}

generate()