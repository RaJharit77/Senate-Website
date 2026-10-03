// Autres
export const CAT_VIDEO = 32;
export const CAT_DIVERS = 33;
export const CAT_AUTRE = 31;
export const CAT_PUBLICATION = 34;
export const CAT_AUDIO = 35;

// Travaux du Parlement
export const CAT_ORDRE_JOUR = 11;
export const CAT_DELIBERATION = 53;
export const PARENT_CATEGORY_ID = 10;
// Travaux parlementaires
export const CAT_LOIS = 42;
export const CAT_CALENDRIER = 43;

// Agenda
export const ITEMS_PER_PAGE = 6;

// International
export const PER_PAGE = 9;
export const PER_PAGE_ACTIVITIES_FEED = 6;

// Config Next.js commune à toutes les pages.
export const dynamic = 'force-dynamic';

/* Formulaire de contact (CF7)
Identifiants fixés par le shortcode WordPress, stables pour ce formulaire.*/
export const CF7_FORM_ID = 263;
export const CF7_VERSION = "5.9.5";
export const CF7_LOCALE = "fr_FR";
export const CF7_UNIT_TAG = "wpcf7-f263-p149-o1";
export const CF7_CONTAINER_POST = 149;

// Page "Autres"
export const perPage = 6;

/* Textes et lois
Catégorie "PL adoptés"*/
export const CAT_LOIS_ADOPTES = 14;
export const ITEMS_PER_PAGES = 5;

/* Médias : chaîne TV / Radio
CAT_VIDEO (32) existe côté WP. Les catégories ci-dessous restent à créer
dans wp-admin ; tant qu'elles valent 0, getPostsByCategory renvoie [].*/
export const CAT_VIDEO_HOSTED = 0;  // Vidéos .mp4 hébergées (hors YouTube)
export const CAT_AUDIO_PODCAST = 0; // Podcasts / émissions audio
export const CAT_MONTAGE = 0;       // Rediffusions / montages

/* Flux live
obsolète : conservé au cas où du code existant s'y réfère encore.*/
export const LIVE_STREAM_URL = process.env.LIVE_STREAM_URL || '';
// Flux audio live (radio), indépendant de la détection TV.
export const LIVE_AUDIO_STREAM_URL = process.env.LIVE_AUDIO_STREAM_URL || '';

/* Direct TV : détection YouTube + repli Facebook manuel
YouTube est prioritaire via la Data API v3 ; Facebook sert de repli
manuel (aucune détection automatique disponible côté Meta).
ID de la chaîne YouTube (commence par "UC", pas le @handle).*/
export const LIVE_YOUTUBE_CHANNEL_ID = process.env.LIVE_YOUTUBE_CHANNEL_ID || '';

// Clé API YouTube Data v3 — lecture publique uniquement.
export const LIVE_YOUTUBE_API_KEY = process.env.LIVE_YOUTUBE_API_KEY || '';

/* Repli manuel : URL de la vidéo Facebook live. À renseigner avant chaque
diffusion et à vider ensuite pour éviter d'afficher une rediffusion.*/
export const LIVE_FACEBOOK_VIDEO_URL = process.env.LIVE_FACEBOOK_VIDEO_URL || '';

// Senators types
export const WP_INTRO_POST_ID = 1123;
/*
CPT WordPress contenant les fiches sénateurs (République IV).
Endpoint : /wp-json/wp/v2/republiqueiv 
*/
export const SENATOR_CPT = "/republiqueiv";

export const PER_PAGES = 100;
export const MAX_PAGES = 20; // garde-fou (2000 sénateurs max)
export const REVALIDATE = 3600; // 1 h

/* Catégories WordPress reprises telles quelles depuis lib/api.ts
(voir getAllRelevantPosts / getDeliberationPosts) pour rester cohérent
avec le reste du site plutôt que de réintroduire des constantes séparées.*/
export const CAT_ORDRE_DU_JOUR = 11;

/* Dimensions de la carte (viewBox) */
export const MAP_W = 405;
export const MAP_H = 800;

/* Configuration */
export const MAX_QUERY_LENGTH = 100;
export const PER_SOURCE = 15;
export const MAX_RESULTS = 60;

/* Catégories WP non exposées dans constants.ts.
Attention : constants.ts nomme CAT_LOIS = 42, alors que api.ts documente
42 comme la catégorie "structures" : on suit api.ts.*/
export const CAT_STRUCTURES = 42;
export const CAT_GOUVERNEMENT = 7;


/*  Extrait & score de pertinence */
export const SNIPPET_BEFORE = 100;
export const SNIPPET_AFTER = 160;