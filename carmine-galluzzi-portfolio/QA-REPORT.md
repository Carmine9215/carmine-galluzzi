# Report tecnico

## Aggiornamento v2.0.0 — Redesign (7 novembre 2026)

**Metodo di verifica.** L’ambiente non ha rete, quindi `npm install`, la build Astro ufficiale e Lighthouse non sono
stati eseguiti. Per il controllo visivo è stata usata un’anteprima locale **esterna al progetto**: i template `.astro`
convertiti in JSX e renderizzati in HTML statico, con il **compilatore Tailwind CSS 4 reale** e Chrome headless.
È fedele per layout, CSS e JavaScript, ma **non sostituisce `astro build`**, che resta da eseguire.

| Test | Esito |
| --- | --- |
| Screenshot di 9 pagine a 375, 390, 768, 1366, 1920 px | ✅ Eseguito e revisionato |
| Scroll orizzontale / elementi fuori viewport (tutte le pagine, 5 larghezze) | ✅ Nessuno (dopo correzione a 375 px) |
| Un solo H1 per pagina | ✅ |
| Menu mobile: apertura, `inert`, focus, chiusura con Esc | ✅ Test automatico nel browser |
| Filtri portfolio: categoria, vista vuota, ritorno a “Tutti”, URL | ✅ Test automatico |
| Modulo: preselezione servizio, errori accessibili, riepilogo, nomi dei campi invariati | ✅ Test automatico |
| Errori JavaScript in console | ✅ Nessuno |
| `scripts/verify-build.mjs` sull’anteprima (link, form Netlify, noindex, CTA, segreti) | ✅ 790 link interni verificati |
| TypeScript: dati, frontmatter `.astro`, script client | ✅ 0 errori |
| LCP/CLS indicativi sull’anteprima (390 px con rete 1,6 Mbps e CPU 4×) | LCP ≈ 1,5 s · CLS 0,000 — **non è un punteggio Lighthouse** |
| Build Astro ufficiale, `astro check`, `npm audit`, Lighthouse | ⏸ Non eseguiti (nessuna rete) |
| Invio reale del modulo su Netlify | 🌐 Dopo il deploy |

---

## Revisione v1.2.0 — Quality assurance e production readiness

Progetto: `carmine-galluzzi-portfolio` · Versione: 1.2.0 · Data revisione: 7 novembre 2026

> **Limite dell’ambiente di revisione.** L’ambiente in cui è stata svolta la revisione non ha accesso alla rete:
> non è stato possibile eseguire `npm install`, quindi **build Astro, `astro check`, `npm audit`, test nel browser
> e Lighthouse non sono stati eseguiti**. Al loro posto sono state svolte le verifiche statiche descritte sotto.
> Nessun risultato riportato qui è stimato o inventato.

---

## A. Stato del progetto

**Codice pronto per il primo deploy, con una condizione: la build reale va eseguita e superata in locale**
(`npm install` → `npm run verify`) prima del push.

- Nessun problema bloccante individuato dall’analisi statica.
- Non bloccante ma da completare prima del deploy: generare e committare `package-lock.json` (si crea con `npm install`).
- Configurazione Netlify corretta per sito statico (build `npm run build`, publish `dist`, nessun adapter SSR, nessuna funzione).

## B. Modifiche effettuate

| File | Problema corretto |
| --- | --- |
| `src/styles/global.css` | **Conflitto CSS:** le regole di comparsa (`.reveal`, fuori dai layer Tailwind) sovrascrivevano `transform` e `transition` delle card, annullando l’effetto hover. Ora usano la proprietà `translate`. |
| `src/styles/global.css` | **Contrasto:** testo segnaposto dei campi a 4,0:1 → 5,5:1 (soglia WCAG AA 4,5:1). |
| `src/styles/global.css` | **Focus:** contorno cyan da 2px sulle card interamente cliccabili quando il link riceve il focus da tastiera. |
| `src/components/Header.astro` | **Menu mobile:** con il menu aperto, contenuto e footer diventano `inert` (Tab e lettori di schermo restano nel menu). |
| `src/components/SEO.astro` | **Sicurezza:** JSON-LD serializzato con escape di `<`. |
| `src/components/ProjectVisual.astro` | **Alt:** descrizione più significativa delle anteprime illustrative. |
| `src/pages/index.astro`, `chi-sono.astro`, `servizi.astro` | **SEO:** meta description e testi con le keyword principali inserite in modo naturale. |
| `src/pages/portfolio/[slug].astro` | **SEO:** meta description specifica per progetto (nome, descrizione, stato). |
| `netlify.toml` | **Best practices/sicurezza:** rimossa `interest-cohort` (direttiva obsoleta che genera avvisi in console); aggiunte CSP compatibile, COOP, cache per favicon/OG, `X-Robots-Tag` anche su `/messaggio-inviato/`. |
| `README.md`, `CHANGELOG.md`, `package.json`, `QA-REPORT.md` | Documentazione e versione. |

## C. Test

Legenda: ✅ Superato · ❌ Non superato · ⏸ Non eseguito · 🌐 Richiede verifica dopo il deploy

| Test | Esito | Note |
| --- | --- | --- |
| `npm install` / `npm ci` | ⏸ | Nessuna rete nell’ambiente |
| `npm run build` | ⏸ | Richiede le dipendenze |
| `astro check` | ⏸ | Richiede le dipendenze |
| `npm audit` | ⏸ | Richiede rete e lockfile |
| TypeScript dei dati (`site.ts`, `projects.ts`, `services.ts`, `ui.ts`) — `tsc --strict` | ✅ | 0 errori |
| TypeScript del frontmatter di tutti i 25 file `.astro` (con tipi Astro simulati) | ✅ | 0 errori |
| TypeScript dei 4 script client (menu, filtri, modulo, comparsa) con tipi DOM | ✅ | 0 errori |
| Bilanciamento di tag e graffe nei template `.astro` | ✅ | Nessuna anomalia reale |
| Import, icone e chiavi di traduzione referenziate esistenti | ✅ | |
| Link interni statici verso pagine esistenti | ✅ | Tutti i `href` interni puntano a pagine generate |
| Ancore dei servizi (`/servizi/#…`) coerenti con gli slug | ✅ | 6/6 competenze, mappa progetto→servizio |
| Archivio progetti: 8 visibili, slug unici e validi, blocco “pubblicato senza URL” | ✅ | 0 demo e 0 URL pubblici configurati → nessun pulsante demo mostrato |
| Script di verifica `verify-build.mjs` su output di prova (positivo e negativo) | ✅ | Rileva H1 multipli e link interrotti |
| Link `target="_blank"` con `rel="noopener"` | ✅ | |
| Segreti, script e servizi esterni nel codice | ✅ | Nessuno trovato |
| Contrasto colori della palette (calcolo WCAG) | ✅ | Dopo correzione del placeholder; tutti ≥ 4,5:1 per il testo |
| Rendering delle pagine nel browser | ⏸ | Richiede la build |
| Menu mobile, filtri, modulo nel browser | ⏸ / 🌐 | Logica verificata staticamente |
| Viewport 375 / 390 / 768 / 1366 / 1920 px | ⏸ / 🌐 | Layout rivisto sul codice; verifica visiva da fare |
| Lighthouse | ⏸ / 🌐 | Nessun punteggio misurato |
| Sitemap e robots.txt con dominio reale | 🌐 | Generati solo con `URL`/`SITE_URL` |
| Invio reale del modulo e notifica email | 🌐 | Vedi sezione F |

## D. SEO

Verificato sul codice:
- Title univoco e meta description specifica per ogni pagina e per ognuno degli 8 progetti.
- Un solo H1 per pagina; H2/H3 in ordine (incluse card, footer e sidebar progetto).
- URL leggibili: `/chi-sono/`, `/portfolio/<slug>/`, `/servizi/`, `/contatti/`, `/privacy/`.
- Canonical, Open Graph (immagine 1200×630 con tipo e dimensioni) e Twitter Card generati con URL assoluti solo se il dominio è configurato.
- JSON-LD: `Person` + `WebSite` (home, collegati con `@id`), `ProfilePage` (Chi sono), `BreadcrumbList` (portfolio e progetti). Solo dati veri: nessun indirizzo, telefono, recensione o profilo social inventato.
- Sitemap: `@astrojs/sitemap` attiva quando `site` è disponibile; esclude `/messaggio-inviato/` e la 404.
- robots.txt: `Allow: /`, nessun blocco globale, riga `Sitemap:` solo con URL reale.
- `/messaggio-inviato/` e 404: `noindex`.

Residui:
- Dominio definitivo non scelto: il sito usa automaticamente l’URL `*.netlify.app`. Quando avrai un dominio, impostalo in `CUSTOM_DOMAIN` (`astro.config.mjs`).
- Pagina privacy indicizzabile pur essendo in bozza: completarla prima di promuovere il sito.
- Dopo il deploy: registrare il sito in Google Search Console e inviare la sitemap.

## E. Sicurezza

| Gravità | Riscontro | Stato |
| --- | --- | --- |
| Media | JSON-LD inserito senza escape (rischio teorico: dati statici, nessun input utente) | Corretto |
| Bassa | `Permissions-Policy` con direttiva obsoleta `interest-cohort` | Corretto |
| Bassa | Assenza di Content-Security-Policy | Aggiunta CSP compatibile (solo risorse dello stesso dominio) |
| — | Chiavi API, token, credenziali, script esterni | Nessuno presente |
| — | Vulnerabilità delle dipendenze | **Non verificabile qui**: eseguire `npm audit` dopo `npm install` |

Note sulla CSP: richiede `'unsafe-inline'` per script brevi inline di Astro, JSON-LD e attributi `style`; blocca qualsiasi risorsa esterna. Va verificata nel browser dopo il primo deploy (console senza errori CSP). HSTS non è aggiunto perché Netlify lo invia già sui domini HTTPS gestiti.

## F. Modulo contatti

**Compatibilità statica (verificata sul codice):**
- `<form name="richiesta-progetto" method="POST" action="/messaggio-inviato/" data-netlify="true" netlify-honeypot="bot-field">` nell’HTML statico di `/contatti/`.
- Campo nascosto `form-name` = `richiesta-progetto`; honeypot `bot-field` nascosto.
- Tutti i campi hanno `name` valido: `nome`, `email`, `azienda`, `servizio`, `budget`, `messaggio`, `privacy`.
- Invio HTML nativo (`application/x-www-form-urlencoded`), nessun invio via JavaScript, nessun successo simulato.
- Validazione: obbligatori nome, email (formato), descrizione (20–5.000 caratteri), privacy. Errori per campo con `aria-invalid` e testo collegato, elenco errori, focus sul primo campo errato. Senza JavaScript resta la validazione nativa del browser.
- Link all’informativa privacy accanto al consenso.

**Da testare dopo il deploy (non eseguito):**
1. Abilitare *Form detection* e rifare il deploy.
2. Verificare che `richiesta-progetto` compaia nella scheda Forms.
3. Inviare una richiesta reale e verificarla nella dashboard Netlify.
4. Configurare e verificare la notifica email.

Non è possibile affermare che le email arrivino finché questo test non è stato svolto.

## G. Pubblicazione

1. In locale: `npm install` → `npm run verify` (deve terminare con “Tutte le verifiche sono state superate”).
2. GitHub: nuovo repository vuoto `carmine-galluzzi-portfolio`; `git init`, `git add .`, `git commit`, `git branch -M main`, `git remote add origin …`, `git push -u origin main`.
3. Netlify: *Add new project* → *Import from GitHub* → solo `carmine-galluzzi-portfolio`; framework Astro, build `npm run build`, publish `dist`.
4. Primo deploy, annotare l’URL `*.netlify.app`.
5. *Forms → Enable form detection* → nuovo deploy.
6. *Notifications → Form submission notifications → Email notification* per `richiesta-progetto`.
7. Verifica pubblica: pagine, menu mobile, filtri, `/robots.txt`, `/sitemap-index.xml`, console senza errori CSP, invio di prova, Lighthouse.

Procedura dettagliata nel `README.md`. Nessun commit, push o deploy è stato eseguito.

## H. Attività ancora necessarie

- Eseguire `npm install`, committare `package-lock.json`, eseguire `npm run verify` e `npm audit`.
- Verifica visiva nel browser ai viewport 375 / 390 / 768 / 1366 / 1920 px e misura Lighthouse.
- Fotografia personale (`site.photo`) e biografia estesa (facoltativa).
- Dati di contatto reali in `src/config/site.ts` (email, WhatsApp, LinkedIn, GitHub, Facebook).
- Conferma di stati e tecnologie dei progetti; eventuali screenshot, demo e URL pubblici.
- Dati del titolare e completamento dell’informativa privacy, con verifica di fornitori e trattamenti.
- Dominio personalizzato (facoltativo) e Google Search Console.
- Test reale del modulo e delle notifiche email dopo il deploy.
