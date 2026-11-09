/**
 * ARCHIVIO PROGETTI
 * ------------------------------------------------------------------
 * Per aggiungere o aggiornare un progetto modifica solo il suo record qui sotto.
 * Le pagine /portfolio/ e /portfolio/[slug]/ vengono rigenerate automaticamente alla build.
 *
 * REGOLE
 * - `status: 'pubblicato'` richiede un `publicUrl` verificato (altrimenti la build si interrompe).
 * - `status: 'demo-disponibile'` richiede un `demoUrl` (altrimenti la build si interrompe).
 * - Senza `image` viene mostrato un placeholder grafico generato (nessuno screenshot inventato).
 * - Le immagini vanno in /public/images/projects/<slug>/ con larghezza e altezza reali.
 *
 * NOTA: gli stati iniziali sono una stima da confermare (vedi README → "Da configurare").
 * `technologies` va compilato SOLO con tecnologie confermate: se vuoto, card e pagina non le mostrano.
 */

import type { UIKey } from '../i18n/ui';

export type ProjectStatus = 'in-progettazione' | 'in-sviluppo' | 'demo-disponibile' | 'pubblicato';
export type ProjectCategory = 'saas' | 'marketplace' | 'ai-automazioni' | 'servizi-digitali';
export type Accent = 'blue' | 'cyan' | 'violet';
/** Tipo di interfaccia astratta usata come anteprima illustrativa quando manca un'immagine reale. */
export type PreviewKind = 'requests' | 'chat' | 'listing' | 'gallery' | 'calendar' | 'route' | 'dashboard' | 'map';

export interface ProjectImage {
  /** Percorso a partire da /public, es. '/images/projects/romeoh24/cover.webp' */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  /** Problema o esigenza a cui risponde il progetto */
  problem: string;
  /** Soluzione progettata */
  solution: string;
  /** Obiettivi del progetto */
  goals: string[];
  category: ProjectCategory;
  image?: ProjectImage;
  gallery?: ProjectImage[];
  technologies: string[];
  features: string[];
  status: ProjectStatus;
  demoUrl?: string;
  publicUrl?: string;
  order: number;
  featured: boolean;
  visible: boolean;
  /** Colore del placeholder grafico */
  accent: Accent;
  /** Interfaccia astratta dell'anteprima illustrativa (facoltativa, solo grafica) */
  preview?: PreviewKind;
}

export const projectCategories: ProjectCategory[] = ['saas', 'marketplace', 'ai-automazioni', 'servizi-digitali'];

export const categoryLabelKey = (c: ProjectCategory): UIKey => `category.${c}`;
export const filterLabelKey = (c: ProjectCategory): UIKey => `filter.${c}`;
export const statusLabelKey = (s: ProjectStatus): UIKey => `status.${s}`;

/** Servizio da preselezionare nel modulo contatti per la CTA "Richiedi un progetto simile". */
export const categoryToService: Record<ProjectCategory, string> = {
  saas: 'sviluppo-saas',
  marketplace: 'sviluppo-marketplace',
  'ai-automazioni': 'integrazione-ai-automazioni',
  'servizi-digitali': 'applicazioni-web',
};

const projects: Project[] = [
  {
    id: 'p-001',
    name: 'RomeoH24',
    slug: 'romeoh24',
    shortDescription:
      'Piattaforma marketplace per servizi di pronto intervento, gestione richieste SOS e vetrine professionali.',
    fullDescription:
      'RomeoH24 è una piattaforma marketplace pensata per mettere in contatto chi ha un’urgenza con professionisti del pronto intervento. Riunisce in un unico ambiente la gestione delle richieste SOS e le vetrine dei professionisti, così che il cliente possa trovare rapidamente chi può aiutarlo e il professionista possa presentare i propri servizi.',
    problem:
      'Quando si presenta un guasto o un’emergenza domestica è difficile trovare in poco tempo un professionista disponibile e affidabile, mentre i professionisti faticano a farsi trovare nel momento in cui servono.',
    solution:
      'Un marketplace che centralizza le richieste di intervento urgente e le collega alle vetrine dei professionisti, con un flusso di richiesta semplice per il cliente e strumenti di presentazione per chi offre il servizio.',
    goals: [
      'Ridurre i tempi tra la richiesta di aiuto e il contatto con un professionista',
      'Dare ai professionisti del pronto intervento una vetrina digitale dedicata',
      'Rendere semplice e guidato l’invio di una richiesta SOS',
    ],
    category: 'marketplace',
    technologies: [],
    features: [
      'Invio e gestione delle richieste SOS',
      'Vetrine professionali con descrizione dei servizi',
      'Ricerca dei professionisti per tipologia di intervento',
      'Area dedicata ai professionisti',
    ],
    status: 'in-sviluppo',
    order: 1,
    featured: true,
    visible: true,
    accent: 'blue',
    preview: 'requests',
  },
  {
    id: 'p-002',
    name: 'QORYVA',
    slug: 'qoryva',
    shortDescription:
      'Progetto di piattaforma di messaggistica privata orientata a privacy e sicurezza delle comunicazioni.',
    fullDescription:
      'QORYVA è un progetto di piattaforma di messaggistica privata che mette al centro la riservatezza delle conversazioni. L’obiettivo è offrire uno strumento di comunicazione in cui la protezione dei dati sia una scelta progettuale di base e non un’aggiunta successiva.',
    problem:
      'Persone e organizzazioni hanno sempre più bisogno di comunicare in modo riservato, con il controllo sui propri dati e sulle proprie conversazioni.',
    solution:
      'Una piattaforma di messaggistica progettata con un approccio privacy-first, in cui architettura e funzionalità vengono definite a partire dai requisiti di sicurezza delle comunicazioni.',
    goals: [
      'Offrire uno spazio di comunicazione riservato',
      'Mettere la protezione dei dati al centro delle scelte progettuali',
      'Mantenere l’esperienza d’uso semplice anche con requisiti di sicurezza elevati',
    ],
    category: 'saas',
    technologies: [],
    features: [
      'Conversazioni private tra utenti',
      'Progettazione orientata alla protezione dei dati',
      'Gestione dell’account e delle impostazioni di privacy',
    ],
    status: 'in-progettazione',
    order: 2,
    featured: true,
    visible: true,
    accent: 'violet',
    preview: 'chat',
  },
  {
    id: 'p-003',
    name: 'Fikos',
    slug: 'fikos',
    shortDescription: 'Portale digitale dedicato alle attività locali, annunci e vetrine commerciali.',
    fullDescription:
      'Fikos è un portale digitale dedicato alle attività locali. Offre uno spazio in cui pubblicare annunci e vetrine commerciali, per aiutare negozi e professionisti del territorio a essere trovati online dai clienti della propria zona.',
    problem:
      'Molte attività locali non hanno una presenza digitale efficace e restano poco visibili a chi cerca prodotti e servizi vicino a sé.',
    solution:
      'Un portale che raccoglie vetrine e annunci delle attività del territorio in un unico punto di accesso, semplice da consultare per i clienti e da aggiornare per gli esercenti.',
    goals: [
      'Aumentare la visibilità online delle attività locali',
      'Raccogliere annunci e vetrine del territorio in un unico portale',
      'Offrire agli esercenti uno strumento semplice da aggiornare',
    ],
    category: 'servizi-digitali',
    technologies: [],
    features: [
      'Vetrine commerciali per le attività',
      'Pubblicazione di annunci',
      'Consultazione delle attività per categoria e zona',
    ],
    status: 'in-sviluppo',
    order: 3,
    featured: false,
    visible: true,
    accent: 'cyan',
    preview: 'listing',
  },
  {
    id: 'p-004',
    name: '3D Market',
    slug: '3d-market',
    shortDescription: 'Marketplace dedicato a prodotti, creazioni digitali e modelli 3D.',
    fullDescription:
      '3D Market è un marketplace verticale dedicato al mondo della stampa 3D: prodotti fisici, creazioni digitali e modelli 3D. Il progetto unisce la logica del marketplace con strumenti per i venditori, con l’obiettivo di dare a creatori e makers un canale di vendita specializzato.',
    problem:
      'Chi crea prodotti e modelli 3D si appoggia spesso a marketplace generalisti, dove è difficile farsi trovare da un pubblico realmente interessato.',
    solution:
      'Un marketplace specializzato con catalogo, negozi dei venditori e pagamenti con accredito ai venditori, progettato per il lancio in italiano e in inglese.',
    goals: [
      'Creare un canale di vendita specializzato per creatori e makers 3D',
      'Gestire pagamenti con accredito ai venditori fin dal lancio',
      'Rivolgersi da subito a un pubblico italiano e internazionale',
    ],
    category: 'marketplace',
    technologies: ['Stripe Connect'],
    features: [
      'Catalogo e negozi dei venditori',
      'Pagamenti con accredito automatico ai venditori',
      'Messaggistica tra cliente e venditore',
      'Coupon e codici sconto',
      'Interfaccia in italiano e inglese',
    ],
    status: 'in-sviluppo',
    order: 4,
    featured: true,
    visible: true,
    accent: 'violet',
    preview: 'gallery',
  },
  {
    id: 'p-005',
    name: 'ViviRoma',
    slug: 'viviroma',
    shortDescription: 'Piattaforma dedicata a eventi, turismo, esperienze e attività locali.',
    fullDescription:
      'ViviRoma è una piattaforma dedicata a chi vuole scoprire Roma attraverso eventi, esperienze e attività locali. Raccoglie in un unico luogo proposte pensate sia per i turisti sia per chi vive la città.',
    problem:
      'Le informazioni su eventi, esperienze e attività in città sono spesso frammentate su canali diversi e difficili da confrontare.',
    solution:
      'Una piattaforma che organizza eventi, esperienze turistiche e attività locali in un’unica vetrina, con una consultazione semplice e orientata alla scoperta.',
    goals: [
      'Riunire eventi, esperienze e attività di Roma in un’unica piattaforma',
      'Facilitare la scoperta della città a turisti e residenti',
      'Dare visibilità alle realtà locali',
    ],
    category: 'servizi-digitali',
    technologies: [],
    features: [
      'Calendario di eventi',
      'Schede di esperienze e attività',
      'Contenuti per turisti e residenti',
      'Vetrine per le attività locali',
    ],
    status: 'in-sviluppo',
    order: 5,
    featured: true,
    visible: true,
    accent: 'cyan',
    preview: 'calendar',
  },
  {
    id: 'p-006',
    name: 'Romeo Express',
    slug: 'romeo-express',
    shortDescription: 'Progetto di piattaforma per servizi di consegna e logistica urbana.',
    fullDescription:
      'Romeo Express è un progetto di piattaforma per servizi di consegna e logistica urbana, pensato per organizzare in modo digitale le richieste di consegna in città e la loro gestione operativa.',
    problem:
      'Le consegne urbane richiedono coordinamento rapido tra chi spedisce, chi consegna e chi riceve, spesso gestito ancora con strumenti non integrati.',
    solution:
      'Una piattaforma che digitalizza il flusso della consegna: dalla richiesta all’assegnazione, fino al completamento del servizio.',
    goals: [
      'Digitalizzare la richiesta e la gestione delle consegne urbane',
      'Semplificare il coordinamento tra chi spedisce, chi consegna e chi riceve',
      'Rendere trasparente lo stato di ogni consegna',
    ],
    category: 'servizi-digitali',
    technologies: [],
    features: [
      'Richiesta di consegna online',
      'Gestione e assegnazione delle consegne',
      'Aggiornamenti sullo stato del servizio',
    ],
    status: 'in-progettazione',
    order: 6,
    featured: false,
    visible: true,
    accent: 'blue',
    preview: 'route',
  },
  {
    id: 'p-007',
    name: 'SOS TECH Italia',
    slug: 'sos-tech-italia',
    shortDescription: 'Progetto di rete di assistenza tecnologica per famiglie, professionisti e imprese.',
    fullDescription:
      'SOS TECH Italia è un progetto di rete di assistenza tecnologica rivolta a famiglie, professionisti e imprese. L’idea è rendere semplice trovare supporto per dispositivi, connettività e strumenti digitali.',
    problem:
      'Quando la tecnologia smette di funzionare, famiglie e piccole imprese spesso non sanno a chi rivolgersi per un’assistenza rapida e competente.',
    solution:
      'Una rete di assistenza organizzata attraverso una piattaforma digitale, che raccoglie le richieste e le indirizza verso il supporto più adatto.',
    goals: [
      'Rendere semplice trovare assistenza tecnologica affidabile',
      'Organizzare una rete di supporto per famiglie, professionisti e imprese',
      'Indirizzare ogni richiesta verso il supporto più adatto',
    ],
    category: 'servizi-digitali',
    technologies: [],
    features: [
      'Richiesta di assistenza online',
      'Servizi per famiglie, professionisti e imprese',
      'Organizzazione della rete di assistenza',
    ],
    status: 'in-progettazione',
    order: 7,
    featured: false,
    visible: true,
    accent: 'cyan',
    preview: 'dashboard',
  },
  {
    id: 'p-008',
    name: 'ProntoPugliaH24',
    slug: 'prontopugliah24',
    shortDescription: 'Progetto di piattaforma per servizi di pronto intervento in Puglia.',
    fullDescription:
      'ProntoPugliaH24 è un progetto di piattaforma per servizi di pronto intervento dedicata al territorio pugliese, pensata per collegare in modo rapido chi ha un’urgenza con i professionisti della zona.',
    problem:
      'Trovare un professionista disponibile in tempi brevi, vicino a sé, è spesso complicato, soprattutto nelle situazioni urgenti.',
    solution:
      'Una piattaforma a base territoriale che raccoglie le richieste di pronto intervento e le collega ai professionisti attivi in Puglia.',
    goals: [
      'Collegare rapidamente chi ha un’urgenza con professionisti della propria zona',
      'Valorizzare i professionisti attivi sul territorio pugliese',
      'Organizzare le richieste di intervento su base territoriale',
    ],
    category: 'marketplace',
    technologies: [],
    features: [
      'Richieste di pronto intervento',
      'Professionisti organizzati per zona',
      'Vetrine dei servizi offerti',
    ],
    status: 'in-progettazione',
    order: 8,
    featured: false,
    visible: true,
    accent: 'blue',
    preview: 'map',
  },
];

/* ------------------------------------------------------------------ */
/* Validazione in fase di build                                        */
/* ------------------------------------------------------------------ */

function validate(list: Project[]): Project[] {
  const slugs = new Set<string>();
  const ids = new Set<string>();
  for (const p of list) {
    if (slugs.has(p.slug)) throw new Error(`[projects] slug duplicato: ${p.slug}`);
    if (ids.has(p.id)) throw new Error(`[projects] id duplicato: ${p.id}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)) throw new Error(`[projects] slug non valido: ${p.slug}`);
    if (p.status === 'pubblicato' && !p.publicUrl)
      throw new Error(`[projects] "${p.name}" ha stato "pubblicato" ma nessun publicUrl verificato.`);
    if (p.status === 'demo-disponibile' && !p.demoUrl)
      throw new Error(`[projects] "${p.name}" ha stato "demo-disponibile" ma nessun demoUrl.`);
    slugs.add(p.slug);
    ids.add(p.id);
  }
  return list;
}

const validated = validate(projects);

/** Progetti pubblici, ordinati. */
export function getVisibleProjects(): Project[] {
  return validated.filter((p) => p.visible).sort((a, b) => a.order - b.order);
}

/** Progetti in evidenza per la homepage. */
export function getFeaturedProjects(limit = 4): Project[] {
  return getVisibleProjects()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getVisibleProjects().find((p) => p.slug === slug);
}

/** Progetti correlati: prima stessa categoria, poi gli altri. */
export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const others = getVisibleProjects().filter((p) => p.slug !== project.slug);
  const same = others.filter((p) => p.category === project.category);
  const rest = others.filter((p) => p.category !== project.category);
  return [...same, ...rest].slice(0, limit);
}

/** Categorie che hanno almeno un progetto visibile. */
export function getUsedCategories(): ProjectCategory[] {
  const used = new Set(getVisibleProjects().map((p) => p.category));
  return projectCategories.filter((c) => used.has(c));
}
