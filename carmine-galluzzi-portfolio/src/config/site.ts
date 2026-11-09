/**
 * CONFIGURAZIONE CENTRALE DEL SITO
 * ------------------------------------------------------------------
 * Tutti i dati personali, di contatto e legali sono qui.
 * I campi vuoti ('' o null) o non validi NON vengono mostrati sul sito:
 * i pulsanti pubblici compaiono automaticamente solo quando il dato è compilato.
 *
 * Il dominio canonico NON si configura qui ma in astro.config.mjs (CUSTOM_DOMAIN).
 */

export const site = {
  name: 'Carmine Galluzzi',
  monogram: 'CG',
  jobTitle: 'Software Developer & SaaS Founder',
  /** Descrizione predefinita (meta description della homepage e dati strutturati). */
  description:
    'Sviluppatore software e fondatore di piattaforme SaaS, marketplace, applicazioni web e soluzioni AI per aziende e startup.',
  bio: 'Sviluppatore e fondatore di piattaforme SaaS, software e soluzioni AI per aziende e startup.',
  lang: 'it',
  locale: 'it_IT',
  /** Immagine Open Graph predefinita (percorso in /public). */
  ogImage: {
    src: '/og-image.png',
    type: 'image/png',
    width: 1200,
    height: 630,
    alt: 'Carmine Galluzzi — Software Developer & SaaS Founder',
  },
  /**
   * Fotografia personale. Lascia null finché non è disponibile:
   * al suo posto viene mostrato il monogramma grafico CG.
   * Esempio: { src: '/images/branding/carmine-galluzzi.webp', width: 800, height: 1000, alt: 'Ritratto di Carmine Galluzzi' }
   */
  photo: null as null | { src: string; width: number; height: number; alt: string },
} as const;

/**
 * CONTATTI PUBBLICI — compila solo con dati reali.
 * Ogni campo vuoto nasconde il relativo pulsante/collegamento.
 */
export const contacts = {
  /** Email professionale, es. 'info@tuodominio.it' */
  email: '',
  /** Numero WhatsApp in formato internazionale senza spazi né "+", es. '393331234567' */
  whatsapp: '',
  /** URL completo del profilo LinkedIn */
  linkedin: '',
  /** URL completo del profilo GitHub pubblico */
  github: '',
  /** URL completo della pagina o del profilo Facebook */
  facebook: '',
  /** Città o area (facoltativa), es. 'Italia' */
  location: '',
};

/**
 * DATI DEL TITOLARE DEL TRATTAMENTO (pagina /privacy/).
 * I campi vuoti vengono evidenziati nella pagina come "da completare".
 */
export const legal = {
  ownerName: 'Carmine Galluzzi',
  /** Indirizzo (sede o domicilio professionale) */
  ownerAddress: '',
  /** Partita IVA, se presente */
  vatNumber: '',
  /** Email dedicata alle richieste privacy */
  privacyEmail: '',
  /** Data dell'ultimo aggiornamento dell'informativa, es. '1 dicembre 2026' */
  lastUpdated: '',
  /** Imposta a true solo dopo che l'informativa è stata completata e verificata. */
  privacyReviewed: false,
};

/** Biografia estesa per la pagina Chi sono (paragrafi). Vuota = sezione nascosta. */
export const extendedBio: string[] = [];

/** Elenco delle voci di navigazione principali. */
export const navigation = [
  { href: '/', key: 'home' },
  { href: '/chi-sono/', key: 'about' },
  { href: '/portfolio/', key: 'portfolio' },
  { href: '/servizi/', key: 'services' },
  { href: '/contatti/', key: 'contact' },
] as const;

export type ContactId = 'email' | 'whatsapp' | 'linkedin' | 'github' | 'facebook';

/** Restituisce i collegamenti social/contatto effettivamente configurati. */
export function getConfiguredContacts() {
  const items: { id: ContactId; label: string; href: string; external: boolean }[] = [];
  const isUrl = (u: string) => /^https:\/\/[^\s]+\.[^\s]+/.test(u);
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacts.email)) items.push({ id: 'email', label: contacts.email, href: `mailto:${contacts.email}`, external: false });
  if (/^\d{8,15}$/.test(contacts.whatsapp))
    items.push({ id: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${contacts.whatsapp}`, external: true });
  if (isUrl(contacts.linkedin)) items.push({ id: 'linkedin', label: 'LinkedIn', href: contacts.linkedin, external: true });
  if (isUrl(contacts.github)) items.push({ id: 'github', label: 'GitHub', href: contacts.github, external: true });
  if (isUrl(contacts.facebook)) items.push({ id: 'facebook', label: 'Facebook', href: contacts.facebook, external: true });
  return items;
}

/** URL dei profili da usare in JSON-LD (sameAs): solo quelli realmente configurati. */
export function getSameAs(): string[] {
  return [contacts.linkedin, contacts.github, contacts.facebook].filter((u) => /^https:\/\//.test(u));
}
