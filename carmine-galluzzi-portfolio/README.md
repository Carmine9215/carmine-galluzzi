# Carmine Galluzzi — sito personale

Sito personale professionale di **Carmine Galluzzi — Software Developer & SaaS Founder**.
Sito statico generato con **Astro**, stile con **Tailwind CSS 4**, pubblicato su **Netlify** con **Netlify Forms** per le richieste di contatto.

- Nessun database, nessun login, nessuna API esterna, nessun tracciamento.
- JavaScript minimo e progressivo: menu mobile, comparsa leggera delle sezioni, filtri portfolio,
  validazione accessibile e riepilogo del modulo contatti. Senza JavaScript il sito resta completamente utilizzabile.
- Progetti del portfolio gestiti da un unico file TypeScript (`src/data/projects.ts`).

## Design

- **Palette:** blu notte `#060B16` / `#0D1526`, card `#111D32`, blu `#3B82F6`, cyan `#22D3EE`, viola `#8B5CF6`,
  testo `#F8FAFC` / `#94A3B8`, bordi `rgba(148,163,184,0.14)`. Token in `src/styles/global.css` (`@theme`).
- **Tipografia:** Inter (testo) e Inter Display (titoli), **self-hosted** in `public/fonts/` (nessuna richiesta a Google Fonts),
  con dimensioni fluide `clamp()` e font di fallback con metriche simili per evitare spostamenti del layout.
  Licenza: SIL Open Font License, vedi `public/fonts/LICENSE-Inter.txt`.
- **Animazioni:** solo CSS. Comparsa allo scroll con animazioni native (`animation-timeline: view()`): nei browser che non
  le supportano i contenuti sono semplicemente visibili. Tutto rispetta `prefers-reduced-motion`; su schermi piccoli
  gli effetti più pesanti (blur, movimenti continui) sono disattivati.
- **Anteprime dei progetti:** finché non carichi screenshot reali, ogni progetto mostra un’interfaccia astratta diversa
  (campo `preview` in `projects.ts`) con l’etichetta “Anteprima illustrativa”.
- **Fotografia:** imposta `site.photo` in `src/config/site.ts`; comparirà nel cerchio centrale della hero e nella
  cornice della pagina Chi sono. Senza foto viene mostrato il monogramma “CG.”.

---

## Indice

1. [Stack e versioni](#stack-e-versioni)
2. [Requisiti di sistema](#requisiti-di-sistema)
3. [Struttura del progetto](#struttura-del-progetto)
4. [Installazione ed esecuzione locale](#installazione-ed-esecuzione-locale)
5. [Configurazione dei contenuti](#configurazione-dei-contenuti)
6. [Dominio canonico, sitemap e SEO](#dominio-canonico-sitemap-e-seo)
7. [Sicurezza](#sicurezza)
8. [Pubblicazione: GitHub](#pubblicazione-github)
9. [Pubblicazione: Netlify](#pubblicazione-netlify)
10. [Netlify Forms e notifiche email](#netlify-forms-e-notifiche-email)
11. [Dominio personalizzato](#dominio-personalizzato)
12. [Verifiche](#verifiche)
13. [Troubleshooting](#troubleshooting)
14. [Limiti della prima versione](#limiti-della-prima-versione)
15. [Da configurare prima della pubblicazione](#da-configurare-prima-della-pubblicazione)
16. [Estensione futura all’inglese](#estensione-futura-allinglese)

---

## Stack e versioni

| Pacchetto            | Versione dichiarata in `package.json` | Ruolo                          |
| -------------------- | ------------------------------------- | ------------------------------ |
| `astro`              | `^5.13.0`                             | Generatore di siti statici     |
| `tailwindcss`        | `^4.1.11`                             | CSS utility-first              |
| `@tailwindcss/vite`  | `^4.1.11`                             | Integrazione Tailwind 4 / Vite |
| `@astrojs/sitemap`   | `^3.5.0`                              | Sitemap XML                    |
| `@astrojs/check`     | `^0.9.4` (dev)                        | Controllo TypeScript `.astro`  |
| `typescript`         | `^5.8.3` (dev)                        | Tipi                           |

Node.js consigliato: **22** (lo stesso impostato in `netlify.toml`).

> Dopo il primo `npm install` le versioni effettivamente installate sono registrate in `package-lock.json`.
> Per vederle: `npm ls --depth=0`. Il lockfile va committato nel repository.

## Requisiti di sistema

- **Node.js 22** (LTS) — verifica con `node -v`. È la stessa versione impostata per Netlify in `netlify.toml`.
- **npm 10** o superiore (incluso con Node 22) — verifica con `npm -v`.
- **Git**, per il versionamento e il collegamento a GitHub.
- Un account **GitHub** e un account **Netlify**.
- Nessun database, nessuna variabile d’ambiente obbligatoria, nessuna chiave API.

## Struttura del progetto

```
carmine-galluzzi-portfolio/
├── public/
│   ├── images/
│   │   ├── projects/          # screenshot reali dei progetti (uno per cartella/slug)
│   │   └── branding/          # fotografia personale e grafiche
│   ├── favicon.svg
│   ├── og-image.svg           # sorgente dell'immagine social
│   └── og-image.png           # immagine Open Graph 1200×630 usata nei meta tag
├── scripts/
│   └── verify-build.mjs       # verifiche automatiche su dist/
├── src/
│   ├── components/            # Header, Footer, Hero, ProjectCard, ContactForm, SEO, ...
│   ├── config/site.ts         # ★ dati personali, contatti, dati legali
│   ├── data/
│   │   ├── projects.ts        # ★ archivio progetti
│   │   └── services.ts        # servizi, specializzazioni, metodo
│   ├── i18n/ui.ts             # testi dell'interfaccia (predisposto per l'inglese)
│   ├── layouts/BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── chi-sono.astro
│   │   ├── servizi.astro
│   │   ├── contatti.astro
│   │   ├── portfolio/index.astro
│   │   ├── portfolio/[slug].astro
│   │   ├── messaggio-inviato.astro
│   │   ├── privacy.astro
│   │   ├── 404.astro
│   │   └── robots.txt.ts
│   └── styles/global.css      # palette e componenti grafici (Tailwind 4 @theme)
├── astro.config.mjs           # ★ dominio canonico
├── netlify.toml
├── package.json
├── tsconfig.json
└── README.md
```

I file con ★ sono quelli che modificherai più spesso.

## Installazione ed esecuzione locale

Requisiti: Node.js 22 e npm.

```bash
cd carmine-galluzzi-portfolio
npm install          # installa le dipendenze e crea package-lock.json
npm run dev          # sviluppo su http://localhost:4321
npm run check        # controllo TypeScript e componenti .astro
npm run build        # build di produzione in dist/
npm run preview      # anteprima locale della build
npm run verify       # check + build + verifiche automatiche su dist/
```

Per provare in locale anche canonical e sitemap:

```bash
SITE_URL=https://nome-progetto.netlify.app npm run build
```

## Configurazione dei contenuti

### Dati personali e contatti — `src/config/site.ts`

- `contacts.email`, `contacts.whatsapp`, `contacts.linkedin`, `contacts.github`, `contacts.facebook`: **vuoti di default**.
  Ogni pulsante/icona pubblica (footer, pagina contatti, dati strutturati `sameAs`) compare solo quando il campo è compilato
  con un valore valido (URL `https://…`, email valida, numero WhatsApp di 8–15 cifre).
- `site.photo`: lascia `null` finché non hai una fotografia. Quando è pronta, salvala in
  `public/images/branding/` (consigliato `.webp`, ~800×1000) e imposta `src`, `width`, `height`, `alt`.
- `extendedBio`: paragrafi della biografia estesa per la pagina Chi sono (array vuoto = sezione nascosta).
- `legal`: dati del titolare per l’informativa privacy.

### Progetti — `src/data/projects.ts`

Ogni progetto è un oggetto con: `id`, `name`, `slug`, `shortDescription`, `fullDescription`, `problem`, `solution`,
`category`, `image?`, `gallery?`, `technologies`, `features`, `status`, `demoUrl?`, `publicUrl?`, `order`, `featured`, `visible`, `accent`.

- **Aggiungere un progetto:** copia un record esistente, cambia `id` e `slug` (minuscolo, trattini) e i testi. La pagina
  `/portfolio/<slug>/` viene creata automaticamente alla build.
- **Stati:** `in-progettazione`, `in-sviluppo`, `demo-disponibile`, `pubblicato`.
  La build si interrompe se un progetto è `pubblicato` senza `publicUrl` o `demo-disponibile` senza `demoUrl`.
- **In evidenza in homepage:** `featured: true` (vengono mostrati i primi 4 per `order`).
- **Nascondere un progetto:** `visible: false`.
- **Immagini:** salva i file in `public/images/projects/<slug>/` e indica dimensioni reali:
  ```ts
  image: { src: '/images/projects/romeoh24/cover.webp', alt: 'Dashboard di RomeoH24', width: 1600, height: 1000 },
  gallery: [{ src: '/images/projects/romeoh24/richieste.webp', alt: 'Gestione richieste SOS', width: 1600, height: 1000 }],
  ```
  Senza `image` viene mostrato un placeholder grafico generato, mai uno screenshot inventato.
- **Tecnologie:** lascia l’array vuoto finché lo stack non è confermato (la pagina mostra “Stack tecnologico in fase di definizione”).

Il campo facoltativo `preview` sceglie l’interfaccia astratta dell’anteprima illustrativa:
`requests`, `chat`, `listing`, `gallery`, `calendar`, `route`, `dashboard`, `map`.

Ogni progetto ha anche `goals` (obiettivi, mostrati nella pagina dedicata). Le funzionalità sono intitolate
“Funzionalità principali previste” finché lo stato non è `demo-disponibile` o `pubblicato`.

### Servizi — `src/data/services.ts`

- `services`: i sei servizi (slug usato come ancora `/servizi/#slug` e come valore del campo “Servizio richiesto”),
  con riepilogo, descrizione, benefici, cosa comprende e destinatari. Nessun prezzo predefinito.
- `competences`: le sei card “Competenze” della homepage.
- `workSteps`: le quattro fasi del metodo; `serviceFaq`: domande frequenti della pagina servizi.

Slug dei servizi: `sviluppo-saas`, `applicazioni-web`, `integrazione-ai-automazioni`, `sviluppo-marketplace`,
`sviluppo-mvp`, `consulenza-tecnica`. Se ne cambi uno, aggiorna anche `competences` e `categoryToService` in `projects.ts`.

### Testi dell’interfaccia — `src/i18n/ui.ts`

Contiene i testi italiani pubblicati (`it`) e le proposte editoriali inglesi (`en`), ad esempio
“I Build Digital Platforms That Turn Ideas Into Reality.” e “Have a Project in Mind? Let’s Build It Together.”.
Il blocco `en` non è ancora mostrato sul sito, così le due lingue non si mescolano.

## Dominio canonico, sitemap e SEO

Il dominio è gestito in **un solo punto**: `astro.config.mjs`.

Priorità:

1. `CUSTOM_DOMAIN` in `astro.config.mjs` (quando avrai un dominio personale);
2. variabile d’ambiente `SITE_URL`;
3. variabile `URL` fornita automaticamente da Netlify durante la build (es. `https://nome-progetto.netlify.app`).

Se nessun valore è disponibile, il sito viene generato **senza** canonical assoluti, URL Open Graph e sitemap:
non vengono mai pubblicati indirizzi di esempio. Su Netlify il valore è sempre disponibile.

SEO implementata: title e description unici per pagina, canonical, Open Graph, Twitter/X Card, favicon SVG, `robots.txt`,
sitemap XML (`/sitemap-index.xml`), un H1 per pagina, breadcrumb (visivi + JSON-LD) nel portfolio, JSON-LD `Person` e `WebSite`
in homepage e `ProfilePage` nella pagina Chi sono, con soli dati veri; tag Open Graph completi
(immagine 1200×630 con tipo e dimensioni) per l’anteprima dei link su Facebook, LinkedIn e WhatsApp.

Per verificare le anteprime social dopo il deploy: Facebook Sharing Debugger, LinkedIn Post Inspector,
oppure invia il link in una chat WhatsApp (WhatsApp può tenere in cache l’anteprima per un po’). `/messaggio-inviato/` e la pagina 404 sono `noindex` ed escluse dalla sitemap.

## Sicurezza

- Nessuna chiave API, token o credenziale nel codice; nessuno script, font o servizio esterno.
- Tutti i link con `target="_blank"` hanno `rel="noopener noreferrer"`.
- `set:html` è usato solo per icone statiche e per il JSON-LD, serializzato in modo sicuro.
- Intestazioni HTTP in `netlify.toml`: `Content-Security-Policy` (solo risorse dello stesso dominio),
  `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`,
  `Cross-Origin-Opener-Policy`. HSTS è già inviato da Netlify sui domini con HTTPS gestito.
- Se aggiungi un servizio esterno (mappe, video, analytics), **aggiorna la Content-Security-Policy**, altrimenti
  il browser lo bloccherà.
- Controllo dipendenze: `npm audit` (senza `--force`, che può installare versioni incompatibili).

## Pubblicazione: GitHub

Il progetto è **indipendente**: crea un repository nuovo, senza toccare quelli esistenti.

1. Su GitHub: **New repository** → nome `carmine-galluzzi-portfolio` → visibilità a scelta →
   **non** aggiungere README, .gitignore o licenza (sono già presenti) → **Create repository**.
2. In locale, dalla cartella del progetto:

```bash
npm install                 # genera package-lock.json
npm run verify              # verifica che tutto compili
git init
git add .
git commit -m "Prima versione del sito personale"
git branch -M main
git remote add origin https://github.com/<TUO-UTENTE>/carmine-galluzzi-portfolio.git
git push -u origin main
```

## Pubblicazione: Netlify

Crea un **nuovo** progetto Netlify collegato solo al nuovo repository. Non riutilizzare progetti esistenti.

Checklist completa del primo deploy:

1. Crea il repository GitHub `carmine-galluzzi-portfolio` (se non esiste) e carica il progetto (sezione precedente).
2. Netlify → nuovo progetto → importa da GitHub → seleziona **solo** `carmine-galluzzi-portfolio`.
3. Verifica le impostazioni: framework **Astro** (rilevato automaticamente), build `npm run build`, publish `dist`.
4. Avvia il primo deploy e attendi lo stato *Published*.
5. Annota l’URL assegnato (es. `https://nome-progetto.netlify.app`).
6. Abilita **Form detection** e rifai il deploy (sezione Netlify Forms).
7. Configura le **notifiche email** del modulo.
8. Verifica il sito pubblico: tutte le pagine, menu mobile, filtri, `/robots.txt`, `/sitemap-index.xml`.
9. Invia una **richiesta di prova** e controllala in *Forms → richiesta-progetto*.
10. Verifica le anteprime social e misura Lighthouse dal browser.

Dettaglio:

1. Netlify → **Add new project** (o *Add new site*) → **Import an existing project** → **GitHub**.
2. Seleziona **solo** il repository `carmine-galluzzi-portfolio`.
3. Impostazioni di build (lette anche da `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Nessuna variabile d’ambiente è obbligatoria. **Deploy**.
5. Facoltativo: in *Project configuration → General → Project details → Change project name* scegli un nome leggibile
   (es. `carmine-galluzzi`), così l’indirizzo diventa `https://carmine-galluzzi.netlify.app`. Poi esegui un nuovo deploy,
   così canonical e sitemap usano il nuovo indirizzo.

## Netlify Forms e notifiche email

Il modulo `richiesta-progetto` è nell’HTML statico di `/contatti/`, con `data-netlify="true"`, campo `form-name`,
honeypot `bot-field` e invio verso la pagina `/messaggio-inviato/`.

Comportamento:
- con JavaScript: messaggi di errore accessibili per ogni campo (`aria-invalid`, testo collegato al campo),
  elenco riassuntivo degli errori con link ai campi, contatore caratteri e **riepilogo della richiesta** aggiornato
  mentre si compila, visibile sopra il pulsante di invio (nessun passaggio aggiuntivo);
- senza JavaScript: validazione HTML nativa del browser;
- in entrambi i casi l’invio è un normale POST: la conferma appare solo con la pagina `/messaggio-inviato/`
  restituita dopo l’invio, mai simulata.

**Azioni da fare tu nel pannello Netlify:**

1. **Abilita il rilevamento dei moduli:** *Project configuration → Forms* (o la scheda **Forms** del progetto) →
   **Enable form detection**.
2. **Esegui un nuovo deploy** (*Deploys → Trigger deploy → Deploy project*): il rilevamento avviene durante il deploy.
3. Verifica che nella scheda **Forms** compaia il modulo **richiesta-progetto**.
4. **Notifiche email:** *Project configuration → Notifications → Emails and webhooks → Form submission notifications →
   Add notification → Email notification* → scegli il modulo `richiesta-progetto` e inserisci l’indirizzo email su cui
   vuoi ricevere le richieste.
5. **Test reale:** apri il sito pubblicato, invia una richiesta di prova, controlla che arrivi su `/messaggio-inviato/`,
   che compaia in **Forms → richiesta-progetto** e che arrivi l’email di notifica.

Antispam: honeypot + filtro antispam integrato di Netlify. Le richieste segnalate come spam si trovano nella sezione
*Spam submissions* del modulo. Limiti di lunghezza su tutti i campi (es. descrizione 20–5.000 caratteri).

> Nota: i limiti gratuiti di Netlify Forms (numero di invii al mese) dipendono dal piano del tuo account.

## Dominio personalizzato

1. Acquista il dominio presso un registrar.
2. Netlify → *Domain management → Add a domain* → inserisci il dominio → segui le istruzioni DNS
   (Netlify DNS oppure record `A`/`CNAME` presso il registrar). Il certificato HTTPS viene emesso automaticamente.
3. Imposta il dominio come **primary domain**.
4. Aggiorna `CUSTOM_DOMAIN` in `astro.config.mjs` (es. `'https://www.tuodominio.it'`), committa e pubblica.
5. Aggiungi il dominio a **Google Search Console** e invia la sitemap `https://www.tuodominio.it/sitemap-index.xml`.

Non serve modificare domini o impostazioni di altri progetti.

## Verifiche

`npm run verify` esegue `astro check`, la build e lo script `scripts/verify-build.mjs`, che controlla:

- presenza di tutte le pagine e di una pagina per ogni progetto visibile;
- un solo H1, title, meta description e `lang="it"` in ogni pagina;
- assenza di collegamenti interni interrotti (anche ancore `#`);
- `alt` e dimensioni sulle immagini;
- modulo Netlify completo nell’HTML statico (name, POST, honeypot, form-name, campi obbligatori, link privacy);
- `noindex` su `/messaggio-inviato/`;
- `robots.txt` e sitemap senza pagine noindex o indirizzi non validi;
- call to action finale nelle pagine principali, link alla privacy policy e Open Graph in ogni pagina;
- assenza di chiavi segrete nei file pubblicati.

Controlli manuali consigliati dopo il deploy: menu mobile su smartphone reale, navigazione con tastiera (Tab),
Lighthouse in Chrome DevTools (obiettivi: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 90),
invio reale del modulo.

## Troubleshooting

| Problema | Causa probabile | Soluzione |
| --- | --- | --- |
| `npm install` fallisce | Versione di Node non compatibile | Usa Node 22 (`node -v`), elimina `node_modules` e riprova |
| La build si interrompe con `[projects] ... nessun publicUrl` | Un progetto è `pubblicato` senza link | Aggiungi `publicUrl` verificato o cambia lo stato |
| La build si interrompe con `slug duplicato` / `slug non valido` | Errore in `projects.ts` | Usa slug unici, minuscoli, con trattini |
| Nessuna sitemap in `dist/` | Dominio non configurato in locale | Normale: usa `SITE_URL=https://… npm run build`; su Netlify è automatico |
| Il modulo non compare in Netlify → Forms | Form detection disattivata | Abilita *Form detection* e rifai il deploy |
| L’invio porta a una pagina 404 di Netlify | Deploy precedente alla form detection | Rifai il deploy dopo aver abilitato la detection |
| Non arrivano email | Notifiche non configurate o finite in spam | Configura *Form submission notifications*, controlla lo spam e la sezione *Spam submissions* |
| Uno script o servizio esterno non funziona | Bloccato dalla Content-Security-Policy | Aggiungi il dominio alla direttiva corretta in `netlify.toml` |
| Anteprima social non aggiornata | Cache di Facebook/LinkedIn/WhatsApp | Rigenera l’anteprima con Sharing Debugger / Post Inspector |

## Limiti della prima versione

- Solo lingua italiana (struttura pronta per l’inglese, non attivata). Le frasi inglesi proposte nei brief
  (es. “Start a Project”, “Selected Projects”) sono pubblicate in italiano e salvate come proposte in `src/i18n/ui.ts`.
- Nessuna fotografia personale né screenshot reali dei progetti: sono mostrati monogramma e anteprime grafiche illustrative.
- Stati e tecnologie dei progetti da confermare; nessuna demo collegata.
- Informativa privacy in bozza, da completare e verificare.
- Nessun sistema di analisi del traffico (scelta voluta: nessun cookie, nessun banner).
- Le immagini dei progetti, quando aggiunte, sono servite da `public/` senza ridimensionamento automatico:
  caricale già in formato WebP/AVIF e alla dimensione giusta (es. 1600×1000).

## Da configurare prima della pubblicazione

- [ ] Stati dei progetti in `src/data/projects.ts` (sono stime iniziali: 4 “In sviluppo”, 4 “In progettazione”).
- [ ] Tecnologie reali di ogni progetto (oggi vuote, tranne 3D Market).
- [ ] `demoUrl` / `publicUrl` dei progetti con demo o sito verificato.
- [ ] Screenshot reali dei progetti (facoltativi).
- [ ] Fotografia personale (`site.photo`) e biografia estesa (`extendedBio`).
- [ ] Contatti pubblici in `contacts` (email, WhatsApp, LinkedIn, GitHub, Facebook).
- [ ] Dati del titolare in `legal` e completamento dell’informativa privacy (parti evidenziate in giallo),
      possibilmente con la verifica di un professionista; poi `privacyReviewed: true`.
- [ ] Netlify Forms: abilitazione, notifiche email, test di invio.
- [ ] Dominio personalizzato (facoltativo) e `CUSTOM_DOMAIN`.

## Estensione futura all’inglese

Il sito è in italiano ma predisposto:

- i testi d’interfaccia sono in `src/i18n/ui.ts`: `ui.en` contiene già le proposte inglesi da rivedere;
- i servizi e le competenze hanno già il campo `titleEn`;
- in `astro.config.mjs` si potrà attivare `i18n: { defaultLocale: 'it', locales: ['it', 'en'] }`;
- le pagine inglesi andranno in `src/pages/en/`, usando `useTranslations('en')`;
- per i contenuti lunghi si potranno aggiungere campi tradotti (es. `shortDescription_en`) in `projects.ts` e `services.ts`;
- `site.lang` / `site.locale` e i tag `hreflang` andranno resi dinamici per lingua.
