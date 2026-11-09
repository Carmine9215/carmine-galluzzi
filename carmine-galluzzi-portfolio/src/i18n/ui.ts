/**
 * TESTI DELL'INTERFACCIA
 * ------------------------------------------------------------------
 * Il sito è pubblicato in italiano (`it`).
 * Il blocco `en` contiene le proposte editoriali inglesi (es. il claim dell'hero),
 * pronte per una futura versione /en/: oggi NON vengono mostrate, così le lingue non si mescolano.
 *
 * Per attivare l'inglese: creare le pagine in src/pages/en/ e usare `useTranslations('en')`.
 */

export const languages = { it: 'Italiano', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'it';

const it = {
  // Navigazione
  'nav.home': 'Home',
  'nav.about': 'Chi sono',
  'nav.portfolio': 'Portfolio',
  'nav.services': 'Servizi',
  'nav.contact': 'Contatti',
  'nav.cta': 'Parliamo del tuo progetto',
  'nav.open': 'Apri il menu',
  'nav.close': 'Chiudi il menu',
  'nav.main': 'Navigazione principale',
  'skip.content': 'Vai al contenuto',

  // Hero
  'hero.title.a': 'Costruisco piattaforme digitali',
  'hero.title.b': 'che trasformano le idee in realtà.',
  'hero.subtitle':
    'Software Developer & SaaS Founder specializzato in piattaforme su misura, applicazioni web, marketplace e soluzioni basate sull’intelligenza artificiale.',
  'hero.cta.projects': 'Esplora i miei progetti',
  'hero.cta.start': 'Avvia un progetto',
  'hero.stack': 'Tecnologie',

  // Hero (redesign)
  'hero.badge': 'Software Developer • SaaS Founder • AI',
  'hero.headline.a': 'Trasformo idee ambiziose in',
  'hero.headline.b': 'esperienze digitali straordinarie.',
  'hero.description':
    'Progetto e sviluppo piattaforme SaaS, applicazioni web, marketplace e soluzioni basate sull’intelligenza artificiale per aziende, startup e professionisti.',
  'hero.cta.idea': 'Parliamo della tua idea',
  'nav.start': 'Avvia un progetto',

  // Sezioni homepage
  'tech.eyebrow': 'Stack tecnologico',
  'tech.title': 'Tecnologie che trasformano le idee in prodotti digitali.',
  'projects.eyebrow': 'Portfolio',
  'projects.title': 'Progetti selezionati',
  'projects.subtitle': 'Una selezione delle piattaforme digitali che progetto e sviluppo.',
  'services.eyebrow': 'Servizi',
  'services.title': 'Soluzioni digitali costruite per il futuro',
  'services.cta': 'Parliamone',
  'about.quote.a': 'Non mi limito a sviluppare software.',
  'about.quote.b': 'Progetto soluzioni digitali pensate per creare valore.',
  'contact.title.a': 'Hai un progetto in mente?',
  'contact.title.b': 'Costruiamolo insieme.',
  'contact.subtitle': 'Raccontami la tua idea e scopriamo come trasformarla in una soluzione digitale concreta.',
  'footer.projects': 'Progetti',
  'preview.label': 'Anteprima illustrativa',

  // CTA
  'cta.final.title': 'Hai un progetto in mente? Costruiamolo insieme.',
  'cta.final.text':
    'Raccontami la tua idea: valuteremo insieme funzionalità, tecnologie e il percorso più adatto per realizzarla.',
  'cta.final.button': 'Contattami',
  'cta.projects': 'Esplora i miei progetti',
  'cta.contact': 'Contattami',
  'cta.discoverProject': 'Scopri il progetto',
  'cta.requestInfo': 'Richiedi informazioni',
  'cta.requestQuote': 'Richiedi un preventivo',
  'cta.similar': 'Richiedi un progetto simile',
  'cta.allProjects': 'Vedi tutti i progetti',
  'cta.allServices': 'Tutti i servizi',
  'cta.home': 'Torna alla homepage',
  'cta.learnMore': 'Approfondisci',

  // Stati e categorie
  'status.in-progettazione': 'In progettazione',
  'status.in-sviluppo': 'In sviluppo',
  'status.demo-disponibile': 'Demo disponibile',
  'status.pubblicato': 'Pubblicato',
  'category.saas': 'SaaS',
  'category.marketplace': 'Marketplace',
  'category.ai-automazioni': 'AI & Automazioni',
  'category.servizi-digitali': 'Servizi digitali',

  // Filtri portfolio
  'filter.all': 'Tutti i progetti',
  'filter.saas': 'Piattaforme SaaS',
  'filter.marketplace': 'Marketplace',
  'filter.ai-automazioni': 'Soluzioni AI',
  'filter.servizi-digitali': 'Servizi digitali',
  'filter.label': 'Filtra i progetti per categoria',
  'filter.empty': 'Al momento non ci sono progetti pubblicati in questa categoria.',

  // Pagina progetto
  'project.related': 'Progetti correlati',

  // Footer
  'footer.rights': 'Tutti i diritti riservati.',
  'footer.privacy': 'Privacy policy',
  'footer.nav': 'Navigazione',
  'footer.services': 'Servizi',
  'footer.featured': 'Progetti in evidenza',
  'footer.contacts': 'Contatti',
  'footer.contactForm': 'Scrivimi dal modulo contatti',
} as const;

export type UIKey = keyof typeof it;

/** Proposte editoriali inglesi (non ancora pubblicate). */
const en: Record<UIKey, string> = {
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.portfolio': 'Portfolio',
  'nav.services': 'Services',
  'nav.contact': 'Contact',
  'nav.cta': 'Let’s talk about your project',
  'nav.open': 'Open menu',
  'nav.close': 'Close menu',
  'nav.main': 'Main navigation',
  'skip.content': 'Skip to content',
  'hero.title.a': 'I Build Digital Platforms',
  'hero.title.b': 'That Turn Ideas Into Reality.',
  'hero.subtitle':
    'Software Developer & SaaS Founder specializing in custom platforms, web applications, marketplaces, and AI-powered solutions.',
  'hero.cta.projects': 'Explore My Projects',
  'hero.cta.start': 'Start a Project',
  'hero.stack': 'Technologies',
  'hero.badge': 'Software Developer • SaaS Founder • AI',
  'hero.headline.a': 'I turn ambitious ideas into',
  'hero.headline.b': 'extraordinary digital experiences.',
  'hero.description':
    'I design and build SaaS platforms, web applications, marketplaces and AI-powered solutions for companies, startups and professionals.',
  'hero.cta.idea': 'Let’s talk about your idea',
  'nav.start': 'Start a Project',
  'tech.eyebrow': 'Tech stack',
  'tech.title': 'Technologies that turn ideas into digital products.',
  'projects.eyebrow': 'Portfolio',
  'projects.title': 'Selected Projects',
  'projects.subtitle': 'A selection of the digital platforms I design and build.',
  'services.eyebrow': 'Services',
  'services.title': 'Digital Solutions Built for the Future',
  'services.cta': 'Let’s talk',
  'about.quote.a': 'I don’t just write software.',
  'about.quote.b': 'I design digital solutions built to create value.',
  'contact.title.a': 'Have a Project in Mind?',
  'contact.title.b': 'Let’s Build It Together.',
  'contact.subtitle': 'Tell me about your idea and let’s find out how to turn it into a concrete digital solution.',
  'footer.projects': 'Projects',
  'preview.label': 'Illustrative preview',
  'cta.final.title': 'Have a Project in Mind? Let’s Build It Together.',
  'cta.final.text': 'Tell me about your idea: together we’ll define features, technologies and the best way to build it.',
  'cta.final.button': 'Contact me',
  'cta.projects': 'Explore My Projects',
  'cta.contact': 'Contact me',
  'cta.discoverProject': 'View project',
  'cta.requestInfo': 'Request information',
  'cta.requestQuote': 'Request a quote',
  'cta.similar': 'Request a similar project',
  'cta.allProjects': 'View all projects',
  'cta.allServices': 'All services',
  'cta.home': 'Back to homepage',
  'cta.learnMore': 'Learn more',
  'status.in-progettazione': 'In design',
  'status.in-sviluppo': 'In development',
  'status.demo-disponibile': 'Demo available',
  'status.pubblicato': 'Live',
  'category.saas': 'SaaS',
  'category.marketplace': 'Marketplace',
  'category.ai-automazioni': 'AI & Automation',
  'category.servizi-digitali': 'Digital Services',
  'filter.all': 'All Projects',
  'filter.saas': 'SaaS Platforms',
  'filter.marketplace': 'Marketplaces',
  'filter.ai-automazioni': 'AI Solutions',
  'filter.servizi-digitali': 'Digital Services',
  'filter.label': 'Filter projects by category',
  'filter.empty': 'There are currently no projects in this category.',
  'project.related': 'Related Projects',
  'footer.rights': 'All rights reserved.',
  'footer.privacy': 'Privacy Policy',
  'footer.nav': 'Navigation',
  'footer.services': 'Services',
  'footer.featured': 'Featured Projects',
  'footer.contacts': 'Contact',
  'footer.contactForm': 'Write to me via the contact form',
};

export const ui: Record<Lang, Record<UIKey, string>> = { it, en };

export function useTranslations(lang: Lang = defaultLang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export const t = useTranslations(defaultLang);
