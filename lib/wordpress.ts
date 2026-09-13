/** URL de base de l'API WordPress REST. */
export const API_BASE = process.env.WP_API_URL || 'https://senat.mg/wp-json/wp/v2';

/** Vrai côté navigateur, faux en SSR/Node. */
export const isClient = typeof window !== "undefined";

/** Paramètres de requête passés à fetchAPI. */
export type Params = Record<string, string | number | boolean>;
