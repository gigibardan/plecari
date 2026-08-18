#!/usr/bin/env node
// scripts/add-booking-city.js
// Adaugă bookingCity la frontmatter-ul tuturor articolelor de destinație.
// Rulare: node scripts/add-booking-city.js
// SAFE: nu suprascrie dacă bookingCity deja există.

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// ═══════════════════════════════════════════════════════════════
// MAPPING: slug → { ro: "Oraș, Țară", en: "City, Country" }
// Adaugă aici orice destinație nouă.
// Scriptul potrivește atât slug-ul articolului cât și conținutul
// titlului dacă slug-ul nu dă match direct.
// ═══════════════════════════════════════════════════════════════
const CITY_MAP = {
  // ── Italia ──────────────────────────────────────────────────
  'coasta-amalfi':        { ro: 'Coasta Amalfi, Italia',     en: 'Amalfi Coast, Italy' },
  'amalfi-coast':         { ro: 'Coasta Amalfi, Italia',     en: 'Amalfi Coast, Italy' },
  'napoli':               { ro: 'Napoli, Italia',            en: 'Naples, Italy' },
  'naples':               { ro: 'Napoli, Italia',            en: 'Naples, Italy' },
  'florenta':             { ro: 'Florența, Italia',          en: 'Florence, Italy' },
  'florence':             { ro: 'Florența, Italia',          en: 'Florence, Italy' },
  'venetia':              { ro: 'Veneția, Italia',           en: 'Venice, Italy' },
  'venice':               { ro: 'Veneția, Italia',           en: 'Venice, Italy' },
  'milano':               { ro: 'Milano, Italia',            en: 'Milan, Italy' },
  'milan':                { ro: 'Milano, Italia',            en: 'Milan, Italy' },
  'cinque-terre':         { ro: 'Cinque Terre, Italia',      en: 'Cinque Terre, Italy' },
  'sicilia':              { ro: 'Sicilia, Italia',           en: 'Sicily, Italy' },
  'sicily':               { ro: 'Sicilia, Italia',           en: 'Sicily, Italy' },
  'lacul-como':           { ro: 'Lacul Como, Italia',        en: 'Lake Como, Italy' },
  'lake-como':            { ro: 'Lacul Como, Italia',        en: 'Lake Como, Italy' },
  'toscana':              { ro: 'Toscana, Italia',           en: 'Tuscany, Italy' },
  'tuscany':              { ro: 'Toscana, Italia',           en: 'Tuscany, Italy' },
  'roma':                 { ro: 'Roma, Italia',              en: 'Rome, Italy' },
  'rome':                 { ro: 'Roma, Italia',              en: 'Rome, Italy' },
  'verona':               { ro: 'Verona, Italia',            en: 'Verona, Italy' },

  // ── Spania ──────────────────────────────────────────────────
  'barcelona':            { ro: 'Barcelona, Spania',         en: 'Barcelona, Spain' },
  'sevilla':              { ro: 'Sevilla, Spania',           en: 'Seville, Spain' },
  'seville':              { ro: 'Sevilla, Spania',           en: 'Seville, Spain' },
  'malaga':               { ro: 'Malaga, Spania',            en: 'Malaga, Spain' },

  // ── Portugalia ──────────────────────────────────────────────
  'porto':                { ro: 'Porto, Portugalia',         en: 'Porto, Portugal' },
  'lisabona':             { ro: 'Lisabona, Portugalia',      en: 'Lisbon, Portugal' },
  'lisbon':               { ro: 'Lisabona, Portugalia',      en: 'Lisbon, Portugal' },
  'portugalia':           { ro: 'Portugalia',                en: 'Portugal' },
  'portugal':             { ro: 'Portugalia',                en: 'Portugal' },

  // ── Franța ──────────────────────────────────────────────────
  'paris':                { ro: 'Paris, Franța',             en: 'Paris, France' },
  'marsilia':             { ro: 'Marsilia, Franța',          en: 'Marseille, France' },
  'marseille':            { ro: 'Marsilia, Franța',          en: 'Marseille, France' },

  // ── Germania ────────────────────────────────────────────────
  'munchen':              { ro: 'München, Germania',         en: 'Munich, Germany' },
  'munich':               { ro: 'München, Germania',         en: 'Munich, Germany' },
  'dresda':               { ro: 'Dresda, Germania',          en: 'Dresden, Germany' },
  'dresden':              { ro: 'Dresda, Germania',          en: 'Dresden, Germany' },
  'berlin':               { ro: 'Berlin, Germania',          en: 'Berlin, Germany' },

  // ── Austria ─────────────────────────────────────────────────
  'viena':                { ro: 'Viena, Austria',            en: 'Vienna, Austria' },
  'vienna':               { ro: 'Viena, Austria',            en: 'Vienna, Austria' },

  // ── Cehia ───────────────────────────────────────────────────
  'praga':                { ro: 'Praga, Cehia',             en: 'Prague, Czech Republic' },
  'prague':               { ro: 'Praga, Cehia',             en: 'Prague, Czech Republic' },
  'karlovy-vary':         { ro: 'Karlovy Vary, Cehia',      en: 'Karlovy Vary, Czech Republic' },

  // ── Ungaria ─────────────────────────────────────────────────
  'budapesta':            { ro: 'Budapesta, Ungaria',        en: 'Budapest, Hungary' },
  'budapest':             { ro: 'Budapesta, Ungaria',        en: 'Budapest, Hungary' },

  // ── Polonia ─────────────────────────────────────────────────
  'wroclaw':              { ro: 'Wrocław, Polonia',          en: 'Wrocław, Poland' },
  'cracovia':             { ro: 'Cracovia, Polonia',         en: 'Krakow, Poland' },
  'krakow':               { ro: 'Cracovia, Polonia',         en: 'Krakow, Poland' },
  'gdansk':               { ro: 'Gdańsk, Polonia',           en: 'Gdańsk, Poland' },
  'varsovia':             { ro: 'Varșovia, Polonia',         en: 'Warsaw, Poland' },
  'warsaw':               { ro: 'Varșovia, Polonia',         en: 'Warsaw, Poland' },

  // ── Slovacia ────────────────────────────────────────────────
  'bratislava':           { ro: 'Bratislava, Slovacia',      en: 'Bratislava, Slovakia' },

  // ── Țările Baltice ──────────────────────────────────────────
  'tallinn':              { ro: 'Tallinn, Estonia',          en: 'Tallinn, Estonia' },
  'riga':                 { ro: 'Riga, Letonia',             en: 'Riga, Latvia' },
  'vilnius':              { ro: 'Vilnius, Lituania',         en: 'Vilnius, Lithuania' },

  // ── Scandinavia ─────────────────────────────────────────────
  'oslo':                 { ro: 'Oslo, Norvegia',            en: 'Oslo, Norway' },
  'stockholm':            { ro: 'Stockholm, Suedia',         en: 'Stockholm, Sweden' },
  'copenhaga':            { ro: 'Copenhaga, Danemarca',      en: 'Copenhagen, Denmark' },
  'copenhagen':           { ro: 'Copenhaga, Danemarca',      en: 'Copenhagen, Denmark' },
  'helsinki':              { ro: 'Helsinki, Finlanda',        en: 'Helsinki, Finland' },

  // ── Balcani / Europa de Sud-Est ─────────────────────────────
  'tirana':               { ro: 'Tirana, Albania',           en: 'Tirana, Albania' },
  'skopje':               { ro: 'Skopje, Macedonia de Nord', en: 'Skopje, North Macedonia' },
  'ohrid':                { ro: 'Ohrid, Macedonia de Nord',  en: 'Ohrid, North Macedonia' },
  'novi-sad':             { ro: 'Novi Sad, Serbia',          en: 'Novi Sad, Serbia' },
  'belgrad':              { ro: 'Belgrad, Serbia',           en: 'Belgrade, Serbia' },
  'belgrade':             { ro: 'Belgrad, Serbia',           en: 'Belgrade, Serbia' },
  'mostar':               { ro: 'Mostar, Bosnia',            en: 'Mostar, Bosnia and Herzegovina' },
  'sarajevo':             { ro: 'Sarajevo, Bosnia',          en: 'Sarajevo, Bosnia and Herzegovina' },
  'zagreb':               { ro: 'Zagreb, Croația',           en: 'Zagreb, Croatia' },
  'dubrovnik':            { ro: 'Dubrovnik, Croația',        en: 'Dubrovnik, Croatia' },
  'split':                { ro: 'Split, Croația',            en: 'Split, Croatia' },
  'kotor':                { ro: 'Kotor, Muntenegru',         en: 'Kotor, Montenegro' },
  'budva':                { ro: 'Budva, Muntenegru',         en: 'Budva, Montenegro' },
  'sofia':                { ro: 'Sofia, Bulgaria',           en: 'Sofia, Bulgaria' },
  'ljubljana':            { ro: 'Ljubljana, Slovenia',       en: 'Ljubljana, Slovenia' },

  // ── Malta ───────────────────────────────────────────────────
  'valletta':             { ro: 'Valletta, Malta',           en: 'Valletta, Malta' },
  'malta':                { ro: 'Valletta, Malta',           en: 'Valletta, Malta' },

  // ── Olanda ──────────────────────────────────────────────────
  'amsterdam':            { ro: 'Amsterdam, Olanda',         en: 'Amsterdam, Netherlands' },

  // ── UK ──────────────────────────────────────────────────────
  'londra':               { ro: 'Londra, Regatul Unit',      en: 'London, United Kingdom' },
  'london':               { ro: 'Londra, Regatul Unit',      en: 'London, United Kingdom' },

  // ── Grecia ──────────────────────────────────────────────────
  'atena':                { ro: 'Atena, Grecia',             en: 'Athens, Greece' },
  'athens':               { ro: 'Atena, Grecia',             en: 'Athens, Greece' },
  'grecia':               { ro: 'Grecia',                    en: 'Greece' },
  'greece':               { ro: 'Grecia',                    en: 'Greece' },

  // ── Turcia ──────────────────────────────────────────────────
  'istanbul':             { ro: 'Istanbul, Turcia',          en: 'Istanbul, Turkey' },
  'antalya':              { ro: 'Antalya, Turcia',           en: 'Antalya, Turkey' },

  // ── Moldova ─────────────────────────────────────────────────
  'chisinau':             { ro: 'Chișinău, Moldova',         en: 'Chișinău, Moldova' },
  'orheiul-vechi':        { ro: 'Orheiul Vechi, Moldova',    en: 'Orheiul Vechi, Moldova' },

  // ── România ─────────────────────────────────────────────────
  'sibiu':                { ro: 'Sibiu, România',            en: 'Sibiu, Romania' },
  'alba-iulia':           { ro: 'Alba Iulia, România',       en: 'Alba Iulia, Romania' },
  'brasov':               { ro: 'Brașov, România',           en: 'Brașov, Romania' },
  'sighisoara':           { ro: 'Sighișoara, România',       en: 'Sighișoara, Romania' },
  'sinaia':               { ro: 'Sinaia, România',           en: 'Sinaia, Romania' },
  'cluj-napoca':          { ro: 'Cluj-Napoca, România',      en: 'Cluj-Napoca, Romania' },
  'cluj':                 { ro: 'Cluj-Napoca, România',      en: 'Cluj-Napoca, Romania' },
  'iasi':                 { ro: 'Iași, România',             en: 'Iași, Romania' },
  'oradea':               { ro: 'Oradea, România',           en: 'Oradea, Romania' },
  'bucuresti':            { ro: 'București, România',        en: 'Bucharest, Romania' },
  'bucharest':            { ro: 'București, România',        en: 'Bucharest, Romania' },
  'transilvania':         { ro: 'Transilvania, România',     en: 'Transylvania, Romania' },
  'transylvania':         { ro: 'Transilvania, România',     en: 'Transylvania, Romania' },

  // ── Egipt ───────────────────────────────────────────────────
  'egipt':                { ro: 'Egipt',                     en: 'Egypt' },
  'egypt':                { ro: 'Egipt',                     en: 'Egypt' },

  // ── Bulgaria (țară) ─────────────────────────────────────────
  'bulgaria':             { ro: 'Bulgaria',                  en: 'Bulgaria' },

  // ── Croația (road trip) ─────────────────────────────────────
  'croatia':              { ro: 'Croația',                   en: 'Croatia' },

  // ── Rute speciale ────────────────────────────────────────────
  'drumul-romantic':      { ro: 'München, Germania',         en: 'Munich, Germany' },
  'romantic-road':        { ro: 'München, Germania',         en: 'Munich, Germany' },

  // ── Turcia (ghiduri țară) ───────────────────────────────────
  'turcia':               { ro: 'Turcia',                    en: 'Turkey' },
  'turkey':               { ro: 'Turcia',                    en: 'Turkey' },

  // ── Moldova (vinuri + old-orhei EN slug) ────────────────────
  'vinuri-moldova':       { ro: 'Chișinău, Moldova',         en: 'Chișinău, Moldova' },
  'wine-tours':           { ro: 'Chișinău, Moldova',         en: 'Chișinău, Moldova' },
  'old-orhei':            { ro: 'Orheiul Vechi, Moldova',    en: 'Orheiul Vechi, Moldova' },
};

// Verticale care NU primesc booking (nu au sens)
const SKIP_VERTICALS = ['asigurari', 'esim-roaming'];

// Slug-uri non-destinație care trebuie excluse explicit
const SKIP_SLUGS = ['taxe-ascunse-vacanta'];

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
const files = glob.sync('content/articles/**/*.mdx');

let updated = 0;
let skipped = 0;
let noMatch = 0;

for (const filePath of files) {
  const raw = fs.readFileSync(filePath, 'utf-8');

  // Extrage frontmatter
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    console.log(`⏭️  SKIP (no frontmatter): ${path.basename(filePath)}`);
    skipped++;
    continue;
  }

  const fm = fmMatch[1];

  // Deja are bookingCity? Skip.
  if (fm.includes('bookingCity:')) {
    console.log(`✅ SKIP (already has bookingCity): ${path.basename(filePath)}`);
    skipped++;
    continue;
  }

  // Extrage locale și vertical
  const localeMatch = fm.match(/^locale:\s*(\w+)/m);
  const verticalMatch = fm.match(/^vertical:\s*([\w-]+)/m);
  const slugMatch = fm.match(/^slug:\s*([\w-]+)/m);

  if (!localeMatch || !slugMatch) {
    console.log(`⏭️  SKIP (missing locale/slug): ${path.basename(filePath)}`);
    skipped++;
    continue;
  }

  const locale = localeMatch[1]; // 'ro' sau 'en'
  const vertical = verticalMatch ? verticalMatch[1] : '';
  const slug = slugMatch[1];

  // Skip verticale și slug-uri nerelevante
  if (SKIP_VERTICALS.includes(vertical) || SKIP_SLUGS.some(s => slug.includes(s))) {
    console.log(`⏭️  SKIP (vertical ${vertical}): ${path.basename(filePath)}`);
    skipped++;
    continue;
  }

  // Caută match în CITY_MAP — încearcă slug-ul, apoi sub-stringuri
  let cityEntry = null;

  // 1. Match direct pe slug
  for (const [key, value] of Object.entries(CITY_MAP)) {
    if (slug.includes(key)) {
      cityEntry = value;
      break;
    }
  }

  if (!cityEntry) {
    console.log(`❓ NO MATCH: ${path.basename(filePath)} (slug: ${slug})`);
    noMatch++;
    continue;
  }

  const bookingCity = locale === 'en' ? cityEntry.en : cityEntry.ro;

  // Inserează bookingCity în frontmatter (după slug: sau după locale:)
  const insertAfter = fm.includes('cdLinkId:') ? 'cdLinkId:' :
                      fm.includes('gygLocationId:') ? 'gygLocationId:' :
                      'slug:';

  const insertRegex = new RegExp(`(^${insertAfter}\\s*.+$)`, 'm');
  const newFm = fm.replace(insertRegex, `$1\nbookingCity: "${bookingCity}"`);

  if (newFm === fm) {
    // Fallback: inserează înainte de prima linie goală sau înainte de answer:
    const fallbackInsert = fm.replace(
      /^(slug:\s*.+)$/m,
      `$1\nbookingCity: "${bookingCity}"`
    );
    const newRaw = raw.replace(fmMatch[1], fallbackInsert);
    fs.writeFileSync(filePath, newRaw, 'utf-8');
  } else {
    const newRaw = raw.replace(fmMatch[1], newFm);
    fs.writeFileSync(filePath, newRaw, 'utf-8');
  }

  console.log(`✏️  UPDATED: ${path.basename(filePath)} → bookingCity: "${bookingCity}"`);
  updated++;
}

console.log('\n═══════════════════════════════════════');
console.log(`✏️  Updated: ${updated}`);
console.log(`✅ Skipped: ${skipped}`);
console.log(`❓ No match: ${noMatch}`);
console.log(`📁 Total files: ${files.length}`);
console.log('═══════════════════════════════════════');
console.log('\n⚠️  Rulează `npx velite` după migrare!');