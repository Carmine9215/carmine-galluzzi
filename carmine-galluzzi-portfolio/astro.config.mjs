// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * DOMINIO CANONICO — unica fonte di verità per canonical, Open Graph, sitemap e robots.txt.
 *
 * Ordine di priorità:
 *   1. CUSTOM_DOMAIN qui sotto (quando avrai un dominio personale, es. 'https://www.carminegalluzzi.it').
 *   2. Variabile d'ambiente SITE_URL (impostabile nel pannello Netlify o in locale).
 *   3. Variabile URL che Netlify fornisce automaticamente in fase di build
 *      (es. 'https://nome-progetto.netlify.app').
 *
 * Se nessuno dei tre è disponibile (es. build locale senza variabili) il sito viene generato
 * SENZA canonical assoluti e SENZA sitemap: non vengono mai pubblicati indirizzi di esempio.
 */
const CUSTOM_DOMAIN = '';

const resolvedSite = (CUSTOM_DOMAIN || process.env.SITE_URL || process.env.URL || '').trim().replace(/\/+$/, '');
const site = resolvedSite || undefined;

/** Pagine escluse dalla sitemap (non indicizzabili). */
const EXCLUDED_FROM_SITEMAP = ['/messaggio-inviato/', '/404/'];

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  integrations: site
    ? [
        sitemap({
          filter: (page) => !EXCLUDED_FROM_SITEMAP.some((path) => page.endsWith(path)),
        }),
      ]
    : [],
  vite: {
    plugins: [tailwindcss()],
  },
});
