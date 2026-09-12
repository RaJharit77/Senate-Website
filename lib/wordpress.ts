/** URL de base de l'API WordPress REST. */
export const API_BASE = process.env.WP_API_URL || 'https://senat.mg/wp-json/wp/v2';

export const isClient = typeof window !== "undefined";

export type Params = Record<string, string | number | boolean>;
