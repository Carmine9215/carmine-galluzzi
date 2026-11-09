#!/usr/bin/env node
/**
 * Verifiche automatiche sulla cartella dist/ dopo `npm run build`.
 * Uso: node scripts/verify-build.mjs   (oppure: npm run verify)
 *
 * Controlla:
 *  - presenza delle pagine principali e di tutte le pagine progetto
 *  - un solo <h1>, <title> e meta description in ogni pagina
 *  - collegamenti interni che puntano a pagine/file esistenti (incluse le ancore #id)
 *  - immagini con attributo alt
 *  - modulo Netlify "richiesta-progetto" presente nell'HTML statico
 *  - robots.txt e (se il dominio è configurato) sitemap senza pagine noindex
 *  - noindex sulla pagina /messaggio-inviato/
 *  - assenza di domini di esempio nei canonical
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = join(process.cwd(), 'dist');
const errors = [];
const warnings = [];
const ok = (msg) => console.log(`  ✔ ${msg}`);
const fail = (msg) => errors.push(msg);

if (!existsSync(DIST)) {
  console.error('dist/ non trovato: esegui prima `npm run build`.');
  process.exit(1);
}

/** Tutti i file HTML in dist */
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}
const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const pageUrl = (file) => {
  const rel = relative(DIST, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
};
const pages = new Map(htmlFiles.map((f) => [pageUrl(f), readFileSync(f, 'utf8')]));

console.log(`\nVerifica di ${htmlFiles.length} pagine HTML in dist/\n`);

// 1. Pagine attese --------------------------------------------------------
// Legge l'archivio progetti direttamente dal sorgente TypeScript (Node ≥ 22.18 rimuove i tipi in automatico).
const { getVisibleProjects } = await import(pathToFileURL(join(process.cwd(), 'src', 'data', 'projects.ts')).href).catch(
  () => {
    warnings.push('Archivio progetti non leggibile da Node (serve Node ≥ 22.18): controllo pagine per slug saltato.');
    return { getVisibleProjects: null };
  },
);
const expected = ['/', '/chi-sono/', '/portfolio/', '/servizi/', '/contatti/', '/messaggio-inviato/', '/privacy/', '/404.html'];
for (const p of expected) if (!pages.has(p)) fail(`Pagina mancante: ${p}`);
const projectPages = [...pages.keys()].filter((p) => /^\/portfolio\/[^/]+\/$/.test(p));
ok(`Pagine principali presenti; pagine progetto generate: ${projectPages.length}`);
if (getVisibleProjects) {
  for (const pr of getVisibleProjects()) if (!pages.has(`/portfolio/${pr.slug}/`)) fail(`Pagina progetto mancante: ${pr.slug}`);
}

// 2. Struttura di ogni pagina ---------------------------------------------
const idsByPage = new Map();
for (const [url, html] of pages) {
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(`${url}: trovati ${h1} <h1> (atteso 1)`);
  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${url}: <title> mancante`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) fail(`${url}: meta description mancante`);
  if (!/<html lang="it"/.test(html)) fail(`${url}: attributo lang mancante`);
  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\balt="/.test(img)) fail(`${url}: immagine senza alt → ${img.slice(0, 80)}`);
    if (!/\bwidth="/.test(img) || !/\bheight="/.test(img)) warnings.push(`${url}: immagine senza dimensioni → ${img.slice(0, 80)}`);
  }
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (canon && /(example\.(com|org)|localhost|tuodominio)/.test(canon[1])) fail(`${url}: canonical non valido ${canon[1]}`);
  idsByPage.set(url, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}
ok('Un solo H1, title, meta description e lang verificati');

// 3. Collegamenti interni --------------------------------------------------
const existsTarget = (path) => {
  if (pages.has(path)) return true;
  if (pages.has(path.endsWith('/') ? path : `${path}/`)) return true;
  return existsSync(join(DIST, decodeURIComponent(path)));
};
let linkCount = 0;
for (const [url, html] of pages) {
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const raw = m[1];
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(raw)) continue;
    linkCount++;
    const [pathAndQuery, hash] = raw.split('#');
    const path = (pathAndQuery.split('?')[0] || url).replace(/^(?!\/)/, url);
    if (!existsTarget(path)) {
      fail(`${url}: collegamento interrotto → ${raw}`);
      continue;
    }
    if (hash) {
      const targetPage = pages.has(path) ? path : `${path}/`;
      const ids = idsByPage.get(targetPage);
      if (ids && !ids.has(hash)) fail(`${url}: ancora inesistente → ${raw}`);
    }
  }
}
ok(`${linkCount} collegamenti interni controllati`);

// 4. Modulo Netlify ----------------------------------------------------------
const contact = pages.get('/contatti/') || '';
const formTag = contact.match(/<form\b[^>]*>/)?.[0] || '';
const checks = [
  [/name="richiesta-progetto"/.test(formTag), 'attributo name="richiesta-progetto"'],
  [/method="POST"/i.test(formTag), 'method="POST"'],
  [/data-netlify="true"/.test(formTag), 'data-netlify="true"'],
  [/netlify-honeypot="bot-field"/.test(formTag), 'netlify-honeypot="bot-field"'],
  [/action="\/messaggio-inviato\/"/.test(formTag), 'action verso /messaggio-inviato/'],
  [/<input type="hidden" name="form-name" value="richiesta-progetto"/.test(contact), 'campo nascosto form-name'],
  [/name="bot-field"/.test(contact), 'campo honeypot bot-field'],
  [/href="\/privacy\/"/.test(contact), 'link all’informativa privacy'],
];
for (const [pass, label] of checks) pass ? null : fail(`Modulo contatti: manca ${label}`);
for (const field of ['nome', 'email', 'messaggio', 'privacy']) {
  const re = new RegExp(`<(input|textarea)[^>]*name="${field}"[^>]*required`);
  if (!re.test(contact)) fail(`Modulo contatti: il campo "${field}" non è obbligatorio`);
}
ok('Modulo Netlify Forms presente nell’HTML statico');

// 5. Pagina di conferma ------------------------------------------------------
if (!/<meta name="robots" content="noindex/.test(pages.get('/messaggio-inviato/') || '')) fail('/messaggio-inviato/ non ha meta noindex');
else ok('/messaggio-inviato/ marcata noindex');

// 6. robots.txt e sitemap ----------------------------------------------------
const robotsPath = join(DIST, 'robots.txt');
if (!existsSync(robotsPath)) fail('robots.txt mancante');
else {
  const robots = readFileSync(robotsPath, 'utf8');
  if (!/User-agent: \*/.test(robots)) fail('robots.txt senza User-agent');
  ok(`robots.txt presente${/Sitemap:/.test(robots) ? ' (con riferimento alla sitemap)' : ''}`);
}
const sitemapIndex = join(DIST, 'sitemap-index.xml');
if (existsSync(sitemapIndex)) {
  const xml = files.filter((f) => /sitemap-\d+\.xml$/.test(f)).map((f) => readFileSync(f, 'utf8')).join('');
  if (/messaggio-inviato/.test(xml)) fail('La sitemap contiene /messaggio-inviato/');
  if (/example\.(com|org)|localhost/.test(xml)) fail('La sitemap contiene indirizzi non validi');
  const count = (xml.match(/<loc>/g) || []).length;
  ok(`Sitemap generata con ${count} URL`);
} else {
  warnings.push('Sitemap non generata: dominio non configurato (normale in locale senza SITE_URL; su Netlify viene usata la variabile URL).');
}

// 7. CTA, footer, social, segreti -------------------------------------------
for (const p of ['/', '/chi-sono/', '/portfolio/', '/servizi/']) {
  if (!/Hai un progetto in mente\? Costruiamolo insieme\./.test(pages.get(p) || '')) fail(`${p}: call to action finale mancante`);
}
for (const [url, html] of pages) {
  if (!/href="\/privacy\/"/.test(html)) fail(`${url}: link alla privacy policy mancante nel footer`);
  if (!/<meta property="og:title"/.test(html)) fail(`${url}: Open Graph mancante`);
}
ok('CTA finale, link privacy e Open Graph presenti');

const SECRET_PATTERNS = [/sk_(live|test)_[0-9a-zA-Z]{10,}/, /AKIA[0-9A-Z]{16}/, /eyJhbGciOi[0-9A-Za-z_-]{20,}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/, /api[_-]?key\s*[:=]\s*["'][^"']{12,}/i];
for (const f of files.filter((x) => /\.(html|js|css|txt|xml|json)$/.test(x))) {
  const content = readFileSync(f, 'utf8');
  for (const re of SECRET_PATTERNS) if (re.test(content)) fail(`Possibile chiave segreta in ${relative(DIST, f)}`);
}
ok('Nessuna chiave segreta rilevata nei file pubblicati');

// Risultato -----------------------------------------------------------------
if (warnings.length) {
  console.log('\nAvvisi:');
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}
if (errors.length) {
  console.error(`\n✖ ${errors.length} errori:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('\n✔ Tutte le verifiche sono state superate.\n');
