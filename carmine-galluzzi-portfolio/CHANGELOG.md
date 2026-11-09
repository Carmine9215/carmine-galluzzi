# Changelog

## v2.0.0 — Redesign premium (PROMPT 4)

Stessa architettura (Astro statico, Tailwind CSS 4, TypeScript, Netlify Forms). Nessuna nuova dipendenza npm.
Invariati: URL, metadati SEO, dati strutturati, logica e nomi dei campi del modulo, dati dei progetti.

### Nuovi file
- `src/components/HeroVisual.astro` — visual della hero: ecosistema software in SVG/CSS con spazio centrale per la foto.
- `src/components/TechStack.astro` — sezione “Tecnologie che trasformano le idee in prodotti digitali”.
- `src/components/ServicesGrid.astro` — griglia numerata dei servizi con indicatore e link al modulo.
- `public/fonts/` — Inter e Inter Display self-hosted (≈ 89 KB) con licenza OFL.

### File rimossi
- `src/components/PortraitSlot.astro`, `src/components/ServiceCard.astro` (sostituiti dai nuovi componenti).

### File modificati
- `src/styles/global.css` — nuovo design system: palette, tipografia `clamp()`, pulsanti, card, glow, griglie,
  animazioni CSS native allo scroll, riduzione effetti su mobile, `prefers-reduced-motion`.
- `src/components/Header.astro` — “CG. | Carmine Galluzzi”, navigazione centrale a pillola con indicatore della pagina,
  pulsante “Avvia un progetto”, trasparenza con blur, menu mobile con transizione e icona animata.
- `src/components/Hero.astro` — composizione asimmetrica, badge, nome, headline, CTA con entrata progressiva.
- `src/components/ProjectCard.astro` — varianti `feature`, `standard`, `horizontal`; card interamente cliccabile; hover con
  sollevamento, bordo luminoso, zoom dell’anteprima e freccia.
- `src/components/ProjectVisual.astro` — 8 interfacce astratte diverse + etichetta “Anteprima illustrativa”.
- `src/components/Footer.astro`, `CtaBanner.astro`, `SectionHeading.astro`, `StatusBadge.astro`, `Breadcrumb.astro`, `Logo.astro`.
- `src/components/ContactForm.astro` — solo stile (campi ampi, focus, riepilogo, pulsante); logica invariata.
- `src/pages/index.astro`, `chi-sono.astro`, `servizi.astro`, `contatti.astro`, `portfolio/index.astro`, `portfolio/[slug].astro`.
- `src/layouts/BaseLayout.astro` — preload dei font; rimosso lo script di comparsa (ora solo CSS).
- `src/data/services.ts` — i sei servizi del brief (aggiunto “Software personalizzato”, l’MVP è incluso al suo interno).
- `src/data/projects.ts` — campo grafico facoltativo `preview`.
- `src/i18n/ui.ts` — nuovi testi italiani e proposte inglesi.
- `public/favicon.svg`, `public/og-image.svg`, `public/og-image.png` — nuovo marchio “CG.”.
- `netlify.toml` — cache per i font.

### Problemi corretti durante il controllo visivo
- Colonna della hero più larga dello schermo a 375 px (badge non a capo): corretta con colonne `minmax(0, …)`.
- Placeholder dei progetti quasi identici: ora ogni progetto ha un’interfaccia diversa.
- Etichetta “Anteprima illustrativa” tagliata nelle card orizzontali: spostata in HTML.
- Celle vuote nella griglia delle funzionalità: sostituita con card separate.
- Pannello menu mobile dentro un elemento con `backdrop-filter` (rompe `position: fixed`): spostato fuori dall’header.

## v1.2.0 — Quality assurance e production readiness (PROMPT 2)

Nessuna nuova dipendenza, nessuna nuova funzionalità commerciale, design invariato.

### File modificati
| File | Correzione |
| --- | --- |
| `src/styles/global.css` | L’animazione di comparsa annullava l’effetto hover e le transizioni delle card (conflitto `transform`/`transition` tra layer CSS): ora usa la proprietà `translate`. Colore placeholder dei campi portato da 4,0:1 a 5,5:1 di contrasto. Focus da tastiera ben visibile sulle card interamente cliccabili. |
| `src/components/Header.astro` | Con il menu mobile aperto il contenuto sottostante è reso `inert` (non raggiungibile con Tab né dai lettori di schermo). |
| `src/components/SEO.astro` | JSON-LD serializzato in modo sicuro (escape di `<`). |
| `src/components/ProjectVisual.astro` | Testo alternativo più significativo per le anteprime illustrative. |
| `src/pages/index.astro`, `chi-sono.astro`, `servizi.astro` | Meta description e testi ottimizzati in modo naturale per le keyword principali. |
| `src/pages/portfolio/[slug].astro` | Meta description più completa e specifica per ogni progetto (nome, descrizione, stato). |
| `netlify.toml` | Rimossa la direttiva obsoleta `interest-cohort` (genera avvisi in console); aggiunte `Content-Security-Policy` compatibile con il sito statico, `Cross-Origin-Opener-Policy`, cache per favicon e immagine social, `X-Robots-Tag` anche sull’URL esatto `/messaggio-inviato/`. |
| `README.md` | Requisiti di sistema, sicurezza, checklist di deploy in 10 passi, troubleshooting, limiti della prima versione. |
| `package.json` | Versione 1.2.0. |

### Nuovi file
- `QA-REPORT.md` — report tecnico della revisione.

## v1.1.0 — Sviluppo avanzato e ottimizzazione (PROMPT 1)

Base di partenza: v1.0.0 (PROMPT 0). Stessa architettura: Astro statico + Tailwind CSS 4 + Netlify Forms.
Nessuna nuova dipendenza.

### Nuovi file
- `CHANGELOG.md`

### File modificati
| File | Modifiche |
| --- | --- |
| `src/components/Hero.astro` | Hero premium: nome in evidenza, nuovo claim, CTA “Esplora i miei progetti” / “Avvia un progetto”, riga tecnologie, elementi grafici tecnologici, bagliori discreti |
| `src/components/ServiceCard.astro` | Card competenze interamente cliccabili, bordo luminoso al passaggio, animazione di comparsa |
| `src/components/ProjectCard.astro` | Tecnologie mostrate solo se confermate, bordo luminoso, comparsa leggera |
| `src/components/ContactForm.astro` | Errori accessibili per campo, riepilogo errori, riepilogo della richiesta in tempo reale, contatore caratteri |
| `src/components/Footer.astro` | Sezioni Navigazione, Servizi, Progetti in evidenza, Contatti, Privacy policy; icone GitHub/LinkedIn/Facebook/Email solo se configurate |
| `src/components/CtaBanner.astro` | Nuova CTA predefinita “Hai un progetto in mente? Costruiamolo insieme.” |
| `src/components/SEO.astro` | `og:image:type`, `og:image:secure_url`, `hreflang` |
| `src/components/Icon.astro` | Nuove icone: api, cloud, facebook, target, alert |
| `src/components/Header.astro` | Menu mobile con sfondo pieno (niente blur a tutto schermo, più leggero su mobile) |
| `src/components/PortraitSlot.astro` | Bagliore senza filtro blur |
| `src/layouts/BaseLayout.astro` | Classe `js` per il miglioramento progressivo, script di comparsa delle sezioni |
| `src/styles/global.css` | Bagliori a gradiente (senza `filter: blur`), `overflow-x: clip`, animazioni di comparsa e filtro, stili errori modulo, rispetto di `prefers-reduced-motion` |
| `src/pages/index.astro` | Sezione Competenze con 6 card, JSON-LD Person/WebSite collegati tramite `@id`, title più breve |
| `src/pages/servizi.astro` | Pagina più commerciale: 6 nuovi servizi, panoramica, “Cosa ottieni”, “Cosa comprende”, “Ideale per”, metodo, FAQ, CTA per ogni servizio |
| `src/pages/portfolio/index.astro` | Etichette filtri in italiano, transizione delle card al cambio filtro |
| `src/pages/portfolio/[slug].astro` | Sezioni Presentazione e Obiettivi, nota sullo stato di avanzamento, funzionalità “previste” per progetti non ancora online |
| `src/pages/chi-sono.astro` | JSON-LD `ProfilePage`, comparsa leggera delle card |
| `src/pages/contatti.astro` | Bagliore senza filtro blur |
| `src/pages/404.astro` | Pagina 404 personalizzata con collegamenti utili |
| `src/data/services.ts` | 6 servizi del PROMPT 1, 6 competenze, FAQ, titoli inglesi proposti |
| `src/data/projects.ts` | Campo `goals` per ogni progetto, nuova mappa progetto → servizio, etichette filtri |
| `src/config/site.ts` | Contatto Facebook, validazione dei contatti prima della pubblicazione, tipo immagine OG |
| `src/i18n/ui.ts` | Nuovi testi italiani + blocco `en` con le proposte editoriali inglesi |
| `scripts/verify-build.mjs` | Controlli su CTA, link privacy, Open Graph e chiavi segrete |
| `README.md` | Documentazione aggiornata |

### Problemi corretti
- `filter: blur(90px)` su elementi grandi: costoso da disegnare su smartphone → sostituito con gradienti radiali.
- `overflow-x: hidden` sul body → `overflow-x: clip`, che evita lo scroll orizzontale senza interferire con l’header sticky.
- Menu mobile con `backdrop-filter` a tutto schermo → sfondo pieno.
- Contatti pubblicati anche con valori non validi → ora compaiono solo URL `https://`, email e numeri validi.
- Il modulo mostrava solo gli errori nativi del browser, poco chiari e non uniformi → errori accessibili in italiano.
- Le funzionalità dei progetti non ancora online erano presentate come “Funzionalità principali” → ora “previste”.
