// ---- Others ---
export const CAT_VIDEO = 32;
export const CAT_DIVERS = 33;
export const CAT_AUTRE = 31;
export const CAT_PUBLICATION = 34;
export const CAT_AUDIO = 35;

// ---- Parliamentary proceedings ----
export const CAT_ORDRE_JOUR = 11;
export const CAT_DELIBERATION = 53;
export const PARENT_CATEGORY_ID = 10;

// ---- Travaux parlementaires ----
export const CAT_LOIS = 42;
export const CAT_CALENDRIER = 43;

// ---- Agenda ----
export const ITEMS_PER_PAGE = 6;

// ---- International ----
export const PER_PAGE = 9;
export const PER_PAGE_ACTIVITIES_FEED = 6;

// For all page
export const dynamic = 'force-dynamic';

// Contact API FORM
// Identifiants imposés par le shortcode CF7 généré dans WordPress.
// Ils sont stables pour un formulaire donné et n'ont pas besoin d'être
// dynamiques côté client.
export const CF7_FORM_ID = 263;
export const CF7_VERSION = "5.9.5";
export const CF7_LOCALE = "fr_FR";
export const CF7_UNIT_TAG = "wpcf7-f263-p149-o1";
export const CF7_CONTAINER_POST = 149;

// Others page
export const perPage = 6;

// Texts and laws
// ID de la catégorie "PL adoptes"
export const CAT_LOIS_ADOPTES = 14;
export const ITEMS_PER_PAGES = 5;

// ---- Médias : chaîne TV / Radio ----
// CAT_VIDEO (32) existe côté WP. Les catégories ci-dessous restent à créer
// dans wp-admin ; tant qu'elles valent 0, getPostsByCategory renvoie [].
export const CAT_VIDEO_HOSTED = 0;  // Vidéos .mp4 hébergées (hors YouTube)
export const CAT_AUDIO_PODCAST = 0; // Podcasts / émissions audio
export const CAT_MONTAGE = 0;       // Rediffusions / montages

// ---- Flux live ----
// obsolète : conservé au cas où du code existant s'y réfère encore.
export const LIVE_STREAM_URL = process.env.LIVE_STREAM_URL || '';
// Flux audio live (radio), indépendant de la détection TV.
export const LIVE_AUDIO_STREAM_URL = process.env.LIVE_AUDIO_STREAM_URL || '';

// ---- Direct TV : détection YouTube + repli Facebook manuel ----
// YouTube est prioritaire via la Data API v3 ; Facebook sert de repli
// manuel (aucune détection automatique disponible côté Meta).

// ID de la chaîne YouTube (commence par "UC", pas le @handle).
export const LIVE_YOUTUBE_CHANNEL_ID = process.env.LIVE_YOUTUBE_CHANNEL_ID || '';

// Clé API YouTube Data v3 — lecture publique uniquement.
export const LIVE_YOUTUBE_API_KEY = process.env.LIVE_YOUTUBE_API_KEY || '';

// Repli manuel : URL de la vidéo Facebook live. À renseigner avant chaque
// diffusion et à vider ensuite pour éviter d'afficher une rediffusion.
export const LIVE_FACEBOOK_VIDEO_URL = process.env.LIVE_FACEBOOK_VIDEO_URL || '';