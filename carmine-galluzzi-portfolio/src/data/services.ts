/**
 * SERVIZI, COMPETENZE E METODO
 * ------------------------------------------------------------------
 * Nessun prezzo predefinito: i preventivi sono personalizzati.
 * `titleEn` contiene la proposta editoriale inglese, pronta per la futura versione /en/.
 */

export type IconName =
  | 'saas'
  | 'marketplace'
  | 'web'
  | 'ai'
  | 'automation'
  | 'consulting'
  | 'api'
  | 'cloud'
  | 'rocket'
  | 'code';

export interface Service {
  /** Ancora (/servizi/#slug) e valore del campo "servizio" nel modulo contatti (?servizio=slug) */
  slug: string;
  title: string;
  /** Proposta editoriale per la versione inglese */
  titleEn: string;
  icon: IconName;
  summary: string;
  description: string;
  /** Benefici per il cliente */
  benefits: string[];
  /** Cosa comprende il servizio */
  includes: string[];
  /** A chi si rivolge */
  idealFor: string;
}

export const services: Service[] = [
  {
    slug: 'sviluppo-saas',
    title: 'Sviluppo di piattaforme SaaS',
    titleEn: 'SaaS Platform Development',
    icon: 'saas',
    summary: 'Sviluppo di piattaforme web scalabili per aziende e startup.',
    description:
      'Progetto e sviluppo piattaforme software accessibili dal browser, con aree riservate, gestione di utenti e ruoli e modelli di abbonamento costruiti sul tuo modello di business. Si parte da un nucleo essenziale da mettere davanti agli utenti, poi il prodotto cresce in modo ordinato.',
    benefits: [
      'Un prodotto digitale accessibile da qualsiasi dispositivo',
      'Piani e funzionalità costruiti sul tuo modello di ricavo',
      'Architettura pensata per crescere insieme agli utenti',
      'Rilasci progressivi a partire da una prima versione essenziale',
    ],
    includes: [
      'Analisi delle funzionalità e dei ruoli utente',
      'Architettura applicativa e modello dei dati',
      'Sviluppo di frontend e backend',
      'Autenticazione e aree riservate',
      'Pubblicazione su infrastruttura cloud',
    ],
    idealFor: 'Startup e aziende che vogliono trasformare un servizio o un’idea in una piattaforma in abbonamento.',
  },
  {
    slug: 'software-personalizzato',
    title: 'Software personalizzato',
    titleEn: 'Custom Software Development',
    icon: 'code',
    summary: 'Software costruito sui processi reali della tua attività, dalla prima versione (MVP) all’evoluzione.',
    description:
      'Quando gli strumenti standard non bastano, sviluppo software su misura: gestionali, portali interni, strumenti operativi e prime versioni di nuovi prodotti digitali. Si parte dalle funzionalità indispensabili e si procede per fasi, con codice ordinato e facile da far evolvere.',
    benefits: [
      'Uno strumento modellato sui tuoi processi, non il contrario',
      'Meno passaggi manuali e meno strumenti scollegati',
      'Possibilità di partire da un MVP e crescere per fasi',
      'Codice ordinato, documentato e manutenibile',
    ],
    includes: [
      'Analisi dei processi e dei requisiti',
      'Definizione del perimetro della prima versione',
      'Sviluppo dell’applicazione e del modello dei dati',
      'Integrazione con strumenti e dati esistenti',
      'Pubblicazione e affiancamento all’avvio',
    ],
    idealFor: 'Aziende, professionisti e startup che hanno bisogno di uno strumento digitale costruito sulle proprie attività.',
  },
  {
    slug: 'integrazione-ai-automazioni',
    title: 'Agenti AI e automazioni',
    titleEn: 'AI Agents & Automation',
    icon: 'ai',
    summary: 'Integrazioni AI, agenti intelligenti e automazioni aziendali.',
    description:
      'Porto l’intelligenza artificiale dove crea un vantaggio concreto: assistenti e agenti che rispondono, classificano o riassumono informazioni, automazioni che collegano applicazioni tramite API ed eliminano i passaggi manuali ripetitivi. Ogni intervento parte da un caso d’uso reale.',
    benefits: [
      'Meno attività ripetitive e meno errori manuali',
      'Assistenti AI che supportano clienti e team',
      'Applicazioni e servizi che comunicano tra loro',
      'Attenzione alla gestione dei dati e alla privacy',
    ],
    includes: [
      'Individuazione dei processi da automatizzare',
      'Integrazione di modelli AI nei tuoi strumenti',
      'Collegamenti tra applicazioni tramite API',
      'Flussi automatici con notifiche e controlli',
    ],
    idealFor: 'Aziende che vogliono ridurre il lavoro manuale o aggiungere funzionalità intelligenti ai propri software.',
  },
  {
    slug: 'sviluppo-marketplace',
    title: 'Sviluppo di marketplace',
    titleEn: 'Marketplace Development',
    icon: 'marketplace',
    summary: 'Piattaforme per collegare clienti, professionisti e imprese.',
    description:
      'Realizzo marketplace e portali che mettono in relazione domanda e offerta: vetrine per professionisti e attività, cataloghi, gestione delle richieste, profili e strumenti di comunicazione tra le parti. Regole e ruoli vengono modellati sul mercato a cui la piattaforma si rivolge.',
    benefits: [
      'Un unico ambiente dove clienti e fornitori si incontrano',
      'Vetrine e profili gestibili in autonomia da chi offre il servizio',
      'Flussi di richiesta e contatto chiari per l’utente finale',
      'Base pronta per pagamenti e commissioni, quando servono',
    ],
    includes: [
      'Modello dei ruoli: clienti, fornitori, amministrazione',
      'Vetrine, cataloghi e ricerca',
      'Gestione di richieste, messaggi e notifiche',
      'Pannello di amministrazione della piattaforma',
    ],
    idealFor: 'Chi vuole creare una piattaforma di intermediazione in un settore o in un territorio specifico.',
  },
  {
    slug: 'applicazioni-web',
    title: 'Sviluppo di applicazioni web',
    titleEn: 'Web Application Development',
    icon: 'web',
    summary: 'Applicazioni web moderne, veloci e responsive, accessibili da qualsiasi dispositivo.',
    description:
      'Sviluppo applicazioni web e siti evoluti con interfacce veloci, accessibili e responsive: aree riservate, portali, configuratori e strumenti online. Attenzione a prestazioni, SEO e qualità del codice, per un prodotto facile da mantenere nel tempo.',
    benefits: [
      'Software costruito sui tuoi processi, non il contrario',
      'Esperienza fluida su smartphone, tablet e desktop',
      'Prestazioni elevate e codice essenziale',
      'Struttura pronta per nuove funzionalità',
    ],
    includes: [
      'Progettazione dell’interfaccia e dei flussi',
      'Sviluppo dell’applicazione web',
      'Integrazione con servizi e dati esistenti',
      'Ottimizzazione di prestazioni, accessibilità e SEO',
    ],
    idealFor: 'Aziende e professionisti che vogliono offrire ai propri clienti un’esperienza web di qualità.',
  },
  {
    slug: 'consulenza-tecnica',
    title: 'Consulenza tecnica',
    titleEn: 'Technical Consulting',
    icon: 'consulting',
    summary: 'Analisi tecnica, architettura software e consulenza progettuale.',
    description:
      'Ti affianco prima e durante lo sviluppo: analizziamo l’idea o il software esistente, definiamo architettura e tecnologie, pianifichiamo le fasi di lavoro. Un passaggio utile per prendere decisioni tecniche consapevoli e ridurre i rischi.',
    benefits: [
      'Visione chiara di cosa sviluppare e in quale ordine',
      'Tecnologie scelte in base agli obiettivi, non alle mode',
      'Rischi individuati prima dell’investimento',
      'Una roadmap concreta per partire',
    ],
    includes: [
      'Analisi dell’idea o del progetto esistente',
      'Proposta di architettura e stack tecnologico',
      'Stima delle fasi di sviluppo',
      'Documento di sintesi con le raccomandazioni',
    ],
    idealFor: 'Aziende e founder che devono scegliere come e con quali tecnologie sviluppare un progetto.',
  },
];

/** Le sei competenze mostrate in homepage (titoli IT + proposta EN). */
export const competences: {
  title: string;
  titleEn: string;
  icon: IconName;
  description: string;
  href: string;
}[] = [
  {
    title: 'Sviluppo SaaS',
    titleEn: 'SaaS Development',
    icon: 'saas',
    description: 'Piattaforme in abbonamento accessibili dal web, con utenti, ruoli e piani personalizzati.',
    href: '/servizi/#sviluppo-saas',
  },
  {
    title: 'AI e automazione intelligente',
    titleEn: 'AI & Intelligent Automation',
    icon: 'ai',
    description: 'Assistenti, agenti AI e flussi automatici integrati nei processi aziendali.',
    href: '/servizi/#integrazione-ai-automazioni',
  },
  {
    title: 'Applicazioni web su misura',
    titleEn: 'Custom Web Applications',
    icon: 'web',
    description: 'Software e applicazioni web costruiti sulle attività reali di aziende e professionisti.',
    href: '/servizi/#applicazioni-web',
  },
  {
    title: 'Sviluppo di marketplace',
    titleEn: 'Marketplace Development',
    icon: 'marketplace',
    description: 'Piattaforme che collegano clienti, professionisti e imprese in un unico ambiente.',
    href: '/servizi/#sviluppo-marketplace',
  },
  {
    title: 'Integrazioni API',
    titleEn: 'API Integrations',
    icon: 'api',
    description: 'Collegamenti tra piattaforme, servizi esterni e strumenti già in uso, senza passaggi manuali.',
    href: '/servizi/#integrazione-ai-automazioni',
  },
  {
    title: 'Soluzioni cloud',
    titleEn: 'Cloud Solutions',
    icon: 'cloud',
    description: 'Pubblicazione, database e storage su servizi cloud gestiti, scalabili e manutenibili.',
    href: '/servizi/#sviluppo-saas',
  },
];

/** Fasi del metodo di lavoro. */
export const workSteps = [
  {
    title: 'Analisi dell’idea',
    description: 'Ascolto obiettivi, utenti e vincoli. Definiamo insieme cosa serve davvero nella prima versione.',
  },
  {
    title: 'Progettazione tecnica',
    description: 'Scelgo architettura e tecnologie, disegno flussi e struttura dei dati, pianifico le fasi di sviluppo.',
  },
  {
    title: 'Sviluppo della soluzione',
    description: 'Sviluppo per rilasci progressivi, con aggiornamenti regolari e possibilità di verificare i progressi.',
  },
  {
    title: 'Test e pubblicazione',
    description: 'Verifico funzionamento, prestazioni e accessibilità, poi pubblico e accompagno la messa online.',
  },
];

/** Domande frequenti della pagina servizi (solo informazioni generali, nessun impegno contrattuale). */
export const serviceFaq = [
  {
    q: 'Come viene definito il preventivo?',
    a: 'Dopo aver compreso obiettivi e funzionalità tramite il modulo contatti e un primo confronto. Ogni preventivo è personalizzato: non esistono pacchetti a prezzo fisso.',
  },
  {
    q: 'Posso partire da una versione ridotta del progetto?',
    a: 'Sì. Spesso è la scelta migliore: si sviluppa prima un MVP con le funzionalità indispensabili e si procede per fasi successive.',
  },
  {
    q: 'Quali tecnologie utilizzi?',
    a: 'Principalmente JavaScript e TypeScript, React, Astro, Supabase, GitHub e Netlify, oltre a integrazioni API e servizi AI. La scelta finale dipende dalle esigenze del progetto.',
  },
];
