import type { APIRoute } from 'astro';

/**
 * robots.txt generato in fase di build.
 * Il riferimento alla sitemap viene aggiunto solo se il dominio è configurato
 * (vedi astro.config.mjs). La pagina /messaggio-inviato/ NON è bloccata qui,
 * perché i motori di ricerca devono poter leggere il suo meta "noindex".
 */
export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', 'Allow: /'];
  if (site) {
    lines.push('', `Sitemap: ${new URL('sitemap-index.xml', site).href}`);
  }
  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
